<script lang="ts">
	/**
	 * The left rail.
	 *
	 * Two halves, and the lower one changes with the page type:
	 *
	 *   upper (`within`)    navigate inside the current thing — a guide's lesson
	 *                       tree, a topic's sections, a path's steps
	 *   lower (`sideways`)  navigate to siblings — the guide overview, other
	 *                       guides, related topics, nearby terms
	 *
	 * One component rather than six sidebars: a page passes whichever halves it
	 * has, and an empty half renders nothing.
	 *
	 * Plain server-rendered links throughout. The design mockup fills its tree
	 * from JavaScript (`<div id="railtree">`), which would leave a crawler — and
	 * anyone without JS — with an empty rail.
	 */
	import type { Snippet } from 'svelte';

	export interface RailItem {
		href: string;
		label: string;
		/** Shown before the label: a lesson number, a step number. */
		marker?: string;
		/** Marks the entry the reader is on. */
		current?: boolean;
		/** Secondary line, e.g. reading time. */
		note?: string;
	}

	let {
		withinTitle,
		within = [],
		sidewaysTitle,
		sideways = [],
		backLink,
		footer
	}: {
		withinTitle?: string;
		within?: RailItem[];
		sidewaysTitle?: string;
		sideways?: RailItem[];
		/** "↩ Guide overview" and the like. */
		backLink?: { href: string; label: string };
		/** Progress lands here in step 9. */
		footer?: Snippet;
	} = $props();

	const hasAnything = $derived(
		within.length > 0 || sideways.length > 0 || Boolean(backLink) || Boolean(footer)
	);
</script>

{#if hasAnything}
	<!-- `lg:` and up only. Below that the article column is the priority and the
	     page's own inline contents card does this job. -->
	<aside class="hidden lg:order-1 lg:block">
		<div class="sticky top-28 space-y-8">
			{#if backLink}
				<a
					href={backLink.href}
					class="group inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-ecohubs-deep"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					{backLink.label}
				</a>
			{/if}

			{#if within.length}
				<nav aria-label={withinTitle ?? 'On this page'}>
					{#if withinTitle}
						<p class="kicker mb-3 text-stone-500">{withinTitle}</p>
					{/if}
					<ol class="space-y-1.5 text-sm">
						{#each within as item (item.href)}
							<li>
								<a
									href={item.href}
									aria-current={item.current ? 'page' : undefined}
									class="flex gap-2.5 rounded-lg px-2 py-1.5 transition-colors
									       {item.current
										? 'bg-emerald-50 text-ecohubs-deep'
										: 'text-stone-600 hover:bg-stone-50 hover:text-ecohubs-deep'}"
								>
									{#if item.marker}
										<span class="shrink-0 font-story text-stone-400 italic">{item.marker}</span>
									{/if}
									<span class="min-w-0">
										<span class="block leading-snug">{item.label}</span>
										{#if item.note}
											<span class="mt-0.5 block text-xs text-stone-400">{item.note}</span>
										{/if}
									</span>
								</a>
							</li>
						{/each}
					</ol>
				</nav>
			{/if}

			{#if sideways.length}
				<nav aria-label={sidewaysTitle ?? 'Related'} class="border-t border-stone-200 pt-6">
					{#if sidewaysTitle}
						<p class="kicker mb-3 text-stone-500">{sidewaysTitle}</p>
					{/if}
					<ul class="space-y-2 text-sm">
						{#each sideways as item (item.href)}
							<li>
								<a
									href={item.href}
									class="block leading-snug text-stone-600 transition-colors hover:text-ecohubs-deep"
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}

			{#if footer}
				<div class="border-t border-stone-200 pt-6">
					{@render footer()}
				</div>
			{/if}
		</div>
	</aside>
{/if}
