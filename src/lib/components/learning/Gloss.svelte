<script lang="ts">
	/**
	 * An inline glossary reference: underlined in prose, definition on hover or
	 * keyboard focus, linked to the full entry.
	 *
	 * The definition comes from the build-time index, so it is written once in
	 * the glossary and never duplicated into prose. Reveal is CSS-only
	 * (`group-hover` / `group-focus-within`) — no JavaScript, so it works for
	 * crawlers, keyboard users and no-JS readers alike, and the definition text
	 * is always in the DOM.
	 *
	 * A term whose page is still a draft keeps its tooltip but loses its link,
	 * so prose never points at an unpublished page.
	 */
	import type { Snippet } from 'svelte';
	import { termDefinitions } from '$lib/learning';

	let { term, children }: { term: string; children?: Snippet } = $props();

	const entry = $derived(termDefinitions.get(term));
	const href = $derived(entry?.published ? `/learn/glossary/${term}` : null);
</script>

{#if entry}
	<span class="group relative inline-block">
		<svelte:element
			this={href ? 'a' : 'span'}
			href={href ?? undefined}
			class="cursor-help underline decoration-emerald-300 decoration-dotted underline-offset-4
			       hover:decoration-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-500"
			tabindex={href ? undefined : 0}
			role={href ? undefined : 'button'}
			aria-describedby="gloss-{term}"
		>
			{#if children}{@render children()}{:else}{entry.term}{/if}
		</svelte:element>

		<!-- Positioned above the line so it never covers the text being read.
		     `hidden` on small screens: a hover tooltip is meaningless on touch,
		     where the link to the full entry is the better affordance. -->
		<span
			id="gloss-{term}"
			role="tooltip"
			class="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2 hidden
			       w-72 -translate-x-1/2 rounded-xl border border-stone-200 bg-white p-4
			       text-left text-sm leading-relaxed font-normal text-stone-700 opacity-0
			       shadow-lg transition-opacity duration-150
			       group-hover:visible group-hover:opacity-100
			       group-focus-within:visible group-focus-within:opacity-100
			       sm:block"
		>
			<span class="mb-1 block font-medium text-ecohubs-deep">{entry.term}</span>
			{entry.short}
		</span>
	</span>
{:else}
	<!-- Unknown term: the build validator fails on these, so reaching here means
	     the reference was added without a glossary file. Degrade to plain text
	     rather than breaking the sentence. -->
	{#if children}{@render children()}{:else}{term}{/if}
{/if}
