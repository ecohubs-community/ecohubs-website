<script lang="ts">
	/**
	 * The comparison index — every "X vs Y" page in one place.
	 *
	 * Grouped by topic rather than listed flat, because the useful question is
	 * usually "what else in this area do I keep mixing up?"
	 */
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { CompareCard, LearnRail } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { META } from '$lib/components/learning/card';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Compared', path: '/learn/compare' }]);

	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LINK =
		'-ml-px flex gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] ' +
		'leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';

	const anchor = (slug: string) => `t-${slug}`;
</script>

<SEO
	title="Compared — the words this field keeps mixing up"
	description="Cohousing or ecovillage, consensus or consent, commune or cohousing — the confusable pairs in community living, told apart with a table and a straight answer."
	ogImage="/og-default.jpg"
	{breadcrumbs}
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
					<div class="kicker text-emerald-700">Compared</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>
				<h1
					class="font-serif text-[40px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[46px]"
				>
					The words this field
					<em class="font-story font-normal text-ecohubs-primary italic">keeps mixing up.</em>
				</h1>
				<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">
					Almost every choice here is a choice between two things that sound similar and are not.
					Each page settles one pair — a table near the top, then when each is the right answer.
				</p>

				{#if data.comparisons.length}
					<div class="{META} mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
						<span>
							{data.comparisons.length}
							{data.comparisons.length === 1 ? 'comparison' : 'comparisons'}
						</span>
						<span aria-hidden="true">·</span>
						<span>{data.minutes} min of reading</span>
					</div>
				{/if}
			</div>

			<!-- ═══════════════════════════════════════════════════════
					2. THE COMPARISONS
			═══════════════════════════════════════════════════════ -->
			{#if data.groups.length}
				<div class="mt-11 flex flex-col gap-12">
					{#each data.groups as group (group.slug)}
						<section id={anchor(group.slug)} class="scroll-mt-28">
							<div class="mb-5 flex flex-wrap items-baseline justify-between gap-4">
								<h2 class="kicker text-emerald-700">{group.title}</h2>
								{#if group.published}
									<a
										href="/learn/topics/{group.slug}"
										class="text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
									>
										The topic →
									</a>
								{/if}
							</div>
							<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
								{#each group.items as compare (compare.slug)}
									<CompareCard {compare} />
								{/each}
							</div>
						</section>
					{/each}
				</div>
			{:else}
				<p class="mt-11 font-story text-lg text-stone-500 italic">
					The first comparisons are being written.
				</p>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					3. WHAT TO ASK INSTEAD
			═══════════════════════════════════════════════════════ -->
			<section class="mt-16 overflow-hidden rounded-[24px] bg-ecohubs-ivory p-8 md:p-10">
				<div class="max-w-2xl">
					<div class="kicker mb-3 text-emerald-800">When the label does not help</div>
					<h2 class="font-serif text-[26px] leading-tight text-ecohubs-deep">
						Three questions beat any pair of words.
					</h2>
					<p class="mt-3 text-[15px] leading-relaxed text-stone-700">
						What do we actually hold in common — land, money, decisions, or only goodwill? Who
						decides, and how? And what happens if I leave? Every form answers those differently, and
						the answers predict daily life far better than the label does.
					</p>
					<div class="mt-5 flex flex-wrap gap-3">
						<a
							href="/learn/glossary"
							class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
						>
							Look a word up <span aria-hidden="true">→</span>
						</a>
						<a
							href="/learn/map"
							class="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
						>
							See how it all connects
						</a>
					</div>
				</div>
			</section>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	{#if data.groups.length}
		<p class={TREE_LABEL}>By topic</p>
		<ul class={TREE}>
			{#each data.groups as group (group.slug)}
				<li>
					<a href="#{anchor(group.slug)}" class={TREE_LINK}>
						<span class="min-w-0 flex-1">{group.title}</span>
						<span class="font-mono text-[10.5px] text-stone-400">{group.items.length}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
{/snippet}
