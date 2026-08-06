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

export function estimate(input: CostInput): CostResult {
	const { model, entry, monthly, years, growthPercent, sharePercent } = input;

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

	return { worth, dues, back, net, perMonth: net / Math.max(1, years * 12) };
}
