<script lang="ts">
	/**
	 * A card's cover: the page's own image when it has one, otherwise the
	 * generated motif.
	 *
	 * Every card shape sizes its own cover, so the caller passes the height and
	 * shape classes rather than this component guessing them.
	 */
	import { motifFor } from '$lib/learning/motif';
	import type { Motif } from '$lib/learning/types';
	import type { Picture } from '$lib/learning/images';

	let {
		slug,
		image,
		imageAlt,
		motif,
		label,
		sizes = '100vw',
		class: className = ''
	}: {
		slug: string;
		image?: string | Picture;
		imageAlt?: string;
		motif?: Motif;
		/** Small mono caption sitting on the motif, e.g. "guide · foundational". */
		label?: string;
		/**
		 * How wide this cover actually renders, so the browser can pick a
		 * variant rather than the largest one. The caller already decides the
		 * size through `class`, so it is the only thing that knows.
		 *
		 * The default is deliberately pessimistic: without it a 128px thumbnail
		 * would download a full-width image, which is the whole failure mode
		 * enhanced-img exists to prevent.
		 */
		sizes?: string;
		class?: string;
	} = $props();

	// A bundled cover arrives as a picture from `images.ts`; a `static/` or
	// external one is still a plain URL. Only the first can be served responsively.
	const picture = $derived(typeof image === 'object' ? image : undefined);
	const src = $derived(typeof image === 'string' ? image : undefined);
</script>

{#if picture}
	<!-- A real cover is content, so it carries its alt text. `imageAlt` is
	     required alongside `image` by the validator. -->
	<enhanced:img
		src={picture}
		alt={imageAlt ?? ''}
		{sizes}
		class="object-cover {className}"
		loading="lazy"
	/>
{:else if src}
	<img {src} alt={imageAlt ?? ''} class="object-cover {className}" loading="lazy" />
{:else}
	<!-- Decorative: it carries no information the title does not already give. -->
	<div class="motif {className}" data-motif={motifFor(slug, motif)} aria-hidden="true">
		{#if label}
			<span
				class="absolute bottom-3 left-3.5 z-[2] font-mono text-[10px] tracking-[0.14em] text-[#4b5b51] uppercase"
			>
				{label}
			</span>
		{/if}
	</div>
{/if}
