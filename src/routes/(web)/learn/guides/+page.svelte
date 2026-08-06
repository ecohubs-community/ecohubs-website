<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
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

<section class="relative overflow-hidden pt-20 pb-14 md:pt-28 md:pb-16">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div class="mx-auto max-w-6xl px-6 lg:px-8">
		<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
			<div class="kicker text-emerald-700">Guides</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl"
		>
			Long reads that
			<em class="font-story font-normal italic text-ecohubs-primary">finish the subject.</em>
		</h1>
	</div>
</section>

<section class="pb-20 md:pb-28">
	<div
		class="mx-auto grid max-w-3xl gap-12 px-6 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
	>
		<div class="min-w-0 lg:order-2">
			{#if data.guides.length}
				<ul class="space-y-5">
					{#each data.guides as guide (guide.slug)}
						<li>
							<a
								href="/learn/guides/{guide.slug}"
								class="group block rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
							>
								<p class="kicker mb-2 text-emerald-700">{guide.level}</p>
								<h2
									class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
								>
									{guide.title}
								</h2>
								<p class="mt-2 text-sm leading-relaxed text-stone-700">{guide.summary}</p>
								<p class="mt-3 text-xs text-stone-500">
									{guide.lessons} lessons · {guide.minutes} min
								</p>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="font-story text-lg text-stone-500 italic">The first guides are being written.</p>
			{/if}
		</div>

		<LearnRail />
	</div>
</section>
