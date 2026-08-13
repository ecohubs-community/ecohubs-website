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

<!--
	Both image branches put `className` on a wrapper rather than on the image.

	`<enhanced:img>` compiles to `<picture><source…><img…></picture>`, so a class
	written on it lands on the inner `<img>` while the *flex child* is the
	unstyled `<picture>`. In the compact card that meant `w-32 shrink-0` applied
	to something that was not the flex item: the picture shrank to 39px and the
	cover rendered as a thumbnail wedged in the corner.

	The wrapper also gives the image something definite to fill. Its height comes
	from flex stretch, which `height: 100%` cannot reliably resolve against, so
	the image is positioned rather than sized — and `relative`/`overflow-hidden`
	match what `.motif` already sets, keeping all three branches the same shape.
-->
{#if picture}
	<!-- A real cover is content, so it carries its alt text. `imageAlt` is
	     required alongside `image` by the validator. -->
	<div class="relative overflow-hidden {className}">
		<enhanced:img
			src={picture}
			alt={imageAlt ?? ''}
			{sizes}
			class="absolute inset-0 h-full w-full object-cover"
			loading="lazy"
		/>
	</div>
{:else if src}
	<div class="relative overflow-hidden {className}">
		<img
			{src}
			alt={imageAlt ?? ''}
			class="absolute inset-0 h-full w-full object-cover"
			loading="lazy"
		/>
	</div>
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
