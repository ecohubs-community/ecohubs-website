<script lang="ts">
	import type { Component } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { BookmarkButton, DepthSwitch, LearnRail, Prose, ReadToggle } from '$lib/components/learning';
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
	<section class="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-14">
		<div
			class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
		></div>

		<div class="mx-auto max-w-3xl px-6 lg:px-8">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<a href="/learn/guides/{data.guide.slug}" class="kicker text-emerald-700 hover:text-ecohubs-deep">
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

			<div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-stone-500">
				<span class="font-story italic">{data.readingMinutes} min read</span>
				<ReadToggle id={lesson.slug} />
				<BookmarkButton id={lesson.slug} type="lesson" title={lesson.title} />
				<span class="ml-auto"><DepthSwitch /></span>
			</div>
		</div>
	</section>

	<div class="hairline mx-auto max-w-3xl"></div>

	<section class="pt-12">
		<!-- Article first in source order; the rail is moved left by grid
		     ordering. Otherwise every lesson page would open, for a crawler,
		     with the same list of links. -->
		<div
			class="mx-auto grid max-w-3xl gap-12 px-6 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
		>
			<div class="min-w-0 lg:order-2">
			{#if data.headings.length > 2}
				<!-- Plain anchors, so the contents work before hydration and for a
				     reader with no JavaScript. Hidden in quick mode along with the
				     rest of the body it describes. -->
				<nav
					data-depth-layer="standard"
					aria-label="On this page"
					class="mb-10 rounded-2xl border border-stone-200/70 bg-white p-6
					       [html[data-depth=quick]_&]:hidden print:hidden"
				>
					<p class="kicker mb-3 text-stone-500">On this page</p>
					<ol class="space-y-2 text-sm">
						{#each data.headings as heading (heading.id)}
							<li>
								<a
									href="#{heading.id}"
									class="text-stone-600 transition-colors hover:text-ecohubs-deep"
								>
									{heading.text}
								</a>
							</li>
						{/each}
					</ol>
				</nav>
			{/if}

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
			<nav aria-label="Lesson navigation" class="mt-14 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-2">
				{#if data.previous}
					<a
						href="/learn/guides/{data.guide.slug}/{data.previous.slug}"
						rel="prev"
						class="group rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:soft-shadow"
					>
						<span class="kicker block text-stone-400">Previous</span>
						<span
							class="mt-1 block font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
						>
							{data.previous.title}
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
						<span
							class="mt-1 block font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
						>
							{data.next.title}
						</span>
					</a>
				{:else}
					<a
						href="/learn/guides/{data.guide.slug}"
						class="group rounded-2xl border border-stone-200/70 bg-white p-5 text-right transition-all duration-300 hover:soft-shadow"
					>
						<span class="kicker block text-stone-400">You reached the end</span>
						<span
							class="mt-1 block font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
						>
							Back to {data.guide.title}
						</span>
					</a>
				{/if}
			</nav>
			</div>

			<LearnRail
				withinTitle="This guide"
				within={data.siblings.map((s) => ({
					href: s.href,
					label: s.label,
					marker: s.marker,
					current: s.current,
					note: `${s.minutes} min`
				}))}
				backLink={{ href: `/learn/guides/${data.guide.slug}`, label: 'Guide overview' }}
			/>
		</div>
	</section>
</article>
