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
	import { prefersReducedMotion } from '$lib/utils/animations';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';

	const breadcrumbs = generateBreadcrumbs('votecast');

	import {
		votecastStats,
		glossary,
		demoProposal,
		demoOptions,
		failures,
		whatItIs,
		whatItIsNot,
		methods,
		shots,
		phases,
		settings,
		settingsCannot,
		reasons,
		personas,
		faq,
		type DemoTone,
		type MethodId
	} from './data';

	/* ── Hero ballot demo ───────────────────────────────────────────
	   Casting a vote adds one to the picked option and recomputes every
	   share, so the bars move the way they would on a live proposal.
	   Clicking the same option again withdraws it. */
	let picked = $state<DemoTone | null>(null);

	const totalCast = $derived(demoProposal.castBefore + (picked ? 1 : 0));
	const tally = $derived(
		demoOptions.map((option) => {
			const count = option.votes + (picked === option.id ? 1 : 0);
			return { ...option, count, percent: Math.round((count / totalCast) * 100) };
		})
	);
	const ballotNote = $derived(
		demoOptions.find((option) => option.id === picked)?.note ?? demoProposal.prompt
	);

	/** Bar fill per option — agree reads as the brand emerald, an objection as amber. */
	const toneBar: Record<DemoTone, string> = {
		agree: 'bg-ecohubs-primary',
		aside: 'bg-stone-400',
		object: 'bg-ecohubs-accent'
	};

	/* ── Method explorer ────────────────────────────────────────────
	   A real tablist: the six methods on the left, one panel on the
	   right. Arrow keys move between tabs, which is what a screen-reader
	   or keyboard user expects from this pattern. */
	let activeMethod = $state<MethodId>('poll');
	const method = $derived(methods.find((m) => m.id === activeMethod) ?? methods[0]);

	/**
	 * On narrow screens the panel sits below the six buttons, so a tap can look
	 * like nothing happened. Bring it into view — but only when it is actually
	 * off-screen, so the desktop layout never jumps.
	 */
	function selectMethod(id: MethodId) {
		activeMethod = id;
		const panel = document.getElementById('method-panel');
		if (!panel) return;
		if (panel.getBoundingClientRect().top > window.innerHeight - 160) {
			panel.scrollIntoView({
				behavior: prefersReducedMotion() ? 'auto' : 'smooth',
				block: 'start'
			});
		}
	}

	function moveTab(event: KeyboardEvent, index: number) {
		const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
		if (step === undefined) return;
		event.preventDefault();
		const next = methods[(index + step + methods.length) % methods.length];
		activeMethod = next.id;
		document.getElementById(`method-tab-${next.id}`)?.focus();
	}

	/** Dotted-underline style for the terms that open VoteCast's glossary. */
	const termLink =
		'no-external-decoration border-b border-dotted border-ecohubs-primary/50 hover:border-ecohubs-primary hover:text-ecohubs-primary transition-colors';

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<!-- Method glyphs. Inline rather than an icon font so the most important
     section on the page never waits on a network request. -->
{#snippet methodIcon(id: MethodId)}
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="w-5 h-5 shrink-0"
		aria-hidden="true"
	>
		{#if id === 'poll'}
			<path d="M5 19v-7M12 19V5m7 14v-9" />
		{:else if id === 'common-ground'}
			<circle cx="5" cy="7" r="1.4" /><path d="M9.5 7H20" />
			<circle cx="5" cy="12" r="1.4" /><path d="M9.5 12H20" />
			<circle cx="5" cy="17" r="1.4" /><path d="M9.5 17H20" />
		{:else if id === 'ranked'}
			<path d="M4 7h11M4 12h8M4 17h5" />
			<path d="M19 18V8m0 0-2.2 2.4M19 8l2.2 2.4" />
		{:else if id === 'approval'}
			<path d="M3 9.2l2.4 2.4L10 6.5" />
			<path d="M14.5 14.5l6 6m0-6l-6 6" />
		{:else if id === 'consensus'}
			<circle cx="12" cy="12" r="8" />
			<path d="M8.4 12.3l2.5 2.5 4.7-5.4" />
		{:else}
			<path d="M3 12.2l3.4 3.4L14 7" />
			<circle cx="17.5" cy="15.5" r="3.3" />
			<path d="M20 18l2 2.2" />
		{/if}
	</svg>
{/snippet}

<SEO
	title="VoteCast — proposals, deliberation and votes a community can trust | EcoHubs"
	description="The step after the meeting: a transparent way to record what a community decided — six voting methods, from a simple poll to consent, and a record that holds."
	ogImage="https://votecast.ecohubs.community/og-default.jpg"
	ogImageAlt="VoteCast — community governance, simplified"
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
						The Vote · how a community reaches a decision
					</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<h1
					data-scroll-animate
					class="font-serif text-5xl md:text-6xl lg:text-[80px] leading-[1.02] tracking-tight text-ecohubs-deep"
				>
					Decide together, <br class="hidden md:block" />
					<em class="font-story italic font-normal text-ecohubs-primary">and have it hold.</em>
				</h1>

				<p
					data-scroll-animate
					class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light"
				>
					<strong class="text-ecohubs-deep">VoteCast</strong> does not replace your meeting. It is
					the step after one — where what the group worked out becomes
					<em class="font-story italic">a decision on the record</em>, with the rules it was made
					under written down beside it.
				</p>

				<p data-scroll-animate class="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl">
					Six ways to decide, from a simple poll to full consent. One person, one vote. Public
					proposals or members-only. Plain enough that nobody has to learn a governance vocabulary
					before they can take part.
				</p>

				<div data-scroll-animate class="mt-10 flex flex-col sm:flex-row gap-3">
					<a
						href={votecastStats.startUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
					>
						Start a community
						<span class="transition-transform group-hover:translate-x-0.5">↗</span>
					</a>
					<a
						href="#methods"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
					>
						See the six ways to decide
					</a>
				</div>

				<div
					data-scroll-animate
					class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600"
				>
					<a
						href={votecastStats.browseUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-0.5"
					>
						Or browse public communities ↗
					</a>
				</div>

				<div
					data-scroll-animate
					class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600"
				>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
						One person, one vote
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
						Public or members-only
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Free for small groups
					</span>
				</div>
			</div>

			<!-- Right: an illustrative Consent ballot. The proposal is invented; the
			     method is real, and casting a vote moves the tally the way it would
			     on a live one. -->
			<div data-scroll-animate class="lg:col-span-5 relative">
				<div
					class="relative bg-white rounded-[28px] border border-stone-200/80 soft-shadow p-5 sm:p-6 overflow-hidden"
				>
					<div
						class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-200/40 blur-2xl pointer-events-none"
					></div>

					<div class="relative flex items-center justify-between gap-3 mb-4">
						<div class="flex items-center gap-2 text-stone-400">
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
							<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
						</div>
						<span class="font-mono text-[10px] tracking-widest text-stone-400 uppercase"
							>VoteCast · {demoProposal.method} · illustrative</span
						>
					</div>

					<!-- Ballot -->
					<div class="relative rounded-2xl bg-ecohubs-ivory border border-stone-200/70 p-4 sm:p-5">
						<div class="flex items-center justify-between gap-3">
							<span class="font-mono text-[10px] tracking-wider text-stone-500 uppercase"
								>{demoProposal.code}</span
							>
							<span
								class="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-100 rounded-full px-2.5 py-0.5"
							>
								<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
								{demoProposal.status}
							</span>
						</div>

						<p class="mt-3 font-serif text-lg sm:text-xl text-ecohubs-deep leading-snug">
							{demoProposal.title}
						</p>
						<p class="mt-1.5 text-xs text-stone-500">
							{demoProposal.eligible} members eligible · {totalCast} votes cast
						</p>

						<div
							class="mt-4 space-y-2"
							role="group"
							aria-label="Illustrative consent ballot — pick an option to see the tally move"
						>
							{#each tally as option (option.id)}
								{@const chosen = picked === option.id}
								<button
									type="button"
									aria-pressed={chosen}
									onclick={() => (picked = chosen ? null : option.id)}
									class="w-full text-left rounded-xl border px-3 py-2.5 bg-white transition-colors {chosen
										? 'border-ecohubs-primary'
										: 'border-stone-200 hover:border-ecohubs-primary/50'}"
								>
									<span class="flex items-baseline justify-between gap-3">
										<span class="text-[13px] text-stone-700 flex items-center gap-1.5">
											{option.label}
											{#if chosen}
												<span class="text-ecohubs-primary text-[11px] font-medium">· your vote</span
												>
											{/if}
										</span>
										<span class="font-mono text-[11px] text-stone-500 tabular-nums"
											>{option.percent}%</span
										>
									</span>
									<span class="mt-2 block h-1.5 rounded-full bg-stone-200 overflow-hidden">
										<span
											class="block h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none {toneBar[
												option.id
											]}"
											style="width:{option.percent}%"
										></span>
									</span>
								</button>
							{/each}
						</div>

						<p
							aria-live="polite"
							class="mt-4 pt-3 border-t border-stone-200 text-[12px] text-stone-600 leading-relaxed"
						>
							{ballotNote}
						</p>

						{#if picked}
							<button
								type="button"
								onclick={() => (picked = null)}
								class="mt-2 text-[11px] text-stone-500 hover:text-ecohubs-dark underline underline-offset-2"
							>
								Withdraw my vote
							</button>
						{/if}
					</div>

					<div
						class="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between gap-3 text-xs text-stone-500"
					>
						<span>Illustrative — cast a vote to see the tally move</span>
						<a
							href={votecastStats.url}
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration text-ecohubs-primary hover:underline font-medium shrink-0"
							>Open ↗</a
						>
					</div>
				</div>

				<p class="mt-6 font-story italic text-[15px] leading-snug text-stone-600 max-w-sm">
					"The vote is the easy part. What a community comes back to, years later, is the record."
				</p>
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. WHY DECISIONS ARE WHERE IT BREAKS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Why decisions are where it breaks</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Communities rarely fracture over the land. <br />
				<em class="font-story italic font-normal text-stone-500"
					>They fracture over what everyone thought was agreed.</em
				>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				None of these look like a governance problem while they are happening. They look like a good
				meeting, a quiet member, a question nobody quite asked. The damage shows up much later, when
				the group needs to know what it decided and finds that the deciding was never written down.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-3 gap-6">
			{#each failures as failure (failure.number)}
				<article
					class="p-8 md:p-9 rounded-3xl bg-ecohubs-ivory border border-stone-200/70 flex flex-col"
				>
					<div class="font-story italic text-4xl text-ecohubs-primary/70 leading-none mb-5">
						{failure.number}
					</div>
					<h3 class="font-serif text-2xl text-ecohubs-deep mb-4 leading-snug">{failure.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{failure.body}</p>
					<p
						class="mt-auto pt-6 text-[15px] text-stone-600 font-story italic border-t border-stone-200"
					>
						{failure.line}
					</p>
				</article>
			{/each}
		</div>

		<p
			data-scroll-animate
			class="mt-12 max-w-2xl text-stone-600 leading-relaxed font-story italic text-lg"
		>
			A tool fixes none of this on its own. But most of it is invisible rather than unsolvable — and
			a thing a group can see is a thing it can change. VoteCast takes the part that can be written
			down, and leaves the conversation exactly where it belongs.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. WHAT IT IS / WHAT IT IS NOT
═══════════════════════════════════════════════════════════════════ -->
<StanceColumns
	kicker="What VoteCast is, and isn't"
	lead="A tool that runs a community's decisions is easy to misread — as a rulebook, as a substitute for meeting, as a way of making the difficult part go away. Here is the line we hold."
	isItems={whatItIs}
	isNote="A decision, written down."
	isNotItems={whatItIsNot}
	isNotNote="And we would rather say so."
>
	{#snippet headline()}
		The step after the conversation, <em class="font-story italic font-normal text-emerald-300"
			>never instead of it.</em
		>
	{/snippet}
</StanceColumns>

<!-- ═══════════════════════════════════════════════════════════════════
     4. SIX WAYS TO DECIDE — the interactive explorer
═══════════════════════════════════════════════════════════════════ -->
<section id="methods" class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Six ways to decide</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				A paint colour and a constitution <br />
				<em class="font-story italic font-normal text-stone-500">are not the same question.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Most tools hand you one voting rule and let you live with it, which is how a group ends up
				running its constitution the same way it picked a logo. VoteCast offers six. Pick one to see
				how it works, what a ballot looks like, and when a community would actually reach for it.
			</p>
		</div>

		<div data-scroll-animate class="grid lg:grid-cols-12 gap-5 lg:gap-8 items-start">
			<!-- Picker -->
			<div
				class="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-2.5"
				role="tablist"
				aria-label="Voting methods"
				aria-orientation="vertical"
			>
				{#each methods as m, i (m.id)}
					{@const selected = activeMethod === m.id}
					<button
						type="button"
						role="tab"
						id="method-tab-{m.id}"
						aria-selected={selected}
						aria-controls="method-panel"
						tabindex={selected ? 0 : -1}
						onclick={() => selectMethod(m.id)}
						onkeydown={(e) => moveTab(e, i)}
						class="text-left rounded-2xl border px-5 py-4 transition-colors flex items-start gap-3.5 {selected
							? 'bg-ecohubs-deep border-ecohubs-deep text-ecohubs-ivory'
							: 'bg-ecohubs-ivory border-stone-200/70 text-ecohubs-deep hover:border-ecohubs-primary/50'}"
					>
						<span class={selected ? 'text-emerald-300 mt-0.5' : 'text-ecohubs-primary mt-0.5'}>
							{@render methodIcon(m.id)}
						</span>
						<span class="min-w-0">
							<span class="block font-serif text-lg leading-tight">{m.name}</span>
							<span
								class="block text-[13px] leading-snug mt-0.5 {selected
									? 'text-stone-300/80'
									: 'text-stone-600'}">{m.tagline}</span
							>
						</span>
					</button>
				{/each}
			</div>

			<!-- Detail panel -->
			<div
				class="lg:col-span-8 scroll-mt-24 rounded-3xl bg-ecohubs-ivory border border-stone-200/70 p-7 md:p-9"
				id="method-panel"
				role="tabpanel"
				aria-labelledby="method-tab-{method.id}"
				tabindex="-1"
			>
				<div class="flex items-start gap-4">
					<span class="text-ecohubs-primary mt-1">{@render methodIcon(method.id)}</span>
					<div>
						<h3 class="font-serif text-3xl text-ecohubs-deep leading-tight">{method.name}</h3>
						<div class="kicker text-stone-500 mt-1.5">{method.tagline}</div>
					</div>
				</div>

				<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl">{method.plain}</p>

				<div class="mt-8 grid md:grid-cols-2 gap-8">
					<!-- How it works -->
					<div>
						<div class="kicker text-emerald-800 mb-4">How it works</div>
						<ol class="space-y-3">
							{#each method.how as step, i (step)}
								<li class="grid grid-cols-[26px_1fr] gap-3 items-start">
									<span
										class="font-mono text-[11px] text-emerald-800 bg-emerald-100 rounded-full w-[26px] h-[26px] inline-flex items-center justify-center"
										>{i + 1}</span
									>
									<span class="text-[15px] text-stone-700 leading-relaxed">{step}</span>
								</li>
							{/each}
						</ol>

						<div class="mt-7 pt-6 border-t border-stone-200">
							<div class="kicker text-emerald-800 mb-3">For example</div>
							<p class="text-[15px] text-stone-700 leading-relaxed font-story italic">
								{method.example}
							</p>
						</div>
					</div>

					<!-- Example ballot -->
					<div>
						<div class="kicker text-emerald-800 mb-4">What the ballot looks like</div>
						<div class="rounded-2xl bg-white border border-stone-200/70 p-5">
							<p class="font-serif text-[15px] text-ecohubs-deep leading-snug">
								{method.ballotQuestion}
							</p>

							<div class="mt-4 space-y-2">
								{#each method.ballotOptions as option, i (option)}
									{#if method.ballotKind === 'questions'}
										<div class="rounded-xl border border-stone-200 px-3 py-2.5">
											<div class="text-[13px] text-stone-700 leading-snug">{option}</div>
											<div class="mt-2 flex flex-wrap gap-1.5">
												{#each ['Agree', 'Unsure', 'Disagree'] as answer (answer)}
													<span
														class="text-[10px] px-2 py-0.5 rounded-full border {answer ===
															'Agree' && i === 0
															? 'border-ecohubs-primary text-ecohubs-primary'
															: 'border-stone-200 text-stone-500'}">{answer}</span
													>
												{/each}
											</div>
										</div>
									{:else if method.ballotKind === 'rank'}
										<div
											class="rounded-xl border border-stone-200 px-3 py-2.5 flex items-center gap-3"
										>
											<span
												class="font-mono text-[11px] text-emerald-800 bg-emerald-100 rounded-md w-6 h-6 inline-flex items-center justify-center shrink-0"
												>{i + 1}</span
											>
											<span class="text-[13px] text-stone-700">{option}</span>
											<span
												class="ml-auto text-stone-300 text-xs tracking-widest"
												aria-hidden="true">⋮⋮</span
											>
										</div>
									{:else}
										<div
											class="rounded-xl border px-3 py-2.5 flex items-center gap-3 {i === 0
												? 'border-ecohubs-primary'
												: 'border-stone-200'}"
										>
											<span
												class="w-3.5 h-3.5 rounded-full border-[1.5px] shrink-0 flex items-center justify-center {i ===
												0
													? 'border-ecohubs-primary'
													: 'border-stone-300'}"
											>
												{#if i === 0}
													<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
												{/if}
											</span>
											<span class="text-[13px] text-stone-700">{option}</span>
										</div>
									{/if}
								{/each}
							</div>

							<p class="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-400">
								Illustrative — an example ballot, not a live proposal.
							</p>
						</div>

						<!-- Flow -->
						<div class="mt-7">
							<div class="kicker text-emerald-800 mb-3">How it travels</div>
							<div class="flex flex-wrap items-center gap-x-2 gap-y-2">
								{#each method.flow as step, i (step)}
									{#if i > 0}
										<span class="text-stone-400 text-sm" aria-hidden="true">→</span>
									{/if}
									<span
										class="text-[12px] px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600"
										>{step}</span
									>
								{/each}
							</div>
							<p class="mt-4 text-[14px] text-stone-600 leading-relaxed">
								<span class="text-ecohubs-deep font-medium">Result:</span>
								{method.result}
							</p>
						</div>
					</div>
				</div>

				<div
					class="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between"
				>
					<a
						href={glossary(method.glossarySlug)}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration text-sm font-medium text-ecohubs-primary hover:underline"
					>
						How VoteCast defines {method.name} ↗
					</a>
					<a
						href={votecastStats.startUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration px-5 py-2.5 bg-ecohubs-dark text-white text-sm font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 self-start"
					>
						Run one of these <span>↗</span>
					</a>
				</div>
			</div>
		</div>

		<p data-scroll-animate class="mt-10 text-sm text-stone-500 max-w-2xl leading-relaxed">
			A community can use a different method for each kind of decision, and set which is the default
			for which. Every term above is defined in public at
			<a
				href={votecastStats.glossaryUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration text-ecohubs-primary hover:underline font-medium"
				>the VoteCast glossary ↗</a
			>.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. WHAT IT ACTUALLY LOOKS LIKE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-14">
			<div class="kicker text-emerald-800 mb-4">What it actually looks like</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				No governance dashboard. <br />
				<em class="font-story italic font-normal text-stone-500"
					>Just the decision, and the record.</em
				>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				One page per proposal: what is being decided, who may decide it, how long is left, and —
				once it closes — the result alongside the rules it was measured against. Drawn here as
				wireframes; the live app is one click away.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-3 gap-6">
			{#each shots as shot (shot.src)}
				<figure>
					<img
						src={shot.src}
						alt={shot.alt}
						width="1600"
						height="1000"
						loading="lazy"
						class="w-full rounded-2xl border border-stone-200/70 soft-shadow bg-white"
					/>
					<figcaption class="mt-4">
						<div class="font-serif text-lg text-ecohubs-deep">{shot.caption}</div>
						<p class="text-[15px] text-stone-600 leading-relaxed mt-1">{shot.body}</p>
					</figcaption>
				</figure>
			{/each}
		</div>

		<div data-scroll-animate class="mt-12 flex flex-col sm:flex-row gap-3">
			<a
				href={votecastStats.browseUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				Browse a real community
				<span class="transition-transform group-hover:translate-x-0.5">↗</span>
			</a>
			<a
				href={votecastStats.startUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Or start your own — it takes about ten minutes ↗
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. HOW A DECISION TRAVELS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-14">
			<div class="kicker text-emerald-700 mb-4">How a decision travels</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Six phases. Most decisions
				<em class="font-story italic font-normal text-stone-500">only use three.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				A poll about a shared meal goes draft, voting, closed, and that is the whole life of it. The
				other three phases exist for the decisions that deserve the extra weight — and they are
				there before the argument, not improvised during it.
			</p>
		</div>

		<div data-scroll-stagger class="space-y-3">
			{#each phases as phase (phase.number)}
				<article
					class="grid md:grid-cols-[auto_1fr] gap-4 md:gap-8 p-6 md:p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70"
				>
					<div class="md:w-44">
						<div class="font-story italic text-3xl text-ecohubs-primary">{phase.number}</div>
						<a
							href={glossary(phase.glossarySlug)}
							target="_blank"
							rel="noopener noreferrer"
							class="{termLink} font-serif text-lg text-ecohubs-deep mt-1 inline-block"
						>
							{phase.name}
						</a>
						{#if phase.optional}
							<div class="kicker text-stone-400 mt-1">Optional</div>
						{/if}
					</div>
					<p class="text-stone-700 leading-relaxed self-center">{phase.body}</p>
				</article>
			{/each}
		</div>

		<p data-scroll-animate class="mt-8 text-sm text-stone-500 max-w-2xl leading-relaxed">
			Phase names with a dotted underline open VoteCast's public glossary.
		</p>

		<p data-scroll-animate class="mt-4 text-sm text-stone-500 max-w-2xl leading-relaxed">
			And ten outcomes at the end of it, not two — passed, failed, blocked, tie, no quorum,
			provisional, recorded, elected, not ratified, indeterminate. A proposal too few people voted
			on and a proposal the group rejected are different events, and the record says which one
			happened.
			<a
				href={votecastStats.glossaryUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration text-ecohubs-primary hover:underline font-medium"
				>Read what each one means ↗</a
			>
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. THE SETTINGS THAT DECIDE FAIRNESS — the honest section
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-ivory relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-800 mb-4">The settings that decide fairness</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				There is no neutral default. <br />
				<em class="font-story italic font-normal text-stone-500">Only a default somebody chose.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Each of these settings has a real cost in both directions, and picking one is a decision
				about power, not a preference. So VoteCast asks you to set them deliberately, and publishes
				what you set beside the result — because a tally whose rules you cannot inspect is not
				transparency, it is just a number.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each settings as setting (setting.name)}
				<article class="p-7 rounded-2xl bg-white border border-stone-200/70">
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2 leading-snug">
						<a
							href={glossary(setting.glossarySlug)}
							target="_blank"
							rel="noopener noreferrer"
							class={termLink}
						>
							{setting.name}
						</a>
					</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{setting.what}</p>
					<p
						class="mt-4 pt-4 border-t border-stone-200 text-[14px] text-stone-600 leading-relaxed font-story italic"
					>
						{setting.tradeoff}
					</p>
				</article>
			{/each}
		</div>

		<p data-scroll-animate class="mt-6 text-sm text-stone-500 max-w-2xl leading-relaxed">
			Each heading opens VoteCast's own definition of that setting, so you can check what it does
			before you set it.
		</p>

		<div data-scroll-animate class="mt-8">
			<CaveatPanel
				kicker="What no setting fixes"
				items={settingsCannot}
				columns={2}
				note="A voting tool can make a group's rules explicit and hold it to them. Everything above still depends on the people in the room, and we would rather write that down than let the interface imply otherwise."
			/>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8. WHY ECOHUBS BUILT IT
═══════════════════════════════════════════════════════════════════ -->
<WhyWeBuiltIt
	kicker="Why EcoHubs built a voting tool"
	lead="VoteCast is not a side project. It comes straight out of what EcoHubs is for — and out of a problem we ran into ourselves, early, with nothing on the shelf that fit."
	quote={purposeCharter}
	{reasons}
>
	{#snippet headline()}
		We had decisions to make.<br />
		<em class="font-story italic font-normal text-emerald-300">And nothing that fit.</em>
	{/snippet}
</WhyWeBuiltIt>

<!-- ═══════════════════════════════════════════════════════════════════
     9. WHO PICKS THIS UP
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Who picks this up</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Built for groups that decide together
				<em class="font-story italic font-normal text-stone-500">and have to live with it.</em>
			</h2>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each personas as persona (persona.kicker)}
				<div class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="kicker text-stone-500 mb-3">{persona.kicker}</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{persona.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{persona.body}</p>
				</div>
			{/each}
		</div>

		<div data-scroll-animate class="mt-12 flex flex-col sm:flex-row gap-3">
			<a
				href={votecastStats.startUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				Start a community
				<span class="transition-transform group-hover:translate-x-0.5">↗</span>
			</a>
			<a
				href="/community-resilience-assessment"
				class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Not sure where your agreements are thin? Take the free assessment →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     10. WHERE VOTECAST SITS
═══════════════════════════════════════════════════════════════════ -->
<PositionTriptych
	kicker="Where VoteCast sits in the EcoHubs project"
	lead="VoteCast is deliberately narrow. It records decisions — it does not tell you what your decisions ought to be, it does not hold the conversation for you, and it will not find you the ground to make them on."
	cards={[
		{
			kicker: '01 · Vision',
			title: 'A network of regenerative hubs.',
			body: 'Small, place-based communities, each adapted to its land and culture, woven into a shared commons that gets stronger over time.',
			cta: 'Read the vision →',
			href: '/vision'
		},
		{
			kicker: '02 · VoteCast',
			title: 'Where the deciding is recorded.',
			body: 'Proposals, deliberation, six voting methods and a record everyone can read — so an agreement outlives the meeting it was made in.',
			cta: 'Open VoteCast ↗',
			href: votecastStats.url,
			external: true,
			here: true
		},
		{
			kicker: '03 · RCOS Standard',
			title: 'What the rules should say.',
			body: 'The standard is where a community writes down which decisions need which method, who is eligible, and how conflict gets repaired.',
			cta: 'Read about RCOS →',
			href: '/rcos'
		}
	]}
	footnote="The standard writes the rule. The tool runs it. A rule nobody runs is a document, and a vote with no rule behind it is a headcount."
>
	{#snippet headline()}
		The standard says <em class="font-story italic font-normal text-stone-500"
			>what to make explicit.</em
		><br />
		The tool is <em class="font-story italic font-normal">where it actually runs.</em>
	{/snippet}
</PositionTriptych>

<!-- ═══════════════════════════════════════════════════════════════════
     11. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Honest questions, honest answers</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				About VoteCast,
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
				href="/rcos"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Decide what your rules should be first — read the RCOS Standard →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     12. CLOSING CTA
═══════════════════════════════════════════════════════════════════ -->
<ClosingCta
	kicker="Free for small groups"
	divider
	footnote="One person, one vote · Public or members-only · Every term defined in public"
>
	{#snippet headline()}
		Have the conversation. <br class="hidden md:block" />
		<em class="font-story italic font-normal text-emerald-300">Then write it down.</em>
	{/snippet}
	{#snippet lead()}
		A community, a first proposal and an open vote take about ten minutes to set up. The methods,
		the settings and every word the platform uses are documented before you commit to any of it.
	{/snippet}
	{#snippet actions()}
		<a
			href={votecastStats.startUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="no-external-decoration px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
		>
			Start a community
			<span class="text-sm">↗</span>
		</a>
		<a
			href={votecastStats.browseUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="no-external-decoration px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors inline-flex items-center justify-center gap-2"
		>
			Browse public communities
			<span class="text-sm">↗</span>
		</a>
	{/snippet}
</ClosingCta>
