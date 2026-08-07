<script lang="ts">
	/**
	 * A compact titled list — "Recently updated" and its neighbours.
	 *
	 * Two shapes, as in the design: a plain list, or a ranked one with mono
	 * numbers down the left.
	 */
	import { CARD, META } from './card';
	import type { DiscoveryItem } from '$lib/learning/discovery';

	let {
		title,
		items,
		ranked = false,
		footnote
	}: {
		title: string;
		items: DiscoveryItem[];
		/** Number the entries 01, 02, … */
		ranked?: boolean;
		/** Small print under the list, e.g. how the ranking was arrived at. */
		footnote?: string;
	} = $props();
</script>

{#if items.length}
	<!-- Not a link itself, so it keeps the card's border but none of its hover. -->
	<div class="{CARD} flex flex-col bg-white p-7 hover:border-stone-200/90 hover:shadow-none">
		<div class="kicker mb-5 text-emerald-700">{title}</div>

		<div class="flex flex-1 flex-col divide-y divide-stone-100">
			{#each items as item, i (item.url)}
				<a href={item.url} class="group flex gap-4 py-3.5 first:pt-0 last:pb-0">
					{#if ranked}
						<span class="pt-0.5 font-mono text-[11px] text-stone-400">
							{String(i + 1).padStart(2, '0')}
						</span>
					{/if}
					<span class="min-w-0">
						<span
							class="block text-[15px] leading-snug text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
						>
							{item.title}
						</span>
						<span class="{META} mt-1.5 block">{item.note ?? item.kind}</span>
					</span>
				</a>
			{/each}
		</div>

		{#if footnote}
			<p class="mt-5 border-t border-stone-100 pt-4 text-[12px] text-stone-400">{footnote}</p>
		{/if}
	</div>
{/if}
