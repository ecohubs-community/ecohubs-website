<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { GuideCard, LearnRail } from '$lib/components/learning';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Guides', path: '/learn/guides' }]);
</script>

<SEO
	title="Guides — long reads that finish the subject"
	description="Complete guides to intentional communities, governance, money and regenerative living — each a sequence of lessons rather than a single article."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

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
				<div class="kicker text-emerald-700">Guides</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1 class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl">
				Long reads that
				<em class="font-story font-normal italic text-ecohubs-primary">finish the subject.</em>
			</h1>

			<div class="hairline my-10"></div>

			{#if data.guides.length}
				<!-- The first guide leads at full width; the rest run as compact
				     rows, which is the design's two shapes on one grid. -->
				<ul class="grid gap-5 md:grid-cols-2">
					{#each data.guides as guide, i (guide.slug)}
						<li class="flex {i === 0 ? 'md:row-span-2' : ''}">
							<GuideCard {guide} featured={i === 0} class="w-full" />
						</li>
					{/each}
				</ul>
			{:else}
				<p class="font-story text-lg text-stone-500 italic">The first guides are being written.</p>
			{/if}
		</div>

		<LearnRail />
	</div>
</div>
