<script lang="ts">
	/**
	 * Reading-depth control: quick · standard · deep.
	 *
	 * **The levels are strictly additive — each one only ever adds.** That is
	 * the rule the whole depth system follows, and it means a reader who found
	 * the summary useful never loses it by asking for more:
	 *
	 *   quick           → the short version
	 *   standard        → the short version + the body
	 *   deep / unset    → the short version + the body + the detail
	 *
	 * `deep` and the unset state render identically, which gives the default a
	 * name and — the reason it matters — means no content is ever hidden from a
	 * client that has not asked. Hiding is CSS on `html[data-depth]`, applied by
	 * the pre-paint script in app.html so a returning reader sees no flash and
	 * never re-clicks.
	 */
	import { onMount } from 'svelte';
	import { getDepth, setDepth } from '$lib/learning/storage';
	import type { Depth } from '$lib/learning/types';

	const OPTIONS: { value: Depth; label: string; hint: string }[] = [
		{ value: 'quick', label: 'Quick', hint: 'The short version only' },
		{ value: 'standard', label: 'Standard', hint: 'The short version and the main read' },
		{ value: 'deep', label: 'Deep', hint: 'Everything, including the detail' }
	];

	// Server renders with `deep` active, matching what an unset client shows.
	let current = $state<Depth>('deep');

	onMount(() => {
		current = getDepth() ?? 'deep';
	});

	function choose(depth: Depth) {
		current = depth;
		setDepth(depth);
	}
</script>

<div
	class="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1"
	role="group"
	aria-label="Reading depth"
>
	{#each OPTIONS as option (option.value)}
		<button
			type="button"
			onclick={() => choose(option.value)}
			aria-pressed={current === option.value}
			title={option.hint}
			class="rounded-full px-4 py-1.5 text-sm transition-colors
			       {current === option.value
				? 'bg-ecohubs-dark text-white'
				: 'text-stone-600 hover:text-ecohubs-deep'}"
		>
			{option.label}
		</button>
	{/each}
</div>
