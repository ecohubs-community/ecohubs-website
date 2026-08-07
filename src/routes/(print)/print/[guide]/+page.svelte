<script lang="ts">
	/**
	 * The whole guide as one document: cover, contents, every lesson in order.
	 *
	 * Nothing here re-states a lesson. The same compiled components the website
	 * renders are dropped in, and because the group disables hydration they
	 * arrive in their complete static form — every depth layer, every quiz
	 * question with its answers, the estimator's reference table. See
	 * `(print)/+layout.ts`.
	 */
	import type { Component } from 'svelte';
	import '../../cover.css';
	import { Prose } from '$lib/components/learning';
	import { setDefinitions } from '$lib/learning/context';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Glossary references read their definitions from context, exactly as they
	// do inside the /learn layout.
	setDefinitions(data.definitions);

	const printed = new Date(data.generatedAt).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
</script>

<svelte:head>
	<title>{data.guide.title}</title>
</svelte:head>

<!-- ── Cover ───────────────────────────────────────────────────────────────
     Its own page, with `@page :first` margins removed so the block runs to
     the paper's edge. -->
<section
	class="flex h-[297mm] flex-col justify-between bg-ecohubs-deep px-[22mm] py-[26mm] text-white"
>
	<div>
		<div class="font-mono text-[10pt] tracking-[0.22em] text-emerald-200 uppercase">
			EcoHubs Community · Learning Hub
		</div>
		<div class="mt-2 font-mono text-[10pt] tracking-[0.18em] text-emerald-200/70 uppercase">
			{data.guide.level} guide
		</div>
	</div>

	<div>
		<h1 class="font-serif text-[40pt] leading-[1.08]">{data.guide.title}</h1>
		<p class="mt-6 max-w-[125mm] text-[13pt] leading-relaxed text-emerald-50/90">
			{data.guide.summary}
		</p>
		<div
			class="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9.5pt] tracking-[0.1em] text-emerald-200/80 uppercase"
		>
			<span>{data.lessons.length} lessons</span>
			<span>{data.minutes} min read</span>
			<span>updated {printed}</span>
		</div>
	</div>

	<div class="border-t border-emerald-200/25 pt-6 text-[9.5pt] leading-relaxed text-emerald-50/70">
		<p>
			Free to read, print, translate and argue with. Corrections are the contribution we would
			rather have than a payment.
		</p>
		<p class="mt-2 font-mono tracking-[0.08em]">ecohubs.community/learn</p>
	</div>
</section>

<!-- ── Contents ────────────────────────────────────────────────────────── -->
<section class="page-break sheet pt-[6mm]">
	<h2 class="font-serif text-[20pt] text-ecohubs-deep">Contents</h2>
	<ol class="mt-5 space-y-1.5">
		{#each data.lessons as lesson (lesson.slug)}
			<li class="flex gap-4 border-b border-stone-200 pb-1.5">
				<span class="font-mono text-[9.5pt] text-stone-400">{lesson.marker}</span>
				<span class="min-w-0 flex-1">
					<span class="block font-serif text-[11.5pt] text-ecohubs-deep">{lesson.title}</span>
					<span class="block text-[9pt] leading-snug text-stone-600">{lesson.summary}</span>
				</span>
				<span class="font-mono text-[9pt] whitespace-nowrap text-stone-400">
					{lesson.minutes} min
				</span>
			</li>
		{/each}
	</ol>

	<div class="mt-7 rounded-xl border border-stone-300 p-4 text-[9pt] leading-relaxed">
		<p class="font-mono text-[8.5pt] tracking-[0.14em] text-stone-500 uppercase">
			About this document
		</p>
		<p class="mt-2 text-stone-700">
			This is the whole guide as it stood on {printed}. The quizzes are printed with their answers
			and explanations, which is what makes them useful on paper. The cost estimator on the web
			version is interactive; here you get the four equity models it is built on, and the
			accompanying spreadsheet does the arithmetic.
		</p>
		<p class="mt-2 text-stone-700">
			The live version, with working quizzes and the calculator, is at
			ecohubs.community/learn/guides/{data.guide.slug}.
		</p>
	</div>
</section>

<!-- ── The lessons ─────────────────────────────────────────────────────── -->
{#each data.lessons as lesson (lesson.slug)}
	<article class="page-break sheet pt-[6mm]">
		<div class="font-mono text-[9pt] tracking-[0.16em] text-emerald-800 uppercase">
			Lesson {lesson.marker} of {data.lessons.length}
		</div>
		<h2 class="mt-2 font-serif text-[24pt] leading-[1.14] text-ecohubs-deep">{lesson.title}</h2>
		<p class="mt-3 text-[12pt] leading-relaxed text-stone-600">{lesson.summary}</p>
		<div class="mt-6 border-t border-stone-300 pt-6">
			<Prose>
				{#if lesson.component}
					{@const Lesson = lesson.component as Component}
					<Lesson />
				{/if}
			</Prose>
		</div>
	</article>
{/each}
