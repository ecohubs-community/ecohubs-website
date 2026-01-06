<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="Page Not Found - EcoHubs.community"
	description="The page you're looking for doesn't exist or has been moved."
	noindex={true}
/>

<div class="min-h-[60vh] flex items-center justify-center px-4">
	<div class="text-center max-w-lg">
		<h1 class="font-serif text-7xl md:text-8xl font-bold text-ecohubs-dark mb-4">
			{$page.status}
		</h1>

		<h2 class="font-serif text-2xl md:text-3xl font-semibold text-ecohubs-dark mb-4">
			{#if $page.status === 404}
				Page Not Found
			{:else if $page.status === 500}
				Server Error
			{:else}
				Something Went Wrong
			{/if}
		</h2>

		<p class="text-lg text-gray-600 mb-8">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else if $page.status === 500}
				We're experiencing some technical difficulties. Please try again later.
			{:else}
				{$page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>

		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center px-6 py-3 bg-ecohubs-primary text-white font-semibold rounded-xl hover:bg-ecohubs-dark transition-colors duration-200"
			>
				Return Home
			</a>
			<a
				href="/contact"
				class="inline-flex items-center justify-center px-6 py-3 border-2 border-ecohubs-primary text-ecohubs-primary font-semibold rounded-xl hover:bg-ecohubs-primary hover:text-white transition-colors duration-200"
			>
				Contact Us
			</a>
		</div>
	</div>
</div>
