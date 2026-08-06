<script lang="ts">
	/**
	 * A learning path, in the design's two shapes:
	 *
	 *   compact  title, blurb, first three steps, a progress bar — for the hub
	 *   full     plus a cover, who it is for, and a progress ring showing which
	 *            step comes next — for the paths index
	 *
	 * Progress comes from the caller rather than being read here: one storage
	 * read per page, not one per card. It is empty on the server, so a card
	 * starts at zero and fills in after hydration — nothing in its content
	 * depends on it.
	 */
	import Cover from './Cover.svelte';
	import ProgressRing from './ProgressRing.svelte';
	import { CARD, META, TAG } from './card';
	import type { Motif } from '$lib/learning/types';

	export interface PathCardData {
		slug: string;
		title: string;
		summary: string;
		minutes: number;
		audience?: string;
		image?: string;
		imageAlt?: string;
		motif?: Motif;
		/** Every step, in order. Only the first three are shown. */
		steps: { slug: string; title: string }[];
	}

	let {
		path,
		read = {},
		variant = 'compact'
	}: {
		path: PathCardData;
		read?: Record<string, unknown>;
		variant?: 'compact' | 'full';
	} = $props();

	const full = $derived(variant === 'full');
	const shown = $derived(path.steps.slice(0, 3));
	const remaining = $derived(path.steps.length - shown.length);
	const done = $derived(path.steps.filter((s) => read[s.slug]).length);
	const percent = $derived(path.steps.length ? Math.round((done / path.steps.length) * 100) : 0);
	const nextStep = $derived(path.steps.find((s) => !read[s.slug]));
</script>

<a
	href="/learn/paths/{path.slug}"
	class="{CARD} flex flex-col bg-white {full ? 'overflow-hidden' : 'p-7'}"
>
	{#if full}
		<Cover
			slug={path.slug}
			image={path.image}
			imageAlt={path.imageAlt}
			motif={path.motif}
			label="path · {path.title.toLowerCase()}"
			class="h-28 w-full"
		/>
	{/if}

	<div class={full ? 'flex flex-1 flex-col p-7' : 'contents'}>
		{#if full && path.audience}
			<div class={META}>{path.audience}</div>
		{/if}

		<div class="flex items-start justify-between gap-4 {full && path.audience ? 'mt-2' : ''}">
			<h3 class="font-serif leading-snug text-ecohubs-deep {full ? 'text-[23px]' : 'text-[21px]'}">
				{path.title}
			</h3>
			{#if !full}
				<span class={TAG}>{path.minutes} min</span>
			{/if}
		</div>

		<p class="mt-3 text-[14.5px] leading-relaxed text-stone-600">{path.summary}</p>

		<ol class="mt-5 flex flex-col gap-2">
			{#each shown as step, i (step.slug)}
				<li class="flex gap-3 text-[13.5px] text-stone-500">
					<span class="pt-0.5 font-mono text-[11px] text-stone-400">
						{String(i + 1).padStart(2, '0')}
					</span>
					<span class="min-w-0">{step.title}</span>
				</li>
			{/each}
			{#if remaining > 0}
				<li class="pl-8 text-[13px] text-stone-400">
					+ {remaining} more {remaining === 1 ? 'step' : 'steps'}
				</li>
			{/if}
		</ol>

		{#if full}
			<div class="mt-auto pt-6">
				<div class="{META} mb-4 flex flex-wrap gap-x-5 gap-y-1.5">
					<span>{path.steps.length} {path.steps.length === 1 ? 'step' : 'steps'}</span>
					<span>{path.minutes} min reading</span>
				</div>
				<div class="flex items-center gap-4">
					<ProgressRing {percent} />
					<span class="min-w-0 flex-1">
						<span class="block text-[14.5px] text-ecohubs-deep">
							{percent === 0 ? 'Not started' : !nextStep ? 'Path complete' : `${percent}% complete`}
						</span>
						<span class="{META} mt-0.5 block truncate">
							{nextStep ? `Next: ${nextStep.title}` : 'Revisit any step'}
						</span>
					</span>
					<span aria-hidden="true" class="text-sm text-ecohubs-dark">→</span>
				</div>
			</div>
		{:else}
			<div class="mt-6 border-t border-stone-100 pt-5">
				<div class="{META} mb-2 flex items-center justify-between">
					<span>{path.steps.length} {path.steps.length === 1 ? 'lesson' : 'lessons'}</span>
					<span>{percent}% complete</span>
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
		{/if}
	</div>
</a>
