<script lang="ts">
	/** A compact titled list — "Recently updated" and its neighbours. */
	import { CARD, META, TAG } from './card';
	import type { DiscoveryItem } from '$lib/learning/discovery';

	let { title, items, note }: { title: string; items: DiscoveryItem[]; note?: string } = $props();
</script>

{#if items.length}
	<div class="{CARD} flex flex-col p-7 hover:border-stone-200/90 hover:shadow-none">
		<div class="kicker mb-5 text-emerald-700">{title}</div>
		<ul class="flex flex-1 flex-col gap-4">
			{#each items as item (item.url)}
				<li>
					<a href={item.url} class="group block">
						<span
							class="block font-serif text-[16px] leading-snug text-ecohubs-deep transition-colors group-hover:text-ecohubs-primary"
						>
							{item.title}
						</span>
						<span class="mt-1.5 flex items-center gap-2">
							<span class="{TAG} bg-white">{item.kind}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
		{#if note}
			<p class="{META} mt-5 border-t border-stone-100 pt-4 normal-case">{note}</p>
		{/if}
	</div>
{/if}
