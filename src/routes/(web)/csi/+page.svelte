<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import FaqAccordion from '$lib/components/FaqAccordion.svelte';
	import CaveatPanel from '$lib/components/CaveatPanel.svelte';
	import ClosingCta from '$lib/components/sections/ClosingCta.svelte';
	import StanceColumns from '$lib/components/sections/StanceColumns.svelte';
	import PositionTriptych from '$lib/components/sections/PositionTriptych.svelte';
	import WhyWeBuiltIt from '$lib/components/sections/WhyWeBuiltIt.svelte';
	import { generateBreadcrumbs } from '$lib/config/seo';
	import { purposeCharter } from '$lib/config/purpose-charter';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';

	const breadcrumbs = generateBreadcrumbs('csi');

	import {
		csiStats,
		csiPalette,
		legend,
		demoLattice,
		demoTones,
		demoCoast,
		demoReadouts,
		snags,
		whatItIs,
		whatItIsNot,
		gates,
		domains,
		suitabilityClasses,
		confidenceGrades,
		unchecked,
		sources,
		reasons,
		personas,
		faq
	} from './data';

	// Each lattice cell becomes one region polygon. Neighbours share corner points
	// exactly, so the seams between them read as borders rather than as a grid.
	const demoCells = demoTones.flatMap((row, r) =>
		row.map((tone, c) => {
			const corners = [
				demoLattice[r][c],
				demoLattice[r][c + 1],
				demoLattice[r + 1][c + 1],
				demoLattice[r + 1][c]
			];
			return {
				id: `${r}-${c}`,
				tone,
				d: `M${corners.map(([x, y]) => `${x},${y}`).join('L')}Z`
			};
		})
	);

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="CSI — the Community Suitability Index | EcoHubs"
	description="An open map of where a regenerative community has room to begin — read against the law, the land, the water and the welcome."
	ogImage="/og-csi.jpg"
	ogImageAlt="The Community Suitability Index world map, regions shaded by suitability"
	{breadcrumbs}
/>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-32 -left-32 w-[520px] h-[520px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -z-10 bottom-0 -right-24 w-[440px] h-[440px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
			<div class="lg:col-span-7">
				<div data-scroll-animate class="flex items-start justify-between gap-4 flex-wrap mb-6">
					<div class="kicker text-emerald-700 flex items-center gap-3">
						<span
							class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 text-emerald-600 pulse-dot"
						></span>
						The Map · where a community has room to begin
					</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<h1
					data-scroll-animate
					class="font-serif text-5xl md:text-6xl lg:text-[80px] leading-[1.02] tracking-tight text-ecohubs-deep"
				>
					Read the ground <br class="hidden md:block" />
					<em class="font-story italic font-normal text-ecohubs-primary">before</em> you commit.
				</h1>

				<p
					data-scroll-animate
					class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light"
				>
					The <strong class="text-ecohubs-deep">Community Suitability Index</strong> — CSI — is an
					open map of where a regenerative, sovereign community — an ecovillage or land project —
					has room to begin. It reads a place against
					<em class="font-story italic">the law, the land, the water and the welcome</em>, in that
					order, and marks what it does not yet know.
				</p>

				<p data-scroll-animate class="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl">
					{csiStats.regions} regions, {csiStats.signals} signals, every number traceable to a public
					dataset. It will not tell you where to live. It narrows a world of options down to a shortlist
					you can actually go and stand on.
				</p>

				<div data-scroll-animate class="mt-10 flex flex-col sm:flex-row gap-3">
					<a
						href={csiStats.url}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
					>
						Open the live map
						<span class="transition-transform group-hover:translate-x-0.5">↗</span>
					</a>
					<a
						href="#how"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
					>
						See how it reads a place
					</a>
				</div>

				<div
					data-scroll-animate
					class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600"
				>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
						{csiStats.regions} regions scored
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
						{csiStats.signalCount} signals · {csiStats.domainCount} domains
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Open data, cited
					</span>
				</div>
			</div>

			<!-- Right: a miniature of the real choropleth. Invented geography, the live
			     map's own class colours and score scale — labelled illustrative throughout. -->
			<div data-scroll-animate class="lg:col-span-5 relative">
				<div
					class="relative bg-white rounded-[28px] border border-stone-200/80 soft-shadow p-5 sm:p-6 overflow-hidden"
				>
					<div
						class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-200/40 blur-2xl pointer-events-none"
					></div>

					<div class="relative flex items-center justify-between mb-4">
						<div class="flex items-center gap-2 text-stone-400">
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
						</div>
						<span class="font-mono text-[10px] tracking-widest text-stone-400 uppercase"
							>CSI · {csiStats.version} · illustrative</span
						>
					</div>

					<!-- Map -->
					<div class="relative rounded-2xl bg-ecohubs-ivory overflow-hidden">
						<svg
							viewBox="0 0 420 340"
							class="w-full block"
							role="img"
							aria-label="Illustrative choropleth: invented regions shaded from highly suitable through not suitable, in the colours the live Community Suitability Index uses."
						>
							<defs>
								<clipPath id="csi-coast"><path d={demoCoast} /></clipPath>
								<pattern
									id="csi-gated"
									width="7"
									height="7"
									patternUnits="userSpaceOnUse"
									patternTransform="rotate(45)"
								>
									<rect width="7" height="7" fill={csiPalette.excluded} />
									<line x1="0" y1="0" x2="0" y2="7" stroke="#fbfbf9" stroke-width="2.4" />
								</pattern>
							</defs>

							<g clip-path="url(#csi-coast)">
								{#each demoCells as cell (cell.id)}
									<path
										d={cell.d}
										fill={cell.tone === 'excluded' ? 'url(#csi-gated)' : csiPalette[cell.tone]}
										stroke="#fbfbf9"
										stroke-width="1.6"
										stroke-linejoin="round"
									/>
								{/each}
							</g>
							<path
								d={demoCoast}
								fill="none"
								stroke="#0b2e24"
								stroke-opacity="0.14"
								stroke-width="1.4"
							/>
						</svg>

						<!-- Readout cards -->
						{#each demoReadouts as readout, i (readout.code)}
							<div
								class="absolute rounded-xl bg-white/95 backdrop-blur border border-stone-200/80 shadow-[0_10px_24px_-12px_rgba(11,46,36,0.45)] px-3 py-2.5 {i ===
								0
									? 'top-3 right-3 w-[126px] sm:w-[152px]'
									: 'bottom-3 left-3 w-[106px] sm:w-[132px]'}"
							>
								<div class="flex items-baseline justify-between gap-2">
									<span class="font-serif text-xl sm:text-2xl leading-none text-ecohubs-deep"
										>{readout.score}</span
									>
									<span class="font-mono text-[9px] uppercase tracking-wider text-stone-400"
										>conf {readout.confidence}</span
									>
								</div>
								<div class="mt-1.5 flex items-center gap-1.5">
									<span
										class="w-2 h-2 rounded-full shrink-0"
										style="background:{csiPalette[readout.tone]}"
									></span>
									<span class="text-[11px] text-stone-600 leading-tight"
										>{readout.code} · {readout.label}</span
									>
								</div>
								{#if readout.gates.length}
									<div class="mt-2.5 space-y-1">
										{#each readout.gates as gate (gate.name)}
											<div class="flex items-center gap-1.5">
												<span class="font-mono text-[9px] text-stone-400 w-11 shrink-0"
													>{gate.name}</span
												>
												<span class="flex-1 h-1 rounded-full bg-stone-200 overflow-hidden">
													<span
														class="block h-full rounded-full"
														style="width:{gate.value}%;background:{csiPalette[readout.tone]}"
													></span>
												</span>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					</div>

					<!-- Legend -->
					<div
						class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] text-stone-500"
					>
						{#each legend as item (item.code)}
							<span class="inline-flex items-center gap-1.5">
								<span
									class="w-2.5 h-2.5 rounded-[3px] shrink-0"
									style="background:{csiPalette[item.tone]}"
								></span>
								{item.code}
							</span>
						{/each}
						<span class="inline-flex items-center gap-1.5">
							<span
								class="w-2.5 h-2.5 rounded-[3px] shrink-0 opacity-70"
								style="background:{csiPalette.excluded}"
							></span>
							gated
						</span>
					</div>

					<div
						class="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between gap-3 text-xs text-stone-500"
					>
						<span>Illustrative — the live map scores {csiStats.regions} real regions</span>
						<a
							href={csiStats.url}
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration text-ecohubs-primary hover:underline font-medium shrink-0"
							>Open ↗</a
						>
					</div>
				</div>

				<p class="mt-6 font-story italic text-[15px] leading-snug text-stone-600 max-w-sm">
					"Good soil in a country that won't let you build on it is still the wrong place."
				</p>
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. WHY THE GROUND COMES FIRST
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Why the ground comes first</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Most searches for land begin
				<em class="font-story italic font-normal text-stone-500">with a photograph.</em> <br />
				They tend to end <em class="font-story italic font-normal">in a lawyer's office.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				The place is chosen for how it feels — the light, the price, someone's cousin who knows a
				valley. The constraints that actually decide whether a community can live there are
				discovered months later, usually after money has moved. CSI is built around those
				constraints, so a group can meet them while they are still cheap.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each snags as snag (snag.number)}
				<article class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="kicker text-stone-600 mb-3">Constraint · {snag.number}</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{snag.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{snag.body}</p>
				</article>
			{/each}
		</div>

		<p
			data-scroll-animate
			class="mt-12 max-w-2xl text-stone-600 leading-relaxed font-story italic text-lg"
		>
			None of this makes the decision for you. It just moves the hard questions to the front, where
			they are still answerable.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. WHAT IT IS / WHAT IT IS NOT
═══════════════════════════════════════════════════════════════════ -->
<StanceColumns
	kicker="What the map is, and isn't"
	lead="A map of where people might live is easy to misread — as advice, as a listing, as a promise. Here is the line we hold, carefully, on purpose."
	isItems={whatItIs}
	isNote="An open, cited screening tool."
	isNotItems={whatItIsNot}
	isNotNote="And never quietly will be."
>
	{#snippet headline()}
		A screening tool, <em class="font-story italic font-normal text-emerald-300">not an oracle.</em>
	{/snippet}
</StanceColumns>

<!-- ═══════════════════════════════════════════════════════════════════
     4. THE THREE GATES
═══════════════════════════════════════════════════════════════════ -->
<section id="how" class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">How it reads the land</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Three questions,
				<em class="font-story italic font-normal text-stone-500">asked in the order</em> <br />
				<em class="font-story italic font-normal">that actually matters.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				The order is the argument. Averaging everything into one number lets a beautiful climate
				cover for an impossible legal regime — so CSI gates instead. The law is read first and can
				close a region outright. Only then does the ground get a hearing.
			</p>
		</div>

		<div data-scroll-stagger class="space-y-5">
			{#each gates as gate (gate.number)}
				<article
					class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-7 md:p-9 rounded-3xl bg-ecohubs-ivory border border-stone-200/70"
				>
					<div class="md:w-48">
						<div
							class="font-story italic text-4xl {gate.accent === 'amber'
								? 'text-amber-700'
								: 'text-ecohubs-primary'}"
						>
							{gate.number}
						</div>
						<div class="kicker text-stone-600 mt-2">{gate.kicker}</div>
					</div>
					<div>
						<h3 class="font-serif text-2xl md:text-3xl text-ecohubs-deep mb-3 leading-snug">
							{gate.question}
						</h3>
						<p class="text-stone-700 leading-relaxed max-w-2xl mb-5">{gate.body}</p>
						<div class="flex flex-wrap gap-1.5 text-[11px]">
							{#each gate.signals as signal (signal)}
								<span
									class="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600"
									>{signal}</span
								>
							{/each}
							<span class="px-2.5 py-1 rounded-full text-stone-400">and more</span>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<p data-scroll-animate class="mt-10 text-sm text-stone-500 max-w-2xl leading-relaxed">
			{csiStats.signalCount} signals in total. The map lets you read any one of them on its own, or switch
			lens — balanced, sovereignty, agriculture, accessibility — to see how the ranking shifts when the
			priorities do.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. HOW A SCORE BREAKS DOWN
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-start">
		<div data-scroll-animate class="lg:col-span-5">
			<div class="kicker text-emerald-800 mb-4">Seven domains</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				One number is never <br />
				<em class="font-story italic font-normal">the useful part.</em>
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				Every region reports across seven domains, so you can see <em class="font-story italic"
					>where</em
				> it holds up and where it pushes back. A region at 70 with a legal problem and a region at 70
				with a water problem are not the same region, and they should not read like it.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed">
				Each region page also names the two or three domains actively working against it — the
				honest version of a headline score.
			</p>
		</div>

		<div data-scroll-stagger class="lg:col-span-7 grid sm:grid-cols-2 gap-3">
			{#each domains as domain (domain.name)}
				<div class="p-5 rounded-xl bg-white border border-stone-200/70">
					<div class="font-serif text-base text-ecohubs-deep leading-snug">{domain.name}</div>
					<p class="text-xs text-stone-600 mt-1.5 leading-relaxed">{domain.body}</p>
				</div>
			{/each}
			<div class="p-5 rounded-xl bg-ecohubs-deep border border-emerald-900/40">
				<div class="font-serif text-base text-ecohubs-ivory leading-snug">
					Read one for yourself
				</div>
				<a
					href={csiStats.url}
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration text-xs text-emerald-300 mt-1.5 inline-block hover:underline"
					>Open the map ↗</a
				>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. HOW TO READ A SCORE — the honest section
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Reading a score honestly</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				A confident number over thin data
				<em class="font-story italic font-normal text-stone-500">is worse than no number.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				So the map shows its working. Every region carries a suitability class, every signal carries
				a confidence grade, and each page ends with a list of things a desk simply cannot check.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-6">
			<!-- Suitability classes -->
			<div data-scroll-animate class="bg-ecohubs-ivory rounded-3xl p-7 border border-stone-200/70">
				<div class="kicker text-stone-600 mb-4">Suitability class</div>
				<ul class="space-y-3">
					{#each suitabilityClasses as grade (grade.code)}
						<li class="grid grid-cols-[34px_1fr] gap-3 items-start">
							<span
								class="font-mono text-[11px] px-1.5 py-0.5 rounded text-center {grade.tone ===
								'good'
									? 'bg-emerald-100 text-emerald-800'
									: grade.tone === 'mid'
										? 'bg-amber-100 text-amber-800'
										: 'bg-stone-200 text-stone-600'}">{grade.code}</span
							>
							<span>
								<span class="font-serif text-[15px] text-ecohubs-deep">{grade.label}</span>
								<span class="block text-xs text-stone-600 mt-0.5 leading-relaxed">{grade.body}</span
								>
							</span>
						</li>
					{/each}
				</ul>
				<p class="mt-5 pt-4 border-t border-stone-200 text-xs text-stone-500 leading-relaxed">
					The same S1–N2 scale agronomists use for land evaluation. A region with a hard legal block
					is excluded outright rather than averaged into the middle.
				</p>
			</div>

			<!-- Confidence -->
			<div data-scroll-animate class="bg-ecohubs-ivory rounded-3xl p-7 border border-stone-200/70">
				<div class="kicker text-stone-600 mb-4">Confidence, per signal</div>
				<ul class="space-y-3">
					{#each confidenceGrades as grade (grade.code)}
						<li class="grid grid-cols-[34px_1fr] gap-3 items-start">
							<span
								class="font-mono text-[11px] px-1.5 py-0.5 rounded text-center {grade.tone ===
								'good'
									? 'bg-emerald-100 text-emerald-800'
									: grade.tone === 'mid'
										? 'bg-amber-100 text-amber-800'
										: 'bg-stone-200 text-stone-600'}">{grade.code}</span
							>
							<span>
								<span class="font-serif text-[15px] text-ecohubs-deep">{grade.label}</span>
								<span class="block text-xs text-stone-600 mt-0.5 leading-relaxed">{grade.body}</span
								>
							</span>
						</li>
					{/each}
				</ul>
				<p class="mt-5 pt-4 border-t border-stone-200 text-xs text-stone-500 leading-relaxed">
					A region scoring well on mostly proxy data is a lead, not a finding — and the map labels
					it that way rather than burying it in the average.
				</p>
			</div>

			<!-- What we haven't checked -->
			<CaveatPanel
				data-scroll-animate
				kicker="What we haven't checked"
				items={unchecked}
				note="These are desk numbers from open data. The visit decides the rest — we would rather say so than pretend otherwise."
			/>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. BUILT FROM OPEN DATA
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-12">
			<div class="kicker text-emerald-800 mb-4">Built from open data</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Every number traces back
				<em class="font-story italic font-normal text-stone-500">to something you can check.</em>
			</h2>
			<p class="mt-5 text-lg text-stone-700 leading-relaxed">
				No proprietary index, no private scoring, nothing you have to take on trust. Where we
				estimate, we mark it as an estimate.
			</p>
		</div>

		<div data-scroll-stagger class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each sources as source (source.name)}
				<div class="p-5 rounded-2xl bg-white border border-stone-200/70">
					<div class="font-mono text-[11px] tracking-wider text-emerald-700 uppercase mb-2">
						Dataset
					</div>
					<div class="font-serif text-lg text-ecohubs-deep leading-snug">{source.name}</div>
					<p class="text-sm text-stone-600 mt-1.5 leading-relaxed">{source.body}</p>
				</div>
			{/each}
			<a
				href={csiStats.url}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration group p-5 rounded-2xl bg-ecohubs-deep border border-emerald-900/40 flex flex-col justify-between"
			>
				<div>
					<div class="font-mono text-[11px] tracking-wider text-emerald-300/80 uppercase mb-2">
						And the rest
					</div>
					<div class="font-serif text-lg text-ecohubs-ivory leading-snug">See all sources</div>
					<p class="text-sm text-stone-300/80 mt-1.5 leading-relaxed">
						The full list, per signal, on the map itself.
					</p>
				</div>
				<span
					class="mt-4 text-emerald-300 group-hover:translate-x-1 transition-transform inline-block"
					>↗</span
				>
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7b. WHY ECOHUBS BUILT IT
═══════════════════════════════════════════════════════════════════ -->
<WhyWeBuiltIt
	kicker="Why EcoHubs built a map"
	lead="CSI is not a side project. It falls straight out of what EcoHubs is for — and out of a question we are actively trying to answer for our own first hub."
	quote={purposeCharter}
	{reasons}
>
	{#snippet headline()}
		We needed this ourselves.<br />
		<em class="font-story italic font-normal text-emerald-300">So we made it public.</em>
	{/snippet}
</WhyWeBuiltIt>

<!-- ═══════════════════════════════════════════════════════════════════
     8. WHO PICKS THIS UP
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Who picks this up</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Useful to anyone weighing a place
				<em class="font-story italic font-normal text-stone-500">against the life they intend.</em>
			</h2>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each personas as persona (persona.kicker)}
				<div class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="kicker text-stone-600 mb-3">{persona.kicker}</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{persona.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{persona.body}</p>
				</div>
			{/each}
		</div>

		<div data-scroll-animate class="mt-12 flex flex-col sm:flex-row gap-3">
			<a
				href={csiStats.url}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				Start with a few questions
				<span class="transition-transform group-hover:translate-x-0.5">↗</span>
			</a>
			<a
				href="https://seeking.community"
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Looking to join a community, not start one? ↗
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     9. WHERE CSI SITS
═══════════════════════════════════════════════════════════════════ -->
<PositionTriptych
	kicker="Where the map sits in the EcoHubs project"
	lead="CSI answers the question of ground. It is deliberately narrow — the structure a community runs on once it gets there is a separate problem, with its own tool."
	cards={[
		{
			kicker: '01 · Vision',
			title: 'A network of regenerative hubs.',
			body: 'Small, place-based communities, each adapted to its land and culture, woven into a shared commons that gets stronger over time.',
			cta: 'Read the vision →',
			href: '/vision'
		},
		{
			kicker: '02 · CSI',
			title: 'Where the ground allows it.',
			body: 'An open screening map of law, land, water and welcome — so the search for a place starts from evidence rather than from a photograph.',
			cta: 'Open the live map ↗',
			href: csiStats.url,
			external: true,
			here: true
		},
		{
			kicker: '03 · RCOS Standard',
			title: 'What you build on it.',
			body: 'Communities rarely fracture over soil. They fracture over rules nobody wrote down — which is the half the RCOS Standard is for.',
			cta: 'Read about RCOS →',
			href: '/rcos'
		}
	]}
	footnote="The map finds the ground. The standard shapes what stands on it. Neither one is much use without the other."
>
	{#snippet headline()}
		The map answers <em class="font-story italic font-normal text-stone-500">where.</em><br />
		It deliberately does not answer <em class="font-story italic font-normal">how.</em>
	{/snippet}
</PositionTriptych>

<!-- ═══════════════════════════════════════════════════════════════════
     10. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Honest questions, honest answers</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				About the map,
				<em class="font-story italic font-normal text-stone-500">specifically.</em>
			</h2>
		</div>

		<FaqAccordion items={faq} data-scroll-animate />

		<div
			class="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-8"
		>
			<a
				href="/faq#ecosystem"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				See all questions across the project →
			</a>
			<a
				href="/community-resilience-assessment"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Check the structure, not just the ground — free resilience assessment →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     11. CLOSING CTA
═══════════════════════════════════════════════════════════════════ -->
<ClosingCta
	kicker="The map is free to read"
	divider
	footnote="Open data · Cited · Free to use · {csiStats.version}, and honest about it"
>
	{#snippet headline()}
		Read it. Argue with it. <br class="hidden md:block" />
		<em class="font-story italic font-normal text-emerald-300">Then go and look.</em>
	{/snippet}
	{#snippet lead()}
		{csiStats.regions} regions are already scored. The weights are visible, the sources are named, and
		the gaps are written down — so you can disagree with it precisely.
	{/snippet}
	{#snippet actions()}
		<a
			href={csiStats.url}
			target="_blank"
			rel="noopener noreferrer"
			class="no-external-decoration px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
		>
			Open the live map
			<span class="text-sm">↗</span>
		</a>
		<a
			href="/#join"
			class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors"
		>
			Become a member &amp; help improve it
		</a>
	{/snippet}
</ClosingCta>
