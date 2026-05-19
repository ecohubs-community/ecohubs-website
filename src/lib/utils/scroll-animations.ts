import { inView, animate } from 'motion';

/**
 * Initialize scroll-triggered animations for elements marked with
 * `data-scroll-animate` (or a custom selector). Each element's animation
 * is picked by its `data-scroll-animate` value (defaults to "fade-up").
 */
export function initScrollAnimations(
	selector: string = '[data-scroll-animate]',
	options: {
		threshold?: number;
		once?: boolean;
	} = {}
) {
	const { threshold = 0.2 } = options;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	const elements = document.querySelectorAll(selector);

	elements.forEach((element) => {
		const el = element as HTMLElement;
		const animationType = el.dataset.scrollAnimate || 'fade-up';

		const animations: Record<string, Record<string, unknown>> = {
			'fade-up': { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0px)'] },
			'fade-down': { opacity: [0, 1], transform: ['translateY(-40px)', 'translateY(0px)'] },
			'fade-left': { opacity: [0, 1], transform: ['translateX(40px)', 'translateX(0px)'] },
			'fade-right': { opacity: [0, 1], transform: ['translateX(-40px)', 'translateX(0px)'] },
			fade: { opacity: [0, 1] },
			scale: { opacity: [0, 1], transform: ['scale(0.8)', 'scale(1)'] },
			rotate: { opacity: [0, 1], transform: ['rotate(-5deg) scale(0.95)', 'rotate(0deg) scale(1)'] }
		};

		const animation = animations[animationType] ?? animations['fade-up'];

		inView(
			el,
			() => {
				animate(el, animation as never, {
					duration: 0.8,
					ease: [0.22, 1, 0.36, 1]
				});
			},
			{ amount: threshold }
		);
	});
}

/**
 * Stagger-fade the direct children of every element matching `parentSelector`
 * as that parent enters the viewport.
 */
export function initStaggeredScrollAnimations(
	parentSelector: string,
	options: {
		threshold?: number;
		staggerDelay?: number;
	} = {}
) {
	const { threshold = 0.2, staggerDelay = 0.1 } = options;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	const parents = document.querySelectorAll(parentSelector);

	parents.forEach((parent) => {
		const children = parent.children;

		inView(
			parent,
			() => {
				Array.from(children).forEach((child, index) => {
					animate(
						child as HTMLElement,
						{
							opacity: [0, 1],
							transform: ['translateY(30px)', 'translateY(0px)']
						} as never,
						{
							duration: 0.6,
							delay: index * staggerDelay,
							ease: [0.22, 1, 0.36, 1]
						}
					);
				});
			},
			{ amount: threshold }
		);
	});
}
