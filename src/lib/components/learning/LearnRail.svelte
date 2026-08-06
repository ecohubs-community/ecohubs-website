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
	 * anyone without JS — with an empty rail. The search field is a real GET
	 * form for the same reason: it works before hydration.
	 */
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { LEARN_SECTIONS, activeSection, currentState } from '$lib/learning/sections';
	import { bookmarkCount, watchBookmarks } from '$lib/learning/bookmarks.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import RailIcon from './RailIcon.svelte';

	export interface RailItem {
		href: string;
		label: string;
		/** Shown before the label: a lesson number, a step number. */
		marker?: string;
		/** Marks the entry the reader is on. */
		current?: boolean;
		/** Read/unread. When set, the entry gets a tick circle instead of a marker. */
		done?: boolean;
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

	// Zero until hydration, so the entry renders disabled rather than absent —
	// a nav that grows an item on load is a nav that moved under the reader.
	onMount(watchBookmarks);
	const bookmarks = $derived(bookmarkCount());
	const onBookmarks = $derived(page.url.pathname === '/learn/bookmarks');
	/** Is there a group above the back link? It only needs its own divider if so. */
	const hasLower = $derived(within.length > 0 || sideways.length > 0 || !!footer);

	// Repeated often enough that keeping one copy is what stops the two lists
	// drifting apart.
	const LABEL = 'px-2.5 mb-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#8a8a80]';
	const GROUP = 'mt-[26px] border-t border-stone-200/90 pt-[22px]';
	const TREE = 'flex flex-col gap-px border-l border-[#ece9e2] ml-3';
	const TREE_LINK =
		'flex gap-2 -ml-px border-l py-1.5 pr-2.5 pl-3.5 text-[13px] leading-[1.35] transition-colors';
</script>

<!-- `lg:` and up only. Below that <LearnTabs> in the layout carries the same
     section navigation, and the article column is the priority. -->
<aside class="hidden lg:order-1 lg:block">
	<!-- Scrolls independently: a guide with nine lessons plus a topic tree is
	     taller than the viewport, and the rail should not drag the article. -->
	<div class="sticky top-16 max-h-[calc(100vh-4rem)] self-start overflow-y-auto py-7 pb-16">
		<!-- Always first: where you are in the hub. Every learning page shows
		     this, which is what makes /learn feel like one place. -->
		<p class={LABEL}>Learning</p>

		<!-- A real GET form, so Enter works and the field needs no JavaScript. -->
		<form
			action="/learn/search"
			role="search"
			class="mb-1 flex items-center gap-2 rounded-[10px] border border-stone-200 bg-white px-2.5 py-[7px]"
		>
			<Icon
				icon="tabler:search"
				width="14"
				height="14"
				class="shrink-0 text-stone-400"
				aria-hidden="true"
			/>
			<label for="rail-search" class="sr-only">Search the hub</label>
			<input
				id="rail-search"
				name="q"
				type="search"
				placeholder="Search the hub"
				class="w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-[13px] text-stone-800 placeholder:text-stone-400 focus:ring-0 focus:outline-none"
			/>
		</form>

		<nav aria-label="Learning hub sections" class="flex flex-col gap-0.5">
			{#each LEARN_SECTIONS as section (section.key)}
				<a
					href={section.href}
					aria-current={currentState(page.url.pathname, section, active)}
					class="flex items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-sm transition-colors
					       {active === section.key
						? 'bg-ecohubs-ivory font-medium text-ecohubs-dark'
						: 'text-stone-700 hover:bg-ecohubs-ivory hover:text-ecohubs-dark'}"
				>
					<RailIcon section={section.key} />
					<span>{section.label}</span>
				</a>
			{/each}

			<!-- Always present, so it can be found before there is anything in it;
			     dimmed and inert until there is. -->
			{#if bookmarks > 0}
				<a
					href="/learn/bookmarks"
					aria-current={onBookmarks ? 'page' : undefined}
					class="mt-3 flex items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-sm transition-colors
					       {onBookmarks
						? 'bg-ecohubs-ivory font-medium text-ecohubs-dark'
						: 'text-stone-700 hover:bg-ecohubs-ivory hover:text-ecohubs-dark'}"
				>
					<RailIcon section="bookmarks" />
					<span>Bookmarks</span>
					<span class="ml-auto font-mono text-[10.5px] text-stone-400">{bookmarks}</span>
				</a>
			{:else}
				<span
					aria-disabled="true"
					title="Bookmark a page and it will appear here"
					class="mt-3 flex items-center gap-2.5 rounded-[9px] px-2.5 py-[7px] text-sm text-stone-700 opacity-40"
				>
					<RailIcon section="bookmarks" />
					<span>Bookmarks</span>
				</span>
			{/if}
		</nav>

		<!-- The divider belongs to the lower half, so it must not outlive it: an
		     index page passes none of these, and a rule with nothing beneath it
		     reads as content that failed to load. -->
		{#if within.length}
			<div class={GROUP}>
				{#if withinTitle}<p class={LABEL}>{withinTitle}</p>{/if}
				<ol class={TREE}>
					{#each within as item (item.href)}
						<li>
							<a
								href={item.href}
								aria-current={item.current ? 'page' : undefined}
								class="{TREE_LINK} {item.current
									? 'border-l-ecohubs-primary font-medium text-ecohubs-dark'
									: item.done
										? 'border-l-transparent text-stone-500 hover:text-ecohubs-dark'
										: 'border-l-transparent text-stone-600 hover:text-ecohubs-dark'}"
							>
								{#if item.done !== undefined}
									<!-- Reading progress, as a tick that fills in. -->
									<span
										aria-hidden="true"
										class="mt-[3px] grid size-[13px] shrink-0 place-items-center rounded-full border text-[8px] text-white
										       {item.done ? 'border-ecohubs-primary bg-ecohubs-primary' : 'border-stone-300'}"
									>
										{item.done ? '✓' : ''}
									</span>
								{:else if item.marker}
									<span class="mt-px shrink-0 font-mono text-[11px] text-stone-400">
										{item.marker}
									</span>
								{/if}
								<span class="min-w-0">
									<span class="block">{item.label}</span>
									{#if item.note}
										<span class="mt-0.5 block font-mono text-[10.5px] text-stone-400">
											{item.note}
										</span>
									{/if}
								</span>
							</a>
						</li>
					{/each}
				</ol>
			</div>
		{/if}

		{#if sideways.length}
			<div class={GROUP}>
				{#if sidewaysTitle}<p class={LABEL}>{sidewaysTitle}</p>{/if}
				<ul class={TREE}>
					{#each sideways as item (item.href)}
						<li>
							<a
								href={item.href}
								class="{TREE_LINK} border-l-transparent text-stone-600 hover:text-ecohubs-dark"
							>
								<span class="min-w-0">{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if footer}
			<div class={GROUP}>{@render footer()}</div>
		{/if}

		{#if backLink}
			<div class={hasLower ? GROUP : ''}>
				<a
					href={backLink.href}
					class="group inline-flex items-center gap-2 px-2.5 text-[13px] text-stone-500 transition-colors hover:text-ecohubs-dark"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					{backLink.label}
				</a>
			</div>
		{/if}
	</div>
</aside>
