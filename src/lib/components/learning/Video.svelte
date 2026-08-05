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

<figure class="my-10">
	<LiteYouTube {videoId} {title} {schema} />
	{#if caption}
		<figcaption class="mt-3 text-sm leading-relaxed text-stone-500">
			{caption}
		</figcaption>
	{/if}
</figure>
