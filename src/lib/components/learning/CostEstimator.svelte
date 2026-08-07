<script lang="ts">
	/**
	 * The exit calculator for lesson 05.
	 *
	 * **It supplies no market data, on purpose.** Every price in this field is
	 * local, and we have not found a survey we would be willing to publish
	 * ranges from. So the reader brings their own numbers and this supplies the
	 * one thing they will not do by hand: work out what actually comes back when
	 * they leave, under the equity model the community is offering them.
	 *
	 * Appreciation defaults to zero for the same reason. Guessing someone's
	 * housing market would be inventing the most consequential number on the
	 * page.
	 *
	 * The four models and their rules are plain markup, rendered for everyone —
	 * a crawler and a no-JS reader get the whole reference table, which is the
	 * durable part. JavaScript only adds the arithmetic on top; it hides
	 * nothing.
	 */
	import { onMount } from 'svelte';
	import { EQUITY_MODELS as MODELS, LIMITS, estimate, type EquityModel } from '$lib/learning/cost';

	/** Share of appreciation a CLT seller keeps, as a percentage. */
	const CLT_DEFAULT_SHARE = 25;

	let enhanced = $state(false);
	onMount(() => (enhanced = true));

	let symbol = $state('€');
	let entry = $state(300000);
	let monthly = $state(250);
	let years = $state(10);
	let growth = $state(0);
	let model = $state<EquityModel>('market');
	let share = $state(CLT_DEFAULT_SHARE);

	const result = $derived(
		estimate({ model, entry, monthly, years, growthPercent: growth, sharePercent: share })
	);

	const money = (value: number) =>
		symbol + Math.round(value).toLocaleString('en-GB').replace(/,/g, ' ');
</script>

<section
	class="not-prose my-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
	aria-labelledby="cost-estimator"
>
	<h2 id="cost-estimator" class="font-serif text-2xl text-ecohubs-deep">What the years cost you</h2>
	<p class="mt-2 text-stone-700">
		Three numbers decide whether an offer is affordable: what you pay to get in, what you pay every
		month, and what comes back when you leave. The third is the one nobody asks about, and it is the
		one that changes the answer most.
	</p>

	<!-- ── The reference ────────────────────────────────────────────────────────
	     Never hidden. This table is the part worth keeping, and it is readable
	     without JavaScript, without entering anything, and by a crawler. -->
	<h3 class="kicker mt-8 mb-3 text-stone-500">What comes back, by model</h3>
	<dl class="space-y-4">
		{#each MODELS as item (item.id)}
			<div class="rounded-xl border border-stone-200 p-4">
				<dt class="font-serif text-lg text-ecohubs-deep">{item.label}</dt>
				<dd class="mt-1 text-sm leading-relaxed text-stone-700">
					{item.rule}
					<span class="mt-1 block text-stone-500">{item.source}</span>
				</dd>
			</div>
		{/each}
	</dl>

	{#if !enhanced}
		<!-- Shown to a reader without JavaScript, and to the printed guide, where
		     a calculator is no use. Both need somewhere to go. -->
		<p class="mt-6 text-sm text-stone-600">
			The interactive version of this works out what the years cost you from your own numbers. There
			is also a spreadsheet with the same arithmetic in the guide downloads, which works offline and
			lets you keep the figures a community gives you.
		</p>
	{:else}
		<h3 class="kicker mt-8 mb-4 text-stone-500">Put your own numbers in</h3>

		<div class="grid gap-4 sm:grid-cols-2">
			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Currency</span>
				<select
					bind:value={symbol}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				>
					<option value="€">€ euro</option>
					<option value="£">£ pound</option>
					<option value="$">$ dollar</option>
				</select>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Equity model</span>
				<select
					bind:value={model}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				>
					{#each MODELS as item (item.id)}
						<option value={item.id}>{item.label}</option>
					{/each}
				</select>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">What you pay to move in</span>
				<input
					type="number"
					min={LIMITS.entry[0]}
					max={LIMITS.entry[1]}
					step="1000"
					bind:value={entry}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Monthly dues or service charge</span>
				<input
					type="number"
					min={LIMITS.monthly[0]}
					max={LIMITS.monthly[1]}
					step="10"
					bind:value={monthly}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Years you expect to stay</span>
				<input
					type="number"
					min={LIMITS.years[0]}
					max={LIMITS.years[1]}
					step="1"
					bind:value={years}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">
					Yearly appreciation you want to assume, %
				</span>
				<input
					type="number"
					min={LIMITS.growthPercent[0]}
					max={LIMITS.growthPercent[1]}
					step="0.5"
					bind:value={growth}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
				<span class="mt-1 block text-xs text-stone-500">
					Starts at zero. We will not guess your housing market for you.
				</span>
			</label>

			{#if model === 'clt'}
				<label class="block">
					<span class="mb-1 block text-sm text-stone-600"> Share of appreciation you keep, % </span>
					<input
						type="number"
						min={LIMITS.sharePercent[0]}
						max={LIMITS.sharePercent[1]}
						step="1"
						bind:value={share}
						class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
					/>
					<span class="mt-1 block text-xs text-stone-500">
						Read it off the ground lease. Do not assume {CLT_DEFAULT_SHARE}%.
					</span>
				</label>
			{/if}
		</div>

		<div class="mt-8 border-t border-stone-200 pt-6">
			<!-- A live region on the table announced all five rows on every keystroke.
			     One sentence carries the same result and is bearable to listen to. -->
			<p class="sr-only" aria-live="polite">
				{result.net >= 0
					? `Over ${result.years} years this costs ${money(result.net)}, or ${money(result.perMonth)} a month.`
					: `Over ${result.years} years you come out ahead by ${money(-result.net)}.`}
			</p>
			<table class="w-full text-sm">
				<caption class="sr-only">What the period costs under the model you chose</caption>
				<tbody class="[&_td]:py-2 [&_td]:text-right [&_th]:py-2 [&_th]:pr-3 [&_th]:text-left">
					<tr class="border-b border-stone-100">
						<th scope="row" class="font-normal text-stone-600">Paid to move in</th>
						<td class="font-mono text-stone-800">{money(entry)}</td>
					</tr>
					<tr class="border-b border-stone-100">
						<th scope="row" class="font-normal text-stone-600">
							<!-- `result.years` rather than `years`: a typed -5 is clamped before
							     anything is calculated, and the label has to say so. -->
							Dues over {result.years}
							{result.years === 1 ? 'year' : 'years'}
						</th>
						<td class="font-mono text-stone-800">{money(result.dues)}</td>
					</tr>
					<tr class="border-b border-stone-100">
						<th scope="row" class="font-normal text-stone-600">Comes back when you leave</th>
						<td class="font-mono text-emerald-700">{money(result.back)}</td>
					</tr>
					<tr>
						<th scope="row" class="font-serif text-base text-ecohubs-deep">
							{result.net >= 0 ? 'The years cost you' : 'You come out ahead by'}
						</th>
						<td class="font-mono text-base font-medium text-ecohubs-deep">
							{money(Math.abs(result.net))}
						</td>
					</tr>
					<tr>
						<th scope="row" class="font-normal text-stone-500">
							{result.net >= 0 ? 'Which is, per month' : 'Per month'}
						</th>
						<td class="font-mono text-stone-500">{money(Math.abs(result.perMonth))}</td>
					</tr>
				</tbody>
			</table>

			<p class="mt-4 text-xs leading-relaxed text-stone-500">
				A model, not a quote. It ignores the cost of selling, mortgage interest, tax, inflation and
				any special levy the community raises while you live there — and it assumes the dues never
				rise, which they will. Take it to the community and ask them to correct it.
			</p>
		</div>
	{/if}
</section>
