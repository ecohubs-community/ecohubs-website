<script lang="ts">
	/**
	 * A guide overview: what it covers, its lessons in order, and how far this
	 * browser has got.
	 *
	 * Progress is lesson-read state, the same fact the lesson pages, the rail
	 * and the path pages use — not a separate per-guide tally.
	 */
	import type { Component } from 'svelte';
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Cover, Faq, LearnRail, Prose } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { CARD, META } from '$lib/components/learning/card';
	import Icon from '$lib/components/Icon.svelte';
	import { guideArticle, learningBreadcrumbs } from '$lib/learning/schema';
	import { getProgress, setRead } from '$lib/learning/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const generated = $derived(
		data.downloads
			? new Date(data.downloads.generatedAt).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
					timeZone: 'UTC'
				})
			: ''
	);

	const guide = $derived(data.guide);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Guides', path: '/learn/guides' },
			{ name: guide.title, path: `/learn/guides/${guide.slug}` }
		])
	);
	const jsonLd = $derived(guideArticle(guide, data.lessons));

	/** Empty on the server: nothing on the page depends on it. */
	let read = $state<Record<string, unknown>>({});
	/** Resetting does nothing without storage, so the control waits. */
	let ready = $state(false);

	onMount(() => {
		read = getProgress();
		ready = true;
	});

	const done = $derived(data.lessons.filter((l) => read[l.slug]).length);
	const percent = $derived(
		data.lessons.length ? Math.round((done / data.lessons.length) * 100) : 0
	);
	const nextIndex = $derived(data.lessons.findIndex((l) => !read[l.slug]));
	const next = $derived(nextIndex === -1 ? undefined : data.lessons[nextIndex]);

	function reset() {
		for (const lesson of data.lessons) setRead(lesson.slug, false);
		read = getProgress();
	}

	// "August 2026" — a guide is revised in months, not on a given day.
	const updated = $derived(
		new Date(guide.updated).toLocaleDateString('en-GB', {
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		})
	);
</script>

<SEO
	title="{guide.title} — EcoHubs"
	description={guide.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<!-- ═══════════════════════════════════════════════════════
					1. HERO
			═══════════════════════════════════════════════════════ -->
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Guide · {guide.level}</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<div class="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
				<div>
					<h1
						class="font-serif text-[38px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[44px]"
					>
						{guide.title}
					</h1>
					<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">{guide.summary}</p>

					<div class="{META} mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
						<span>{data.lessons.length} {data.lessons.length === 1 ? 'lesson' : 'lessons'}</span>
						<span aria-hidden="true">·</span>
						<span>{data.totalMinutes} min total</span>
						<span aria-hidden="true">·</span>
						<span>{guide.prerequisites ?? 'no prerequisites'}</span>
						<span aria-hidden="true">·</span>
						<span>updated {updated}</span>
					</div>

					{#if data.lessons.length}
						<div class="mt-7">
							<div class="{META} mb-2 flex items-center justify-between">
								<span>Your progress</span><span>{percent}% complete</span>
							</div>
							<div
								class="h-1 overflow-hidden rounded-full bg-[#ece9e2]"
								role="progressbar"
								aria-valuenow={percent}
								aria-valuemin="0"
								aria-valuemax="100"
								aria-label="{guide.title} progress"
							>
								<i
									class="block h-full rounded-full bg-ecohubs-primary transition-[width] duration-500"
									style="width: {percent}%"
								></i>
							</div>
						</div>

						<div class="mt-6 flex flex-wrap gap-3">
							<a
								href="/learn/guides/{guide.slug}/{(next ?? data.lessons[0]).slug}"
								class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
							>
								{#if !next}
									Guide complete — revisit
								{:else if nextIndex <= 0}
									Start lesson 01
								{:else}
									Continue lesson {String(nextIndex + 1).padStart(2, '0')}
								{/if}
								<span aria-hidden="true">→</span>
							</a>
							<a
								href="#lessons"
								class="inline-flex items-center rounded-full border border-stone-300 px-7 py-3.5 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
							>
								See all lessons
							</a>
						</div>
					{/if}
				</div>

				<Cover
					slug={guide.slug}
					image={guide.image}
					imageAlt={guide.imageAlt}
					motif={guide.motif}
					label="guide · {guide.level}"
					sizes="(min-width: 1024px) 420px, 100vw"
					class="h-[300px] w-full rounded-[24px] lg:h-[380px]"
				/>
			</div>

			<div class="hairline my-14"></div>

			<!-- ═══════════════════════════════════════════════════════
					2. WHAT IT COVERS
			═══════════════════════════════════════════════════════ -->
			{#if guide.outcomes?.length}
				<section class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
					<div>
						<div class="kicker mb-3 text-emerald-700">What this guide covers</div>
						<h2 class="font-serif text-[30px] leading-tight text-ecohubs-deep">
							The whole subject,
							<em class="font-story font-normal text-stone-500 italic">once, properly.</em>
						</h2>
						<p class="mt-4 text-[15.5px] leading-relaxed text-stone-600">
							Read it in order or jump to what you need — the rail keeps your place. Every lesson
							ends with the questions to ask a real community before you trust it.
						</p>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						{#each guide.outcomes as outcome, i (outcome)}
							<div class="{CARD} bg-white p-6 hover:border-stone-200/90 hover:shadow-none">
								<div class="mb-2 font-mono text-[11px] text-emerald-700">
									{String(i + 1).padStart(2, '0')}
								</div>
								<p class="text-[14.5px] leading-relaxed text-stone-700">{outcome}</p>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- The guide's own introduction. Short by design: the lessons carry it. -->
			<div class="mt-14">
				<Prose layer={null}>
					<Content />
				</Prose>
			</div>

			<!-- ═══════════════════════════════════════════════════════
					3. LESSONS
			═══════════════════════════════════════════════════════ -->
			{#if data.lessons.length}
				<section id="lessons" class="mt-16 scroll-mt-28">
					<div class="mb-6 flex flex-wrap items-end justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-emerald-700">Lessons</div>
							<h2 class="font-serif text-[30px] leading-tight text-ecohubs-deep">
								{data.lessons.length}, in order.
							</h2>
						</div>
						{#if ready && done > 0}
							<button
								type="button"
								onclick={reset}
								class="{META} transition-colors hover:text-ecohubs-dark"
							>
								reset my progress
							</button>
						{/if}
					</div>

					<ol class="flex flex-col gap-3">
						{#each data.lessons as lesson (lesson.slug)}
							{@const isDone = !!read[lesson.slug]}
							<li>
								<a
									href="/learn/guides/{guide.slug}/{lesson.slug}"
									class="{CARD} flex items-center gap-5 bg-white p-5"
								>
									<!-- Fills in when the lesson is read; the number stays legible
									     either way. -->
									<span
										aria-hidden="true"
										class="grid size-11 shrink-0 place-items-center rounded-xl font-mono text-[12px] transition-colors
										       {isDone ? 'bg-ecohubs-primary text-white' : 'bg-ecohubs-ivory text-emerald-800'}"
									>
										{String(lesson.number).padStart(2, '0')}
									</span>
									<span class="min-w-0 flex-1">
										<span
											class="block font-serif text-[18px] leading-snug {isDone
												? 'text-stone-500'
												: 'text-ecohubs-deep'}"
										>
											{lesson.title}
										</span>
										<span class="mt-1 block text-[14px] leading-relaxed text-stone-600">
											{lesson.summary}
										</span>
										<span class="sr-only">{isDone ? 'Read' : 'Not read yet'}</span>
									</span>
									<span class="{META} hidden whitespace-nowrap sm:block">{lesson.minutes} min</span>
									<span aria-hidden="true" class="text-sm text-ecohubs-dark">→</span>
								</a>
							</li>
						{/each}
					</ol>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					4. GUIDE DOWNLOADS
					Only what has actually been generated: the section is absent
					for a guide nobody has run `pnpm downloads` for.
			═══════════════════════════════════════════════════════ -->
			{#if data.downloads}
				<section class="mt-16 max-w-[820px]">
					<div class="kicker mb-5 text-emerald-700">Guide downloads</div>
					<div class="flex flex-col gap-3">
						{#each data.downloads.entries as item (item.file)}
							<a href={item.file} download class="{CARD} flex items-center gap-4 bg-white p-5">
								<span
									class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5f2ea] text-ecohubs-deep"
								>
									<Icon
										icon={item.kind === 'xlsx' ? 'tabler:table' : 'tabler:download'}
										class="h-4 w-4"
									/>
								</span>
								<span class="min-w-0">
									<span class="block text-[15px] text-ecohubs-deep">{item.label}</span>
									<span class="{META} block">{item.detail} · {item.size}</span>
								</span>
							</a>
						{/each}
					</div>
					<p class="mt-4 font-story text-sm text-stone-500 italic">
						Generated from this guide on {generated}. Free to print, copy and translate.
					</p>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					5. ABOUT THIS GUIDE
			═══════════════════════════════════════════════════════ -->
			{#if guide.faq?.length}
				<section class="mt-16 max-w-[820px]">
					<div class="kicker mb-5 text-emerald-700">About this guide</div>
					<Faq items={guide.faq} />
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					6. AFTER THIS GUIDE
			═══════════════════════════════════════════════════════ -->
			{#if data.nextGuides.length}
				<section class="mt-16">
					<div class="kicker mb-5 text-emerald-700">After this guide</div>
					<div class="grid gap-3 sm:grid-cols-3">
						{#each data.nextGuides as other (other.slug)}
							<a href="/learn/guides/{other.slug}" class="{CARD} overflow-hidden bg-white">
								<Cover
									slug={other.slug}
									image={other.image}
									imageAlt={other.imageAlt}
									motif={other.motif}
									sizes="(min-width: 640px) 300px, 100vw"
									class="h-24 w-full"
								/>
								<div class="p-5">
									<div class="font-serif text-[17px] leading-snug text-ecohubs-deep">
										{other.title}
									</div>
									<div class="{META} mt-2">
										{other.lessons}
										{other.lessons === 1 ? 'lesson' : 'lessons'} · {other.minutes} min
									</div>
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}
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
			backLink={{ href: '/learn/guides', label: 'All guides' }}
		/>
	</div>
</article>
