<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { DepthSwitch, LearnRail, Prose } from '$lib/components/learning';
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
	<!-- ═══════════════════════════════════════════════════════════════
			1. HERO
	═══════════════════════════════════════════════════════════════ -->
	<section class="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-14">
		<div
			class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
		></div>

		<div class="mx-auto max-w-3xl px-6 lg:px-8">
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

			<div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-stone-500">
				<span class="font-story italic">{data.readingMinutes} min read</span>
				{#if topic.rcosLayer !== undefined}
					<span class="text-stone-300">·</span>
					<a
						href="https://rcos.ecohubs.community/articles/rcos-core/v0-1/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-ecohubs-deep"
					>
						RCOS Layer {topic.rcosLayer}
					</a>
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
		<!-- Article first in source order; the rail is placed left by grid order. -->
		<div
			class="mx-auto grid max-w-3xl gap-12 px-6 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
		>
			<div class="min-w-0 lg:order-2">
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
				withinTitle="On this page"
				within={data.headings.map((h) => ({ href: `#${h.id}`, label: h.text }))}
				sidewaysTitle="Related topics"
				sideways={data.relatedTopics}
				backLink={{ href: '/learn/topics', label: 'All topics' }}
			/>
		</div>
	</section>
</article>
