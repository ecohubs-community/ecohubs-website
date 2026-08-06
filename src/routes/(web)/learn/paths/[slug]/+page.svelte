<script lang="ts">
	/**
	 * One learning path: what it is for, what it will leave you able to do, and
	 * the ordered steps — each tickable.
	 *
	 * Ticking a step marks the underlying *lesson* read, so progress here, in the
	 * guide rail and on the hub cards are all the same fact rather than three
	 * tallies that can disagree.
	 */
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Cover, LearnRail, PathChain, ProgressRing } from '$lib/components/learning';
	import { CARD, META } from '$lib/components/learning/card';
	import { PILL, PILL_OFF } from '$lib/components/learning/pill';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { getProgress, setRead, toggleRead } from '$lib/learning/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const path = $derived(data.path);
	const breadcrumbs = $derived(
		learningBreadcrumbs([
			{ name: 'Learning Paths', path: '/learn/paths' },
			{ name: path.title, path: `/learn/paths/${path.slug}` }
		])
	);

	/** Empty on the server: the page's content never depends on it. */
	let read = $state<Record<string, unknown>>({});
	/** The reset button does nothing without storage, so it waits for hydration. */
	let ready = $state(false);

	onMount(() => {
		read = getProgress();
		ready = true;
	});

	const done = $derived(data.steps.filter((s) => read[s.slug]).length);
	const percent = $derived(data.steps.length ? Math.round((done / data.steps.length) * 100) : 0);
	const nextIndex = $derived(data.steps.findIndex((s) => !read[s.slug]));
	const next = $derived(nextIndex === -1 ? undefined : data.steps[nextIndex]);

	function toggle(slug: string) {
		toggleRead(slug);
		read = getProgress();
	}

	function reset() {
		for (const step of data.steps) setRead(step.slug, false);
		read = getProgress();
	}

	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';
</script>

<SEO
	title="{path.title} — a learning path"
	description={path.summary}
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

<div class="bg-ecohubs-base">
	<div
		class="mx-auto grid max-w-[1360px] gap-14 px-6 pt-8 pb-20 md:pb-28 lg:grid-cols-[248px_minmax(0,1fr)]"
	>
		<div class="min-w-0 lg:order-2">
			<!-- ═══════════════════════════════════════════════════════
					1. HEADER
			═══════════════════════════════════════════════════════ -->
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">{path.audience ?? 'Learning path'}</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<div class="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
				<div>
					<h1
						class="font-serif text-[38px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[44px]"
					>
						{path.title}
					</h1>
					<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">{path.summary}</p>

					<div class="{META} mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
						<span>{data.steps.length} {data.steps.length === 1 ? 'step' : 'steps'}</span>
						<span aria-hidden="true">·</span>
						<span>{data.minutes} min of reading</span>
						<span aria-hidden="true">·</span>
						<span>free, no account</span>
					</div>

					<div class="mt-7 flex flex-wrap items-center gap-3">
						<a
							href={(next ?? data.steps[0]).href}
							class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
						>
							{#if !next}
								Path complete — revisit
							{:else if nextIndex <= 0}
								Start step 01
							{:else}
								Continue step {String(nextIndex + 1).padStart(2, '0')}
							{/if}
							<span aria-hidden="true">→</span>
						</a>
						{#if ready && done > 0}
							<button type="button" onclick={reset} class="{PILL} {PILL_OFF}">
								Reset this path
							</button>
						{/if}
					</div>
				</div>

				<Cover
					slug={path.slug}
					image={path.image}
					imageAlt={path.imageAlt}
					motif={path.motif}
					label="path · {path.title.toLowerCase()}"
					class="h-[220px] w-full rounded-[22px] lg:h-[300px]"
				/>
			</div>

			<!-- ═══════════════════════════════════════════════════════
					2. OUTCOMES
			═══════════════════════════════════════════════════════ -->
			{#if path.outcomes?.length}
				<section class="mt-12">
					<div class="kicker mb-3 text-emerald-700">What you will be able to do</div>
					<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
						{#each path.outcomes as outcome, i (outcome)}
							<div class="{CARD} bg-white p-6 hover:border-stone-200/90 hover:shadow-none">
								<div class="mb-2 font-mono text-[11px] text-emerald-700">
									{String(i + 1).padStart(2, '0')}
								</div>
								<p class="text-[14.5px] leading-relaxed text-stone-700">{outcome}</p>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<div class="hairline my-14"></div>

			<!-- ═══════════════════════════════════════════════════════
					3. THE PATH
			═══════════════════════════════════════════════════════ -->
			<div class="grid items-start gap-9 lg:grid-cols-[1fr_248px]">
				<section>
					<div class="mb-6 flex flex-wrap items-end justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-emerald-700">The path</div>
							<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">
								{data.steps.length}
								{data.steps.length === 1 ? 'step' : 'steps'}, in order
							</h2>
						</div>
						{#if ready}
							<span class={META}>click a step to tick it off</span>
						{/if}
					</div>

					<PathChain
						steps={data.steps}
						{read}
						onToggle={toggle}
						endsAt={path.endsAt ?? undefined}
					/>
				</section>

				<aside
					class="{CARD} bg-white p-6 hover:border-stone-200/90 hover:shadow-none lg:sticky lg:top-24"
				>
					<div class="flex items-center gap-4">
						<ProgressRing {percent} size={58} />
						<div>
							<div class="font-serif text-[21px] text-ecohubs-deep">{percent}%</div>
							<div class={META}>{done} of {data.steps.length} steps</div>
						</div>
					</div>

					<div class="hairline my-5"></div>

					<div class="kicker mb-3 text-emerald-700">Up next</div>
					<div class="text-[14.5px] leading-snug text-ecohubs-deep">
						{next ? next.title : 'Nothing — you finished this path.'}
					</div>
					<a
						href={(next ?? data.steps[0]).href}
						class="mt-4 inline-block text-[13.5px] text-ecohubs-dark hover:text-ecohubs-deep"
					>
						{next ? 'Open it →' : 'Revisit the first step →'}
					</a>

					{#if path.pairs?.length}
						<div class="hairline my-5"></div>
						<div class="kicker mb-3 text-emerald-700">Pairs well with</div>
						<div class="flex flex-col gap-2">
							{#each path.pairs as pair (pair.href)}
								<a
									href={pair.href}
									class="text-[13.5px] text-stone-600 transition-colors hover:text-ecohubs-dark"
								>
									{pair.label}
								</a>
							{/each}
						</div>
					{/if}
				</aside>
			</div>

			<!-- ═══════════════════════════════════════════════════════
					4. CONTINUE ELSEWHERE
			═══════════════════════════════════════════════════════ -->
			{#if data.others.length}
				<section class="mt-16">
					<div class="kicker mb-5 text-emerald-700">Continue elsewhere</div>
					<div class="grid gap-3 sm:grid-cols-3">
						{#each data.others as other (other.slug)}
							<a href="/learn/paths/{other.slug}" class="{CARD} overflow-hidden bg-white">
								<Cover
									slug={other.slug}
									image={other.image}
									imageAlt={other.imageAlt}
									motif={other.motif}
									class="h-20 w-full"
								/>
								<div class="p-5">
									<div class="font-serif text-[16.5px] leading-snug text-ecohubs-deep">
										{other.title}
									</div>
									<div class="{META} mt-2">
										{other.steps}
										{other.steps === 1 ? 'step' : 'steps'}
									</div>
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	<div class="mb-7">
		<p class={TREE_LABEL}>This path</p>
		<a
			href="/learn/paths"
			class="mb-2 flex items-center gap-2 px-2.5 text-[13px] text-stone-500 transition-colors hover:text-ecohubs-dark"
		>
			<span aria-hidden="true">↩</span> All learning paths
		</a>
		<ul class={TREE}>
			{#each data.steps as step (step.slug)}
				<li>
					<a
						href={step.href}
						class="-ml-px flex items-start gap-2 border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] leading-[1.35] transition-colors hover:text-ecohubs-dark
						       {read[step.slug] ? 'text-stone-400' : 'text-stone-600'}"
					>
						<span
							aria-hidden="true"
							class="mt-[3px] grid size-[13px] shrink-0 place-items-center rounded-full border text-[8px] text-white
							       {read[step.slug] ? 'border-ecohubs-primary bg-ecohubs-primary' : 'border-stone-300'}"
						>
							{read[step.slug] ? '✓' : ''}
						</span>
						<span class="min-w-0">{step.title}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-4 px-2.5">
			<div class="{META} mb-2 flex items-center justify-between">
				<span>Progress</span><span>{percent}%</span>
			</div>
			<div
				class="h-1 overflow-hidden rounded-full bg-[#ece9e2]"
				role="progressbar"
				aria-valuenow={percent}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-label="{path.title} progress"
			>
				<i
					class="block h-full rounded-full bg-ecohubs-primary transition-[width] duration-500"
					style="width: {percent}%"
				></i>
			</div>
		</div>
	</div>

	{#if data.others.length}
		<p class={TREE_LABEL}>Other paths</p>
		<ul class={TREE}>
			{#each data.others as other (other.slug)}
				<li>
					<a
						href="/learn/paths/{other.slug}"
						class="-ml-px block border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark"
					>
						{other.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
{/snippet}
