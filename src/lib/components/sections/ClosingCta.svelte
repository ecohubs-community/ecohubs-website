<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The dark closing section that ends a long page: emerald/amber radial wash
	 * over `ecohubs-deep`, centred display headline, then the actions row.
	 * Used on `/rcos`, `/csi` and `/membership`.
	 */
	interface Props {
		/** Small uppercase line above the headline. */
		kicker: string;
		/** Headline — a snippet so each page keeps its own `<em>` emphasis and line breaks. */
		headline: Snippet;
		/** Standfirst under the headline. */
		lead: Snippet;
		/** `display` renders the lead large and serif; `body` keeps it body-sized. */
		leadStyle?: 'display' | 'body';
		/** Buttons / links row. */
		actions: Snippet;
		/** Thin emerald rule between the lead and the actions. */
		divider?: boolean;
		/** Tiny uppercase line under the actions. */
		footnote?: string;
		/** Optional closing aside under the footnote — a caveat, a reassurance. */
		note?: Snippet;
		/** Content column width. */
		width?: 'narrow' | 'wide';
	}

	let {
		kicker,
		headline,
		lead,
		leadStyle = 'display',
		actions,
		divider = false,
		footnote,
		note,
		width = 'wide'
	}: Props = $props();
</script>

<section class="relative py-28 md:py-40 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-ecohubs-deep"></div>
	<div
		class="absolute inset-0 -z-10 opacity-40"
		style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.32), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.18), transparent 55%);"
	></div>

	<div
		class="{width === 'wide'
			? 'max-w-4xl'
			: 'max-w-3xl'} mx-auto px-6 lg:px-8 text-center text-ecohubs-ivory"
	>
		<div data-scroll-animate class="kicker text-emerald-300 mb-6">{kicker}</div>

		<h2
			data-scroll-animate
			class="font-serif text-4xl md:text-6xl {width === 'wide'
				? 'lg:text-7xl'
				: ''} leading-[1.05] mb-10"
		>
			{@render headline()}
		</h2>

		<p
			data-scroll-animate
			class={leadStyle === 'display'
				? 'font-serif text-xl md:text-2xl leading-snug text-stone-200/90 max-w-2xl mx-auto mb-14'
				: 'text-lg text-stone-200/85 leading-relaxed max-w-xl mx-auto mb-12'}
		>
			{@render lead()}
		</p>

		{#if divider}
			<div class="mx-auto w-16 h-px bg-emerald-500/40 mb-12"></div>
		{/if}

		<div data-scroll-animate class="flex flex-col sm:flex-row justify-center gap-3">
			{@render actions()}
		</div>

		{#if footnote}
			<p class="mt-12 text-xs text-emerald-200/60 tracking-widest uppercase">{footnote}</p>
		{/if}

		{#if note}
			<p class="mt-4 text-sm text-emerald-100/60 max-w-md mx-auto font-story italic">
				{@render note()}
			</p>
		{/if}
	</div>
</section>
