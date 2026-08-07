<script lang="ts">
	/**
	 * The knowledge map: the whole hub as one picture.
	 *
	 * The SVG is server-rendered from coordinates computed at build time, so
	 * every topic name is real text a crawler can read and every node is a real
	 * link that works without JavaScript. There is no script on this page at all.
	 */
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, RabbitHole } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { CARD, META } from '$lib/components/learning/card';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { LINE_HEIGHT, type MapLayout } from '$lib/learning/map';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Knowledge map', path: '/learn/map' }]);

	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LINK =
		'-ml-px flex gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] ' +
		'leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';
</script>

<SEO
	title="Knowledge map — how the Learning Hub fits together"
	description="Every topic in the hub as one picture: the clusters they group into, and how much has been written on each."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

<!-- Opaque, because the site's animated backdrop sits at z-index -1. -->
<div class="bg-ecohubs-base">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Knowledge map</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1
				class="font-serif text-[40px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[46px]"
			>
				Knowledge map
			</h1>
			<p class="mt-5 max-w-2xl text-xl leading-relaxed font-light text-stone-700">
				The whole hub as one picture: the clusters, the topics inside them, and how much has been
				written on each. Useful when you don't yet know the name of the thing you're looking for.
			</p>

			{#if data.layout.clusters.length}
				<div class="{CARD} mt-8 bg-ecohubs-base p-6 hover:border-stone-200/90 hover:shadow-none">
					<!-- Two drawings of the same map, one wide and one stacked, with
					     CSS choosing. The layouts are computed at build time and a
					     prerendered page cannot know the render width, so the choice
					     has to be made in the stylesheet. `hidden` is `display:none`,
					     so the unused one is out of the accessibility tree and out of
					     the tab order — not merely invisible. -->
					<!-- The switch is at `md`, not `sm`: the wide map is scaled to fit
					     its column, so at 640 points of viewport its labels come out
					     under 7px. It is comfortable from about 768 up. -->
					<div class="hidden md:block">
						{@render mapSvg(data.layout)}
					</div>
					<!-- Capped, because the stacked canvas is a third of the wide
					     one's width: left to fill a tablet it would draw 15px labels
					     on a drawing authored at 11.5. -->
					<div class="mx-auto max-w-[360px] md:hidden">
						{@render mapSvg(data.narrowLayout)}
					</div>
				</div>
			{:else}
				<p class="mt-8 font-story text-lg text-stone-500 italic">
					The map appears once there are topics to place on it.
				</p>
			{/if}

			<!-- The same information as text: the map is a way in, not the only one. -->
			{#if data.clusters.length}
				<section class="mt-12">
					<div class="kicker mb-5 text-emerald-700">The clusters</div>
					<div class="grid gap-4 sm:grid-cols-2">
						{#each data.clusters as cluster (cluster.key)}
							<div
								id="c-{cluster.key}"
								class="{CARD} scroll-mt-24 bg-white p-7 hover:border-stone-200/90 hover:shadow-none"
							>
								<div class="font-serif text-[22px] text-ecohubs-deep">{cluster.label}</div>
								<div class="{META} mt-1.5">
									{cluster.topics.length}
									{cluster.topics.length === 1 ? 'topic' : 'topics'} · {cluster.articles}
									{cluster.articles === 1 ? 'article' : 'articles'}
								</div>
								<div class="mt-5 flex flex-col gap-2.5">
									{#each cluster.topics as topic (topic.slug)}
										<a
											href="/learn/topics/{topic.slug}"
											class="flex items-baseline gap-3 text-[14.5px] text-stone-700 transition-colors hover:text-ecohubs-dark"
										>
											<span class="size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
											<span class="flex-1">{topic.title}</span>
											<span class={META}>{topic.articles}</span>
										</a>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<div class="mt-14">
				<RabbitHole pool={data.rabbit} seed={data.clusters.length} />
			</div>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

<!--
	One drawing, rendered twice from two different layouts.

	`img` with a label rather than a bare graphic: assistive tech should
	announce what this is, and the cluster cards below carry the same
	information as text.

	`h-auto` rather than a fixed height: an SVG sized to its own viewBox aspect
	ratio draws as large as the column allows, at every width. A fixed height
	letterboxes it instead — on a phone the drawing shrank to a fifth of a box
	it only filled a quarter of.
-->
{#snippet mapSvg(layout: MapLayout)}
	<svg
		viewBox="0 0 {layout.width} {layout.height}"
		class="h-auto w-full"
		role="img"
		aria-label="Map of every learning topic, grouped into clusters"
	>
		{#each layout.clusters as cluster (cluster.key)}
			<g>
				<circle
					cx={cluster.x}
					cy={cluster.y}
					r={cluster.r}
					fill="rgba(245,242,234,0.9)"
					stroke="rgba(6,78,59,0.16)"
					stroke-dasharray="3 5"
				/>
				<text
					x={cluster.x}
					y={cluster.y - cluster.r + 18}
					text-anchor="middle"
					class="font-mono text-[9.5px] tracking-[0.16em] uppercase"
					fill="#a8a29e"
				>
					{cluster.label}
				</text>

				<!-- Spokes first, so the dots sit on top of them. -->
				{#each cluster.nodes as node (node.slug)}
					<line x1={node.cx} y1={node.cy} x2={node.x} y2={node.y} stroke="rgba(6,78,59,0.14)" />
				{/each}
				<circle cx={cluster.x} cy={cluster.y} r="4" fill="rgba(6,78,59,0.35)" />

				{#each cluster.nodes as node (node.slug)}
					<a href="/learn/topics/{node.slug}" class="group">
						<circle
							cx={node.x}
							cy={node.y}
							r={node.r}
							fill="rgba(6,78,59,0.55)"
							class="transition-colors group-hover:fill-ecohubs-primary"
						/>
						<text
							x={node.labelX}
							y={node.labelY}
							text-anchor={node.anchor}
							font-size="11.5"
							fill="#3f3f3a"
							class="transition-colors group-hover:fill-ecohubs-dark"
						>
							{#each node.lines as line, i (i)}
								<tspan x={node.labelX} dy={i === 0 ? 0 : LINE_HEIGHT}>{line}</tspan>
							{/each}
						</text>
					</a>
				{/each}
			</g>
		{/each}
	</svg>
{/snippet}

{#snippet railLists()}
	{#if data.clusters.length}
		<div class="mb-7">
			<p class={TREE_LABEL}>Clusters</p>
			<ul class={TREE}>
				{#each data.clusters as cluster (cluster.key)}
					<li>
						<a href="#c-{cluster.key}" class={TREE_LINK}>
							<span class="min-w-0 flex-1">{cluster.label}</span>
							<span class="font-mono text-[10.5px] text-stone-400">{cluster.topics.length}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<p class={TREE_LABEL}>Reading the map</p>
	<p class="px-2.5 text-[13px] leading-relaxed text-stone-500">
		Dotted rings are clusters. Dot size is how much has been written on a topic. Click any topic to
		open it.
	</p>
{/snippet}
