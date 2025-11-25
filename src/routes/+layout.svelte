<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getStoredTheme, getEffectiveTheme, applyTheme } from '$lib/utils/theme';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Initialize theme on mount
	onMount(() => {
		if (browser) {
			const theme = getStoredTheme() ?? 'system';
			applyTheme(getEffectiveTheme(theme));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="GaiaLabs.community - Building intentional communities on blockchain" />
	{@html `
		<script>
			(function() {
				const stored = localStorage.getItem('gaialabs-theme');
				const theme = stored === 'light' || stored === 'dark' ? stored : 'system';
				const effectiveTheme = theme === 'system' 
					? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
					: theme;
				document.documentElement.classList.add(effectiveTheme);
				document.documentElement.style.colorScheme = effectiveTheme;
			})();
		</script>
	`}
</svelte:head>

<div class="flex min-h-screen flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none"
	>
		Skip to main content
	</a>
	<Navbar />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
