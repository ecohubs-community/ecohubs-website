<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getStoredTheme, setStoredTheme, getSystemTheme, getEffectiveTheme, applyTheme, type Theme } from '$lib/utils/theme';

	let theme = $state<Theme>(getStoredTheme() ?? 'system');
	let effectiveTheme = $derived(getEffectiveTheme(theme));
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		// Apply initial theme
		applyTheme(effectiveTheme);

		// Listen for system theme changes
		if (browser) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => {
				if (theme === 'system') {
					applyTheme(getSystemTheme());
				}
			};
			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	});

	function toggleTheme() {
		if (theme === 'system') {
			theme = getSystemTheme() === 'dark' ? 'light' : 'dark';
		} else if (theme === 'light') {
			theme = 'dark';
		} else {
			theme = 'light';
		}
		setStoredTheme(theme);
		applyTheme(effectiveTheme);
	}

	// Update theme when it changes
	$effect(() => {
		if (mounted && browser) {
			applyTheme(effectiveTheme);
		}
	});
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label="Toggle theme"
	class="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
>
	{#if !mounted}
		<!-- Placeholder to prevent layout shift -->
		<span class="h-5 w-5" aria-hidden="true"></span>
	{:else if effectiveTheme === 'dark'}
		<!-- Sun icon for light mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		</svg>
		<span class="sr-only">Switch to light mode</span>
	{:else}
		<!-- Moon icon for dark mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5"
			aria-hidden="true"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</svg>
		<span class="sr-only">Switch to dark mode</span>
	{/if}
</button>

<style>
	:global(html.light) {
		color-scheme: light;
	}

	:global(html.dark) {
		color-scheme: dark;
	}
</style>

