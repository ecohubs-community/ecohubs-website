<script lang="ts">
	/**
	 * The glossary index.
	 *
	 * Every term is server-rendered; the search box and the topic chips only
	 * ever *reduce* what is shown. So a crawler and a reader without JavaScript
	 * get the whole glossary, and filtering is instant because nothing is
	 * fetched.
	 */
	import Icon from '$lib/components/Icon.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, TermCard } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { META, TAG, TAG_OFF, TAG_ON } from '$lib/components/learning/card';
	import { definedTermSet, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Glossary', path: '/learn/glossary' }]);
	const jsonLd = $derived(definedTermSet(data.terms));

	const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

	let query = $state('');
	let topic = $state('all');

	const normalise = (value: string) => value.toLowerCase().trim();

	const matching = $derived(
		data.terms.filter((term) => {
			if (topic !== 'all' && term.topic !== topic) return false;
			if (!query.trim()) return true;
			const q = normalise(query);
			return normalise(term.term).includes(q) || normalise(term.short).includes(q);
		})
	);

	/** Grouped by first letter, in order — recomputed as the filters change. */
	const groups = $derived(
		[...ALPHABET, '#']
			.map((letter) => ({
				letter,
				items: matching.filter((t) => (t.term[0]?.toUpperCase() ?? '#') === letter)
			}))
			.filter((g) => g.items.length > 0)
	);

	/** Which letters currently have anything, so the rail can dim the rest. */
	const present = $derived(new Set(groups.map((g) => g.letter)));

	const LETTER =
		'grid size-[30px] place-items-center rounded-lg border border-[#ece9e2] bg-white font-mono text-xs transition-colors';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';

	function clearFilters() {
		query = '';
		topic = 'all';
	}
</script>

<SEO
	title="Glossary — every word this world uses, said plainly"
	description="Plain definitions of the words used in intentional communities, ecovillages and community governance — each with an example and where it applies."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<!-- Opaque, because the site's animated backdrop sits at z-index -1. -->
<div class="bg-ecohubs-base">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<!-- ═══════════════════════════════════════════════════════
					1. HEADER
			═══════════════════════════════════════════════════════ -->
			<div class="max-w-[820px]">
				<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
					<div class="kicker text-emerald-700">Glossary</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>
				<h1
					class="font-serif text-[40px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[46px]"
				>
					Glossary
				</h1>
				<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">
					Every word this world uses, said plainly. Each term links to the concepts near it and the
					pages that use it.
				</p>
			</div>

			{#if data.terms.length}
				<div class="mt-8 flex max-w-[820px] flex-col gap-4">
					<!-- Narrows what is already on the page — no request, and nothing
					     withheld from a crawler. -->
					<div
						class="flex max-w-xl items-center gap-3 rounded-full border border-stone-200 bg-white py-1.5 pr-5 pl-6 shadow-[0_18px_40px_-30px_rgba(11,46,36,0.5)]"
					>
						<Icon
							icon="tabler:search"
							width="18"
							height="18"
							class="shrink-0 text-stone-400"
							aria-hidden="true"
						/>
						<label for="glossary-search" class="sr-only">Search the glossary</label>
						<input
							id="glossary-search"
							type="search"
							bind:value={query}
							placeholder="Search {data.terms.length} terms"
							autocomplete="off"
							class="min-w-0 flex-1 appearance-none border-0 bg-transparent py-3 text-[16.5px] text-ecohubs-text placeholder:text-stone-400 focus:ring-0 focus:outline-none"
						/>
					</div>

					{#if data.topics.length > 1}
						<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
							<button
								type="button"
								onclick={() => (topic = 'all')}
								aria-pressed={topic === 'all'}
								class="{TAG} {topic === 'all' ? TAG_ON : `${TAG_OFF} hover:border-ecohubs-dark`}"
							>
								All topics
							</button>
							{#each data.topics as option (option.slug)}
								<button
									type="button"
									onclick={() => (topic = option.slug)}
									aria-pressed={topic === option.slug}
									class="{TAG} {topic === option.slug
										? TAG_ON
										: `${TAG_OFF} hover:border-ecohubs-dark`}"
								>
									{option.title}
								</button>
							{/each}
						</div>
					{/if}

					<p class={META} aria-live="polite">
						{matching.length}
						{matching.length === 1 ? 'term' : 'terms'}
						{#if topic !== 'all'}
							in {data.topics.find((t) => t.slug === topic)?.title}
						{/if}
					</p>
				</div>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					2. TERMS
			═══════════════════════════════════════════════════════ -->
			<div class="mt-10 flex flex-col gap-10">
				{#each groups as group (group.letter)}
					<section id="letter-{group.letter}" class="scroll-mt-28">
						<div class="grid gap-5 lg:grid-cols-[64px_1fr]">
							<div class="pt-1 font-serif text-[34px] leading-none text-ecohubs-deep">
								{group.letter}
							</div>
							<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
								{#each group.items as term (term.slug)}
									<TermCard {term} />
								{/each}
							</div>
						</div>
					</section>
				{:else}
					<p class="font-story text-lg text-stone-500 italic">
						{#if data.terms.length}
							Nothing matches that. Try a shorter word, or
							<button
								type="button"
								onclick={clearFilters}
								class="text-ecohubs-dark underline underline-offset-2 not-italic"
							>
								clear the filters
							</button>.
						{:else}
							The first entries are being written.
						{/if}
					</p>
				{/each}
			</div>

			<!-- ═══════════════════════════════════════════════════════
					3. MISSING A WORD
			═══════════════════════════════════════════════════════ -->
			<section class="mt-16 overflow-hidden rounded-[24px] bg-ecohubs-ivory p-8 md:p-10">
				<div class="max-w-2xl">
					<div class="kicker mb-3 text-emerald-800">Missing a word?</div>
					<h2 class="font-serif text-[26px] leading-tight text-ecohubs-deep">
						If you had to look it up somewhere else,
						<em class="font-story font-normal text-stone-500 italic">that's our bug.</em>
					</h2>
					<p class="mt-3 text-[15px] leading-relaxed text-stone-700">
						Tell us the term and where you met it. Every definition here says what the word means,
						where it applies, and what it is often confused with.
					</p>
					<div class="mt-5 flex flex-wrap gap-3">
						<a
							href="/contact"
							class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
						>
							Suggest a term <span aria-hidden="true">→</span>
						</a>
						<a
							href="/learn/map"
							class="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
						>
							See the knowledge map
						</a>
					</div>
				</div>
			</section>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	{#if data.terms.length}
		<div class="mb-7">
			<p class={TREE_LABEL}>Jump to letter</p>
			<!-- The whole alphabet, always. A letter with nothing under it is dimmed
			     and unclickable rather than absent, so the grid never reflows as the
			     filters change. -->
			<div class="flex flex-wrap gap-1 px-1.5">
				{#each ALPHABET as letter (letter)}
					{#if present.has(letter)}
						<a
							href="#letter-{letter}"
							class="{LETTER} text-stone-600 hover:border-ecohubs-dark hover:text-ecohubs-dark"
						>
							{letter}
						</a>
					{:else}
						<span
							aria-hidden="true"
							class="{LETTER} pointer-events-none text-stone-600 opacity-[0.32]"
						>
							{letter}
						</span>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if data.mostCited.length}
		<p class={TREE_LABEL}>Most linked to</p>
		<ul class="ml-3 flex flex-col gap-px border-l border-[#ece9e2]">
			{#each data.mostCited as term (term.slug)}
				<li>
					<a
						href="/learn/glossary/{term.slug}"
						class="-ml-px flex gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark"
					>
						<span class="min-w-0 flex-1">{term.term}</span>
						<span class="font-mono text-[10.5px] text-stone-400">{term.count}</span>
					</a>
				</li>
			{/each}
		</ul>
		<p class="mt-2.5 px-2.5 text-[12px] leading-relaxed text-stone-400">
			Counted from the pages that cite them. We do not track readers.
		</p>
	{/if}
{/snippet}
