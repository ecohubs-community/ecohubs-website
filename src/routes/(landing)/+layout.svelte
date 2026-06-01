<script lang="ts">
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

{@render children()}
