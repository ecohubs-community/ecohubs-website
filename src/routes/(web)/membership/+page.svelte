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
	import Faq from '$lib/components/Faq.svelte';
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
		Target,
		Mail,
		Share2,
		PenLine,
		Compass,
		Lightbulb,
		BookOpen
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

	// FAQ Data
	const membershipFaq = [
		{
			question: 'What does membership involve?',
			answer: 'Members participate in an **online community** — contributing to the blueprint (RCOS), joining discussions, voting on proposals, and collaborating on shared tools. It is not a physical community membership.'
		},
		{
			question: 'How long does the application process take?',
			answer: 'After you submit your application, it goes through a **3-day community review and vote**. You will be notified of the outcome by email.'
		},
		{
			question: 'Is there a membership fee?',
			answer: 'No. Membership is **free and contribution-based**. You earn recognition and access through active participation, not financial payment.'
		},
		{
			question: "Do I need to be technical or understand Web3 to participate?",
			answer: "No. EcoHubs is intentionally designed to include people from **diverse backgrounds**, including:\n\n- Permaculturists and land stewards\n- Community builders\n- Designers, educators, facilitators\n- Developers and Web3 contributors\n\nTechnology is meant to **support coordination**, not create barriers. Participation is based on contribution, not technical expertise."
		},
		{
			question: 'What kind of contributions are valued?',
			answer: 'We value **many forms of contribution**: research, writing, facilitation, coordination, design, development, stewardship of shared knowledge, and community building. There is no single expected skill set.'
		},
		{
			question: 'Can I leave the community at any time?',
			answer: 'Yes. Membership is voluntary. You can step back or exit at any time. Our blueprint includes **clear exit paths** as part of its membership design.'
		},
		{
			question: 'What tools does the community use?',
			answer: 'We use [ecohubsOS](https://os.ecohubs.community), Snapshot for voting, Flarum and Discord for discussions, and collaborative documents for blueprint development.'
		},
		{
			question: "Is joining early risky, and what do I actually gain as a pioneer?",
			answer: "Yes — early participation carries uncertainty, but also influence.\n\nPotential gains:\n- Ability to **shape the blueprint and systems**\n- Early access to roles, responsibilities, and decision-making\n- Stronger relationships with aligned people\n\nTrade-offs:\n- Systems are still evolving\n- Not all structures are finalized\n\nThis is positioned as a **co-creation phase**, not a finished product."
		},
		{
			question: "Who controls the project today, and how decentralized is it really?",
			answer: "Currently, EcoHubs is in an **early-stage founder-led phase**, transitioning toward community governance.\n\nPlanned trajectory:\n1. Founder-led coordination (early stage)\n2. Community co-creation of systems\n3. Increasing decentralization via DAO governance\n\nThis acknowledges a practical reality: full decentralization is **not immediate**, but a process."
		}
	];

	// Contribution Areas Data
	const contributionAreas = [
		{
			icon: Mail,
			title: 'Coordinate Community Updates',
			description: 'Help keep members informed through newsletters, announcements, and internal communications that connect the community.',
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			barColor: 'bg-blue-400',
			size: 'wide',
			illustration: `<svg class="w-28 h-28 opacity-60" viewBox="0 0 120 120" fill="none" aria-hidden="true">
				<rect x="35" y="42" width="50" height="36" rx="4" stroke="#93c5fd" stroke-width="2" fill="#dbeafe" fill-opacity="0.5"/>
				<path d="M35 46l25 18 25-18" stroke="#60a5fa" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
				<circle cx="20" cy="30" r="6" fill="#bfdbfe" stroke="#93c5fd" stroke-width="1.5"/>
				<circle cx="100" cy="30" r="6" fill="#bfdbfe" stroke="#93c5fd" stroke-width="1.5"/>
				<circle cx="16" cy="90" r="5" fill="#bfdbfe" stroke="#93c5fd" stroke-width="1.5"/>
				<circle cx="104" cy="90" r="5" fill="#bfdbfe" stroke="#93c5fd" stroke-width="1.5"/>
				<path d="M26 33 L38 44" stroke="#93c5fd" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7"/>
				<path d="M94 33 L82 44" stroke="#93c5fd" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7"/>
				<path d="M20 85 L38 74" stroke="#93c5fd" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7"/>
				<path d="M100 85 L82 74" stroke="#93c5fd" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.7"/>
				<circle cx="78" cy="42" r="7" fill="#3b82f6" fill-opacity="0.15"/>
				<circle cx="78" cy="42" r="4" fill="#60a5fa" fill-opacity="0.4"/>
			</svg>`
		},
		{
			icon: Users,
			title: 'Facilitate Conversations & Workshops',
			description: 'Guide discussions, host workshops, and support pilot communities in applying the RCOS blueprint. Create spaces for meaningful dialogue and collaborative sense-making.',
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			barColor: 'bg-purple-400',
			size: 'tall',
			illustration: `<svg class="w-32 h-32 opacity-50" viewBox="0 0 140 140" fill="none" aria-hidden="true">
				<circle cx="70" cy="70" r="38" stroke="#c4b5fd" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
				<circle cx="70" cy="30" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="70" cy="30" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<circle cx="104" cy="52" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="104" cy="52" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<circle cx="104" cy="88" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="104" cy="88" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<circle cx="70" cy="110" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="70" cy="110" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<circle cx="36" cy="88" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="36" cy="88" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<circle cx="36" cy="52" r="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
				<circle cx="36" cy="52" r="3.5" fill="#a78bfa" fill-opacity="0.5"/>
				<path d="M58 62 Q60 56 68 56 L72 56 Q80 56 82 62 Q84 68 80 72 L78 74 L74 78 L72 74 L68 74 Q60 74 58 68 Z" fill="#c4b5fd" fill-opacity="0.35" stroke="#a78bfa" stroke-width="1"/>
			</svg>`
		},
		{
			icon: Share2,
			title: 'Connect People & Communities',
			description: 'Bridge relationships between members, communities, and aligned organizations to grow the ecosystem.',
			iconColor: 'text-teal-600',
			iconBg: 'bg-teal-50',
			barColor: 'bg-teal-400',
			size: 'default'
		},
		{
			icon: PenLine,
			title: 'Create Stories & Content',
			description: 'Write articles, create social media content, and craft narratives that bring our shared vision to life.',
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			barColor: 'bg-amber-400',
			size: 'default'
		},
		{
			icon: Compass,
			title: 'Shape the RCOS Blueprint',
			description: 'Co-design the regenerative community operating system — propose improvements and evolve the framework together.',
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			barColor: 'bg-emerald-400',
			size: 'default'
		},
		{
			icon: CodeXml,
			title: 'Build Digital Tools',
			description: 'Develop the platforms, integrations, and open-source tools that power the EcoHubs ecosystem.',
			iconColor: 'text-indigo-600',
			iconBg: 'bg-indigo-50',
			barColor: 'bg-indigo-400',
			size: 'default'
		},
		{
			icon: Lightbulb,
			title: 'Design Strategy & Initiatives',
			description: 'Shape creative direction, plan initiatives, and translate vision into structured, actionable next steps.',
			iconColor: 'text-rose-600',
			iconBg: 'bg-rose-50',
			barColor: 'bg-rose-400',
			size: 'wide'
		},
		{
			icon: BookOpen,
			title: 'Research Regenerative Models',
			description: 'Investigate best practices, analyze existing communities, and contribute evidence-based insights on regenerative living.',
			iconColor: 'text-orange-600',
			iconBg: 'bg-orange-50',
			barColor: 'bg-orange-400',
			size: 'wide'
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
	faq={membershipFaq}
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

<!-- Ways You Can Contribute -->
<section id="contribute" class="py-24 md:py-32 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white to-amber-50/20"></div>
	<div class="absolute top-20 -left-32 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl"></div>
	<div class="absolute bottom-20 -right-32 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl"></div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Ways You Can Contribute</h2>
			<p class="text-gray-600 text-lg leading-relaxed">
				There are no fixed roles here — just a wide range of ways to get involved. Browse what resonates with your skills and interests, and shape your own path within the community.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:[grid-auto-flow:dense]">
			{#each contributionAreas as area (area.title)}
				{@const isWide = area.size === 'wide'}
				{@const isTall = area.size === 'tall'}
				<div
					class="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300
						{isWide ? 'md:col-span-2 lg:col-span-2' : ''}
						{isTall ? 'lg:row-span-2' : ''}"
				>
					<div class="h-1 {area.barColor}"></div>
					{#if isWide}
						<!-- Wide card: horizontal on md+, vertical on mobile -->
						<div class="p-6 lg:p-8 flex flex-col md:flex-row md:items-start md:gap-5">
							<div class="w-12 h-12 md:w-14 md:h-14 {area.iconBg} rounded-xl flex items-center justify-center {area.iconColor} shrink-0 mb-4 md:mb-0">
								<svelte:component this={area.icon} class="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
							</div>
							<div class="flex-1">
								<h3 class="text-lg md:text-xl font-serif font-bold text-gray-900 mb-2">{area.title}</h3>
								<p class="text-gray-600 text-sm leading-relaxed">{area.description}</p>
							</div>
							{#if area.illustration}
								<div class="hidden lg:flex items-center justify-center shrink-0">
									{@html area.illustration}
								</div>
							{/if}
						</div>
					{:else if isTall}
						<!-- Tall card: vertical, extra room on lg -->
						<div class="p-6 lg:p-8 flex flex-col lg:h-full">
							<div class="w-12 h-12 lg:w-14 lg:h-14 {area.iconBg} rounded-xl flex items-center justify-center {area.iconColor} mb-4 lg:mb-5">
								<svelte:component this={area.icon} class="w-6 h-6 lg:w-7 lg:h-7" aria-hidden="true" />
							</div>
							<h3 class="text-lg lg:text-xl font-serif font-bold text-gray-900 mb-2 lg:mb-3">{area.title}</h3>
							<p class="text-gray-600 text-sm leading-relaxed">{area.description}</p>
							{#if area.illustration}
								<div class="hidden md:flex mt-auto pt-6 items-center justify-center">
									{@html area.illustration}
								</div>
							{/if}
						</div>
					{:else}
						<!-- Standard card -->
						<div class="p-6">
							<div class="w-12 h-12 {area.iconBg} rounded-xl flex items-center justify-center {area.iconColor} mb-4">
								<svelte:component this={area.icon} class="w-6 h-6" aria-hidden="true" />
							</div>
							<h3 class="text-lg font-serif font-bold text-gray-900 mb-2">{area.title}</h3>
							<p class="text-gray-600 text-sm leading-relaxed">{area.description}</p>
							{#if area.illustration}
								<div class="hidden md:flex mt-4 items-center justify-center">
									{@html area.illustration}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center max-w-2xl mx-auto">
			<p class="text-gray-500 leading-relaxed mb-6">
				These aren't fixed roles — they're starting points. Many members contribute across multiple areas, and your path will evolve as you get involved. After you become a member, reach out on Discord, our forum, or by email — an existing member will help you find your way in.
			</p>
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

<!-- FAQ Section -->
<Faq title="Frequently Asked Questions" items={membershipFaq} />

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
