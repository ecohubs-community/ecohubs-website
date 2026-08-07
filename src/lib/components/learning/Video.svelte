<script lang="ts">
	/**
	 * A YouTube embed inside article prose.
	 *
	 * Wraps the site's existing `LiteYouTube`, which ships only the poster image
	 * until the reader clicks, uses youtube-nocookie, and — since the schema
	 * work — emits `VideoObject` JSON-LD automatically for any video listed in
	 * `src/lib/config/videos.ts`. So a video dropped into a lesson gets video
	 * schema for free.
	 *
	 * This adds only what prose needs: article spacing and an optional caption.
	 * Videos not in the metadata file still embed; they simply emit no schema,
	 * which is the right default rather than inventing an upload date.
	 */
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';

	interface Props {
		videoId: string;
		/** Accessible title for the embed. Also the play button's label. */
		title: string;
		caption?: string;
		/** Suppress VideoObject when the same video appears twice on one page. */
		schema?: boolean;
	}

	let { videoId, title, caption, schema = true }: Props = $props();
</script>

<!--
	`not-prose` matters here. Tailwind's typography plugin gives images inside
	prose `margin: 2em 0`, and the facade's poster is `position: absolute;
	inset-0` — so that margin pushed it 32px down inside its own frame and left
	the dark container background showing along the top edge. Opting out of prose
	styling is correct anyway: everything in this figure is styled explicitly.
-->
<figure class="not-prose my-10">
	<LiteYouTube {videoId} {title} {schema} />
	{#if caption}
		<figcaption class="mt-3 text-sm leading-relaxed text-stone-500">
			{caption}
		</figcaption>
	{/if}
</figure>
