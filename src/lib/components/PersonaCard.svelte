<script lang="ts">
	import type { ComponentType } from 'svelte';

	let {
		icon,
		iconColor,
		iconBg,
		title,
		description
	}: {
		icon: ComponentType;
		iconColor: string;
		iconBg: string;
		title: string;
		description: string;
	} = $props();
</script>

<article
	class="glass-card rounded-2xl p-6 transition-all-smooth text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecohubs-primary focus-visible:ring-offset-2"
	tabindex="0"
>
	<div class="w-16 h-16 rounded-full {iconBg} flex items-center justify-center {iconColor} mx-auto mb-4">
		<svelte:component this={icon} class="w-8 h-8" aria-hidden="true" />
	</div>
	<h3 class="text-xl font-bold text-gray-900 font-serif mb-3">{title}</h3>
	<p class="text-gray-600 leading-relaxed text-sm">{description}</p>
</article>

