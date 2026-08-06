<script lang="ts">
	/**
	 * Search across the hub.
	 *
	 * The index is fetched on mount rather than imported, so no article page
	 * carries it. Matching is a few dozen lines in `search.ts` — at this scale a
	 * search library would cost more than the whole hub's JavaScript budget.
	 *
	 * `?q=` is read on load and written on submit, so a search is a shareable
	 * URL and the back button behaves.
	 */
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { CARD, META, TAG, TAG_OFF } from '$lib/components/learning/card';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { groupByKind, searchDocs, type SearchDoc } from '$lib/learning/search';

	const breadcrumbs = learningBreadcrumbs([{ name: 'Search', path: '/learn/search' }]);

	/** Starting points for someone who arrives with nothing in mind. */
	const SUGGESTIONS = ['consensus', 'land', 'money', 'conflict', 'ecovillage'];

	let query = $state('');
	let docs = $state<SearchDoc[]>([]);
	let loading = $state(true);
	let failed = $state(false);

	// With no query the page lists everything, which is what makes it browsable
	// rather than a blank box.
	const results = $derived(query ? searchDocs(docs, query, 100) : docs);
	const groups = $derived(groupByKind(results));

	const summary = $derived(
		query
			? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”`
			: `${docs.length} entries across the hub — type to narrow`
	);

	onMount(async () => {
		query = page.url.searchParams.get('q') ?? '';
		try {
			const response = await fetch('/learn/search-index.json');
			docs = await response.json();
		} catch {
			failed = true;
		} finally {
			loading = false;
		}
	});

	function submit(event: Event) {
		event.preventDefault();
		const url = new URL(page.url);
		if (query) url.searchParams.set('q', query);
		else url.searchParams.delete('q');
		replaceState(url, {});
	}

	const anchor = (kind: string) => `g-${kind.toLowerCase().replace(/\W+/g, '-')}`;

	/** The rail's two lists share the design's tree shape. */
	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LINK =
		'-ml-px flex gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] ' +
		'leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';
</script>

<!-- A search page is a tool, not a document: nothing here is worth indexing,
     and every result already has its own page. -->
<SEO
	title="Search the learning hub"
	description="Search across guides, topics, comparisons and the glossary."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex
/>

<!-- Opaque, because the site's animated backdrop sits at z-index -1 and would
     otherwise show through the whole page. -->
<div class="bg-ecohubs-base">
	<div
		class="mx-auto grid max-w-[1360px] gap-14 px-6 pt-8 pb-20 md:pb-28 lg:grid-cols-[248px_minmax(0,1fr)]"
	>
		<div class="min-w-0 lg:order-2 lg:max-w-[860px]">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Search</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1
				class="font-serif text-[34px] leading-[1.1] tracking-tight text-ecohubs-deep md:text-[40px]"
			>
				Search the hub
			</h1>

			<!-- The design's `.searchbig`: one pill holding the field and the button.
			     The button is what makes Enter submit and gives a phone keyboard a
			     "Go" key — the results themselves update as you type. -->
			<form
				onsubmit={submit}
				role="search"
				class="mt-6 flex items-center gap-3 rounded-full border border-stone-200 bg-white py-1.5 pr-1.5 pl-6 shadow-[0_18px_40px_-30px_rgba(11,46,36,0.5)]"
			>
				<Icon
					icon="tabler:search"
					width="18"
					height="18"
					class="shrink-0 text-stone-400"
					aria-hidden="true"
				/>
				<label for="learn-search" class="sr-only">Search the learning hub</label>
				<input
					id="learn-search"
					type="search"
					bind:value={query}
					placeholder="What would you like to learn?"
					autocomplete="off"
					class="min-w-0 flex-1 appearance-none border-0 bg-transparent py-3 text-[16.5px] text-ecohubs-text placeholder:text-stone-400 focus:ring-0 focus:outline-none"
				/>
				<button
					type="submit"
					class="shrink-0 rounded-full bg-ecohubs-dark px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ecohubs-deep"
				>
					Search
				</button>
			</form>

			<p class="{META} mt-4" aria-live="polite">
				{#if loading}
					Loading the index…
				{:else if failed}
					The index could not be loaded.
				{:else}
					{summary}
				{/if}
			</p>

			<div class="mt-10 flex flex-col gap-12">
				{#if failed}
					<p class="text-stone-600">
						You can still
						<a href="/learn" class="text-ecohubs-dark underline underline-offset-2">
							browse the hub
						</a>.
					</p>
				{:else if !loading && groups.length === 0}
					<div class="{CARD} bg-white p-8 hover:border-stone-200/90 hover:shadow-none">
						<div class="font-serif text-[22px] text-ecohubs-deep">Nothing matched “{query}”.</div>
						<p class="mt-3 text-[15px] leading-relaxed text-stone-600">
							Try a shorter word. If you had to look it up somewhere else, that's our bug —
							<a href="/contact" class="text-ecohubs-dark underline underline-offset-2">tell us</a>.
						</p>
					</div>
				{/if}

				{#each groups as group (group.kind)}
					<section id={anchor(group.kind)}>
						<div class="mb-4 flex items-baseline justify-between gap-4">
							<div class="kicker text-emerald-700">
								{group.kind}{group.docs.length > 1 ? 's' : ''}
							</div>
							<span class={META}>{group.docs.length}</span>
						</div>
						<div class="flex flex-col gap-3">
							{#each group.docs as doc (doc.url)}
								<a href={doc.url} class="{CARD} flex items-start gap-4 bg-white p-5">
									<span class="{TAG} {TAG_OFF} mt-0.5">{doc.kind}</span>
									<span class="min-w-0 flex-1">
										<span class="block font-serif text-[18px] leading-snug text-ecohubs-deep">
											{doc.title}
										</span>
										<span class="mt-1.5 block text-[14px] leading-relaxed text-stone-600">
											{doc.summary}
										</span>
									</span>
									<span aria-hidden="true" class="text-sm text-ecohubs-dark">→</span>
								</a>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	{#if groups.length}
		<div class="mb-7">
			<p class={TREE_LABEL}>Results by kind</p>
			<ul class={TREE}>
				{#each groups as group (group.kind)}
					<li>
						<a href="#{anchor(group.kind)}" class={TREE_LINK}>
							<span class="min-w-0 flex-1">{group.kind}</span>
							<span class="font-mono text-[10.5px] text-stone-400">{group.docs.length}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<p class={TREE_LABEL}>Try</p>
	<ul class={TREE}>
		{#each SUGGESTIONS as term (term)}
			<li>
				<a href="/learn/search?q={term}" class={TREE_LINK}>{term}</a>
			</li>
		{/each}
	</ul>
{/snippet}
