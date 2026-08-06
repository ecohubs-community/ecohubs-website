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
	import { page } from '$app/state';
	import { LEARN_SECTIONS, activeSection, currentState } from '$lib/learning/sections';

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

	const active = $derived(activeSection(page.url.pathname));
	const hasLower = $derived(!!backLink || within.length > 0 || sideways.length > 0 || !!footer);
</script>

<!-- `lg:` and up only. Below that <LearnTabs> in the layout carries the same
     section navigation, and the article column is the priority. -->
<aside class="hidden lg:order-1 lg:block">
	<div class="sticky top-28 space-y-8">
		<!-- Always first: where you are in the hub. Every learning page shows
		     this, which is what makes /learn feel like one place. -->
		<nav aria-label="Learning hub sections">
			<p class="kicker mb-3 text-stone-500">Learning</p>
			<ul class="space-y-0.5 text-sm">
				{#each LEARN_SECTIONS as section (section.key)}
					<li>
						<a
							href={section.href}
							aria-current={currentState(page.url.pathname, section, active)}
							class="block rounded-lg px-2 py-1.5 transition-colors
							       {active === section.key
								? 'bg-ecohubs-dark text-white'
								: 'text-stone-600 hover:bg-stone-50 hover:text-ecohubs-deep'}"
						>
							{section.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- The divider belongs to the lower half, so it must not outlive it: an
		     index page passes none of these, and a rule with nothing beneath it
		     reads as content that failed to load. -->
		{#if hasLower}
			<div class="space-y-8 border-t border-stone-200 pt-6">
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
		{/if}
	</div>
</aside>
