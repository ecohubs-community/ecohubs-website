<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let showBanner = $state(false);

	onMount(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem('cookie_consent');
		if (consent === null) {
			// No choice made yet, show banner
			showBanner = true;
		}
	});

	function acceptCookies() {
		if (!browser) return;
		localStorage.setItem('cookie_consent', 'accepted');
		showBanner = false;

		// Dispatch custom event for Analytics component
		window.dispatchEvent(
			new CustomEvent('cookie-consent-change', {
				detail: { accepted: true }
			})
		);
	}

	function declineCookies() {
		if (!browser) return;
		localStorage.setItem('cookie_consent', 'declined');
		showBanner = false;

		// Dispatch custom event
		window.dispatchEvent(
			new CustomEvent('cookie-consent-change', {
				detail: { accepted: false }
			})
		);
	}
</script>

{#if showBanner}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg"
		role="dialog"
		aria-label="Cookie consent"
	>
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
			<div class="flex-1 text-sm text-gray-600">
				<p>
					We use cookies to analyze site traffic and improve your experience. By clicking "Accept",
					you consent to our use of cookies. Read our
					<a href="/privacy" class="text-ecohubs-primary hover:underline">Privacy Policy</a>
					for more information.
				</p>
			</div>
			<div class="flex gap-3 flex-shrink-0">
				<button
					onclick={declineCookies}
					class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Decline
				</button>
				<button
					onclick={acceptCookies}
					class="px-4 py-2 text-sm font-medium text-white bg-ecohubs-primary hover:bg-ecohubs-dark rounded-lg transition-colors"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}
