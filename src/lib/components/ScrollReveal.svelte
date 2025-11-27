<script lang="ts">
	import { onMount } from 'svelte';
	import { inView, animate } from 'motion';

	interface Props {
		animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale' | 'rotate';
		delay?: number;
		duration?: number;
		threshold?: number;
		once?: boolean;
		children: any;
	}

	let {
		animation = 'fade-up',
		delay = 0,
		duration = 0.8,
		threshold = 0.2,
		once = true
	}: Props = $props();

	let element: HTMLElement;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			// Just show without animation
			element.style.opacity = '1';
			return;
		}

		// Set initial state
		element.style.opacity = '0';

		// Define animations
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

		const animationConfig = animations[animation] || animations['fade-up'];

		// Trigger animation when element comes into view
		inView(
			element,
			() => {
				animate(element, animationConfig, {
					duration,
					delay,
					easing: [0.22, 1, 0.36, 1]
				});
			},
			{
				amount: threshold
			}
		);
	});
</script>

<div bind:this={element}>
	{@render children()}
</div>

