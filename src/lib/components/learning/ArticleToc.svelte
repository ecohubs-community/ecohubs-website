<script lang="ts">
	/**
	 * "On this page" — the section list above a long article.
	 *
	 * Duplicates the rail's `within` list on purpose: the rail is hidden below
	 * `lg`, and on a phone this card is the only way to see the shape of the
	 * article before committing to it.
	 *
	 * Two columns on wider screens via CSS columns rather than a grid, so the
	 * numbering stays in reading order down the first column and then the
	 * second — a grid would interleave them left-to-right.
	 */
	import type { TocHeading } from '$lib/learning/types';

	let { headings }: { headings: TocHeading[] } = $props();
</script>

{#if headings.length > 1}
	<nav
		aria-label="On this page"
		class="not-prose rounded-[20px] border border-stone-200/90 bg-white px-6 py-5.5"
	>
		<div class="mb-4 flex items-center justify-between gap-4">
			<span class="kicker text-emerald-700">On this page</span>
			<span class="font-mono text-[11px] tracking-[0.06em] text-[#8a8a80]">
				{headings.length} sections
			</span>
		</div>
		<ol class="gap-x-8 sm:columns-2">
			{#each headings as heading, i (heading.id)}
				<li class="break-inside-avoid">
					<a
						href="#{heading.id}"
						class="flex gap-2.5 py-[5px] text-sm text-stone-600 transition-colors hover:text-ecohubs-dark"
					>
						<span class="shrink-0 font-mono text-[11px] text-stone-400">
							{String(i + 1).padStart(2, '0')}
						</span>
						<span class="min-w-0">{heading.text}</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>
{/if}
