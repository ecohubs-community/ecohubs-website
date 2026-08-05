<script lang="ts">
	/**
	 * Typography wrapper for mdsvex-rendered content.
	 *
	 * Built from Tailwind's typography modifiers rather than a `prose-ecohubs`
	 * stylesheet, so the hub stays in utilities. (The blog defines its own
	 * equivalent as ~200 lines of scoped CSS inside its page component; that is
	 * not reusable here and is not worth duplicating.)
	 *
	 * `layer` marks this as the standard depth layer, so a reader who chose
	 * "quick" sees the short card instead of the body. Pass `layer={null}` for
	 * content outside the depth system — a glossary term, for instance, which
	 * has only one version.
	 */
	import type { Snippet } from 'svelte';

	let {
		layer = 'standard',
		class: className = '',
		children
	}: { layer?: 'standard' | null; class?: string; children: Snippet } = $props();
</script>

<div
	data-depth-layer={layer}
	class="prose prose-lg max-w-none
	       prose-headings:font-serif prose-headings:text-ecohubs-deep prose-headings:font-medium
	       prose-headings:tracking-[-0.005em]
	       prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[1.7em] prose-h2:leading-tight
	       prose-h2:scroll-mt-28
	       prose-h3:mt-9 prose-h3:mb-3 prose-h3:text-[1.3em] prose-h3:scroll-mt-28
	       prose-p:text-stone-700 prose-p:leading-[1.8]
	       prose-li:text-stone-700 prose-li:leading-[1.75]
	       prose-strong:text-ecohubs-deep prose-strong:font-medium
	       prose-a:text-ecohubs-dark prose-a:underline prose-a:decoration-emerald-300
	       prose-a:underline-offset-2 hover:prose-a:decoration-emerald-600
	       prose-blockquote:border-l-2 prose-blockquote:border-emerald-300
	       prose-blockquote:font-story prose-blockquote:italic prose-blockquote:font-normal
	       prose-blockquote:text-ecohubs-deep prose-blockquote:not-italic
	       prose-table:text-[0.95rem] prose-th:text-ecohubs-deep prose-th:font-medium
	       prose-img:rounded-2xl
	       {layer === 'standard' ? '[html[data-depth=quick]_&]:hidden print:block!' : ''}
	       {className}"
>
	{@render children()}
</div>
