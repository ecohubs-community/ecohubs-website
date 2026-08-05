<script lang="ts">
	/**
	 * An image inside article prose.
	 *
	 * `width` and `height` are required, not optional: without them the browser
	 * cannot reserve space and the page shifts as images arrive. CLS is at 0
	 * across this site and an unsized image in a lesson is the easiest way to
	 * lose that.
	 *
	 * `priority` opts out of lazy loading for an image above the fold — the one
	 * case where lazy loading delays the largest contentful paint instead of
	 * helping it.
	 */
	interface Props {
		src: string;
		alt: string;
		width: number;
		height: number;
		caption?: string;
		/** Set for an image above the fold; everything else stays lazy. */
		priority?: boolean;
	}

	let { src, alt, width, height, caption, priority = false }: Props = $props();
</script>

<figure class="my-10">
	<img
		{src}
		{alt}
		{width}
		{height}
		loading={priority ? 'eager' : 'lazy'}
		decoding={priority ? 'sync' : 'async'}
		fetchpriority={priority ? 'high' : 'auto'}
		class="h-auto w-full rounded-2xl border border-stone-200"
	/>
	{#if caption}
		<figcaption class="mt-3 text-sm leading-relaxed text-stone-500">
			{caption}
		</figcaption>
	{/if}
</figure>
