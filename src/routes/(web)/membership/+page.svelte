<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PersonaIcons from '$lib/components/PersonaIcons.svelte';
	import EcosystemSection from '$lib/components/EcosystemSection.svelte';
	import { Leaf, Coins } from 'lucide-svelte';

	import { rooms, faqItems, doorways, voices } from './data';

	// FAQPage JSON-LD is emitted only by the dedicated /faq route (canonical
	// source), so we don't duplicate the schema here even though the same Q&As
	// appear on this page for human readers.
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SEO
	title="Become a Member — EcoHubs.community"
	description="Apply to join EcoHubs — a free, contribution-based online community co-creating the Blueprint for regenerative communities. Read by real people, decided in the open."
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Membership', url: 'https://ecohubs.community/membership' }
	]}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"></div>
	<div class="absolute -z-10 top-20 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-200/25 blur-3xl"></div>
	<div class="absolute -z-10 bottom-0 -right-20 w-[420px] h-[420px] rounded-full bg-amber-200/30 blur-3xl"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
			<!-- Left -->
			<div class="lg:col-span-7">
				<div class="kicker text-emerald-700 mb-6 flex items-center gap-3">
					<span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 text-emerald-600 pulse-dot"></span>
					Open for applications · Free · Contribution-based
				</div>

				<h1 class="font-serif text-5xl md:text-6xl lg:text-[72px] leading-[1.04] tracking-tight text-ecohubs-deep">
					You don't <em class="font-story italic font-normal text-stone-500">join</em> EcoHubs<span class="font-story italic font-light text-stone-400">.</span><br />
					You start <em class="font-story italic font-normal text-ecohubs-primary">showing up</em> for it.
				</h1>

				<p class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light">
					Membership is not a tier you buy or a list you get on. It is a quiet
					decision to bring your craft, your time, or your honest questions to
					a community that is writing the Blueprint for a different way to live.
				</p>

				<div class="mt-10 flex flex-col sm:flex-row gap-3">
					<a
						href="/join"
						class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
						data-sveltekit-preload-data="hover"
					>
						Apply to become a member
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					<a
						href="#what-it-is"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
					>
						What does that actually mean?
					</a>
				</div>

				<div class="mt-12 max-w-md">
					<PersonaIcons>
						{#snippet caption()}
							Permaculturists, governance writers, designers, parents and
							<em class="font-story italic">people who got tired of doing this alone</em> —
							already inside.
						{/snippet}
					</PersonaIcons>
				</div>
			</div>

			<!-- Right: a "membership card" — a fillable dossier that you grow into.
           Echoes the Blueprint's structured aesthetic, but personal — reinforcing
           "you don't join, you start showing up". -->
			<div class="lg:col-span-5 relative">
				<!-- the card itself, slightly rotated for a paper-on-desk feel -->
				<div class="relative" style="transform: rotate(-1.2deg);">
				<!-- back card (paper stack) -->
				<div class="absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] bg-[#efe8d6] border border-stone-200/70"></div>
				<div class="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[26px] bg-[#f6f1e2] border border-stone-200/70"></div>

				<!-- main card -->
				<div class="relative bg-[#fbfbf9] rounded-[26px] border border-stone-200/80 soft-shadow overflow-hidden">
					<!-- top bar — like a passport / dossier header -->
					<div class="px-7 pt-6 pb-4 flex items-start justify-between border-b border-dashed border-stone-300/80">
					<div>
						<div class="font-mono text-[10px] tracking-[0.22em] text-stone-500 uppercase">EcoHubs · Membership Dossier</div>
						<div class="mt-1 font-serif text-[15px] text-ecohubs-deep">No. <span class="font-story italic">— assigned upon arrival</span></div>
					</div>
					<!-- subtle stamp-like seal -->
					<div class="relative w-14 h-14 shrink-0">
						<div class="absolute inset-0 rounded-full border-2 border-emerald-700/30"></div>
						<div class="absolute inset-1.5 rounded-full border border-emerald-700/20 flex items-center justify-center">
						<span class="font-story italic text-[11px] text-emerald-800/80 leading-none text-center">open<br/>standard</span>
						</div>
					</div>
					</div>

					<!-- name slot -->
					<div class="px-7 pt-5">
					<div class="kicker text-stone-500 mb-2">Member · name</div>
					<div class="flex items-end gap-3">
						<div class="font-story italic text-3xl text-stone-300 leading-none pb-1">your name,</div>
						<div class="font-story italic text-[15px] text-stone-400 pb-1.5">written by you</div>
					</div>
					<div class="mt-3 h-px bg-stone-300"></div>
					</div>

					<!-- two columns: what you bring / what grows -->
					<div class="px-7 py-6 grid grid-cols-2 gap-6">
					<div>
						<div class="kicker text-stone-500 mb-3">What you bring</div>
						<ul class="space-y-2.5 text-[13.5px] text-stone-700">
						<li class="flex items-center gap-2.5">
							<span class="w-3.5 h-3.5 rounded-[3px] border border-stone-400 inline-flex items-center justify-center text-emerald-700 text-[10px] leading-none">✓</span>
							Time &amp; honest attention
						</li>
						<li class="flex items-center gap-2.5">
							<span class="w-3.5 h-3.5 rounded-[3px] border border-stone-400 inline-flex items-center justify-center text-emerald-700 text-[10px] leading-none">✓</span>
							A craft, a question, or a skill
						</li>
						<li class="flex items-center gap-2.5">
							<span class="w-3.5 h-3.5 rounded-[3px] border border-stone-400"></span>
							<span class="text-stone-500 italic font-story">— write your own</span>
						</li>
						<li class="flex items-center gap-2.5">
							<span class="w-3.5 h-3.5 rounded-[3px] border border-stone-400"></span>
							<span class="text-stone-500 italic font-story">— write your own</span>
						</li>
						</ul>
					</div>
					<div>
						<div class="kicker text-stone-500 mb-3">What grows</div>
						<ul class="space-y-2.5 text-[13.5px] text-stone-700">
						<li class="flex items-center gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
							Trust
						</li>
						<li class="flex items-center gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
							Access
						</li>
						<li class="flex items-center gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
							Influence on the Blueprint
						</li>
						<li class="flex items-center gap-2.5 text-stone-500">
							<span class="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
							<span class="font-story italic">— and slowly, belonging</span>
						</li>
						</ul>
					</div>
					</div>

					<!-- status pills row -->
					<div class="px-7 pb-5 flex flex-wrap gap-2">
					<span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">Free</span>
					<span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">Contribution-based</span>
					<span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-stone-100 text-stone-700 border border-stone-200">Online</span>
					<span class="px-2.5 py-1 text-[11px] font-medium rounded-full bg-stone-100 text-stone-700 border border-stone-200">Application-only</span>
					</div>

					<!-- signature footer -->
					<div class="px-7 py-5 bg-[#f5f2ea] border-t border-dashed border-stone-300/80 flex items-end justify-between gap-4">
					<div class="flex-1">
						<div class="kicker text-stone-500 mb-2">Signed, by showing up</div>
						<svg viewBox="0 0 220 36" class="w-full max-w-[220px] h-9 opacity-50">
						<path d="M4 24 C 14 6, 28 28, 42 18 S 70 8, 86 22 S 116 30, 134 14 S 162 4, 184 20 S 210 28, 218 18"
								stroke="#0b2e24" stroke-width="1.6" fill="none" stroke-linecap="round"/>
						</svg>
					</div>
					<div class="text-right shrink-0">
						<div class="kicker text-stone-500 mb-1">Date</div>
						<div class="font-story italic text-stone-700 text-[15px]">when you're ready</div>
					</div>
					</div>
				</div>
				</div>

				<!-- floating quote chip — same voice family as other pages, distinct from card 
				<div class="absolute -left-4 -bottom-6 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 soft-shadow max-w-[270px] border border-stone-100 hidden md:block">
					<p class="font-story italic text-[15px] leading-snug text-stone-800">
						"I joined to read the Blueprint. Three months in, I was the one writing the conflict-repair chapter."
					</p>
					<p class="mt-2 text-[11px] text-stone-500 tracking-wider uppercase">Anika · governance writer</p>
				</div>-->
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. WHAT MEMBERSHIP ACTUALLY IS — honest framing
═══════════════════════════════════════════════════════════════════ -->
<section id="what-it-is" class="relative py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Before you apply — what this is, honestly</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				We'd rather <em class="font-story italic font-normal text-stone-500">undersell it</em><br />
				than have you arrive disappointed.
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Plenty of community projects sell a finished thing. We can't — because we are not finished, and that is intentional. Here is exactly what membership is, and what it isn't, in plain language.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-5">
			<!-- IS -->
			<div class="rounded-3xl bg-ecohubs-ivory border border-stone-200/70 p-7 md:p-9 relative overflow-hidden">
				<div class="kicker text-emerald-700 mb-6">What it is</div>
				<ul class="space-y-5">
					{#each [
						{ strong: 'An online community', rest: '— held together by tools, calls, and a shared document called the Blueprint.' },
						{ strong: 'Free to join.', rest: 'No fee, no tier, no premium. Application is based on alignment, not payment.' },
						{ strong: 'Contribution-based.', rest: 'Trust, access, and influence grow with what you bring — research, writing, listening, code, care.' },
						{ strong: 'A voice in the work.', rest: 'Members shape the Blueprint, vote on proposals, and decide together who joins next.' },
						{ strong: 'A starting point for RCOS.', rest: 'The first place where the Regenerative Community Operating System gets tried, refined, and improved together.' }
					] as item}
						<li class="flex items-start gap-4">
							<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
							<p class="text-stone-800 leading-relaxed">
								<strong class="text-ecohubs-deep">{item.strong}</strong>
								{item.rest}
							</p>
						</li>
					{/each}
				</ul>
			</div>

			<!-- IS NOT -->
			<div class="rounded-3xl bg-white border border-stone-200/70 p-7 md:p-9 relative overflow-hidden">
				<div class="kicker text-amber-700 mb-6">What it isn't</div>
				<ul class="space-y-5">
					{#each [
						'Not a place to <em class="font-story italic">move to</em> — yet. We are not currently placing members in physical communities.',
						'Not a <em class="font-story italic">crypto investment</em>. ECO is an internal value unit, non-transferable, never traded.',
						'Not a <em class="font-story italic">consumer product</em>. There is no feed to scroll, no engagement loop. Show up, or do not.',
						'Not an <em class="font-story italic">ideology</em>. We have stances; we do not have a doctrine you must agree with.',
						'Not a <em class="font-story italic">finished thing</em>. It will change while you are inside it. That is the offer.'
					] as html}
						<li class="flex items-start gap-4">
							<span class="mt-2 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
							<p class="text-stone-700 leading-relaxed">{@html html}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		3. THREE DOORWAYS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-2xl mb-14">
			<div class="kicker text-emerald-800 mb-4">Three doorways in</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				There's no <em class="font-story italic font-normal text-stone-500">one way</em> to begin.<br />
				Pick the one that feels honest.
			</h2>
			<p class="mt-5 text-lg text-stone-700 leading-relaxed">
				These are not tiers. They are the doorways we have noticed people actually walk through. You can start with one and end up doing all three. Most people do.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-5 lg:gap-7">
			{#each doorways as d}
				<a
					href={d.href}
					class="group bg-white rounded-3xl p-7 md:p-8 border border-stone-200/80 hover:border-ecohubs-primary/50 transition-colors flex flex-col"
				>
					<div class="font-mono text-[11px] tracking-widest uppercase text-emerald-700 mb-5">
						{d.num} · {d.tag}
					</div>
					<h3 class="font-serif text-2xl md:text-[26px] text-ecohubs-deep leading-snug mb-4">
						{d.title}
					</h3>
					<p class="text-stone-700 leading-relaxed text-[15px] flex-1">{d.body}</p>
					<div class="mt-7 pt-6 border-t border-stone-100 flex items-center justify-between gap-3">
						<span class="text-xs text-stone-500 font-story italic">{d.meta}</span>
						<span
							class="text-sm text-ecohubs-dark font-medium group-hover:translate-x-0.5 inline-block transition-transform"
						>
							{d.cta}
						</span>
					</div>
				</a>
			{/each}
		</div>

		<p class="mt-12 text-center text-sm text-stone-500 max-w-xl mx-auto font-story italic">
			None of these are tiers. None of these cost. They are the doorways we have noticed people walk through.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		4. APPLICATION PROCESS
═══════════════════════════════════════════════════════════════════ -->
<section id="apply" class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
			<!-- LEFT: intro -->
			<aside class="lg:col-span-4 lg:sticky lg:top-28 self-start">
				<div class="kicker text-emerald-700 mb-4">How becoming a member works</div>
				<h2 class="font-serif text-4xl md:text-[44px] text-ecohubs-deep leading-tight mb-6">
					A short application,<br />
					read by <em class="font-story italic font-normal text-stone-500">real people</em>,<br />
					decided in the open.
				</h2>
				<p class="text-stone-700 leading-relaxed mb-8">
					We do not auto-approve. The community itself reads each application and decides together. It is slower than clicking Sign Up — and that is why it works.
				</p>

				<div class="space-y-4 text-sm">
					<div class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60">
						<span class="mt-1 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<div>
							<div class="font-medium text-ecohubs-deep">~20 minutes to apply</div>
							<div class="text-stone-600 mt-0.5">Background, values, how you'd like to show up.</div>
						</div>
					</div>
					<div class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60">
						<span class="mt-1 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<div>
							<div class="font-medium text-ecohubs-deep">3 days to hear back</div>
							<div class="text-stone-600 mt-0.5">Community review and vote on ecohubsOS, by email at the end.</div>
						</div>
					</div>
					<div class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60">
						<span class="mt-1 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<div>
							<div class="font-medium text-ecohubs-deep">No fee, ever</div>
							<div class="text-stone-600 mt-0.5">Membership is free and remains free.</div>
						</div>
					</div>
				</div>
			</aside>

			<!-- RIGHT: steps -->
			<div class="lg:col-span-8 space-y-8">
				<!-- Step 1 -->
				<article class="flex gap-6 md:gap-8 items-start p-7 md:p-9 bg-white rounded-3xl border border-stone-200/70 soft-shadow">
					<div class="flex shrink-0 flex-col items-center">
						<div class="w-14 h-14 rounded-full bg-ecohubs-deep text-ecohubs-ivory font-serif text-xl flex items-center justify-center">01</div>
						<div class="mt-3 w-px flex-1 bg-stone-200 min-h-[40px]"></div>
					</div>
					<div>
						<div class="kicker text-stone-500 mb-2">Step one</div>
						<h3 class="font-serif text-2xl md:text-[28px] text-ecohubs-deep leading-snug mb-3">
							Tell us who you are, in your own words.
						</h3>
						<p class="text-stone-700 leading-relaxed mb-5">
							The form takes about 20 minutes. We ask about your background, what you care about, what brought you here, and how you'd like to contribute. We read all of it. Long answers welcome — short ones too, if you mean them.
						</p>
						<div class="flex flex-wrap gap-2">
							{#each ['Your background', 'What you care about', 'How you would contribute', 'A question you have'] as chip}
								<span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs">{chip}</span>
							{/each}
						</div>
					</div>
				</article>

				<!-- Step 2 -->
				<article class="flex gap-6 md:gap-8 items-start p-7 md:p-9 bg-white rounded-3xl border border-stone-200/70 soft-shadow">
					<div class="flex flex-col shrink-0 items-center">
						<div class="w-14 h-14 rounded-full bg-ecohubs-primary text-white font-serif text-xl flex items-center justify-center">02</div>
						<div class="mt-3 w-px flex-1 bg-stone-200 min-h-[40px]"></div>
					</div>
					<div>
						<div class="kicker text-stone-500 mb-2">Step two</div>
						<h3 class="font-serif text-2xl md:text-[28px] text-ecohubs-deep leading-snug mb-3">
							The community reads it. The community decides.
						</h3>
						<p class="text-stone-700 leading-relaxed mb-5">
							Parts of your application are made visible to current members for three days through ecohubsOS. They review, ask questions, and vote with the platform's internal voting system. We trust the people already inside to know who fits.
							<em class="font-story italic">No founder veto. No private inbox.</em>
						</p>
						<div class="grid sm:grid-cols-3 gap-3 mt-2">
							<div class="p-4 rounded-xl bg-ecohubs-ivory border border-stone-200/60">
								<div class="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-1">Day 0</div>
								<div class="text-sm text-ecohubs-deep font-medium">Posted to members</div>
							</div>
							<div class="p-4 rounded-xl bg-ecohubs-ivory border border-stone-200/60">
								<div class="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-1">Day 1–3</div>
								<div class="text-sm text-ecohubs-deep font-medium">Discussion + vote</div>
							</div>
							<div class="p-4 rounded-xl bg-ecohubs-ivory border border-stone-200/60">
								<div class="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-1">Day 3</div>
								<div class="text-sm text-ecohubs-deep font-medium">You hear back</div>
							</div>
						</div>
					</div>
				</article>

				<!-- Step 3 -->
				<article class="flex gap-6 md:gap-8 items-start p-7 md:p-9 bg-white rounded-3xl border border-stone-200/70 soft-shadow">
					<div class="flex shrink-0 flex-col items-center">
						<div class="w-14 h-14 rounded-full bg-amber-600 text-white font-serif text-xl flex items-center justify-center">03</div>
					</div>
					<div>
						<div class="kicker text-stone-500 mb-2">Step three</div>
						<h3 class="font-serif text-2xl md:text-[28px] text-ecohubs-deep leading-snug mb-3">
							You walk in. The way to find your path is to show up.
						</h3>
						<p class="text-stone-700 leading-relaxed mb-5">
							On approval, you log in to
							<a
								href="https://os.ecohubs.community"
								class="text-ecohubs-dark underline decoration-ecohubs-primary/40 underline-offset-4 hover:decoration-ecohubs-primary"
								target="_blank"
								rel="noopener"
							>
								os.ecohubs.community
							</a>
							and walk through a short onboarding. From there, the path forward is human contact: join the regular community calls, post in the forum, or write to us directly. That is how you find the people working in your area of contribution today.
						</p>
						<div class="flex flex-wrap gap-3 text-sm">
							<span class="inline-flex items-center gap-2 text-stone-700">
								<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
								Regular community calls
							</span>
							<span class="inline-flex items-center gap-2 text-stone-700">
								<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
								Direct message us anytime
							</span>
							<span class="inline-flex items-center gap-2 text-stone-700">
								<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
								Open Blueprint, full voice
							</span>
						</div>
					</div>
				</article>

				<div class="pt-4">
					<a
						href="/join"
						class="inline-flex items-center gap-2 px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all group"
						data-sveltekit-preload-data="hover"
					>
						Start your application
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					<p class="mt-4 text-sm text-stone-500 max-w-md font-story italic">
						Completing the form is not a guarantee — it is an honest conversation. Most applications take a single sitting.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		5. ROOMS / WHERE THE WORK IS
═══════════════════════════════════════════════════════════════════ -->
<section id="rooms" class="py-24 md:py-32 bg-ecohubs-ivory relative overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-3xl mb-14">
			<div class="kicker text-emerald-800 mb-4">Where the work actually is</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				There are no fixed roles<span class="font-story italic font-light text-stone-400">.</span><br />
				<em class="font-story italic font-normal text-stone-500">Just rooms with their lights on, waiting.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Browse the rooms. Most members move between several. Your path will shape itself once you are inside, but here is what people are working on right now.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
			{#each rooms as room}
				<article class="bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:shadow-lg transition-all flex flex-col">
					<div class="h-1 {room.accent}"></div>
					<div class="p-6 lg:p-7 flex flex-col flex-1">
						<div class="flex items-center justify-between mb-4">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 {room.iconBg} rounded-xl flex items-center justify-center {room.iconColor}">
									<svelte:component this={room.icon} class="w-5 h-5" aria-hidden="true" strokeWidth={1.8} />
								</div>
								<span class="font-mono text-[11px] tracking-widest text-ecohubs-primary">ROOM · {room.num}</span>
							</div>
						</div>
						<h3 class="font-serif text-xl text-ecohubs-deep mb-2 leading-snug">{room.title}</h3>
						<p class="text-sm text-stone-700 leading-relaxed flex-1">{room.body}</p>
						<div class="mt-5 text-[11px] tracking-widest uppercase text-stone-400">{room.tags}</div>
					</div>
				</article>
			{/each}

			<!-- Open room — bring your own -->
			<article class="rounded-2xl overflow-hidden bg-ecohubs-deep border border-emerald-900/40 text-ecohubs-ivory flex flex-col">
				<div class="h-1 bg-emerald-500/60"></div>
				<div class="p-6 lg:p-7 flex flex-col flex-1">
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-emerald-900/60 rounded-xl flex items-center justify-center text-emerald-300">
								<span class="font-serif text-xl leading-none">+</span>
							</div>
							<span class="font-mono text-[11px] tracking-widest text-emerald-300/90">ROOM · ?</span>
						</div>
						<span class="text-xs text-stone-300/70">Yours, maybe</span>
					</div>
					<h3 class="font-serif text-xl text-ecohubs-ivory mb-2 leading-snug">Something we haven't named yet</h3>
					<p class="text-sm text-stone-200/80 leading-relaxed flex-1">
						Every member opens a room we did not know we needed. If you do not see your craft above, that probably means there is a doorway with your name on it.
					</p>
					<div class="mt-5 text-[11px] tracking-widest uppercase text-emerald-300/70">Bring your own</div>
				</div>
			</article>
		</div>

		<p class="mt-10 text-sm text-stone-500 max-w-2xl font-story italic">
			Rooms are not roles. Most members move between several. Inside, the way to find others working on the same thing is to join the calls and reach out — we are still small enough that direct contact is the fastest path.
		</p>

		<div class="mt-10 flex flex-col sm:flex-row gap-3">
			<a
				href="/join"
				class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
				data-sveltekit-preload-data="hover"
			>
				Apply to join a room
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<a
				href="/contact"
				class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
			>
				Open a room we haven't named
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		6. TRUST BY DESIGN
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
		<div class="lg:col-span-5 lg:sticky lg:top-28 self-start">
			<div class="kicker text-emerald-700 mb-4">How trust gets built here</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				We make the <em class="font-story italic font-normal text-stone-500">invisible</em> things<br />
				explicit — on purpose.
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				Most communities die from the things no one wrote down: how decisions get made, how power moves, how someone leaves. We write them down on day one.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed">
				Trust here is not built on charisma or vibes. It is built on
				<em class="font-story italic">visibility</em> — of effort, of votes, of process — and the freedom to disagree out loud.
			</p>
		</div>

		<div class="lg:col-span-7 space-y-5">
			{#each [
				{ kicker: 'Decisions', title: 'Member-guided, in the open', body: "New members, published content, shared direction — decided by transparent votes through ecohubsOS' internal voting system. Voting is the last step, after deliberation. Not the only step." },
				{ kicker: 'Authority', title: 'Earned, not assigned', body: 'Permissions and influence grow with contribution. Not financial stake. Not seniority. The people doing the work hold the room — and step back when they need to.' },
				{ kicker: 'Conversation', title: 'Sense-making before voting', body: 'Proposals are discussed in forums and circles before any vote. Disagreement is welcome. Refining a proposal counts as much as proposing one.' },
				{ kicker: 'Technology', title: 'On-chain where useful, off-chain where human', body: 'EcoHubs is not "fully on-chain" — by choice. Blockchain where transparency and auditability genuinely help; everywhere else, human judgment and care.' }
			] as item}
				<div class="flex gap-5 p-6 md:p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="w-10 h-10 shrink-0 rounded-full bg-ecohubs-deep text-emerald-200 flex items-center justify-center font-serif">→</div>
					<div>
						<div class="kicker text-stone-500 mb-1">{item.kicker}</div>
						<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{item.title}</h3>
						<p class="text-stone-700 leading-relaxed text-[15px]">{item.body}</p>
					</div>
				</div>
			{/each}

			<div class="flex gap-5 p-6 md:p-7 rounded-2xl bg-ecohubs-deep border border-emerald-900/40 text-ecohubs-ivory">
				<div class="w-10 h-10 shrink-0  rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-serif">→</div>
				<div>
					<div class="kicker text-emerald-300/90 mb-1">ECO &amp; XP — the honest version</div>
					<h3 class="font-serif text-xl text-ecohubs-ivory mb-2">Recognition, not speculation</h3>
					<p class="text-stone-200/85 leading-relaxed text-[15px]">
						ECO and XP are non-transferable, non-tradeable internal units that mark contribution. They unlock access and responsibility inside the community. They are not an investment, not a coin to flip, and never the reason to be here.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		7. THE OPERATING SYSTEM (reused EcosystemSection — Snapshot removed)
═══════════════════════════════════════════════════════════════════ -->
<EcosystemSection />

<!-- ═══════════════════════════════════════════════════════════════════
		8. MEMBER VOICES
═══════════════════════════════════════════════════════════════════ 
<section class="relative py-24 md:py-28 bg-ecohubs-ivory">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">In their own words</div>
			<h2 class="font-serif text-3xl md:text-5xl text-ecohubs-deep leading-tight">
				Why people decided <em class="font-story italic font-normal text-stone-500">to show up.</em>
			</h2>
		</div>

		<div class="grid md:grid-cols-3 gap-6 lg:gap-8">
			{#each voices as v}
				<article class="bg-white rounded-3xl p-7 border border-stone-200/80 soft-shadow flex flex-col">
					<p class="font-story italic text-xl leading-snug text-ecohubs-deep flex-1">"{v.quote}"</p>
					<div class="mt-6 flex items-center gap-3 pt-6 border-t border-stone-100">
						<div class="w-11 h-11 rounded-full bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-500 font-serif text-base select-none">
							{v.name.charAt(0)}
						</div>
						<div>
							<div class="font-serif text-base text-ecohubs-deep">{v.name}</div>
							<div class="text-xs text-stone-500">{v.location}</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>-->

<!-- ═══════════════════════════════════════════════════════════════════
		9. WHAT YOU GET WHEN YOU'RE INSIDE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-deep text-ecohubs-ivory relative overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.15), transparent 55%);"
	></div>
	<div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-2xl mb-14">
			<div class="kicker text-emerald-300/80 mb-4">What you get when you're inside</div>
			<h2 class="font-serif text-4xl md:text-5xl leading-[1.1] text-ecohubs-ivory">
				No swag. <em class="font-story italic font-light text-stone-400">No premium tier.</em><br />
				Just <em class="font-story italic text-emerald-300 font-normal">a real seat at a real table.</em>
			</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-x-12 gap-y-8">
			{#each [
				{ k: 'A voice', body: 'Vote on proposals, shape the Blueprint, decide who joins next. Your weight is your contribution, not your wallet.' },
				{ k: 'A platform', body: "Full access to ecohubsOS, the forum, the calls, the working docs. The community's memory, openly held." },
				{ k: 'A circle', body: 'People who treat your work seriously and your time as finite. Calls, threads, real people on the other end.' },
				{ k: 'A practice ground', body: 'A place to try the Blueprint where it counts least and learns most — online first, with the people who are writing it. The pilot work happens elsewhere, in RCOS-led communities.' },
				{ k: 'Recognition', body: 'XP and ECO mark your contribution visibly. Care and craft do not go unseen. They are not a paycheck — they are a record.' },
				{ k: 'An exit, with dignity', body: 'Membership is voluntary. The Blueprint includes how people step back, leave, and return — without drama.' }
			] as item}
				<div>
					<div class="kicker text-emerald-300/80 mb-3">{item.k}</div>
					<p class="text-stone-200/85 leading-relaxed">{item.body}</p>
				</div>
			{/each}
		</div>

		<div class="mt-14 flex flex-col sm:flex-row gap-3">
			<a
				href="/join"
				class="px-7 py-3.5 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
				data-sveltekit-preload-data="hover"
			>
				Apply for your seat
				<span>→</span>
			</a>
			<a
				href="/faq"
				class="px-7 py-3.5 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors inline-flex items-center justify-center gap-2"
			>
				Read the questions first →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		10. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section id="faq" class="py-24 md:py-32 bg-white">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Questions we hear a lot</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Honest answers <em class="font-story italic font-normal text-stone-500">to the honest questions.</em>
			</h2>
		</div>

		<div class="divide-y divide-stone-200 border-t border-b border-stone-200">
			{#each faqItems as item}
				<details class="group py-6">
					<summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
						<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
						<span class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none">+</span>
					</summary>
					<div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">{@html item.a}</div>
				</details>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<a
				href="/faq#membership"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				See all questions across the project →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		11. FINAL CTA
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-28 md:py-40 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-ecohubs-deep"></div>
	<div
		class="absolute inset-0 -z-10 opacity-40"
		style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.2), transparent 55%);"
	></div>

	<div class="max-w-3xl mx-auto px-6 lg:px-8 text-center text-ecohubs-ivory">
		<div class="kicker text-emerald-300 mb-5">An invitation, not a funnel</div>
		<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
			If you've read this far <span class="font-story italic font-light">—</span><br />
			<em class="font-story italic font-normal text-emerald-300">we'd like to read you, too.</em>
		</h2>
		<p class="text-lg text-stone-200/85 leading-relaxed mb-10 max-w-xl mx-auto">
			We are not looking for believers. We are looking for people who are ready
			to make the invisible things explicit — in their own lives, and with others.
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-3">
			<a
				href="/join"
				class="px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors"
				data-sveltekit-preload-data="hover"
			>
				Apply for membership
			</a>
			<a
				href="/vision"
				class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors"
			>
				Read the vision first
			</a>
		</div>
		<p class="mt-10 text-xs text-emerald-200/60 tracking-widest uppercase">
			Free · Contribution-based · Community-decided
		</p>
		<p class="mt-4 text-sm text-emerald-100/60 max-w-md mx-auto font-story italic">
			Completing the application doesn't guarantee membership. The community decides together. We answer everyone, either way.
		</p>
	</div>
</section>

<style>
	/* Page-local typography mirrors the v2 homepage so this page reads as part
	   of the same visual system. The body fallback is Stack Sans Headline (a
	   thin display font), so we explicitly opt body copy into Inter. */

	:global(main p),
	:global(main li),
	:global(main blockquote),
	:global(main span:not([class*='font-'])),
	:global(main div:not([class*='font-'])) {
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	:global(.font-story) {
		font-family: var(--font-story, 'Fraunces', serif);
		font-optical-sizing: auto;
	}

	:global(.kicker) {
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
	}

	:global(.soft-shadow) {
		box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
	}

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
	}

	:global(.grain)::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.5;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}

	:global(.pulse-dot)::before {
		content: '';
		position: absolute;
		inset: -6px;
		border-radius: 9999px;
		background: currentColor;
		opacity: 0.25;
		animation: pulse-ring 2.4s ease-in-out infinite;
	}

	@keyframes pulse-ring {
		0%, 100% { transform: scale(1);   opacity: 0.25; }
		50%      { transform: scale(1.6); opacity: 0;    }
	}

	details summary::-webkit-details-marker {
		display: none;
	}
</style>
