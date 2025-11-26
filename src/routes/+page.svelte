<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import GovernanceSection from '$lib/components/GovernanceSection.svelte';
	import EcoTokenFeature from '$lib/components/EcoTokenFeature.svelte';
	import BlueprintCard from '$lib/components/BlueprintCard.svelte';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import DifferentiatorCard from '$lib/components/DifferentiatorCard.svelte';
	import RoadmapPhase from '$lib/components/RoadmapPhase.svelte';
  import StefanImage from '$lib/assets/stefan.webp';
	import {
		Unlink,
		AlertTriangle,
		Lock,
		Check,
		Microscope,
		Network,
		Flower2,
		Vote,
		Wallet2,
		Users,
		ShieldCheck,
		ArrowRight,
		Shovel,
		ShoppingBasket,
		Leaf,
		Scale,
		Zap,
		Droplets,
		Home,
		HeartHandshake,
		BookOpen,
		FileText,
		MapPin,
		Share2,
		Copy,
		Sprout,
		Code,
		Lightbulb,
		Heart,
		Compass,
		FileCode,
		FlaskConical,
		UsersRound,
		MessageCircle,
		Eye,
		Code2,
		Users2,
		Repeat,

		WalletMinimal,

		CodeXml,

		House,

		TriangleAlert




	} from 'lucide-svelte';
	import WhyCard from '$lib/components/WhyCard.svelte';

	// Why We Need New Models Data
	const whyCards = [
		{
			problem: {
				Icon: Unlink,
				iconColor: 'text-red-500',
				iconBg: 'bg-red-50',
				title: 'Loneliness Crisis in a Connected World',
				description: 'We are more connected than ever, yet feel more alone. Traditional community bonds have eroded.'
			},
			solution: {
				text: 'EcoHubs designs intentional communities where belonging is built-in, not an afterthought.'
			}
		},
		{
			problem: {
				Icon: TriangleAlert,
				iconColor: 'text-orange-500',
				iconBg: 'bg-orange-50',
				title: "We Are Exceeding Earth's Boundaries",
				description: "Extractive systems are depleting our planet. We need regenerative models that give back more than they take."
			},
			solution: {
				text: 'Our blueprint shows how communities can become net-positive for ecosystems.'
			}
		},
		{
			problem: {
				Icon: Lock,
				iconColor: 'text-blue-500',
				iconBg: 'bg-blue-50',
				title: 'Trust Has Been Centralized for Too Long',
				description: 'Opaque governance leaves people feeling powerless. We build systems where every voice matters.'
			},
			solution: {
				text: 'DAO governance returns power to communities through transparent, auditable systems.'
			}
		}
	];

	// Technology That Serves Life Data
	const approachCards = [
		{
			icon: Microscope,
			title: 'Community-Led Research',
			description:
				"Our blueprint grows from practice. Every pilot community becomes a living laboratory where solutions are tested, refined, and shared."
		},
		{
			icon: Network,
			title: 'Collaborative Evolution',
			description:
				'Like a mycelial network, our intelligence expands through connection. The blueprint is open-source, shaped by everyone who contributes.'
		},
		{
			icon: Flower2,
			title: 'Systems Thinking',
			description:
				"We design communities as whole systems—where housing, food, water, energy, and culture work together as a resilient living ecosystem."
		}
	];

	// Governance Features Data
	const governanceFeatures = [
		{
			icon: Vote,
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			title: 'DAO Voting',
			description: 'Every member has a voice. We use Snapshot for gasless, on-chain voting.',
			detailTitle: 'Your Voice, Your Vote',
			detailDescription:
				"Traditional organizations are top-down. EcoHubs is bottom-up. We use Snapshot to allow token holders to vote on proposals without paying gas fees. Whether it's approving a new budget or changing a community rule, the power rests with the people.",
			detailImage:
				'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
			detailImageAlt: 'Voting',
			buttonText: 'See Live Proposals',
			buttonBgColor: 'bg-blue-600',
			buttonIcon: ArrowRight,
			buttonHref: '/dao'
		},
		{
			icon: WalletMinimal,
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			title: 'Transparent Treasury',
			description: 'Funds are managed openly via Gnosis Safe multi-sig wallets.',
			detailTitle: 'Funds Managed in the Open',
			detailDescription:
				'No hidden bank accounts. Our treasury is managed by a Gnosis Safe multi-signature wallet. Every transaction is recorded on the blockchain, viewable by anyone, anytime. This radical transparency ensures resources go exactly where the community decides.',
			detailImage:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			detailImageAlt: 'Treasury',
			buttonText: 'View Treasury',
			buttonBgColor: 'bg-amber-600',
			buttonIcon: Eye,
			buttonHref: '/dao'
		},
		{
			icon: Users,
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			title: 'Collective Decisions',
			description: 'Proposals are debated in the forum and ratified by consensus.',
			detailTitle: 'Wisdom of the Crowd',
			detailDescription:
				"Good governance isn't just voting; it's discussing. Our forum allows members to debate ideas, refine proposals, and build consensus before a vote ever happens. We value deliberation and the synthesis of diverse perspectives.",
			detailImage:
				'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
			detailImageAlt: 'Discussion',
			buttonText: 'Join the Forum',
			buttonBgColor: 'bg-purple-600',
			buttonIcon: MessageCircle,
			buttonHref: '/dao'
		},
		{
			icon: ShieldCheck,
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			title: 'Auditable Trust',
			description: 'Immutable records build long-term trust without bureaucracy.',
			detailTitle: 'Trust Code, Not Just People',
			detailDescription:
				"In a world of broken promises, code offers certainty. Our governance rules are encoded in smart contracts. This creates a trustless environment where you don't have to know someone to cooperate with them effectively and securely.",
			detailImage:
				'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
			detailImageAlt: 'Blockchain',
			buttonText: 'Verify Contracts',
			buttonBgColor: 'bg-emerald-600',
			buttonIcon: CodeXml,
			buttonHref: '/dao'
		}
	];

	// EcoToken Features Data
	const ecoTokenFeatures = [
		{
			Icon: Shovel,
			title: 'Earn by Contributing',
			description:
				'Log hours in the community garden or help build housing to mint tokens. Real value, no speculation.',
			gradientFrom: 'from-emerald-500',
			gradientTo: 'to-teal-500'
		},
		{
			Icon: ShoppingBasket,
			title: 'Spend Locally',
			description:
				'Exchange tokens for fresh produce, tool rentals, expert workshops, childcare services, or community meals within the network.',
			gradientFrom: 'from-amber-400',
			gradientTo: 'to-orange-500'
		},
		{
			Icon: ShieldCheck,
			title: 'Non-Speculative Design',
			description:
				"EcoToken is not for trading or speculation. It's a community utility token focused on real contributions and local exchange.",
			gradientFrom: 'from-blue-400',
			gradientTo: 'to-indigo-500'
		}
	];

	// Blueprint Cards Data
	const blueprintCards = [
		{
			image:
				'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			imageAlt: 'Ecology',
			Icon: Leaf,
			iconBg: 'bg-emerald-500',
			heading: 'Ecology',
			subheading: 'Regenerative Agriculture & Soil Health',
			description:
				'From compost biology to agroforestry guilds, our blueprint provides methods for transforming degraded land into thriving regenerative ecosystems that nourish people and biodiversity.',
			gradientFrom: 'from-emerald-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
			imageAlt: 'Governance',
			Icon: Scale,
			iconBg: 'bg-blue-500',
			heading: 'Governance',
			subheading: 'Governance & Self-Determination',
			description:
				'DAO structures, consensus models, conflict resolution, and transparent decision-making. Power flows from the community, not from hierarchy.',
			gradientFrom: 'from-blue-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image:
				'https://images.unsplash.com/photo-1662078907809-b9e486757a0a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			imageAlt: 'Energy',
			Icon: Zap,
			iconBg: 'bg-indigo-500',
			heading: 'Energy',
			subheading: 'Renewable Energy & Circular Systems',
			description:
				'Solar, micro-hydropower, biogas, and energy-sharing models designed for communities that want to live lightly, independently, and in harmony with ecological rhythms.',
			gradientFrom: 'from-indigo-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image:
				'https://plus.unsplash.com/premium_photo-1683288081743-5161d099f16e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			imageAlt: 'Resources',
			Icon: Droplets,
			iconBg: 'bg-blue-500',
			heading: 'Resources',
			subheading: 'Water, Waste & Resource Cycles',
			description:
				'Greywater wetlands, composting systems, rain capture, and circular waste flows that turn "waste" into life-giving inputs for gardens, ecosystems, and soil.',
			gradientFrom: 'from-blue-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
			imageAlt: 'Housing',
			Icon: House,
			iconBg: 'bg-amber-500',
			heading: 'Housing',
			subheading: 'Community Housing & Eco-Construction',
			description:
				"We explore earthen building, bamboo structures, passive cooling, thermal mass, shared spaces, and resilient community layouts rooted in nature's geometry.",
			gradientFrom: 'from-amber-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
			imageAlt: 'Culture',
			Icon: HeartHandshake,
			iconBg: 'bg-purple-500',
			heading: 'Culture',
			subheading: 'Social Fabric & Culture Building',
			description:
				'We focus on communication frameworks, conflict resolution, rituals, celebrations, and the deep social architecture that turns a group of people into a living community.',
			gradientFrom: 'from-purple-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
			imageAlt: 'Education',
			Icon: BookOpen,
			iconBg: 'bg-teal-500',
			heading: 'Education',
			subheading: 'Learning, Education & Skill Sharing',
			description:
				'A blueprint for intergenerational learning — nature-based education, mentorship circles, regenerative skills, and shared knowledge as community wealth. We are understanding community as a living school.',
			gradientFrom: 'from-teal-900/60',
			gradientTo: 'to-transparent'
		},
		{
			image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
			imageAlt: 'Blueprint',
			Icon: FileText,
			iconBg: 'bg-emerald-500',
			heading: 'View the Blueprint',
			subheading: '',
			description:
				'Explore our complete open-source blueprint. Every module, every detail, every lesson learned—all available for you to adapt and improve.',
			link: '/blueprint',
			variant: 'cta' as const,
			gradientFrom: 'from-emerald-900/60',
			gradientTo: 'to-transparent'
		}
	];

	// Who Is This For Data
	const personaCards = [
		{
			icon: Sprout,
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			title: 'Regenerative Thinkers',
			description:
				"Permaculturists, ecologists, and land stewards seeking community models that honor nature's patterns."
		},
		{
			icon: Users,
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			title: 'Community Builders',
			description:
				"Those who've dreamed of intentional communities but lacked the tools and blueprint to make it real."
		},
		{
			icon: Code,
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			title: 'Web3 Contributors',
			description:
				'Builders interested in using blockchain for governance, transparency, and regenerative impact.'
		},
		{
			icon: Lightbulb,
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			title: 'Climate Innovators',
			description:
				'Those seeking systemic solutions beyond individual actions—community-scale regeneration.'
		},
		{
			icon: Heart,
			iconColor: 'text-teal-600',
			iconBg: 'bg-teal-50',
			title: 'Cultural Pioneers',
			description:
				'Early believers in new models for living—collaborative, open-minded, visionary.'
		},
		{
			icon: Compass,
			iconColor: 'text-orange-600',
			iconBg: 'bg-orange-50',
			title: 'Seekers of Meaning',
			description:
				'Those ready to trade isolation for belonging, extraction for regeneration, hierarchy for collaboration.'
		}
	];

	// What Makes EcoHubs Different Data
	const differentiatorCards = [
		{
			icon: FileCode,
			title: 'Open-Source Blueprint',
			description:
				"Unlike proprietary models, our blueprint is fully open-source. Anyone can use, adapt, and improve it. No gatekeeping.",
			gradientFrom: 'from-emerald-50',
			gradientTo: 'to-teal-50'
		},
		{
			icon: Network,
			title: 'Tech + Ecology Fusion',
			description:
				"We don't choose between nature and technology. We use blockchain for transparency and trust, while staying grounded in ecological principles.",
			gradientFrom: 'from-blue-50',
			gradientTo: 'to-indigo-50'
		},
		{
			icon: FlaskConical,
			title: 'Real-World Testing',
			description:
				"We're not just theorizing. Pilot hubs will test and refine every aspect of the blueprint before scaling globally.",
			gradientFrom: 'from-purple-50',
			gradientTo: 'to-pink-50'
		},
		{
			icon: UsersRound,
			title: 'Community-Led Evolution',
			description:
				"The blueprint evolves through community practice, not top-down planning. Every member shapes what comes next.",
			gradientFrom: 'from-amber-50',
			gradientTo: 'to-orange-50'
		}
	];

	// Roadmap Data
	const roadmapPhases = [
		{
			phase: 1,
			title: 'Community Formation & Vision Alignment',
			description:
				'Gather the first 1000 aligned members, establish shared values, and co-create the foundation of the EcoHubs blueprint.'
		},
		{
			phase: 2,
			title: 'Blueprint Development & DAO Governance',
			description:
				'Design and refine the open-source blueprint together—covering ecology, governance, architecture, education, and culture—while launching the DAO and governance framework.'
		},
		{
			phase: 3,
			title: 'EcoToken Contribution Economy',
			description:
				'Introduce a transparent, non-speculative token system that recognizes meaningful work and supports a cooperative internal economy.'
		},
		{
			phase: 4,
			title: 'Pilot Community Hubs',
			description:
				'Launch the first regenerative community hubs, test the blueprint in real conditions, refine it together, and document everything openly for global replication.'
		}
	];
</script>

<SEO
	title="EcoHubs.community - A Regenerative Future Designed Together"
	description="Join EcoHubs.community in co-creating the world's first open-source blueprint for regenerative communities powered by blockchain technology. Be part of the first 1000."
/>

<Hero />

<!-- Why We Need New Models -->
<section id="why" class="py-24 md:py-32 relative bg-white/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Why We Need New Models</h2>
			<p class="text-gray-600 text-lg">Modern society faces disconnection, ecological crisis, and fragmentation. We are redesigning how we live together to restore trust and wholeness.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each whyCards as card}
        <WhyCard {...card.problem} solution={card.solution.text} />
			{/each}
		</div>
	</div>
</section>

<!-- Vision Section -->
<section id="vision" class="py-24 md:py-32 relative">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
			<!-- Image Grid -->
			<div class="relative">
				<div class="grid grid-cols-2 gap-4">
					<img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-2xl mt-8 shadow-lg" alt="Community Hands">
					<img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-2xl shadow-lg" alt="Plants">
				</div>
				<!-- Decorative Circle -->
				<div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-pulse"></div>
				<div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-pulse animate-delay-1000 rotate-45"></div>
				<div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-pulse animate-delay-2000 rotate-90"></div>
        <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-pulse animate-delay-3000 rotate-135"></div>
			</div>

			<!-- Text -->
			<div>
				<h2 class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase mb-2">The Vision</h2>
				<h3 class="text-4xl md:text-5xl font-serif font-bold text-ecohubs-dark mb-6 leading-tight">
					A Living Blueprint for <br> <span class="text-gradient">Regenerative Life</span>
				</h3>
				<p class="text-gray-600 text-lg mb-6 leading-relaxed">
					Imagine communities designed like forests—resilient, diverse, and self-sustaining. Our unique blueprint approach combines ecological wisdom with decentralized governance, creating living systems that evolve through real-world practice.
				</p>
				<ul class="space-y-4">
					<li class="flex items-center gap-3 text-gray-700">
						<Sprout class="text-ecohubs-primary w-5 h-5" aria-hidden="true" />
						<span>Ecological Design & Permaculture</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<UsersRound class="text-ecohubs-primary w-5 h-5" aria-hidden="true" />
						<span>Participatory Culture & Governance</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<Repeat class="text-ecohubs-primary w-5 h-5" aria-hidden="true" />
						<span>Circular Community Economies</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<HeartHandshake class="text-ecohubs-primary w-5 h-5" aria-hidden="true" />
						<span>Strong Social Fabric & Conflict Resolution</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Technology That Serves Life -->
<section id="approach" class="py-24 md:py-32 relative bg-emerald-50/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Technology That Serves Life</h2>
			<p class="text-gray-600 max-w-2xl mx-auto mb-4">Technology can be extractive—but it can also unlock solutions that communities struggled with for generations. We use it consciously, choosing digital tools that strengthen transparency, cooperation, and ecological integrity.</p>
			<p class="text-ecohubs-primary font-medium max-w-xl mx-auto">Inspired by nature, we apply modern systems without becoming dependent on them. Technology supports life, not the other way around.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each approachCards as card, index (card.title)}
				<div class="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
					<div class="text-ecohubs-primary mb-4"><svelte:component this={card.icon} class="w-10 h-10" aria-hidden="true" /></div>
					<h4 class="text-xl font-bold text-gray-900 mb-2">{card.title}</h4>
					<p class="text-gray-500 text-sm leading-relaxed">{card.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Governance Section -->
<section id="governance" class="py-24 md:py-32 relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Power to the Community</h2>
			<p class="text-gray-600">Blockchain technology enables trust without hierarchy. Our DAO ecosystem ensures transparency and collective agency.</p>
		</div>

		<GovernanceSection features={governanceFeatures} />
	</div>
</section>

<!-- EcoToken Section -->
<section id="ecotoken" class="py-24 md:py-32 bg-white border-y border-gray-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div class="order-2 lg:order-1">
				<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-6">
					A Contribution Economy That <span class="text-ecohubs-accent">Rewards Real Work</span>
				</h2>
				<p class="text-gray-600 mb-8 text-lg">
					EcoToken rewards those who grow food, build infrastructure, care for others, teach
					workshops, or regenerate land.
				</p>

				<div class="space-y-6">
					{#each ecoTokenFeatures as feature (feature.title)}
						<EcoTokenFeature {...feature} />
					{/each}
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<img
					src="https://images.unsplash.com/photo-1660836815332-3f38535964d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJsb2NrY2hhaW4lMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww"
					class="rounded-3xl shadow-2xl organic-shape hover:rotate-1 transition-transform duration-700 object-cover h-96 w-full"
					alt="Green Growth"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Blueprint Section -->
<section id="blueprint" class="py-24 md:py-32 relative bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">
				Building the Future Together
		</h2>
			<p class="text-gray-600 max-w-2xl mx-auto">
				Our blueprint is an open-source, living document. It covers every aspect of regenerative
				community life.
			</p>
		</div>

		<!-- Masonry Layout -->
		<div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
			{#each blueprintCards as card (card.heading)}
				<BlueprintCard {...card} />
			{/each}
		</div>
	</div>
</section>

<!-- Community Hubs Section -->
<section id="hubs" class="py-24 md:py-32 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-6">From Vision to Reality</h2>
				<p class="text-gray-600 mb-6 text-lg">
					EcoHubs is not just a theory. We are establishing pilot hubs, to test and refine these models in the real world.
				</p>
				<ul class="space-y-4 mb-8">
					<li class="flex items-center gap-3 text-gray-700">
						<MapPin class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Pilot Sites</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<Share2 class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Shared Tools & Methods</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<Copy class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Scalable, Replicable Designs</span>
					</li>
				</ul>
				<a
					href="/join"
					class="px-6 py-3 bg-ecohubs-primary text-white rounded-xl font-medium hover:bg-ecohubs-dark hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Apply to Join Pilot Community"
			data-sveltekit-preload-data="hover"
		>
					Apply to Join Pilot Community <ArrowRight class="w-4 h-4" aria-hidden="true" />
				</a>
			</div>
			<div class="relative">
        <div class="grid grid-cols-2 gap-4 z-10 relative">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-2xl shadow-lg w-full h-48 object-cover transform translate-y-4" alt="Hub 1">
          <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-2xl shadow-lg w-full h-48 object-cover transform -translate-y-4" alt="Hub 2">
        </div>
        <!-- Decorative Circle -->
        <div class="absolute z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-spin-slow-80 animate-pulse"></div>
        <div class="absolute z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-spin-slow-80 animate-pulse rotate-45"></div>
        <div class="absolute z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-spin-slow-80 animate-pulse rotate-90"></div>
        <div class="absolute z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-ecohubs-primary/20 rounded-[100%] scale-110 animate-spin-slow-80 animate-pulse rotate-135"></div>
			</div>
		</div>
	</div>
</section>

<!-- Who Is This For Section -->
<section id="who-for" class="py-24 md:py-32 relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Are You Ready to Co-Create the Future?</h2>
			<p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">EcoHubs is for people who feel the old models no longer work, and who want to co-create regenerative communities rooted in ecology, cooperation, and transparent governance.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 who-for-cards">
			{#each personaCards as card (card.title)}
				<div class="glass-card p-6 rounded-2xl hover:bg-white/90 transition-all">
					<div class="w-12 h-12 {card.iconBg} rounded-xl flex items-center justify-center mb-4 {card.iconColor}">
						<svelte:component this={card.icon} class="w-6 h-6" aria-hidden="true" />
					</div>
					<h4 class="text-lg font-bold text-gray-900 mb-2">{card.title}</h4>
					<p class="text-gray-500 text-sm leading-relaxed">{card.description}</p>
				</div>
			{/each}
		</div>

		<!-- CTA Block -->
		<div class="mt-20 text-center who-for-cta">
			<div class="max-w-2xl mx-auto">
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a
						href="/join"
						class="px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Apply to Join the First 1000"
			data-sveltekit-preload-data="hover"
		>
						Apply to Join the First 1000
						<ArrowRight class="w-4 h-4" aria-hidden="true" />
					</a>
		<a
			href="/blueprint"
						class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-ecohubs-primary hover:text-ecohubs-primary hover:scale-105 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Read the Blueprint Overview"
			data-sveltekit-preload-data="hover"
		>
						Read the Blueprint Overview
						<BookOpen class="w-4 h-4" aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Founder Story Section -->
<section id="about" class="py-24 md:py-32 relative bg-emerald-50/30">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase mb-2">Who We Are</h2>
				<h3 class="text-4xl font-serif font-bold text-ecohubs-dark mb-6">People Follow Visionaries</h3>
				<p class="text-gray-600 mb-6 leading-relaxed">
					EcoHubs was founded by Stefan Lessle, a developer and systems thinker with 16 years of experience building digital platforms and decentralized tools. After a long journey through Europe and Latin America studying regenerative communities, he saw how many struggled with transparent governance and shared responsibility.
				</p>
				<p class="text-gray-600 mb-6 leading-relaxed">
					Now based in Ecuador, Stefan is dedicated to bridging ecology and technology—researching land, community dynamics, and regenerative practices while developing tools that help people live together with more trust, clarity, and cooperation. EcoHubs is not a hobby for him, but a lifelong commitment to designing healthier, human-scale ways of living.
				</p>
			</div>
			<div class="relative">
				<img src={StefanImage} class="rounded-2xl shadow-xl w-full h-96 object-cover organic-shape" alt="Founder">
				<div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
					<p class="text-sm font-bold text-gray-400 uppercase mb-1">Founder</p>
					<p class="text-lg font-serif font-bold text-gray-900">Stefan Lessle</p>
					<p class="text-xs text-gray-500 mt-1">Software Engineer & Community Designer</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- What Makes EcoHubs Different -->
<section id="different" class="py-24 md:py-32 relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">What Makes EcoHubs Different</h2>
			<p class="text-gray-600 max-w-2xl mx-auto">We're not just another DAO or ecovillage project. Here's what sets us apart.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each differentiatorCards as card, index (card.title)}
        {@const CardIcon = card.icon}
				<div class="p-8 bg-linear-to-br {card.gradientFrom} {card.gradientTo} rounded-2xl border border-{card.gradientFrom.split('-')[1]}-100">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-{card.gradientFrom.split('-')[1]}-500 rounded-xl flex items-center justify-center text-white">
							<CardIcon class="w-6 h-6" aria-hidden="true" />
						</div>
						<h4 class="text-xl font-bold text-gray-900">{card.title}</h4>
					</div>
					<p class="text-gray-600 leading-relaxed">{card.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Roadmap Section -->
<section id="roadmap" class="py-24 md:py-32 relative bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-4">Roadmap to First Community</h2>
			<p class="text-gray-600 max-w-2xl mx-auto">A clear path from vision to reality. Here's where we're heading.</p>
		</div>

		<div class="relative max-w-2xl mx-auto">
			<!-- Timeline Line -->
			<div class="absolute left-8 top-0 bottom-24 w-0.5 bg-linear-to-b from-ecohubs-primary to-ecohubs-dark hidden md:block"></div>

			<div class="space-y-12">
				{#each roadmapPhases as phase, index (phase.phase)}
					<div class="relative flex gap-8 items-start">
						<div class="shrink-0 w-16 h-16 {index === 0 ? 'bg-ecohubs-dark' : 'bg-ecohubs-primary'} rounded-full flex items-center justify-center text-white font-bold shadow-lg relative z-10">
							{phase.phase}
						</div>
						<div class="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
							<h4 class="text-xl font-bold text-gray-900 mb-2">{phase.title}</h4>
							<p class="text-gray-600 text-sm">{phase.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section id="join" class="py-24 md:py-32 relative overflow-hidden">
	<div class="absolute inset-0 bg-ecohubs-dark"></div>
	<!-- Organic texture overlay -->
	<div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
		<h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Become a Founding Member</h2>
		<p class="text-emerald-100 text-lg mb-4 max-w-2xl mx-auto">
			Help us shape the blueprint. Join a curated group of regenerative thinkers, builders, and creators.
		</p>
		<p class="text-emerald-200 text-sm mb-2">Already 120 applied</p>
		<p class="text-emerald-50 text-sm mb-10 max-w-xl mx-auto">
			We're looking for permaculturists, community builders, Web3 contributors, regenerative designers, and anyone committed to co-creating a better way to live together.
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-4">
			<a
				href="/join"
				class="px-8 py-4 bg-ecohubs-accent text-white font-bold rounded-xl hover:bg-white hover:text-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 hover:rotate-1 shadow-xl shadow-orange-900/20 hover:shadow-orange-900/40 focus-visible:ring-2 focus-visible:ring-orange-400"
				aria-label="Apply for Membership"
				data-sveltekit-preload-data="hover"
			>
				Apply for Membership
			</a>
			<a
				href="/vision"
				class="px-8 py-4 bg-transparent border-2 border-emerald-400 text-emerald-100 font-medium rounded-xl hover:bg-emerald-800 hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
				aria-label="Read the Manifesto"
				data-sveltekit-preload-data="hover"
			>
				Read the Manifesto
			</a>
		</div>
	</div>
</section>
