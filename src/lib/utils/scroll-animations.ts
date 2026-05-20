/**
 * Scroll-triggered reveal — a single shared IntersectionObserver toggles
 * `.is-visible` when an element enters the viewport, and CSS handles the
 * actual animation via GPU-accelerated `transform` + `opacity` transitions.
 *
 * Previously this used Motion's `inView` + `animate`, which created one
 * observer per element (~42 on the homepage) and ran rAF callbacks on the
 * main thread. The CSS-only approach keeps Lighthouse TBT/INP low on mobile
 * and lets us drop the Motion dependency from non-hero pages.
 */

let observer: IntersectionObserver | null = null;
let prefersReduced = false;

function getObserver(threshold: number): IntersectionObserver {
	// Share one observer for the whole page. Lazily constructed so it picks up
	// the threshold of whoever wires it up first; if a second caller needs a
	// different threshold the cost is trivial — observers are cheap once you
	// stop pooling per-element.
	if (observer) return observer;
	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer?.unobserve(entry.target);
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -10% 0px' }
	);
	return observer;
}

/**
 * Watch every element matching `selector` and add `.is-visible` when it
 * enters the viewport. CSS handles the fade-up transition.
 */
export function initScrollAnimations(
	selector: string = '[data-scroll-animate]',
	options: { threshold?: number } = {}
) {
	if (typeof window === 'undefined') return;
	prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		// Reveal everything immediately — CSS guard in layout.css handles
		// opacity/transform, but mark visible for any consumer that reads it.
		document.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
		return;
	}

	const io = getObserver(options.threshold ?? 0.15);
	document.querySelectorAll(selector).forEach((el) => io.observe(el));
}

/**
 * Stagger-fade direct children of `parentSelector` as the parent enters the
 * viewport. The stagger delay is encoded per-child via a `--stagger-i` CSS
 * custom property (set inline here); CSS multiplies it by the base delay.
 */
export function initStaggeredScrollAnimations(
	parentSelector: string,
	options: { threshold?: number; staggerDelay?: number } = {}
) {
	if (typeof window === 'undefined') return;
	prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		document.querySelectorAll(parentSelector).forEach((parent) => {
			parent.classList.add('is-visible');
		});
		return;
	}

	// Set the per-child stagger index up-front so the CSS variable is in place
	// before the parent flips to `.is-visible` and the transition fires.
	document.querySelectorAll<HTMLElement>(parentSelector).forEach((parent) => {
		Array.from(parent.children).forEach((child, index) => {
			(child as HTMLElement).style.setProperty('--stagger-i', String(index));
		});
	});

	const io = getObserver(options.threshold ?? 0.15);
	document.querySelectorAll(parentSelector).forEach((el) => io.observe(el));
}
