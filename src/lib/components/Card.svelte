<script lang="ts">
	interface Props {
		variant?: 'default' | 'elevated' | 'outlined';
		href?: string;
		external?: boolean;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		href,
		external = false,
		children
	}: Props = $props();

	const isExternal = external || (href?.startsWith('http') ?? false);

	const variantClasses = {
		default: 'bg-surface border border-border',
		elevated: 'bg-surface-elevated shadow-lg',
		outlined: 'bg-background border-2 border-border'
	};

	const baseClasses =
		'rounded-xl p-6 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';
</script>

{#if href}
	{#if isExternal}
		<a href={href} class="{baseClasses} {variantClasses[variant]} block" target="_blank" rel="noopener noreferrer">
			{@render children()}
		</a>
	{:else}
		<a href={href} class="{baseClasses} {variantClasses[variant]} block" data-sveltekit-preload-data="hover">
			{@render children()}
		</a>
	{/if}
{:else}
	<div class="{baseClasses} {variantClasses[variant]}">
		{@render children()}
	</div>
{/if}

