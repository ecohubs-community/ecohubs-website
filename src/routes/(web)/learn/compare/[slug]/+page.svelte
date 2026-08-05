<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { DepthSwitch, Prose } from '$lib/components/learning';
	import { comparisonArticle, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const compare = $derived(data.compare);
	const Content = $derived(data.content as Component);

	// No intermediate "Compare" crumb: there is no /learn/compare index, so it
	// would have pointed back at /learn — a duplicate URL in the trail, and a
	// misleading BreadcrumbList in the schema.
	const breadcrumbs = $derived(
		learningBreadcrumbs([{ name: compare.title, path: `/learn/compare/${compare.slug}` }])
	);
	const jsonLd = $derived(comparisonArticle(compare));
</script>

<SEO
	title="{compare.title} — EcoHubs"
	description={compare.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<!-- ═══════════════════════════════════════════════════════════════
			1. HERO
	═══════════════════════════════════════════════════════════════ -->
	<section class="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-14">
		<div
			class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
		></div>

		<div class="mx-auto max-w-3xl px-6 lg:px-8">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Compared</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
			>
				{compare.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">
				{compare.summary}
			</p>

			<div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-stone-500">
				<span class="font-story italic">{data.readingMinutes} min read</span>
				<span class="text-stone-300">·</span>
				{#if data.topicPublished}
					<a href="/learn/topics/{compare.topic}" class="hover:text-ecohubs-deep">
						{data.topicTitle}
					</a>
				{:else}
					<span>{data.topicTitle}</span>
				{/if}
				<span class="ml-auto"><DepthSwitch /></span>
			</div>
		</div>
	</section>

	<div class="hairline mx-auto max-w-3xl"></div>

	<!-- ═══════════════════════════════════════════════════════════════
			2. BODY
	═══════════════════════════════════════════════════════════════ -->
	<section class="pt-12">
		<div class="mx-auto max-w-3xl px-6 lg:px-8">
			<Prose>
				<Content />
			</Prose>

			{#if data.terms.length}
				<section class="mt-14 border-t border-stone-200 pt-8">
					<h2 class="kicker mb-4 text-stone-500">Terms used here</h2>
					<dl class="grid gap-4 sm:grid-cols-2">
						{#each data.terms as item (item.slug)}
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

			{#if data.others.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">Still deciding?</h2>
					<ul class="space-y-3">
						{#each data.others as item (item.slug)}
							<li>
								<a
									href="/learn/compare/{item.slug}"
									class="font-serif text-lg text-ecohubs-deep transition-colors hover:text-ecohubs-primary"
								>
									{item.title}
								</a>
								<p class="mt-1 text-sm text-stone-600">{item.summary}</p>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<div class="mt-14 text-center">
				<a
					href="/learn"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">The learning hub</span>
				</a>
			</div>
		</div>
	</section>
</article>
