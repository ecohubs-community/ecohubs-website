<script lang="ts">
	/**
	 * The dark "here is what we don't know" panel that closes an honesty section:
	 * an amber kicker, a list of open circles, and a closing note.
	 *
	 * Used on `/csi` ("what we haven't checked"), `/votecast` ("what no setting
	 * fixes") and `/seeking` ("what we can't know for you"). It renders only the
	 * panel — the parent decides where it sits, so it works both as one column of
	 * a grid (`columns={1}`) and as a full-width band under one (`columns={2}`).
	 */
	interface Props {
		kicker: string;
		items: string[];
		/** Closing paragraph under the rule. */
		note: string;
		/** `1` for the narrow in-grid card, `2` for the wide band. Drives padding and type size. */
		columns?: 1 | 2;
		/** Scroll-reveal hooks (`data-scroll-animate`) pass through to the panel itself. */
		[key: string]: unknown;
	}

	let { kicker, items, note, columns = 1, ...rest }: Props = $props();

	const wide = $derived(columns === 2);
</script>

<div
	{...rest}
	class="bg-ecohubs-deep text-ecohubs-ivory rounded-3xl border border-emerald-900/40 {wide
		? 'p-7 md:p-9'
		: 'p-7'}"
>
	<div class="kicker mb-5 text-amber-200/80">{kicker}</div>

	<ul class={wide ? 'grid gap-x-10 gap-y-3 md:grid-cols-2' : 'space-y-3'}>
		{#each items as item (item)}
			<li class="grid grid-cols-[18px_1fr] items-start gap-3">
				<span class="mt-0.5 text-sm text-emerald-300/70">○</span>
				<span class="text-[15px] leading-snug text-stone-200/90">{item}</span>
			</li>
		{/each}
	</ul>

	<p
		class="mt-6 border-t border-emerald-900/50 pt-5 leading-relaxed text-stone-300/70 {wide
			? 'max-w-2xl text-sm'
			: 'text-xs'}"
	>
		{note}
	</p>
</div>
