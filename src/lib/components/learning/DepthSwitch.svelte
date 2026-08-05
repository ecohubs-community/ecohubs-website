<script lang="ts">
	/**
	 * Reading-depth control: quick · standard · deep.
	 *
	 * Semantics differ deliberately from the design mockup. Here **deep means
	 * "show everything"**, so the unset state and `deep` render identically.
	 * That gives the default a name, lets the control show a sensible active
	 * state before the reader has chosen, and — the reason it matters — means
	 * no content is ever hidden from a client that has not asked.
	 *
	 *   unset / deep → quick card + body + deep detail
	 *   standard     → body only
	 *   quick        → quick card only
	 *
	 * Hiding is CSS on `html[data-depth]`, applied by the pre-paint script in
	 * app.html so a returning reader sees no flash and never re-clicks.
	 */
	import { onMount } from 'svelte';
	import { getDepth, setDepth } from '$lib/learning/storage';
	import type { Depth } from '$lib/learning/types';

	const OPTIONS: { value: Depth; label: string; hint: string }[] = [
		{ value: 'quick', label: 'Quick', hint: 'Just the short version' },
		{ value: 'standard', label: 'Standard', hint: 'The main read' },
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
