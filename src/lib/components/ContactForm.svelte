<script lang="ts">
	import { Loader2, Send, Check } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// Turnstile site key from environment (public)
	const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

	let name = $state('');
	let email = $state('');
	let message = $state('');
	// Honeypot field - should remain empty (hidden from users, visible to bots)
	let website = $state('');
	let turnstileToken = $state('');
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let turnstileWidgetId = $state<string | null>(null);
	let turnstileContainer: HTMLDivElement;

	// Load Turnstile script and render widget
	onMount(() => {
		if (!browser || !TURNSTILE_SITE_KEY) return;

		// Check if Turnstile script is already loaded
		if (window.turnstile) {
			renderTurnstile();
			return;
		}

		// Load Turnstile script
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
		script.async = true;
		script.defer = true;

		// Define callback for when Turnstile loads
		window.onTurnstileLoad = () => {
			renderTurnstile();
		};

		document.head.appendChild(script);

		return () => {
			// Cleanup widget on unmount
			if (turnstileWidgetId && window.turnstile) {
				window.turnstile.remove(turnstileWidgetId);
			}
		};
	});

	function renderTurnstile() {
		if (!turnstileContainer || !window.turnstile || !TURNSTILE_SITE_KEY) return;

		turnstileWidgetId = window.turnstile.render(turnstileContainer, {
			sitekey: TURNSTILE_SITE_KEY,
			callback: (token: string) => {
				turnstileToken = token;
			},
			'expired-callback': () => {
				turnstileToken = '';
			},
			'error-callback': () => {
				turnstileToken = '';
				errorMessage = 'Security verification failed. Please refresh and try again.';
			},
			theme: 'light'
		});
	}

	function resetTurnstile() {
		if (turnstileWidgetId && window.turnstile) {
			window.turnstile.reset(turnstileWidgetId);
			turnstileToken = '';
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Honeypot check (should be empty - bots fill this in)
		if (website) {
			// Silently fail for bots - they don't know they failed
			submitStatus = 'success';
			return;
		}

		// Basic validation
		if (!name || !email || !message) {
			errorMessage = 'Please fill in all fields';
			submitStatus = 'error';
			return;
		}

		if (!email.includes('@')) {
			errorMessage = 'Please enter a valid email address';
			submitStatus = 'error';
			return;
		}

		// Turnstile validation (only if configured)
		if (TURNSTILE_SITE_KEY && !turnstileToken) {
			errorMessage = 'Please complete the security verification';
			submitStatus = 'error';
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					message,
					website, // Honeypot field
					turnstileToken
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to send message');
			}

			submitStatus = 'success';
			name = '';
			email = '';
			message = '';
			turnstileToken = '';
		} catch (error) {
			submitStatus = 'error';
			errorMessage =
				error instanceof Error ? error.message : 'Something went wrong. Please try again.';
			// Reset Turnstile on error so user can retry
			resetTurnstile();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<div>
		<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
			Name <span class="text-red-500">*</span>
		</label>
		<input
			id="name"
			type="text"
			bind:value={name}
			disabled={isSubmitting || submitStatus === 'success'}
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			placeholder="Your name"
			required
		/>
	</div>

	<div>
		<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
			Email <span class="text-red-500">*</span>
		</label>
		<input
			id="email"
			type="email"
			bind:value={email}
			disabled={isSubmitting || submitStatus === 'success'}
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			placeholder="your.email@example.com"
			required
		/>
	</div>

	<!-- Honeypot field - hidden from users, visible to bots -->
	<div class="hidden" aria-hidden="true">
		<label for="website" class="block text-sm font-medium text-gray-700 mb-2"> Website </label>
		<input
			id="website"
			type="text"
			bind:value={website}
			tabindex="-1"
			autocomplete="off"
			class="w-full px-4 py-3 border border-gray-300 rounded-lg"
			placeholder="Leave this empty"
		/>
	</div>

	<div>
		<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
			Message <span class="text-red-500">*</span>
		</label>
		<textarea
			id="message"
			bind:value={message}
			disabled={isSubmitting || submitStatus === 'success'}
			rows="6"
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors resize-none"
			placeholder="Tell us what's on your mind..."
			required
		></textarea>
	</div>

	<!-- Turnstile Widget -->
	{#if TURNSTILE_SITE_KEY}
		<div class="flex justify-center">
			<div bind:this={turnstileContainer}></div>
		</div>
	{/if}

	{#if submitStatus === 'success'}
		<div
			class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
			role="status"
		>
			<Check class="w-5 h-5 text-green-600 mt-0.5" aria-hidden="true" />
			<div class="flex-1">
				<p class="font-medium text-green-900">Message sent successfully!</p>
				<p class="text-sm text-green-700 mt-1">We'll get back to you as soon as possible.</p>
			</div>
		</div>
	{/if}

	{#if submitStatus === 'error' && errorMessage}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
			<p class="text-sm text-red-800">{errorMessage}</p>
		</div>
	{/if}

	<button
		type="submit"
		disabled={isSubmitting || submitStatus === 'success'}
		class="w-full px-6 py-3 bg-ecohubs-primary text-white font-medium rounded-lg hover:bg-ecohubs-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
	>
		{#if isSubmitting}
			<Loader2 class="w-5 h-5 animate-spin" aria-hidden="true" />
			<span>Sending...</span>
		{:else if submitStatus === 'success'}
			<Check class="w-5 h-5" aria-hidden="true" />
			<span>Sent!</span>
		{:else}
			<Send class="w-5 h-5" aria-hidden="true" />
			<span>Send Message</span>
		{/if}
	</button>
</form>
