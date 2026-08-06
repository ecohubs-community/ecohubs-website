/**
 * The shared shape of the article-header controls — read, bookmark, share.
 *
 * One string rather than three copies: the design gives them a single pill
 * treatment, and three near-identical class lists is how they stop matching.
 */
export const PILL =
	'inline-flex items-center gap-2.5 rounded-full border px-5 py-[11px] text-sm transition-colors';

export const PILL_OFF =
	'border-stone-300 text-stone-800 hover:border-ecohubs-dark hover:text-ecohubs-dark';

/** Completed / saved: the design tints the whole pill rather than just a mark. */
export const PILL_ON = 'border-ecohubs-primary/40 bg-emerald-50 text-emerald-800';
