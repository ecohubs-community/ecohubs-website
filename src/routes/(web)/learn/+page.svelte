<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { onMount } from 'svelte';
	import {
		DiscoveryList,
		GuideCard,
		LearnRail,
		PathCard,
		RabbitHole,
		TopicCard
	} from '$lib/components/learning';
	import { getProgress } from '$lib/learning/storage';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([]);

	// Read once for the whole page rather than per card.
	let read = $state<Record<string, unknown>>({});
	onMount(() => (read = getProgress()));

	/**
	 * The rabbit hole's opening pick.
	 *
	 * Derived from the newest content date rather than drawn at random: the
	 * server and the client must agree on the first render, and it still moves
	 * as the hub grows.
	 */
	const seed = $derived(
		data.recent[0]?.updated
			.replace(/\D/g, '')
			.split('')
			.reduce((n, d) => n + Number(d), 0) ?? 0
	);
</script>

<SEO
	title="Learning Hub — regenerative communities, explained"
	description="Plain explanations of how intentional communities work — governance, money, land, conflict and daily life — written by people building one."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

<!-- Opaque, because the site's animated backdrop sits at z-index -1 and would
     otherwise show through the whole page. The article routes get this from
     their <article> wrapper; index routes have none, so it lives here. -->
<div class="bg-ecohubs-base">
	<!-- One grid for the whole page, not one per section: the rail starts level
	     with the heading, as in the design, rather than below a full-width hero. -->
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Learning hub</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1
				class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
			>
				Learn everything about
				<em class="font-story font-normal italic text-ecohubs-primary">regenerative communities.</em
				>
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
				How these places actually work — how they decide, how they hold money and land, how they
				handle conflict, and why they break. Written by people building one, and honest about what
				we don't yet know.
			</p>

			<div class="hairline my-10"></div>

			<!-- ═══════════════════════════════════════════════════════
					FEATURED GUIDES
			═══════════════════════════════════════════════════════ -->
			{#if data.guides.length}
				<section>
					<div class="mb-7 flex flex-wrap items-end justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-emerald-700">Featured guides</div>
							<h2 class="font-serif text-[32px] leading-tight text-ecohubs-deep">
								Long reads that
								<em class="font-story font-normal text-stone-500 italic">finish the subject.</em>
							</h2>
						</div>
						<a href="/learn/guides" class="text-sm text-ecohubs-dark hover:text-ecohubs-deep">
							All guides →
						</a>
					</div>
					<!-- The first guide leads at full height; the rest run as compact rows. -->
					<ul class="grid gap-5 md:grid-cols-2">
						{#each data.guides as guide, i (guide.slug)}
							<li class="flex {i === 0 ? 'md:row-span-2' : ''}">
								<GuideCard {guide} featured={i === 0} class="w-full" />
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					TOPICS
			═══════════════════════════════════════════════════════ -->
			{#if data.topics.length}
				<section class="mt-20">
					<div class="mb-7 flex flex-wrap items-end justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-emerald-700">Browse by topic</div>
							<h2 class="font-serif text-[32px] leading-tight text-ecohubs-deep">
								Doors into the same house.
							</h2>
						</div>
						<a href="/learn/topics" class="text-sm text-ecohubs-dark hover:text-ecohubs-deep">
							All topics →
						</a>
					</div>
					<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{#each data.topics as topic (topic.slug)}
							<li class="flex"><TopicCard topic={{ ...topic, articles: topic.total }} /></li>
						{/each}
					</ul>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					LEARNING PATHS
			═══════════════════════════════════════════════════════ -->
			{#if data.paths.length}
				<section class="mt-20">
					<div class="kicker mb-3 text-emerald-700">Learning paths</div>
					<h2 class="mb-2 font-serif text-[32px] leading-tight text-ecohubs-deep">
						A sequence, when you don't know
						<em class="font-story font-normal text-stone-500 italic">where to start.</em>
					</h2>
					<p class="mb-7 max-w-2xl text-[15.5px] text-stone-600">
						Each path is an ordered set of lessons drawn from across the hub. Your place is
						remembered in this browser — no account, no email.
					</p>
					<ul class="grid gap-4 md:grid-cols-2">
						{#each data.paths as path (path.slug)}
							<li class="flex"><PathCard {path} {read} /></li>
						{/each}
					</ul>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					DISCOVERY
			═══════════════════════════════════════════════════════ -->
			<!-- Two columns while a panel has no data yet, three once it does — an empty
			     third of the row reads as something that failed to load. -->
			<section
				class="mt-20 grid gap-5 {data.referenced.length ? 'lg:grid-cols-3' : 'md:grid-cols-2'}"
			>
				<DiscoveryList title="Recently updated" items={data.recent} />
				<DiscoveryList
					title="Most linked to"
					items={data.referenced}
					ranked
					footnote="Counted from the pages that cite them. We do not track readers."
				/>
				<RabbitHole pool={data.rabbit} {seed} />
			</section>

			<div class="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
				<a
					href="/learn/compare"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="font-story italic">
						Or tell two things apart — {data.comparisons.length}
						{data.comparisons.length === 1 ? 'comparison' : 'comparisons'}
					</span>
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="/learn/glossary"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="font-story italic">
						Or look up a word — {data.glossaryCount}
						{data.glossaryCount === 1 ? 'term' : 'terms'} explained plainly
					</span>
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
			</div>
		</div>

		<LearnRail />
	</div>
</div>
