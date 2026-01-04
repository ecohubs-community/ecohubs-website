<script lang="ts">
	interface Props {
		columns?: 1 | 2 | 3 | 4;
		spacing?: 'sm' | 'md' | 'lg' | 'xl';
		container?: boolean;
		children: import('svelte').Snippet;
	}

	let {
		columns = 1,
		spacing = 'lg',
		container = true,
		children
	}: Props = $props();

	const spacingClasses = {
		sm: 'py-8 md:py-12',
		md: 'py-12 md:py-16',
		lg: 'py-16 md:py-24',
		xl: 'py-24 md:py-32'
	};

	const gridClasses = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
	};
</script>

<section class="w-full {spacingClasses[spacing]}">
	{#if container}
		<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ">
			{#if columns > 1}
				<div class="grid w-full gap-6 {gridClasses[columns]} lg:gap-8">
					{@render children()}
				</div>
			{:else}
				<div class="w-full">
					{@render children()}
				</div>
			{/if}
		</div>
	{:else}
		{#if columns > 1}
			<div class="grid w-full gap-6 {gridClasses[columns]} lg:gap-8">
				{@render children()}
			</div>
		{:else}
			<div class="w-full">
				{@render children()}
			</div>
		{/if}
	{/if}
</section>

