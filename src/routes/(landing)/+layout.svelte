<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	/**
	 * Standalone landing-page layout.
	 *
	 * Loads the same theme + utility classes as the (web) routes so colours,
	 * fonts, and helpers like .kicker / .grain / .hairline / .pulse-dot /
	 * .soft-shadow / .font-story / .font-mono are available — but renders
	 * no Navbar, no Footer, no global components. A clean, link-free canvas.
	 *
	 * Analytics + CookieConsent ARE included (as fixed overlays) so landing
	 * pages report to GA and honour consent just like the (web) routes.
	 */
	import '../layout.css';
	import Analytics from '$lib/components/Analytics.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
</svelte:head>

{@render children()}

<Analytics />
<CookieConsent />
