
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import NetworkOfHubsImage from '$lib/assets/network-regenerative-ecohubs.webp';
	import PersonaCard from '$lib/components/PersonaCard.svelte';

	const visionCards = [
  {
    icon: "tabler:leaf",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Regenerative Living",
    description:
      "Food systems, buildings, and land use are designed to restore soil, biodiversity, and water cycles."
  },
  {
    icon: "tabler:tools",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    title: "Shared Infrastructure",
    description:
      "Resources such as land, tools, energy, and spaces are shared to reduce waste and increase resilience."
  },
  {
    icon: "tabler:heart-handshake",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    title: "Community & Care",
    description:
      "EcoHubs prioritize social cohesion, mutual support, and inclusive decision-making."
  },
  {
    icon: "tabler:map-pin",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    title: "Local Adaptation",
    description:
      "Each EcoHub adapts its practices to climate, culture, and local knowledge rather than following a rigid formula."
  },
  {
    icon: "tabler:repeat",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    title: "Learning by Doing",
    description:
      "EcoHubs experiment, document, and improve continuously through real-world practice."
  },
  {
    icon: "tabler:network",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    title: "Globally Connected",
    description:
      "While rooted locally, EcoHubs share knowledge, tools, and experiences through a global network."
  }
];
</script>

<SEO
	title="Vision – EcoHubs.community"
	description="A vision for a global network of small, regenerative EcoHubs — human-scale communities living in alignment with nature and cooperation."
/>

<!-- HERO: THE END RESULT -->
<Section spacing="xl" columns={2}>
	<div>
		<h1 class="font-serif text-4xl font-bold leading-tight text-ecohubs-dark sm:text-5xl">
			A Network of <span class="text-gradient">Regenerative EcoHubs</span>
		</h1>

		<p class="mt-6 text-lg leading-relaxed text-gray-600">
			We envision a living network of small, human-scale communities — EcoHubs — rooted in
			nature, cooperation, and shared responsibility.
		</p>

		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Each EcoHub adapts to its local environment while remaining connected to a global
			knowledge commons, enabling continuous learning, resilience, and regeneration.
		</p>

		<div class="mt-10 flex flex-wrap items-center gap-6">
			<a
				href="/blueprint"
				class="px-8 py-4 bg-ecohubs-primary text-white font-medium rounded-xl hover:bg-ecohubs-dark transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-105 hover:rotate-1 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
				aria-label="Explore the Blueprint"
				data-sveltekit-preload-data="hover"
			>
				Explore the Blueprint
			</a>

			<a
				href="/join"
				class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-ecohubs-primary hover:text-ecohubs-primary hover:scale-105 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
				aria-label="Join the Community"
				data-sveltekit-preload-data="hover"
			>
				Join the Community →
			</a>
		</div>
	</div>

	<!-- Optional visual placeholder -->
	<div class="">
		<div
			class="relative h-100 w-full rounded-xl border border-border-subtle"
		>
			<img src={NetworkOfHubsImage} alt="Network of regenerative EcoHubs" class="rounded-3xl shadow-2xl organic-shape hover:rotate-1 transition-transform duration-700 object-cover h-96 w-full" loading="lazy" />
		</div>
	</div>
</Section>

<!-- WHAT IS AN ECOHUB -->
<Section spacing="md">
	<div class="max-w-3xl mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			What Is an EcoHub?
		</h2>

		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			An EcoHub is a small, place-based community designed to support human well-being while
			regenerating the ecosystems it depends on.
		</p>

		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			EcoHubs are intentionally human-scale. They are not isolated communes or rigid
			blueprints, but adaptable living systems shaped by local context and shared values.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each visionCards as card}
			<PersonaCard {...card} />
		{/each}
	</div>
</Section>
