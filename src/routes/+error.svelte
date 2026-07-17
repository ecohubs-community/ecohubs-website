<script lang="ts">
	/**
	 * Root error boundary — catches unmatched URLs (top-level 404s) and any error
	 * that isn't caught by a group-level boundary. Because the root layout is bare
	 * (no chrome), this page supplies the site's Navbar and Footer itself so the
	 * branded error content sits inside the normal shell.
	 */
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ErrorContent from '$lib/components/ErrorContent.svelte';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative flex min-h-screen flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ecohubs-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
	>
		Skip to main content
	</a>
	<Navbar />
	<main id="main-content" class="w-full flex-1">
		<ErrorContent />
	</main>
	<Footer />
</div>
