<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<SEO
	title="DAO Governance - EcoHubs.community"
	description="Learn about our decentralized autonomous organization (DAO) structure and governance model."
/>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-5xl">
		<h1 class="font-serif text-4xl font-bold text-text-primary sm:text-5xl">DAO Overview</h1>
		<div class="mt-8">
			<p class="text-lg text-text-secondary">
				Our DAO (Decentralized Autonomous Organization) enables community members to
				participate in governance decisions through gasless voting on Snapshot.
			</p>
			<h2 class="font-serif text-2xl font-semibold text-text-primary mt-8">Governance</h2>
			<p class="mt-4 text-text-secondary">
				Community proposals are voted on using Snapshot, a gasless polling platform. All
				members can participate in shaping the future of EcoHubs.community.
			</p>
			<h2 class="font-serif text-2xl font-semibold text-text-primary mt-8">Treasury</h2>
			<p class="mt-4 text-text-secondary">
				Our treasury is managed through a Gnosis Safe multisig wallet, ensuring secure and
				transparent fund management with multiple signatories required for transactions.
			</p>
		</div>
	</div>
</Section>

