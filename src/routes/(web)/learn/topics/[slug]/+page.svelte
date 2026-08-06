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
	import { learningBreadcrumbs, topicArticle } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const topic = $derived(data.topic);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Topics', path: '/learn/topics' },
			{ name: topic.title, path: `/learn/topics/${topic.slug}` }
		])
	);
	const jsonLd = $derived(topicArticle(topic));

	// "2 August 2026" — spelled out, because the mono meta line is read, not scanned.
	const formatted = $derived(
		new Date(topic.updated).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);
</script>

<SEO
	title="{topic.title} — EcoHubs"
	description={topic.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<!-- One grid for the whole page, not one per section: in the design the rail
	     starts level with the title rather than below a full-width hero, and it
	     can only do that if the heading lives in the article column too. -->
	<div
		class="mx-auto grid max-w-3xl gap-12 px-6 pt-8 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
	>
		<div class="min-w-0 lg:order-2">
			<!-- ═══════════════════════════════════════════════════════
					1. HEADER
			═══════════════════════════════════════════════════════ -->
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<a href="/learn/topics" class="kicker text-emerald-700 hover:text-ecohubs-deep">Topic</a>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[56px]"
			>
				{topic.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">{topic.summary}</p>

			<!-- Facts about the page, in the design's mono meta voice. -->
			<div
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]"
			>
				<span>{data.readingMinutes} min read</span>
				{#if topic.rcosLayer !== undefined}
					<span aria-hidden="true">·</span>
					<a
						href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-ecohubs-dark"
					>
						RCOS Layer {topic.rcosLayer}
					</a>
				{/if}
				<span aria-hidden="true">·</span>
				<span>Updated {formatted}</span>
			</div>

			<!-- Things you can do with the page, all one pill row. -->
			<div class="mt-6 flex flex-wrap items-center gap-3">
				<DepthSwitch />
				<ReadToggle id={topic.slug} />
				<BookmarkButton id={topic.slug} type="topic" title={topic.title} />
				<ShareButton title={topic.title} />
			</div>

			<div class="hairline my-10"></div>

			<!-- ═══════════════════════════════════════════════════════
					2. BODY
			═══════════════════════════════════════════════════════ -->
			<!-- Repeats the rail's section list, which is hidden below `lg`. -->
			<div class="mb-10"><ArticleToc headings={data.headings} /></div>

			<Prose>
				<Content />
			</Prose>

			{#if data.guides.length}
				<section class="mt-14 border-t border-stone-200 pt-8">
					<h2 class="kicker mb-4 text-stone-500">Guides on this</h2>
					<ul class="space-y-4">
						{#each data.guides as guide (guide.slug)}
							<li>
								<a
									href="/learn/guides/{guide.slug}"
									class="font-serif text-lg text-ecohubs-deep transition-colors hover:text-ecohubs-primary"
								>
									{guide.title}
								</a>
								<p class="mt-1 text-sm text-stone-600">{guide.summary}</p>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if data.comparisons.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">Told apart</h2>
					<ul class="space-y-4">
						{#each data.comparisons as item (item.slug)}
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

			{#if data.cases.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">Places that did it</h2>
					<ul class="space-y-4">
						{#each data.cases as item (item.slug)}
							<li>
								<a
									href="/learn/cases/{item.slug}"
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

			{#if data.terms.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">Words used here</h2>
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

			<div class="mt-14 text-center">
				<a
					href="/learn/topics"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">All topics</span>
				</a>
			</div>
		</div>

		<!-- A topic's "within" is its own sections; a lesson's is its siblings. -->
		<LearnRail
			withinTitle={topic.title}
			within={data.headings.map((h) => ({ href: `#${h.id}`, label: h.text }))}
			sidewaysTitle="Related topics"
			sideways={data.relatedTopics}
			backLink={{ href: '/learn/topics', label: 'All topics' }}
		/>
	</div>
</article>
