<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import Icon from '@iconify/svelte';
	import { spring } from 'svelte/motion';
	import { fade, fly, scale } from 'svelte/transition';
	import BluePrintCommunity from '$lib/assets/blueprint-community.webp';
	import BluePrintCommunity2 from '$lib/assets/blueprint-community-2.webp';

	// ============================================
	// SECTION 2: The Problem - Lost Knowledge
	// ============================================
	const failureProblems = [
		{
			id: 'purpose',
			label: 'Unclear Purpose & Scope',
			icon: 'tabler:target',
			detail: 'When purpose and boundaries stay implicit, expectations drift and conflict becomes personal.'
		},
		{
			id: 'membership',
			label: 'Implicit Membership',
			icon: 'tabler:user-question',
			detail: 'If roles, rights, and exit paths are undefined, people end up negotiating belonging in moments of stress.'
		},
		{
			id: 'governance',
			label: 'Decision Drift',
			icon: 'tabler:scale',
			detail: 'Without explicit decision pathways, authority accumulates informally and outcomes feel arbitrary.'
		},
		{
			id: 'economy',
			label: 'Resource Ambiguity',
			icon: 'tabler:coin-off',
			detail: 'Commons vs private resources, contribution recognition, and treasury rules need shared clarity.'
		},
		{
			id: 'conflict',
			label: 'No Repair Path',
			icon: 'tabler:flame',
			detail: 'Conflict is normal. Without defined escalation and repair, issues get buried until they explode.'
		}
	];

	let activeFailureIndex = $state(0);
	let failureInterval: NodeJS.Timeout;

	$effect(() => {
		failureInterval = setInterval(() => {
			activeFailureIndex = (activeFailureIndex + 1) % failureProblems.length;
		}, 3000);
		return () => clearInterval(failureInterval);
	});

	// ============================================
	// SECTION 3: The Idea - Shared Foundation
	// ============================================
	const networkBenefits = [
		{ text: 'Not one perfect model', icon: 'tabler:puzzle' },
		{ text: 'A shared structure before ideology', icon: 'tabler:heart-handshake' },
		{ text: 'Adapted locally, made explicit', icon: 'tabler:map-pin' },
		{ text: 'Coordination without centralization', icon: 'tabler:topology-ring-3' }
	];

	// Network animation
	const isolatedNodes = [
		{ x: 15, y: 30 }, { x: 35, y: 20 }, { x: 55, y: 35 },
		{ x: 75, y: 25 }, { x: 25, y: 60 }, { x: 50, y: 70 },
		{ x: 70, y: 65 }, { x: 85, y: 50 }
	];

	const networkedNodes = [
		{ x: 50, y: 50 }, { x: 25, y: 30 }, { x: 75, y: 30 },
		{ x: 85, y: 55 }, { x: 75, y: 75 }, { x: 50, y: 85 },
		{ x: 25, y: 75 }, { x: 15, y: 55 }
	];

	let isNetworked = $state(false);
	const nodeCoords = spring(isolatedNodes, { stiffness: 0.08, damping: 0.4 });

	$effect(() => {
		nodeCoords.set(isNetworked ? networkedNodes : isolatedNodes);
	});

	// ============================================
	// SECTION 4: What the Blueprint Is (and Isn't)
	// ============================================
	const blueprintIs = [
		{ text: 'A formal, open standard (RCOS)', icon: 'tabler:plant-2', desc: 'The Blueprint is the human-facing name for RCOS during the transition' },
		{ text: 'A layered operating system', icon: 'tabler:puzzle', desc: 'Clear responsibility boundaries across core layers of community life' },
		{ text: 'A shared language for governance', icon: 'tabler:git-branch', desc: 'Membership, economy, conflict, operations, and evolution are made legible' },
		{ text: 'Grounded in real failure modes', icon: 'tabler:flask-2', desc: 'Stress tests and practice help communities learn without collapsing' }
	];

	const blueprintIsNot = [
		{ text: 'Software or a platform', icon: 'tabler:book-off', desc: 'RCOS is a standard, not an app you install' },
		{ text: 'A DAO product', icon: 'tabler:cloud-off', desc: 'Governance tools can help, but they are not the system itself' },
		{ text: 'A fixed ideology', icon: 'tabler:hierarchy-off', desc: 'Structure comes before values; communities adapt without losing clarity' },
		{ text: 'A replacement for judgment', icon: 'tabler:checkbox', desc: 'RCOS reduces ambiguity but never replaces people' }
	];

	// ============================================
	// SECTION 5: Structure - How It's Organized
	// ============================================
	const structureLayers = [
		{
			layer: 0,
			level: 'Layer 0: Purpose & Scope',
			color: 'emerald',
			icon: 'tabler:target',
			question: 'Why the community exists, what is governed, and what must not be violated.',
			examples: ['Purpose statement', 'Scope boundaries', 'Non-negotiable invariants', 'What is out of scope']
		},
		{
			layer: 1,
			level: 'Layer 1: Membership',
			color: 'sky',
			icon: 'tabler:users',
			question: 'How people join, participate, change status, and exit—without implicit membership.',
			examples: ['Entry paths', 'Rights & responsibilities', 'Status changes', 'Exit and offboarding']
		},
		{
			layer: 2,
			level: 'Layer 2: Governance',
			color: 'amber',
			icon: 'tabler:scale',
			question: 'How decisions are made, who can decide what, and how authority is constrained.',
			examples: ['Decision types', 'Proposal pathways', 'Delegation rules', 'Transparency requirements']
		},
		{
			layer: 3,
			level: 'Layer 3: Economy & Resources',
			color: 'rose',
			icon: 'tabler:coins',
			question: 'Commons vs private resources, contribution recognition, and treasury rules.',
			examples: ['Commons boundaries', 'Contribution accounting', 'Budgeting rules', 'Treasury safeguards']
		},
		{
			layer: 4,
			level: 'Layer 4: Conflict, Repair & Accountability',
			color: 'emerald',
			icon: 'tabler:user-heart',
			question: 'How conflict is handled, escalated, repaired, and when separation is required.',
			examples: ['Repair pathways', 'Escalation ladder', 'Accountability steps', 'Separation protocols']
		},
		{
			layer: 5,
			level: 'Layer 5: Operations & Coordination',
			color: 'sky',
			icon: 'tabler:calendar-time',
			question: 'Roles, meetings, documentation, workload boundaries, and day-to-day coordination.',
			examples: ['Role definitions', 'Meeting cadence', 'Documentation norms', 'Workload limits']
		},
		{
			layer: 6,
			level: 'Layer 6: Evolution & Adaptation',
			color: 'amber',
			icon: 'tabler:trending-up',
			question: 'How rules change, experiments run, and learning is captured without collapse.',
			examples: ['Amendment process', 'Experiment design', 'Retrospectives', 'Versioning and review']
		}
	];

	let activeStructureLayer = $state(0);
	const moduleExamples = [
		'Permaculture',
		'Minimal Permaculture',
		'Education',
		'Housing',
		'Land Commons Safeguards',
		'Alternative Economies'
	];

	// ============================================
	// SECTION 6: How It's Built - Process
	// ============================================
	const buildProcess = [
		{
			step: 1,
			title: 'Ideas from Practice',
			desc: 'Real challenges surface from communities living the work.',
			icon: 'tabler:bulb',
			color: 'emerald'
		},
		{
			step: 2,
			title: 'Articles Proposed',
			desc: 'Contributors draft solutions, patterns, or reflections.',
			icon: 'tabler:pencil',
			color: 'sky'
		},
		{
			step: 3,
			title: 'Collaborative Review',
			desc: 'The community discusses, refines, and improves.',
			icon: 'tabler:users',
			color: 'indigo'
		},
		{
			step: 4,
			title: 'Tested in Hubs',
			desc: 'Patterns are applied in real EcoHubs.',
			icon: 'tabler:flask-2',
			color: 'amber'
		},
		{
			step: 5,
			title: 'Improved or Discarded',
			desc: 'What works stays. What doesn\'t teaches us.',
			icon: 'tabler:adjustments',
			color: 'rose'
		},
		{
			step: 6,
			title: 'Knowledge Evolves',
			desc: 'The blueprint grows wiser with each cycle.',
			icon: 'tabler:trending-up',
			color: 'teal'
		}
	];

	let activeBuildStep = $state(0);
	let buildInterval: NodeJS.Timeout;
	let isBuildPaused = $state(false);

	$effect(() => {
		if (!isBuildPaused) {
			buildInterval = setInterval(() => {
				activeBuildStep = (activeBuildStep + 1) % buildProcess.length;
			}, 4000);
		}
		return () => clearInterval(buildInterval);
	});

	// ============================================
	// SECTION 7: Why This Matters - Benefits
	// ============================================
	const benefits = [
		{
			title: 'Reduce Repeated Mistakes',
			desc: 'Use shared stress tests and failure reports instead of starting from scratch.',
			icon: 'tabler:shield-check',
			before: 'Every community starts from scratch',
			after: 'Build on tested foundations'
		},
		{
			title: 'Faster Learning Cycles',
			desc: 'Parallel experiments make learning visible and transferable.',
			icon: 'tabler:bolt',
			before: 'Years to discover what works',
			after: 'Shared insights speed progress'
		},
		{
			title: 'Shared Memory Across Hubs',
			desc: 'Structure stays legible even as people come and go.',
			icon: 'tabler:database',
			before: 'Knowledge walks out the door',
			after: 'Institutional memory remains'
		},
		{
			title: 'Lower Barrier to Starting',
			desc: 'Adopt parts of RCOS now, evolve the rest over time.',
			icon: 'tabler:door-enter',
			before: 'Overwhelmed by complexity',
			after: 'Clear starting points'
		}
	];

	let activeBenefitIndex = $state<number | null>(null);

	// ============================================
	// SECTION 8: How You Can Use It - Use Cases
	// ============================================
	const useCases = [
		{
			persona: 'New Hub Founders',
			icon: 'tabler:plant-2',
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			description: 'Starting from zero and trying to stay coherent under pressure.',
			finds: ['Purpose & scope templates', 'Membership pathways', 'Decision maps and constraints']
		},
		{
			persona: 'Existing Communities',
			icon: 'tabler:home-2',
			iconColor: 'text-sky-600',
			iconBg: 'bg-sky-50',
			description: 'Improving a specific weak point without rewriting everything.',
			finds: ['Conflict repair pathways', 'Resource governance patterns', 'Operations and role clarity']
		},
		{
			persona: 'Researchers & Educators',
			icon: 'tabler:school',
			iconColor: 'text-indigo-600',
			iconBg: 'bg-indigo-50',
			description: 'Studying how communities succeed and fail in repeatable ways.',
			finds: ['Stress tests', 'Failure analyses', 'Layered comparisons between communities']
		},
		{
			persona: 'Governance Designers',
			icon: 'tabler:scale',
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			description: 'Designing decision pathways that keep authority explicit.',
			finds: ['Decision rights and constraints', 'Delegation patterns', 'Transparency and documentation norms']
		}
	];

	let hoveredUseCase = $state<number | null>(null);

	// ============================================
	// SECTION 9: How to Contribute
	// ============================================
	const contributionPaths = [
		{
			action: 'Write or Improve',
			desc: 'Draft new articles or refine existing ones.',
			icon: 'tabler:pencil',
			color: 'emerald'
		},
		{
			action: 'Review & Discuss',
			desc: 'Provide feedback, ask questions, strengthen arguments.',
			icon: 'tabler:message-circle',
			color: 'sky'
		},
		{
			action: 'Document Experiments',
			desc: 'Share what you\'ve tried—successes and failures.',
			icon: 'tabler:clipboard-text',
			color: 'amber'
		},
		{
			action: 'Propose New Modules',
			desc: 'Suggest optional extensions that apply RCOS to specific domains.',
			icon: 'tabler:plus',
			color: 'rose'
		}
	];

	const contributorSteps = [
		{ step: 1, text: 'Explore the blueprint', icon: 'tabler:compass' },
		{ step: 2, text: 'Join the community', icon: 'tabler:users' },
		{ step: 3, text: 'Find your focus area', icon: 'tabler:target' },
		{ step: 4, text: 'Start contributing', icon: 'tabler:pencil' }
	];
</script>

<SEO
	title="The Blueprint (RCOS) – EcoHubs.community"
	description="The Blueprint, formally RCOS (Regenerative Community Operating System), is an open standard for making community structure explicit: membership, governance, resources, conflict, operations, and evolution."
	ogImage="/og-blueprint.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Blueprint', url: 'https://ecohubs.community/blueprint' }
	]}
	faq={[
		{
			question: 'What is the Blueprint (RCOS)?',
			answer: 'The Blueprint, formally called RCOS (Regenerative Community Operating System), is an open standard for designing and operating communities with clear structure across membership, governance, resources, conflict, operations, and evolution.'
		},
		{
			question: 'What is RCOS not?',
			answer: 'It is not software, not a DAO product, and not a fixed ideology. It does not replace human judgment; it helps communities make assumptions explicit and reviewable.'
		},
		{
			question: 'What are the RCOS core layers?',
			answer: 'RCOS is organized into seven layers: Purpose & Scope, Membership, Governance, Economy & Resources, Conflict/Repair/Accountability, Operations & Coordination, and Evolution & Adaptation.'
		},
		{
			question: 'What are modules?',
			answer: 'Modules are optional extensions that apply RCOS to specific domains (like food systems, housing, land stewardship, or education) without changing the core rules.'
		},
		{
			question: 'How can I contribute to the Blueprint?',
			answer: 'You can write or improve articles, review and discuss proposals, document experiments from real communities, or propose new modules. Contributions require EcoHubs membership to help keep the standard coherent.'
		}
	]}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'The Blueprint (RCOS)',
		description:
			'The Blueprint, formally RCOS (Regenerative Community Operating System), is an open standard for making community structure explicit across core layers and optional modules.',
		url: 'https://ecohubs.community/blueprint',
		about: [
			{ '@type': 'Thing', name: 'Regenerative Community Operating System', alternateName: 'RCOS' },
			{ '@type': 'Thing', name: 'Regenerative communities' },
			{ '@type': 'Thing', name: 'Community governance' }
		]
	}}
/>

<!-- ============================================
     SECTION 1: HERO
     ============================================ -->
<Section spacing="xl" columns={2}>
	<!-- Text content - shows second on mobile (below image) -->
	<div class="order-2 md:order-1">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
			Open Standard
		</div>
		<h1 class="font-serif text-3xl sm:text-4xl font-bold leading-tight text-ecohubs-dark md:text-5xl lg:text-6xl">
			The Blueprint <span class="text-gradient">(RCOS)</span> for Regenerative Communities
		</h1>

		<p class="mt-4 md:mt-6 text-base md:text-lg leading-relaxed text-gray-600">
			The Blueprint, formally called RCOS (Regenerative Community Operating System), is a shared way to make community structure explicit—so authority, responsibility, and repair do not drift into informal norms.
		</p>

		<p class="mt-3 md:mt-4 text-gray-500 text-sm md:text-base">
			Adaptable by design. Grounded in practice. Focused on clarity over persuasion.
		</p>

		<div class="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
			<a
				href="#structure"
				class="px-6 md:px-8 py-3 md:py-4 bg-ecohubs-primary text-white font-medium rounded-xl hover:bg-ecohubs-dark transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-105 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
				aria-label="Explore the Blueprint"
			>
				Explore the Blueprint
				<Icon icon="tabler:arrow-down" class="w-5 h-5" />
			</a>

			<a
				href="#contribute"
				class="px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-ecohubs-primary hover:text-ecohubs-primary hover:scale-105 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
				aria-label="Contribute"
			>
				Contribute
				<Icon icon="tabler:arrow-right" class="w-4 h-4" />
			</a>
		</div>
		<div class="mt-6 md:mt-8">
			<a
				href="https://blueprint.ecohubs.community"
				class="text-ecohubs-primary hover:underline flex items-center gap-2 text-sm md:text-base"
				aria-label="Contribute"
				target="_blank"
			>
				See current blueprint version
				<Icon icon="tabler:external-link" class="w-4 h-4" />
			</a>
		</div>
	</div>

	<!-- Image - shows first on mobile (on top) -->
	<div class="order-1 md:order-2">
		<div
			class="relative w-full rounded-xl border border-border-subtle"
		>
			<img src={BluePrintCommunity} alt="A network of communities connected by shared structure" class="rounded-3xl shadow-2xl organic-shape-animated hover:rotate-1 transition-transform duration-700 object-cover h-56 sm:h-72 md:h-96 w-full" loading="lazy" />
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 2: THE PROBLEM - LOST KNOWLEDGE
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			Why Structure Matters
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Communities fail for repeatable reasons: unclear membership, decision drift, resource ambiguity, and missing repair paths. RCOS treats these as design problems—things that can be made explicit, tested, and improved.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
		<!-- Left: Narrative -->
		<div class="space-y-6">
			<div class="p-6 rounded-2xl bg-stone-100 border-2 border-stone-200">
				<p class="text-stone-700 leading-relaxed">
					Community living knowledge used to be <span class="font-semibold text-stone-900">local and implicit</span>—passed
					down through generations within relatively isolated groups.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-stone-100 border-2 border-stone-200">
				<p class="text-stone-700 leading-relaxed">
					Today, societies are far more <span class="font-semibold text-stone-900">complex, interconnected, and regulated</span>.
					Without shared frameworks, new initiatives repeatedly fail on the same predictable issues.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-amber-100 border-2 border-amber-200">
				<p class="text-amber-800 leading-relaxed font-medium">
					Reinventing everything locally no longer works. We need shared infrastructure for community knowledge.
				</p>
			</div>
		</div>

		<!-- Right: Animated failure loop -->
		<div class="relative">
			<div class="relative bg-white rounded-3xl border-4 border-stone-100 p-8 overflow-hidden">
				<div class="text-center mb-8">
					<p class="text-sm font-semibold text-stone-400 uppercase tracking-wider">The Cycle of Failure</p>
				</div>

				<!-- Circular arrangement of problems -->
				<div class="relative h-72 flex items-center justify-center">
					<div class="absolute w-60 h-60 rounded-full border-2 border-dashed border-stone-200 animate-[spin_30s_linear_infinite]"></div>

					{#each failureProblems as problem, i}
						{@const angle = (i * (360 / failureProblems.length) - 90) * (Math.PI / 180)}
						{@const radius = 118}
						{@const x = Math.cos(angle) * radius}
						{@const y = Math.sin(angle) * radius}
						<button
							class="absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 {activeFailureIndex === i ? 'bg-rose-500 text-white scale-125 shadow-lg' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}"
							style="transform: translate({x}px, {y}px);"
							onclick={() => activeFailureIndex = i}
							aria-label={problem.label}
						>
							<Icon icon={problem.icon} class="w-5 h-5" />
						</button>
					{/each}

					<!-- Center display -->
					<div class="absolute w-42 h-42 rounded-full bg-stone-50 flex flex-col items-center justify-center text-center p-4">
						{#key activeFailureIndex}
							<div in:fade={{ duration: 200 }} class="space-y-1">
								<p class="text-sm font-bold text-stone-800">{failureProblems[activeFailureIndex].label}</p>
								<p class="text-xs text-stone-500 leading-tight">{failureProblems[activeFailureIndex].detail}</p>
							</div>
						{/key}
					</div>
				</div>

				<!-- Problem indicators -->
				<div class="flex justify-center gap-2 mt-6">
					{#each failureProblems as _, i}
						<button
							class="w-2 h-2 rounded-full transition-all duration-300 {activeFailureIndex === i ? 'bg-rose-500 w-6' : 'bg-stone-300'}"
							onclick={() => activeFailureIndex = i}
							aria-label="Problem {i + 1}"
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 3: THE IDEA - SHARED FOUNDATION
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			A Shared Foundation for Many Communities
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Independent communities need a common foundation to scale without losing autonomy.
			The blueprint provides coordination without centralization.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
		<!-- Left: Interactive visualization -->
		<div class="relative">
			<div class="bg-white rounded-3xl border-4 border-stone-100 p-8 overflow-hidden">
				<!-- Toggle -->
				<div class="flex justify-center mb-8">
					<div class="flex bg-stone-100 p-1 rounded-full text-sm font-semibold">
						<button
							class="px-4 py-2 rounded-full transition-all duration-300 {!isNetworked ? 'bg-white shadow text-stone-800' : 'text-stone-500'}"
							onclick={() => isNetworked = false}
						>
							Isolated
						</button>
						<button
							class="px-4 py-2 rounded-full transition-all duration-300 {isNetworked ? 'bg-emerald-500 text-white shadow' : 'text-stone-500'}"
							onclick={() => isNetworked = true}
						>
							Networked
						</button>
					</div>
				</div>

				<!-- SVG Visualization -->
				<svg class="w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
					<!-- Connection lines (only when networked) -->
					{#if isNetworked}
						<g class="transition-opacity duration-700 opacity-100">
							{#each $nodeCoords as startNode, i}
								{#each $nodeCoords as endNode, j}
									{#if i < j && Math.abs(i - j) <= 3}
										<line
											x1={startNode.x} y1={startNode.y}
											x2={endNode.x} y2={endNode.y}
											stroke="currentColor"
											stroke-width="0.4"
											class="text-emerald-300"
											stroke-dasharray="2,2"
										/>
									{/if}
								{/each}
							{/each}
						</g>
					{/if}

					<!-- Nodes -->
					{#each $nodeCoords as node, i}
						<g transform="translate({node.x}, {node.y})">
							<circle
								r={isNetworked ? 4 : 3}
								class="transition-all duration-500 {isNetworked ? 'fill-emerald-500' : 'fill-stone-300'}"
							/>
							{#if isNetworked}
								<circle
									r="6"
									class="fill-emerald-500/20 animate-ping"
									style="animation-delay: {i * 0.2}s;"
								/>
							{/if}
						</g>
					{/each}

					<!-- Central hub when networked -->
					{#if isNetworked}
						<circle cx="50" cy="50" r="8" class="fill-emerald-600" />
						<circle cx="50" cy="50" r="12" class="fill-emerald-500/20 animate-pulse" />
					{/if}
				</svg>

				<!-- Caption -->
				<div class="text-center mt-6">
					{#if isNetworked}
						<p class="text-emerald-700 font-medium">Connected & Resilient</p>
						<p class="text-sm text-stone-500 mt-1">Knowledge flows, the network strengthens</p>
					{:else}
						<p class="text-stone-600 font-medium">Fragmented & Fragile</p>
						<p class="text-sm text-stone-500 mt-1">Each community starts from zero</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Right: Key ideas -->
		<div class="space-y-4">
			{#each networkBenefits as benefit, i}
				<div
					class="group flex justify-center items-center gap-4 p-5 rounded-2xl bg-white border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
					in:fly={{ y: 20, duration: 400, delay: i * 100 }}
				>
					<div class="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
						<Icon icon={benefit.icon} class="w-6 h-6" />
					</div>
					<div class="flex items-center  w-full">
						<p class="font-semibold text-stone-800 group-hover:text-emerald-800 transition-colors flex items-center gap-2">
							{benefit.text}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 4: WHAT IT IS (AND ISN'T)
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			What the Blueprint Is <span class="text-stone-400">(and Isn't)</span>
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Clear positioning. No misconceptions.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- IS column -->
		<div class="space-y-4">
			<div class="flex items-center gap-3 mb-6">
				<div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
					<Icon icon="tabler:check" class="w-5 h-5" />
				</div>
				<h3 class="text-xl font-bold text-emerald-800">What It IS</h3>
			</div>

			{#each blueprintIs as item, i}
				<div
					class="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300"
					in:fly={{ x: -20, duration: 400, delay: i * 100 }}
				>
					<div class="flex items-start gap-4">
						<div class="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
							<Icon icon={item.icon} class="w-5 h-5" />
						</div>
						<div>
							<p class="font-semibold text-stone-800">{item.text}</p>
							<p class="text-sm text-stone-500 mt-1">{item.desc}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- IS NOT column -->
		<div class="space-y-4">
			<div class="flex items-center gap-3 mb-6">
				<div class="w-10 h-10 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center">
					<Icon icon="tabler:x" class="w-5 h-5" />
				</div>
				<h3 class="text-xl font-bold text-stone-600">What It IS NOT</h3>
			</div>

			{#each blueprintIsNot as item, i}
				<div
					class="p-5 rounded-2xl bg-stone-100/80 border border-stone-300 hover:bg-stone-50 transition-all duration-300"
					in:fly={{ x: 20, duration: 400, delay: i * 100 }}
				>
					<div class="flex items-start gap-4">
						<div class="shrink-0 w-10 h-10 rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center">
							<Icon icon={item.icon} class="w-5 h-5" />
						</div>
						<div>
							<p class="font-semibold text-stone-600">{item.text}</p>
							<p class="text-sm text-stone-400 mt-1">{item.desc}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>


<Section columns={2}>
	<!-- Animated hierarchy diagram -->
	<div class="relative hidden md:flex items-center justify-center">
		<div class="relative w-full max-w-md aspect-square">
			<!-- Animated rings representing hierarchy -->
			<div class="absolute inset-0 flex items-center justify-center">
				<!-- Outer ring - Core layers -->
				<div class="absolute w-full h-full rounded-full border-2 border-emerald-200 animate-[spin_60s_linear_infinite]">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Templates</div>
				</div>
				<!-- Second ring - Modules -->
				<div class="absolute w-[75%] h-[75%] rounded-full border-2 border-sky-200 animate-[spin_45s_linear_infinite_reverse]">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">Artifacts</div>
				</div>
				<!-- Third ring - Practices -->
				<div class="absolute w-[50%] h-[50%] rounded-full border-2 border-amber-200 animate-[spin_30s_linear_infinite]">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Modules</div>
				</div>
				<!-- Center - Artifacts -->
				<div class="absolute w-[25%] h-[25%] rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center">
					<span class="text-rose-700 text-xs font-semibold">Core layers</span>
				</div>
			</div>

			<!-- Floating nodes -->
			<!-- {#each [0, 1, 2, 3, 4, 5] as i}
				<div
					class="absolute w-3 h-3 rounded-full bg-ecohubs-primary/60 animate-pulse"
					style="
						top: {20 + (i * 12)}%;
						left: {15 + (i * 13)}%;
						animation-delay: {i * 0.5}s;
					"
				></div>
			{/each} -->
		</div>
	</div>

	<div class="my-10 mx-auto max-w-3xl">
		<div class="relative h-100 w-full rounded-xl border border-border-subtle">
			<img src={BluePrintCommunity2} alt="RCOS core layers and modules applied in practice" class="rounded-3xl shadow-2xl organic-shape-pebble hover:rotate-1 transition-transform duration-700 object-cover h-96 w-full" loading="lazy" />
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 5: STRUCTURE - HOW IT'S ORGANIZED
     ============================================ -->
<Section spacing="lg" id="structure">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-4">
			RCOS Core
		</div>
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			The RCOS Core Layers
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			RCOS is organized into layers with clear responsibility boundaries. Communities can adapt implementation details, but the layer boundaries keep assumptions from going implicit.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
		<!-- Left: Layer selector -->
		<div class="lg:col-span-5 space-y-3">
			{#each structureLayers as layer, i}
				{@const colorMap: Record<string, { bg: string; text: string; border: string; activeBg: string }> = {
					'emerald': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', activeBg: 'bg-emerald-500' },
					'sky': { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', activeBg: 'bg-sky-500' },
					'amber': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', activeBg: 'bg-amber-500' },
					'rose': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', activeBg: 'bg-rose-500' }
				}}
				{@const colors = colorMap[layer.color]}
				<button
					class="group relative w-full text-left p-2 rounded-2xl transition-all duration-300 border-2
					{activeStructureLayer === i
						? `bg-white shadow-lg ${colors.border} scale-[1.02]`
						: 'bg-stone-50/50 border-transparent hover:bg-white hover:shadow-md'}"
					onclick={() => activeStructureLayer = i}
				>
					<div class="flex items-center gap-4">
						<div class="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
							{activeStructureLayer === i ? `${colors.activeBg} text-white` : `${colors.bg} ${colors.text}`}">
							<Icon icon={layer.icon} class="w-6 h-6" />
						</div>
						<div>
							<h3 class="font-bold text-lg text-stone-800">{layer.level}</h3>
							<!-- <p class="text-sm text-stone-500 mt-0.5">{layer.question}</p> -->
						</div>
					</div>

					{#if activeStructureLayer === i}
						<div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-1 h-12 rounded-full {colors.activeBg}"></div>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Right: Detail panel -->
		<div class="lg:col-span-7">
			<div class="bg-ecohubs-dark rounded-3xl p-8 min-h-[400px] shadow-2xl overflow-hidden relative">
				<!-- Background decoration -->
				<div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

				{#key activeStructureLayer}
					{@const layer = structureLayers[activeStructureLayer]}
					{@const colorMap: Record<string, string> = {
						'emerald': 'text-emerald-400',
						'sky': 'text-sky-400',
						'amber': 'text-amber-400',
						'rose': 'text-rose-400'
					}}
					<div in:fly={{ y: 20, duration: 400 }} class="relative z-10">
						<div class="flex items-center gap-3 mb-6">
							<div class="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider {colorMap[layer.color]}">
								Layer {layer.layer}
							</div>
						</div>

						<h3 class="text-3xl font-bold text-white mb-3">{layer.level}</h3>
						<p class="text-lg text-stone-300 mb-8">{layer.question}</p>

						<div class="space-y-2">
							<p class="text-xs font-semibold text-ecohubs-light uppercase tracking-wider mb-3">Examples</p>
							<div class="flex flex-wrap gap-2">
								{#each layer.examples as example, i}
									<span
										class="px-4 py-2 rounded-lg bg-white/10 text-sm text-white border border-white/10 hover:border-white/30 transition-colors cursor-default"
										in:scale={{ duration: 300, delay: i * 50 }}
									>
										{example}
									</span>
								{/each}
							</div>
						</div>

						<!-- Visual hierarchy indicator -->
						<div class="mt-10 flex items-center gap-2">
							{#each structureLayers as _, i}
								<div class="h-1.5 rounded-full transition-all duration-300
									{i <= activeStructureLayer ? 'bg-white w-8' : 'bg-white/20 w-4'}">
								</div>
							{/each}
						</div>
					</div>
				{/key}
			</div>
		</div>
	</div>
</Section>

<Section spacing="lg" id="modules">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
			Optional Extensions
		</div>
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			Modules and Adaptability
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Modules extend RCOS into real-world domains without changing core invariants or overriding governance.
			Communities can adopt RCOS partially or fully, and evolve their implementation over time.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
		<div class="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
			<h3 class="text-xl font-bold text-stone-800 mb-4">What modules do</h3>
			<ul class="space-y-2 text-stone-600">
				<li class="flex items-start gap-3">
					<Icon icon="tabler:check" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
					<span>Apply RCOS to specific domains like food systems, housing, education, or land stewardship.</span>
				</li>
				<li class="flex items-start gap-3">
					<Icon icon="tabler:check" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
					<span>Remain optional: communities choose what fits their context and constraints.</span>
				</li>
				<li class="flex items-start gap-3">
					<Icon icon="tabler:check" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
					<span>Stay compatible with the core: modules do not change core layer boundaries.</span>
				</li>
			</ul>
		</div>

		<div class="lg:col-span-5 bg-ecohubs-dark rounded-3xl p-8 text-white">
			<h3 class="text-xl font-bold mb-4">Example modules</h3>
			<div class="flex flex-wrap gap-2">
				{#each moduleExamples as example, i}
					<span
						class="px-4 py-2 rounded-lg bg-white/10 text-sm text-white border border-white/10 hover:border-white/30 transition-colors cursor-default"
						in:scale={{ duration: 250, delay: i * 40 }}
					>
						{example}
					</span>
				{/each}
			</div>
			<p class="text-sm text-stone-300 mt-6">
				Modules are intentionally non-ideological: they describe structure and constraints, not “the right way” to live.
			</p>
		</div>
	</div>
</Section>


<!-- ============================================
     SECTION 6: HOW IT'S BUILT
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mx-auto text-center mb-16">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold uppercase tracking-wider mb-4">
			Iterative Process
		</div>
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			From Theory to Practice <span class="text-stone-400">(and Back)</span>
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			This is rigorous, iterative, and real. Ideas emerge from practice, get tested, and evolve.
		</p>
	</div>

	<div
		class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
		onmouseenter={() => isBuildPaused = true}
		onmouseleave={() => isBuildPaused = false}
		role="region"
		aria-label="Build process visualization"
	>
		<!-- Left: Circular process diagram -->
		<div class="relative hidden md:flex aspect-square items-center justify-center">
			<!-- Outer ring -->
			<div class="absolute w-full h-full rounded-full border-2 border-stone-200"></div>
			<div class="absolute w-[85%] h-[85%] rounded-full border border-dashed border-stone-100 animate-[spin_90s_linear_infinite]"></div>

			<!-- Center -->
			<div class="relative w-48 h-48 bg-white rounded-full shadow-xl flex flex-col items-center justify-center text-center p-6 border border-stone-100 z-20">
				{#key activeBuildStep}
					{@const step = buildProcess[activeBuildStep]}
					{@const colorMap: Record<string, string> = {
						'emerald': 'text-emerald-600',
						'sky': 'text-sky-600',
						'indigo': 'text-indigo-600',
						'amber': 'text-amber-600',
						'rose': 'text-rose-600',
						'teal': 'text-teal-600'
					}}
					<div in:scale={{ duration: 300, start: 0.95 }} class="space-y-2">
						<Icon icon={step.icon} class="w-8 h-8 {colorMap[step.color]} mx-auto" />
						<p class="font-bold text-stone-800">{step.title}</p>
						<p class="text-xs text-stone-500">Step {step.step} of 6</p>
					</div>
				{/key}
			</div>

			<!-- Process nodes around the circle -->
			{#each buildProcess as step, i}
				{@const angle = (i * (360 / buildProcess.length) - 90) * (Math.PI / 180)}
				{@const radius = 160}
				{@const x = Math.cos(angle) * radius}
				{@const y = Math.sin(angle) * radius}
				{@const colorMap: Record<string, { bg: string; activeBg: string }> = {
					'emerald': { bg: 'bg-emerald-100 text-emerald-600', activeBg: 'bg-emerald-500 text-white' },
					'sky': { bg: 'bg-sky-100 text-sky-600', activeBg: 'bg-sky-500 text-white' },
					'indigo': { bg: 'bg-indigo-100 text-indigo-600', activeBg: 'bg-indigo-500 text-white' },
					'amber': { bg: 'bg-amber-100 text-amber-600', activeBg: 'bg-amber-500 text-white' },
					'rose': { bg: 'bg-rose-100 text-rose-600', activeBg: 'bg-rose-500 text-white' },
					'teal': { bg: 'bg-teal-100 text-teal-600', activeBg: 'bg-teal-500 text-white' }
				}}
				{@const colors = colorMap[step.color]}
				<button
					class="absolute w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 z-30
						{activeBuildStep === i ? `scale-125 shadow-lg ring-4 ring-white ${colors.activeBg}` : `${colors.bg} hover:scale-110`}"
					style="transform: translate({x}px, {y}px);"
					onclick={() => { activeBuildStep = i; isBuildPaused = true; }}
					aria-label={step.title}
				>
					<Icon icon={step.icon} class="w-6 h-6" />
				</button>
			{/each}

			<!-- Animated progress arc -->
			<svg class="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
				<circle
					cx="50%" cy="50%" r="48%"
					fill="none"
					stroke="url(#processGrad)"
					stroke-width="3"
					stroke-linecap="round"
					stroke-dasharray="{((activeBuildStep + 1) / buildProcess.length) * 301.59} 301.59"
					class="transition-all duration-500"
				/>
				<defs>
					<linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#10b981" />
						<stop offset="100%" stop-color="#6366f1" />
					</linearGradient>
				</defs>
			</svg>
		</div>

		<!-- Right: Step details -->
		<div class="space-y-6">
			<!-- Mobile step selector -->
			<div class="flex md:hidden gap-2 overflow-x-auto pb-4 scrollbar-hide">
				{#each buildProcess as step, i}
					{@const colorMap: Record<string, string> = {
						'emerald': 'bg-emerald-500',
						'sky': 'bg-sky-500',
						'indigo': 'bg-indigo-500',
						'amber': 'bg-amber-500',
						'rose': 'bg-rose-500',
						'teal': 'bg-teal-500'
					}}
					<button
						onclick={() => activeBuildStep = i}
						class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
							{activeBuildStep === i ? `${colorMap[step.color]} text-white` : 'bg-stone-100 text-stone-600'}"
					>
						{step.step}. {step.title}
					</button>
				{/each}
			</div>

			<!-- Current step detail -->
			<div class="bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
				{#key activeBuildStep}
					{@const step = buildProcess[activeBuildStep]}
					{@const colorMap: Record<string, string> = {
						'emerald': 'text-emerald-600',
						'sky': 'text-sky-600',
						'indigo': 'text-indigo-600',
						'amber': 'text-amber-600',
						'rose': 'text-rose-600',
						'teal': 'text-teal-600'
					}}
					<div in:fade={{ duration: 300 }}>
						<div class="text-7xl font-serif font-bold text-stone-100 absolute -top-4 right-4 select-none">
							{step.step}
						</div>
						<h3 class="text-2xl font-bold {colorMap[step.color]} mb-3">{step.title}</h3>
						<p class="text-lg text-stone-600 leading-relaxed">{step.desc}</p>
					</div>
				{/key}
			</div>

			<!-- Progress indicator -->
			<div class="relative w-full bg-stone-100 rounded-full h-2">
				<div
					class="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
					style="width: {((activeBuildStep + 1) / buildProcess.length) * 100}%"
				></div>
			</div>

			<!-- Tools note -->
			<div class="flex items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100">
				<Icon icon="tabler:brand-github" class="w-6 h-6 text-stone-600" />
				<p class="text-sm text-stone-600">
					Versioned on <span class="font-semibold">GitHub</span> so changes are trackable and reviewable.
				</p>
			</div>

			<!-- Playback control -->
			<div class="flex items-center gap-3 text-sm text-stone-500">
				{#if isBuildPaused}
					<button onclick={() => isBuildPaused = false} class="flex items-center gap-2 hover:text-emerald-600 transition-colors">
						<Icon icon="tabler:player-play" class="w-4 h-4" />
						Resume
					</button>
				{:else}
					<span class="flex items-center gap-2">
						<span class="relative flex h-2 w-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
						</span>
						Auto-playing (hover to pause)
					</span>
				{/if}
			</div>
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 7: WHY THIS MATTERS
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			Stress Tests & Realism
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			RCOS uses real failure modes as learning tools. The goal is not perfection, but legibility under stress.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each benefits as benefit, i}
			<div
				class="group relative p-6 rounded-2xl bg-white border border-stone-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
				onmouseenter={() => activeBenefitIndex = i}
				onmouseleave={() => activeBenefitIndex = null}
				in:fly={{ y: 20, duration: 400, delay: i * 100 }}
				role="article"
			>
				<!-- Background gradient on hover -->
				<div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

				<div class="relative z-10">
					<div class="flex items-start gap-4 mb-4">
						<div class="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
							<Icon icon={benefit.icon} class="w-6 h-6" />
						</div>
						<div>
							<h3 class="font-bold text-lg text-stone-800 group-hover:text-emerald-800 transition-colors">
								{benefit.title}
							</h3>
							<p class="text-stone-600 mt-1">{benefit.desc}</p>
						</div>
					</div>

					<!-- Before/After comparison -->
					<div class="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-stone-100">
						<div class="p-3 rounded-lg bg-stone-50">
							<p class="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Before</p>
							<p class="text-sm text-stone-600">{benefit.before}</p>
						</div>
						<div class="p-3 rounded-lg bg-emerald-50">
							<p class="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">After</p>
							<p class="text-sm text-emerald-700">{benefit.after}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Section>

<!-- ============================================
     SECTION 8: HOW YOU CAN USE IT
     ============================================ -->
<Section spacing="lg">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			How You Can Use the Blueprint
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			Practical entry points for different needs.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each useCases as useCase, i}
			<div
				class="group relative p-6 rounded-2xl bg-white border border-stone-100 transition-all duration-300
					{hoveredUseCase === i ? 'shadow-xl border-emerald-200 -translate-y-1' : 'hover:shadow-md'}"
				onmouseenter={() => hoveredUseCase = i}
				onmouseleave={() => hoveredUseCase = null}
				in:fly={{ y: 20, duration: 400, delay: i * 100 }}
				role="article"
			>
				<div class="w-14 h-14 rounded-2xl {useCase.iconBg} {useCase.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
					<Icon icon={useCase.icon} class="w-7 h-7" />
				</div>

				<h3 class="font-bold text-lg text-stone-800 mb-2">{useCase.persona}</h3>
				<p class="text-sm text-stone-600 mb-4">{useCase.description}</p>

				<!-- Reveal on hover -->
				<div class="overflow-hidden transition-all duration-300 {hoveredUseCase === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}">
					<div class="pt-4 border-t border-stone-100">
						<p class="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">You'll find</p>
						<ul class="space-y-1">
							{#each useCase.finds as find}
								<li class="flex items-center gap-2 text-sm text-emerald-700">
									<Icon icon="tabler:check" class="w-4 h-4" />
									{find}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Section>

<!-- ============================================
     SECTION 9: HOW TO CONTRIBUTE
     ============================================ -->
<Section spacing="lg" id="contribute">
	<div class="max-w-3xl mx-auto text-center mb-12">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
			Join the Effort
		</div>
		<h2 class="font-serif text-3xl font-bold leading-tight text-ecohubs-dark sm:text-4xl">
			Help Improve the Standard
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-gray-600">
			The blueprint is publicly readable. Contributions require membership to help keep the core coherent.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Left: Contribution paths -->
		<div class="space-y-4">
			<h3 class="text-xl font-bold text-stone-800 mb-6">Ways to Contribute</h3>

			{#each contributionPaths as path, i}
				{@const colorMap: Record<string, { bg: string; border: string; text: string }> = {
					'emerald': { bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-300', text: 'text-emerald-600' },
					'sky': { bg: 'bg-sky-50', border: 'border-sky-200 hover:border-sky-300', text: 'text-sky-600' },
					'amber': { bg: 'bg-amber-50', border: 'border-amber-200 hover:border-amber-300', text: 'text-amber-600' },
					'rose': { bg: 'bg-rose-50', border: 'border-rose-200 hover:border-rose-300', text: 'text-rose-600' }
				}}
				{@const colors = colorMap[path.color]}
				<div
					class="flex items-start gap-4 p-5 rounded-2xl {colors.bg} border {colors.border} transition-all duration-300 hover:shadow-md"
					in:fly={{ x: -20, duration: 400, delay: i * 100 }}
				>
					<div class="shrink-0 w-10 h-10 rounded-lg bg-white {colors.text} flex items-center justify-center shadow-sm">
						<Icon icon={path.icon} class="w-5 h-5" />
					</div>
					<div>
						<p class="font-semibold text-stone-800">{path.action}</p>
						<p class="text-sm text-stone-600 mt-1">{path.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Right: Contributor journey -->
		<div class="bg-ecohubs-dark rounded-3xl p-8 text-white">
			<h3 class="text-xl font-bold mb-8">Your Journey</h3>

			<div class="space-y-6">
				{#each contributorSteps as step, i}
					<div class="flex items-center gap-4" in:fly={{ x: 20, duration: 400, delay: i * 100 }}>
						<div class="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
							{step.step}
						</div>
						<div class="flex-1 flex items-center gap-3">
							<Icon icon={step.icon} class="w-5 h-5 text-emerald-400" />
							<p class="text-stone-200">{step.text}</p>
						</div>
						{#if i < contributorSteps.length - 1}
							<Icon icon="tabler:arrow-right" class="w-4 h-4 text-emerald-200" />
						{/if}
					</div>
				{/each}
			</div>

			<div class="mt-10 pt-8 border-t border-white/10">
				<a
					href="/join"
					class="block w-full py-4 bg-ecohubs-accent text-white font-bold rounded-xl text-center hover:bg-white hover:text-ecohubs-dark transition-all hover:scale-105 shadow-lg"
				>
					Apply for Membership
				</a>
				<p class="text-sm text-stone-400 text-center mt-4">
					Already a member? <a href="https://os.ecohubs.community" class="text-emerald-400 hover:underline">Start contributing</a>
				</p>
			</div>
		</div>
	</div>
</Section>

<!-- ============================================
     SECTION 10: FINAL CTA
     ============================================ -->
<div class="relative">
	<Section spacing="xl">
		<div class="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-white to-sky-50/50 rounded-3xl"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none"></div>
		<div class="relative overflow-hidden">
			<!-- Background -->

			<div class="relative z-10 max-w-3xl mx-auto text-center py-20 px-8">
				<h2 class="font-serif text-4xl md:text-5xl font-bold text-ecohubs-dark leading-tight">
					This Is a Long-Term Project
				</h2>

				<p class="mt-6 text-xl text-stone-600 leading-relaxed">
					Built <strong>slowly</strong>. Built <strong>carefully</strong>. Built <strong>together</strong>.
				</p>

				<p class="mt-4 text-stone-500">
					Designed to outlive its creators. Designed to grow with every community that uses it.
				</p>

				<div class="mt-12 flex flex-col sm:flex-row justify-center gap-4">
					<a
						href="/join"
						class="px-8 py-4 bg-ecohubs-primary text-white font-bold rounded-xl hover:bg-ecohubs-dark transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2"
					>
						Join the First 500
						<Icon icon="tabler:arrow-right" class="w-5 h-5" />
					</a>
				</div>

				<p class="mt-10 text-sm text-stone-400 flex items-center justify-center gap-2">
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
					The blueprint grows with every contribution.
				</p>
			</div>
		</div>
	</Section>
</div>

<style>
	/* Hide scrollbar for mobile navigation */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
