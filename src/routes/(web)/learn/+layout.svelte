<script lang="ts">
	import { setDefinitions } from '$lib/learning/context';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Available to every <Gloss> in the section without any of them importing
	// the content index.
	setDefinitions(data.definitions);
</script>

{@render children()}
