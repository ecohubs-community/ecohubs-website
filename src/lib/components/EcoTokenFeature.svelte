<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';

	let {
		Icon,
		title,
		description,
		gradientFrom = 'from-emerald-600',
		gradientTo = 'to-teal-600'
	}: {
		Icon: typeof LucideIcon;
		title: string;
		description: string;
		gradientFrom?: string;
		gradientTo?: string;
	} = $props();
  
</script>

<div
	class="flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecohubs-primary rounded-lg transition-all-smooth hover:bg-white/50"
	tabindex="0"
>
	<div
		class="w-16 h-16 rounded-full bg-gradient-to-br {gradientFrom} {gradientTo} flex items-center justify-center text-white shrink-0 shadow-md"
	>
		<Icon class="w-6 h-6" aria-hidden="true" />
	</div>
	<div>
		<h4 class="text-lg font-bold text-gray-900 mb-2">{title}</h4>
		<p class="text-gray-600 text-sm leading-relaxed">{description}</p>
	</div>
</div>

