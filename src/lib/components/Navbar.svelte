<script lang="ts">
	import { Menu, X, ArrowRight, ChevronDown } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	// `__ecosystem__` is a sentinel rendered as the Ecosystem mega-menu trigger
	// (it replaces the former "RCOS Standard" link in the same position).
	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/vision', label: 'Vision' },
		{ href: '__ecosystem__', label: 'Ecosystem' },
		{ href: '/membership', label: 'Membership' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/blog', label: 'Blog' }
	];

	type EcoLink = { label: string; href: string; external: boolean; green?: boolean };
	type EcoProject = {
		key: string;
		code: string;
		sub: string;
		/** Where the list item itself navigates. */
		href: string;
		external: boolean;
		domain: string;
		/** App favicon, served locally from /static/app-icons (no external request). */
		icon: string;
		/** Product og:image (small banner in the detail view). null → no banner. */
		ogImage: string | null;
		title: string;
		desc: string;
		primary: EcoLink;
		secondary: EcoLink[];
	};

	// The three live products (Seeking is intentionally omitted for now).
	const ecosystem: EcoProject[] = [
		{
			key: 'rcos',
			code: 'RCOS',
			sub: 'Regenerative Community OS',
			href: '/rcos',
			external: false,
			domain: 'rcos.ecohubs.community',
			icon: '/app-icons/rcos.svg',
			// Note: the site's og:image meta points at /og-default.png, which 404s;
			// the real banner lives at /og-image.png.
			ogImage: 'https://rcos.ecohubs.community/og-image.png',
			title: 'Regenerative Community Operating System',
			desc: 'The open-source standard — a living set of patterns that makes the invisible explicit: how decisions get made, conflict gets repaired, care is shared.',
			primary: {
					label: 'Open RCOS',
					href: 'https://rcos.ecohubs.community',
					external: true
				},
			secondary: [
				{
					label: 'What is RCOS?',
					href: '/rcos',
					external: false
				},
				{
					label: 'Community Resilience Assessment',
					href: '/community-resilience-assessment',
					external: false
				}
			]
		},
		{
			key: 'csi',
			code: 'CSI',
			sub: 'Community Suitability Index',
			href: 'https://csi.ecohubs.community',
			external: true,
			domain: 'csi.ecohubs.community',
			icon: '/app-icons/csi.svg',
			ogImage: 'https://csi.ecohubs.community/og-image.png',
			title: 'Community Suitability Index',
			desc: 'A working map of where a regenerative, sovereign community has room to begin — read against the law, the land, the water and the welcome. Honest about what we don’t yet know.',
			primary: { label: 'Open CSI', href: 'https://csi.ecohubs.community', external: true },
			secondary: [
				{ label: 'csi.ecohubs.community', href: 'https://csi.ecohubs.community', external: true }
			]
		},
		{
			key: 'votecast',
			code: 'VoteCast',
			sub: 'Community Voting Platform',
			href: 'https://votecast.ecohubs.community',
			external: true,
			domain: 'votecast.ecohubs.community',
			icon: '/app-icons/votecast.svg',
			ogImage: 'https://votecast.ecohubs.community/og-default.jpg',
			title: 'VoteCast',
			desc: 'Transparent, consent-based decision-making — proposals, deliberation and votes everyone can see and trust.',
			primary: { label: 'Open VoteCast', href: 'https://votecast.ecohubs.community', external: true },
			secondary: [
				{
					label: 'votecast.ecohubs.community',
					href: 'https://votecast.ecohubs.community',
					external: true
				}
			]
		}
	];

	/* ── Ecosystem mega-menu state ─────────────────────────────────── */
	let ecoOpen = $state(false);
	let activeProj = $state('rcos');
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	const ecoActive = $derived(page.url.pathname.startsWith('/rcos'));

	function openEco() {
		clearTimeout(closeTimer);
		ecoOpen = true;
	}
	function scheduleCloseEco() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => (ecoOpen = false), 140);
	}
	function hideBrokenImage(e: Event) {
		(e.currentTarget as HTMLElement).style.display = 'none';
	}

	onMount(() => {
		if (!browser) return;

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') ecoOpen = false;
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKeydown);
		};
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
			<a
				href="/"
				class="flex-shrink-0 flex items-center gap-2 group mt-3"
				data-sveltekit-preload-data="hover"
			>
				<Logo />
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8 font-sans font-medium text-sm text-stone-600">
					{#each navLinks as link (link.href)}
						{#if link.href === '__ecosystem__'}
							<!-- ── ECOSYSTEM MEGA MENU ── -->
							<div
								class="relative self-center"
								role="presentation"
								onmouseenter={openEco}
								onmouseleave={scheduleCloseEco}
							>
								<button
									type="button"
									class="flex items-center gap-1.5 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-green-400 rounded px-2 py-1 hover:text-ecohubs-primary {ecoActive
										? 'text-ecohubs-primary'
										: 'text-stone-600'}"
									aria-haspopup="true"
									aria-expanded={ecoOpen}
									aria-controls="ecosystem-panel"
									onclick={() => (ecoOpen = !ecoOpen)}
									onfocus={openEco}
								>
									Ecosystem
									<ChevronDown
										class="h-3.5 w-3.5 transition-transform duration-200 {ecoOpen
											? 'rotate-180'
											: ''}"
										aria-hidden="true"
									/>
								</button>

								<!-- Panel -->
								<div
									id="ecosystem-panel"
									role="region"
									aria-label="Ecosystem"
									class="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 transition-all duration-200 {ecoOpen
										? 'opacity-100 visible translate-y-0'
										: 'opacity-0 invisible -translate-y-1 pointer-events-none'}"
								>
									<div
										class="w-[600px] overflow-hidden rounded-3xl border border-stone-200/70 bg-ecohubs-base shadow-[0_30px_70px_-30px_rgba(11,46,36,0.45)]"
									>
										<div class="grid grid-cols-12">
											<!-- left list -->
											<div class="col-span-5 p-4 bg-white/40">
												<div class="kicker text-emerald-700 mb-3 px-2">Our projects</div>
												<div class="space-y-1">
													{#each ecosystem as p (p.key)}
														<a
															href={p.href}
															target={p.external ? '_blank' : undefined}
															rel={p.external ? 'noopener' : undefined}
															data-sveltekit-preload-data={p.external ? undefined : 'hover'}
															onmouseenter={() => (activeProj = p.key)}
															onfocus={() => (activeProj = p.key)}
															class="group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-colors {activeProj ===
															p.key
																? 'bg-white border border-ecohubs-primary/15'
																: 'border border-transparent hover:bg-white/70'}"
														>
															<span class="flex items-center gap-2.5 min-w-0">
																<img
																	src={p.icon}
																	alt=""
																	width="20"
																	height="20"
																	class="h-5 w-5 flex-none rounded"
																	loading="lazy"
																	onerror={hideBrokenImage}
																/>
																<span class="min-w-0">
																	<span class="block font-serif text-[1.02rem] text-ecohubs-deep leading-tight"
																		>{p.code}</span
																	>
																	<span class="block text-[0.74rem] text-stone-500 truncate">{p.sub}</span>
																</span>
															</span>
															<span
																class="flex-none text-ecohubs-primary transition {activeProj === p.key
																	? 'opacity-100 translate-x-0'
																	: 'opacity-0 -translate-x-1'}">→</span
															>
														</a>
													{/each}
												</div>
											</div>

											<!-- right detail -->
											<div class="col-span-7 p-6 border-l border-stone-200/70">
												{#each ecosystem as p (p.key)}
													<div class:hidden={activeProj !== p.key} role="group" aria-label={p.code}>
														{#if p.ogImage}
															<img
																src={p.ogImage}
																alt="{p.code} preview"
																class="mb-4 h-[100px] w-full rounded-xl border border-stone-200/70 object-cover object-top"
																loading="lazy"
																onerror={hideBrokenImage}
															/>
														{/if}
														<h3 class="font-serif text-lg text-ecohubs-deep leading-snug">{p.title}</h3>
														<p class="mt-2 text-sm text-stone-600 leading-relaxed">{p.desc}</p>
														<a
															href={p.primary.href}
															target={p.primary.external ? '_blank' : undefined}
															rel={p.primary.external ? 'noopener' : undefined}
															data-sveltekit-preload-data={p.primary.external ? undefined : 'hover'}
															class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium pb-0.5 {p.primary
																.green
																? 'text-ecohubs-primary underline underline-offset-4 decoration-ecohubs-primary/60 hover:decoration-ecohubs-primary'
																: 'text-ecohubs-dark border-b border-ecohubs-dark/40 hover:border-ecohubs-dark'}"
														>
															{p.primary.label}
															{#if p.primary.external}<span aria-hidden="true">↗</span>{/if}
														</a>
														{#if p.secondary.length}
															<div class="mt-4 flex flex-col gap-1.5 text-sm">
																{#each p.secondary as s (s.href)}
																	<a
																		href={s.href}
																		target={s.external ? '_blank' : undefined}
																		rel={s.external ? 'noopener' : undefined}
																		data-sveltekit-preload-data={s.external ? undefined : 'hover'}
																		class="text-stone-600 hover:text-ecohubs-dark"
																	>
																		{s.label}{#if s.external}<span aria-hidden="true"> ↗</span>{/if}
																	</a>
																{/each}
															</div>
														{/if}
													</div>
												{/each}
											</div>
										</div>
									</div>
								</div>
							</div>
						{:else}
							{@const isActive =
								(link.href === '/' && page.url.pathname === '/') ||
								(link.href !== '/' && page.url.pathname.startsWith(link.href))}
							<a
								href={link.href}
								class="hover:text-ecohubs-primary transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-green-400 rounded px-2 py-1 {isActive
									? 'bg-ecohubs-primary/10 text-ecohubs-primary py-2 px-3 rounded-full'
									: 'text-stone-600'}"
								aria-label={link.label}
								data-sveltekit-preload-data="hover"
							>
								{#if link.href === '/'}
									<Icon icon="tabler:home" class="inline-block w-4 h-4" aria-hidden="true" />
								{:else}
									{link.label}
								{/if}
							</a>
						{/if}
					{/each}
				</div>
			</div>

			<!-- CTA Button (Desktop) + Mobile Menu Button -->
			<div class="flex items-center gap-4">
				<a
					href="/membership"
					class="hidden md:flex items-center gap-2 bg-ecohubs-dark text-white px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors duration-300 hover:bg-ecohubs-deep focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Become a Member"
					data-sveltekit-preload-data="hover"
				>
					<span class="hidden lg:block">Become a Member</span>
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
					{#if link.href === '__ecosystem__'}
						<!-- ── ECOSYSTEM (mobile) ── -->
						<div class="px-4 pt-1">
							<div class="kicker text-emerald-700 mb-2">Ecosystem</div>
							<div class="flex flex-col gap-1">
								{#each ecosystem as p (p.key)}
									<a
										href={p.href}
										target={p.external ? '_blank' : undefined}
										rel={p.external ? 'noopener' : undefined}
										class="flex items-center gap-3 rounded-2xl px-2 py-2.5 hover:bg-white/50 transition-colors"
										onclick={() => (mobileMenuOpen = false)}
										data-sveltekit-preload-data={p.external ? undefined : 'hover'}
									>
										<img
											src={p.icon}
											alt=""
											width="22"
											height="22"
											class="h-[22px] w-[22px] flex-none rounded"
											loading="lazy"
											onerror={hideBrokenImage}
										/>
										<span class="min-w-0">
											<span class="block font-medium text-ecohubs-deep leading-tight"
												>{p.code}{#if p.external}<span class="text-stone-400 text-xs"> ↗</span>{/if}</span
											>
											<span class="block text-xs text-stone-500 truncate">{p.sub}</span>
										</span>
									</a>
								{/each}
							</div>
						</div>
					{:else}
						<a
							href={link.href}
							class="block px-4 py-3 rounded-2xl text-base font-medium text-stone-700 hover:text-ecohubs-primary hover:bg-white/50 transition-all focus-visible:ring-2 focus-visible:ring-green-400"
							onclick={() => (mobileMenuOpen = false)}
							data-sveltekit-preload-data="hover"
						>
							{link.label}
						</a>
					{/if}
				{/each}
				<a
					href="/membership"
					class="block px-4 py-3 bg-ecohubs-dark text-white text-center rounded-full font-medium hover:bg-ecohubs-deep transition-colors focus-visible:ring-2 focus-visible:ring-green-400"
					onclick={() => (mobileMenuOpen = false)}
					data-sveltekit-preload-data="hover"
				>
					Become a Member
				</a>
			</div>
		</div>
	{/if}
</nav>
