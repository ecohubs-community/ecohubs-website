<script lang="ts">
	/**
	 * The "short version" card — the answer for someone with thirty seconds.
	 *
	 * A genuinely separate text, not a truncation of the body, and the paragraph
	 * most likely to be quoted by an AI assistant. Hidden only when the reader
	 * has explicitly asked for the standard read; absent preference shows it.
	 */
	import type { Snippet } from 'svelte';

	let { title = 'The short version', children }: { title?: string; children: Snippet } = $props();
</script>

<aside
	data-depth-layer="quick"
	class="my-8 rounded-2xl border border-stone-200 bg-ecohubs-ivory p-6 sm:p-8
	       [html[data-depth=standard]_&]:hidden
	       print:block!"
>
	<p class="kicker mb-3 text-emerald-700">{title}</p>
	<div class="text-lg leading-relaxed font-light text-stone-700">
		{@render children()}
	</div>
</aside>
