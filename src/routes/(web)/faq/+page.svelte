<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Search, X } from 'lucide-svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { generateBreadcrumbs } from '$lib/config/seo';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';

	import { faqItems as generalFaq, ecosystemFaq } from '../data';
	import { faqItems as visionFaq } from '../vision/data';
	import { faq as rcosFaq } from '../rcos/data';
	import { faq as csiFaq } from '../csi/data';
	import { faq as votecastFaq } from '../votecast/data';
	import { faq as seekingFaq } from '../seeking/data';
	import { faqItems as membershipFaq } from '../membership/data';

	const breadcrumbs = generateBreadcrumbs('faq');

	// The ecosystem section carries the tool overviews plus the per-tool questions
	// from `/csi`, `/votecast` and `/seeking`, so those answers are searchable here too.
	const ecosystemItems = [...ecosystemFaq, ...csiFaq, ...votecastFaq, ...seekingFaq];

	const rawSections = [
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
			id: 'rcos',
			num: '03',
			tag: 'RCOS STANDARD',
			title: 'The shared document,',
			titleEm: 'how it actually works.',
			lead: "What's in it, who edits it, and how to fork it.",
			items: rcosFaq
		},
		{
			id: 'ecosystem',
			num: '04',
			tag: 'ECOSYSTEM',
			title: 'The tools we build,',
			titleEm: 'and how they fit.',
			lead: 'The shared apps behind EcoHubs — RCOS, CSI, VoteCast, and the resilience assessment.',
			items: ecosystemItems
		},
		{
			id: 'membership',
			num: '05',
			tag: 'MEMBERSHIP',
			title: 'Joining, contributing,',
			titleEm: 'and stepping back.',
			lead: 'The application, the day-to-day, and the dignified way out.',
			items: membershipFaq
		}
	];

	// Stable, unique anchor id per question so answers are deep-linkable.
	function slugify(s: string): string {
		return s
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')
			.slice(0, 60);
	}

	const sections = rawSections.map((s) => ({
		...s,
		items: s.items.map((it) => ({ ...it, id: `${s.id}-${slugify(it.q)}` }))
	}));

	// Single canonical FAQ JSON-LD payload — only emitted from this page so search
	// engines treat /faq as the source of truth. Per-page FAQ sections elsewhere
	// stay for human readers but no longer emit duplicate FAQPage schema.
	const seoFaq = sections
		.flatMap((s) => s.items)
		.map((item) => ({
			question: item.q,
			answer: item.a.replace(/<[^>]+>/g, '')
		}));

	/* ── Client-side keyword filter ─────────────────────────────────── */
	let query = $state('');
	const q = $derived(query.trim().toLowerCase());
	const searching = $derived(q.length > 0);
	const results = $derived(
		searching
			? sections.flatMap((s) =>
					s.items
						.filter((it) => `${it.q} ${it.a}`.toLowerCase().includes(q))
						.map((it) => ({ ...it, sectionTag: s.tag }))
				)
			: []
	);

	/* ── Copy-link-to-question ──────────────────────────────────────── */
	let copiedId = $state('');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;
	async function copyLink(id: string, e: Event) {
		e.preventDefault();
		e.stopPropagation();
		const url = `${location.origin}${location.pathname}#${id}`;
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			/* clipboard blocked — still update the hash below so the URL is shareable */
		}
		history.replaceState(null, '', `#${id}`);
		copiedId = id;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copiedId = ''), 1500);
	}

	let searchInput = $state<HTMLInputElement | null>(null);

	function clearSearch() {
		query = '';
		searchInput?.focus();
	}

	/**
	 * Searching swaps the section list out for the results list, so clearing the
	 * search mounts brand-new nodes that the `onMount` IntersectionObserver never
	 * saw — they keep the FOUC guard's `opacity: 0` and the page reads as empty.
	 *
	 * These are revealed outright rather than re-observed: the reader has already
	 * seen this content, replaying the entrance choreography is noise, and an
	 * observer that never fires (a backgrounded tab, say) would hide the whole
	 * page. The first mount is left alone so the initial animation still runs.
	 */
	let hasSearched = false;
	$effect(() => {
		if (searching) {
			hasSearched = true;
			return;
		}
		if (!hasSearched) return;
		tick().then(() => {
			document
				.querySelectorAll('[data-scroll-animate], [data-scroll-stagger]')
				.forEach((el) => el.classList.add('is-visible'));
		});
	});

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.06
		});

		// Deep link: open and scroll to a specific question if the URL carries its id.
		const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
		if (hash) {
			const el = document.getElementById(hash);
			if (el) {
				if (el.tagName === 'DETAILS') (el as HTMLDetailsElement).open = true;
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	});
</script>

<SEO
	title="Questions & Answers — EcoHubs"
	description="The questions we hear most about EcoHubs — the project, the Vision, the RCOS Standard, the ecosystem tools, and Membership — answered plainly, in one place."
	ogImage="/og-faq.jpg"
	{breadcrumbs}
	faq={seoFaq}
/>

<!-- Reusable question row — shared by the section view and the search results. -->
{#snippet qa(item: { id: string; q: string; a: string }, sectionTag: string | null)}
	<details id={item.id} class="group py-6 scroll-mt-28">
		<summary class="flex justify-between items-center gap-6 cursor-pointer list-none">
			<span class="flex items-start gap-2 min-w-0">
				<button
					type="button"
					onclick={(e) => copyLink(item.id, e)}
					class="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 hover:!opacity-100 text-stone-400 hover:text-ecohubs-primary transition-opacity"
					title="Copy link to this question"
					aria-label="Copy link to this question"
				>
					{#if copiedId === item.id}
						<span class="text-xs text-ecohubs-primary font-medium whitespace-nowrap">Copied ✓</span>
					{:else}
						<span class="text-base leading-none select-none" aria-hidden="true">#</span>
					{/if}
				</button>
				<span class="min-w-0">
					{#if sectionTag}
						<span class="block font-mono text-[10px] tracking-widest text-emerald-700 mb-1"
							>{sectionTag}</span
						>
					{/if}
					<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
				</span>
			</span>
			<span
				class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none"
				>+</span
			>
		</summary>
		<div class="mt-4 pl-6 text-stone-700 leading-relaxed max-w-2xl">{@html item.a}</div>
	</details>
{/snippet}

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
		<div data-scroll-animate class="flex items-start justify-between gap-4 flex-wrap mb-5">
			<div class="kicker text-emerald-700">Questions &amp; answers</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
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
			Five sections, written plainly. If your question isn't here, it probably belongs in the RCOS
			Standard — and we'd like to hear it.
		</p>

		<!-- Search -->
		<div data-scroll-animate class="mt-8 max-w-xl">
			<div class="relative">
				<label for="faq-search" class="sr-only">Search questions</label>
				<Search
					class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400 pointer-events-none"
					strokeWidth={1.8}
					aria-hidden="true"
				/>
				<input
					id="faq-search"
					bind:this={searchInput}
					type="search"
					bind:value={query}
					onkeydown={(e) => e.key === 'Escape' && clearSearch()}
					placeholder="Search the questions…"
					class="faq-search w-full rounded-full border border-stone-300 bg-white/80 backdrop-blur pl-12 pr-12 py-3 text-stone-800 placeholder:text-stone-400 focus:border-ecohubs-primary focus:outline-none focus:ring-2 focus:ring-ecohubs-primary/20 transition-colors"
				/>
				{#if query}
					<button
						type="button"
						onclick={clearSearch}
						aria-label="Clear search"
						class="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-ecohubs-dark focus-visible:ring-2 focus-visible:ring-ecohubs-primary/40 focus:outline-none transition-colors"
					>
						<X class="h-4 w-4" strokeWidth={2} aria-hidden="true" />
					</button>
				{/if}
			</div>
		</div>

		{#if !searching}
			<div data-scroll-animate class="mt-6 flex flex-wrap gap-2 text-sm">
				{#each sections as s}
					<a
						href={`#${s.id}`}
						class="px-4 py-2 rounded-full bg-white border border-stone-200 hover:border-ecohubs-primary/50 text-stone-700 hover:text-ecohubs-dark transition-colors"
					>
						{s.tag.charAt(0)}{s.tag.slice(1).toLowerCase()}
					</a>
				{/each}
			</div>
		{/if}
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
							onclick={clearSearch}
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

		<!-- Sections / search results -->
		<div class="lg:col-span-9 space-y-20">
			{#if searching}
				<div>
					<p class="text-sm text-stone-500 mb-6">
						{results.length}
						{results.length === 1 ? 'result' : 'results'} for “{query.trim()}”.
						<button type="button" onclick={clearSearch} class="text-ecohubs-primary hover:underline"
							>Clear</button
						>
					</p>
					{#if results.length}
						<div class="divide-y divide-stone-200 border-t border-b border-stone-200">
							{#each results as item (item.id)}
								{@render qa(item, item.sectionTag)}
							{/each}
						</div>
					{:else}
						<p class="text-stone-700 leading-relaxed">
							No questions match that. Try different words, or
							<a href="/contact" class="text-ecohubs-primary hover:underline"
								>send us the question</a
							>.
						</p>
					{/if}
				</div>
			{:else}
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
							{#each section.items as item (item.id)}
								{@render qa(item, null)}
							{/each}
						</div>
					</section>
				{/each}
			{/if}
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

<style>
	/* WebKit renders its own clear affordance on type="search"; hide it so the
	   field shows only our own clear button. */
	.faq-search::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
