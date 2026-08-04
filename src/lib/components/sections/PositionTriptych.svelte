<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Three interlocking cards that place the current page inside the wider
	 * project — the middle one is dark and flagged "you are here".
	 * Used on `/rcos` and `/csi`.
	 */
	interface TriptychCard {
		/** e.g. "01 · Vision" */
		kicker: string;
		title: string;
		body: string;
		cta: string;
		href: string;
		external?: boolean;
		/** Renders this card dark and adds the "you are here" flag. */
		here?: boolean;
	}

	interface Props {
		kicker: string;
		/** Headline — a snippet so each page keeps its own `<em>` emphasis and line breaks. */
		headline: Snippet;
		lead: string;
		/** Exactly three cards; the middle one should carry `here: true`. */
		cards: TriptychCard[];
		footnote?: string;
	}

	let { kicker, headline, lead, cards, footnote }: Props = $props();
</script>

<section class="py-24 md:py-36 bg-ecohubs-base relative">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">{kicker}</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				{@render headline()}
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">{lead}</p>
		</div>

		<div data-scroll-stagger class="grid lg:grid-cols-3 gap-6 lg:gap-0 relative">
			{#each cards as card, i (card.kicker)}
				{@const first = i === 0}
				{@const last = i === cards.length - 1}
				<article
					class="relative rounded-3xl p-8 {card.here
						? 'bg-ecohubs-deep text-ecohubs-ivory border border-emerald-900/40 lg:rounded-none -mt-2 lg:-mt-6 lg:mb-2 shadow-[0_30px_60px_-30px_rgba(11,46,36,0.5)]'
						: 'bg-ecohubs-ivory border border-stone-200/70'} {!card.here && first
						? 'lg:rounded-r-none lg:border-r-0'
						: ''} {!card.here && last ? 'lg:rounded-l-none lg:border-l-0' : ''}"
				>
					<div class="kicker mb-3 {card.here ? 'text-emerald-300/80' : 'text-emerald-700'}">
						{card.kicker}{#if card.here}<span class="text-amber-300/80"> · you are here</span>{/if}
					</div>
					<h3 class="font-serif text-2xl mb-3 {card.here ? 'text-white' : 'text-ecohubs-deep'}">
						{card.title}
					</h3>
					<p
						class="text-[15px] leading-relaxed {card.here ? 'text-stone-200/85' : 'text-stone-700'}"
					>
						{card.body}
					</p>
					<a
						href={card.href}
						target={card.external ? '_blank' : undefined}
						rel={card.external ? 'noopener noreferrer' : undefined}
						class="no-external-decoration mt-5 inline-flex items-center gap-1.5 text-sm font-medium hover:underline {card.here
							? 'text-emerald-300'
							: 'text-ecohubs-dark'}"
					>
						{card.cta}
					</a>
				</article>
			{/each}
		</div>

		{#if footnote}
			<p class="mt-12 text-center text-sm text-stone-500 font-story italic max-w-xl mx-auto">
				{footnote}
			</p>
		{/if}
	</div>
</section>
