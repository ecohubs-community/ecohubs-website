<script lang="ts">
	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	let { items }: { items: BreadcrumbItem[] } = $props();
</script>

{#if items && items.length > 1}
	<nav aria-label="Breadcrumb">
		<ol
			class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-sans font-normal text-stone-400 leading-snug"
		>
			{#each items as item, i (item.url)}
				{#if i > 0}
					<li aria-hidden="true" class="text-stone-300 select-none">›</li>
				{/if}
				<li>
					{#if i === items.length - 1}
						<span aria-current="page" class="text-stone-600">{item.name}</span>
					{:else}
						<a
							href={item.url}
							class="hover:text-emerald-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded-sm"
						>
							{item.name}
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
{/if}
