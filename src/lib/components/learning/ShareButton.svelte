<script lang="ts">
	/**
	 * Copy the page's link.
	 *
	 * Uses the native share sheet where there is one (phones, mostly) and falls
	 * back to the clipboard, which is what a desktop reader expects anyway.
	 *
	 * Rendered only after hydration: with no JavaScript it could do nothing, and
	 * a button that silently fails is worse than no button. The URL is read at
	 * click time rather than bound, so client-side navigation cannot leave it
	 * pointing at the previous page.
	 */
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { PILL, PILL_OFF } from './pill';

	let { title }: { title: string } = $props();

	let ready = $state(false);
	let copied = $state(false);

	onMount(() => (ready = true));

	async function share() {
		const url = location.href;

		if (navigator.share) {
			try {
				await navigator.share({ title, url });
				return;
			} catch {
				// Dismissing the sheet lands here; fall through to the clipboard
				// rather than reporting a failure the reader caused deliberately.
			}
		}

		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			// Clipboard blocked (insecure context, denied permission). Say nothing
			// rather than claim a copy that did not happen.
		}
	}
</script>

{#if ready}
	<button type="button" onclick={share} class="{PILL} {PILL_OFF}">
		<Icon icon="tabler:share" width="14" height="14" class="shrink-0" aria-hidden="true" />
		<span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
	</button>
{/if}
