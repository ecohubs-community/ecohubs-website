<script lang="ts">
	import type { ComponentType } from 'svelte';
	import {
		ScrollText,
		MessageCircle,
		Vote,
		LayoutDashboard,
		Coins,
		MessagesSquare,
		Target,
		GitBranch,
		ArrowRight,
		Network,

		Wifi,

		Battery


	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface EcosystemTool {
		icon: ComponentType;
		iconColor: string;
		iconBg: string;
		hoverBorderColor: string;
		hoverRingColor: string;
		hoverTextColor: string;
		title: string;
		description: string;
		category: 'onboarding' | 'dialogue' | 'action' | 'governance';
		highlight?: boolean;
	}

	const tools: EcosystemTool[] = [
		{
			icon: ScrollText,
			iconColor: 'text-blue-600',
			iconBg: 'bg-blue-50',
			hoverBorderColor: 'hover:border-blue-200',
			hoverRingColor: 'ring-blue-200',
			hoverTextColor: 'text-blue-600',
			title: 'Application Form',
			description: 'Selective membership process. We welcome aligned contributors who share our vision for regenerative communities.',
			category: 'onboarding'
		},
		{
			icon: LayoutDashboard,
			iconColor: 'text-emerald-600',
			iconBg: 'bg-emerald-50',
			hoverBorderColor: 'hover:border-emerald-200',
			hoverRingColor: 'ring-emerald-200',
			hoverTextColor: 'text-emerald-600',
			title: 'EcoHubsOS',
			description: 'The central hub connecting all tools. Member dashboard, onboarding flow, and unified access to our ecosystem.',
			category: 'onboarding',
			highlight: true
		},
		{
			icon: MessageCircle,
			iconColor: 'text-indigo-600',
			iconBg: 'bg-indigo-50',
			hoverBorderColor: 'hover:border-indigo-200',
			hoverRingColor: 'ring-indigo-200',
			hoverTextColor: 'text-indigo-600',
			title: 'Discord',
			description: 'Real-time community chat. Public channels for open discussion, private member channels for deeper collaboration.',
			category: 'dialogue'
		},
		{
			icon: MessagesSquare,
			iconColor: 'text-purple-600',
			iconBg: 'bg-purple-50',
			hoverBorderColor: 'hover:border-purple-200',
			hoverRingColor: 'ring-purple-200',
			hoverTextColor: 'text-purple-600',
			title: 'Flarum Forum',
			description: 'Structured discussions for proposals, decisions, and sense-making. Where ideas mature before voting.',
			category: 'dialogue'
		},
		{
			icon: Target,
			iconColor: 'text-orange-600',
			iconBg: 'bg-orange-50',
			hoverBorderColor: 'hover:border-orange-200',
			hoverRingColor: 'ring-orange-200',
			hoverTextColor: 'text-orange-600',
			title: 'Puckstack',
			description: 'Gas-free bounty board. Organize work with tasks & quests, reward effort with XP & tokens, govern with earned authority.',
			category: 'action'
		},
		{
			icon: GitBranch,
			iconColor: 'text-teal-600',
			iconBg: 'bg-teal-50',
			hoverBorderColor: 'hover:border-teal-200',
			hoverRingColor: 'ring-teal-200',
			hoverTextColor: 'text-teal-600',
			title: 'Blueprint App',
			description: 'Git-based collaboration for structuring and writing articles. GitHub workflows with PRs and approvals for quality control.',
			category: 'action'
		},
		{
			icon: Vote,
			iconColor: 'text-amber-600',
			iconBg: 'bg-amber-50',
			hoverBorderColor: 'hover:border-amber-200',
			hoverRingColor: 'ring-amber-200',
			hoverTextColor: 'text-amber-600',
			title: 'Snapshot',
			description: 'Gas-free voting for member applications, decisions, blog posts, and governance. Transparent and auditable.',
			category: 'governance'
		},
		{
			icon: Coins,
			iconColor: 'text-rose-600',
			iconBg: 'bg-rose-50',
			hoverBorderColor: 'hover:border-rose-200',
			hoverRingColor: 'ring-rose-200',
			hoverTextColor: 'text-rose-600',
			title: 'Offcoin',
			description: 'Off-chain tokens reward collaboration. XP unlocks permissions and responsibilities. Built into Puckstack and EcoHubsOS.',
			category: 'governance'
		}
	];

	let hoveredIndex = $state<number | null>(null);
	let sectionRef: HTMLElement;

	onMount(() => {
		if (!browser) return;
		// Add scroll reveal animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => {
			if (sectionRef) observer.unobserve(sectionRef);
		};
	});
</script>

<section id="ecosystem" bind:this={sectionRef} class="py-24 md:py-32 relative bg-gradient-to-b from-white to-emerald-50/30">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-sm font-bold text-ecohubs-primary tracking-widest uppercase mb-2">Our Digital Mycelium</h2>
			<h3 class="text-4xl md:text-5xl font-serif font-bold text-ecohubs-dark mb-6 leading-tight">
				Tools for <span class="text-gradient">Co-Creation</span>
			</h3>
			<p class="text-gray-600 text-lg leading-relaxed mb-4">
				EcoHubs is more than a website—it's a connected ecosystem of tools designed for collaboration, governance, and collective intelligence. Each platform serves a specific purpose, all unified through EcoHubsOS.
			</p>
			<p class="text-ecohubs-primary font-medium max-w-xl mx-auto">
				Like mycelial networks, our tools connect to form something greater than the sum of their parts.
			</p>
		</div>

		<!-- Ecosystem Grid -->
		<div class="relative">
			<!-- Central Hub Visualization (EcoHubsOS) -->
			<div class="relative mb-12 flex justify-center">
				<div
					role="button"
					tabindex="0"
					class="relative group cursor-pointer transition-all duration-500 {hoveredIndex === 1
						? 'scale-110'
						: 'scale-100'}"
					onmouseenter={() => (hoveredIndex = 1)}
					onmouseleave={() => (hoveredIndex = null)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							hoveredIndex = hoveredIndex === 1 ? null : 1;
						}
					}}
				>
					<div
						class="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 max-w-md mx-auto {hoveredIndex === 1
							? 'ring-4 ring-emerald-200'
							: ''}"
					>
						<div class="flex items-center gap-4 mb-4">
							<div class="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
								<LayoutDashboard class="w-8 h-8" aria-hidden="true" />
							</div>
							<div>
								<h4 class="text-2xl font-serif font-bold text-gray-900">EcoHubsOS</h4>
								<p class="text-sm text-emerald-600 font-medium">The Central Hub</p>
							</div>
						</div>
						<div >
							<div class="w-full relative overflow-hidden aspect-video bg-slate-200 rounded-lg mb-3 flex items-center justify-center  shadow-lg">
								<div class="w-full h-4 bg-emerald-500 absolute top-0 left-0 flex items-center justify-between px-2">
									<div class="w-1/2 text-white text-xs ">ecohubsOS</div>
									<div class="w-1/2 text-white text-right flex justify-end items-center gap-1">
										<Wifi class="w-3 h-3" aria-hidden="true" />
										<Battery class="w-3 h-3" aria-hidden="true" />
									</div>
								</div>

								<div class="flex flex-col absolute top-7 left-3 p-2 bg-white rounded-md w-38 h-22 items-start justify-center gap-2">
									<div class="flex items-start justify-center gap-3">
										<div class="w-5 h-5 min-w-5 min-h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
											<img src="https://i.pravatar.cc/150?u=2" alt="Avatar" class="w-full h-full object-cover rounded-full" />
										</div>
										<div class="flex flex-col items-start justify-center">
											<div class="text-xs text-slate-800 font-medium">JonDoe</div>
											<div class="text-xs text-slate-300">
												<span class="text-emerald-500 font-medium">120 ECO</span> | <span class="text-indigo-500">800 XP</span>
											</div>
										</div>
									</div>
									<div class="space-y-1 w-full">
										<div class="flex justify-between text-xs opacity-70 text-slate-500">
											<span>Level 2</span>
										</div>
										<div class="h-1.5 w-full overflow-hidden rounded-full bg-black/20">
											<div class="h-full w-[80%] bg-linear-to-r from-indigo-500 to-purple-300"></div>
										</div>
									</div>
								</div>

								<div class="w-1/2 h-6 absolute bottom-4 left-1/2 gap-2 -translate-x-1/2 bg-slate-400/70 backdrop-blur-sm rounded-md flex items-center justify-center shadow-lg">	
									{#each tools.filter((t) => !t.highlight) as tool, index (tool.title)}
										{@const displayIndex = index >= 1 ? index + 1 : index}
										{@const ToolIcon = tool.icon}
										<button
											type="button"
											class="text-left rounded-2xl shadow-sm border cursor-pointer border-gray-100 hover:shadow-xl {tool.hoverBorderColor}  transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecohubs-primary focus-visible:ring-offset-2 {hoveredIndex === displayIndex
												? 'ring-2 ' + tool.hoverRingColor + ' scale-105'
												: ''}"
											onmouseenter={() => (hoveredIndex = displayIndex)}
											onmouseleave={() => (hoveredIndex = null)}
										>
											<div class="w-4 h-4 aspect-square flex rounded-full items-center justify-center {tool.iconBg} {tool.iconColor}">	<ToolIcon class="w-3 h-3" aria-hidden="true" /></div>	
										</button>
									{/each}
								</div>



							</div>
						</div>
						<p class="text-gray-600 leading-relaxed mb-4">
							Your unified dashboard connecting all tools. Onboarding, member overview, and seamless navigation across our ecosystem.
						</p>
						<div class="flex items-center gap-2 text-emerald-600 font-medium text-sm">
							<Network class="w-4 h-4" aria-hidden="true" />
							<span>Connects all tools</span>
						</div>
					</div>
					<!-- Connection lines indicator (decorative) -->
					<div class="absolute inset-0 pointer-events-none opacity-20">
						<div
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-emerald-300 rounded-full scale-150 animate-pulse"
						></div>
					</div>
				</div>
			</div>

			<!-- Tools Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each tools.filter((t) => !t.highlight) as tool, index (tool.title)}
					{@const displayIndex = index >= 1 ? index + 1 : index}
					{@const ToolIcon = tool.icon}
					<button
						type="button"
						class="text-left bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl {tool.hoverBorderColor} transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecohubs-primary focus-visible:ring-offset-2 {hoveredIndex === displayIndex
							? 'ring-2 ' + tool.hoverRingColor + ' scale-105'
							: ''}"
						onmouseenter={() => (hoveredIndex = displayIndex)}
						onmouseleave={() => (hoveredIndex = null)}
					>
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 {tool.iconBg} rounded-xl flex items-center justify-center {tool.iconColor} shrink-0">
								<ToolIcon class="w-6 h-6" aria-hidden="true" />
							</div>
							<h4 class="text-lg font-bold text-gray-900 font-serif">{tool.title}</h4>
						</div>
						<p class="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
						<div
							class="mt-4 flex items-center gap-2 {tool.hoverTextColor} text-xs font-medium opacity-0 transition-opacity duration-300 {hoveredIndex === displayIndex
								? 'opacity-100'
								: ''}"
						>
							<!-- <span>Learn more</span> -->
							<!-- <ArrowRight class="w-3 h-3" aria-hidden="true" /> -->
						</div>
					</button>
				{/each}
			</div>

			<!-- Category Labels (Optional decorative element) -->
			<div class="mt-12 flex flex-wrap justify-center gap-6 text-sm">
				<div class="flex items-center gap-2 text-blue-600">
					<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
					<span class="font-medium">Onboarding</span>
				</div>
				<div class="flex items-center gap-2 text-indigo-600">
					<div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
					<span class="font-medium">Dialogue</span>
				</div>
				<div class="flex items-center gap-2 text-orange-600">
					<div class="w-2 h-2 bg-orange-500 rounded-full"></div>
					<span class="font-medium">Action</span>
				</div>
				<div class="flex items-center gap-2 text-amber-600">
					<div class="w-2 h-2 bg-amber-500 rounded-full"></div>
					<span class="font-medium">Governance</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
	}
</style>