<script lang="ts">
	/**
	 * A boxed aside inside prose.
	 *
	 * `caveat` exists because this project says what it does not know — the CSI
	 * page marks its gaps, the RCOS spec publishes an "honest gap in v0.1". That
	 * voice needs a visual home in the hub too.
	 */
	import type { Snippet } from 'svelte';

	type Kind = 'note' | 'warning' | 'caveat' | 'source';

	let {
		type = 'note',
		title,
		children
	}: { type?: Kind; title?: string; children: Snippet } = $props();

	const STYLES: Record<Kind, { box: string; label: string; fallback: string }> = {
		note: {
			box: 'border-stone-200 bg-stone-50',
			label: 'text-stone-500',
			fallback: 'Note'
		},
		warning: {
			box: 'border-amber-200 bg-amber-50/60',
			label: 'text-amber-700',
			fallback: 'Worth knowing'
		},
		caveat: {
			box: 'border-stone-300 bg-white',
			label: 'text-stone-500',
			fallback: "What we don't know"
		},
		source: {
			box: 'border-emerald-100 bg-emerald-50/40',
			label: 'text-emerald-700',
			fallback: 'Source'
		}
	};

	const style = $derived(STYLES[type] ?? STYLES.note);
</script>

<aside class="my-8 rounded-2xl border p-6 {style.box}">
	<p class="kicker mb-2 {style.label}">{title ?? style.fallback}</p>
	<div class="text-[0.95rem] leading-relaxed text-stone-700">
		{@render children()}
	</div>
</aside>
