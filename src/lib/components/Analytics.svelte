<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// GA4 Measurement ID from environment variable
	const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

	let analyticsLoaded = $state(false);

	// Check if user has given consent
	function hasConsent(): boolean {
		if (!browser) return false;
		return localStorage.getItem('cookie_consent') === 'accepted';
	}

	// Load GA4 script
	function loadGA() {
		if (!GA_MEASUREMENT_ID || !browser || analyticsLoaded) return;

		// Create gtag script
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		script.async = true;
		document.head.appendChild(script);

		// Initialize gtag
		window.dataLayer = window.dataLayer || [];
		function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		}
		gtag('js', new Date());
		gtag('config', GA_MEASUREMENT_ID, {
			anonymize_ip: true,
			cookie_flags: 'SameSite=Strict;Secure'
		});

		analyticsLoaded = true;
	}

	onMount(() => {
		// Only load if consent has been given
		if (hasConsent()) {
			loadGA();
		}

		// Listen for consent changes
		const handleConsentChange = (event: CustomEvent) => {
			if (event.detail.accepted) {
				loadGA();
			}
		};

		window.addEventListener('cookie-consent-change', handleConsentChange as EventListener);

		return () => {
			window.removeEventListener('cookie-consent-change', handleConsentChange as EventListener);
		};
	});
</script>

<!-- No visible UI - analytics loads in background -->
