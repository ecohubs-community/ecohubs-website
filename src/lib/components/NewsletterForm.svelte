<script lang="ts">
	import { Check, Loader2, Mail } from 'lucide-svelte';
	
	let email = $state('');
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!email || !email.includes('@')) {
			errorMessage = 'Please enter a valid email address';
			submitStatus = 'error';
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to subscribe');
			}

			submitStatus = 'success';
			email = '';
		} catch (error) {
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex gap-2" aria-label="Newsletter subscription">
	<div class="relative flex-1">
		<input
			type="email"
			bind:value={email}
			placeholder="Email address"
			disabled={isSubmitting || submitStatus === 'success'}
			class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-ecohubs-primary focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
			aria-label="Email address"
			required
		/>
	</div>
	<button
		type="submit"
		disabled={isSubmitting || submitStatus === 'success'}
		class="bg-ecohubs-primary text-white p-2 rounded-lg hover:bg-ecohubs-dark transition-colors focus-visible:ring-2 focus-visible:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
		aria-label={submitStatus === 'success' ? 'Subscribed successfully' : 'Subscribe to newsletter'}
	>
		{#if isSubmitting}
			<Loader2 class="w-4 h-4 animate-spin" aria-hidden="true" />
		{:else if submitStatus === 'success'}
			<Check class="w-4 h-4" aria-hidden="true" />
		{:else}
			<Mail class="w-4 h-4" aria-hidden="true" />
		{/if}
	</button>
</form>

{#if submitStatus === 'success'}
	<p class="text-xs text-green-600 mt-2" role="status">
		Thanks! Please check your email to confirm your subscription.
	</p>
{/if}

{#if submitStatus === 'error' && errorMessage}
	<p class="text-xs text-red-600 mt-2" role="alert">
		{errorMessage}
	</p>
{/if}


