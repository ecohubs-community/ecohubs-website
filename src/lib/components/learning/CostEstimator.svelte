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
	import { estimate, type EquityModel } from '$lib/learning/cost';

	const MODELS: { id: EquityModel; label: string; rule: string; source: string }[] = [
		{
			id: 'market',
			label: 'You own it and may sell at market',
			rule: 'You get whatever the home is then worth, less the cost of selling. Freehold homes, and most cohousing.',
			source: 'Structural — ordinary property law.'
		},
		{
			id: 'clt',
			label: 'Community land trust, improvements-only formula',
			rule: 'You bought the building, not the ground under it, and you keep only an agreed share of the building’s appreciation. The rest stays with the trust so the next household can afford the home.',
			source:
				'Grounded Solutions Network puts the typical share at about 25%, with some trusts scaling it from 5% after one year to 30% after thirty.'
		},
		{
			id: 'par',
			label: 'Your share is returned at its original value',
			rule: 'You paid for a share in the organisation and you get that same sum back, with no uplift. Common in limited-equity housing co-operatives.',
			source: 'Structural — set by the co-operative’s own rules. Ask to read them.'
		},
		{
			id: 'none',
			label: 'Nothing returns',
			rule: 'You were renting, or you were a member of an income-sharing community and held no stake in it. Any assets you arrived with are still yours.',
			source:
				'Structural. Twin Oaks, for instance, freezes members’ existing assets rather than absorbing them.'
		}
	];

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

	{#if enhanced}
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
					min="0"
					step="1000"
					bind:value={entry}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Monthly dues or service charge</span>
				<input
					type="number"
					min="0"
					step="10"
					bind:value={monthly}
					class="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-800"
				/>
			</label>

			<label class="block">
				<span class="mb-1 block text-sm text-stone-600">Years you expect to stay</span>
				<input
					type="number"
					min="1"
					max="60"
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
					min="-10"
					max="20"
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
						min="0"
						max="100"
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

		<div class="mt-8 border-t border-stone-200 pt-6" aria-live="polite">
			<table class="w-full text-sm">
				<caption class="sr-only">What the period costs under the model you chose</caption>
				<tbody class="[&_td]:py-2 [&_td]:text-right [&_th]:py-2 [&_th]:pr-3 [&_th]:text-left">
					<tr class="border-b border-stone-100">
						<th scope="row" class="font-normal text-stone-600">Paid to move in</th>
						<td class="font-mono text-stone-800">{money(entry)}</td>
					</tr>
					<tr class="border-b border-stone-100">
						<th scope="row" class="font-normal text-stone-600">
							Dues over {years}
							{years === 1 ? 'year' : 'years'}
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
