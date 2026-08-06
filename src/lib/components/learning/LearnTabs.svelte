<script lang="ts">
	/**
	 * The section navigation as a scrollable tab row, for screens below `lg`
	 * where the rail is hidden. Same links, same active state.
	 *
	 * Search is appended as a tab rather than shown as a field: the rail's
	 * search box has no room here, and a tab keeps the row to one line.
	 */
	import { page } from '$app/state';
	import { LEARN_SECTIONS, activeSection, currentState } from '$lib/learning/sections';

	const active = $derived(activeSection(page.url.pathname));
	const onSearch = $derived(page.url.pathname === '/learn/search');

	const TAB = 'inline-block rounded-full border px-3.5 py-[7px] text-[13.5px] whitespace-nowrap';
	const ON = 'border-ecohubs-dark bg-ecohubs-dark text-ecohubs-ivory';
	const OFF = 'border-stone-200 bg-white text-stone-700 hover:text-ecohubs-dark';
</script>

<nav
	aria-label="Learning sections"
	class="sticky top-16 z-30 border-b border-stone-200/90 bg-ecohubs-base/95 backdrop-blur lg:hidden"
>
	<div class="mx-auto max-w-6xl overflow-x-auto px-6 [scrollbar-width:none]">
		<ul class="flex gap-1.5 py-2.5">
			{#each LEARN_SECTIONS as section (section.key)}
				<li>
					<a
						href={section.href}
						aria-current={currentState(page.url.pathname, section, active)}
						class="{TAB} {active === section.key ? ON : OFF}"
					>
						{section.label}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="/learn/search"
					aria-current={onSearch ? 'page' : undefined}
					class="{TAB} {onSearch ? ON : OFF}"
				>
					Search
				</a>
			</li>
		</ul>
	</div>
</nav>
