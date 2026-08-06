<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import {
		ArticleToc,
		BookmarkButton,
		DepthSwitch,
		LearnRail,
		Prose,
		ReadToggle,
		ShareButton
	} from '$lib/components/learning';
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
	<!-- One grid for the whole page, not one per section: in the design the rail
	     starts level with the title rather than below a full-width hero, and it
	     can only do that if the heading lives in the article column too. -->
	<div
		class="mx-auto grid max-w-3xl gap-12 px-6 pt-8 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
	>
		<div class="min-w-0 lg:order-2">
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

			<!-- Facts about the page, in the design's mono meta voice. -->
			<div
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]"
			>
				<span>{data.readingMinutes} min read</span>
				<span aria-hidden="true">·</span>
				{#if data.topicPublished}
					<a href="/learn/topics/{compare.topic}" class="hover:text-ecohubs-dark">
						{data.topicTitle}
					</a>
				{:else}
					<span>{data.topicTitle}</span>
				{/if}
			</div>

			<!-- Things you can do with the page, all one pill row. -->
			<div class="mt-6 flex flex-wrap items-center gap-3">
				<DepthSwitch />
				<ReadToggle id={compare.slug} />
				<BookmarkButton id={compare.slug} type="comparison" title={compare.title} />
				<ShareButton title={compare.title} />
			</div>

			<div class="hairline my-10"></div>

			<!-- Repeats the rail's section list, which is hidden below `lg`. -->
			<div class="mb-10"><ArticleToc headings={data.headings} /></div>

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

		<!-- A comparison's "sideways" is the other comparisons: someone still
			     weighing one pair is often weighing the next. -->
		<LearnRail
			withinTitle="On this page"
			within={data.headings.map((h) => ({ href: `#${h.id}`, label: h.text }))}
			sidewaysTitle="Other comparisons"
			sideways={data.others.map((o) => ({
				href: `/learn/compare/${o.slug}`,
				label: o.title
			}))}
			backLink={data.topicPublished
				? { href: `/learn/topics/${compare.topic}`, label: data.topicTitle }
				: { href: '/learn/topics', label: 'All topics' }}
		/>
	</div>
</article>
