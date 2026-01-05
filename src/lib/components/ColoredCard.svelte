<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		icon,
		title,
		description,
		gradientFrom = 'from-emerald-900/60',
		gradientTo = 'to-transparent'
	}: {
		icon: string;
		title: string;
		description: string;
		gradientFrom?: string;
		gradientTo?: string;
	} = $props();
</script>

<div class="p-8 bg-linear-to-br {gradientFrom} {gradientTo} rounded-2xl border border-{gradientFrom.split('-')[1]}-100">
  <div class="flex items-center gap-4 mb-4">
    <div class="w-12 h-12 bg-{gradientFrom.split('-')[1]}-500 rounded-xl flex items-center justify-center text-white">
      <Icon icon={icon} class="w-6 h-6" aria-hidden="true" />
    </div>
    <h4 class="text-xl font-bold text-gray-900">{title}</h4>
  </div>
  <p class="text-gray-600 leading-relaxed">{description}</p>
</div>