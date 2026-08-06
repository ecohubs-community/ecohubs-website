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
	import { PILL, PILL_OFF, PILL_ON } from './pill';

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
			class="{PILL} {saved ? PILL_ON : PILL_OFF}"
		>
			<svg
				viewBox="0 0 24 24"
				aria-hidden="true"
				class="size-3.5 shrink-0"
				fill={saved ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width="1.7"
				stroke-linejoin="round"
			>
				<path d="M7 4h10v16l-5-4-5 4z" />
			</svg>
			{saved ? 'Saved' : 'Bookmark'}
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
