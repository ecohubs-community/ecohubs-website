<script lang="ts">
	/**
	 * A learning path: the first three steps, how many more there are, and how
	 * far this browser has got.
	 *
	 * Progress comes from the caller rather than being read here — one path
	 * index read per page, not one per card — and is empty on the server, so the
	 * bar starts at zero and fills after hydration. Nothing in the card's
	 * content depends on it.
	 */
	import { CARD, META, TAG } from './card';

	export interface PathCardData {
		slug: string;
		title: string;
		summary: string;
		minutes: number;
		/** Every step, in order. Only the first three are shown. */
		steps: { slug: string; title: string }[];
	}

	let { path, read = {} }: { path: PathCardData; read?: Record<string, unknown> } = $props();

	const shown = $derived(path.steps.slice(0, 3));
	const remaining = $derived(path.steps.length - shown.length);
	const done = $derived(path.steps.filter((s) => read[s.slug]).length);
	const percent = $derived(path.steps.length ? Math.round((done / path.steps.length) * 100) : 0);
</script>

<a href="/learn/paths/{path.slug}" class="{CARD} bg-white p-7">
	<div class="flex items-start justify-between gap-4">
		<h3 class="font-serif text-[21px] leading-snug text-ecohubs-deep">{path.title}</h3>
		<span class={TAG}>{path.minutes} min</span>
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
				class="block h-full rounded-full bg-ecohubs-primary transition-[width] duration-400"
				style="width: {percent}%"
			></i>
		</div>
	</div>
</a>
