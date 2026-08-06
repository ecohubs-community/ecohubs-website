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

	let {
		slug,
		image,
		imageAlt,
		motif,
		label,
		class: className = ''
	}: {
		slug: string;
		image?: string;
		imageAlt?: string;
		motif?: Motif;
		/** Small mono caption sitting on the motif, e.g. "guide · foundational". */
		label?: string;
		class?: string;
	} = $props();
</script>

{#if image}
	<!-- A real cover is content, so it carries its alt text. `imageAlt` is
	     required alongside `image` by the validator. -->
	<img src={image} alt={imageAlt ?? ''} class="object-cover {className}" loading="lazy" />
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
