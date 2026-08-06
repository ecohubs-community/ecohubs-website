<script lang="ts">
	/**
	 * The section navigation as a scrollable tab row, for screens below `lg`
	 * where the rail is hidden. Same links, same active state.
	 */
	import { page } from '$app/state';
	import { LEARN_SECTIONS, activeSection, currentState } from '$lib/learning/sections';

	const active = $derived(activeSection(page.url.pathname));
</script>

<nav
	aria-label="Learning sections"
	class="border-b border-stone-200/70 bg-ecohubs-base/90 backdrop-blur lg:hidden"
>
	<div class="mx-auto max-w-6xl overflow-x-auto px-6">
		<ul class="flex gap-1 py-2 whitespace-nowrap">
			{#each LEARN_SECTIONS as section (section.key)}
				<li>
					<a
						href={section.href}
						aria-current={currentState(page.url.pathname, section, active)}
						class="inline-block rounded-full px-3 py-1.5 text-sm transition-colors
						       {active === section.key
							? 'bg-ecohubs-dark text-white'
							: 'text-stone-600 hover:text-ecohubs-deep'}"
					>
						{section.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
