<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import NetworkOfHubsImage from '$lib/assets/network-regenerative-ecohubs.webp';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import { spring } from 'svelte/motion';
  import { fade, fly, scale } from 'svelte/transition';
  import { cubicOut, cubicInOut } from 'svelte/easing';
	import Icon from '@iconify/svelte';

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


  // --- Configuration ---
  const features = [
    {
      title: "Resilience through decentralization",
      desc: "Each EcoHub operates independently. If one fails, the network continues and learns.",
      icon: "tabler:refresh",
      color: "bg-emerald-100 text-emerald-600",
      border: "group-hover:border-emerald-500",
      mode: "resilience"
    },
    {
      title: "Shared knowledge & tools",
      desc: "Practices, mistakes, and improvements flow between hubs through a shared commons.",
      icon: "tabler:arrows-exchange",
      color: "bg-indigo-100 text-indigo-600",
      border: "group-hover:border-indigo-500",
      mode: "connectivity"
    },
    {
      title: "Local adaptation",
      desc: "Each hub responds to its climate, culture, and constraints — no one-size-fits-all model.",
      icon: "tabler:map-pin",
      color: "bg-amber-100 text-amber-600",
      border: "group-hover:border-amber-500",
      mode: "adaptation"
    },
    {
      title: "Faster learning cycles",
      desc: "Many parallel experiments accelerate learning far beyond a single project.",
      icon: "tabler:bolt",
      color: "bg-teal-100 text-teal-600",
      border: "group-hover:border-teal-500",
      mode: "speed"
    },
    {
      title: "Reduced systemic risk",
      desc: "Failure becomes information — not collapse — when risk is distributed.",
      icon: "tabler:circle-check",
      color: "bg-rose-100 text-rose-600",
      border: "group-hover:border-rose-500",
      mode: "risk"
    }
  ];

	// --- State ---
  let activeFeatureIndex = $state(0);
  let viewMode = $state('network'); // 'network' | 'monolith'
  let activeChallengeIndex: number | null = $state(null);

  // --- Node Physics (Svelte Springs) ---
  // We simulate 7 nodes. Monolith = all at center. Network = distributed.
  const networkPositions = [
    { x: 50, y: 50 }, // Center
    { x: 20, y: 30 }, { x: 80, y: 30 }, // Top corners
    { x: 20, y: 70 }, { x: 80, y: 70 }, // Bottom corners
    { x: 15, y: 50 }, { x: 85, y: 50 }  // Sides
  ];

  const coords = spring(
    networkPositions.map(() => ({ x: 50, y: 50 })), 
    { stiffness: 0.1, damping: 0.4 }
  );

  // --- Reactivity ---
  $effect(() => {
    if (viewMode === 'monolith') {
      // Collapse all to center
      coords.set(networkPositions.map(() => ({ x: 50, y: 50 })));
    } else {
      // Spread out
      coords.set(networkPositions);
    }
  });

  function setActive(index: number) {
    activeFeatureIndex = index;
    // Auto-switch to network view if user interacts with features
    if (viewMode === 'monolith') viewMode = 'network';
  }

	// --- Data ---
  const values = [
    {
      title: "Regeneration over extraction",
      statement: "Heal the land and community faster than we take from it.",
      icon: "tabler:leaf",
      colorTheme: "emerald"
    },
    {
      title: "Cooperation over competition",
      statement: "We are stronger together through shared resources and collective goals.",
			icon: "tabler:heart-handshake",
      colorTheme: "indigo"
    },
    {
      title: "Transparency and shared governance",
      statement: "Open decisions and collective ownership build lasting trust.",
			icon: "tabler:book",
      colorTheme: "sky"
    },
    {
      title: "Learning through experimentation",
      statement: "Embrace small failures as necessary steps toward major insights.",
			icon: "tabler:flask-2",
      colorTheme: "amber"
    },
    {
      title: "Inclusion and responsibility",
      statement: "Every local voice matters, and everyone has a role to play in the whole.",
			icon: "tabler:users-group",
      colorTheme: "rose"
    }
  ];

  // --- State ---
  let hoveredIndex: number | null = $state(null);

  // --- Helpers for dynamic Tailwind classes ---
  type ColorTheme = 'emerald' | 'indigo' | 'sky' | 'amber' | 'rose';
  
  function getThemeStyles(theme: string, isHovered: boolean) {
    const stylesMap: Record<ColorTheme, { bg: string, text: string, border: string }> = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
      sky:    { bg: 'bg-sky-100',    text: 'text-sky-700',    border: 'border-sky-200' },
      amber:  { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200' },
      rose:   { bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-200' },
    };
    
    const styles = stylesMap[theme as ColorTheme] || stylesMap.emerald;

    if (isHovered) return `${styles.bg} ${styles.text} ${styles.border}`;
    return `bg-stone-100 text-stone-500 border-transparent`;
  }

	// --- Data ---
  const challenges = [
    {
      problem: "Ecological degradation",
      detail: "Soil depletion and biodiversity loss threaten the systems that sustain us.",
      response: "Regenerative stewardship",
      responseDetail: "We don't just sustain; we heal the land, restoring soil health and local ecosystems.",
      icon: "tabler:leaf",
    },
    {
      problem: "Fragile centralized systems",
      detail: "Global supply chains break easily under stress, leaving communities vulnerable.",
      response: "Local resilience",
      responseDetail: "Decentralized production of food, energy, and water ensures stability when big systems fail.",
      icon: "tabler:building-community",
    },
    {
      problem: "Social fragmentation",
      detail: "Rising loneliness and a lack of 'third places' have eroded our sense of belonging.",
      response: "Radical connection",
      responseDetail: "EcoHubs serve as physical community anchors where meaningful relationships are forged.",
      icon: "tabler:users-group",
    },
    {
      problem: "Loss of agency",
      detail: "Communities have lost the knowledge and tools to solve their own problems.",
      response: "Open knowledge",
      responseDetail: "Re-skilling and open-source technology give people the power to build and repair.",
      icon: "tabler:bulb",
    },
    {
      problem: "Cost of living pressure",
      detail: "Housing and food insecurity are rising as the gap between costs and wages grows.",
      response: "Shared abundance",
      responseDetail: "Pooling resources and cooperative living models drastically reduce individual overhead.",
      icon: "tabler:coin",
    }
  ];

	// --- Data ---
  const stepsHowTo = [
    {
      id: 1,
      title: "Shared Blueprint",
      desc: "Create an open, evolving blueprint covering land use, governance, culture, economics, and community design.",
      color: "text-emerald-600",
      bg: "bg-emerald-500",
      border: "border-emerald-200",
      icon: `tabler:layout-board` // Layout/Blueprint
    },
    {
      id: 2,
      title: "Pilot EcoHubs",
      desc: "Launch small, real-world EcoHubs to test ideas under real ecological, social, and economic constraints.",
      color: "text-indigo-600",
      bg: "bg-indigo-500",
      border: "border-indigo-200",
      icon: `tabler:shield-check` // Shield/Pilot
    },
    {
      id: 3,
      title: "Document Reality",
      desc: "Capture what works and what fails — transparently — through shared documentation and open knowledge.",
      color: "text-amber-600",
      bg: "bg-amber-500",
      border: "border-amber-200",
      icon: `tabler:file-text` // File/Doc
    },
    {
      id: 4,
      title: "Improve Blueprint",
      desc: "Feed lived experience back into the blueprint, refining patterns, tools, and practices.",
      color: "text-teal-600",
      bg: "bg-teal-500",
      border: "border-teal-200",
      icon: `tabler:adjustments` // Wrench/Tool
    },
    {
      id: 5,
      title: "Replicate Locally",
      desc: "Enable new EcoHubs to adapt and fork the blueprint to their own climate, culture, and needs.",
      color: "text-rose-600",
      bg: "bg-rose-500",
      border: "border-rose-200",
      icon: `tabler:share` // Share/Fork
    },
    {
      id: 6,
      title: "Learn in Loops",
      desc: "The network evolves continuously through feedback loops, compounding resilience over time.",
      color: "text-sky-600",
      bg: "bg-sky-500",
      border: "border-sky-200",
      icon: `tabler:repeat` // Loop
    }
  ];

  // --- State (Runes) ---
  let activeHowToIndex = $state(0);
  let isPaused = $state(false);
  let rotationDeg = $derived(activeHowToIndex * 60); // 6 steps = 60 degrees each
  let interval: NodeJS.Timeout;
	let intervalProgressInterval: NodeJS.Timeout;
	let elapsedTime = $state(0); // Time elapsed in current step (in milliseconds)

  // --- Logic ---
  const nextStep = () => {
    activeHowToIndex = (activeHowToIndex + 1) % stepsHowTo.length;
		elapsedTime = 0; // Reset elapsed time when step changes
  };

  const setStepHowTo = (index: number) => {
    activeHowToIndex = index;
		elapsedTime = 0; // Reset elapsed time when user manually changes step
    isPaused = true; // Pause auto-play on user interaction
  };

  const resumeTimer = () => {
    isPaused = false;
  };

	const intervalTime = 5000;
	const totalTime = intervalTime * stepsHowTo.length; // Total time for full cycle
	
	// Calculate total progress percentage
	let totalProgress = $derived(() => {
		const currentStepProgress = activeHowToIndex * intervalTime + elapsedTime;
		return (currentStepProgress / totalTime) * 100;
	});

  // Timer Effect
  $effect(() => {
    if (!isPaused) {
      interval = setInterval(nextStep, intervalTime);
      intervalProgressInterval = setInterval(() => {
				// Increment elapsed time by 100ms (the interval update frequency)
				elapsedTime = Math.min(elapsedTime + 100, intervalTime);
      }, 100);
    }
    return () => {
      clearInterval(interval);
      clearInterval(intervalProgressInterval);
    };
  });

	// --- Data: The Layers of the Blueprint ---
  const layers = [
    {
      id: 'governance',
      title: 'Governance',
      subtitle: 'Decision Making & Ownership',
      icon: `tabler:scale`, // Landmark/Gov
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      gradient: 'from-indigo-500 to-violet-500',
      description: "Tools for sociocracy, stewardship roles, and decision transparency that ensure power remains distributed.",
      tags: ['Sociocracy', 'Stewardship Roles', 'Decision Transparency', 'Transparent Governance']
    },
    {
      id: 'food',
      title: 'Food Systems',
      subtitle: 'Regenerative Agriculture',
      icon: `tabler:plant`, // Shield/Plant-ish
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      gradient: 'from-emerald-500 to-green-500',
      description: "Regenerative agriculture practices, local food sovereignty, and soil health management that nourish the community and the ecosystem.",
      tags: ['Regenerative Systems', 'Local Food Sovereignty', 'Soil Health']
    },
    {
      id: 'buildings',
      title: 'Infrastructure',
      subtitle: 'Housing & Energy',
      icon: `tabler:home-2`,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      gradient: 'from-amber-500 to-orange-500',
      description: "Ecological building designs, low-impact housing, and resilient infrastructure that enhance community resilience and reduce environmental impact.",
      tags: ['Ecological Building', 'Low-Impact Housing', 'Resilient Infrastructure']
    },
    {
      id: 'economy',
      title: 'Economy',
      subtitle: 'Circularity & Exchange',
      icon: `tabler:coins`,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      gradient: 'from-rose-500 to-pink-500',
      description: "Models for internal currencies, co-op businesses, and shared value creation that keeps wealth local and reinforces community resilience.",
      tags: ['Local Value Flows', 'Contribution-Based Rewards', 'Shared Ownership', 'Circular Economy']
    },
    {
      id: 'culture',
      title: 'Culture',
      subtitle: 'Art & Connection',
      icon: `tabler:heart-handshake`,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      gradient: 'from-sky-500 to-blue-500',
      description: "Cultural practices, rituals, and conflict resolution strategies that strengthen community cohesion.",
      tags: ['Community Care', 'Belonging Practices', 'Conflict Resolution', 'Cultural Vitality']
    },
    {
      id: 'education',
      title: 'Education',
      subtitle: 'Lifelong Learning',
      icon: `tabler:book`,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      gradient: 'from-teal-500 to-cyan-500',
      description: "Learning in small, intergenerational groups guided by curiosity, self-direction, and collaboration — integrating academics, life skills, and inner development.",
      tags: ['Self-Directed Learning', 'Intergenerational Learning', 'Holistic Education', 'System Thinking']
    }
  ];

  // --- State (Runes) ---
  let activeLayersIndex = $state(0);
  let activeLayer = $derived(layers[activeLayersIndex]);

  // --- Handlers ---
  const selectLayer = (index: number) => {
    activeLayersIndex = index;
  };

	let isInvitationHovered = $state(false);

  const invitations = [
    {
      action: 'Contribute',
      description: 'Share your expertise in ecology, tech, or governance to refine the Blueprint.',
      icon: `tabler:hand-rock`,
      color: 'hover:border-emerald-500 hover:bg-emerald-50/30',
			bgColor: 'bg-emerald-50/30'
    },
    {
      action: 'Learn',
      description: 'Dive into our open library of patterns, case studies, and failure reports.',
      icon: `tabler:book`,
      color: 'hover:border-sky-500 hover:bg-sky-50/30',
			bgColor: 'bg-sky-50/30'
    },
    {
      action: 'Participate',
      description: 'Join a local pilot or visit an existing EcoHub to experience the reality.',
      icon: `tabler:map-pin`,
      color: 'hover:border-amber-500 hover:bg-amber-50/30',
			bgColor: 'bg-amber-50/30'
    },
    {
      action: 'Co-Create',
      description: 'Start a new fork of the Blueprint for your own land or community group.',
      icon: `tabler:tree`,
      color: 'hover:border-rose-500 hover:bg-rose-50/30',
			bgColor: 'bg-rose-50/30'
    }
  ];

</script>

<SEO
	title="Vision – EcoHubs.community"
	description="A vision for a global network of small, regenerative EcoHubs — human-scale communities living in alignment with nature and cooperation."
	ogImage="/og-vision.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Vision', url: 'https://ecohubs.community/vision' }
	]}
/>

<!-- HERO: THE END RESULT -->
<Section spacing="xl" columns={2}>
	<div>
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-6">
			Vision of the Future
		</div>
		<h1 class="font-serif text-4xl font-bold leading-tight text-ecohubs-dark sm:text-5xl">
			A Network of <span class="text-gradient">Regenerative EcoHubs</span>
		</h1>

		<p class="mt-6 text-lg leading-relaxed text-gray-600">
			We envision a growing network of small, human-scale communities — EcoHubs — designed
			to regenerate land, culture, and livelihoods through cooperation and shared responsibility.
		</p>

		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Each EcoHub is deeply adapted to its local ecology and culture, while remaining connected
			to a shared global commons that accelerates learning, resilience, and regeneration.
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

	<div>
		<div
			class="relative h-100 w-full rounded-xl border border-border-subtle"
		>
			<img src={NetworkOfHubsImage} alt="Network of regenerative EcoHubs" class="rounded-3xl shadow-2xl organic-shape-pebble-animated hover:rotate-1 transition-transform duration-700 object-cover h-96 w-full" loading="lazy" />
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
			An EcoHub is a small, place-based community where people live, work, and learn together
			while actively regenerating the ecosystems they depend on.
		</p>

		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			EcoHubs are intentionally human-scale. They are neither isolated communes nor rigid
			blueprints, but living systems shaped by local context, shared values, and real-world
			constraints.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each visionCards as card}
			<PersonaCard {...card} />
		{/each}
	</div>
</Section>

<Section spacing="xl">

	<div class="max-w-3xl mb-16">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			Why a Network?
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Instead of betting everything on one perfect solution, EcoHubs grow stronger as a
			<span class="text-emerald-600 font-semibold">distributed living system</span>.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
		
		<div class="lg:col-span-7 space-y-4">
			{#each features as feature, i}
				<button
					class="group relative w-full text-left p-4 rounded-2xl transition-all duration-300 border-2 
					{activeFeatureIndex === i ? 'bg-white border-emerald-500/30 shadow-lg scale-[1.02]' : 'bg-transparent border-transparent hover:bg-gray-50'}"
					onclick={() => setActive(i)}
					onmouseenter={() => setActive(i)}
				>
					<div class="flex gap-5 items-start">
						<div class="shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-xl font-bold transition-colors duration-300 {feature.color}">
							<Icon icon={feature.icon} class="w-6 h-6" aria-hidden="true" />
						</div>
						
						<div>
							<h3 class="font-semibold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
								{feature.title}
							</h3>
							<p class="text-gray-500 mt-1 leading-relaxed text-sm lg:text-base">
								{feature.desc}
							</p>
						</div>
					</div>

					{#if activeFeatureIndex === i}
						<div in:fade={{duration:200}} class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-1.5 h-12 rounded-full bg-emerald-500 hidden lg:block"></div>
					{/if}
				</button>
			{/each}
		</div>

		<div class="lg:col-span-5 sticky top-8">
			<div class="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 h-[450px] lg:h-[500px]">
				
				<div class="absolute inset-0 opacity-[0.03]" 
							style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
				</div>

				<div class="absolute top-6 left-0 right-0 z-10 flex justify-center">
					<div class="flex bg-gray-100/80 backdrop-blur-md p-1 rounded-full text-xs font-semibold shadow-inner">
						<button 
							class="px-4 py-1.5 rounded-full transition-all duration-300 {viewMode === 'monolith' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}"
							onclick={() => viewMode = 'monolith'}
						>
							Monolith
						</button>
						<button 
							class="px-4 py-1.5 rounded-full transition-all duration-300 {viewMode === 'network' ? 'bg-emerald-500 shadow text-white' : 'text-gray-500'}"
							onclick={() => viewMode = 'network'}
						>
							Network
						</button>
					</div>
				</div>

				<svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					
					{#if viewMode === 'network'}
						<g class="transition-opacity duration-500 {activeFeatureIndex === 1 ? 'opacity-100' : 'opacity-20'}">
							{#each $coords as startNode, i}
								{#each $coords as endNode, j}
									{#if i < j} <line 
											x1={startNode.x} y1={startNode.y} 
											x2={endNode.x} y2={endNode.y} 
											stroke="currentColor" 
											stroke-width="0.3" 
											class="text-emerald-300" 
										/>
									{/if}
								{/each}
							{/each}
						</g>
					{/if}

					{#each $coords as node, i}
						<g transform="translate({node.x}, {node.y})" class="transition-all duration-500 ease-out">
							
							{#if viewMode === 'network' && activeFeatureIndex === 0}
									<circle r="8" class="text-emerald-400 opacity-20 animate-ping" fill="currentColor" />
							{/if}

							<circle 
								r={viewMode === 'monolith' ? 20 : (activeFeatureIndex === 2 ? 3 + (i % 3) : 3)} 
								class="transition-all duration-500  {
									viewMode === 'monolith' 
										? 'fill-gray-300' 
										: (activeFeatureIndex === 2 && i % 2 === 0 ? 'fill-amber-400' : 'fill-emerald-500')
								}"
							/>

							{#if viewMode === 'network' && activeFeatureIndex === 3}
								<circle r="0.8" fill="currentColor" class="text-teal-600">
									<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="{1 + i/2}s" repeatCount="indefinite" />
								</circle>
							{/if}
						</g>
					{/each}

					{#if viewMode === 'monolith'}
						<text x="50" y="50" text-anchor="middle" dy="1" font-size="3" fill="white" font-weight="bold" class="pointer-events-none">FRAGILE</text>
					{/if}
				</svg>
				
				<div class="absolute bottom-6 left-0 right-0 text-center px-8">
						<p class="text-sm font-medium text-gray-500 transition-all duration-300">
							{#if viewMode === 'monolith'}
								<span class="text-rose-500">Centralized Risk</span>: If the center fails, everything fails.
							{:else}
								<span class="text-emerald-600 font-bold">{features[activeFeatureIndex].title}</span>
								<br/>
								<span class="text-xs font-normal opacity-70">Visualizing network dynamics</span>
							{/if}
						</p>
				</div>

			</div>
		</div>
	</div>
</Section>


<Section >
  <div class="relative overflow-hidden">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-50/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

		<div class="mx-auto max-w-3xl text-center px-4 relative z-10">
			
			<div class="mb-16 space-y-4">
				<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
					The Cultural Foundation
				</h2>
				<p class="text-lg leading-relaxed text-stone-600 max-w-xl mx-auto">
					Technology alone is not enough. Our vision is grounded in shared values that guide how
					EcoHubs grow, govern themselves, and relate to one another.
				</p>
			</div>

			<div class="space-y-6 text-left">
				{#each values as value, i}
					<div 
						in:fly|global={{ y: 30, duration: 600, delay: i * 150, easing: cubicInOut }}
						class="group relative rounded-2xl border border-stone-200/60 bg-white/70 backdrop-blur-md p-1 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/90"
						onmouseenter={() => hoveredIndex = i}
						onmouseleave={() => hoveredIndex = null}
						role="listitem"
					>
						<div class="flex items-center gap-6 p-5 rounded-xl transition-colors duration-500
							{hoveredIndex === i ? 'bg-stone-50/50' : ''}"
						>
							<div class="relative shrink-0">
								{#if hoveredIndex === i}
								<div class="absolute inset-0 rounded-xl bg-{value.colorTheme}-400/20 animate-ping scale-90" in:fade></div>
								{/if}

								<div class="relative h-14 w-14 rounded-xl flex items-center justify-center border-2 transition-all duration-500
									{getThemeStyles(value.colorTheme, hoveredIndex === i)}"
								>
									<Icon icon={value.icon} class="w-7 h-7" aria-hidden="true" />
								</div>
							</div>

							<div class="space-y-1">
								<h3 class="text-xl font-bold text-stone-800 group-hover:text-black transition-colors">
									{value.title}
								</h3>
								<p class="text-stone-600 font-medium leading-snug">
									{value.statement}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>

<Section spacing="lg">
	<div class="max-w-3xl mb-16 mx-auto text-center">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			The Reality We Face
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			We are responding to a converging set of ecological, social, and economic crises — not
			with fear, but with practical, place-based solutions that work on the ground.
		</p>
	</div>

	<div class="relative">
		<div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2"></div>
		<div class="space-y-8 lg:space-y-0">
			<div class="hidden lg:grid grid-cols-2 gap-12 mb-8 text-sm font-bold tracking-widest uppercase text-stone-400">
				<div class="text-right pr-8">The Challenge</div>
				<div class="text-left pl-8">The EcoHubs Response</div>
			</div>

			{#each challenges as item, i}
				<div 
					class="group lg:grid lg:grid-cols-2 lg:gap-12 relative items-center transition-all duration-500"
					onmouseenter={() => activeChallengeIndex = i}
					onmouseleave={() => activeChallengeIndex = null}
					in:fly|global={{ y: 30, duration: 600, delay: i * 150, easing: cubicInOut }}
					out:fly|global={{ y: 30, duration: 600, delay: i * 150, easing: cubicInOut }}
					aria-label={item.problem}
					aria-describedby={item.response}
					aria-details={item.responseDetail}
					role="listitem"
				>
					<div class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
						h-4 w-4 rounded-full border-2 transition-all duration-300 items-center justify-center
						{activeChallengeIndex === i ? 'bg-emerald-500 border-emerald-500 scale-125' : 'bg-stone-50 border-stone-300'}"
					>
						{#if activeChallengeIndex === i}
							<div class="w-1.5 h-1.5 bg-white rounded-full"></div>
						{/if}
					</div>

					<div class="relative p-6 lg:p-8 lg:text-right rounded-2xl border border-stone-200 lg:border-transparent lg:bg-transparent bg-white shadow-sm lg:shadow-none mb-4 lg:mb-12 transition-all duration-300 
						{activeChallengeIndex === i ? 'lg:opacity-100' : 'lg:opacity-60'}">
						
						<h3 class="font-serif text-xl font-medium text-stone-700 mb-2">
							{item.problem}
						</h3>
						<p class="text-stone-500 leading-relaxed text-sm lg:text-base">
							{item.detail}
						</p>
						
						<div class="lg:hidden mt-4 flex justify-center text-stone-300">
							↓
						</div>
					</div>

					<div class="relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 mb-12 lg:mb-12
						{activeChallengeIndex === i 
							? 'bg-white border-emerald-100 shadow-xl shadow-emerald-900/5 -translate-y-1 lg:translate-y-0 lg:-translate-x-2' 
							: 'bg-stone-50 lg:bg-transparent border-stone-100 lg:border-transparent shadow-none'}"
					>
						<div class="flex items-start gap-4 lg:flex-row">
							<div class="shrink-0 hidden lg:flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300
								{activeChallengeIndex === i ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-stone-400'}"
							>
								<Icon icon={item.icon} class="w-5 h-5" aria-hidden="true" />
							</div>

							<div>
								<h3 class="font-bold text-lg mb-2 transition-colors duration-300
									{activeChallengeIndex === i ? 'text-emerald-800' : 'text-stone-800'}"
								>
									{item.response}
								</h3>
								<p class="text-stone-600 leading-relaxed text-sm lg:text-base">
									{item.responseDetail}
								</p>
							</div>
						</div>
					</div>

					{#if activeChallengeIndex === i}
						<div class="hidden lg:block absolute bottom-4 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-200 to-transparent -z-10" in:fade></div>
					{/if}

				</div>
			{/each}
		</div>
		
	</div>
</Section>

<Section spacing="lg">
	<div class="relative py-24 overflow-hidden">
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute top-10 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-[100px] animate-pulse"></div>
			<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
		</div>

		<div class="relative max-w-7xl mx-auto px-6 lg:px-8">
			
			<div class="max-w-3xl mx-auto text-center mb-20">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
					Methodology
				</div>
				<h2 class="font-serif text-4xl md:text-5xl font-bold text-ecohubs-dark leading-tight">
					From Vision to Reality
				</h2>
				<p class="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
					EcoHubs aren't just built; they are grown. We use an iterative feedback loop to ensure resilience, adaptability, and continuous improvement.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
				
				<div 
					class="relative hidden md:flex aspect-square items-center justify-center"
					onmouseenter={() => isPaused = true}
					onmouseleave={() => isPaused = false}
					role="region"
					aria-label="Interactive Cycle Diagram"
				>
					
					<div class="absolute inset-0 border border-slate-200 rounded-full"></div>
					<div class="absolute inset-12 border border-slate-100/50 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
					
					<svg class="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
							style="transform: rotate({rotationDeg}deg); view-box: 0 0 100 100;">
							<defs>
								<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" style="stop-color:#10b981;stop-opacity:0" />
									<stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
								</linearGradient>
							</defs>
							<circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#grad1)" stroke-width="2" stroke-linecap="round" stroke-dasharray="100 200" transform="rotate(-90 50% 50%)" class="opacity-80" />
					</svg>

					<div class="relative w-64 h-64 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl flex flex-col items-center justify-center p-8 text-center border border-white z-20">
						{#key activeHowToIndex}
							<div in:scale|global={{ duration: 400, start: 0.95, easing: cubicOut }} class="absolute inset-0 flex flex-col items-center justify-center p-6">
								<span class={`mb-3 p-3 rounded-xl bg-slate-50 ${stepsHowTo[activeHowToIndex].color}`}>
									<Icon icon={stepsHowTo[activeHowToIndex].icon} class="w-7 h-7" aria-hidden="true" />
								</span>
								<h3 class="text-2xl font-bold text-slate-800 mb-2">
									{stepsHowTo[activeHowToIndex].title}
								</h3>
								<p class="text-sm text-slate-500 leading-snug">
									Step {activeHowToIndex + 1} of 6
								</p>
							</div>
						{/key}
					</div>

					{#each stepsHowTo as step, i}
						<button
							class="absolute w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-30
							{activeHowToIndex === i ? `scale-125 shadow-lg ring-4 ring-white ${step.bg} text-white` : 'bg-white text-slate-400 hover:text-emerald-600 hover:bg-slate-50 border border-slate-200'}"
							style="transform: rotate({i * 60 - 90}deg) translate(180px) rotate({i * 60 - 30}deg);"
							onclick={() => setStepHowTo(i)}
							aria-label={`Go to step ${step.title}`}
						>
							<Icon icon={step.icon} class="w-5 h-5" aria-hidden="true" />
							
							{#if activeHowToIndex === i}
								<span class={`absolute inset-0 rounded-full animate-ping opacity-20 ${step.bg}`}></span>
							{/if}
						</button>
					{/each}
				</div>

				<div class="relative z-10">
					<div class="flex md:hidden gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide snap-x">
						{#each stepsHowTo as step, i}
							<button 
								onclick={() => setStepHowTo(i)}
								class="snap-center shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors
								{activeHowToIndex === i ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'}"
							>
								{i+1}. {step.title}
							</button>
						{/each}
					</div>

					<div class="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white shadow-xl lg:shadow-2xl transition-all">
						{#key activeHowToIndex}
							<div in:fade={{ duration: 300, easing: cubicOut }}>
								<div class="flex items-center justify-between mb-6">
									<span class="text-9xl font-serif text-slate-300 font-bold absolute -top-6 -right-6 select-none -z-10">
										{activeHowToIndex + 1}
									</span>
									<h3 class={`text-3xl font-bold ${stepsHowTo[activeHowToIndex].color}`}>
										{stepsHowTo[activeHowToIndex].title}
									</h3>
								</div>
								
								<p class="text-lg text-slate-700 leading-relaxed mb-8">
									{stepsHowTo[activeHowToIndex].desc}
								</p>

								
								<div class="relative w-full bg-slate-100 rounded-full h-1.5 mb-2 ">
									
									<div 
										class="h-full bg-linear-to-r from-emerald-400 to-sky-500 transition-all duration-100 rounded-full"
										style="width: {totalProgress()}%"
									></div>
									
									<div class="absolute -bottom-2 left-0 w-full flex rounded-full h-2.5 mb-2">
										{#each stepsHowTo as step, i}
											<div class="relative w-full border-r border-slate-800/30 h-2.5 mb-2 last:border-r-0">
											</div>
										{/each}
									</div>
								</div>
								<div class="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wide">
									<span>Start</span>
									<span>Continuity</span>
								</div>
							</div>
						{/key}
					</div>
					
					<div class="mt-8 flex items-center gap-4 text-slate-500 text-sm">
						{#if isPaused}
							<button onclick={() => isPaused = false} class="flex items-center gap-2 hover:text-emerald-600 transition">
								<Icon icon="tabler:player-play" class="w-4 h-4" aria-hidden="true" />
								Resume Cycle
							</button>
						{:else}
							<span class="flex items-center gap-2">
								<span class="relative flex h-3 w-3">
									<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
									<span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
								</span>
								<Icon icon="tabler:pause" class="w-4 h-4" aria-hidden="true" />
								Auto-playing... (Hover to pause)
							</span>
						{/if}
					</div>

				</div>
			</div>
		</div>
	</div>
</Section>

<Section spacing="xl">
	<div class="overflow-hidden relative pt-10">
		<div class="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
				style="background-image: linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px); background-size: 40px 40px;">
		</div>

		<div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
			
			<div class="max-w-3xl mx-auto text-center mb-16">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-200">
					The Core Tool
				</div>
				<h2 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
					The <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Blueprint</span>
				</h2>
				<p class="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
					A modular, open-source operating system for sustainable communities. Select a layer to explore the components.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
				
				<div class="lg:col-span-5 flex flex-col gap-3">
					{#each layers as layer, i}
						<button
							onclick={() => selectLayer(i)}
							class="group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border-3
							{activeLayersIndex === i 
								? `bg-white shadow-lg shadow-slate-200 scale-102 border-l-4 ${layer.border}` 
								: 'bg-slate-50/50 hover:bg-white hover:shadow-md border-transparent hover:border-slate-200 scale-100 opacity-70 hover:opacity-100'}"
						>
							<div class={`h-12 w-12 shrink-0 rounded-lg flex items-center justify-center transition-colors duration-300
								${activeLayersIndex === i ? `bg-linear-to-br ${layer.gradient} text-white shadow-md` : 'bg-slate-200 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-700'}`}>
								<Icon icon={layer.icon} class="w-6 h-6" aria-hidden="true" />
							</div>

							<div class="flex-1">
								<h3 class={`text-lg font-bold leading-none ${activeLayersIndex === i ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
									{layer.title}
								</h3>
								<p class="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
									{layer.subtitle}
								</p>
							</div>

							<svg class={`w-5 h-5 transition-transform duration-300 ${activeLayersIndex === i ? 'text-slate-800 rotate-90 lg:rotate-0' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} 
								xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>
					{/each}
				</div>

				<div class="lg:col-span-7">
					<div class="relative min-h-[500px] h-full rounded-3xl bg-ecohubs-dark text-white p-1 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
						
						<div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-linear-to-br from-emerald-500/20 to-sky-500/20 blur-[80px] rounded-full pointer-events-none"></div>

						<div class="relative h-full bg-slate-900/50 backdrop-blur-sm rounded-[20px] p-8 md:p-12 flex flex-col">
							
							{#key activeLayersIndex}
								<div in:fly={{ y: 20, duration: 400, easing: cubicOut }} class="flex flex-col h-full">
									
									<div class="flex items-start justify-between mb-8 pb-8 border-b border-slate-700/50">
										<div>
											<div class={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-3 bg-white/10 ${activeLayer.color.replace('text-', 'text-light-')}`}>
												System Layer 0{activeLayersIndex + 1}
											</div>
											<h3 class="text-3xl md:text-4xl font-bold text-white mb-2">
												{activeLayer.title}
											</h3>
											<p class="text-slate-400 font-medium text-lg">
												{activeLayer.subtitle}
											</p>
										</div>
										<div class="hidden sm:block opacity-10 text-white transform rotate-12 scale-150">
											<Icon icon={activeLayer.icon} class="w-20 h-20 animate-pulse" aria-hidden="true" />
										</div>
									</div>

									<div class="prose prose-invert prose-lg max-w-none mb-10">
										<p class="leading-relaxed text-slate-300">
											{activeLayer.description}
										</p>
									</div>

									<div class="mt-auto">
										<h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Included Modules</h4>
										<div class="flex flex-wrap gap-3">
											{#each activeLayer.tags as tag}
												<span class="px-4 py-2 rounded-lg bg-ecohubs-light/20 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default">
													<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
													{tag}
												</span>
											{/each}
											<span class="px-4 py-2 rounded-lg border border-dashed border-ecohubs-light text-sm text-ecohubs-light">
												+ Add your own
											</span>
										</div>
									</div>

								</div>
							{/key}
						</div>
					</div>
				</div>
			</div>

			<div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
				
				<div class="flex flex-col gap-3">
					<div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-1">
						<Icon icon="tabler:writing" class="w-6 h-6" aria-hidden="true" />
					</div>
					
					<h4 class="font-bold text-slate-900">Living Blueprint</h4>
					<p class="text-sm text-slate-500 leading-relaxed">
						A continuously evolving body of shared practices shaped by real communities, real places, and lived experience.
					</p>
				</div>

				<div class="flex flex-col gap-3">
					<div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-1">
						<Icon icon="tabler:puzzle" class="w-6 h-6" aria-hidden="true" />
					</div>
					<h4 class="font-bold text-slate-900">Context-Aware Modules</h4>
					<p class="text-sm text-slate-500 leading-relaxed">
						Adaptable building blocks that evolve with climate, culture, land, and the people who use them.
					</p>
				</div>

				<div class="flex flex-col gap-3">
					<div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-1">
						<Icon icon="tabler:users-group" class="w-6 h-6" aria-hidden="true" />
					</div>
					<h4 class="font-bold text-slate-900">Collective Stewardship</h4>
					<p class="text-sm text-slate-500 leading-relaxed">
						A commons maintained by contributors, where improvements flow back into the network for everyone.
					</p>
				</div>

				<div class="flex flex-col gap-3">
					<div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-1">
						<Icon icon="tabler:barbell" class="w-6 h-6" aria-hidden="true" />
					</div>
					<h4 class="font-bold text-slate-900">Grounded in Practice</h4>
					<p class="text-sm text-slate-500 leading-relaxed">
						Formed through experiments, failures, and learning cycles — refined in the field, not on paper.
					</p>
				</div>

			</div>
		</div>
	</div>

</Section>

<Section spacing="none">
	<div class="relative overflow-hidden pb-50 mt-20">
		<div class="absolute inset-0 z-0">
			<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full "></div>
		</div>

		<div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
			
			<div 
				class="max-w-4xl mx-auto mb-20"
				onmouseenter={() => isInvitationHovered = true}
				onmouseleave={() => isInvitationHovered = false}
				role="presentation"
			>
				<h2 class="font-serif text-5xl md:text-7xl font-bold text-ecohubs-dark tracking-tight leading-none">
					The future is not a place <br class="hidden md:block" /> 
					<span class="relative inline-block">
						we are going.
						<span class={`absolute bottom-2 left-0 h-3 w-full bg-emerald-200/50 -z-10 transition-all duration-700 ${isInvitationHovered ? 'scale-x-105' : 'scale-x-0'}`}></span>
					</span>
				</h2>
				<p class="mt-8 text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
					It is a place we are <span class="text-ecohubs-dark font-medium italic">creating together</span>, one hub at a time.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
				{#each invitations as item, i}
					<div 
						in:fade={{ delay: i * 100 }}
						class={`group p-8 rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-500 ${item.color} hover:-translate-y-2 group-hover:${item.bgColor}`}
					>
						<div class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:scale-110 group-hover:{item.bgColor} transition-transform duration-500">
							<Icon icon={item.icon} class="w-6 h-6" aria-hidden="true" />
						</div>
						<h3 class="text-xl font-bold text-slate-900 mb-3">{item.action}</h3>
						<p class="text-slate-500 leading-relaxed text-sm">
							{item.description}
						</p>
					</div>
				{/each}
			</div>

			<div class="flex flex-col items-center">
				<div class="flex flex-wrap justify-center gap-6">
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
				
				<p class="mt-10 text-slate-400 text-sm flex items-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
					Let's start building community together.
				</p>
			</div>
		</div>

		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl opacity-20 pointer-events-none">
			<svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-slate-200 fill-slate-300">
					<path d="M0,200 Q150,50 300,180 T600,150 T1000,200 L1000,200 L0,200 Z" />
			</svg>
		</div>
	</div>
</Section>

<style>
  /* Custom scale for a subtle pop effect */
  .scale-102 {
    transform: scale(1.02);
  }

  /* Utility to hide scrollbar for mobile nav */
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
</style>