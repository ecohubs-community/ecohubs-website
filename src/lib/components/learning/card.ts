/**
 * The shared card shell, from the design's `.card`.
 *
 * One string so the five card shapes cannot drift apart: white, hairline
 * border, 20px radius, and an emerald border with a long soft shadow on hover.
 */
export const CARD =
	'block rounded-[20px] border border-stone-200/90 bg-white transition-all duration-300 ' +
	'hover:border-ecohubs-primary/45 hover:shadow-[0_22px_46px_-30px_rgba(11,46,36,0.45)]';

/** The design's `.tag` pill — a small neutral chip. */
export const TAG =
	'inline-flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-ecohubs-ivory ' +
	'px-2.5 py-[3px] text-[11.5px] whitespace-nowrap text-[#4b5b51]';

/** The design's `.meta` voice — mono, small, muted. */
export const META = 'font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]';
