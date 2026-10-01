<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import { SEO_CONFIG } from '$lib/config/seo';
	import { myceliumCamp as camp, campPhase, type CampPhase } from '$lib/config/mycelium-camp';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';

	import logo from '$lib/assets/Logo.svg';
	import gatheringLogo from '$lib/assets/mycelium/the-gathering.svg';
	import heroForest from '$lib/assets/mycelium/hero-forest.jpg?enhanced';
	import cenoteFromAbove from '$lib/assets/mycelium/cenote-from-above.jpg?enhanced';
	import cenoteOverhang from '$lib/assets/mycelium/cenote-overhang.jpg?enhanced';
	import shadedPath from '$lib/assets/mycelium/shaded-garden-path.jpg?enhanced';
	import agavePath from '$lib/assets/mycelium/agave-garden-path.jpg?enhanced';
	import forestCanopy from '$lib/assets/mycelium/forest-canopy.jpg?enhanced';
	import stefan from '$lib/assets/mycelium/stefan-portrait.webp?enhanced';

	import {
		topics,
		notBut,
		rhythm,
		days,
		takeHome,
		placeFacts,
		lifeInCamp,
		ticketIncludes,
		mapUrl,
		travel,
		safety,
		contact,
		festivalLinks,
		type DayAside
	} from './data';

	let { data } = $props();

	// The server's phase is right when the page was rendered; the edge may have
	// held that copy for a while, so the browser re-checks once it is running.
	// A `?phase=` preview is left alone.
	let phase = $state<CampPhase>(data.phase);
	const over = $derived(phase === 'over');

	let journey: HTMLDivElement | undefined = $state();
	let threadHeight = $state(0);

	/* Outbound-click analytics, same shape as /welcome. A no-op without consent. */
	function trackTicket(location: string) {
		window.gtag?.('event', 'link_click', {
			link_label: 'Get ticket',
			link_url: camp.ticketUrl,
			link_location: `community_mycelium_${location}`
		});
	}

	onMount(() => {
		if (!data.preview) phase = campPhase();

		// The glowing thread down the five days grows with the reader's scroll.
		const grow = () => {
			if (!journey) return;
			const box = journey.getBoundingClientRect();
			const total = box.height - 180;
			const p = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - box.top) / total));
			threadHeight = p * total;
		};
		grow();
		window.addEventListener('scroll', grow, { passive: true });
		window.addEventListener('resize', grow);

		if (!prefersReducedMotion()) {
			initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
			initStaggeredScrollAnimations('[data-scroll-stagger]', {
				threshold: 0.15,
				staggerDelay: 0.08
			});
		}

		return () => {
			window.removeEventListener('scroll', grow);
			window.removeEventListener('resize', grow);
		};
	});

	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: `${camp.name} — a camp at ${camp.festival}`,
		description:
			'Five days in the Mayan jungle founding a temporary regenerative village together — vision, land, layout, decisions, conflict and culture.',
		startDate: '2026-10-23T18:00:00-06:00',
		endDate: '2026-10-27T15:00:00-06:00',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		image: `${SEO_CONFIG.siteUrl}/og-community-mycelium.jpg`,
		location: {
			'@type': 'Place',
			name: 'Yaxunah',
			address: {
				'@type': 'PostalAddress',
				postalCode: '97924',
				addressLocality: 'Yaxunah, Yaxcabá',
				addressRegion: 'Yucatán',
				addressCountry: 'MX'
			}
		},
		organizer: {
			'@type': 'Organization',
			name: SEO_CONFIG.organization.name,
			url: SEO_CONFIG.siteUrl
		},
		offers: {
			'@type': 'Offer',
			url: camp.ticketUrl,
			price: '4500',
			priceCurrency: 'MXN'
		}
	};

	const tile = '(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw';
	const gallery = [
		{
			src: cenoteFromAbove,
			alt: 'Looking down into a cenote — turquoise water beneath a wooden platform',
			sizes: tile,
			span: 'sm:row-span-2'
		},
		{ src: shadedPath, alt: 'Shaded gravel path through the jungle garden', sizes: tile, span: '' },
		{ src: agavePath, alt: 'Garden path lined with agaves and stones', sizes: tile, span: '' },
		{
			src: cenoteOverhang,
			alt: 'Deep blue cenote under a limestone overhang',
			sizes: tile,
			span: ''
		},
		{
			src: forestCanopy,
			alt: 'Dense green forest canopy',
			sizes: '(min-width: 1024px) 880px, (min-width: 640px) 50vw, 100vw',
			span: 'lg:col-span-3'
		}
	];

	const mono = 'font-mono text-[11px] tracking-[0.1em] uppercase';
</script>

<SEO
	title="Community Mycelium — Found a village in five days · The Gathering México 2026"
	description="Five days in the Mayan jungle, 23–27 Oct 2026. We don’t talk about regenerative community — we found one, together. A camp by EcoHubs at The Gathering México."
	ogImage="/og-community-mycelium.jpg"
	ogImageAlt="Jungle with glowing mycelium threads"
	canonical={camp.path}
	jsonLd={eventSchema}
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Community Mycelium', url: `https://ecohubs.community${camp.path}` }
	]}
/>

{#snippet ticketButton(size: 'sm' | 'lg', location: string)}
	{#if over}
		<span
			aria-disabled="true"
			class="cursor-not-allowed whitespace-nowrap rounded-full border border-ecohubs-ivory/20 bg-ecohubs-ivory/10 font-semibold text-ecohubs-ivory/60
				{size === 'sm' ? 'hidden px-4 py-2 text-sm sm:inline' : 'px-7 py-4 text-[17px]'}"
		>
			Ticket sales closed
		</span>
	{:else}
		<a
			href={camp.ticketUrl}
			target="_blank"
			rel="noopener noreferrer"
			onclick={() => trackTicket(location)}
			class="no-external-decoration whitespace-nowrap rounded-full bg-ecohubs-accent font-semibold text-ecohubs-deep transition-colors hover:bg-amber-400
				{size === 'sm' ? 'px-4 py-2 text-sm' : 'px-7 py-4 text-[17px]'}"
		>
			{#if size === 'sm'}
				<span class="sm:hidden">Tickets</span><span class="hidden sm:inline">Get your ticket</span>
			{:else}
				Get your ticket · {camp.price}
			{/if}
		</a>
	{/if}
{/snippet}

{#snippet village(dayIndex: number)}
	{@const isLast = dayIndex === days.length - 1}
	<div class="mt-7 flex flex-wrap items-center gap-2 text-[13px]">
		<span class="{mono} text-ecohubs-light/60">{isLast ? 'Our village' : 'Our village so far'}</span
		>
		{#each days.slice(0, dayIndex) as earlier}
			{#each earlier.adds as item}
				<span class="rounded-full border border-ecohubs-light/40 px-2.5 py-1 text-ecohubs-light"
					>{item}</span
				>
			{/each}
		{/each}
		{#each days[dayIndex].adds as item}
			<span
				class="rounded-full px-2.5 py-1 text-ecohubs-deep {isLast
					? 'bg-ecohubs-accent font-semibold'
					: 'bg-ecohubs-light font-medium'}">{item}</span
			>
		{/each}
	</div>
{/snippet}

{#snippet aside(a: DayAside)}
	{#if a.kind === 'idea'}
		<div class="rounded-2xl border border-ecohubs-ivory/10 bg-ecohubs-ivory/5 p-6">
			<div class="{mono} mb-2.5 text-ecohubs-light">{a.label}</div>
			<p class="font-story text-[19px] italic leading-snug text-ecohubs-ivory">{a.text}</p>
		</div>
	{:else if a.kind === 'questions'}
		<div class="rounded-2xl border border-ecohubs-ivory/10 bg-ecohubs-ivory/5 p-6">
			<div class="{mono} mb-3 text-ecohubs-light">{a.label}</div>
			<ul class="flex flex-col gap-2">
				{#each a.questions as q}
					<li class="font-story text-[17px] italic leading-snug text-ecohubs-ivory">{q}</li>
				{/each}
			</ul>
		</div>
	{:else}
		<details class="group rounded-2xl border border-ecohubs-ivory/10 bg-ecohubs-ivory/5 px-6 py-5">
			<summary class="flex cursor-pointer list-none items-center justify-between gap-3">
				<span class="{mono} text-ecohubs-light">{a.label}</span>
				<span class="text-xl leading-none text-ecohubs-light transition-transform">+</span>
			</summary>
			{#if a.kind === 'visions'}
				<div class="mt-4 flex flex-col gap-3.5">
					{#each a.visions as v}
						<div>
							<div class="font-serif text-xl text-ecohubs-ivory">
								{v.name} <span class="text-[13px] text-ecohubs-light/60">— {v.english}</span>
							</div>
							<p class="mb-1 mt-0.5 font-story text-[15px] italic text-ecohubs-ivory/80">
								“{v.quote}”
							</p>
							<div class="text-[13px] text-ecohubs-light/60">{v.facts}</div>
						</div>
					{/each}
					<p
						class="border-t border-ecohubs-ivory/10 pt-3 text-[13px] leading-relaxed text-ecohubs-ivory/75"
					>
						{a.note}
					</p>
				</div>
			{:else}
				<div class="mt-4 flex flex-col gap-3 text-sm leading-normal text-ecohubs-ivory/80">
					{#if a.intro}<p>{a.intro}</p>{/if}
					{#each a.rows as row}
						<div class="grid grid-cols-[96px_1fr] gap-2.5">
							<span class="font-mono text-ecohubs-light">{row.key}</span>
							<span>{row.value}</span>
						</div>
					{/each}
					{#if a.quote}
						<div class="border-t border-ecohubs-ivory/10 pt-3">
							<p class="font-story text-base italic text-ecohubs-ivory">“{a.quote.text}”</p>
							<p class="text-xs text-ecohubs-light/60">
								{a.quote.cite} <em>{a.quote.work}</em> ({a.quote.year})
							</p>
						</div>
					{/if}
				</div>
			{/if}
		</details>
	{/if}
{/snippet}

<div class="bg-ecohubs-base font-['Inter_Variable',Inter,system-ui,sans-serif] text-ecohubs-text">
	{#if over}
		<div
			class="bg-ecohubs-accent px-6 py-2.5 text-center text-sm font-medium leading-normal text-ecohubs-deep"
		>
			{camp.festival} has ended ({camp.dates.replace(' 2026', '')}). Thank you to everyone who built
			the village with us.
			<a href="/" class="font-semibold text-ecohubs-deep underline underline-offset-2"
				>Stay connected with EcoHubs →</a
			>
		</div>
	{/if}

	<!-- Sticky camp header — this page is a standalone landing page, so it
	     carries its own navigation instead of the site Navbar. -->
	<div
		class="sticky top-0 z-50 border-b border-ecohubs-light/10 bg-ecohubs-deep/90 backdrop-blur-md"
	>
		<div class="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-2.5">
			<a href="#top" class="flex items-center gap-2.5 text-ecohubs-ivory">
				<img src={logo} alt="EcoHubs" class="size-7" />
				<span class="whitespace-nowrap font-serif text-base font-medium sm:text-lg"
					>{camp.name}</span
				>
			</a>
			<div class="flex items-center gap-6">
				<nav class="hidden gap-5 text-sm md:flex" aria-label="Page sections">
					<a href="#journey" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">The five days</a
					>
					<a href="#practical" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">Practical</a>
					<a href="#contact" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">Contact</a>
				</nav>
				{@render ticketButton('sm', 'header')}
			</div>
		</div>
	</div>

	<main>
		<!-- ═══ HERO ═══ -->
		<header
			id="top"
			class="relative flex flex-col overflow-hidden bg-ecohubs-deep text-ecohubs-ivory"
		>
			<div class="relative aspect-[1376/768] max-h-[78vh] min-h-[300px] w-full overflow-hidden">
				<enhanced:img
					src={heroForest}
					alt="Jungle with glowing mycelium threads"
					sizes="100vw"
					loading="eager"
					fetchpriority="high"
					class="absolute inset-0 h-full w-full object-cover object-[center_45%]"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-ecohubs-deep"
				></div>
			</div>
			<div class="relative mx-auto w-full max-w-[1180px] px-6 pb-16 pt-6">
				<div
					data-hero-step="0.05"
					style="--hero-delay: 0.05s"
					class="mb-6 flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-[0.08em]"
				>
					<a
						href={camp.festivalUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 rounded-full border border-ecohubs-light/35 bg-ecohubs-deep/70 py-1 pl-1.5 pr-3 text-ecohubs-light transition-colors hover:border-ecohubs-light"
					>
						<img src={gatheringLogo} alt="" class="size-5" />
						A camp at The Gathering México
					</a>
					<span class="rounded-full border border-ecohubs-ivory/25 bg-ecohubs-deep/70 px-2.5 py-1.5"
						>{camp.dates}</span
					>
					<span class="rounded-full border border-ecohubs-ivory/25 bg-ecohubs-deep/70 px-2.5 py-1.5"
						>{camp.place}</span
					>
				</div>
				<h1
					data-hero-step="0.15"
					style="--hero-delay: 0.15s"
					class="text-balance font-serif text-[clamp(48px,9vw,120px)] font-normal leading-[0.95] tracking-tight"
				>
					{camp.name}
				</h1>
				<p
					data-hero-step="0.3"
					style="--hero-delay: 0.3s"
					class="mt-5 max-w-[760px] text-pretty font-story text-[clamp(22px,3vw,34px)] font-light italic leading-tight text-ecohubs-ivory/90"
				>
					{#if over}
						For five days in the Mayan jungle we didn’t just talk about regenerative community — we
						founded one, together. This is what it looked like.
					{:else}
						Five days in the Mayan jungle. We don’t talk about regenerative community — we found
						one, together. And then we see the network it belongs to.
					{/if}
				</p>
				<div
					data-hero-step="0.42"
					style="--hero-delay: 0.42s"
					class="mt-9 flex flex-wrap items-center gap-3.5"
				>
					{@render ticketButton('lg', 'hero')}
					<a
						href="#video"
						class="flex items-center gap-2.5 rounded-full border border-ecohubs-ivory/40 px-6 py-4 font-medium transition-colors hover:bg-ecohubs-ivory/10"
					>
						<span
							aria-hidden="true"
							class="inline-block border-y-[6px] border-l-[10px] border-y-transparent border-l-ecohubs-light"
						></span>
						Watch the video invitation
					</a>
				</div>
				<ul
					data-hero-step="0.52"
					style="--hero-delay: 0.52s"
					class="mt-10 flex flex-wrap items-center gap-2"
				>
					{#each topics as topic, i}
						{#if i > 0}<li aria-hidden="true" class="text-ecohubs-light/40">·</li>{/if}
						<li class="border-b border-ecohubs-light/40 pb-0.5 text-[13px] text-ecohubs-ivory/80">
							{topic}
						</li>
					{/each}
				</ul>
			</div>
		</header>

		<!-- ═══ THE INVITATION ═══ -->
		<section class="bg-ecohubs-deep text-ecohubs-ivory">
			<div
				class="mx-auto grid max-w-[1180px] items-start gap-14 px-6 pb-28 pt-16 md:grid-cols-2"
				data-scroll-animate="fade-up"
			>
				<div>
					<div class="kicker mb-4 font-mono text-ecohubs-light">The invitation</div>
					<h2 class="text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]">
						It isn’t you. It’s the way we live.
					</h2>
				</div>
				<div class="flex flex-col gap-5 text-lg leading-relaxed text-ecohubs-ivory/80">
					<p class="text-pretty">
						Most of us can describe what’s broken — the loneliness, the work that serves no one you
						know, the decisions made somewhere far away, the land treated as inventory. Far fewer of
						us have ever lived the alternative, even for a week.
					</p>
					<p class="text-pretty">
						All over the world, people are trying: living together, on land, on purpose. An
						estimated <strong class="text-ecohubs-ivory"
							>80–90% of intentional communities fail</strong
						>
						— rarely because the people were wrong, but because nobody agreed in advance how to share
						a kitchen, make a decision, or what to do when there’s a fight.
					</p>
					<p class="font-story text-2xl italic leading-snug text-ecohubs-light">
						That is fixable. Structure can be learned. So let’s learn it in the jungle.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══ WHAT KIND OF EXPERIENCE ═══ -->
		<section class="bg-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-28">
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-dark">
						What kind of experience is this?
					</div>
					<h2
						class="mb-5 max-w-[820px] text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]"
					>
						You’re not coming to watch. You’re coming to build a temporary village.
					</h2>
					<p class="mb-14 max-w-[720px] text-pretty text-lg leading-relaxed text-stone-600">
						In spirit it sits closer to the participatory side of a festival than the stage side —
						but smaller, guided, and focused on how intentional community actually works. Thin
						fiction, real practice: for five days the camp <em>is</em> the community.
					</p>
				</div>
				<div
					data-scroll-stagger
					class="grid gap-0.5 overflow-hidden rounded-[20px] bg-stone-300 md:grid-cols-3"
				>
					{#each notBut as item}
						<div class="bg-ecohubs-base px-7 py-8">
							<div class="mb-3.5 font-mono text-xs text-ecohubs-muted">NOT</div>
							<div
								class="font-serif text-2xl leading-tight text-ecohubs-muted line-through decoration-ecohubs-muted/50"
							>
								{item.not}
							</div>
							<div class="mb-2.5 mt-5 font-mono text-xs text-ecohubs-primary">BUT</div>
							<div class="font-serif text-2xl leading-tight">{item.but}</div>
							<p class="mt-2.5 text-[15px] leading-relaxed text-stone-600">{item.body}</p>
						</div>
					{/each}
				</div>
				<p class="mt-9 max-w-[720px] text-base leading-relaxed text-stone-600">
					For anyone drawn to community and unsure how it actually works — people who want to live
					differently, people already in a shared project that’s harder than expected, and people
					who simply want to know whether the alternative is real.
					<strong class="text-ecohubs-text"
						>No land, no capital, no plan needed. Just five days.</strong
					>
				</p>
			</div>
		</section>

		<!-- ═══ THE JOURNEY ═══ -->
		<section id="journey" class="relative overflow-hidden bg-ecohubs-deep text-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 pb-14 pt-28">
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-light">
						The journey · 7 experiences across 5 days
					</div>
					<h2
						class="max-w-[900px] text-balance font-serif text-[clamp(36px,5vw,64px)] leading-[1.04]"
					>
						From what we’re tired of — to a village that could last.
					</h2>
					<p class="mt-6 max-w-[720px] text-pretty text-lg leading-relaxed text-ecohubs-ivory/80">
						Under every forest runs a network you cannot see, carrying food and messages between
						trees that look like they stand alone. Each day grows one more thread of it. Missing a
						day means arriving in a world you didn’t help build — so come for all five.
					</p>
				</div>
				<div data-scroll-stagger class="mt-14 grid gap-4 md:grid-cols-3">
					{#each rhythm as r}
						<div class="rounded-2xl border border-dashed border-ecohubs-light/35 px-5 py-5">
							<div class="{mono} mb-2 text-ecohubs-light">{r.label}</div>
							<p class="text-[15px] leading-normal text-ecohubs-ivory/80">{r.body}</p>
						</div>
					{/each}
				</div>
			</div>

			<div bind:this={journey} class="relative mx-auto max-w-[1180px] px-6 pb-[120px] pt-10">
				<div
					aria-hidden="true"
					class="absolute bottom-[120px] left-[51px] top-[60px] w-0.5 bg-ecohubs-light/15"
				></div>
				<div
					aria-hidden="true"
					style="height: {threadHeight}px"
					class="absolute left-[51px] top-[60px] w-0.5 bg-gradient-to-b from-ecohubs-light to-ecohubs-primary shadow-[0_0_12px_rgba(167,243,208,0.6)] transition-[height] duration-150 ease-linear"
				></div>

				{#each days as day, i}
					{@const isLast = i === days.length - 1}
					<article
						id="day-{i + 1}"
						class="grid grid-cols-[56px_minmax(0,1fr)] gap-5 {isLast ? '' : 'mb-[88px]'}"
					>
						<div class="pt-1.5">
							{#if isLast}
								<div
									class="relative z-[2] ml-[18px] mt-2.5 size-5 rounded-full bg-ecohubs-accent shadow-[0_0_20px_rgba(217,119,6,0.7)]"
								></div>
							{:else}
								<div
									class="pulse-dot relative z-[2] ml-[18px] mt-2.5 size-5 rounded-full bg-ecohubs-light text-ecohubs-light"
								></div>
							{/if}
						</div>
						<div data-scroll-animate="fade-up">
							<div class="mb-3.5 flex flex-wrap items-baseline gap-3">
								<span
									class="font-serif text-[56px] leading-none {isLast
										? 'text-amber-400'
										: 'text-ecohubs-light'}">{day.num}</span
								>
								<span class="font-mono text-[13px] uppercase text-ecohubs-ivory/75">{day.when}</span
								>
							</div>
							<h3 class="font-serif text-[clamp(28px,3.4vw,42px)] leading-[1.1]">{day.title}</h3>
							<p class="mb-6 mt-2 font-story text-xl italic text-ecohubs-light">{day.tagline}</p>
							<div class="grid gap-8 lg:grid-cols-2">
								<div>
									<p class="mb-5 text-pretty text-[17px] leading-relaxed text-ecohubs-ivory/80">
										{day.body}
									</p>
									<ul class="flex flex-col gap-2.5 text-base leading-normal text-ecohubs-ivory/90">
										{#each day.points as point}
											<li class="grid grid-cols-[18px_1fr] gap-2">
												<span aria-hidden="true" class="text-ecohubs-light">—</span>{point}
											</li>
										{/each}
									</ul>
								</div>
								<div class="flex flex-col gap-3.5">
									{@render aside(day.aside)}
									<div class="border-l-2 border-ecohubs-accent py-1 pl-4">
										<div class="{mono} mb-1.5 text-amber-400">You leave with</div>
										<p class="text-base leading-normal">{day.leaveWith}</p>
									</div>
								</div>
							</div>
							{@render village(i)}
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ═══ WHAT YOU CARRY HOME ═══ -->
		<section class="bg-ecohubs-base">
			<div class="mx-auto max-w-[1180px] px-6 py-28">
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-dark">What you carry home</div>
					<h2
						class="mb-4 max-w-[860px] text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]"
					>
						You’ll stop seeing community as something you hope for — and start seeing it as
						something you can design.
					</h2>
					<p class="mb-14 max-w-[700px] text-lg leading-relaxed text-stone-600">
						Everything we use comes from <a
							href="/rcos"
							class="border-b border-ecohubs-dark/40 text-ecohubs-dark hover:border-ecohubs-dark"
							>RCOS</a
						> — an open, free standard for communities that last, written by the EcoHubs community and
						tested on real land.
					</p>
				</div>
				<div data-scroll-stagger class="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
					{#each takeHome as item, i}
						<div class="border-t border-ecohubs-text pt-4">
							<div class="mb-2.5 font-mono text-xs uppercase text-ecohubs-primary">
								{String(i + 1).padStart(2, '0')} · {item.label}
							</div>
							<h3 class="mb-2 font-serif text-[22px] leading-tight">{item.title}</h3>
							<p class="text-[15px] leading-relaxed text-stone-600">{item.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══ VIDEO + HOST ═══ -->
		<section id="video" class="scroll-mt-16 bg-ecohubs-ivory">
			<div class="mx-auto grid max-w-[1180px] items-center gap-14 px-6 py-28 md:grid-cols-2">
				<div class="flex justify-center" data-scroll-animate="fade-up">
					<div class="w-full max-w-[340px]">
						<LiteYouTube
							videoId={camp.videoId}
							title="Community Mycelium — the camp’s video invitation"
							aspect="portrait"
							frameClass="rounded-3xl shadow-[0_30px_60px_-20px_rgba(11,46,36,0.45)]"
						/>
					</div>
				</div>
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-dark">Your host</div>
					<div class="mb-6 flex items-center gap-4">
						<enhanced:img
							src={stefan}
							alt="Stefan Lessle"
							sizes="84px"
							class="size-[84px] rounded-full border-[3px] border-ecohubs-base object-cover object-[68%_42%] ring-1 ring-stone-300"
						/>
						<div>
							<h2 class="font-serif text-[38px] leading-tight">Stefan Lessle</h2>
							<p class="mt-1 text-sm text-ecohubs-muted">
								Community structure architect · Founder of EcoHubs
							</p>
						</div>
					</div>
					<div class="flex flex-col gap-4 text-[17px] leading-relaxed text-stone-700">
						<p class="text-pretty">
							German-born software engineer and systems thinker, based in coastal Ecuador. Since
							2021 Stefan has lived largely off-grid in an ancestral village community — alongside
							years of systematic research into why most intentional communities fail, and what
							makes the ones that thrive different.
						</p>
						<p class="text-pretty">
							He founded EcoHubs in 2026 and authored <strong>RCOS</strong>, the Regenerative
							Community Operating System — an open standard that makes the invisible structures of
							community life explicit: governance, membership, conflict, economics. It’s
							co-developed and governed by the community, and already piloted with an established
							community in Ecuador.
						</p>
						<p class="font-story text-[19px] italic text-ecohubs-dark">
							“I’m not a trained mediator. I’m a systems designer. If something big comes up, we
							slow down — and ask for help.”
						</p>
					</div>
					<div class="mt-6 flex flex-wrap gap-5 text-[15px] font-medium">
						<a
							href="https://view.the-gathering.earth/person/1960/"
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration text-ecohubs-dark hover:text-ecohubs-primary"
							>Full profile ↗</a
						>
						<a href="/" class="text-ecohubs-dark hover:text-ecohubs-primary">ecohubs.community</a>
						<a
							href="https://www.instagram.com/ecohubs_community"
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration text-ecohubs-dark hover:text-ecohubs-primary"
							>@ecohubs_community ↗</a
						>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══ THE PLACE ═══ -->
		<section class="bg-ecohubs-deep text-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-28">
				<div class="mb-12 grid items-end gap-10 md:grid-cols-2" data-scroll-animate="fade-up">
					<div>
						<div class="kicker mb-4 font-mono text-ecohubs-light">The place</div>
						<h2 class="text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]">
							Yaxunah — a Maya village in the heart of the Yucatán.
						</h2>
					</div>
					<p class="text-pretty text-[17px] leading-relaxed text-ecohubs-ivory/75">
						Flat limestone lowland covered in dry tropical forest. There are almost no rivers here —
						the water runs underground and surfaces in cenotes, like the one right on the festival
						site. The ancient city of Yaxuná sits beside the village, and Chichén Itzá is close by.
					</p>
				</div>
				<div
					data-scroll-animate="fade-up"
					class="grid auto-rows-[260px] gap-3 sm:grid-cols-2 lg:grid-cols-4"
				>
					{#each gallery as photo}
						<div class="overflow-hidden rounded-2xl {photo.span}">
							<enhanced:img
								src={photo.src}
								alt={photo.alt}
								sizes={photo.sizes}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						</div>
					{/each}
				</div>
				<div class="mt-10 grid gap-6 md:grid-cols-3">
					{#each placeFacts as fact}
						<div>
							<h3 class="mb-1.5 font-serif text-xl">{fact.title}</h3>
							<p class="text-[15px] leading-normal text-ecohubs-ivory/75">{fact.body}</p>
						</div>
					{/each}
					<div>
						<a
							href={camp.festivalUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="mb-1.5 flex items-center gap-2.5 font-serif text-xl text-ecohubs-ivory hover:text-ecohubs-light"
						>
							<img src={gatheringLogo} alt="" class="size-[26px]" />
							The Gathering México ↗
						</a>
						<p class="text-[15px] leading-normal text-ecohubs-ivory/75">
							16 camps, 70+ experiences — permaculture, mangroves, art, inner work, regenerative
							tech.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══ PRACTICAL ═══ -->
		<section id="practical" class="scroll-mt-16 bg-ecohubs-base">
			<div class="mx-auto max-w-[1180px] px-6 py-28">
				<div class="kicker mb-4 font-mono text-ecohubs-dark">Everything you need to say yes</div>
				<h2
					class="mb-14 max-w-[800px] text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]"
				>
					Life in the camp
				</h2>
				<div class="grid border-t border-stone-300 sm:grid-cols-2 lg:grid-cols-3">
					{#each lifeInCamp as item}
						<div class="border-b border-stone-300 py-6 pr-6">
							<div class="{mono} mb-2 text-ecohubs-primary">{item.label}</div>
							<p class="text-base leading-relaxed text-stone-700">{item.body}</p>
						</div>
					{/each}
				</div>

				<h2 class="mb-8 mt-24 font-serif text-[clamp(28px,3.6vw,40px)] leading-[1.1]">
					Travel &amp; tickets
				</h2>
				<div class="grid items-start gap-6 lg:grid-cols-2">
					<div class="rounded-3xl bg-ecohubs-deep p-8 text-ecohubs-ivory md:p-9">
						{#if over}
							<div class="{mono} mb-3.5 text-amber-400">This edition has ended · For reference</div>
						{:else}
							<div class="{mono} mb-3.5 text-ecohubs-light">Full experience · Recommended</div>
						{/if}
						<div class="flex flex-wrap items-baseline gap-2.5">
							<span class="whitespace-nowrap font-serif text-[clamp(40px,5vw,56px)] leading-[1.05]"
								>{camp.price}</span
							>
							<span class="text-[15px] text-ecohubs-ivory/75">5 days · 4 nights</span>
						</div>
						<p class="mt-1.5 text-sm text-ecohubs-light/60">
							Roughly US$240 / €210 at current rates
						</p>
						<ul class="my-7 flex flex-col gap-2 text-[15px] leading-normal">
							{#each ticketIncludes as item}
								<li class="grid grid-cols-[20px_1fr]">
									<span aria-hidden="true" class="text-ecohubs-light">✓</span>{item}
								</li>
							{/each}
						</ul>
						{#if over}
							<span
								aria-disabled="true"
								class="block cursor-not-allowed rounded-full bg-ecohubs-ivory/10 p-4 text-center font-semibold text-ecohubs-ivory/60"
							>
								Ticket sales closed
							</span>
							<a
								href="/"
								class="mt-3 block text-center text-[15px] text-ecohubs-light underline underline-offset-2 hover:text-ecohubs-ivory"
							>
								Hear about the next village first →
							</a>
						{:else}
							<a
								href={camp.ticketUrl}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => trackTicket('tickets')}
								class="no-external-decoration block rounded-full bg-ecohubs-accent p-4 text-center font-semibold text-ecohubs-deep transition-colors hover:bg-amber-400"
							>
								Get your ticket on Luma
							</a>
						{/if}
						<p class="mt-3.5 text-[13px] leading-normal text-ecohubs-light/60">
							Shorter passes exist (MXN 3,800 / 2,800 / 1,800) — but the arc only works if you’re
							there for all five days. Under 12: half price. Under 2: free.
						</p>
					</div>
					<dl class="flex flex-col border-t border-stone-300">
						{#each travel as row}
							<div
								class="grid grid-cols-[minmax(0,120px)_minmax(0,1fr)] gap-4 border-b border-stone-300 py-4"
							>
								<dt class="pt-0.5 font-mono text-xs uppercase text-ecohubs-primary">{row.label}</dt>
								<dd class="text-[15px] leading-normal">
									{row.body}{#if row.map}
										·
										<a
											href={mapUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="no-external-decoration text-ecohubs-dark underline underline-offset-2 hover:text-ecohubs-primary"
											>Open map ↗</a
										>{/if}
								</dd>
							</div>
						{/each}
					</dl>
				</div>

				<h2 class="mb-8 mt-24 font-serif text-[clamp(28px,3.6vw,40px)] leading-[1.1]">
					Health &amp; safety
				</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{#each safety as item}
						<div class="rounded-[20px] bg-ecohubs-ivory p-6">
							<h3 class="mb-2 font-serif text-xl">{item.title}</h3>
							<p class="text-[15px] leading-relaxed text-stone-700">{item.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══ CONTACT ═══ -->
		<section id="contact" class="scroll-mt-16 bg-ecohubs-ivory">
			<div class="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-24 md:grid-cols-2">
				<div class="flex items-center gap-5">
					<enhanced:img
						src={stefan}
						alt="Stefan Lessle"
						sizes="112px"
						loading="lazy"
						class="size-28 shrink-0 rounded-full object-cover object-[68%_42%]"
					/>
					<div>
						<div class="kicker mb-2.5 font-mono text-ecohubs-dark">
							A real person, before you decide
						</div>
						<h2 class="text-balance font-serif text-[clamp(28px,3.6vw,40px)] leading-[1.1]">
							Questions about travel, food, health or the programme? Ask me.
						</h2>
					</div>
				</div>
				<div class="flex flex-col gap-3">
					<a
						href={contact.whatsappHref}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration flex items-center justify-between gap-3 rounded-[18px] bg-ecohubs-dark px-6 py-5 text-ecohubs-ivory transition-colors hover:bg-ecohubs-deep"
					>
						<span>
							<span class="{mono} block text-ecohubs-light">WhatsApp · Stefan</span>
							<span class="text-lg font-medium">{contact.whatsappNumber}</span>
						</span>
						<span aria-hidden="true" class="text-[22px]">→</span>
					</a>
					<a
						href="mailto:{contact.email}?subject=Community%20Mycelium"
						class="flex items-center justify-between gap-3 rounded-[18px] border border-stone-300 bg-ecohubs-base px-6 py-5 text-ecohubs-text transition-colors hover:border-ecohubs-primary"
					>
						<span>
							<span class="{mono} block text-ecohubs-primary">Email</span>
							<span class="text-lg font-medium">{contact.email}</span>
						</span>
						<span aria-hidden="true" class="text-[22px]">→</span>
					</a>
					<p class="px-1 text-sm text-ecohubs-muted">
						Festival team: <a
							href="mailto:{contact.festivalEmail}"
							class="text-ecohubs-dark underline underline-offset-2 hover:text-ecohubs-primary"
							>{contact.festivalEmail}</a
						>
					</p>
				</div>
			</div>
		</section>

		<!-- ═══ FINAL INVITATION ═══ -->
		<section class="relative overflow-hidden bg-ecohubs-deep text-ecohubs-ivory">
			<enhanced:img
				src={cenoteFromAbove}
				alt=""
				sizes="100vw"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover object-[center_70%] opacity-40"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-ecohubs-deep via-ecohubs-deep/55 to-ecohubs-deep/85"
			></div>
			<div
				class="relative mx-auto flex max-w-[900px] flex-col items-center px-6 py-36 text-center"
				data-scroll-animate="fade-up"
			>
				<img src={logo} alt="" class="mb-7 size-14" />
				<p class="mb-4 max-w-[620px] text-lg leading-relaxed text-ecohubs-ivory/80">
					{#if over}
						For five days in the Yucatán, a small living village asked:
					{:else}
						Come to the Yucatán for five days and build a small living village with people who are
						asking:
					{/if}
				</p>
				<h2
					class="text-balance font-story text-[clamp(34px,5.2vw,64px)] font-light italic leading-[1.12]"
				>
					What could community feel like if we built it intentionally?
				</h2>
				{#if over}
					<a
						href="/membership"
						class="mt-11 inline-block rounded-full bg-ecohubs-accent px-8 py-4 text-lg font-semibold text-ecohubs-deep transition-colors hover:bg-amber-400"
					>
						Keep building with EcoHubs
					</a>
					<p class="mt-4 text-sm text-ecohubs-ivory/60">
						{camp.festival.replace(' 2026', '')} took place {camp.dates} · Our village continues online
						for 90 days
					</p>
				{:else}
					<a
						href={camp.ticketUrl}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => trackTicket('final')}
						class="no-external-decoration mt-11 inline-block rounded-full bg-ecohubs-accent px-8 py-4 text-lg font-semibold text-ecohubs-deep transition-colors hover:bg-amber-400"
					>
						Hold your place in the village
					</a>
					<p class="mt-4 text-sm text-ecohubs-ivory/60">
						Choose the 5-day ticket and Community Mycelium as your camp · {camp.dates}
					</p>
				{/if}
			</div>
		</section>
	</main>

	<footer class="bg-[#06170f] text-ecohubs-light/60">
		<div
			class="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-6 py-9 text-sm"
		>
			<div class="flex items-center gap-3">
				<a href="/" class="flex shrink-0"><img src={logo} alt="EcoHubs" class="size-6" /></a>
				<a
					href="https://the-gathering.earth/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex shrink-0"><img src={gatheringLogo} alt="The Gathering" class="size-6" /></a
				>
				<span>{camp.name} · by EcoHubs · a camp at {camp.festival}</span>
			</div>
			<nav class="flex flex-wrap gap-5" aria-label="Festival links">
				{#each festivalLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration text-ecohubs-ivory/75 hover:text-ecohubs-light"
						>{link.label}</a
					>
				{/each}
				<a href="/" class="text-ecohubs-ivory/75 hover:text-ecohubs-light">EcoHubs</a>
			</nav>
		</div>
	</footer>
</div>
