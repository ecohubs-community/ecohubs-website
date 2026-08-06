<script lang="ts">
	/**
	 * A guide, in the design's two shapes:
	 *
	 *   featured  cover on top, content below — the lead card in a grid
	 *   compact   cover on the left, content on the right — every other one
	 *
	 * Same data either way, so a section can promote its first guide without
	 * needing a different component.
	 */
	import Cover from './Cover.svelte';
	import { CARD, META } from './card';
	import type { Motif } from '$lib/learning/types';

	export interface GuideCardData {
		slug: string;
		title: string;
		summary: string;
		level: string;
		lessons: number;
		minutes: number;
		image?: string;
		imageAlt?: string;
		motif?: Motif;
	}

	let {
		guide,
		featured = false,
		class: className = ''
	}: { guide: GuideCardData; featured?: boolean; class?: string } = $props();
</script>

<a
	href="/learn/guides/{guide.slug}"
	class="{CARD} overflow-hidden {featured ? 'flex flex-col' : 'flex'} {className}"
>
	<Cover
		slug={guide.slug}
		image={guide.image}
		imageAlt={guide.imageAlt}
		motif={guide.motif}
		label={featured ? `guide · ${guide.level}` : undefined}
		class={featured ? 'h-56 w-full md:h-72' : 'w-32 shrink-0'}
	/>

	<div class={featured ? 'flex flex-1 flex-col p-7' : 'p-6'}>
		<h3
			class="font-serif leading-snug text-ecohubs-deep {featured ? 'text-[26px]' : 'text-[19px]'}"
		>
			{guide.title}
		</h3>
		<p
			class="leading-relaxed text-stone-600 {featured
				? 'mt-3 flex-1 text-[15.5px]'
				: 'mt-2 text-[14.5px]'}"
		>
			{guide.summary}
		</p>
		<div
			class="{META} flex flex-wrap {featured
				? 'mt-6 gap-x-5 gap-y-2 border-t border-stone-100 pt-5'
				: 'mt-4 gap-x-4 gap-y-1'}"
		>
			<span>{guide.lessons} {guide.lessons === 1 ? 'lesson' : 'lessons'}</span>
			<span>{guide.minutes} min</span>
			<span class="capitalize">{guide.level}</span>
		</div>
	</div>
</a>
