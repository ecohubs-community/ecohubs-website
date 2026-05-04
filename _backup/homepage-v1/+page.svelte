<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import BlueprintCard from '$lib/components/BlueprintCard.svelte';
  	import StefanImage from '$lib/assets/stefan.webp';
	import {
		Unlink,
		Lock,
		Users,
		ArrowRight,
		HeartHandshake,
		BookOpen,
		MapPin,
		Share2,
		Copy,
		Sprout,
		UsersRound,
		Repeat,
		TriangleAlert,
		Compass,
		Scale,
		Coins,
		ShieldAlert,
		Settings,
		RefreshCcw,
		Leaf,
		FileText
	} from 'lucide-svelte';
	import WhyCard from '$lib/components/WhyCard.svelte';
	import BoxInfoCard from '$lib/components/BoxInfoCard.svelte';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import ColoredCard from '$lib/components/ColoredCard.svelte';
	import Faq from '$lib/components/Faq.svelte';

	// FAQ Data
	const homeFaq = [
		{
			question: 'What is EcoHubs?',
			answer: 'EcoHubs is an **online community** collaborating on an open-source blueprint for regenerative communities. We bring together permaculturists, community builders, developers, and regenerative thinkers to co-create better ways of living together.'
		},
		{
			question: 'Is EcoHubs a physical community or ecovillage?',
			answer: 'Not yet. Right now, EcoHubs is an **online-first community**. We are collaborating on the blueprint (RCOS) together. In the future, we plan to apply it through pilot projects at new or existing communities.'
		},
		{
			question: 'What is the Blueprint (RCOS)?',
			answer: 'The Blueprint, formally called **RCOS** (Regenerative Community Operating System), is a shared, open standard that helps communities make their structure explicit: how decisions are made, how people join and leave, how resources are managed, and how the community evolves over time.'
		},
		 {
			question: "How is EcoHubs funded?",
			answer: "EcoHubs uses a **hybrid funding model** designed to stay aligned with its regenerative and non-speculative principles.\n\nCurrent and planned funding sources include:\n\n- **Grants** from foundations, Web3 ecosystems, and impact organizations  \n- **Private funding** (currently covering core costs such as hosting and domain expenses)  \n- **Community contributions** (time, skills, and resources)  \n- **Partnerships and collaborations** with aligned projects  \n- **Future revenue streams**, such as onboarding support, tools, or educational programs\n\nThe goal is to fund development without relying on extractive or purely profit-driven models, while maintaining **transparency and alignment with community values**."
		},
		{
			question: "Can I donate to EcoHubs?",
			answer: "Yes — EcoHubs welcomes support from people who resonate with the vision.\n\nDonations help fund:\n\n- Development of the open-source platform and blueprint  \n- Coordination and community-building efforts  \n- Pilot hubs and real-world implementation  \n- Ongoing operational costs (currently also supported through private funding, such as hosting and domain expenses)\n\nAs the project evolves, clearer donation channels and transparency mechanisms (e.g. public tracking of funds) are being established.\n\nIf you're interested in contributing, you can also support EcoHubs through:\n- **Time and skills**  \n- **Collaboration or partnerships**  \n- **Helping grow the community**\n\nFinancial support is just one of many valuable ways to contribute."
		},
		{
			question: 'How can I get involved?',
			answer: 'You can [apply for membership](/membership) and join our online community. Members contribute through research, writing, design, development, facilitation, and more. Every contribution shapes the blueprint.'
		},
		{
			question: "Is EcoHubs a real project or just an idea / vision?",
			answer: "EcoHubs is not just a conceptual vision. It is structured as a phased initiative moving from **community formation → blueprint development → real-world pilot hubs**.\n\nThe project explicitly states that physical pilot communities will be launched to **test, refine, and validate the model in real conditions**, with all learnings fed back into the open-source blueprint.\n\nThis means:\n- The current phase is **co-creation and coordination**\n- The goal is **real-world implementation**, not just theory\n- The blueprint evolves through **practice, not speculation**"
		},
		{
			question: "Is this just another crypto/DAO project trying to use blockchain for everything?",
			answer: "No. While EcoHubs uses blockchain-based tools, it is **not a speculative crypto project**.\n\nKey distinctions:\n- Tokens are **non-transferable and non-speculative**\n- They are used to **recognize contributions**, not to generate profit\n- Governance focuses on **transparency and participation**, not financialization\n\nBlockchain is treated as **infrastructure for coordination and trust**, not as the core purpose of the project."
		},
		
		{
			question: "How is this different from existing ecovillages or intentional communities?",
			answer: "EcoHubs differentiates itself in three main ways:\n\n1. **Open-source blueprint**  \n   Most communities operate with implicit or undocumented systems. EcoHubs aims to document everything transparently so it can be replicated and improved.\n\n2. **Integrated systems design**  \n   It combines ecology, governance, economy, and culture into a **single coherent system**, rather than treating them separately.\n\n3. **Digital coordination layer**  \n   It uses tools (DAO, forums, apps) to enable **scalable collaboration and shared learning across communities**.\n\nThe goal is not just to build one community, but to create a **replicable model for many**."
		},
		{
			question: "Is the goal to replace existing society or to create an alternative within it?",
			answer: "EcoHubs does not position itself as a replacement for society, but as a **parallel model** that can evolve and expand.\n\nIt focuses on:\n- Prototyping **regenerative ways of living**\n- Demonstrating viable alternatives\n- Allowing gradual adoption and adaptation\n\nThis approach avoids ideological confrontation and instead focuses on **practical, working examples**."
		},
		{
			question: "How do people earn a living in an EcoHubs community?",
			answer: "EcoHubs envisions a **hybrid economic model**:\n\n- **Internal contribution economy** (EcoTokens): recognizing work inside the community\n- **External income** (USD or local currencies): through remote work, services, or local production\n\nThe system is designed to:\n- Reduce dependence on extractive systems over time\n- Enable **local circular economies**\n- Transition gradually rather than requiring immediate full self-sufficiency"
		},
		// {
		// 	question: "What prevents this from becoming chaotic or poorly governed?",
		// 	answer: "EcoHubs emphasizes **structured governance design**, not informal consensus.\n\nKey elements include:\n- Transparent decision-making systems (DAO-based voting)\n- Defined roles and permissions based on contribution\n- Deliberation processes before decisions\n- Built-in conflict resolution and social frameworks\n\nThe intention is to balance:\n- **Clarity and structure**\n- **Human flexibility and dialogue**"
		// },
		{
			question: "Is this only for idealistic people, or is it practical and grounded?",
			answer: "While the vision is ambitious, the approach is intentionally practical:\n\n- Focus on **tested regenerative practices** (permaculture, water systems, energy systems)\n- Real-world pilot hubs to validate ideas\n- Incremental development rather than instant perfection\n\nThe project explicitly acknowledges that many past communities failed due to lack of structure, and aims to **address those gaps systematically**."
		}
	];

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
				text: 'Our blueprint (RCOS - Regenerative Community Operating System) shows how communities can become net-positive for ecosystems.'
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
				text: 'DAO (Decentralized Autonomous Organization) governance returns power to communities through transparent, auditable systems.'
			}
		}
	];

	// Technology That Serves Life Data
	const approachCards = [
		{
			icon: "tabler:microscope",
			title: 'Community-Led Research',
			description:
				"Our blueprint (RCOS) grows from practice. Every pilot project becomes a living laboratory where solutions are tested, refined, and shared."
		},
		{
			icon: "tabler:affiliate",
			title: 'Collaborative Evolution',
			description:
				'Like a mycelial network, our intelligence expands through connection. The blueprint (RCOS) is open-source, shaped by everyone who contributes.'
		},
		{
			icon: "tabler:plant-2",
			title: 'Systems Thinking',
			description:
				"We design communities as whole systems—where housing, food, water, energy, and culture work together as a resilient living ecosystem."
		}
	];

	// Blueprint Cards Data
	const blueprintCards = [
		 {
			image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Purpose and Scope",
			Icon: Compass,
			iconBg: "bg-stone-500",
			heading: "Purpose & Scope",
			subheading: "RCOS Layer 0",
			description: "Defines why the community exists, what is governed, and which invariants cannot be violated. This layer prevents hidden ideology, scope creep, and informal power from shaping the system.",
			gradientFrom: "from-stone-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Membership",
			Icon: Users,
			iconBg: "bg-indigo-500",
			heading: "Membership",
			subheading: "RCOS Layer 1",
			description: "Makes membership explicit: how people join, participate, change status, and exit. Rights and obligations are symmetrical and legible, so belonging never depends on informal approval.",
			gradientFrom: "from-indigo-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Governance",
			Icon: Scale,
			iconBg: "bg-blue-500",
			heading: "Governance",
			subheading: "RCOS Layer 2",
			description: "Defines how decisions are made, who can decide what, and how authority is constrained. Governance power is explicit, reviewable, and never derived from charisma or status.",
			gradientFrom: "from-blue-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1662078907809-b9e486757a0a?q=80&w=1470&auto=format&fit=crop",
			imageAlt: "Economy",
			Icon: Coins,
			iconBg: "bg-emerald-500",
			heading: "Economy & Resources",
			subheading: "RCOS Layer 3",
			description: "Clarifies how value flows inside the community: commons vs private resources, contributions, internal economies, and treasury rules. Prevents invisible labor and economic power accumulation.",
			gradientFrom: "from-emerald-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1626447269096-f8665509589c?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Conflict and Accountability",
			Icon: ShieldAlert,
			iconBg: "bg-red-500",
			heading: "Conflict & Accountability",
			subheading: "RCOS Layer 4",
			description: "Defines how conflicts are handled, repaired, and escalated. Provides due process, safety safeguards, and accountability without relying on informal exclusion or silence.",
			gradientFrom: "from-red-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Operations",
			Icon: Settings,
			iconBg: "bg-amber-500",
			heading: "Operations & Coordination",
			subheading: "RCOS Layer 5",
			description: "Makes daily work possible without burnout: roles, meetings, documentation, and workload boundaries. Coordination is explicit so the system does not depend on heroics.",
			gradientFrom: "from-amber-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Evolution",
			Icon: RefreshCcw,
			iconBg: "bg-purple-500",
			heading: "Evolution & Adaptation",
			subheading: "RCOS Layer 6",
			description: "Defines how the system evolves over time through versioning, experiments, and learning. Change is possible, but always constrained, reversible, and documented.",
			gradientFrom: "from-purple-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1470&auto=format&fit=crop",
			imageAlt: "Modules",
			Icon: Leaf,
			iconBg: "bg-green-500",
			heading: "Modules",
			subheading: "Applied Domains",
			description: "Permaculture, education, housing, energy, culture, and more. Modules extend RCOS into real-world domains without changing the core rules of the system.",
			gradientFrom: "from-green-900/60",
			gradientTo: "to-transparent"
		},
		{
			image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
			imageAlt: "Blueprint",
			Icon: FileText,
			iconBg: "bg-emerald-500",
			heading: "Explore the Blueprint",
			subheading: "RCOS in Practice",
			description: "The Blueprint is the applied view of RCOS: core layers, modules, artifacts, and stress tests. Open, evolving, and designed to be adapted by real communities.",
			link: "/blueprint",
			variant: 'cta',
			gradientFrom: "from-emerald-900/60",
			gradientTo: "to-transparent"
		}
	];

	// Who Is This For Data
	const personaCards = [
		{
			icon: "tabler:flower",
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			title: 'Regenerative Thinkers',
			description:
				"Permaculturists, ecologists, and land stewards seeking community models that honor nature's patterns."
		},
		{
			icon: "tabler:users",
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			title: 'Community Builders',
			description:
				"Those who've dreamed of intentional communities but lacked the tools and blueprint to make it real."
		},
		{
			icon: "tabler:code",
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			title: 'Web3 Contributors',
			description:
				'Builders interested in using blockchain for governance, transparency, and regenerative impact.'
		},
		{
			icon: "tabler:bulb",
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			title: 'Climate Innovators',
			description:
				'Those seeking systemic solutions beyond individual actions—community-scale regeneration.'
		},
		{
			icon: "tabler:heart",
			iconColor: 'text-teal-600',
			iconBg: 'bg-teal-50',
			title: 'Cultural Pioneers',
			description:
				'Early believers in new models for living—collaborative, open-minded, visionary.'
		},
		{
			icon: "tabler:compass",
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
			icon: "tabler:file-code",
			title: 'Open-Source Blueprint',
			description:
				"Unlike proprietary models, our blueprint is fully open-source. Anyone can use, adapt, and improve it. No gatekeeping.",
			gradientFrom: 'from-emerald-50',
			gradientTo: 'to-teal-50'
		},
		{
			icon: "tabler:network",
			title: 'Tech + Ecology Fusion',
			description:
				"We don't choose between nature and technology. We use transparent, decentralized tools for fairness and trust, while staying grounded in ecological principles.",
			gradientFrom: 'from-blue-50',
			gradientTo: 'to-indigo-50'
		},
		{
			icon: "tabler:flask",
			title: 'Real-World Testing',
			description:
				"We're not just theorizing. Pilot projects will test and refine every aspect of the blueprint before scaling globally.",
			gradientFrom: 'from-purple-50',
			gradientTo: 'to-pink-50'
		},
		{
			icon: "tabler:users",
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
				'Gather the first 150 aligned members, establish shared values, and co-create the foundation of the EcoHubs blueprint.'
		},
		{
			phase: 2,
			title: 'Blueprint Development & DAO Governance',
			description:
				'Design and refine the open-source blueprint together—covering ecology, governance, architecture, education, and culture—while launching the DAO and governance framework.'
		},
		{
			phase: 3,
			title: 'Pilot Projects',
			description:
				'Apply the blueprint through pilot projects at new or existing regenerative communities, test it in real conditions, refine it together, and document everything openly for global replication.'
		}
	];
</script>

<SEO
	title="EcoHubs.community - A Regenerative Future Designed Together"
	description="Join EcoHubs.community in co-creating the world's first open-source blueprint for regenerative communities. Be part of the first 150."
	ogImage="/og-home.jpg"
	breadcrumbs={[{ name: 'Home', url: 'https://ecohubs.community' }]}
	faq={homeFaq}
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
					<img 
						src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
						srcset="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 400w, https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 687w"
						sizes="(max-width: 768px) 50vw, 343px"
						width="687"
						height="458"
						class="rounded-2xl mt-8 shadow-lg" 
						alt="Community Hands"
						loading="lazy"
					>
					<img 
						src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
						srcset="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 400w, https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 687w"
						sizes="(max-width: 768px) 50vw, 343px"
						width="687"
						height="458"
						class="rounded-2xl shadow-lg" 
						alt="Plants"
						loading="lazy"
					>
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
				<ul class="space-y-4 mb-8">
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
				<a
					href="/vision"
					class="inline-flex items-center gap-2 text-ecohubs-primary font-medium hover:text-ecohubs-dark transition-colors focus-visible:ring-2 focus-visible:ring-green-400 rounded"
					data-sveltekit-preload-data="hover"
				>
					Learn more about our vision
					<ArrowRight class="w-4 h-4" aria-hidden="true" />
				</a>
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
			{#each approachCards as card}
				<BoxInfoCard {...card} />
			{/each}
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
				The <a href="https://blueprint.ecohubs.community">Blueprint</a>, formally called RCOS (Regenerative Community Operating System), is the main deliverable of EcoHubs. 
				It is a shared, open standard that helps communities make their structure explicit: how decisions are made, how people join and leave, how resources are managed, how conflicts are handled, and how the community evolves over time. 
				The goal is not to impose a single way of living, but to provide a clear, modular system that communities can adapt, test, and improve together.
			</p>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each blueprintCards as card (card.heading)}
				<BlueprintCard {...card} variant={card.variant as 'default' | 'cta' | undefined} />
			{/each}
		</div>

		<!-- Blueprint CTAs -->
		<div class="mt-16 text-center">
			<p class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase mb-4">Our First Tangible Outcome</p>
			<p class="text-gray-600 max-w-xl mx-auto mb-8">
				The Blueprint is the first real result of our collaborative work — an evolving, open-source document shaped by the community.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/blueprint"
					class="px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Explore the Blueprint Overview"
					data-sveltekit-preload-data="hover"
				>
					Explore the Blueprint
					<BookOpen class="w-4 h-4" aria-hidden="true" />
				</a>
				<a
					href="https://blueprint.ecohubs.community"
					target="_blank"
					rel="noopener noreferrer"
					class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-ecohubs-primary hover:text-ecohubs-primary hover:scale-105 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Read the full Blueprint"
				>
					Read the Full Blueprint
					<ArrowRight class="w-4 h-4" aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- From Vision to Reality Section -->
<section id="from-vision" class="py-24 md:py-32 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-4xl font-serif font-bold text-ecohubs-dark mb-6">From Vision to Reality</h2>
				<p class="text-gray-600 mb-6 text-lg">
					EcoHubs is not just a theory. Today, we collaborate online — co-creating the blueprint, building tools, and growing a community of contributors. In the future, we plan to apply our blueprint through pilot projects at new or existing communities.
				</p>
				<ul class="space-y-4 mb-8">
					<li class="flex items-center gap-3 text-gray-700">
						<Share2 class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Online Collaboration & Shared Tools</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<Copy class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Scalable, Replicable Designs</span>
					</li>
					<li class="flex items-center gap-3 text-gray-700">
						<MapPin class="text-ecohubs-accent w-5 h-5" aria-hidden="true" />
						<span>Future Pilot Projects at Real Communities</span>
					</li>
				</ul>
				<a
					href="/membership"
					class="px-6 py-3 bg-ecohubs-primary text-white rounded-xl font-medium hover:bg-ecohubs-dark hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-green-400"
					aria-label="Become a Member"
					data-sveltekit-preload-data="hover"
				>
					Become a Member <ArrowRight class="w-4 h-4" aria-hidden="true" />
				</a>
			</div>
			<div class="relative">
        <div class="grid grid-cols-2 gap-4 z-10 relative">
          <img 
						src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
						srcset="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 400w, https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1170w"
						sizes="(max-width: 768px) 50vw, 585px"
						width="1170"
						height="780"
						class="rounded-2xl shadow-lg w-full h-48 object-cover transform translate-y-4" 
						alt="Hub 1"
						loading="lazy"
					>
          <img 
						src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
						srcset="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 400w, https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w, https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1170w"
						sizes="(max-width: 768px) 50vw, 585px"
						width="1170"
						height="780"
						class="rounded-2xl shadow-lg w-full h-48 object-cover transform -translate-y-4" 
						alt="Hub 2"
						loading="lazy"
					>
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
				<PersonaCard {...card} />
			{/each}
		</div>

		<!-- CTA Block -->
		<div class="mt-20 text-center who-for-cta">
			<div class="max-w-2xl mx-auto">
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a
						href="/membership"
						class="px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Become a Member"
						data-sveltekit-preload-data="hover"
					>
						Become a Member
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
				<img 
					src={StefanImage} 
					width="800"
					height="600"
					class="rounded-2xl shadow-xl w-full h-96 object-cover organic-shape" 
					alt="Founder"
					loading="lazy"
				>
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
       <ColoredCard	 {...card} />
			{/each}
		</div>
	</div>
</section>

<!-- FAQ Section -->
<Faq title="Frequently Asked Questions" items={homeFaq} />

<!-- Roadmap Section -->
<section id="roadmap" class="py-16 md:py-24 lg:py-32 relative bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-10 md:mb-16">
			<h2 class="text-3xl md:text-4xl font-serif font-bold text-ecohubs-dark mb-4">Our Roadmap</h2>
			<p class="text-gray-600 max-w-2xl mx-auto">A clear path from vision to reality. Here's where we're heading.</p>
		</div>

		<div class="relative max-w-2xl mx-auto">
			<!-- Timeline Line - visible on md and up -->
			<div class="absolute left-4 md:left-8 top-0 bottom-20 w-0.5 bg-linear-to-b from-ecohubs-primary to-ecohubs-dark hidden md:block"></div>

			<div class="space-y-6 md:space-y-12">
				{#each roadmapPhases as phase, index (phase.phase)}
					<!-- Mobile Layout: Stacked -->
					<div class="md:hidden">
						<div class="flex items-center gap-3 mb-3">
							<div class="shrink-0 w-10 h-10 {index === 0 ? 'bg-ecohubs-dark' : 'bg-ecohubs-primary'} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
								{phase.phase}
							</div>
							<h4 class="text-base font-bold text-gray-900">{phase.title}</h4>
						</div>
						<div class="ml-[52px] bg-white p-4 rounded-xl shadow-sm border border-gray-100">
							<p class="text-gray-600 text-sm">{phase.description}</p>
						</div>
					</div>

					<!-- Desktop Layout: Side by side -->
					<div class="hidden md:flex relative gap-8 items-start">
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
		<!-- <p class="text-emerald-200 text-sm mb-2">Already 120 applied</p> -->
		<p class="text-emerald-50 text-sm mb-10 max-w-xl mx-auto">
			We're looking for permaculturists, community builders, Web3 contributors, regenerative designers, and anyone committed to co-creating a better way to live together.
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-4">
			<a
				href="/membership"
				class="px-8 py-4 bg-ecohubs-accent text-white font-bold rounded-xl hover:bg-white hover:text-ecohubs-dark transition-all transform hover:-translate-y-1 hover:scale-105 hover:rotate-1 shadow-xl shadow-orange-900/20 hover:shadow-orange-900/40 focus-visible:ring-2 focus-visible:ring-orange-400"
				aria-label="Become a Member"
				data-sveltekit-preload-data="hover"
			>
				Become a Member
			</a>
			<a
				href='/EcoHubs_Manifesto.pdf'
				target="_blank"
				class="px-8 py-4 bg-transparent border-2 border-emerald-400 text-emerald-100 font-medium rounded-xl hover:bg-emerald-800 hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
				aria-label="Read the Manifesto"
				data-sveltekit-preload-data="hover"
			>
				Read the Manifesto
			</a>
		</div>
	</div>
</section>

