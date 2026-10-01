<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { eventPhase, type EventPhase } from '$lib/config/events';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';
	import { events, type EventEntry } from './data';

	let { data } = $props();

	// Sorted against the server's clock first so hydration matches the cached
	// HTML, then against the reader's. A `?phase=` preview overrides both.
	let now = $state(new Date(data.renderedAt));
	const phaseOf = (event: EventEntry): EventPhase => data.preview ?? eventPhase(event, now);

	const upcoming = $derived(
		events
			.filter((e) => phaseOf(e) !== 'over')
			.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
	);
	const past = $derived(
		events
			.filter((e) => phaseOf(e) === 'over')
			.sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime())
	);

	onMount(() => {
		now = new Date();
		if (prefersReducedMotion()) return;

		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});

	const badge: Record<EventPhase, string> = {
		upcoming: 'Upcoming',
		happening: 'Happening now',
		over: 'Took place'
	};
</script>

<SEO
	title="Events — EcoHubs"
	description="Where EcoHubs meets in person: camps and gatherings on real land, where we practise the community design we write about. Dates, places and how to join."
	ogImage="/og-default.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Events', url: 'https://ecohubs.community/events' }
	]}
/>

{#snippet eventCard(event: EventEntry)}
	{@const phase = phaseOf(event)}
	{@const over = phase === 'over'}
	<article
		class="grid overflow-hidden rounded-3xl border border-stone-200/80 bg-white soft-shadow transition-colors hover:border-ecohubs-primary/50 lg:grid-cols-12"
	>
		<a
			href={event.href}
			class="relative block min-h-[220px] lg:col-span-5"
			tabindex="-1"
			aria-hidden="true"
		>
			<enhanced:img
				src={event.image}
				alt={event.imageAlt}
				sizes="(min-width: 1024px) 480px, 100vw"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover {over ? 'grayscale-[35%]' : ''}"
			/>
			<span
				class="absolute bottom-4 left-4 rounded-full px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]
					{over ? 'bg-white/90 text-stone-700' : 'bg-ecohubs-accent text-ecohubs-deep'}"
			>
				{badge[phase]}
			</span>
		</a>

		<div class="p-5 md:p-7 lg:col-span-7">
			<div class="kicker mb-4 text-emerald-700">
				{event.dates} · {event.place}
			</div>
			<h3 class="font-serif text-3xl leading-tight text-ecohubs-deep md:text-4xl">
				<a href={event.href} class="hover:text-ecohubs-dark">{event.title}</a>
			</h3>
			<p class="mt-2 text-sm text-stone-500">
				{event.format} · at
				<a
					href={event.host.url}
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration border-b border-stone-300 hover:border-ecohubs-dark"
					>{event.host.name}</a
				>
			</p>
			<p class="mt-5 max-w-2xl leading-relaxed text-stone-700">
				{over ? event.recap : event.invitation}
			</p>

			{#if !over}
				<dl class="mt-5 grid max-w-md grid-cols-3 gap-4 border-y border-stone-200 py-2">
					{#each event.facts as fact (fact.label)}
						<div>
							<dt class="font-mono text-[11px] uppercase tracking-[0.1em] text-stone-500">
								{fact.label}
							</dt>
							<dd class="mt-0.5 whitespace-nowrap font-serif text-lg text-ecohubs-deep">
								{fact.value}
							</dd>
						</div>
					{/each}
				</dl>
			{/if}

			<div class="mt-5 flex flex-col flex-wrap gap-3 sm:flex-row">
				{#if over}
					<a
						href={event.href}
						class="self-start border-b border-ecohubs-dark/40 pb-1 text-ecohubs-dark hover:border-ecohubs-dark"
					>
						See what happened →
					</a>
				{:else}
					<a
						href={event.href}
						class="group inline-flex items-center justify-center gap-2 rounded-full bg-ecohubs-dark px-4 py-1.5 font-medium text-white transition-colors hover:bg-ecohubs-deep"
					>
						See the programme
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					{#if event.ticketUrl}
						<a
							href={event.ticketUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration inline-flex items-center justify-center rounded-full border border-stone-300 bg-transparent px-4 py-1.5 font-medium text-stone-800 transition-colors hover:border-ecohubs-dark"
						>
							Get your ticket
						</a>
					{/if}
				{/if}
			</div>
		</div>
	</article>
{/snippet}

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden pb-14 pt-32 md:pb-16 md:pt-40">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -right-20 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div data-hero-step="0.05" style="--hero-delay: 0.05s" class="kicker mb-5 text-emerald-700">
			Events
		</div>
		<h1
			data-hero-step="0.15"
			style="--hero-delay: 0.15s"
			class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[68px]"
		>
			Where we meet
			<em class="font-story font-normal italic text-stone-500">in person.</em>
		</h1>
		<p
			data-hero-step="0.3"
			style="--hero-delay: 0.3s"
			class="mt-7 max-w-2xl text-lg font-light leading-relaxed text-stone-700"
		>
			Most of EcoHubs happens online — calls, writing, the standard. A few times a year we gather on
			real land to practise what we write: founding a village for a few days, deciding together, and
			finding out what holds.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		2. COMING UP
═══════════════════════════════════════════════════════════════════ -->
<section class="pb-20 md:pb-28">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<h2 class="kicker mb-6 text-stone-500">Coming up</h2>
		{#if upcoming.length}
			<div data-scroll-stagger class="flex flex-col gap-8">
				{#each upcoming as event (event.slug)}
					{@render eventCard(event)}
				{/each}
			</div>
		{:else}
			<div
				class="rounded-3xl border border-dashed border-stone-300 bg-ecohubs-ivory/60 px-7 py-10 md:px-10"
			>
				<h3 class="font-serif text-2xl text-ecohubs-deep md:text-3xl">
					Nothing on the calendar
					<em class="font-story font-normal italic text-stone-500">just yet.</em>
				</h3>
				<p class="mt-3 max-w-2xl leading-relaxed text-stone-700">
					The next gathering is being planned. The newsletter below is the first place it will be
					announced — or write to us if you would like to host one.
				</p>
				<a
					href="/contact"
					class="mt-6 inline-block border-b border-ecohubs-dark/40 pb-1 text-ecohubs-dark hover:border-ecohubs-dark"
				>
					Get in touch →
				</a>
			</div>
		{/if}
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		3. PAST
═══════════════════════════════════════════════════════════════════ -->
{#if past.length}
	<section class="bg-ecohubs-ivory py-20 md:py-28">
		<div class="mx-auto max-w-5xl px-6 lg:px-8">
			<h2 class="kicker mb-6 text-stone-500">Past events</h2>
			<div data-scroll-stagger class="flex flex-col gap-8">
				{#each past as event (event.slug)}
					{@render eventCard(event)}
				{/each}
			</div>
		</div>
	</section>
{/if}
