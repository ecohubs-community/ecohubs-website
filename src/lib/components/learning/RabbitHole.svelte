<script lang="ts">
	/**
	 * "A rabbit hole for you" — one thing from anywhere in the hub, and a link
	 * to roll another.
	 *
	 * The server renders a real pick rather than a placeholder, so the card has
	 * content for a crawler and for anyone without JavaScript; the reroll button
	 * only appears once it can actually do something. Same rule as everywhere
	 * else here: JavaScript may change what is shown, never reveal it.
	 *
	 * The seed is passed in rather than drawn here, because a random pick during
	 * render would differ between the server and the client and trip hydration.
	 */
	import { onMount } from 'svelte';
	import { CARD, META, TAG, TAG_OFF } from './card';
	import type { DiscoveryItem } from '$lib/learning/discovery';

	let { pool, seed = 0 }: { pool: DiscoveryItem[]; seed?: number } = $props();

	let index = $state(seed % Math.max(pool.length, 1));
	let canReroll = $state(false);

	const item = $derived(pool[index]);

	onMount(() => (canReroll = pool.length > 1));

	function another() {
		// Never show the same one twice in a row — a reroll that changes nothing
		// reads as broken.
		let next = index;
		while (next === index) next = Math.floor(Math.random() * pool.length);
		index = next;
	}
</script>

{#if item}
	<div
		class="{CARD} flex flex-col bg-ecohubs-ivory p-7 hover:border-stone-200/90 hover:shadow-none"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="kicker text-emerald-700">A rabbit hole for you</span>
			{#if canReroll}
				<button
					type="button"
					onclick={another}
					class="{META} transition-colors hover:text-ecohubs-dark"
				>
					↻ another
				</button>
			{/if}
		</div>

		<span class="{TAG} {TAG_OFF} mt-4 self-start bg-white">{item.kind}</span>
		<h3 class="mt-4 font-serif text-[21px] leading-snug text-ecohubs-deep">{item.title}</h3>
		<p class="mt-3 flex-1 text-[14.5px] leading-relaxed text-stone-600">{item.summary}</p>
		<a href={item.url} class="mt-5 text-sm text-ecohubs-dark hover:text-ecohubs-deep">
			Follow it →
		</a>
	</div>
{/if}
