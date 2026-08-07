<script lang="ts">
	/**
	 * The "short version" card — the answer for someone with thirty seconds.
	 *
	 * A genuinely separate text, not a truncation of the body, and the paragraph
	 * most likely to be quoted by an AI assistant.
	 *
	 * Never hidden, at any depth. The depth levels are strictly additive —
	 * quick → standard → deep only ever *adds* — so the summary a reader found
	 * useful does not vanish when they ask for more detail. It reads as a
	 * standfirst above the article, which is where it belongs anyway.
	 */
	import type { Snippet } from 'svelte';

	let { title = 'The short version', children }: { title?: string; children: Snippet } = $props();
</script>

<aside
	data-depth-layer="quick"
	class="my-8 rounded-2xl border border-stone-200 bg-ecohubs-ivory p-6 sm:p-8"
>
	<p class="kicker mb-3 text-emerald-700">{title}</p>
	<div class="text-lg leading-relaxed font-light text-stone-700">
		{@render children()}
	</div>
</aside>
