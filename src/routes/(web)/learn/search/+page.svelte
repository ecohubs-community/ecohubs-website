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
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { searchDocs, type SearchDoc } from '$lib/learning/search';

	const breadcrumbs = learningBreadcrumbs([{ name: 'Search', path: '/learn/search' }]);

	let query = $state('');
	let docs = $state<SearchDoc[]>([]);
	let loading = $state(true);
	let failed = $state(false);

	const results = $derived(searchDocs(docs, query));

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
     otherwise show through the whole page. The article routes get this from
     their <article> wrapper; index routes have none, so it lives here. -->
<div class="bg-ecohubs-base">
	<!-- One grid for the whole page, not one per section: the rail starts level
	     with the heading, as in the design, rather than below a full-width hero. -->
	<div
		class="mx-auto grid max-w-4xl gap-12 px-6 pt-8 pb-20 md:pb-28 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
	>
		<div class="min-w-0 lg:order-2">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Search</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1 class="font-serif text-4xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-5xl">
				Search the hub
			</h1>

			<div class="hairline my-10"></div>

			<!-- Results update as you type, so the button looks redundant. It is
			     what commits the query to the URL: a submit button is the reliable
			     way to get Enter-to-submit (the no-button case depends on a
			     single-field special rule) and it is what gives a phone keyboard
			     its "Go" key. -->
			<form onsubmit={submit} role="search" class="flex gap-2">
				<label for="learn-search" class="sr-only">Search the learning hub</label>
				<input
					id="learn-search"
					type="search"
					bind:value={query}
					placeholder="What would you like to learn?"
					autocomplete="off"
					class="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-6 py-3.5 text-lg text-stone-800 placeholder:text-stone-400 focus:border-ecohubs-dark focus:outline-none"
				/>
				<button
					type="submit"
					class="shrink-0 rounded-full bg-ecohubs-dark px-6 py-3.5 text-sm text-white transition-colors hover:bg-ecohubs-deep"
				>
					Search
				</button>
			</form>

			<div class="mt-8" aria-live="polite">
				{#if loading}
					<p class="font-story text-stone-500 italic">Loading the index…</p>
				{:else if failed}
					<p class="text-stone-600">
						The search index could not be loaded. You can still
						<a href="/learn" class="text-ecohubs-dark underline underline-offset-2"
							>browse the hub</a
						>.
					</p>
				{:else if !query}
					<p class="font-story text-stone-500 italic">
						{docs.length} pages to search. Try “consent”, “cohousing” or “what joining costs”.
					</p>
				{:else if results.length === 0}
					<p class="text-stone-600">
						Nothing matches “{query}”. If you had to look it up somewhere else, that's our bug —
						<a href="/contact" class="text-ecohubs-dark underline underline-offset-2">tell us</a>.
					</p>
				{:else}
					<p class="mb-5 text-sm text-stone-500">
						{results.length}
						{results.length === 1 ? 'result' : 'results'}
					</p>
					<ul class="space-y-4">
						{#each results as doc (doc.url)}
							<li>
								<a
									href={doc.url}
									class="group block rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:soft-shadow"
								>
									<p class="kicker mb-1 text-stone-400">{doc.type}</p>
									<h2
										class="font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
									>
										{doc.title}
									</h2>
									<p class="mt-1 text-sm leading-relaxed text-stone-700">{doc.summary}</p>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<LearnRail />
	</div>
</div>
