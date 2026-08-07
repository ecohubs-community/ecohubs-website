<script lang="ts">
	import type { Component } from 'svelte';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import Icon from '$lib/components/Icon.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { onMount } from 'svelte';
	import {
		ArticleToc,
		BookmarkButton,
		DepthSwitch,
		LearnRail,
		Prose,
		ReadToggle,
		ShareButton
	} from '$lib/components/learning';
	import { getProgress } from '$lib/learning/storage';
	import { learningBreadcrumbs, lessonArticle } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const lesson = $derived(data.lesson);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: data.guide.title, path: `/learn/guides/${data.guide.slug}` },
			{ name: lesson.title, path: `/learn/guides/${data.guide.slug}/${lesson.slug}` }
		])
	);
	let read = $state<Record<string, unknown>>({});
	onMount(() => (read = getProgress()));

	const jsonLd = $derived(lessonArticle(lesson, data.guide));
</script>

<SEO
	title="{lesson.title} — EcoHubs"
	description={lesson.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<!-- One grid for the whole page, not one per section: in the design the rail
	     starts level with the title rather than below a full-width hero, and it
	     can only do that if the heading lives in the article column too. -->
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2 lg:max-w-[820px]">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<a
					href="/learn/guides/{data.guide.slug}"
					class="kicker text-emerald-700 hover:text-ecohubs-deep"
				>
					{data.guide.title}
				</a>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<p class="mb-3 font-story text-lg text-stone-400 italic">
				Lesson {String(data.position).padStart(2, '0')} of {data.total}
			</p>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
			>
				{lesson.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">{lesson.summary}</p>

			<!-- Facts about the page, in the design's mono meta voice. -->
			<div
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]"
			>
				<span>{data.readingMinutes} min read</span>
				<span aria-hidden="true">·</span>
				<span>Lesson {data.position} of {data.siblings.length}</span>
			</div>

			<!-- Things you can do with the page, all one pill row. -->
			<div class="mt-6 flex flex-wrap items-center gap-3">
				<DepthSwitch />
				<ReadToggle id={lesson.slug} />
				<BookmarkButton id={lesson.slug} type="lesson" title={lesson.title} />
				<ShareButton title={lesson.title} />
			</div>

			<div class="hairline my-10"></div>

			<!-- Repeats the rail's section list, which is hidden below `lg`. -->
			<div class="mb-10"><ArticleToc headings={data.headings} /></div>

			<Prose>
				<Content />
			</Prose>

			{#if data.terms.length}
				<section class="mt-14 border-t border-stone-200 pt-8">
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

			<!-- ═══════════════════════════════════════════════════════════
					PREV / NEXT
			═══════════════════════════════════════════════════════════ -->
			<nav
				aria-label="Lesson navigation"
				class="mt-14 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-2"
			>
				{#if data.previous}
					<a
						href="/learn/guides/{data.guide.slug}/{data.previous.slug}"
						rel="prev"
						class="group rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:soft-shadow"
					>
						<span class="kicker block text-stone-400">Previous</span>
						<span class="mt-1 flex items-center gap-2.5">
							<!-- The arrow steps toward its edge on hover, so the direction is
							     felt rather than only read. -->
							<Icon
								icon="tabler:arrow-narrow-left"
								class="h-5 w-5 shrink-0 text-stone-400 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-ecohubs-primary"
								aria-hidden="true"
							/>
							<span
								class="font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
							>
								{data.previous.title}
							</span>
						</span>
					</a>
				{:else}
					<span></span>
				{/if}

				{#if data.next}
					<a
						href="/learn/guides/{data.guide.slug}/{data.next.slug}"
						rel="next"
						class="group rounded-2xl border border-stone-200/70 bg-white p-5 text-right transition-all duration-300 hover:soft-shadow"
					>
						<span class="kicker block text-stone-400">Next</span>
						<span class="mt-1 flex items-center justify-end gap-2.5">
							<span
								class="font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
							>
								{data.next.title}
							</span>
							<Icon
								icon="tabler:arrow-narrow-right"
								class="h-5 w-5 shrink-0 text-stone-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ecohubs-primary"
								aria-hidden="true"
							/>
						</span>
					</a>
				{:else}
					<a
						href="/learn/guides/{data.guide.slug}"
						class="group rounded-2xl border border-stone-200/70 bg-white p-5 text-right transition-all duration-300 hover:soft-shadow"
					>
						<span class="kicker block text-stone-400">You reached the end</span>
						<span class="mt-1 flex items-center justify-end gap-2.5">
							<span
								class="font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
							>
								Back to {data.guide.title}
							</span>
							<!-- Up, not right: this one returns to the guide rather than
							     continuing through it. -->
							<Icon
								icon="tabler:arrow-narrow-up"
								class="h-5 w-5 shrink-0 text-stone-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-ecohubs-primary"
								aria-hidden="true"
							/>
						</span>
					</a>
				{/if}
			</nav>
		</div>

		<LearnRail
			withinTitle="This guide · {data.siblings.length} lessons"
			within={data.siblings.map((s) => ({
				href: s.href,
				label: s.label,
				current: s.current,
				done: !!read[s.slug],
				note: `${s.minutes} min`
			}))}
			backLink={{ href: `/learn/guides/${data.guide.slug}`, label: 'Guide overview' }}
		/>
	</div>
</article>
