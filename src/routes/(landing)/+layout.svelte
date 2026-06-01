<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	/**
	 * Standalone landing-page layout.
	 *
	 * Loads the same theme + utility classes as the (web) routes so colours,
	 * fonts, and helpers like .kicker / .grain / .hairline / .pulse-dot /
	 * .soft-shadow / .font-story / .font-mono are available — but renders
	 * no Navbar, no Footer, no global components. A clean, link-free canvas.
	 */
	import '../layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
