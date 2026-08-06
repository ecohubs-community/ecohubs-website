<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, Prose } from '$lib/components/learning';
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
					Glossary
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

			<p class="mt-5 text-sm text-stone-500">
				{#if data.topicPublished}
					<a href="/learn/topics/{term.topic}" class="hover:text-ecohubs-deep">{data.topicTitle}</a>
				{:else}
					{data.topicTitle}
				{/if}
			</p>

			<div class="hairline my-10"></div>

			<!-- A term has one version, so it sits outside the depth system. -->
			<Prose layer={null}>
				<Content />
			</Prose>

			{#if data.related.length}
				<section class="mt-14 border-t border-stone-200 pt-8">
					<h2 class="kicker mb-4 text-stone-500">Related terms</h2>
					<dl class="grid gap-4 sm:grid-cols-2">
						{#each data.related as item (item.slug)}
							<div class="rounded-2xl border border-stone-200/70 bg-white p-5">
								<dt class="font-serif text-lg text-ecohubs-deep">
									<a
										href="/learn/glossary/{item.slug}"
										class="transition-colors hover:text-ecohubs-primary"
									>
										{item.term}
									</a>
								</dt>
								<dd class="mt-2 text-sm leading-relaxed text-stone-700">{item.short}</dd>
							</div>
						{/each}
					</dl>
				</section>
			{/if}

			{#if data.usedIn.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">Where this comes up</h2>
					<ul class="space-y-2 text-sm">
						{#each data.usedIn as item (item.url)}
							<li>
								<a
									href={item.url}
									class="text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
								>
									{item.title}
								</a>
								<span class="text-stone-400"> · {item.type}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<div class="mt-14 text-center">
				<a
					href="/learn/glossary"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">All terms</span>
				</a>
			</div>
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
