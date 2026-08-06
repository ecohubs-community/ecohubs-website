import { describe, expect, it } from 'vitest';
import { estimate, type CostInput } from './cost';

/** A reader with a €300 000 home, €250 a month, staying ten years. */
const base: CostInput = {
	model: 'market',
	entry: 300_000,
	monthly: 250,
	years: 10,
	growthPercent: 0,
	sharePercent: 25
};

describe('estimate', () => {
	it('charges only the dues when a home is sold at what it cost', () => {
		const r = estimate(base);
		expect(r.dues).toBe(30_000);
		expect(r.back).toBe(300_000);
		expect(r.net).toBe(30_000);
		expect(r.perMonth).toBe(250);
	});

	it('compounds appreciation over the whole period', () => {
		const r = estimate({ ...base, growthPercent: 3 });
		expect(r.worth).toBeCloseTo(300_000 * 1.03 ** 10, 6);
		// Sold at market, the whole gain is yours.
		expect(r.back).toBeCloseTo(r.worth, 6);
	});

	it('gives a land-trust seller only the agreed share of the gain', () => {
		const market = estimate({ ...base, growthPercent: 3 });
		const clt = estimate({ ...base, model: 'clt', growthPercent: 3 });

		expect(clt.back).toBeCloseTo(300_000 + 0.25 * (market.worth - 300_000), 6);
		expect(clt.back).toBeLessThan(market.back);
		// The other three quarters stay with the trust, by design.
		expect(market.back - clt.back).toBeCloseTo(0.75 * (market.worth - 300_000), 6);
	});

	it('honours a ground lease that grants a different share', () => {
		// Grounded Solutions describes formulas scaling from 5% to 30%; the
		// component defaults to 25% but must never assume it.
		const low = estimate({ ...base, model: 'clt', growthPercent: 3, sharePercent: 5 });
		const high = estimate({ ...base, model: 'clt', growthPercent: 3, sharePercent: 30 });
		expect(high.back).toBeGreaterThan(low.back);
	});

	/**
	 * The clamp exists because the arithmetic is otherwise perverse: a quarter
	 * of a *negative* appreciation would be paid to the seller as a gain.
	 */
	it('does not pay a land-trust seller a share of a falling market', () => {
		const r = estimate({ ...base, model: 'clt', growthPercent: -3 });
		expect(r.worth).toBeLessThan(300_000);
		expect(r.back).toBe(300_000);
	});

	it('returns a limited-equity share at what was paid for it, gaining nothing', () => {
		const r = estimate({ ...base, model: 'par', growthPercent: 8 });
		expect(r.back).toBe(300_000);
		expect(r.net).toBe(30_000);
	});

	it('returns nothing where no stake was held', () => {
		const r = estimate({ ...base, model: 'none', entry: 0, monthly: 900 });
		expect(r.back).toBe(0);
		expect(r.net).toBe(900 * 12 * 10);
	});

	it('reports a gain as a negative net, not as a cost', () => {
		const r = estimate({ ...base, growthPercent: 5 });
		expect(r.net).toBeLessThan(0);
		expect(r.perMonth).toBeLessThan(0);
	});

	it('survives a single year without dividing by zero', () => {
		const r = estimate({ ...base, years: 1 });
		expect(Number.isFinite(r.perMonth)).toBe(true);
		expect(r.perMonth).toBeCloseTo(250, 6);
	});
});
