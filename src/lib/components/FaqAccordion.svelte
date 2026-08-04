<script lang="ts">
	/**
	 * The site's standard FAQ list — a stack of `<details>` rows with a rotating
	 * "+" affordance. Used on `/`, `/rcos`, `/csi` and `/membership`.
	 *
	 * `/faq` deliberately does NOT use this: its rows carry copy-link buttons,
	 * section tags and deep-link ids, so it keeps its own snippet.
	 */
	interface FaqItem {
		q: string;
		/** Answer markup. Entries come from per-page `data.ts` files, so this is trusted content. */
		a: string;
	}

	interface Props {
		items: FaqItem[];
		class?: string;
		/** Scroll-reveal hooks (`data-scroll-animate` / `data-scroll-stagger`) pass through here. */
		[key: string]: unknown;
	}

	let { items, class: className = '', ...rest }: Props = $props();
</script>

<div {...rest} class="divide-y divide-stone-200 border-t border-b border-stone-200 {className}">
	{#each items as item (item.q)}
		<details class="group py-6">
			<summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
				<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
				<span
					class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none"
					>+</span
				>
			</summary>
			<div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">{@html item.a}</div>
		</details>
	{/each}
</div>
