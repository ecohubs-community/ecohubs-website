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

	const breadcrumbs = generateBreadcrumbs('seeking');

	import {
		seekingStats,
		demoMatch,
		recognitions,
		blockers,
		whatItIs,
		whatItIsNot,
		steps,
		questions,
		anatomy,
		cannotKnow,
		reasons,
		faq
	} from './data';

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="Seeking.Community — a free, human way to find a community that fits | EcoHubs"
	description="You don't have to start a community to live in one. Write where you want to land, a real person reads it by hand, and honest matches come back within 24 hours. Free."
	ogImage="/og-seeking.jpg"
	ogImageAlt="Seeking.Community — a soft landing for people stepping off the track"
	{breadcrumbs}
/>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
	<div
		class="from-ecohubs-ivory via-ecohubs-base to-ecohubs-base absolute inset-0 -z-10 bg-gradient-to-b"
	></div>
	<div
		class="absolute top-32 -left-32 -z-10 h-[520px] w-[520px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -right-24 bottom-0 -z-10 h-[440px] w-[440px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-7">
				<div data-scroll-animate class="mb-6 flex flex-wrap items-start justify-between gap-4">
					<div class="kicker flex items-center gap-3 text-emerald-700">
						<span
							class="pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-600 text-emerald-600"
						></span>
						The Door · for people who want to arrive
					</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<h1
					data-scroll-animate
					class="font-serif text-ecohubs-deep text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-[80px]"
				>
					You don't have to build one. <br class="hidden md:block" />
					<em class="font-story text-ecohubs-primary font-normal italic">You have to find it.</em>
				</h1>

				<p
					data-scroll-animate
					class="mt-8 max-w-xl text-xl leading-relaxed font-light text-stone-700"
				>
					<strong class="text-ecohubs-deep">Seeking.Community</strong> is a free matchmaker for
					people who want to join an existing intentional community — an ecovillage, a cohousing
					group, a land project — rather than start one. You write, in your own words, where you
					want to land.
					<em class="font-story italic">A real person reads it</em> and points you toward places that
					are real, open, and an actual fit.
				</p>

				<p data-scroll-animate class="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
					No account. No listings to trawl. No algorithm quietly ranking whoever paid. A few honest
					suggestions instead — each one carrying what we could not confirm about it, written down
					beside what we could.
				</p>

				<div data-scroll-animate class="mt-10 flex flex-col gap-3 sm:flex-row">
					<a
						href={seekingStats.intakeUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration bg-ecohubs-dark hover:bg-ecohubs-deep group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium text-white transition-all"
					>
						Tell them where you want to land
						<span class="transition-transform group-hover:translate-x-0.5">↗</span>
					</a>
					<a
						href="#what-comes-back"
						class="hover:border-ecohubs-dark hover:text-ecohubs-dark inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-transparent px-7 py-3.5 font-medium text-stone-800 transition-all"
					>
						See what comes back
					</a>
				</div>

				<div
					data-scroll-animate
					class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600"
				>
					<span class="flex items-center gap-2">
						<span class="bg-ecohubs-primary h-1.5 w-1.5 rounded-full"></span> Always free
					</span>
					<span class="flex items-center gap-2">
						<span class="bg-ecohubs-primary h-1.5 w-1.5 rounded-full"></span> A real person reads every
						one
					</span>
					<span class="flex items-center gap-2">
						<span class="bg-ecohubs-primary h-1.5 w-1.5 rounded-full"></span>
						Matches within {seekingStats.turnaround}
					</span>
				</div>
			</div>

			<!-- Right: one match card, the thing the service actually produces.
			     The community is invented; the card's shape — and especially the
			     "still to confirm" line — is the real one. -->
			<div data-scroll-animate class="relative lg:col-span-5">
				<div
					class="soft-shadow relative overflow-hidden rounded-[28px] border border-stone-200/80 bg-white p-5 sm:p-6"
				>
					<div
						class="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-emerald-200/40 blur-2xl"
					></div>

					<div class="relative mb-4 flex items-center justify-between gap-3">
						<div class="flex items-center gap-2 text-stone-400">
							<span class="h-2.5 w-2.5 rounded-full bg-stone-300"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-stone-300"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-stone-300"></span>
						</div>
						<span class="font-mono text-[10px] tracking-widest text-stone-400 uppercase"
							>Seeking · example match · illustrative</span
						>
					</div>

					<div class="bg-ecohubs-ivory relative rounded-2xl border border-stone-200/70 p-4 sm:p-5">
						<div class="flex items-start justify-between gap-3">
							<div>
								<div class="flex items-center gap-2.5">
									<span class="font-serif text-ecohubs-deep text-xl leading-tight sm:text-2xl"
										>{demoMatch.name}</span
									>
									<span
										class="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[11px] text-emerald-800"
										>{demoMatch.score}</span
									>
								</div>
								<div class="mt-1 text-[13px] text-stone-600">
									<span class="text-ecohubs-primary font-medium">{demoMatch.type}</span>
									<span class="text-stone-400">&nbsp;·&nbsp;</span><span>{demoMatch.location}</span>
								</div>
							</div>
						</div>

						<p
							class="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3.5 py-3 text-[13px] leading-relaxed text-stone-700"
						>
							<span class="text-ecohubs-primary font-semibold">Why {demoMatch.name} —</span>
							{demoMatch.why}
						</p>

						<dl class="mt-4">
							{#each demoMatch.known as attr (attr.label)}
								<div
									class="flex items-baseline justify-between gap-4 border-b border-stone-200 py-2.5"
								>
									<dt class="font-mono text-[10px] tracking-wider text-stone-500 uppercase">
										{attr.label}
									</dt>
									<dd class="text-right text-[13px] text-stone-700">{attr.value}</dd>
								</div>
							{/each}
						</dl>

						<p class="mt-3.5 text-[12px] leading-relaxed text-stone-500">
							<span class="font-story text-ecohubs-primary italic">Still to confirm</span> —
							{demoMatch.unknown.join(' · ')}
						</p>
					</div>

					<div
						class="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-4 text-xs text-stone-500"
					>
						<span>Illustrative — a real match is written against what you wrote</span>
						<a
							href={seekingStats.url}
							target="_blank"
							rel="noopener noreferrer"
							class="no-external-decoration text-ecohubs-primary shrink-0 font-medium hover:underline"
							>Open ↗</a
						>
					</div>
				</div>

				<p class="font-story mt-6 max-w-sm text-[15px] leading-snug text-stone-600 italic">
					"A directory hands you a list and walks away. This hands you a few places — and tells you
					what it doesn't know about them."
				</p>
			</div>
		</div>
	</div>
</section>

<div class="hairline mx-auto max-w-4xl"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. IT ISN'T ONLY YOU
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-base py-24 md:py-36">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-14">
			<div class="kicker mb-4 text-emerald-700">Why people start looking</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				The loneliness was never <em class="font-story font-normal text-stone-500 italic"
					>a private failure.</em
				>
				<br />
				It is <em class="font-story font-normal italic">the way we were taught to live.</em>
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-stone-700">
				We are born onto a track nobody chose for us — school, work, a mortgage, retirement. For
				plenty of people it works. For some it feels wrong in the body: a life that looks full from
				the outside and is somehow empty from the inside.
			</p>
		</div>

		<ul data-scroll-stagger class="divide-y divide-stone-200 border-y border-stone-200">
			{#each recognitions as line (line)}
				<li class="font-serif text-ecohubs-deep py-7 text-2xl leading-snug md:text-3xl">
					{line}
				</li>
			{/each}
		</ul>

		<p data-scroll-animate class="mt-12 text-lg leading-relaxed text-stone-700">
			None of that is a flaw in you. We are primates: we need land, and we need each other. What
			follows is the practical half — how you find the place, and how you avoid landing badly.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. WHAT ACTUALLY STOPS PEOPLE
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-ivory relative py-24 md:py-32">
	<div class="grain pointer-events-none absolute inset-0 opacity-50"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-16 max-w-3xl">
			<div class="kicker mb-4 text-emerald-800">What actually stops people</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				Wanting it <em class="font-story font-normal text-stone-500 italic"
					>was never the hard part.</em
				>
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-stone-700">
				Almost everyone who writes in already knows they want to live differently. What stops them
				is the next bit — which looks like an emotional problem and is mostly a research problem
				wearing its coat.
			</p>
		</div>

		<div data-scroll-stagger class="grid gap-5 md:grid-cols-2">
			{#each blockers as blocker (blocker.number)}
				<article class="rounded-2xl border border-stone-200/70 bg-white p-7 md:p-8">
					<div class="kicker mb-3 text-stone-500">{blocker.number}</div>
					<h3 class="font-serif text-ecohubs-deep mb-2 text-xl leading-snug">{blocker.title}</h3>
					<p class="text-[15px] leading-relaxed text-stone-700">{blocker.body}</p>
				</article>
			{/each}
		</div>

		<p
			data-scroll-animate
			class="font-story mt-12 max-w-2xl text-lg leading-relaxed text-stone-600 italic"
		>
			None of this is fixed by more listings. It is fixed by someone who already knows this world
			reading what you wrote and doing the looking for you.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     4. WHAT IT IS / WHAT IT IS NOT
═══════════════════════════════════════════════════════════════════ -->
<StanceColumns
	kicker="What Seeking.Community is, and isn't"
	lead="A free service that helps you find something is usually making its money somewhere you cannot see. So it is worth being precise about what this one is, and what it is not."
	isItems={whatItIs}
	isNote="A human search, and an honest answer."
	isNotItems={whatItIsNot}
	isNotNote="And we would rather say so."
>
	{#snippet headline()}
		A person doing the looking, <em class="font-story font-normal text-emerald-300 italic"
			>not a database.</em
		>
	{/snippet}
</StanceColumns>

<!-- ═══════════════════════════════════════════════════════════════════
     5. HOW IT WORKS
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-base py-24 md:py-36">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-16 max-w-3xl">
			<div class="kicker mb-4 text-emerald-700">How it works</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				Not a questionnaire. <br />
				<em class="font-story font-normal text-stone-500 italic"
					>A conversation about where you want to land.</em
				>
			</h2>
		</div>

		<div data-scroll-stagger class="grid gap-6 md:grid-cols-3">
			{#each steps as step (step.number)}
				<article
					class="bg-ecohubs-ivory flex flex-col rounded-3xl border border-stone-200/70 p-8 md:p-9"
				>
					<div class="font-story text-ecohubs-primary/70 mb-5 text-4xl leading-none italic">
						{step.number}
					</div>
					<h3 class="font-serif text-ecohubs-deep mb-4 text-2xl leading-snug">{step.title}</h3>
					<p class="text-[15px] leading-relaxed text-stone-700">{step.body}</p>
				</article>
			{/each}
		</div>

		<div data-scroll-animate class="mt-12 flex flex-col gap-3 sm:flex-row">
			<a
				href={seekingStats.intakeUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="no-external-decoration bg-ecohubs-dark hover:bg-ecohubs-deep group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-colors"
			>
				Start writing
				<span class="transition-transform group-hover:translate-x-0.5">↗</span>
			</a>
			<a
				href="/csi"
				class="border-ecohubs-dark/40 hover:border-ecohubs-dark text-ecohubs-dark inline-flex items-center gap-2 border-b pb-1 font-medium"
			>
				Want to start one instead? Read the ground first →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. THE TEN QUESTIONS
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-ivory relative py-24 md:py-32">
	<div class="grain pointer-events-none absolute inset-0 opacity-40"></div>

	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-14 max-w-3xl">
			<div class="kicker mb-4 text-emerald-800">What it asks you</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				Ten questions, <em class="font-story font-normal text-stone-500 italic"
					>and none of them are filters.</em
				>
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-stone-700">
				This is what a person reads before they go looking. It takes about twenty minutes, and it is
				the reason the matches are not generic — nobody can be matched on something they were never
				asked about.
			</p>
		</div>

		<div data-scroll-stagger class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			{#each questions as question (question.number)}
				<article class="rounded-2xl border border-stone-200/70 bg-white p-5">
					<div class="font-mono text-[11px] tracking-wider text-emerald-700">{question.number}</div>
					<h3 class="font-serif text-ecohubs-deep mt-2 text-lg leading-snug">{question.label}</h3>
					<p class="mt-1.5 text-[13px] leading-relaxed text-stone-600">{question.body}</p>
				</article>
			{/each}
		</div>

		<p data-scroll-animate class="mt-10 max-w-2xl text-sm leading-relaxed text-stone-500">
			You answer in your own words, not in checkboxes, and nobody is scored. "I don't know yet" is a
			perfectly good answer to several of them — it tells a reader something too.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. WHAT COMES BACK — the honest section
═══════════════════════════════════════════════════════════════════ -->
<section id="what-comes-back" class="bg-ecohubs-base py-24 md:py-36">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-16 max-w-3xl">
			<div class="kicker mb-4 text-emerald-700">What comes back</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				A few places — and <em class="font-story font-normal text-stone-500 italic"
					>what we don't know about them.</em
				>
			</h2>
			<p class="mt-6 text-lg leading-relaxed text-stone-700">
				Each match is a single card. The top says what the place is, the middle says why it fits
				what you wrote, and the bottom does the thing almost no other service bothers with: it names
				what could not be checked.
			</p>
		</div>

		<div data-scroll-stagger class="grid gap-5 md:grid-cols-2">
			{#each anatomy as part (part.kicker)}
				<article class="bg-ecohubs-ivory rounded-2xl border border-stone-200/70 p-7">
					<div class="kicker mb-3 text-stone-500">{part.kicker}</div>
					<h3 class="font-serif text-ecohubs-deep mb-2 text-xl leading-snug">{part.title}</h3>
					<p class="text-[15px] leading-relaxed text-stone-700">{part.body}</p>
				</article>
			{/each}
		</div>

		<div data-scroll-animate class="mt-6">
			<CaveatPanel
				kicker="What we can't know for you"
				items={cannotKnow}
				columns={2}
				note="A match is a strong lead and a shortcut past months of searching — nothing more than that, and we would rather say it than let a tidy card imply otherwise. The visit is still yours to make, and so is the decision."
			/>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8. WHY ECOHUBS BUILT IT
═══════════════════════════════════════════════════════════════════ -->
<WhyWeBuiltIt
	kicker="Why EcoHubs built a matchmaker"
	lead="Seeking.Community is the one part of this project that is not built for people making something. It is built for the far larger number of people who simply want to arrive."
	quote={purposeCharter}
	{reasons}
>
	{#snippet headline()}
		Building one is hard.<br />
		<em class="font-story font-normal text-emerald-300 italic">Finding one shouldn't be.</em>
	{/snippet}
</WhyWeBuiltIt>

<!-- ═══════════════════════════════════════════════════════════════════
     9. WHERE SEEKING SITS
═══════════════════════════════════════════════════════════════════ -->
<PositionTriptych
	kicker="Where Seeking sits in the EcoHubs project"
	lead="Almost everything else EcoHubs builds is for people making a community. This is the one built for the people who only want to live in one — which, in every conversation we have, is most of them."
	cards={[
		{
			kicker: '01 · CSI',
			title: 'Where a new one could begin.',
			body: 'An open map of law, land, water and welcome — for the smaller number of people who intend to start something where nothing is yet.',
			cta: 'Read about CSI →',
			href: '/csi'
		},
		{
			kicker: '02 · Seeking',
			title: 'Where an existing one already is.',
			body: 'A person reads what you wrote and points you toward communities that are real, open and a genuine fit — free, and usually within a day.',
			cta: 'Open Seeking.Community ↗',
			href: seekingStats.url,
			external: true,
			here: true
		},
		{
			kicker: '03 · RCOS Standard',
			title: 'What holds it together once you arrive.',
			body: 'Whichever community you land in, the same things decide whether it lasts: how decisions get made, how conflict is repaired, how care is shared.',
			cta: 'Read about RCOS →',
			href: '/rcos'
		}
	]}
	footnote="Finding the place is the first problem. Living well in it is the long one — and they are not solved by the same tool."
>
	{#snippet headline()}
		Some people want to <em class="font-story font-normal text-stone-500 italic">start</em> one.<br
		/>
		Most people want to <em class="font-story font-normal italic">find</em> one.
	{/snippet}
</PositionTriptych>

<!-- ═══════════════════════════════════════════════════════════════════
     10. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-ivory py-24 md:py-32">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<div data-scroll-animate class="mb-14 max-w-2xl">
			<div class="kicker mb-4 text-emerald-700">A few honest answers</div>
			<h2 class="font-serif text-ecohubs-deep text-4xl leading-tight md:text-5xl">
				The questions people ask <em class="font-story font-normal text-stone-500 italic"
					>before they begin.</em
				>
			</h2>
		</div>

		<FaqAccordion items={faq} data-scroll-animate />

		<div
			class="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-8"
		>
			<a
				href="/faq#ecosystem"
				class="text-ecohubs-dark border-ecohubs-dark/40 hover:border-ecohubs-dark inline-flex items-center gap-2 border-b pb-1 text-sm font-medium"
			>
				See all questions across the project →
			</a>
			<a
				href="/membership"
				class="text-ecohubs-dark border-ecohubs-dark/40 hover:border-ecohubs-dark inline-flex items-center gap-2 border-b pb-1 text-sm font-medium"
			>
				Want to help build this instead? Become a member →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     11. CLOSING CTA
═══════════════════════════════════════════════════════════════════ -->
<ClosingCta
	kicker="Free, and human"
	divider
	footnote="Always free · A real person reads every one · Matches within {seekingStats.turnaround}"
>
	{#snippet headline()}
		You don't have to know where you're going. <br class="hidden md:block" />
		<em class="font-story font-normal text-emerald-300 italic">You only have to begin.</em>
	{/snippet}
	{#snippet lead()}
		Write where you want to land. A real person will read it, search by hand, and point you toward
		communities that fit — within {seekingStats.turnaround}, at no cost. The first step off the
		track is the only one you have to take alone.
	{/snippet}
	{#snippet actions()}
		<a
			href={seekingStats.intakeUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="no-external-decoration bg-ecohubs-ivory text-ecohubs-deep inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium transition-colors hover:bg-white"
		>
			Tell them where you want to land
			<span class="text-sm">↗</span>
		</a>
		<a
			href={seekingStats.url}
			target="_blank"
			rel="noopener noreferrer"
			class="no-external-decoration inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/50 px-8 py-4 font-medium text-emerald-100 transition-colors hover:bg-emerald-900/40"
		>
			Read the site first
			<span class="text-sm">↗</span>
		</a>
	{/snippet}
</ClosingCta>
