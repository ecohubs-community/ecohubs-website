<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';

	let {
		image,
		imageAlt,
		Icon,
		iconBg,
		heading,
		subheading = '',
		description,
		link = '',
		variant = 'default',
		gradientFrom = 'from-emerald-900/60',
		gradientTo = 'to-transparent'
	}: {
		image: string;
		imageAlt: string;
		Icon: typeof LucideIcon;
		iconBg: string;
		heading: string;
		subheading?: string;
		description: string;
		link?: string;
		variant?: 'default' | 'cta';
		gradientFrom?: string;
		gradientTo?: string;
	} = $props();

	const cardClasses = variant === 'cta'
		? 'break-inside-avoid rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-1 group bg-linear-to-br from-gaia-primary to-gaia-dark border-2 border-gaia-primary/20'
		: 'break-inside-avoid rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-1 group bg-white border border-emerald-100 hover:border-emerald-200';
</script>

<article
	class={cardClasses}
	role="listitem"
	tabindex="0"
	aria-labelledby="{heading.toLowerCase().replace(/\s+/g, '-')}-heading"
>
	{#if variant === 'cta'}
		<div class="relative h-48 overflow-hidden rounded-xl">
			<img
				src={image}
				class="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 rounded-xl "
				alt={imageAlt}
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-gaia-dark/80 to-transparent"></div>
			<div class="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
				<Icon class="w-6 h-6 text-white" aria-hidden="true" />
			</div>
		</div>
		<div class="py-6 text-white">
			<h4
				id="{heading.toLowerCase().replace(/\s+/g, '-')}-heading"
				class="text-xl font-serif font-bold mb-2"
			>
				{heading}
			</h4>
			<p class="text-emerald-50 text-sm leading-relaxed mb-6">{description}</p>
			<a
				href={link}
				class="w-full px-6 py-3 bg-white text-gaia-primary rounded-xl font-medium hover:bg-emerald-50 hover:scale-105 hover:rotate-1 transition-all flex items-center justify-center gap-2 shadow-lg"
			>
				Explore Blueprint
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	{:else}
		<div class="relative h-48 overflow-hidden rounded-xl">
			<img
				src={image}
				class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				alt={imageAlt}
			/>
			<div class="absolute inset-0 bg-gradient-to-t {gradientFrom} {gradientTo}"></div>
			<div
				class="absolute top-4 left-4 w-12 h-12 {iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center"
			>
				<Icon class="w-6 h-6 text-white" aria-hidden="true" />
			</div>
		</div>
		<div class="pt-6">
			<h4
				id="{heading.toLowerCase().replace(/\s+/g, '-')}-heading"
				class="text-xl font-serif font-bold text-gaia-dark mb-2"
			>
				{heading}
			</h4>
			{#if subheading}
				<h5 class="text-lg font-serif text-gray-900 mb-2">{subheading}</h5>
			{/if}
			<p class="text-gray-600 text-sm leading-relaxed">{description}</p>
		</div>
	{/if}
</article>

