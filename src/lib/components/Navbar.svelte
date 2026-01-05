<script lang="ts">
	import { Sprout, Menu, X, ArrowRight } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/state';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/vision', label: 'Vision' },
		// { href: '/dao', label: 'DAO' },
		// { href: '/ecotoken', label: 'EcoToken' },
		{ href: '/blueprint', label: 'Blueprint' },
		{ href: '/join', label: 'Join' },
		{ href: '/blog', label: 'Blog' }
	];

	onMount(() => {
		if (!browser) return;

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class="fixed w-full z-50 transition-all duration-300 {scrolled ? 'glass-panel' : ''}"
	id="navbar"
	aria-label="Main navigation"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-20">
			<!-- Logo -->
			<a href="/" class="flex-shrink-0 flex items-center gap-2 group mt-3" data-sveltekit-preload-data="hover">
				<Logo />
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8 font-sans font-medium text-sm text-gray-600">
					{#each navLinks as link (link.href)}
						{@const isActive = page.url.pathname.startsWith(link.href)}
						<a
							href={link.href}
							class="hover:text-ecohubs-primary transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-green-400 rounded px-2 py-1 {isActive ? 'bg-ecohubs-primary/10 text-ecohubs-primary py-2 px-3 rounded-full' : 'text-gray-600'}"
							aria-label={link.label}
							data-sveltekit-preload-data="hover"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>

			<!-- CTA Button (Desktop) + Mobile Menu Button -->
			<div class="flex items-center gap-4">
				<a
					href="/join"
					class="hidden md:flex items-center gap-2 bg-ecohubs-dark text-white px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300 hover:bg-ecohubs-primary hover:shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Join Community"
					data-sveltekit-preload-data="hover"
				>
					<span class="hidden lg:block">Join Community</span>
					<span class="block lg:hidden">Join</span>
					<ArrowRight class="h-4 w-4" aria-hidden="true" />
				</a>

				<!-- Mobile menu button -->
				<button
					class="md:hidden text-ecohubs-dark hover:text-ecohubs-primary focus-visible:ring-2 focus-visible:ring-green-400 rounded p-1"
					aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
					aria-expanded={mobileMenuOpen}
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					{#if mobileMenuOpen}
						<X class="h-8 w-8" aria-hidden="true" />
					{:else}
						<Menu class="h-8 w-8" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden glass-panel border-t border-ecohubs-primary/10">
			<div class="px-4 pt-4 pb-6 space-y-3">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-ecohubs-primary hover:bg-white/50 transition-all focus-visible:ring-2 focus-visible:ring-green-400"
						onclick={() => (mobileMenuOpen = false)}
						data-sveltekit-preload-data="hover"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/join"
					class="block px-4 py-3 bg-ecohubs-primary text-white text-center rounded-lg font-medium hover:bg-ecohubs-dark transition-colors focus-visible:ring-2 focus-visible:ring-green-400"
					onclick={() => (mobileMenuOpen = false)}
					data-sveltekit-preload-data="hover"
				>
					Join Community
				</a>
			</div>
		</div>
	{/if}
</nav>
