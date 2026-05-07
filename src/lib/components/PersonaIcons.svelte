<script lang="ts">
	import { Sprout, Users, Compass, Telescope } from 'lucide-svelte';

	type Props = {
		/** Optional caption rendered next to the icon row. */
		caption?: import('svelte').Snippet;
		/** Optional override of the default icon set. */
		items?: { Icon: typeof Sprout; label: string }[];
		class?: string;
	};

	const defaults = [
		{ Icon: Sprout, label: 'Permaculturists' },
		{ Icon: Users, label: 'Community builders' },
		{ Icon: Compass, label: 'Systems thinkers' },
		{ Icon: Telescope, label: 'Seekers' }
	];

	let { caption, items = defaults, class: className = '' }: Props = $props();
</script>

<div class="flex items-start gap-4 {className}">
	<div class="flex -space-x-2 shrink-0">
		{#each items as { Icon, label }}
			<div
				class="w-10 h-10 rounded-full border-2 border-ecohubs-base bg-white
               shadow-[0_2px_6px_rgba(11,46,36,0.08)] flex items-center justify-center
               text-emerald-700"
				title={label}
				aria-label={label}
			>
				<Icon class="w-[18px] h-[18px]" strokeWidth={1.6} aria-hidden="true" />
			</div>
		{/each}
	</div>
	{#if caption}
		<div class="text-sm text-stone-600 leading-snug pt-1">
			{@render caption()}
		</div>
	{/if}
</div>
