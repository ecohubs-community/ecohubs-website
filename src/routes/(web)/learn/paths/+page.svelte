<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail, PathCard } from '$lib/components/learning';
	import { onMount } from 'svelte';
	import { getProgress } from '$lib/learning/storage';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Learning paths', path: '/learn/paths' }]);

	// Read once for the whole grid, not once per card. Empty on the server, so
	// every bar starts at zero and fills after hydration.
	let read = $state<Record<string, unknown>>({});
	onMount(() => (read = getProgress()));
</script>

<SEO
	title="Learning paths — a sequence, when you don't know where to start"
	description="Ordered routes through the hub for the four situations people actually arrive in: curious, looking to join, wanting to start, or already struggling."
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
				<div class="kicker text-emerald-700">Learning paths</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1
				class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
			>
				A sequence, when you don't know
				<em class="font-story font-normal italic text-ecohubs-primary">where to start.</em>
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
				Each path is an ordered set of lessons drawn from across the hub. Your place is remembered
				in this browser — no account, no email.
			</p>

			<div class="hairline my-10"></div>

			{#if data.paths.length}
				<ul class="grid gap-4 md:grid-cols-2">
					{#each data.paths as path (path.slug)}
						<li class="flex"><PathCard {path} {read} /></li>
					{/each}
				</ul>
			{:else}
				<p class="font-story text-lg text-stone-500 italic">The first paths are being written.</p>
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
