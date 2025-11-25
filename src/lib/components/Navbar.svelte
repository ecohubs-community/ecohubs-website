<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import ThemeToggle from './ThemeToggle.svelte';
	import logo from '$lib/assets/Logo.svg';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let lastScrollY = $state(0);
	let visible = $state(true);

	const navLinks = [
		{ href: '/vision', label: 'Vision' },
		{ href: '/dao', label: 'DAO' },
		{ href: '/ecotoken', label: 'EcoToken' },
		{ href: '/blueprint', label: 'Blueprint' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' }
	];

	function handleScroll() {
		if (!browser) return;
		const currentScrollY = window.scrollY;
		scrolled = currentScrollY > 20;
		visible = currentScrollY < lastScrollY || currentScrollY < 10;
		lastScrollY = currentScrollY;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<nav
	class="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md transition-transform duration-300 {visible
		? 'translate-y-0'
		: '-translate-y-full'}"
	aria-label="Main navigation"
>
	<div class="mx-auto max-w-7xl px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo/Brand -->
			<a
				href="/"
				class="flex items-center gap-2 font-serif text-xl font-bold text-text-primary transition-opacity hover:opacity-80"
				data-sveltekit-preload-data="hover"
			>
        <img src={logo} alt="GaiaLabs.community" class="h-8 w-8 invert-0 dark:invert-100" />
				<span class="hidden sm:inline">GaiaLabs</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-6">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
						data-sveltekit-preload-data="hover"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/join"
					class="rounded-md bg-[var(--color-forest-800)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-900)]"
					data-sveltekit-preload-data="hover"
				>
					Join
				</a>
				<ThemeToggle />
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center space-x-4 md:hidden">
				<ThemeToggle />
				<button
					type="button"
					onclick={toggleMobileMenu}
					class="inline-flex items-center justify-center rounded-md p-2 text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<!-- Close icon -->
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Menu icon -->
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-border bg-background md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-surface hover:text-text-primary"
						data-sveltekit-preload-data="hover"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/join"
					onclick={closeMobileMenu}
					class="block rounded-md bg-[var(--color-forest-800)] px-3 py-2 text-base font-medium text-white hover:bg-[var(--color-forest-900)]"
					data-sveltekit-preload-data="hover"
				>
					Join
				</a>
			</div>
		</div>
	{/if}
</nav>

<!-- Spacer to prevent content from going under fixed navbar -->
<div class="h-16"></div>

