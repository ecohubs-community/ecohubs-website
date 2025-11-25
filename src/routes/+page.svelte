<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<SEO
	title="GaiaLabs.community - Building Intentional Communities on Blockchain"
	description="Join GaiaLabs.community in creating sustainable, regenerative intentional communities powered by blockchain technology. Be part of the first 1000."
/>

<Hero />

<Section spacing="lg">
	<div class="mx-auto w-full max-w-5xl text-center">
		<h2 class="font-serif text-5xl font-bold text-text-primary sm:text-4xl">
			Our Vision
		</h2>
		<p class="mt-6 text-lg text-text-secondary">
			GaiaLabs.community envisions a future where intentional communities thrive through
			blockchain technology, creating sustainable, regenerative ecosystems that benefit both
			people and the planet.
		</p>
		<div class="mt-10">
			<a
				href="/vision"
				class="text-base font-semibold text-primary transition-colors hover:text-primary-dark"
				data-sveltekit-preload-data="hover"
			>
				Learn more about our vision <span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</Section>

<Section spacing="lg" columns={3}>
	<Card>
		<h3 class="font-serif text-xl font-semibold text-text-primary">DAO Governance</h3>
		<p class="mt-2 text-sm text-text-secondary">
			Participate in decentralized decision-making through our DAO structure.
		</p>
		<a
			href="/dao"
			class="mt-4 inline-block text-sm font-medium text-primary transition-colors hover:text-primary-dark"
			data-sveltekit-preload-data="hover"
		>
			Learn more →
		</a>
	</Card>
	<Card>
		<h3 class="font-serif text-xl font-semibold text-text-primary">EcoToken</h3>
		<p class="mt-2 text-sm text-text-secondary">
			Non-speculative token economics designed for community sustainability.
		</p>
		<a
			href="/ecotoken"
			class="mt-4 inline-block text-sm font-medium text-primary transition-colors hover:text-primary-dark"
			data-sveltekit-preload-data="hover"
		>
			Learn more →
		</a>
	</Card>
	<Card>
		<h3 class="font-serif text-xl font-semibold text-text-primary">Living Blueprint</h3>
		<p class="mt-2 text-sm text-text-secondary">
			Explore our evolving blueprint for intentional community development.
		</p>
		<a
			href="/blueprint"
			class="mt-4 inline-block text-sm font-medium text-primary transition-colors hover:text-primary-dark"
			data-sveltekit-preload-data="hover"
		>
			Explore →
		</a>
	</Card>
</Section>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-5xl text-center">
		<h2 class="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
			Join the First 1000
		</h2>
		<p class="mt-6 text-lg text-text-secondary">
			Be part of the founding community shaping the future of intentional communities on
			blockchain.
		</p>
		<div class="mt-10">
			<a
				href="/join"
				class="rounded-md bg-[var(--color-forest-800)] px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-forest-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				data-sveltekit-preload-data="hover"
			>
				Apply Now
			</a>
		</div>
	</div>
</Section>
