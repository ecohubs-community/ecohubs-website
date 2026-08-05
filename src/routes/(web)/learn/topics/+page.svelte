<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Topics', path: '/learn/topics' }]);

	function summarise(counts: PageData['topics'][number]['counts']): string {
		const parts = [
			counts.guides && `${counts.guides} guide${counts.guides === 1 ? '' : 's'}`,
			counts.comparisons && `${counts.comparisons} compared`,
			counts.terms && `${counts.terms} term${counts.terms === 1 ? '' : 's'}`,
			counts.cases && `${counts.cases} case stud${counts.cases === 1 ? 'y' : 'ies'}`
		].filter(Boolean);
		return parts.join(' · ');
	}
</script>

<SEO
	title="Topics — the ten doors into community living"
	description="Governance, money, land, conflict, membership and daily life — the subjects that decide whether a community lasts, each explained from the ground up."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

<section class="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
			<div class="kicker text-emerald-700">Browse by topic</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
		>
			Ten doors into
			<em class="font-story font-normal italic text-ecohubs-primary">the same house.</em>
		</h1>
		<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
			Every one of these decides whether a community lasts. Start wherever your question is.
		</p>
	</div>
</section>

<div class="hairline mx-auto max-w-4xl"></div>

<section class="py-14 md:py-20">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		{#if data.topics.length}
			<ul class="grid gap-5 sm:grid-cols-2">
				{#each data.topics as topic (topic.slug)}
					<li>
						<a
							href="/learn/topics/{topic.slug}"
							class="group block h-full rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
						>
							<h2
								class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
							>
								{topic.title}
							</h2>
							<p class="mt-2 text-sm leading-relaxed text-stone-700">{topic.summary}</p>
							<p class="mt-4 text-xs text-stone-500">{summarise(topic.counts)}</p>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="font-story text-lg text-stone-500 italic">The first topics are being written.</p>
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
