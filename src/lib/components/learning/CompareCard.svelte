<script lang="ts">
	/**
	 * A comparison page.
	 *
	 * Leads with the two things being told apart rather than the page title,
	 * because that pair *is* what the reader is scanning for — and it is what
	 * they typed into a search box to get here.
	 */
	import { CARD, META, TAG, TAG_OFF } from './card';

	export interface CompareCardData {
		slug: string;
		title: string;
		summary: string;
		topicTitle: string;
		minutes: number;
	}

	let { compare }: { compare: CompareCardData } = $props();

	// "Cohousing vs ecovillage" → the two sides, so each can be given weight.
	const sides = $derived(compare.title.split(/\s+vs\.?\s+/i));
</script>

<a href="/learn/compare/{compare.slug}" class="{CARD} flex flex-col bg-white p-6">
	<h3 class="font-serif text-[19px] leading-snug text-ecohubs-deep">
		{#if sides.length === 2}
			{sides[0]}
			<span class="font-story text-stone-400 italic">vs</span>
			{sides[1]}
		{:else}
			{compare.title}
		{/if}
	</h3>

	<p class="mt-2 flex-1 text-[14px] leading-relaxed text-stone-600">{compare.summary}</p>

	<div class="mt-5 flex items-center justify-between gap-3">
		<span class="{TAG} {TAG_OFF}">{compare.topicTitle}</span>
		<span class={META}>{compare.minutes} min</span>
	</div>
</a>
