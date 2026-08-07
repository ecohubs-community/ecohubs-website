<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, PathCard } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { CARD, META } from '$lib/components/learning/card';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { getProgress } from '$lib/learning/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Learning Paths', path: '/learn/paths' }]);

	// Read once for the whole grid, not once per card. Empty on the server, so
	// every ring starts at zero and fills after hydration.
	let read = $state<Record<string, unknown>>({});
	onMount(() => (read = getProgress()));

	function percentOf(steps: { slug: string }[]): number {
		if (!steps.length) return 0;
		return Math.round((steps.filter((s) => read[s.slug]).length / steps.length) * 100);
	}

	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LINK =
		'-ml-px flex gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] ' +
		'leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';
</script>

<SEO
	title="Learning paths — a sequence, when you don't know where to start"
	description="Ordered routes through the hub, each written for a different question: whether to join a community, or to start one."
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
					<div class="kicker text-emerald-700">Learning paths</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>
				<h1
					class="font-serif text-[40px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[46px]"
				>
					Learning paths
				</h1>
				<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">
					Ordered routes through the same material, each written for a different question:
					<em class="font-story italic">should I join one, or should I start one?</em>
					Follow a path end to end, or lift one step out of it.
				</p>

				{#if data.totals.paths}
					<div class="{META} mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
						<span>{data.totals.paths} {data.totals.paths === 1 ? 'path' : 'paths'}</span>
						<span aria-hidden="true">·</span>
						<span>{data.totals.steps} {data.totals.steps === 1 ? 'step' : 'steps'}</span>
						<span aria-hidden="true">·</span>
						<span>{data.totals.minutes} min of reading</span>
						<span aria-hidden="true">·</span>
						<span>no account needed</span>
					</div>
				{/if}
			</div>

			<!-- ═══════════════════════════════════════════════════════
					2. THE PATHS
			═══════════════════════════════════════════════════════ -->
			<section class="mt-11">
				{#if data.paths.length}
					<ul class="grid gap-5 md:grid-cols-2">
						{#each data.paths as path (path.slug)}
							<li class="flex"><PathCard {path} {read} variant="full" /></li>
						{/each}
					</ul>
				{:else}
					<p class="font-story text-lg text-stone-500 italic">The first paths are being written.</p>
				{/if}
			</section>

			<!-- ═══════════════════════════════════════════════════════
					3. CHOOSING ONE
			═══════════════════════════════════════════════════════ -->
			{#if data.paths.length > 1}
				<div class="hairline my-16"></div>

				<section class="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
					<div>
						<div class="kicker mb-3 text-emerald-700">Choosing one</div>
						<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">
							Start with the question,
							<em class="font-story font-normal text-stone-500 italic">not the syllabus.</em>
						</h2>
						<p class="mt-4 text-[15.5px] leading-relaxed text-stone-600">
							Each path answers a different question. Read the one that matches where you actually
							are, not the one that sounds most thorough.
						</p>
					</div>
					<!-- Built from the paths themselves rather than written out, so this
					     cannot end up describing a path that no longer exists. -->
					<div class="flex flex-col gap-3">
						{#each data.paths as path (path.slug)}
							<div
								class="{CARD} flex gap-5 bg-white p-6 hover:border-stone-200/90 hover:shadow-none"
							>
								<span class="shrink-0 pt-1 font-mono text-[11px] text-emerald-700">IF</span>
								<span>
									<span class="block text-[15.5px] leading-snug text-ecohubs-deep">
										{path.audience ?? path.summary}
									</span>
									<span class="mt-1.5 block text-[14px] leading-relaxed text-stone-600">
										Take
										<a
											href="/learn/paths/{path.slug}"
											class="text-ecohubs-dark underline underline-offset-2"
										>
											{path.title}
										</a>
										— {path.steps.length}
										{path.steps.length === 1 ? 'step' : 'steps'}, about {path.minutes} min of reading{#if path.endsAt},
											ending at {path.endsAt.label.toLowerCase()}{/if}.
									</span>
								</span>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<!-- ═══════════════════════════════════════════════════════
					4. STILL UNDECIDED
			═══════════════════════════════════════════════════════ -->
			<section class="mt-16 overflow-hidden rounded-[24px] bg-ecohubs-ivory p-8 md:p-10">
				<div class="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
					<div>
						<div class="kicker mb-3 text-emerald-800">Still undecided</div>
						<h2 class="font-serif text-[26px] leading-tight text-ecohubs-deep">
							Twelve minutes will tell you more than four descriptions.
						</h2>
						<p class="mt-3 max-w-lg text-[15px] leading-relaxed text-stone-700">
							The Community Resilience Assessment asks what you can contribute, tolerate and afford
							— and points at the path that fits the answers.
						</p>
					</div>
					<div class="flex flex-wrap gap-3 lg:justify-end">
						<a
							href="/learn/map"
							class="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
						>
							Browse the map
						</a>
						<a
							href="/community-resilience-assessment"
							class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
						>
							Take the assessment <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</section>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	{#if data.paths.length}
		<div class="mb-7">
			<p class={TREE_LABEL}>
				{data.paths.length === 1 ? 'The path' : `The ${data.paths.length} paths`}
			</p>
			<ul class={TREE}>
				{#each data.paths as path (path.slug)}
					<li>
						<a href="/learn/paths/{path.slug}" class={TREE_LINK}>
							<span class="min-w-0 flex-1">{path.title}</span>
							<span class="font-mono text-[10.5px] text-stone-400">{percentOf(path.steps)}%</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<p class={TREE_LABEL}>How paths work</p>
	<p class="px-2.5 text-[13px] leading-relaxed text-stone-500">
		A path is an ordered set of lessons pulled from across the hub. Tick a step to remember it —
		everything is stored in this browser, and there is nothing to sign up for.
	</p>
{/snippet}
