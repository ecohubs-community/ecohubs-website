<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { setDefinitions } from '$lib/learning/context';
	import { getBookmarks } from '$lib/learning/storage';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	// Available to every <Gloss> in the section without any of them importing
	// the content index.
	setDefinitions(data.definitions);

	/**
	 * The "Saved" entry appears only once there is something in it.
	 *
	 * A permanent nav item would be dead weight for the great majority who never
	 * save anything, and its appearance is the discovery moment — which is why
	 * the first save also shows a one-time hint pointing here.
	 */
	let savedCount = $state(0);

	onMount(() => {
		const update = () => (savedCount = getBookmarks().length);
		update();
		// Another tab may add one; and returning to this layout re-runs onMount.
		window.addEventListener('storage', update);
		return () => window.removeEventListener('storage', update);
	});
</script>

{#if savedCount > 0 && page.url.pathname !== '/learn/saved'}
	<div class="fixed top-24 right-6 z-30 hidden lg:block">
		<a
			href="/learn/saved"
			class="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-sm text-stone-600 shadow-sm backdrop-blur transition-colors hover:border-ecohubs-dark hover:text-ecohubs-deep"
		>
			<span aria-hidden="true">★</span>
			Saved
			<span class="rounded-full bg-emerald-50 px-1.5 text-xs text-ecohubs-deep">{savedCount}</span>
		</a>
	</div>
{/if}

{@render children()}
