<script lang="ts">
	import { navigating } from '$app/stores';

	let progress = $state(0);
	let visible = $state(false);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	$effect(() => {
		if ($navigating) {
			// Start loading
			visible = true;
			progress = 0;

			// Simulate progress
			intervalId = setInterval(() => {
				if (progress < 90) {
					progress += Math.random() * 15;
					if (progress > 90) progress = 90;
				}
			}, 100);
		} else {
			// Navigation complete
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}

			if (visible) {
				// Complete the progress bar
				progress = 100;

				// Hide after animation completes
				setTimeout(() => {
					visible = false;
					progress = 0;
				}, 300);
			}
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
</script>

{#if visible}
	<div class="navigation-progress" aria-hidden="true">
		<div class="navigation-progress-bar" style="width: {progress}%"></div>
	</div>
{/if}

<style>
	.navigation-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 9999;
		background: transparent;
	}

	.navigation-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #059669 0%, #0d9488 50%, #d97706 100%);
		transition: width 0.1s ease-out;
		box-shadow: 0 0 10px rgba(5, 150, 105, 0.5);
	}
</style>
