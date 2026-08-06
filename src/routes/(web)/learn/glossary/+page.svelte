<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { definedTermSet, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Glossary', path: '/learn/glossary' }]);
	const jsonLd = $derived(definedTermSet(data.terms));
</script>

<SEO
	title="Glossary — every word this world uses, said plainly"
	description="Plain definitions of the words used in intentional communities, ecovillages and community governance — each with an example and where it applies."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
			<div class="kicker text-emerald-700">Glossary</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
		>
			Every word this world uses,
			<em class="font-story font-normal italic text-ecohubs-primary">said plainly.</em>
		</h1>
		<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
			{#if data.terms.length}
				{data.terms.length}
				{data.terms.length === 1 ? 'term' : 'terms'}, each with what it means, where it applies, and
				what it is often confused with.
			{:else}
				The first entries are being written. If you had to look a word up somewhere else, that's our
				bug.
			{/if}
		</p>
	</div>
</section>

<div class="hairline mx-auto max-w-4xl"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. TERMS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-14 md:py-20">
	<div
			class="mx-auto grid max-w-4xl gap-12 px-6 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
		>
			<div class="min-w-0 lg:order-2">
		{#if data.groups.length}
			<!-- A–Z rail. Anchors rather than a filter, so it works without JS. -->
			<nav aria-label="Jump to letter" class="mb-12 flex flex-wrap gap-2">
				{#each data.groups as group (group.letter)}
					<a
						href="#letter-{group.letter}"
						class="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-600 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-deep"
					>
						{group.letter}
					</a>
				{/each}
			</nav>

			{#each data.groups as group (group.letter)}
				<section class="mb-14">
					<h2
						id="letter-{group.letter}"
						class="mb-5 scroll-mt-28 font-serif text-2xl text-ecohubs-primary"
					>
						{group.letter}
					</h2>
					<dl class="grid gap-4 sm:grid-cols-2">
						{#each group.items as term (term.slug)}
							<div
								class="rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:soft-shadow"
							>
								<dt class="font-serif text-lg text-ecohubs-deep">
									<a
										href="/learn/glossary/{term.slug}"
										class="transition-colors hover:text-ecohubs-primary"
									>
										{term.term}
									</a>
								</dt>
								<dd class="mt-2 text-sm leading-relaxed text-stone-700">{term.short}</dd>
								<dd class="mt-3 text-xs text-stone-500">{term.topicTitle}</dd>
							</div>
						{/each}
					</dl>
				</section>
			{/each}
		{:else}
			<p class="font-story text-lg text-stone-500 italic">Nothing published yet.</p>
		{/if}

		<div class="mt-10 text-center">
			<a
				href="/learn"
				class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
			>
				<span class="transition-transform group-hover:-translate-x-0.5">←</span>
				<span class="font-story italic">The learning hub</span>
			</a>
		</div>
			</div>

			<LearnRail />
		</div>
	</section>
