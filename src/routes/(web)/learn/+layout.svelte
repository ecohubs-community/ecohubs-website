<script lang="ts">
	import { setDefinitions } from '$lib/learning/context';
	import LearnTabs from '$lib/components/learning/LearnTabs.svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Available to every <Gloss> in the section without any of them importing
	// the content index.
	setDefinitions(data.definitions);
</script>

<!-- Mobile counterpart of the rail's section nav. Bookmarks lives inside that
     nav now, so nothing floats over the page. -->
<div class="pt-20"><LearnTabs /></div>

{@render children()}
