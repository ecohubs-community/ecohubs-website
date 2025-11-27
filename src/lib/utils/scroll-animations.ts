import { inView, animate } from 'motion';

/**
 * Initialize scroll-triggered animations for elements
 * @param selector - CSS selector for elements to animate
 * @param options - Animation options
 */
export function initScrollAnimations(
	selector: string = '[data-scroll-animate]',
	options: {
		threshold?: number;
		once?: boolean;
	} = {}
) {
	const { threshold = 0.2, once = true } = options;

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		// Skip animations if user prefers reduced motion
		return;
	}

	const elements = document.querySelectorAll(selector);

	elements.forEach((element) => {
		const el = element as HTMLElement;
		const animationType = el.dataset.scrollAnimate || 'fade-up';

		// Set initial state
		el.style.opacity = '0';

		// Define animations based on type
		const animations: Record<string, object> = {
			'fade-up': {
				opacity: [0, 1],
				transform: ['translateY(40px)', 'translateY(0px)']
			},
			'fade-down': {
				opacity: [0, 1],
				transform: ['translateY(-40px)', 'translateY(0px)']
			},
			'fade-left': {
				opacity: [0, 1],
				transform: ['translateX(40px)', 'translateX(0px)']
			},
			'fade-right': {
				opacity: [0, 1],
				transform: ['translateX(-40px)', 'translateX(0px)']
			},
			'fade': {
				opacity: [0, 1]
			},
			'scale': {
				opacity: [0, 1],
				transform: ['scale(0.8)', 'scale(1)']
			},
			'rotate': {
				opacity: [0, 1],
				transform: ['rotate(-5deg) scale(0.95)', 'rotate(0deg) scale(1)']
			}
		};

		const animation = animations[animationType] || animations['fade-up'];

		// Trigger animation when element comes into view
		inView(
			el,
			() => {
				animate(el, animation, {
					duration: 0.8,
					easing: [0.22, 1, 0.36, 1]
				});
			},
			{
				amount: threshold
			}
		);
	});
}

/**
 * Initialize staggered scroll animations for child elements
 * @param parentSelector - CSS selector for parent element
 * @param options - Animation options
 */
export function initStaggeredScrollAnimations(
	parentSelector: string,
	options: {
		threshold?: number;
		staggerDelay?: number;
	} = {}
) {
	const { threshold = 0.2, staggerDelay = 0.1 } = options;

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		return;
	}

	const parents = document.querySelectorAll(parentSelector);

	parents.forEach((parent) => {
		const children = parent.children;

		// Set initial state for all children
		Array.from(children).forEach((child) => {
			(child as HTMLElement).style.opacity = '0';
		});

		// Trigger staggered animation when parent comes into view
		inView(
			parent,
			() => {
				Array.from(children).forEach((child, index) => {
					animate(
						child as HTMLElement,
						{
							opacity: [0, 1],
							transform: ['translateY(30px)', 'translateY(0px)']
						},
						{
							duration: 0.6,
							delay: index * staggerDelay,
							easing: [0.22, 1, 0.36, 1]
						}
					);
				});
			},
			{
				amount: threshold
			}
		);
	});
}

