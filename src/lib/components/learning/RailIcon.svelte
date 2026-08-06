<script lang="ts">
	/**
	 * The line icons beside each rail section.
	 *
	 * Tabler via Iconify, like the rest of the site. `currentColor` is what lets
	 * the active state tint the icon along with its label.
	 */
	import Icon from '@iconify/svelte';

	let { section }: { section: string } = $props();

	// Chosen to match the design's shapes: two panes, a lined document, four
	// tiles, joined nodes, a closed book, a compass.
	const ICONS: Record<string, string> = {
		hub: 'tabler:layout-columns',
		guides: 'tabler:file-text',
		topics: 'tabler:layout-grid',
		paths: 'tabler:route',
		glossary: 'tabler:book-2',
		map: 'tabler:compass',
		bookmarks: 'tabler:bookmark'
	};
</script>

{#if ICONS[section]}
	<Icon
		icon={ICONS[section]}
		width="15"
		height="15"
		class="shrink-0 opacity-75"
		aria-hidden="true"
	/>
{/if}
