/**
 * The arithmetic behind the cost estimator in lesson 05.
 *
 * It lives here rather than inside the component for the same reason `score()`
 * does: this is the number a reader will act on, and a number that decides
 * whether someone can afford to move house deserves tests.
 *
 * Nothing here supplies market data. Every input is the reader's own, and the
 * only thing this module contributes is the rule each equity model applies on
 * the way out.
 */

export type EquityModel =
	/** Freehold, and most cohousing: you get what the home is then worth. */
	| 'market'
	/** A community land trust on an improvements-only resale formula. */
	| 'clt'
	/** Limited-equity co-operatives: your share back, at what you paid for it. */
	| 'par'
	/** Renting, or membership of an income-sharing community. */
	| 'none';

export interface CostInput {
	model: EquityModel;
	/** What you pay to move in. */
	entry: number;
	/** Dues, service charge or association fee, per month. */
	monthly: number;
	years: number;
	/** Yearly appreciation, as a percentage. Defaults to nothing on purpose. */
	growthPercent: number;
	/** CLT only: the share of appreciation the ground lease lets you keep. */
	sharePercent: number;
}

export interface CostResult {
	/**
	 * The period actually used, after clamping.
	 *
	 * Returned so the caller can label its own output honestly: the row used to
	 * read "Dues over -5 years" because the heading trusted the raw input while
	 * the arithmetic did something else.
	 */
	years: number;
	/** What the home is worth at the end of the period. */
	worth: number;
	/** Total dues paid over the period. */
	dues: number;
	/** What returns to you when you leave. */
	back: number;
	/** Entry plus dues, less whatever came back. Negative means a gain. */
	net: number;
	/** `net` spread over the months lived there. */
	perMonth: number;
}

/**
 * HTML `min` and `max` on a number input constrain the spinner, not what can be
 * typed or pasted, so every bound is enforced here instead.
 *
 * Without it the estimator would publish nonsense with a straight face: a
 * negative period produced negative dues, a mistyped period produced three
 * hundred million, and a land-trust share above 100% returned more than the
 * home was worth. On a page about money that is worse than an error.
 */
function clamp(value: number, low: number, high: number): number {
	if (!Number.isFinite(value)) return low;
	return Math.min(high, Math.max(low, value));
}

/** The bounds, in one place, so the inputs and the arithmetic cannot disagree. */
export const LIMITS = {
	entry: [0, 100_000_000],
	monthly: [0, 100_000],
	years: [1, 60],
	growthPercent: [-10, 20],
	sharePercent: [0, 100]
} as const;

export function estimate(input: CostInput): CostResult {
	const model = input.model;
	const entry = clamp(input.entry, ...LIMITS.entry);
	const monthly = clamp(input.monthly, ...LIMITS.monthly);
	const years = Math.round(clamp(input.years, ...LIMITS.years));
	const growthPercent = clamp(input.growthPercent, ...LIMITS.growthPercent);
	const sharePercent = clamp(input.sharePercent, ...LIMITS.sharePercent);

	const worth = entry * Math.pow(1 + growthPercent / 100, years);
	const dues = monthly * 12 * years;

	// A falling market must not produce a *bonus* under the CLT formula: the
	// trust shares appreciation, and there is none to share below the price
	// paid. Without the clamp, a negative growth rate would hand the seller a
	// quarter of the loss as if it were a gain.
	const appreciation = Math.max(0, worth - entry);

	const back =
		model === 'none'
			? 0
			: model === 'par'
				? entry
				: model === 'clt'
					? entry + (sharePercent / 100) * appreciation
					: worth;

	const net = entry + dues - back;

	return { years, worth, dues, back, net, perMonth: net / (years * 12) };
}
