<script lang="ts">
	let {
		phase,
		title,
		description
	}: {
		phase: number;
		title: string;
		description: string;
	} = $props();
</script>

<div
	class="relative pl-8 pb-12 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ecohubs-primary rounded-lg transition-all-smooth hover:bg-white/30 p-4"
	tabindex="0"
>
	<div class="absolute left-0 top-0 w-px h-full bg-ecohubs-primary/30"></div>
	<div
		class="absolute left-0 top-0 w-8 h-8 -ml-4 rounded-full bg-ecohubs-primary flex items-center justify-center text-white font-bold text-sm shadow-lg"
	>
		{phase}
	</div>
	<h4 class="text-xl font-bold text-gray-900 mb-2">{title}</h4>
	<p class="text-gray-600 text-sm leading-relaxed">{description}</p>
</div>

