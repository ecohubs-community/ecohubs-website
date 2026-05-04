<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import ApplicationForm from '$lib/components/ApplicationForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Join Us - EcoHubs.community"
	description="Apply to join EcoHubs.community and be part of the first 150 founding members."
	ogImage="/og-join.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Join', url: 'https://ecohubs.community/join' }
	]}
/>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-5xl">
		<div class="text-center mb-12">
			<h1 class="font-serif text-4xl font-bold text-ecohubs-dark sm:text-5xl mb-4">
				Join the First 150
			</h1>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
				We're building a selective, committed community of founders who share our vision for regenerative intentional communities.
			</p>
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm text-emerald-800">
				<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
				<!-- <span><strong>120+ applications</strong> received so far</span> -->
				<span>Build the future with us!</span>
			</div>
		</div>

		<div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
			<div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
				<svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				No wallet needed to apply
			</div>
			<div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
				<svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				No credit card ever required
			</div>
		</div>

		<div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
			<ApplicationForm {data} />
		</div>

		<div class="mt-12 text-center space-y-2">
			<p class="text-sm text-gray-500">
				<strong>Note:</strong> Completing this application does not guarantee membership. We're carefully selecting founding members who align with our values and can actively contribute to co-creating the blueprint.
			</p>
		</div>
	</div>
</Section>

