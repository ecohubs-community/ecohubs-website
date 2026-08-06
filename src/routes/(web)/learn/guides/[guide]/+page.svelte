<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, Prose } from '$lib/components/learning';
	import { onMount } from 'svelte';
	import { getProgress } from '$lib/learning/storage';
	import { guideArticle, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const guide = $derived(data.guide);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([{ name: guide.title, path: `/learn/guides/${guide.slug}` }])
	);
	const jsonLd = $derived(guideArticle(guide, data.lessons));

	// Which lessons this browser has finished. Empty on the server, so every
	// tick renders unfilled and then fills in after hydration — the rail's
	// content never depends on it.
	let read = $state<Record<string, unknown>>({});
	onMount(() => (read = getProgress()));
</script>

<SEO
	title="{guide.title} — EcoHubs"
	description={guide.summary}
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
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Guide · {guide.level}</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
			>
				{guide.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">{guide.summary}</p>

			<!-- Facts about the page, in the design's mono meta voice. -->
			<div
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]"
			>
				<span>
					{data.lessons.length}
					{data.lessons.length === 1 ? 'lesson' : 'lessons'}
				</span>
				<span aria-hidden="true">·</span>
				<span>{data.totalMinutes} min in total</span>
				{#if data.topicPublished}
					<span aria-hidden="true">·</span>
					<a href="/learn/topics/{guide.topic}" class="hover:text-ecohubs-dark">{data.topicTitle}</a
					>
				{/if}
			</div>

			<div class="hairline my-10"></div>

			<Prose layer={null}>
				<Content />
			</Prose>

			{#if data.lessons.length}
				<section class="mt-12">
					<h2 class="kicker mb-5 text-stone-500">
						{data.lessons.length} lessons, in order
					</h2>
					<ol class="space-y-3">
						{#each data.lessons as lesson (lesson.slug)}
							<li>
								<a
									href="/learn/guides/{guide.slug}/{lesson.slug}"
									class="group flex gap-5 rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:soft-shadow"
								>
									<span class="shrink-0 font-story text-lg text-stone-400 italic">
										{String(lesson.number).padStart(2, '0')}
									</span>
									<span class="min-w-0">
										<span
											class="block font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
										>
											{lesson.title}
										</span>
										<span class="mt-1 block text-sm leading-relaxed text-stone-600">
											{lesson.summary}
										</span>
										<span class="mt-2 block text-xs text-stone-400">{lesson.minutes} min</span>
									</span>
								</a>
							</li>
						{/each}
					</ol>
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

		<LearnRail
			withinTitle="This guide · {data.lessons.length} lessons"
			within={data.lessons.map((l) => ({
				href: `/learn/guides/${guide.slug}/${l.slug}`,
				label: l.title,
				done: !!read[l.slug],
				note: `${l.minutes} min`
			}))}
			sidewaysTitle="Other guides"
			sideways={data.otherGuides}
		/>
	</div>
</article>
