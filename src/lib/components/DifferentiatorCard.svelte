<script lang="ts">
	import type { ComponentType } from 'svelte';

	let {
		icon,
		title,
		description,
		gradientFrom = 'from-emerald-900/60',
		gradientTo = 'to-transparent'
	}: {
		icon: ComponentType;
		title: string;
		description: string;
		gradientFrom?: string;
		gradientTo?: string;
	} = $props();
</script>

<article
	class="glass-card rounded-2xl p-8 bg-gradient-to-br {gradientFrom} {gradientTo} transition-all-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gaia-primary focus-visible:ring-offset-2"
	tabindex="0"
>
	<div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4">
		<svelte:component this={icon} class="w-7 h-7" aria-hidden="true" />
	</div>
	<h3 class="text-2xl font-bold text-gray-900 font-serif mb-4">{title}</h3>
	<p class="text-gray-700 leading-relaxed">{description}</p>
</article>

