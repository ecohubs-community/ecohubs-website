<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';

	import { faqItems as generalFaq } from '../data';
	import { faqItems as visionFaq } from '../vision/data';
	import { faq as blueprintFaqRaw } from '../blueprint/data';
	import { faqItems as membershipFaq } from '../membership/data';

	// Normalise blueprint entries (use `aHtml`) into the same shape as the other FAQ arrays.
	const blueprintFaq = blueprintFaqRaw.map((item) => ({ q: item.q, a: item.aHtml }));

	const sections = [
		{
			id: 'general',
			num: '01',
			tag: 'GENERAL',
			title: 'The basics,',
			titleEm: 'in plain language.',
			lead: 'What EcoHubs is, what we are building, and how to read the rest of this site.',
			items: generalFaq
		},
		{
			id: 'vision',
			num: '02',
			tag: 'VISION',
			title: "What we're trying to do,",
			titleEm: "and what we're not.",
			lead: 'The why under the work — and the limits of what we claim.',
			items: visionFaq
		},
		{
			id: 'blueprint',
			num: '03',
			tag: 'BLUEPRINT',
			title: 'The shared document,',
			titleEm: 'how it actually works.',
			lead: "What's in it, who edits it, and how to fork it.",
			items: blueprintFaq
		},
		{
			id: 'membership',
			num: '04',
			tag: 'MEMBERSHIP',
			title: 'Joining, contributing,',
			titleEm: 'and stepping back.',
			lead: 'The application, the day-to-day, and the dignified way out.',
			items: membershipFaq
		}
	];

	// Single canonical FAQ JSON-LD payload — only emitted from this page so search
	// engines treat /faq as the source of truth. Per-page FAQ sections elsewhere
	// stay for human readers but no longer emit duplicate FAQPage schema.
	const seoFaq = sections
		.flatMap((s) => s.items)
		.map((item) => ({
			question: item.q,
			answer: item.a.replace(/<[^>]+>/g, '')
		}));

	onMount(() => {
		if (prefersReducedMotion()) {
			document
				.querySelectorAll<HTMLElement>('[data-scroll-animate], [data-scroll-stagger] > *')
				.forEach((el) => {
					el.style.opacity = '1';
					el.style.transform = 'none';
				});
			return;
		}

		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.06
		});
	});
</script>

<SEO
	title="Questions & Answers — EcoHubs"
	description="The questions we hear most about EcoHubs — the project, the Vision, the Blueprint (RCOS), and Membership — answered plainly, in one place."
	ogImage="/og-faq.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'FAQ', url: 'https://ecohubs.community/faq' }
	]}
	faq={seoFaq}
/>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-32 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -z-10 bottom-0 -right-20 w-[360px] h-[360px] rounded-full bg-amber-200/25 blur-3xl"
	></div>

	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="kicker text-emerald-700 mb-5">Questions &amp; answers</div>
		<h1
			data-scroll-animate
			class="font-serif text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			The questions <em class="font-story italic font-normal text-stone-500">we hear most —</em><br
			/>
			and the answers we keep
			<em class="font-story italic font-normal text-ecohubs-primary">refining out loud.</em>
		</h1>
		<p
			data-scroll-animate
			class="mt-7 text-lg md:text-xl text-stone-700 leading-relaxed max-w-2xl font-light"
		>
			Four sections, written plainly. If your question isn't here, it probably belongs in the
			Blueprint — and we'd like to hear it.
		</p>

		<div data-scroll-animate class="mt-10 flex flex-wrap gap-2 text-sm">
			{#each sections as s}
				<a
					href={`#${s.id}`}
					class="px-4 py-2 rounded-full bg-white border border-stone-200 hover:border-ecohubs-primary/50 text-stone-700 hover:text-ecohubs-dark transition-colors"
				>
					{s.tag.charAt(0)}{s.tag.slice(1).toLowerCase()}
				</a>
			{/each}
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. FAQ BODY
═══════════════════════════════════════════════════════════════════ -->
<section class="py-20 md:py-24 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
		<!-- Sticky side nav -->
		<aside class="lg:col-span-3 lg:sticky lg:top-28 self-start">
			<div class="kicker text-emerald-700 mb-5">Sections</div>
			<ol class="space-y-1 text-sm">
				{#each sections as s}
					<li>
						<a
							href={`#${s.id}`}
							class="group flex items-baseline gap-3 py-2 text-stone-700 hover:text-ecohubs-dark transition-colors"
						>
							<span
								class="font-mono text-[10px] tracking-widest text-stone-400 group-hover:text-ecohubs-primary"
								>{s.num}</span
							>
							<span class="font-serif text-base"
								>{s.tag.charAt(0)}{s.tag.slice(1).toLowerCase()}</span
							>
						</a>
					</li>
				{/each}
			</ol>

			<div class="mt-10 p-5 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
				<div class="kicker text-stone-500 mb-2">Didn't find it?</div>
				<p class="text-sm text-stone-700 leading-relaxed mb-4">
					Send the question. If it's a good one, it ends up here.
				</p>
				<a
					href="/contact"
					class="text-sm text-ecohubs-dark font-medium hover:text-ecohubs-primary transition-colors"
				>
					Write to us →
				</a>
			</div>
		</aside>

		<!-- Sections -->
		<div class="lg:col-span-9 space-y-20">
			{#each sections as section}
				<section id={section.id} class="scroll-mt-24">
					<div class="flex items-baseline gap-4 mb-8">
						<span class="font-mono text-[11px] tracking-widest text-emerald-700"
							>{section.num} · {section.tag}</span
						>
						<span class="flex-1 h-px bg-stone-200"></span>
					</div>
					<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight mb-3">
						{section.title}
						<em class="font-story italic font-normal text-stone-500">{section.titleEm}</em>
					</h2>
					<p class="text-stone-600 leading-relaxed mb-8 max-w-2xl">
						{section.lead}
					</p>

					<div
						data-scroll-stagger
						class="divide-y divide-stone-200 border-t border-b border-stone-200"
					>
						{#each section.items as item}
							<details class="group py-6">
								<summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
									<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
									<span
										class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none"
										>+</span
									>
								</summary>
								<div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">{@html item.a}</div>
							</details>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. STILL HAVE A QUESTION
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-32 overflow-hidden bg-ecohubs-ivory">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>
	<div data-scroll-animate class="max-w-3xl mx-auto px-6 lg:px-8 text-center relative">
		<div class="kicker text-emerald-700 mb-5">Still have a question?</div>
		<h2 class="font-serif text-3xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
			The good ones <em class="font-story italic font-normal text-stone-500">become chapters.</em>
		</h2>
		<p class="text-lg text-stone-700 leading-relaxed mb-9 max-w-xl mx-auto">
			Send it to us. We read everything. If your question reveals a gap, you'll see it answered here
			in the next revision.
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-3">
			<a
				href="/contact"
				class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				Send your question
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<a
				href="/membership"
				class="px-7 py-3.5 border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-colors inline-flex items-center justify-center gap-2"
			>
				Or apply to join
			</a>
		</div>
	</div>
</section>
