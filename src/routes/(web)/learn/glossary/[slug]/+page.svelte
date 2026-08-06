<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, Prose, TermCard } from '$lib/components/learning';
	import { CARD, META } from '$lib/components/learning/card';
	import { definedTerm, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const term = $derived(data.term);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Glossary', path: '/learn/glossary' },
			{ name: term.term, path: `/learn/glossary/${term.slug}` }
		])
	);
	const jsonLd = $derived(definedTerm(term));
</script>

<SEO
	title="{term.term} — EcoHubs glossary"
	description={term.short}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<!-- ═══════════════════════════════════════════════════════════════
			1. HERO
	═══════════════════════════════════════════════════════════════ -->
	<!-- One grid for the whole page, not one per section: in the design the rail
	     starts level with the title rather than below a full-width hero, and it
	     can only do that if the heading lives in the article column too. -->
	<div
		class="mx-auto grid max-w-[1360px] gap-14 px-6 pt-8 pb-20 md:pb-28 lg:grid-cols-[248px_minmax(0,1fr)]"
	>
		<div class="min-w-0 lg:order-2 lg:max-w-[820px]">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<a href="/learn/glossary" class="kicker text-emerald-700 hover:text-ecohubs-deep">
					{data.topicTitle} · glossary
				</a>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[56px]"
			>
				{term.term}
			</h1>

			<!-- The one-sentence definition, given visual weight because it is the
			     string most likely to be quoted — by a reader or an AI assistant. -->
			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">
				{term.short}
			</p>

			{#if data.practice}
				<!-- How to check a term of this kind against reality. Written once per
				     topic, because the advice is the same for every term under it. -->
				<section
					class="{CARD} mt-10 bg-ecohubs-ivory p-7 hover:border-stone-200/90 hover:shadow-none"
				>
					<div class="kicker mb-3 text-emerald-700">In practice</div>
					<p class="text-[15.5px] leading-relaxed text-stone-700">{data.practice}</p>
				</section>
			{/if}

			<div class="hairline my-10"></div>

			<!-- A term has one version, so it sits outside the depth system. -->
			<Prose layer={null}>
				<Content />
			</Prose>

			{#if data.related.length}
				<section class="mt-14 border-t border-stone-200 pt-8">
					<h2 class="kicker mb-5 text-emerald-700">Related terms</h2>
					<div class="grid gap-3 sm:grid-cols-2">
						{#each data.related as item (item.slug)}
							<TermCard term={{ ...item, topicTitle: data.topicTitle }} />
						{/each}
					</div>
				</section>
			{/if}

			{#if data.topicPublished || data.usedIn.length}
				<section class="mt-12">
					<h2 class="kicker mb-5 text-emerald-700">Where it appears</h2>
					<div class="grid gap-3 sm:grid-cols-2">
						{#if data.topicPublished}
							<a href="/learn/topics/{term.topic}" class="{CARD} bg-white p-5">
								<div class="{META} mb-2">Topic</div>
								<div class="font-serif text-[17px] leading-snug text-ecohubs-deep">
									{data.topicTitle}
								</div>
							</a>
						{/if}
						{#each data.usedIn as item (item.url)}
							<a href={item.url} class="{CARD} bg-white p-5">
								<div class="{META} mb-2 capitalize">{item.type}</div>
								<div class="font-serif text-[17px] leading-snug text-ecohubs-deep">
									{item.title}
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}

			<!-- The glossary should be readable straight through, not only searched.
			     Alphabetical, wrapping, so the last term still leads somewhere. -->
			<nav
				aria-label="Glossary navigation"
				class="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-8"
			>
				<a
					href="/learn/glossary"
					class="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					All terms
				</a>
				{#if data.next}
					<a
						href="/learn/glossary/{data.next.slug}"
						rel="next"
						class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
					>
						{data.next.term} <span aria-hidden="true">→</span>
					</a>
				{/if}
			</nav>
		</div>

		<!-- A definition has no sections worth listing, so the rail's upper
			     half carries where the word actually gets used instead. -->
		<LearnRail
			withinTitle="Where this comes up"
			within={data.usedIn.map((u) => ({ href: u.url, label: u.title, note: u.type }))}
			sidewaysTitle="Related terms"
			sideways={data.related.map((r) => ({
				href: `/learn/glossary/${r.slug}`,
				label: r.term
			}))}
			backLink={{ href: '/learn/glossary', label: 'All terms' }}
		/>
	</div>
</article>
