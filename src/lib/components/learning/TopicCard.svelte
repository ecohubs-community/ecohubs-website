<script lang="ts">
	/** A topic: a short cover band across the top, then title, blurb and count. */
	import Cover from './Cover.svelte';
	import { CARD, META } from './card';
	import type { Motif } from '$lib/learning/types';

	export interface TopicCardData {
		slug: string;
		title: string;
		summary: string;
		/** How much has been written under this topic. */
		articles: number;
		image?: string;
		imageAlt?: string;
		motif?: Motif;
	}

	let { topic }: { topic: TopicCardData } = $props();
</script>

<a href="/learn/topics/{topic.slug}" class="{CARD} flex flex-col p-6">
	<Cover
		slug={topic.slug}
		image={topic.image}
		imageAlt={topic.imageAlt}
		motif={topic.motif}
		class="mb-5 h-16 w-full rounded-xl"
	/>
	<h3 class="font-serif text-[19px] leading-snug text-ecohubs-deep">{topic.title}</h3>
	<p class="mt-2 flex-1 text-[14px] leading-relaxed text-stone-600">{topic.summary}</p>
	<div class="{META} mt-5">
		{topic.articles}
		{topic.articles === 1 ? 'article' : 'articles'}
	</div>
</a>
