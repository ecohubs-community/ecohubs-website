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
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			class="size-3.5 shrink-0"
			fill="none"
			stroke="currentColor"
			stroke-width="1.7"
		>
			<circle cx="17" cy="6" r="2.5" />
			<circle cx="7" cy="12" r="2.5" />
			<circle cx="17" cy="18" r="2.5" />
			<path d="M9.2 10.8l5.6-3.6M9.2 13.2l5.6 3.6" />
		</svg>
		<span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
	</button>
{/if}
