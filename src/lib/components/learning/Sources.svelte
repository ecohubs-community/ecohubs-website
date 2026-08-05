<script lang="ts">
	/**
	 * The citation list at the foot of a piece.
	 *
	 * "Every claim traceable" is an editorial rule for the hub, and it is also
	 * what makes a page citable by an AI assistant — a claim with a visible,
	 * linked source is far more quotable than an assertion. Rendering these as a
	 * real ordered list keeps them extractable.
	 */
	import type { Snippet } from 'svelte';

	export interface Source {
		title: string;
		url?: string;
		/** Publication, author, or the archive a dead original was recovered from. */
		note?: string;
	}

	let {
		items = [],
		title = 'Sources & further reading',
		children
	}: { items?: Source[]; title?: string; children?: Snippet } = $props();
</script>

<section class="mt-14 border-t border-stone-200 pt-8">
	<h2 class="kicker mb-4 text-stone-500">{title}</h2>

	{#if children}
		<div class="text-sm leading-relaxed text-stone-600">{@render children()}</div>
	{:else}
		<ol class="space-y-3 text-sm leading-relaxed text-stone-600">
			{#each items as source, i (source.url ?? source.title)}
				<li class="flex gap-3">
					<span class="shrink-0 font-story text-stone-400 italic">{i + 1}</span>
					<span>
						{#if source.url}
							<a
								href={source.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-ecohubs-dark underline decoration-emerald-300 underline-offset-2
								       hover:decoration-emerald-600"
							>
								{source.title}
							</a>
						{:else}
							{source.title}
						{/if}
						{#if source.note}
							<span class="text-stone-500"> — {source.note}</span>
						{/if}
					</span>
				</li>
			{/each}
		</ol>
	{/if}
</section>
