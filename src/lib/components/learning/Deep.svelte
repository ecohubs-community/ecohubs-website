<script lang="ts">
	/**
	 * Additive detail — research, comparison tables, caveats, citations.
	 *
	 * Visible unless the reader has explicitly chosen a shallower depth. The
	 * hiding is done by `html[data-depth=…]` set from a stored preference before
	 * first paint; with no preference the attribute is absent and this renders.
	 *
	 * That default matters: Googlebot executes JavaScript with empty storage, so
	 * a default of "standard" — as the design mockup does — would hide the most
	 * quotable content on the page from the crawler.
	 */
	import type { Snippet } from 'svelte';

	let { title = 'Deep', children }: { title?: string; children: Snippet } = $props();
</script>

<aside
	data-depth-layer="deep"
	class="my-8 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6
	       [html[data-depth=quick]_&]:hidden [html[data-depth=standard]_&]:hidden
	       print:block!"
>
	<p class="kicker mb-3 text-emerald-700">{title}</p>
	<div class="text-[0.95rem] leading-relaxed text-stone-700">
		{@render children()}
	</div>
</aside>
