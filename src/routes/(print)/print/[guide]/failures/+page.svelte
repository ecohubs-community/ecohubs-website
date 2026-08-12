<script lang="ts">
	/**
	 * The failure modes as a checklist, rather than as reading.
	 *
	 * The guide PDF already carries every mode in full; reprinting that here
	 * would be seventy pages of the same words. What is missing from a bound
	 * guide is something a group can put on a table and work through together —
	 * so this prints only the observable signs, as boxes, with the argument left
	 * where it already is.
	 *
	 * It is deliberately unwelcoming to a lone reader looking for conclusions:
	 * ticking a box is a claim about the community, and the sheet asks who
	 * agreed with it.
	 */
	import { RCOS_TOOLS } from '$lib/learning/rcos';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const printed = new Date(data.generatedAt).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});

	// One running number across the groups, so a group can say "we ticked four
	// things under 12" and be understood without naming the pattern out loud.
	let counter = $state(0);

	/**
	 * The title after "From the …".
	 *
	 * One guide is called "The Ultimate Guide to Why Communities Fail" and the
	 * other is not, so a literal "From the {title}" printed "From the The
	 * Ultimate Guide" on one sheet and read correctly on the other. Dropping a
	 * leading article and always supplying our own is right for both.
	 */
	const titleAfterThe = $derived(data.guide.title.replace(/^the\s+/i, ''));
</script>

<svelte:head>
	<title>The failure modes as a checklist — {data.guide.title}</title>
</svelte:head>

<section class="sheet">
	<header class="border-b-2 border-ecohubs-deep pb-4">
		<div class="font-mono text-[8.5pt] tracking-[0.2em] text-emerald-800 uppercase">
			EcoHubs Community · {data.guide.title}
		</div>
		<h1 class="mt-2 font-serif text-[22pt] leading-tight text-ecohubs-deep">
			The failure modes, as a checklist
		</h1>
		<p class="mt-2 max-w-[130mm] text-[10pt] leading-relaxed text-stone-600">
			{data.total} patterns and {data.signs} things to check, in the order the guide introduces them.
			Each line is something you can observe rather than something you have to judge — so tick it only
			if it is true now, not if it once was or might be.
		</p>
		<p class="mt-2 max-w-[130mm] text-[10pt] leading-relaxed text-stone-600">
			A single tick under a pattern means little. Several under the same one means that pattern is
			worth reading in full, and the guide has a page for each.
		</p>

		<!-- The sheet is the paper half of somebody else's session format: step 2
		     of the RCOS facilitation guide is everyone marking the signs they
		     recognise, privately, before the room hears anyone's opinion. Saying
		     so is the difference between a handout and a worksheet. -->
		<div class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
			<p class="text-[9pt] leading-relaxed text-stone-700">
				<span class="font-mono text-[8pt] tracking-[0.12em] text-emerald-800 uppercase"
					>Doing this as a group</span
				><br />
				Hand everyone their own copy and let them tick it privately first, so the room does not anchor
				on the loudest voice. The RCOS facilitation guide turns that into a 60–90 minute session that
				ends with a named owner and a date.
			</p>
			<!-- Printed without the scheme and on its own line: `break-all` snapped
			     it mid-word ("https://r cos.ecohubs..."), and somebody typing this
			     off paper does not need to be told it is https. -->
			<p class="mt-1.5 font-mono text-[8.5pt] break-words text-emerald-900">
				{RCOS_TOOLS.facilitation.replace('https://', '')}
			</p>
		</div>

		<!-- Who filled it in, because a checklist nobody signed is a rumour. A
		     mode read alone and a mode agreed by four people are different facts,
		     and the difference is the whole reason to print this. -->
		<div class="mt-4 flex gap-6 border-t border-stone-300 pt-3 text-[9pt] text-stone-500">
			<span class="flex-1">
				Filled in by
				<span class="ml-2 inline-block w-[45mm] border-b border-dotted border-stone-300"></span>
			</span>
			<span class="flex-1">
				Date
				<span class="ml-2 inline-block w-[35mm] border-b border-dotted border-stone-300"></span>
			</span>
		</div>
	</header>

	{#each data.groups as group (group.lesson)}
		<!-- Deliberately breakable. Keeping a whole group together sounds tidier
		     and cost a page: the first group could not fit under the header, so it
		     moved wholly to page 2 and left most of page 1 blank. A single mode is
		     the unit that must not split, and that rule lives on the `li`. -->
		<section class="mt-7">
			<h2 class="font-mono text-[8.5pt] tracking-[0.16em] text-emerald-800 uppercase">
				{group.title}
			</h2>

			<ul class="mt-3 space-y-4">
				{#each group.modes as mode (mode.slug)}
					{@const n = ++counter}
					<li class="break-inside-avoid">
						<div class="flex items-baseline gap-3">
							<span class="w-6 shrink-0 font-mono text-[9pt] text-stone-400">
								{String(n).padStart(2, '0')}
							</span>
							<h3 class="flex-1 font-serif text-[11.5pt] leading-snug text-ecohubs-deep">
								{mode.title}
							</h3>
							<span class="shrink-0 font-mono text-[8pt] text-stone-400">L{mode.layer}</span>
						</div>

						<ul class="mt-1.5 space-y-1 pl-9">
							{#each mode.signs as sign (sign)}
								<li class="flex gap-2.5">
									<span
										class="mt-[1.5pt] h-[9pt] w-[9pt] shrink-0 rounded-[1pt] border border-stone-400"
										aria-hidden="true"
									></span>
									<span class="flex-1 text-[9.5pt] leading-[1.45] text-stone-700">{sign}</span>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	<footer class="mt-9 border-t border-stone-300 pt-4 text-[8.5pt] leading-relaxed text-stone-500">
		<p>
			From the {titleAfterThe}, as it stood on {printed}. Each pattern has its own page — what it
			looks like from inside, why it is hard to see, and what to change — free at
			ecohubs.community/learn/guides/{data.guide.slug}.
		</p>
		<p class="mt-1">
			Print it, copy it, translate it. If you ticked something this sheet has no line for, we would
			like to know.
		</p>
	</footer>
</section>
