<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';

	let {
		features
	}: {
		features: Array<{
			icon: typeof LucideIcon;
			iconColor: string;
			iconBg: string;
			title: string;
			description: string;
			detailTitle: string;
			detailDescription: string;
			detailImage: string;
			detailImageAlt: string;
			buttonText: string;
			buttonBgColor: string;
			buttonIcon: typeof LucideIcon;
		}>;
	} = $props();

	let activeIndex = $state(0);
	let mobileExpandedIndex = $state<number | null>(null);
	let featureElements: HTMLDivElement[] = [];

	function updateGovernance(index: number) {
		activeIndex = index;
		featureElements.forEach((el, i) => {
			if (!el) return;
			if (i === index) {
				el.style.opacity = '1';
			} else {
				el.style.opacity = '0.3';
			}
		});
	}

	function toggleMobileAccordion(index: number) {
		mobileExpandedIndex = mobileExpandedIndex === index ? null : index;
	}

	onMount(() => {
		if (!browser) return;

		// Initialize first feature as active (desktop only)
		updateGovernance(0);

		// Simple scroll-based activation (desktop only)
		const handleScroll = () => {
			if (window.innerWidth < 1024) return; // Skip on mobile

			const scrollPosition = window.scrollY + window.innerHeight / 2;

			featureElements.forEach((el, index) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const elementTop = rect.top + window.scrollY;
				const elementBottom = elementTop + rect.height;

				if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
					updateGovernance(index);
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Mobile View: Accordion -->
<div class="lg:hidden space-y-3">
	{#each features as feature, index (feature.title)}
		<div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
			<button
				onclick={() => toggleMobileAccordion(index)}
				class="w-full p-4 flex items-center gap-4 text-left"
			>
				<div class="w-10 h-10 {feature.iconBg} rounded-full flex items-center justify-center {feature.iconColor} shrink-0">
					<feature.icon class="w-5 h-5" aria-hidden="true" />
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="text-lg font-bold text-gray-900">{feature.title}</h3>
					<p class="text-sm text-gray-500 truncate">{feature.description}</p>
				</div>
				<ChevronDown
					class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 {mobileExpandedIndex === index ? 'rotate-180' : ''}"
					aria-hidden="true"
				/>
			</button>

			{#if mobileExpandedIndex === index}
				<div transition:slide={{ duration: 300 }} class="px-4 pb-4">
					<div class="rounded-xl overflow-hidden mb-4">
						<img
							src={feature.detailImage}
							class="w-full h-40 object-cover"
							alt={feature.detailImageAlt}
							loading="lazy"
						/>
					</div>
					<h4 class="text-lg font-serif font-bold text-gray-900 mb-2">{feature.detailTitle}</h4>
					<p class="text-gray-600 text-sm leading-relaxed">{@html feature.detailDescription}</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

<!-- Desktop View: Scroll-based with sticky panel -->
<div class="hidden lg:flex flex-row gap-12 items-start relative pt-20" id="governance-container">
	<!-- Left Column: Scrolling List of Feature Triggers -->
	<div class="w-1/2 pl-4" id="governance-triggers">
		{#each features as feature, index (feature.title)}
			<div
				bind:this={featureElements[index]}
				class="governance-feature opacity-30 transition-opacity duration-500 py-6 cursor-pointer"
				onclick={() => updateGovernance(index)}
				onkeydown={(e) => e.key === 'Enter' && updateGovernance(index)}
				role="button"
				tabindex="0"
				aria-pressed={activeIndex === index}
			>
				<div class="flex items-center gap-4 mb-2">
					<div class="w-10 h-10 {feature.iconBg} rounded-full flex items-center justify-center {feature.iconColor}">
						<feature.icon class="w-5 h-5" aria-hidden="true" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900">{feature.title}</h3>
				</div>
				<p class="text-gray-500 text-lg mb-2">{feature.description}</p>
			</div>
		{/each}
	</div>

	<!-- Right Column: Sticky Details Panel -->
	<div class="w-1/2 sticky top-24 h-auto">
		<div class="relative w-full aspect-4/3 rounded-3xl overflow-hidden p-1 h-[500px]">
			<div class="w-full h-full bg-gray-50 rounded-2xl relative overflow-hidden">
			{#each features as feature, index (feature.title)}
				<div
					class="absolute inset-0 flex flex-col justify-between p-8 opacity-0 transition-opacity duration-500"
					class:opacity-100={activeIndex === index}
					class:z-20={activeIndex === index}
					class:z-10={activeIndex !== index}
				>
					<div>
						<div class="mb-6 relative rounded-xl overflow-hidden h-48">
							<img
								src={feature.detailImage}
								class="w-full h-full object-cover"
								alt={feature.detailImageAlt}
							/>
							<div class="absolute inset-0 bg-{feature.iconColor.replace('text-', '')}-900/20 mix-blend-multiply"></div>
						</div>
						<h4 class="text-2xl font-serif font-bold text-gray-900 mb-3">{feature.detailTitle}</h4>
						<p class="text-gray-600 leading-relaxed">
							{@html feature.detailDescription}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
</div>