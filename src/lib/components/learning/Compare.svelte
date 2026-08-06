<script lang="ts">
	/**
	 * A side-by-side comparison table.
	 *
	 * Rendered as a real `<table>` on purpose. The table is the quotable asset
	 * on a comparison page — it is what an AI assistant lifts and what a
	 * featured snippet extracts — and a grid of `<div>`s is invisible to both.
	 *
	 * Scrolls horizontally inside its own container rather than letting the page
	 * scroll sideways on a phone.
	 */
	export interface CompareRow {
		/** Row heading — the dimension being compared. */
		label: string;
		/** One cell per column, in the same order as `columns`. */
		values: string[];
	}

	let { columns, rows, caption }: { columns: string[]; rows: CompareRow[]; caption?: string } =
		$props();
</script>

<!-- `not-prose` so the typography plugin's own table styling does not fight the
     explicit styling below; the table markup here is fully controlled. -->
<div class="not-prose my-10 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
	<table class="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
		{#if caption}
			<caption class="mb-3 text-left font-story text-sm text-stone-500 italic">
				{caption}
			</caption>
		{/if}
		<thead>
			<tr class="border-b border-stone-300">
				<th scope="col" class="py-3 pr-4 font-medium text-stone-500">
					<span class="sr-only">Dimension</span>
				</th>
				{#each columns as column (column)}
					<th scope="col" class="py-3 pr-4 font-serif text-base font-medium text-ecohubs-deep">
						{column}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.label)}
				<tr class="border-b border-stone-200 align-top">
					<th scope="row" class="py-4 pr-4 font-medium text-stone-600">{row.label}</th>
					{#each row.values as value, i (columns[i] ?? i)}
						<td class="py-4 pr-4 leading-relaxed text-stone-700">{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
