<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		icon,
		iconColor,
		iconBg,
		title,
		description
	}: {
		icon: string;
		iconColor: string;
		iconBg: string;
		title: string;
		description: string;
	} = $props();
</script>


<div class="glass-card p-6 rounded-2xl hover:bg-white/90 transition-all">
	<div class="w-12 h-12 {iconBg} rounded-xl flex items-center justify-center mb-4 {iconColor}">
		<Icon icon={icon} class="w-6 h-6" aria-hidden="true" />
	</div>
	<h4 class="text-lg font-bold text-gray-900 mb-2">{title}</h4>
	<p class="text-gray-500 text-sm leading-relaxed">{description}</p>
</div>