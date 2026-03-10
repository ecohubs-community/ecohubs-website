<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import GovernanceSection from '$lib/components/GovernanceSection.svelte';
	import EcosystemSection from '$lib/components/EcosystemSection.svelte';
	import EcoTokenFeature from '$lib/components/EcoTokenFeature.svelte';
	import MemberGuidedDecisionsImage from '$lib/assets/member-guided-decisions.webp';
	import SharedStewardshipImage from '$lib/assets/shared-stewardship.webp';
	import DeliberationSenseMakingImage from '$lib/assets/deliberation-sense-making.webp';
	import TrustByDesignImage from '$lib/assets/trust-by-design.webp';
	import ContributionEconomyImage from '$lib/assets/contribution-economy.webp';
	import {
		Vote,
		Users,
		ShieldCheck,
		ArrowRight,
		Shovel,
		Eye,
		MessageCircle,
		WalletMinimal,
		ChartBar,
		CodeXml,
		ClipboardList,
		UserCheck,
		Rocket,
		Globe,
		Sprout,
		Target
	} from 'lucide-svelte';

	// Governance Features Data
	const governanceFeatures = [
		{
			icon: Vote,
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			title: 'Member-Guided Decisions',
			description: 'Key decisions are made together through transparent, gas-free voting.',
			detailTitle: 'Participation Before Automation',
			detailDescription:
				'EcoHubs uses Snapshot to coordinate collective decisions such as new member applications, content publication, and shared direction. Voting is gas-free and accessible, allowing participation without financial or technical barriers. Governance starts with human judgment, supported — not replaced — by tools.',
			detailImage: MemberGuidedDecisionsImage,
			detailImageAlt: 'Community voting',
			buttonText: 'Explore Decisions',
			buttonBgColor: 'bg-blue-600',
			buttonIcon: ArrowRight,
		},
		{
			icon: WalletMinimal,
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			title: 'Shared Stewardship',
			description: 'Access, permissions, and influence are earned through contribution.',
			detailTitle: 'Responsibility Grows With Trust',
			detailDescription:
				'Instead of financial stakes or speculation, EcoHubs emphasizes contribution-based authority. Through ecohubsOS and <a href="https://offcoin.space" target="_blank" rel="noopener noreferrer">Offcoin</a>, members earn experience and internal tokens by helping the community. Over time, this unlocks permissions, influence, and responsibility — creating a culture of earned trust rather than assigned power.',
			detailImage: SharedStewardshipImage,
			detailImageAlt: 'Stewardship and responsibility',
			buttonText: 'How Contribution Works',
			buttonBgColor: 'bg-amber-600',
			buttonIcon: Eye,
		},
		{
			icon: Users,
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			title: 'Deliberation & Sense-Making',
			description: 'Decisions emerge through dialogue, not just votes.',
			detailTitle: 'From Conversation to Coherence',
			detailDescription:
				'Before decisions are made, ideas are discussed in member forums and community spaces. We use Flarum and Discord to surface perspectives, refine proposals, and build shared understanding. Voting is the final step — not the first.',
			detailImage: DeliberationSenseMakingImage,
			detailImageAlt: 'Group discussion',
			buttonText: 'Join the Discussion',
			buttonBgColor: 'bg-purple-600',
			buttonIcon: MessageCircle,
		},
		{
			icon: ShieldCheck,
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			title: 'Trust by Design',
			description: 'Transparency where it matters, flexibility where humans matter.',
			detailTitle: 'A Conscious Use of Technology',
			detailDescription:
				'EcoHubs is not "fully on-chain" — by choice. We use blockchain selectively where transparency, auditability, and fairness add real value. Other parts remain off-chain to preserve nuance, care, and human judgment. Trust here is built through visibility, participation, and shared accountability.',
			detailImage: TrustByDesignImage,
			detailImageAlt: 'Technology and trust',
			buttonText: 'Our Approach to Tech',
			buttonBgColor: 'bg-emerald-600',
			buttonIcon: CodeXml,
		}
	];

	// EcoToken Features Data
	const ecoTokenFeatures = [
		{
			Icon: Shovel,
			title: 'Earn Through Contribution',
			description:
				'Members earn recognition and internal tokens by contributing to the EcoHubs online ecosystem — through research, writing, facilitation, coordination, design, development, or stewardship of shared knowledge.',
			gradientFrom: 'from-emerald-500',
			gradientTo: 'to-teal-500'
		},
		{
			Icon: ChartBar,
			title: 'Unlock Access & Influence',
			description:
				'Today, earned tokens and experience unlock access, permissions, and responsibilities within EcoHubs — shaping discussions, initiatives, and the shared blueprint (RCOS). In the future, this model can extend into physical communities and local exchange.',
			gradientFrom: 'from-amber-400',
			gradientTo: 'to-orange-500'
		},
		{
			Icon: ShieldCheck,
			title: 'Designed for Use, Not Speculation',
			description:
				'EcoHubs tokens are non-transferable and non-speculative by design. They exist to acknowledge effort, coordinate collaboration, and build trust — not to be traded or accumulated for profit.',
			gradientFrom: 'from-blue-400',
			gradientTo: 'to-indigo-500'
		}
	];
</script>

<SEO
	title="Become a Member - EcoHubs.community"
	description="Apply to join EcoHubs, an online community collaborating on making regenerative communities more accessible, resilient, and more normal. Learn about our membership process."
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Membership', url: 'https://ecohubs.community/membership' }
	]}
/>

<!-- Hero Section -->
<section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-emerald-50/60 to-white"></div>
	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
			<span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
			<span class="text-xs font-bold text-emerald-600 tracking-widest uppercase">Open for Applications</span>
		</div>

		<h1 class="text-5xl md:text-6xl font-serif font-bold text-ecohubs-dark mb-6">
			Become a <span class="text-gradient">Member</span>
		</h1>

		<p class="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto mb-4">
			We're building an online community that collaborates on how to make regenerative communities more accessible, resilient, and more "normal."
		</p>
		<p class="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
			Join researchers, designers, developers, community builders, and regenerative thinkers from around the world — working together on a shared blueprint for a better way of living.
		</p>

		<a
			href="/join"
			class="inline-flex items-center gap-2 px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 focus-visible:ring-2 focus-visible:ring-green-400"
			aria-label="Apply for Membership"
			data-sveltekit-preload-data="hover"
		>
			Apply for Membership
			<ArrowRight class="w-5 h-5" aria-hidden="true" />
		</a>
	</div>
</section>

<!-- Governance Section (moved from homepage) -->
<section id="governance" class="py-24 md:py-32 relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Power to the Community</h2>
			<p class="text-gray-600">Transparent tools enable trust without hierarchy. Our <a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization" target="_blank" rel="noopener noreferrer">DAO</a>-like (Decentralized Autonomous Organization) ecosystem ensures transparency and collective agency.</p>
		</div>

		<GovernanceSection features={governanceFeatures} />
	</div>
</section>

<!-- Ecosystem Section (moved from homepage) -->
<EcosystemSection />

<!-- EcoToken Section (moved from homepage) -->
<section id="ecotoken" class="py-24 md:py-32 bg-white border-y border-gray-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div class="order-2 lg:order-1">
				<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-6">
					A Contribution Economy That <span class="text-ecohubs-accent">Rewards Real Work</span>
				</h2>
				<p class="text-gray-600 mb-8 text-lg">
					EcoTokens are designed to one day reward real-world regenerative work. Today, we are prototyping this model online through contribution-based recognition.
				</p>

				<div class="space-y-6">
					{#each ecoTokenFeatures as feature (feature.title)}
						<EcoTokenFeature {...feature} />
					{/each}
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<img
					src={ContributionEconomyImage}
					sizes="(max-width: 1024px) 100vw, 50vw"
					width="1200"
					height="800"
					class="rounded-3xl shadow-2xl organic-shape-pebble hover:rotate-1 transition-transform duration-700 object-cover h-96 w-full"
					alt="Green Growth"
					loading="lazy"
				/>

				<div class="text-gray-600 mt-8 text-md">
					We start by rewarding contributions to shared knowledge and coordination — because strong physical communities begin with strong social foundations.
				</div>
			</div>
		</div>
	</div>
</section>

<!-- How to Become a Member -->
<section id="process" class="py-24 md:py-32 bg-gray-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">How to Become a Member</h2>
			<p class="text-gray-600 max-w-2xl mx-auto text-lg">Our membership process is transparent and community-driven. Here's how it works.</p>
		</div>

		<div class="space-y-8">
			<!-- Step 1 -->
			<div class="flex gap-6 items-start">
				<div class="shrink-0 w-14 h-14 bg-ecohubs-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
					<ClipboardList class="w-6 h-6" aria-hidden="true" />
				</div>
				<div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<div class="flex items-center gap-3 mb-2">
						<span class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase">Step 1</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-2">Fill Out the Application Form</h3>
					<p class="text-gray-600">Share your background, values, skills, and how you'd like to contribute. The form takes about 20 minutes and helps us understand what you bring to the community.</p>
				</div>
			</div>

			<!-- Step 2 -->
			<div class="flex gap-6 items-start">
				<div class="shrink-0 w-14 h-14 bg-ecohubs-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
					<UserCheck class="w-6 h-6" aria-hidden="true" />
				</div>
				<div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<div class="flex items-center gap-3 mb-2">
						<span class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase">Step 2</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-2">Community Review & Vote</h3>
					<p class="text-gray-600">Our community members review your application and put it to a vote for 3 days. Parts of your application will be publicly visible so the community can make an informed decision together.</p>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="flex gap-6 items-start">
				<div class="shrink-0 w-14 h-14 bg-ecohubs-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
					<Rocket class="w-6 h-6" aria-hidden="true" />
				</div>
				<div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
					<div class="flex items-center gap-3 mb-2">
						<span class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase">Step 3</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-2">Get Started on ecohubsOS</h3>
					<p class="text-gray-600">Once approved, log in to <a href="https://os.ecohubs.community" class="text-ecohubs-primary hover:underline" target="_blank" rel="noopener noreferrer">os.ecohubs.community</a>, complete your onboarding steps, and start collaborating with others. You'll have access to our full ecosystem of tools and community spaces.</p>
				</div>
			</div>
		</div>

		<div class="text-center mt-12">
			<a
				href="/join"
				class="inline-flex items-center gap-2 px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-600/20 focus-visible:ring-2 focus-visible:ring-green-400"
				aria-label="Start Your Application"
				data-sveltekit-preload-data="hover"
			>
				Start Your Application
				<ArrowRight class="w-5 h-5" aria-hidden="true" />
			</a>
		</div>
	</div>
</section>

<!-- What We're Building Right Now -->
<section id="what-were-building" class="py-24 md:py-32 bg-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">What We're Building Right Now</h2>
			<p class="text-gray-600 text-lg max-w-2xl mx-auto">
				EcoHubs is an online-first community. Here's what that means today.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
				<div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
					<Globe class="w-6 h-6 text-emerald-600" aria-hidden="true" />
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">An Online Community</h3>
				<p class="text-gray-600 leading-relaxed">
					We are not currently creating physical hubs or looking for members to join a physical community. We are an <strong>online community</strong> collaborating on the question of how to make regenerative communities more accessible, resilient, and more "normal."
				</p>
			</div>

			<div class="bg-amber-50 p-8 rounded-2xl border border-amber-100">
				<div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
					<Target class="w-6 h-6 text-amber-600" aria-hidden="true" />
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">Future Pilot Projects</h3>
				<p class="text-gray-600 leading-relaxed">
					In the future, we plan to run pilot projects — applying our blueprint at new or existing communities. But right now, our focus is on building the blueprint together, refining our tools, and growing a committed community of contributors.
				</p>
			</div>
		</div>

		<div class="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
			<div class="flex items-start gap-4">
				<div class="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
					<Sprout class="w-6 h-6 text-blue-600" aria-hidden="true" />
				</div>
				<div>
					<h3 class="text-xl font-bold text-gray-900 mb-2">What We're Looking For</h3>
					<p class="text-gray-600 leading-relaxed">
						We welcome researchers, designers, developers, writers, facilitators, permaculturists, community builders, and anyone committed to co-creating regenerative ways of living. If you believe in transparent governance, contribution-based collaboration, and designing systems that work with nature — you belong here.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section class="py-24 md:py-32 relative overflow-hidden">
	<div class="absolute inset-0 bg-ecohubs-dark"></div>
	<div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
		<h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Join Us?</h2>
		<p class="text-emerald-100 text-lg mb-4 max-w-2xl mx-auto">
			Help us shape the blueprint for regenerative communities. Join a growing group of thinkers, builders, and creators collaborating online.
		</p>
		<p class="text-emerald-50 text-sm mb-10 max-w-xl mx-auto">
			Completing the application does not guarantee membership. We carefully select members who align with our values and can actively contribute.
		</p>
		<a
			href="/join"
			class="px-8 py-4 bg-ecohubs-accent text-white font-bold rounded-xl hover:bg-white hover:text-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 hover:rotate-1 shadow-xl shadow-orange-900/20 hover:shadow-orange-900/40 focus-visible:ring-2 focus-visible:ring-orange-400"
			aria-label="Apply for Membership"
			data-sveltekit-preload-data="hover"
		>
			Apply for Membership
		</a>
	</div>
</section>
