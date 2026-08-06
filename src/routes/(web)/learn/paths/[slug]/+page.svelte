<script lang="ts">
	import { LearnRail } from '$lib/components/learning';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { courseSchema, learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const path = $derived(data.path);
	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Learning paths', path: '/learn/paths' },
			{ name: path.title, path: `/learn/paths/${path.slug}` }
		])
	);
	const jsonLd = $derived(courseSchema(path, data.steps));
</script>

<SEO
	title="{path.title} — EcoHubs"
	description={path.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	{jsonLd}
	noindex={!data.indexable}
/>

<article class="bg-ecohubs-base pb-20 md:pb-28">
	<!-- One grid for the whole page, not one per section: in the design the rail
	     starts level with the title rather than below a full-width hero, and it
	     can only do that if the heading lives in the article column too. -->
	<div
		class="mx-auto grid max-w-3xl gap-12 px-6 pt-8 lg:max-w-6xl lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8"
	>
		<div class="min-w-0 lg:order-2">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<a href="/learn/paths" class="kicker text-emerald-700 hover:text-ecohubs-deep">
					Learning path
				</a>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
			>
				{path.title}
			</h1>

			<p class="mt-6 text-xl leading-relaxed font-light text-stone-700">{path.summary}</p>

			<p class="mt-7 text-sm text-stone-500">
				<span class="font-story italic">
					{data.steps.length} lessons · {data.minutes} min
				</span>
			</p>

			<div class="hairline my-10"></div>

			<!-- An ordered list, because the order is the point of a path. -->
			<ol class="space-y-3">
				{#each data.steps as step, i (step.slug)}
					<li>
						<a
							href="/learn/guides/{step.guide}/{step.slug}"
							class="group flex gap-5 rounded-2xl border border-stone-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:soft-shadow"
						>
							<span class="shrink-0 font-story text-lg text-stone-400 italic">
								{String(i + 1).padStart(2, '0')}
							</span>
							<span class="min-w-0">
								<span
									class="block font-serif text-lg text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
								>
									{step.title}
								</span>
								<span class="mt-1 block text-sm leading-relaxed text-stone-600">
									{step.summary}
								</span>
								<span class="mt-2 block text-xs text-stone-400">{step.minutes} min</span>
							</span>
						</a>
					</li>
				{/each}
			</ol>

			{#if path.endsAt}
				<!-- Every path ends somewhere deliberate. This is the whole point of
				     curating one: the reader arrives somewhere useful. -->
				<div class="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 sm:p-8">
					<p class="kicker mb-2 text-emerald-700">When you reach the end</p>
					<a
						href={path.endsAt.href}
						class="font-serif text-xl text-ecohubs-deep underline decoration-emerald-300 underline-offset-4 transition-colors hover:decoration-emerald-600"
					>
						{path.endsAt.label}
					</a>
				</div>
			{/if}

			<div class="mt-14 text-center">
				<a
					href="/learn/paths"
					class="group inline-flex items-center gap-2 text-sm text-ecohubs-dark transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					<span class="font-story italic">All paths</span>
				</a>
			</div>
		</div>

		<!-- A path *is* its sequence, so the rail carries the steps and marks
			     how far along each one sits. -->
		<LearnRail
			withinTitle="The path"
			within={data.steps.map((step, i) => ({
				href: `/learn/guides/${step.guide}/${step.slug}`,
				label: step.title,
				marker: String(i + 1),
				note: `${step.minutes} min`
			}))}
			sidewaysTitle="Other paths"
			sideways={data.others.map((o) => ({ href: `/learn/paths/${o.slug}`, label: o.title }))}
			backLink={{ href: '/learn/paths', label: 'All paths' }}
		/>
	</div>
</article>
