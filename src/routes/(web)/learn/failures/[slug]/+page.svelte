<script lang="ts">
	import type { Component } from 'svelte';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
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
	import { failureArticle, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const failure = $derived(data.failure);
	const Content = $derived(data.content as Component);

	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Failure Modes', path: '/learn/failures' },
			{ name: failure.title, path: `/learn/failures/${failure.slug}` }
		])
	);
	const jsonLd = $derived(failureArticle(failure));
</script>

<SEO
	title="{failure.title} — EcoHubs"
	description={failure.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2 lg:max-w-[820px]">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Failure mode</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
			>
				{failure.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">
				{failure.summary}
			</p>

			<div
				class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]"
			>
				<span>{data.readingMinutes} min read</span>
				<span aria-hidden="true">·</span>
				<a
					href={data.layerUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-ecohubs-dark"
					title="RCOS Core v0.1 — {data.layerLabel}"
				>
					RCOS Layer {failure.layer}
				</a>
				{#if data.lessonPublished && data.lessonGuide}
					<span aria-hidden="true">·</span>
					<a
						href="/learn/guides/{data.lessonGuide}/{failure.lesson}"
						class="hover:text-ecohubs-dark"
					>
						{data.lessonTitle}
					</a>
				{/if}
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3">
				<DepthSwitch />
				<ReadToggle id={failure.slug} />
				<BookmarkButton id={failure.slug} type="failure" title={failure.title} />
				<ShareButton title={failure.title} />
			</div>

			<!--
				The signs sit above the prose rather than inside it, because this is
				the page a reader arrives at mid-crisis: the first question is "is
				this us?", and the answer should be readable before any argument.
			-->
			<section
				class="mt-10 rounded-2xl border border-l-4 border-amber-200/70 border-l-amber-400 bg-amber-50/40 p-6"
			>
				<h2 class="kicker mb-3 text-amber-700">What it looks like</h2>
				<ul class="space-y-2 text-[0.95rem] leading-relaxed text-stone-700">
					{#each failure.signs as sign (sign)}
						<li class="flex gap-3">
							<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true"
							></span>
							<span>{sign}</span>
						</li>
					{/each}
				</ul>
			</section>

			<div class="hairline my-10"></div>

			<div class="mb-10"><ArticleToc headings={data.headings} /></div>

			<Prose>
				<Content />
			</Prose>

			<section class="mt-14 border-t border-stone-200 pt-8">
				<h2 class="kicker mb-4 text-stone-500">The specification</h2>
				{#if data.stressTestUrl}
					<p class="text-[0.95rem] leading-relaxed text-stone-700">
						This page is the plain-language version. RCOS publishes the stress test itself — the
						failure pattern, what is being tested, and what a compliant community would have in
						place.
					</p>
					<p class="mt-3">
						<a
							href={data.stressTestUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono text-[11px] tracking-[0.06em] text-ecohubs-muted hover:text-ecohubs-dark"
						>
							RCOS stress test — {failure.rcos}
						</a>
					</p>
				{:else}
					<p class="text-[0.95rem] leading-relaxed text-stone-700">
						<strong>RCOS has no stress test for this one.</strong> It is a pattern we have seen and can
						describe, and the standard does not yet catalogue it — which is worth saying plainly rather
						than leaving as a gap somebody notices later.
					</p>
				{/if}
			</section>

			{#if data.terms.length}
				<section class="mt-12 border-t border-stone-200 pt-8">
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

			{#if data.siblings.length}
				<section class="mt-12">
					<h2 class="kicker mb-4 text-stone-500">These travel together</h2>
					<p class="mb-4 text-sm text-stone-600">
						Failures are rarely alone. If this one is familiar, check the others from the same
						lesson before concluding you have found the whole problem.
					</p>
					<ul class="space-y-3">
						{#each data.siblings as item (item.slug)}
							<li>
								<a
									href="/learn/failures/{item.slug}"
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
					href="/learn/failures"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">All failure modes</span>
				</a>
			</div>
		</div>

		<LearnRail
			withinTitle="On this page"
			within={data.headings.map((h) => ({ href: `#${h.id}`, label: h.text }))}
			sidewaysTitle="These travel together"
			sideways={data.siblings.map((s) => ({
				href: `/learn/failures/${s.slug}`,
				label: s.title
			}))}
			backLink={{ href: '/learn/failures', label: 'All failure modes' }}
		/>
	</div>
</article>
