<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<SEO
	title="Vision - EcoHubs.community"
	description="Our vision for building sustainable, regenerative intentional communities powered by blockchain technology."
/>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-5xl">
		<h1 class="font-serif text-4xl font-bold text-text-primary sm:text-5xl">Our Vision</h1>
		<div class="mt-8">
			<p class="text-lg text-text-secondary">
				EcoHubs.community envisions a future where intentional communities thrive through
				blockchain technology, creating sustainable, regenerative ecosystems that benefit both
				people and the planet.
			</p>
			<p class="mt-4 text-text-secondary">
				We believe in the power of decentralized governance, regenerative economics, and
				community-driven innovation to create lasting positive change.
			</p>
		</div>
		<div class="mt-10">
			<a
				href="/blueprint"
				class="text-base font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-dark)]"
				data-sveltekit-preload-data="hover"
			>
				Explore our blueprint <span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</Section>

