/**
 * Reduced-motion detection helper used by the (web) pages to short-circuit
 * scroll/hero animations when the user opts out via OS preferences.
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
