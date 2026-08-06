<script lang="ts">
	/** A glossary term: the definition is the card, so there is no cover. */
	import { CARD, TAG } from './card';

	export interface TermCardData {
		slug: string;
		term: string;
		short: string;
		topicTitle: string;
	}

	let { term }: { term: TermCardData } = $props();
</script>

<a href="/learn/glossary/{term.slug}" class="{CARD} flex flex-col p-5">
	<div class="font-serif text-[17.5px] leading-snug text-ecohubs-deep">{term.term}</div>
	<p class="mt-2 flex-1 text-[13.5px] leading-relaxed text-stone-600">{term.short}</p>
	<div class="mt-4 flex items-center justify-between gap-3">
		<span class={TAG}>{term.topicTitle}</span>
		<span aria-hidden="true" class="text-[13px] text-ecohubs-dark">→</span>
	</div>
</a>
