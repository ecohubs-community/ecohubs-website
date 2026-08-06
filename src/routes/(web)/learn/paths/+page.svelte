<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Learning paths', path: '/learn/paths' }]);
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
		class="mx-auto grid max-w-4xl gap-12 px-6 pt-8 pb-20 md:pb-28 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
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
				<ul class="grid gap-5 sm:grid-cols-2">
					{#each data.paths as path (path.slug)}
						<li>
							<a
								href="/learn/paths/{path.slug}"
								class="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
							>
								<h2
									class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
								>
									{path.title}
								</h2>
								<p class="mt-2 flex-1 text-sm leading-relaxed text-stone-700">{path.summary}</p>
								<p class="mt-4 text-xs text-stone-500">
									{path.steps}
									{path.steps === 1 ? 'lesson' : 'lessons'} · {path.minutes} min
									{#if path.endsAt}
										· ends at {path.endsAt.label.toLowerCase()}
									{/if}
								</p>
							</a>
						</li>
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
