<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, TermCard } from '$lib/components/learning';
	import { definedTermSet, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Glossary', path: '/learn/glossary' }]);
	const jsonLd = $derived(definedTermSet(data.terms));
</script>

{#snippet letters()}
	<p class="mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase">
		Jump to letter
	</p>
	<!-- Anchors rather than a filter, so it works without JavaScript. -->
	<nav aria-label="Jump to letter" class="flex flex-wrap gap-1.5 px-2.5">
		{#each data.groups as group (group.letter)}
			<a
				href="#letter-{group.letter}"
				class="grid size-7 place-items-center rounded-md border border-stone-200 font-mono text-[11px] text-stone-600 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
			>
				{group.letter}
			</a>
		{/each}
	</nav>
{/snippet}

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
<!-- Opaque, because the site's animated backdrop sits at z-index -1 and would
     otherwise show through the whole page. The article routes get this from
     their <article> wrapper; index routes have none, so it lives here. -->
<div class="bg-ecohubs-base">
	<!-- One grid for the whole page, not one per section: the rail starts level
     with the heading, as in the design, rather than below a full-width hero. -->
	<div
		class="mx-auto grid max-w-[1360px] gap-14 px-6 pt-8 pb-20 md:pb-28 lg:grid-cols-[248px_minmax(0,1fr)]"
	>
		<div class="min-w-0 lg:order-2">
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
					{data.terms.length === 1 ? 'term' : 'terms'}, each with what it means, where it applies,
					and what it is often confused with.
				{:else}
					The first entries are being written. If you had to look a word up somewhere else, that's
					our bug.
				{/if}
			</p>

			<div class="hairline my-10"></div>

			{#if data.groups.length}
				<!-- A–Z rail. Anchors rather than a filter, so it works without JS. -->
				{#each data.groups as group (group.letter)}
					<section class="mb-14">
						<h2
							id="letter-{group.letter}"
							class="mb-5 scroll-mt-28 font-serif text-2xl text-ecohubs-primary"
						>
							{group.letter}
						</h2>
						<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
							{#each group.items as term (term.slug)}
								<TermCard {term} />
							{/each}
						</div>
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

		<LearnRail footer={letters} />
	</div>
</div>
