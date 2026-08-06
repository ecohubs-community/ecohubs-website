<script lang="ts">
	/**
	 * "What was I doing here?" — saved items, progress and where you left off.
	 *
	 * Everything is resolved client-side against the catalogue the layout ships,
	 * because the stored ids mean nothing to a server that has no session. That
	 * also means stale ids simply drop out: content renamed, unpublished or
	 * deleted stops appearing rather than becoming a dead link.
	 */
	import { onMount } from 'svelte';
	import { LearnRail } from '$lib/components/learning';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { clearAll, getBookmarks, getProgress } from '$lib/learning/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Saved', path: '/learn/saved' }]);

	// Derived from the catalogue rather than restated, so the union of content
	// types stays in one place.
	type Item = PageData['catalogue'][number];

	let ready = $state(false);
	let saved = $state<Item[]>([]);
	let read = $state<Item[]>([]);

	function resolve(ids: string[]): Item[] {
		const byId = new Map(data.catalogue.map((c) => [c.slug, c]));
		// Unknown ids are dropped: content renamed, unpublished or deleted stops
		// appearing rather than becoming a dead link in someone's saved list.
		return ids.flatMap((id) => byId.get(id) ?? []);
	}

	function refresh() {
		saved = resolve(
			getBookmarks()
				.sort((a, b) => b.savedAt - a.savedAt)
				.map((b) => b.id)
		);
		read = resolve(Object.keys(getProgress()));
	}

	onMount(() => {
		ready = true;
		refresh();
	});

	function clear() {
		clearAll();
		refresh();
	}
</script>

<!-- Permanently noindex: for a crawler this page is empty by construction, and
     it is excluded from the sitemap for the same reason. -->
<SEO
	title="Saved — EcoHubs learning hub"
	description="What you saved and how far you have read, kept in this browser."
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
				<div class="kicker text-emerald-700">Saved</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1 class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl">
				What you were
				<em class="font-story font-normal italic text-ecohubs-primary">reading.</em>
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
				Kept in this browser — no account, nothing sent anywhere. Which also means it will not
				follow you to another device.
			</p>

			<div class="hairline my-10"></div>

			{#if !ready}
				<p class="font-story text-lg text-stone-500 italic">Looking…</p>
			{:else if !saved.length && !read.length}
				<p class="font-story text-lg text-stone-500 italic">
					Nothing saved yet. Use “Save” on any page and it will appear here.
				</p>
				<p class="mt-6">
					<a
						href="/learn"
						class="text-sm text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
					>
						Start at the hub →
					</a>
				</p>
			{:else}
				{#if saved.length}
					<div class="mb-14">
						<h2 class="kicker mb-5 text-emerald-700">Saved</h2>
						<ul class="grid gap-5 sm:grid-cols-2">
							{#each saved as item (item.slug)}
								<li>
									<a
										href={item.url}
										class="group block h-full rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
									>
										<h3
											class="font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
										>
											{item.title}
										</h3>
										<p class="mt-2 text-sm leading-relaxed text-stone-700">{item.summary}</p>
										<p class="mt-3 text-xs text-stone-400">{item.type}</p>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if read.length}
					<div class="mb-14">
						<h2 class="kicker mb-5 text-emerald-700">Already read</h2>
						<ul class="space-y-2 text-sm">
							{#each read as item (item.slug)}
								<li>
									<a
										href={item.url}
										class="text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
									>
										{item.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<button
					type="button"
					onclick={clear}
					class="text-sm text-stone-500 underline underline-offset-2 hover:text-ecohubs-deep"
				>
					Clear everything stored in this browser
				</button>
			{/if}
		</div>

		<!-- Nothing page-specific belongs in the lower half: what you saved is
		     already the whole page. The section nav is the point. -->
		<LearnRail />
	</div>
</div>
