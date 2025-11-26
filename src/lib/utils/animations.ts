/**
 * Motion One animation utilities for scroll-triggered animations
 * Provides reusable animation configurations for consistent UX
 */

import type { InViewOptions } from 'motion';

/**
 * Default inView options for scroll-triggered animations
 */
export const defaultInViewOptions: InViewOptions = {
	amount: 0.3, // Trigger when 30% of element is visible
	margin: '0px 0px -100px 0px' // Start animation slightly before element enters viewport
};

/**
 * Fade in from below animation
 */
export const fadeInUp = {
	initial: { opacity: 0, y: 50 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};

/**
 * Fade in animation (no movement)
 */
export const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};

/**
 * Fade in from right animation
 */
export const fadeInRight = {
	initial: { opacity: 0, x: 50 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
};

/**
 * Scale up animation
 */
export const scaleUp = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

/**
 * Creates a stagger delay for multiple elements
 * @param index - The index of the element in the list
 * @param baseDelay - Base delay in seconds
 * @param staggerAmount - Amount to stagger each element in seconds
 */
export function getStaggerDelay(index: number, baseDelay = 0, staggerAmount = 0.1): number {
	return baseDelay + index * staggerAmount;
}

/**
 * Creates animation config with custom delay
 */
export function withDelay(
	animationConfig: typeof fadeInUp,
	delay: number
): typeof fadeInUp {
	return {
		...animationConfig,
		transition: {
			...animationConfig.transition,
			delay
		}
	};
}

/**
 * Hero section animation configs
 */
export const heroAnimations = {
	text: {
		initial: { opacity: 0, y: 50 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
	},
	subtitle: {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
	},
	cta: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }
	},
	visual: {
		initial: { opacity: 0, x: 50 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }
	}
};

/**
 * Card reveal animation with stagger support
 */
export function cardReveal(index: number, stagger = 0.15) {
	return {
		initial: { opacity: 0, y: 40 },
		animate: { opacity: 1, y: 0 },
		transition: {
			duration: 0.8,
			delay: index * stagger,
			ease: [0.4, 0, 0.2, 1]
		}
	};
}

/**
 * Image reveal animation
 */
export function imageReveal(index: number) {
	return {
		initial: { opacity: 0, y: 50 },
		animate: { opacity: 1, y: 0 },
		transition: {
			duration: 1,
			delay: index * 0.2,
			ease: [0.4, 0, 0.2, 1]
		}
	};
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns animation config or instant display based on reduced motion preference
 */
export function withReducedMotion<T>(animationConfig: T, instantConfig: T): T {
	return prefersReducedMotion() ? instantConfig : animationConfig;
}

