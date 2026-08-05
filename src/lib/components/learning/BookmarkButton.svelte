<script lang="ts">
	/**
	 * Save a page for later.
	 *
	 * Nothing is sent anywhere — the list lives in this browser, which the UI
	 * says plainly, because it also explains why saved items do not follow you
	 * to another device.
	 *
	 * On the first ever save it shows a one-time hint pointing at where saved
	 * items live. A nav item that simply appears is easy to miss, and that
	 * moment is the only good chance to teach the feature.
	 */
	import { onMount } from 'svelte';
	import { isBookmarked, isFirstBookmark, toggleBookmark } from '$lib/learning/storage';

	let { id, type, title }: { id: string; type: string; title: string } = $props();

	let saved = $state(false);
	let showHint = $state(false);
	/** Rendered only after hydration: without JavaScript it would do nothing. */
	let ready = $state(false);

	onMount(() => {
		ready = true;
		saved = isBookmarked(id);
	});

	function toggle() {
		const wasFirst = isFirstBookmark();
		saved = toggleBookmark(id, type);
		if (saved && wasFirst) {
			showHint = true;
			setTimeout(() => (showHint = false), 8000);
		}
	}
</script>

{#if ready}
	<span class="relative inline-flex">
		<button
			type="button"
			onclick={toggle}
			aria-pressed={saved}
			class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors
			       {saved
				? 'border-ecohubs-dark bg-emerald-50 text-ecohubs-deep'
				: 'border-stone-300 text-stone-600 hover:border-ecohubs-dark hover:text-ecohubs-deep'}"
		>
			<span aria-hidden="true">{saved ? '★' : '☆'}</span>
			{saved ? 'Saved' : 'Save'}
			<span class="sr-only">{title}</span>
		</button>

		{#if showHint}
			<span
				role="status"
				class="absolute top-full right-0 z-30 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-3 text-sm leading-relaxed text-stone-700 shadow-lg"
			>
				Saved in this browser. Find it under
				<a href="/learn/saved" class="text-ecohubs-dark underline underline-offset-2">Saved</a>.
			</span>
		{/if}
	</span>
{/if}
