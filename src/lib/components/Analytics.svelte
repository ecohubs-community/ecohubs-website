<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	/**
	 * GA4 Measurement ID from environment variable
	 * In Vercel, make sure VITE_GA_MEASUREMENT_ID is set.
	 * Using import.meta.env.VITE_... ensures it's available in the client.
	 */
	const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

	// Initialize dataLayer and gtag function immediately if in browser
	if (browser && GA_MEASUREMENT_ID) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			// eslint-disable-next-line prefer-rest-params
			window.dataLayer.push(arguments);
		};

		// 1. Set default consent to 'denied' (Google Consent Mode v2)
		// This allows the tag to be "found" by tools but prevents tracking until allowed.
		window.gtag('consent', 'default', {
			ad_storage: 'denied',
			analytics_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied',
			wait_for_update: 500
		});

		// 2. Standard initialization
		window.gtag('js', new Date());
		window.gtag('config', GA_MEASUREMENT_ID, {
			anonymize_ip: true
		});
	}

	/**
	 * Updates Google Consent Mode based on user choice
	 */
	function updateConsent(accepted: boolean) {
		if (!browser || !window.gtag || !GA_MEASUREMENT_ID) return;

		const status = accepted ? 'granted' : 'denied';

		window.gtag('consent', 'update', {
			ad_storage: status,
			analytics_storage: status,
			ad_user_data: status,
			ad_personalization: status
		});
	}

	// Track page views on route change
	$effect(() => {
		const url = page.url.pathname;
		if (browser && window.gtag && GA_MEASUREMENT_ID) {
			window.gtag('config', GA_MEASUREMENT_ID, {
				page_path: url
			});
		}
	});

	onMount(() => {
		if (!GA_MEASUREMENT_ID) {
			console.warn('Google Analytics ID (VITE_GA_MEASUREMENT_ID) is missing in environment variables.');
			return;
		}

		// Check initial consent from localStorage
		const consent = localStorage.getItem('cookie_consent');
		if (consent === 'accepted') {
			updateConsent(true);
		}

		// Listen for consent changes from CookieConsent component
		const handleConsentChange = (event: CustomEvent) => {
			updateConsent(event.detail.accepted);
		};

		window.addEventListener('cookie-consent-change', handleConsentChange as EventListener);

		return () => {
			window.removeEventListener('cookie-consent-change', handleConsentChange as EventListener);
		};
	});
</script>

<svelte:head>
	{#if GA_MEASUREMENT_ID}
		<!-- 
			Always load the GA script so Google's verification tools (Tag Assistant) 
			can find it reliably. Consent Mode (above) handles the privacy.
		-->
		<script async src="https://www.googletagmanager.com/gtag/js?id={GA_MEASUREMENT_ID}"></script>
	{/if}
</svelte:head>

<!-- No visible UI -->
