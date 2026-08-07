import { describe, expect, it } from 'vitest';
import { buildWorkbook } from './worksheet';
import { EQUITY_MODELS, estimate, type EquityModel } from '../src/lib/learning/cost';

const wb = buildWorkbook('Test guide', new Date('2026-08-07T00:00:00Z'));
const model = wb.getWorksheet('Cost model')!;

const formula = (ref: string) => {
	const value = model.getCell(ref).value as { formula?: string } | null;
	return value?.formula ?? '';
};

/**
 * Evaluates one of the sheet's formulas in JavaScript.
 *
 * Deliberately tiny and deliberately not general: these seven formulas use
 * only arithmetic, `MAX` and `IF`. It exists so the claim "the worksheet does
 * what the website does" is checked rather than asserted — a spreadsheet that
 * quietly disagreed with `estimate()` would be worse than no spreadsheet,
 * because a reader would trust it more.
 */
function evaluate(ref: string, cells: Record<string, number | string>): number {
	// A memo, plus a stack for real cycles. A plain visited-set was wrong: C18
	// is referenced by both C19 and C20, which is reuse, not recursion.
	const done = new Map<string, number | string>();
	const resolving = new Set<string>();

	const resolve = (target: string): number | string => {
		if (target in cells) return cells[target];
		if (done.has(target)) return done.get(target)!;
		if (resolving.has(target)) throw new Error(`circular reference at ${target}`);
		resolving.add(target);

		const source = formula(target);
		if (!source) throw new Error(`no formula and no value for ${target}`);

		const js = source
			.replace(/\bIF\(/g, '__if(')
			.replace(/\bMAX\(/g, 'Math.max(')
			.replace(/\^/g, '**')
			.replace(/([A-Z]+\d+)/g, (cell) => JSON.stringify(resolve(cell)))
			.replace(/(?<![<>!])=/g, '===');

		const __if = (test: boolean, then: number, otherwise: number) => (test ? then : otherwise);
		const value = Function('Math', '__if', `"use strict"; return (${js});`)(Math, __if);

		resolving.delete(target);
		done.set(target, value);
		return value;
	};

	const result = resolve(ref);
	return typeof result === 'number' ? result : Number(result);
}

/** The sheet's input cells, in the shape `estimate()` wants. */
const scenario = (
	equity: EquityModel,
	entry: number,
	monthly: number,
	years: number,
	growth: number,
	share: number
) => ({
	cells: { C8: entry, C9: monthly, C10: years, C11: growth, C12: equity, C13: share },
	input: {
		model: equity,
		entry,
		monthly,
		years,
		growthPercent: growth * 100,
		sharePercent: share * 100
	}
});

describe('the worksheet', () => {
	it('offers exactly the equity models the site has', () => {
		const validation = model.getCell('C12').dataValidation as { formulae: string[] };
		expect(validation.formulae[0]).toBe(`"${EQUITY_MODELS.map((m) => m.id).join(',')}"`);
	});

	it('describes every model on its second sheet', () => {
		const sheet = wb.getWorksheet('What comes back')!;
		const ids = EQUITY_MODELS.map((_, i) => sheet.getRow(5 + i).getCell(2).value);
		expect(ids).toEqual(EQUITY_MODELS.map((m) => m.id));
	});

	it('ships formulas, not the answers to one example', () => {
		for (const ref of ['C17', 'C18', 'C19', 'C20', 'C21', 'C22']) {
			expect(formula(ref), `${ref} should be a formula`).toBeTruthy();
		}
	});
});

describe('the worksheet agrees with estimate()', () => {
	const cases: [string, ReturnType<typeof scenario>][] = [
		['market, flat', scenario('market', 300_000, 250, 10, 0, 0.25)],
		['market, rising', scenario('market', 300_000, 250, 10, 0.03, 0.25)],
		['land trust', scenario('clt', 300_000, 250, 10, 0.03, 0.25)],
		['land trust, generous share', scenario('clt', 240_000, 180, 25, 0.02, 0.3)],
		['land trust, falling market', scenario('clt', 300_000, 250, 10, -0.03, 0.25)],
		['share at par', scenario('par', 90_000, 400, 15, 0.04, 0.25)],
		['no equity', scenario('none', 0, 900, 5, 0, 0.25)]
	];

	for (const [name, { cells, input }] of cases) {
		it(name, () => {
			const expected = estimate(input);
			expect(evaluate('C17', cells)).toBeCloseTo(expected.dues, 6);
			expect(evaluate('C18', cells)).toBeCloseTo(expected.worth, 6);
			expect(evaluate('C20', cells)).toBeCloseTo(expected.back, 6);
			expect(evaluate('C21', cells)).toBeCloseTo(expected.net, 6);
			expect(evaluate('C22', cells)).toBeCloseTo(expected.perMonth, 6);
		});
	}

	/** The clamp that stops a trust paying out a share of a loss. */
	it('never returns more than the home is worth under a land trust', () => {
		const { cells } = scenario('clt', 300_000, 250, 10, 0.05, 1);
		expect(evaluate('C20', cells)).toBeCloseTo(evaluate('C18', cells), 6);
	});
});
