<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([]);
</script>

<SEO
	title="Learning Hub — regenerative communities, explained"
	description="Plain explanations of how intentional communities work — governance, money, land, conflict and daily life — written by people building one."
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
				<div class="kicker text-emerald-700">Learning hub</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>
			<h1
				class="font-serif text-5xl leading-[1.05] tracking-tight text-ecohubs-deep md:text-6xl lg:text-[64px]"
			>
				Learn everything about
				<em class="font-story font-normal italic text-ecohubs-primary">regenerative communities.</em
				>
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed font-light text-stone-700">
				How these places actually work — how they decide, how they hold money and land, how they
				handle conflict, and why they break. Written by people building one, and honest about what
				we don't yet know.
			</p>

			<div class="hairline my-10"></div>

			{#if data.topics.length}
				<div class="mb-14">
					<h2 class="kicker mb-5 text-emerald-700">Browse by topic</h2>
					<p class="mb-6 max-w-2xl font-serif text-2xl text-ecohubs-deep">
						Ten doors into the same house.
					</p>
					<ul class="grid gap-5 sm:grid-cols-2">
						{#each data.topics as topic (topic.slug)}
							<li>
								<a
									href="/learn/topics/{topic.slug}"
									class="group block h-full rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
								>
									<h3
										class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
									>
										{topic.title}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-stone-700">{topic.summary}</p>
								</a>
							</li>
						{/each}
					</ul>
					<p class="mt-5">
						<a
							href="/learn/topics"
							class="text-sm text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
						>
							All topics →
						</a>
					</p>
				</div>
			{/if}

			{#if data.paths.length}
				<div class="mb-14">
					<h2 class="kicker mb-5 text-emerald-700">Learning paths</h2>
					<p class="mb-6 max-w-2xl font-serif text-2xl text-ecohubs-deep">
						A sequence, when you don't know where to start.
					</p>
					<ul class="grid gap-5 sm:grid-cols-2">
						{#each data.paths as path (path.slug)}
							<li>
								<a
									href="/learn/paths/{path.slug}"
									class="group block h-full rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
								>
									<h3
										class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
									>
										{path.title}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-stone-700">{path.summary}</p>
									<p class="mt-3 text-xs text-stone-500">{path.steps} lessons</p>
								</a>
							</li>
						{/each}
					</ul>
					<p class="mt-5">
						<a
							href="/learn/paths"
							class="text-sm text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
						>
							All paths →
						</a>
					</p>
				</div>
			{/if}

			{#if data.comparisons.length}
				<div class="mb-14">
					<h2 class="kicker mb-5 text-emerald-700">Told apart</h2>
					<p class="mb-6 max-w-2xl font-serif text-2xl text-ecohubs-deep">
						The words people use interchangeably, and why they shouldn't.
					</p>
					<ul class="grid gap-5 sm:grid-cols-2">
						{#each data.comparisons as item (item.slug)}
							<li>
								<a
									href="/learn/compare/{item.slug}"
									class="group block h-full rounded-2xl border border-stone-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
								>
									<h3
										class="font-serif text-xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
									>
										{item.title}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-stone-700">{item.summary}</p>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if data.glossaryCount}
				<a
					href="/learn/glossary"
					class="group block rounded-2xl border border-stone-200/70 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:soft-shadow"
				>
					<div class="kicker mb-3 text-emerald-700">Glossary</div>
					<h2
						class="font-serif text-2xl text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
					>
						Every word this world uses, said plainly.
					</h2>
					<p class="mt-3 text-stone-700">
						{data.glossaryCount}
						{data.glossaryCount === 1 ? 'term' : 'terms'} — what each one means, where it applies, and
						what it is often confused with.
					</p>
				</a>
			{/if}

			{#if !data.topics.length && !data.paths.length && !data.comparisons.length && !data.glossaryCount}
				<p class="font-story text-lg text-stone-500 italic">The first entries are being written.</p>
			{/if}
		</div>

		<LearnRail />
	</div>
</div>
