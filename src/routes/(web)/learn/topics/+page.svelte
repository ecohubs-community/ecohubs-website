<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, TopicCard } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Topics', path: '/learn/topics' }]);

	/** Small numbers read better as words in a headline. */
	const WORDS = [
		'No',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
		'Ten'
	];
	const spelled = (n: number) => WORDS[n] ?? String(n);
</script>

<SEO
	title="Topics — the doors into community living"
	description="Governance, money, land, conflict, membership and daily life — the subjects that decide whether a community lasts, each explained from the ground up."
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
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">Browse by topic</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<!-- The number is counted, not written: the heading said "Ten doors"
			     while eight topics were published, because the plan had ten. -->
			<h1
				class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
			>
				{spelled(data.topics.length)} doors into
				<em class="font-story font-normal italic text-ecohubs-primary">the same house.</em>
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
				Every one of these decides whether a community lasts. Start wherever your question is.
			</p>

			<div class="hairline my-10"></div>

			{#if data.topics.length}
				<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.topics as topic (topic.slug)}
						<li class="flex"><TopicCard topic={{ ...topic, articles: topic.total }} /></li>
					{/each}
				</ul>
			{:else}
				<p class="font-story text-lg text-stone-500 italic">The first topics are being written.</p>
			{/if}

			<div class="mt-14 text-center">
				<a
					href="/learn"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">The learning hub</span>
				</a>
			</div>
		</div>

		<LearnRail />
	</div>
</div>
