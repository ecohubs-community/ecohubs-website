<script lang="ts">
	/**
	 * The little line icons beside each rail section, taken from the design.
	 *
	 * Inline rather than an icon font or sprite: there are five of them, they
	 * never change, and `stroke="currentColor"` is what lets the active state
	 * tint the icon along with its label.
	 */
	let { section }: { section: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	aria-hidden="true"
	class="size-[15px] shrink-0 opacity-75"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#if section === 'hub'}
		<!-- Two open pages -->
		<path d="M4 5.5A1.5 1.5 0 015.5 4H11v16H5.5A1.5 1.5 0 014 18.5z" />
		<path d="M20 5.5A1.5 1.5 0 0018.5 4H13v16h5.5a1.5 1.5 0 001.5-1.5z" />
	{:else if section === 'guides'}
		<!-- A document with lines -->
		<rect x="4" y="4" width="16" height="16" rx="2.5" />
		<path d="M8 9h8M8 13h8M8 17h5" />
	{:else if section === 'topics'}
		<!-- Four tiles -->
		<rect x="4" y="4" width="7" height="7" rx="1.6" />
		<rect x="13" y="4" width="7" height="7" rx="1.6" />
		<rect x="4" y="13" width="7" height="7" rx="1.6" />
		<rect x="13" y="13" width="7" height="7" rx="1.6" />
	{:else if section === 'paths'}
		<!-- Nodes joined into a route -->
		<circle cx="7" cy="6" r="2.2" />
		<circle cx="17" cy="12" r="2.2" />
		<circle cx="7" cy="18" r="2.2" />
		<path d="M9.2 6H14a3 3 0 013 3v.8M14.8 12H10a3 3 0 00-3 3v.8" />
	{:else if section === 'glossary'}
		<!-- A closed book -->
		<path d="M6 4h11a2 2 0 012 2v14H8a2 2 0 01-2-2z" />
		<path d="M6 17h13" />
	{:else if section === 'map'}
		<!-- A compass rose -->
		<circle cx="12" cy="12" r="8" />
		<circle cx="12" cy="12" r="2.2" />
		<path d="M12 4v3.8M12 16.2V20M4 12h3.8M16.2 12H20" />
	{/if}
</svg>
