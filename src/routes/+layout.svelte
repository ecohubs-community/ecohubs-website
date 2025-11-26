<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NetworkCanvas from '$lib/components/NetworkCanvas.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex min-h-screen flex-col relative">
	<NetworkCanvas />
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ecohubs-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
	>
		Skip to main content
	</a>
	<div class="relative z-10 flex flex-col min-h-screen w-full">
		<Navbar />
		<main id="main-content" class="flex-1 w-full">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>
