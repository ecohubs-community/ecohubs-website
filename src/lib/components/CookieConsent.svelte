<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	/**
	 * The banner is rendered on the server, not gated behind `onMount`.
	 *
	 * It used to appear only after hydration, which on a throttled mobile
	 * connection meant ~10s — and because it is a wide block of text pinned to
	 * the viewport, it became the page's Largest Contentful Paint element.
	 * Shipping it in the initial HTML moves LCP back to the hero content.
	 *
	 * For visitors who have already chosen, the inline script in app.html adds
	 * `cookie-consent-known` to <html> and CSS hides the banner before first
	 * paint, so there is no flash. This runs after hydration purely to drop the
	 * markup from the DOM.
	 */
	let dismissed = $state(false);

	function storedConsent(): string | null {
		try {
			return localStorage.getItem('cookie_consent');
		} catch {
			// Storage blocked — treat as undecided and show the banner.
			return null;
		}
	}

	onMount(() => {
		if (storedConsent() !== null) dismissed = true;
	});

	function choose(accepted: boolean) {
		if (!browser) return;
		try {
			localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
		} catch {
			// Nothing to persist; the choice still applies for this page view.
		}
		document.documentElement.classList.add('cookie-consent-known');
		dismissed = true;

		// Tell the Analytics component to update Google Consent Mode.
		window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: { accepted } }));
	}
</script>

{#if !dismissed}
	<div
		data-cookie-banner
		class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg"
		role="dialog"
		aria-label="Cookie consent"
	>
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
			<div class="flex-1 text-sm text-gray-600">
				<p>
					We use cookies to analyze site traffic and improve your experience. By clicking "Accept",
					you consent to our use of cookies. Read our
					<!-- ecohubs-dark, not ecohubs-primary: the brand green measures 3.8:1 on
					     white, under the 4.5:1 minimum for body text. -->
					<a href="/privacy" class="text-ecohubs-dark underline">Privacy Policy</a>
					for more information.
				</p>
			</div>
			<div class="flex gap-3 flex-shrink-0">
				<button
					onclick={() => choose(false)}
					class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Decline
				</button>
				<button
					onclick={() => choose(true)}
					class="px-4 py-2 text-sm font-medium text-white bg-ecohubs-dark hover:bg-ecohubs-deep rounded-lg transition-colors"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}
