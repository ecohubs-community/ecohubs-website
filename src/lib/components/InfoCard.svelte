<script lang="ts">
	import type { ComponentType } from 'svelte';

	let {
		icon,
		iconColor,
		title,
		description,
		solution = ''
	}: {
		icon: ComponentType;
		iconColor: string;
		title: string;
		description: string;
		solution?: string;
	} = $props();
</script>

<article
	class="glass-card rounded-2xl p-8 transition-all-smooth hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gaia-primary focus-visible:ring-offset-2"
	tabindex="0"
>
	<div class="flex items-start gap-4 mb-4">
		<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 {iconColor}">
			<svelte:component this={icon} class="w-6 h-6" aria-hidden="true" />
		</div>
		<h3 class="text-2xl font-bold text-gray-900 font-serif">{title}</h3>
	</div>
	<p class="text-gray-600 leading-relaxed mb-4">{description}</p>
	{#if solution}
		<div class="pt-4 border-t border-gaia-primary/10">
			<p class="text-gaia-primary font-medium text-sm flex items-center gap-2">
				<svelte:component this={icon} class="w-4 h-4" aria-hidden="true" />
				{solution}
			</p>
		</div>
	{/if}
</article>

