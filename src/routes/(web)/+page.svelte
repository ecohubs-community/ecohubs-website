<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import ConstellationMap from '$lib/components/ConstellationMap.svelte';
	import PersonaIcons from '$lib/components/PersonaIcons.svelte';
	// Hero mosaic images are processed by @sveltejs/enhanced-img — the
	// `?enhanced` query returns a `Picture` object with srcset for every
	// format/breakpoint, so mobile gets ~40 KB instead of the 229 KB original.
	import HeroImage from '$lib/assets/hero.webp?enhanced';
	import BlueprintImage from '$lib/assets/blueprint-community.webp?enhanced';
	import NetworkImage from '$lib/assets/network-regenerative-ecohubs.webp?enhanced';
	import jungleNature from '$lib/assets/jungle-nature.webp?enhanced';
	import CommunityFamily from '$lib/assets/community-family.avif?enhanced';
	import CommunityGroup from '$lib/assets/community-group.avif?enhanced';

	import SEO from '$lib/components/SEO.svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';

	import { stories, wounds, answers, techCards, personas, faqItems } from './data';

	let { data } = $props();

	// ─── REACTIVE STATE ─────────────────────────────────────────────────────────
	let activeStoryId = $state('stefan');
	const activeStory = $derived(stories.find((s) => s.id === activeStoryId) ?? stories[0]);

	let showAllAnswers = $state(false);
	const ANSWERS_PREVIEW_COUNT = 4;

	let showAllWounds = $state(false);
	const WOUNDS_PREVIEW_COUNT = 4;

	// ─── ANIMATIONS ─────────────────────────────────────────────────────────────
	// Hero cascades in on mount via Motion; everything below uses CSS
	// transitions toggled by a single IntersectionObserver in
	// scroll-animations.ts. When `prefers-reduced-motion: reduce` is set, the
	// CSS in layout.css reveals everything immediately — JS just bails.
	onMount(() => {
		if (prefersReducedMotion()) return;

		// Hero — initial-load cascade (not scroll-triggered: it's already in view).
		// Each step's delay is encoded in `data-hero-step` (in seconds, e.g. "0.30").
		// The keyframes object is widened to match `motion`'s loose internal type;
		// the runtime accepts `opacity` + `transform` keyframes verbatim.
		const heroKeyframes: Record<string, unknown> = {
			opacity: [0, 1],
			transform: ['translateY(16px)', 'translateY(0px)']
		};
		document.querySelectorAll<HTMLElement>('[data-hero-step]').forEach((el) => {
			const delay = parseFloat(el.dataset.heroStep ?? '0') || 0;
			animate(el, heroKeyframes as never, {
				duration: 0.7,
				delay,
				ease: [0.22, 1, 0.36, 1]
			});
		});

		// Everything else — scroll-triggered.
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="EcoHubs — A Regenerative Future Designed Together"
	description="A growing network of people building a different way to live together — rooted in nature, honest about conflict, and designed so belonging is built in."
	ogImage="/og-home.jpg"
	breadcrumbs={[{ name: 'Home', url: 'https://ecohubs.community/' }]}
/>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -z-10 bottom-0 -right-20 w-[420px] h-[420px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
			<!-- Left: copy -->
			<div class="lg:col-span-7">
				<div data-hero-step="0.05" class="kicker text-emerald-700 mb-6 flex items-center gap-3">
					<span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 pulse-dot"></span>
					A living project · Pilot hub active in Ecuador
				</div>

				<h1
					data-hero-step="0.15"
					class="font-serif text-5xl md:text-6xl lg:text-[76px] leading-[1.02] tracking-tight text-ecohubs-deep"
				>
					Maybe it isn't <br class="hidden md:block" />
					<em class="font-story italic font-normal text-ecohubs-primary">you</em><span
						class="text-stone-400 font-story italic font-light"
					>
						—</span
					><br class="hidden md:block" />
					maybe it is the <br class="hidden md:block" />way we live.
				</h1>

				<p
					data-hero-step="0.30"
					class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light"
				>
					EcoHubs is a growing network of people building a different way to live together — rooted
					in nature, honest about conflict, and designed so that belonging is built in, not left to
					chance.
				</p>

				<div data-hero-step="0.42" class="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
					<a
						href="#story"
						class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full
                   hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
					>
						Read the story behind this
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					<a
						href="#join"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium
                   rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all
                   inline-flex items-center justify-center gap-2"
					>
						Join the community
					</a>
					<a
						href="https://ecohubs.community/EcoHubs_Manifesto.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration px-7 py-3.5 bg-transparent text-ecohubs-dark font-medium
                   rounded-full hover:bg-emerald-50/70 transition-all
                   inline-flex items-center justify-center gap-2 group"
					>
						<span class="text-base">↓</span>
						Download manifesto
					</a>
				</div>

				<div data-hero-step="0.52" class="mt-14 max-w-md">
					<PersonaIcons>
						{#snippet caption()}
							Permaculturists, community builders, systems thinkers and
							<em class="font-story italic">seekers of a different kind of life</em> — co-creating this,
							one pilot at a time.
						{/snippet}
					</PersonaIcons>
				</div>
			</div>

			<!-- Right: image mosaic -->
			<div class="lg:col-span-5 relative">
				<div data-hero-step="0.20" class="grid grid-cols-5 grid-rows-6 gap-3 h-[520px]">
					<div class="col-span-3 row-span-4 rounded-[28px] overflow-hidden soft-shadow">
						<enhanced:img
							src={HeroImage}
							alt="Community working together"
							sizes="(max-width: 768px) 60vw, 360px"
							loading="eager"
							fetchpriority="high"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="col-span-2 row-span-3 rounded-[24px] overflow-hidden soft-shadow mt-8">
						<enhanced:img
							src={CommunityFamily}
							alt="Quiet moment in nature"
							sizes="(max-width: 768px) 40vw, 240px"
							loading="lazy"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="col-span-2 row-span-3 rounded-[24px] overflow-hidden soft-shadow">
						<enhanced:img
							src={CommunityGroup}
							alt="Community group"
							sizes="(max-width: 768px) 40vw, 240px"
							loading="lazy"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="col-span-3 row-span-2 rounded-[24px] overflow-hidden soft-shadow">
						<enhanced:img
							src={BlueprintImage}
							alt="Community blueprint"
							sizes="(max-width: 768px) 60vw, 360px"
							loading="lazy"
							class="w-full h-full object-cover"
						/>
					</div>
				</div>
				<!-- Floating quote chip — pulled down/out so only its top-right corner overlaps -->
				<div
					data-hero-step="0.65"
					class="absolute -left-8 lg:-left-12 -bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 soft-shadow
                    max-w-[260px] border border-stone-100 hidden md:block"
				>
					<p class="font-story italic text-[15px] leading-snug text-stone-800">
						"For the first time in my life, I didn't feel lonely."
					</p>
					<p class="mt-2 text-[11px] text-stone-500 tracking-wider uppercase">
						One of many voices · read the stories below
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto px-6"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. STORIES (tabbed: Stefan + placeholders for future voices)
═══════════════════════════════════════════════════════════════════ -->
<section id="story" class="relative py-24 md:py-36 bg-ecohubs-ivory">
	<div class="absolute inset-0 grain pointer-events-none"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<!-- Section header -->
		<div data-scroll-animate="fade-up" class="max-w-2xl mb-14" id="voices">
			<div class="kicker text-emerald-800 mb-4">Stories behind this project</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Every project begins with a feeling.<br />
				<em class="font-story italic font-normal text-stone-500">This one is carried by many.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				EcoHubs didn't come from a single person with a plan — it came from many people, in
				different corners of the world, who quietly felt the similar things. Read their stories.
			</p>
		</div>

		<!-- Tab navigation -->
		<div class="flex flex-col sm:flex-row gap-3 mb-16">
			{#each stories as story}
				<button
					class="flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all text-left
                 {activeStoryId === story.id
						? story.cta
							? 'border-emerald-600 bg-emerald-50 shadow-sm'
							: 'border-ecohubs-primary bg-white shadow-sm'
						: story.placeholder
							? 'border-stone-200/50 bg-white/30 opacity-50 cursor-not-allowed'
							: story.cta
								? 'border-dashed border-stone-300 bg-white/60 hover:border-emerald-400 hover:bg-emerald-50/40'
								: 'border-stone-200 bg-white/60 hover:border-stone-300 hover:bg-white'}"
					onclick={() => {
						if (!story.placeholder) activeStoryId = story.id;
					}}
				>
					<div
						class="w-12 h-12 rounded-full overflow-hidden shrink-0 border
                      {story.cta
							? 'border-dashed border-emerald-400 bg-emerald-50 flex items-center justify-center'
							: 'bg-stone-200 border-stone-200'}"
					>
						{#if story.img}
							<img src={story.img} alt={story.name} class="w-full h-full object-cover" />
						{:else if story.cta}
							<span class="text-emerald-600 text-2xl leading-none select-none">+</span>
						{:else}
							<div
								class="w-full h-full flex items-center justify-center text-stone-400 font-serif text-lg select-none"
							>
								?
							</div>
						{/if}
					</div>
					<div>
						<div
							class="font-story italic text-xl leading-tight
                        {story.cta ? 'text-emerald-700' : 'text-ecohubs-deep'}"
						>
							{story.keyword}
						</div>
						<div class="text-xs mt-0.5 {story.cta ? 'text-emerald-600/70' : 'text-stone-500'}">
							{story.name} · {story.location}
						</div>
						{#if story.placeholder}
							<div class="text-xs text-stone-400 mt-0.5 font-story italic">story coming soon</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Story content -->
		{#if activeStory.cta}
			<!-- Share your story CTA panel -->
			<div class="max-w-2xl mx-auto py-10">
				<div
					class="rounded-[28px] border border-dashed border-emerald-400/60 bg-white/60 p-10 md:p-14 text-center"
				>
					<div
						class="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-50
                      flex items-center justify-center mx-auto mb-6 text-3xl text-emerald-600 select-none"
					>
						+
					</div>
					<h3 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight mb-4">
						Your story belongs here.
					</h3>
					<p class="text-lg text-stone-600 leading-relaxed mb-3">
						If something in what you read felt familiar — the loneliness, the search, the quiet
						sense that something is missing — we want to hear it.
					</p>
					<p class="text-stone-500 leading-relaxed mb-10">
						Stories like Stefan's don't start as stories. They start as feelings most people never
						say out loud. Sharing yours helps others realise they're not alone — and helps us build
						something that fits the people who need it.
					</p>
					<a
						href="/contact"
						class="inline-flex items-center gap-2 px-8 py-4 bg-ecohubs-deep text-white font-medium
                   rounded-full hover:bg-emerald-900 transition-colors"
					>
						Write to us
						<span aria-hidden="true">→</span>
					</a>
					<p class="mt-6 text-xs text-stone-400 font-story italic">
						No commitment, no pressure. Just a conversation.
					</p>
				</div>
			</div>
		{:else if activeStory.beats}
			<!-- Full story (Stefan + future complete stories) -->
			<div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
				<!-- Left: sticky portrait + chapter list -->
				<aside class="lg:col-span-4 lg:sticky lg:top-28 self-start">
					<div class="relative">
						<div class="rounded-[32px] overflow-hidden soft-shadow aspect-[4/5]">
							<img
								src={activeStory.img}
								alt={activeStory.name}
								class="w-full h-full object-cover"
							/>
						</div>
						<div
							class="absolute -bottom-5 left-6 right-6 bg-ecohubs-base rounded-2xl p-5 border border-stone-200 shadow-sm"
						>
							<div class="text-[11px] tracking-widest uppercase text-stone-500 mb-1">
								{activeStory.id === 'stefan' ? 'Founder' : 'Member'}
							</div>
							<div class="font-serif text-xl text-ecohubs-deep">{activeStory.name}</div>
							<div class="text-sm text-stone-600 mt-0.5">{activeStory.location}</div>
						</div>
					</div>

					<div class="mt-14 pl-1">
						<div class="kicker text-stone-500 mb-3">Chapters</div>
						<ol class="space-y-2 text-sm text-stone-600">
							{#each activeStory.beats as beat}
								<li class="flex gap-3">
									<span class="font-story italic text-ecohubs-primary shrink-0">{beat.number}</span>
									{beat.title}
								</li>
							{/each}
						</ol>
					</div>
				</aside>

				<!-- Right: story beats -->
				<div class="lg:col-span-8 space-y-16">
					{#each activeStory.beats as beat}
						{#if beat.pullQuote}
							<article class="relative">
								<div class="kicker text-stone-500 mb-4">{beat.number} · {beat.title}</div>
								<blockquote
									class="relative bg-white rounded-[28px] p-8 md:p-12 border border-stone-200/80"
								>
									<span
										class="quote-mark absolute -top-4 left-8 text-7xl leading-none text-ecohubs-primary/30"
										>"</span
									>
									<p class="font-story text-2xl md:text-[26px] leading-[1.4] text-ecohubs-deep">
										{@html beat.pullQuote}
									</p>
								</blockquote>
								{#each beat.content ?? [] as para}
									<p class="mt-5 text-stone-700 leading-relaxed max-w-xl">
										{@html para}
									</p>
								{/each}
							</article>
						{:else if beat.image}
							<article class="grid md:grid-cols-5 gap-6 items-start">
								<div class="md:col-span-2 md:order-2">
									<div class="rounded-2xl overflow-hidden soft-shadow aspect-[4/5]">
										<img src={beat.image} alt="" class="w-full h-full object-cover" />
									</div>
								</div>
								<div class="md:col-span-3 md:order-1 relative pl-6 border-l border-emerald-900/15">
									<div
										class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-ecohubs-primary"
									></div>
									<div class="kicker text-stone-500 mb-3">{beat.number} · {beat.title}</div>
									{#each beat.content ?? [] as para, pi}
										<p
											class={pi === 0
												? 'font-story text-xl leading-[1.55] text-stone-800'
												: 'mt-4 text-stone-700 leading-relaxed'}
										>
											{@html para}
										</p>
									{/each}
								</div>
							</article>
						{:else}
							<article class="relative pl-6 border-l border-emerald-900/15">
								<div
									class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full
                           {beat.color === 'amber' ? 'bg-amber-600' : 'bg-ecohubs-primary'}"
								></div>
								<div class="kicker text-stone-500 mb-3">{beat.number} · {beat.title}</div>
								{#each beat.content ?? [] as para, pi}
									<p
										class={pi === 0
											? 'font-story text-2xl md:text-[28px] leading-[1.35] text-ecohubs-deep drop-cap'
											: 'mt-5 text-stone-700 leading-relaxed text-lg max-w-xl'}
									>
										{@html para}
									</p>
								{/each}
								{#if beat.number === '05'}
									<p class="mt-6 text-sm text-stone-500">— {activeStory.name}</p>
								{/if}
							</article>
						{/if}
					{/each}
				</div>
			</div>
		{:else}
			<!-- Placeholder story: show testimonial centred -->
			<div class="max-w-2xl mx-auto text-center py-10">
				<blockquote class="font-story italic text-2xl md:text-3xl leading-[1.45] text-ecohubs-deep">
					"{activeStory.testimonial}"
				</blockquote>
				<div class="mt-8 flex items-center justify-center gap-3">
					<div class="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border border-stone-200">
						<div
							class="w-full h-full flex items-center justify-center text-stone-400 font-serif text-lg select-none"
						>
							{activeStory.name.charAt(0)}
						</div>
					</div>
					<div class="text-left">
						<div class="font-serif text-base text-ecohubs-deep">{activeStory.name}</div>
						<div class="text-xs text-stone-500">{activeStory.location}</div>
					</div>
				</div>
				<p class="mt-8 text-stone-400 font-story italic text-sm">Full story coming soon.</p>
			</div>
		{/if}
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3a. THE WOUNDS
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-36 bg-ecohubs-deep text-ecohubs-ivory overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.15), transparent 55%);"
	></div>
	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
			<div class="kicker text-emerald-300/80 mb-5">If Stefan's story sounded familiar</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-ecohubs-ivory">
				It's <em class="font-story italic font-normal text-emerald-300">not just you.</em><br />
				It's the system we all grew up inside.
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/80 leading-relaxed max-w-2xl">
				What most of us live with wasn't designed for humans. It was designed for output, for
				growth, for scale. These are some of the wounds it leaves.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each wounds.slice(0, WOUNDS_PREVIEW_COUNT) as w}
				<div
					class="p-6 rounded-2xl border border-emerald-900/40"
					style="background: rgba(10,61,46,0.5);"
				>
					<div class="text-xs tracking-widest uppercase text-amber-300/80 mb-3">{w.cat}</div>
					<h3 class="font-serif text-xl text-white mb-2">{w.title}</h3>
					<p class="text-stone-200/80 text-sm leading-relaxed">{w.body}</p>
				</div>
			{/each}

			{#if showAllWounds}
				{#each wounds.slice(WOUNDS_PREVIEW_COUNT) as w}
					<div
						class="reveal-fade-in p-6 rounded-2xl border border-emerald-900/40"
						style="background: rgba(10,61,46,0.5);"
					>
						<div class="text-xs tracking-widest uppercase text-amber-300/80 mb-3">{w.cat}</div>
						<h3 class="font-serif text-xl text-white mb-2">{w.title}</h3>
						<p class="text-stone-200/80 text-sm leading-relaxed">{w.body}</p>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Poetic reveal — same pattern as the answers section, recoloured for the dark bg -->
		<div class="mt-10 max-w-2xl mx-auto text-center">
			{#if !showAllWounds}
				<p class="font-story italic text-stone-300/70 text-base md:text-lg leading-relaxed">
					There are {wounds.length - WOUNDS_PREVIEW_COUNT} more wounds — we didn't list every one. The
					pattern is what matters.
				</p>
				<button
					type="button"
					onclick={() => (showAllWounds = true)}
					class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 border border-emerald-400/30 text-emerald-200/90 text-sm
                 hover:border-emerald-300/60 hover:text-ecohubs-ivory transition-colors"
				>
					See the rest
					<span aria-hidden="true">↓</span>
				</button>
			{:else}
				<button
					type="button"
					onclick={() => (showAllWounds = false)}
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 border border-emerald-900/40 text-stone-300/70 text-sm
                 hover:border-emerald-400/40 hover:text-stone-200 transition-colors"
				>
					<span aria-hidden="true">↑</span>
					Show fewer
				</button>
			{/if}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3b. MANIFESTO MOMENT
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-28 md:py-36 overflow-hidden text-ecohubs-ivory bg-ecohubs-deep">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 50% 40%, rgba(16,185,129,0.25), transparent 55%);"
	></div>
	<div data-scroll-animate="fade-up" class="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
		<div class="kicker text-emerald-300/80 mb-6">Our stance</div>
		<p class="font-serif text-3xl md:text-[44px] leading-[1.2] text-ecohubs-ivory">
			<span class="font-story italic text-stone-400/80 font-light"
				>The system does not provide —</span
			><br />
			<span class="text-emerald-300 font-story italic font-normal">nature does.</span>
		</p>
		<p
			class="mt-10 font-serif text-2xl md:text-3xl leading-[1.35] text-stone-200/90 max-w-3xl mx-auto"
		>
			Power is a human construct.<br />
			<em class="font-story italic text-stone-400/80 font-light"
				>It only works as long as we consent to it.</em
			>
		</p>
		<div class="mt-14 mx-auto w-16 h-px bg-emerald-500/40"></div>
		<p class="mt-10 text-lg text-stone-200/80 max-w-2xl mx-auto leading-relaxed">
			We are not waiting for permission from a system that cannot heal itself. We are quietly
			building a different way of life <em class="font-story italic">inside</em> it — one that needs
			it less, and less, and less.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3c. COMMUNITY ANSWERS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">What changes in a regenerative community</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Most of these wounds <em class="font-story italic font-normal text-stone-500">dissolve</em
				><br />
				when the scale gets small again.
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Not because community is a cure, but because most of our pain comes from living at a scale
				humans were never built for. Bring the scale back down — to a place, to people you know by
				name — and the knots start to loosen on their own.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 gap-4">
			{#each answers.slice(0, ANSWERS_PREVIEW_COUNT) as a}
				<div
					class="grid grid-cols-[auto_1fr] gap-5 p-6 rounded-2xl bg-ecohubs-ivory border border-stone-200/70"
				>
					<div
						class="w-10 h-10 rounded-full bg-ecohubs-deep text-emerald-200 flex items-center justify-center font-serif shrink-0"
					>
						→
					</div>
					<div>
						<div class="text-xs tracking-widest uppercase text-stone-500 mb-1">{a.cat}</div>
						<h3 class="font-serif text-xl text-ecohubs-deep mb-1.5">{a.title}</h3>
						<p class="text-stone-700 text-sm leading-relaxed">{a.body}</p>
					</div>
				</div>
			{/each}

			{#if showAllAnswers}
				{#each answers.slice(ANSWERS_PREVIEW_COUNT) as a}
					<div
						class="reveal-fade-in grid grid-cols-[auto_1fr] gap-5 p-6 rounded-2xl bg-ecohubs-ivory border border-stone-200/70"
					>
						<div
							class="w-10 h-10 rounded-full bg-ecohubs-deep text-emerald-200 flex items-center justify-center font-serif shrink-0"
						>
							→
						</div>
						<div>
							<div class="text-xs tracking-widest uppercase text-stone-500 mb-1">{a.cat}</div>
							<h3 class="font-serif text-xl text-ecohubs-deep mb-1.5">{a.title}</h3>
							<p class="text-stone-700 text-sm leading-relaxed">{a.body}</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Poetic reveal — framed as care, not as a "Show more" button -->
		<div class="mt-10 max-w-2xl mx-auto text-center">
			{#if !showAllAnswers}
				<p class="font-story italic text-stone-500 text-base md:text-lg leading-relaxed">
					There are {answers.length - ANSWERS_PREVIEW_COUNT} more shifts — we didn't list every one.
					The pattern is what matters.
				</p>
				<button
					type="button"
					onclick={() => (showAllAnswers = true)}
					class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 border border-stone-300 text-stone-700 text-sm
                 hover:border-ecohubs-deep hover:text-ecohubs-deep transition-colors"
				>
					See the rest
					<span aria-hidden="true">↓</span>
				</button>
			{:else}
				<button
					type="button"
					onclick={() => (showAllAnswers = false)}
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 border border-stone-200 text-stone-500 text-sm
                 hover:border-stone-400 hover:text-stone-700 transition-colors"
				>
					<span aria-hidden="true">↑</span>
					Show fewer
				</button>
			{/if}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3d. NETWORK
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-ivory relative overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
		<!-- SVG network diagram -->
		<div data-scroll-animate="fade-up" class="lg:col-span-5 relative">
			<svg viewBox="0 0 400 400" class="w-full max-w-md mx-auto" aria-hidden="true">
				<defs>
					<radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stop-color="#059669" stop-opacity="1" />
						<stop offset="100%" stop-color="#064e3b" stop-opacity="1" />
					</radialGradient>
				</defs>
				<g stroke="#064e3b" stroke-opacity="0.25" stroke-width="1">
					<line x1="200" y1="200" x2="80" y2="100" />
					<line x1="200" y1="200" x2="320" y2="80" />
					<line x1="200" y1="200" x2="340" y2="240" />
					<line x1="200" y1="200" x2="260" y2="340" />
					<line x1="200" y1="200" x2="90" y2="310" />
					<line x1="200" y1="200" x2="60" y2="220" />
					<line x1="80" y1="100" x2="320" y2="80" />
					<line x1="320" y1="80" x2="340" y2="240" />
					<line x1="340" y1="240" x2="260" y2="340" />
					<line x1="260" y1="340" x2="90" y2="310" />
					<line x1="90" y1="310" x2="60" y2="220" />
					<line x1="60" y1="220" x2="80" y2="100" />
				</g>
				<circle cx="200" cy="200" r="18" fill="url(#hubGrad)" />
				<circle cx="80" cy="100" r="10" fill="#059669" />
				<circle cx="320" cy="80" r="10" fill="#059669" />
				<circle cx="340" cy="240" r="10" fill="#059669" />
				<circle cx="260" cy="340" r="10" fill="#059669" />
				<circle cx="90" cy="310" r="10" fill="#059669" />
				<circle cx="60" cy="220" r="10" fill="#059669" />
				<circle cx="200" cy="200" r="28" fill="none" stroke="#059669" stroke-opacity="0.35" />
				<circle cx="200" cy="200" r="40" fill="none" stroke="#059669" stroke-opacity="0.18" />
			</svg>
		</div>

		<div data-scroll-animate="fade-up" class="lg:col-span-7">
			<div class="kicker text-emerald-700 mb-4">A network, not an escape</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				One community is a refuge.<br />
				<em class="font-story italic font-normal">A network of them</em> is an answer.
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				An EcoHub on its own is a beautiful project. But the vision is bigger: an <strong
					>interconnected network</strong
				> of small, locally rooted communities that share what they learn and strengthen each other.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed mb-8">
				We are not trying to replace the system with a revolution. We are quietly reducing our
				dependency on it — community by community — until a different way of life becomes normal,
				accessible, and replicable.
			</p>
			<div data-scroll-stagger class="grid sm:grid-cols-3 gap-4">
				{#each [{ label: 'Local', desc: 'Rooted in a place, adapted to its culture and climate.' }, { label: 'Connected', desc: 'Sharing patterns, failures, and tools through the Blueprint.' }, { label: 'Replicable', desc: 'Forkable. Not franchised. Every hub stays its own place.' }] as item}
					<div class="p-4 rounded-xl bg-white border border-stone-200/70">
						<div class="font-story italic text-2xl text-ecohubs-primary">{item.label}</div>
						<p class="text-sm text-stone-600 mt-1">{item.desc}</p>
					</div>
				{/each}
			</div>

			<div class="mt-8 flex flex-col sm:flex-row gap-3">
				<a
					href="/vision"
					class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                  hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
				>
					Read the full vision
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="#already-doing"
					class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                  hover:border-ecohubs-dark pb-1"
				>
					What we're already doing →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3e. WHAT WE ARE ALREADY DOING
═══════════════════════════════════════════════════════════════════ -->
<section id="already-doing" class="relative py-24 md:py-36 bg-ecohubs-base overflow-hidden">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4 flex items-center gap-3">
				<span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 pulse-dot"></span>
				Not waiting · already underway
			</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				What we are <em class="font-story italic font-normal text-stone-500">already doing</em><br
				/>
				— quietly, in the open.
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				EcoHubs is not a future plan waiting for funding. Five strands of work are underway right
				now. Each one feeds the others, and each one is documented as we go.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each [{ num: '01', tag: 'Practice', title: 'Applying the RCOS Blueprint to our own community.', body: 'We are the first test of the Blueprint. Membership, governance, conflict, and decision pathways are written down and used by us, on us — refined as the community grows.', cta: 'Read our RCOS specs ↗', href: 'https://specs.ecohubs.community', external: true, accent: 'emerald' }, { num: '02', tag: 'Pilot', title: 'FruitHaven Community RCOS pilot.', body: 'In Ecuador, an existing community has been applying the Blueprint since March 2026 — under real ecological, social and economic constraints. Lessons feed straight back into the standard.', cta: 'See the pilot →', href: '/blueprint#pilot', accent: 'amber' }, { num: '03', tag: 'Research', title: 'Studying what works (and what breaks) in intentional communities.', body: 'We read the literature, talk to elders of past projects, and document the failure patterns that keep coming back. The Blueprint earns its place by surviving those patterns — not by ignoring them.', cta: 'Open the research →', href: '/blueprint', accent: 'emerald' }, { num: '04', tag: 'Design', title: 'New ways to make community more accessible & replicable.', body: 'Lower the bar to entry. Make adoption modular. Make resilience the default. We are designing the patterns, tools, and onboarding paths that turn intentional community from rare into normal.', cta: 'See where we need help →', href: '/membership', accent: 'emerald' }, { num: '05', tag: 'Community', title: 'Growing the online community — members, events, partnerships.', body: 'Weekly calls, member onboarding, partner conversations, public events. The network gets stronger every time someone shows up — and every relationship made here is a thread that holds.', cta: 'Become a member →', href: '/membership', accent: 'amber' }] as item}
				<article
					class="group bg-white rounded-3xl p-7 border border-stone-200/80 hover:border-ecohubs-primary/50 transition-colors flex flex-col"
				>
					<div class="flex items-baseline justify-between mb-4">
						<span
							class="font-story italic text-3xl {item.accent === 'amber'
								? 'text-amber-700'
								: 'text-ecohubs-primary'}">{item.num}</span
						>
						<span class="kicker text-stone-500">{item.tag}</span>
					</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-3 leading-snug">{item.title}</h3>
					<p class="text-sm text-stone-700 leading-relaxed mb-6 flex-1">{item.body}</p>
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						class="no-external-decoration text-sm text-ecohubs-dark font-medium inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
					>
						{item.cta}
					</a>
				</article>
			{/each}

			<!-- 6th tile: invitation to join the work -->
			<a
				href="/membership"
				class="group bg-ecohubs-deep text-ecohubs-ivory rounded-3xl p-7 border border-emerald-900/40 flex flex-col justify-between"
			>
				<div>
					<div class="flex items-baseline justify-between mb-4">
						<span class="font-story italic text-3xl text-emerald-300">+</span>
						<span class="kicker text-emerald-300/80">Open work</span>
					</div>
					<h3 class="font-serif text-xl mb-3 leading-snug">Pick a strand. Bring a hand.</h3>
					<p class="text-sm text-stone-200/85 leading-relaxed mb-6">
						All five strands are open. Pick the one that matches your craft — the work moves faster
						when more people show up.
					</p>
				</div>
				<span
					class="text-sm text-emerald-300 font-medium inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
				>
					Join the work →
				</span>
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     4. VISION
═══════════════════════════════════════════════════════════════════ -->
<section id="vision" class="py-24 md:py-32 relative">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
		<div data-scroll-animate="fade-up" class="relative">
			<div class="grid grid-cols-2 gap-4">
				<div class="rounded-2xl overflow-hidden aspect-[3/4] mt-10 soft-shadow">
					<enhanced:img
						src={NetworkImage}
						alt="Regenerative community network"
						sizes="(max-width: 768px) 45vw, 280px"
						loading="lazy"
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="rounded-2xl overflow-hidden aspect-[3/4] soft-shadow">
					<enhanced:img
						src={jungleNature}
						alt="Shared meal"
						sizes="(max-width: 768px) 45vw, 280px"
						loading="lazy"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>

		<div data-scroll-animate="fade-up">
			<div class="kicker text-emerald-700 mb-4">The Vision</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				Small places<br />
				<em class="font-story italic font-normal"
					>where your work, your home,<br />and the people you love</em
				><br />
				are in the same story.
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				An EcoHub is a small, place-based community where people live, work, and learn together
				while regenerating the land they depend on. Human-scale. Locally rooted. Connected to a
				wider network of others doing the same.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed mb-8">
				Not a utopia. Not an escape. A working model for belonging, tested in real conditions and
				shared openly so others don't have to start from zero.
			</p>
			<ul class="space-y-3 mb-10">
				{#each ["Work that means something because it shows up in your neighbors' lives", 'Decisions made in the open, by the people they affect', 'Land and resources held in care, not in competition', 'Conflict treated as information, not as failure'] as item}
					<li class="flex items-start gap-3 text-stone-800">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						{item}
					</li>
				{/each}
			</ul>
			<div class="flex flex-col sm:flex-row gap-4 sm:items-center">
				<a
					href="/vision"
					class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                  hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
				>
					Read the full vision
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="#blueprint"
					class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                  hover:border-ecohubs-dark pb-1"
				>
					See how we're making it practical →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. BLUEPRINT — teaser
═══════════════════════════════════════════════════════════════════ -->
<section id="blueprint" class="relative py-24 md:py-36 bg-ecohubs-ivory overflow-hidden">
	<div
		class="absolute -z-0 -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
	></div>
	<div
		class="absolute -z-0 -bottom-32 -left-32 w-[440px] h-[440px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none"
	></div>

	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
		<div data-scroll-animate="fade-up" class="lg:col-span-7">
			<div class="kicker text-emerald-800 mb-4 flex items-center gap-3">
				<span
					class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 text-emerald-600 pulse-dot"
				></span>
				The Blueprint · RCOS
			</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				<em class="font-story italic font-normal">The guidebook</em> we wished<br />
				had existed.
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				The Blueprint — formally <strong class="text-ecohubs-deep">RCOS</strong> (Regenerative
				Community Operating System) — is an open standard for designing and operating regenerative
				communities. Not software. Not an ideology. A shared way to make community structure
				<em class="font-story italic">explicit, testable, and improvable.</em>
			</p>
			<p class="text-lg text-stone-700 leading-relaxed mb-8">
				It's the first tangible outcome of EcoHubs — and the bridge between the vision and the
				ground. Anyone can pick it up, read it, fork it, and put it to work today.
			</p>

			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="/blueprint"
					class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
				>
					Explore the Blueprint
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="https://blueprint.ecohubs.community"
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-colors inline-flex items-center justify-center gap-2"
				>
					Read it live
					<span class="text-xs opacity-70">↗</span>
				</a>
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600">
				<span class="flex items-center gap-2"
					><span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Open standard</span
				>
				<span class="flex items-center gap-2"
					><span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Modular &amp; forkable</span
				>
				<span class="flex items-center gap-2"
					><span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Tested in a live pilot</span
				>
			</div>
		</div>

		<!-- Right: stylized "spec" card -->
		<div data-scroll-animate="fade-up" class="lg:col-span-5 relative">
			<div
				class="relative bg-white rounded-[28px] border border-stone-200/80 soft-shadow p-7 overflow-hidden"
			>
				<div
					class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-200/40 blur-2xl pointer-events-none"
				></div>
				<div class="flex items-center justify-between mb-5">
					<div class="flex items-center gap-2 text-stone-400">
						<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
						<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
						<span class="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
					</div>
					<span class="font-mono text-[10px] tracking-widest text-stone-400 uppercase"
						>RCOS · v0.1 · public draft</span
					>
				</div>

				<div class="font-mono text-[12px] leading-[1.9] text-stone-600 space-y-1">
					<div>
						<span class="text-emerald-700">layer 0</span> ·
						<span class="text-stone-800">purpose &amp; scope</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 1</span> ·
						<span class="text-stone-800">membership</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 2</span> ·
						<span class="text-stone-800">governance</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 3</span> ·
						<span class="text-stone-800">economy &amp; resources</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 4</span> ·
						<span class="text-stone-800">conflict &amp; repair</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 5</span> ·
						<span class="text-stone-800">operations</span>
					</div>
					<div>
						<span class="text-emerald-700">layer 6</span> ·
						<span class="text-stone-800">evolution</span>
					</div>
					<div class="pt-2 text-stone-400">— optional —</div>
					<div>
						<span class="text-amber-700">module</span> ·
						<span class="text-stone-800">permaculture</span>
					</div>
					<div>
						<span class="text-amber-700">module</span> ·
						<span class="text-stone-800">education</span>
					</div>
					<div>
						<span class="text-amber-700">module</span> · <span class="text-stone-800">housing</span>
					</div>
				</div>

				<div
					class="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500"
				>
					<span>Open · Forkable · Adaptable</span>
					<a href="/blueprint" class="text-ecohubs-primary hover:underline font-medium"
						>See all seven layers →</a
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Inline video teaser — a softer second invitation for visitors who want
	     the explainer rather than the spec. Sits in its own full-width container
	     below the teaser grid so it isn't squeezed into the 12-col layout
	     above. The full-length version (with its own framing copy) lives on
	     the Blueprint page. -->
	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative mt-20">
		<div data-scroll-animate="fade-up" class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
			<div class="lg:col-span-7">
				<LiteYouTube videoId="JwTf6BFhdYY" title="Introduction to RCOS — EcoHubs" />
			</div>
			<div class="lg:col-span-5">
				<div class="kicker text-emerald-700 mb-3">A 19-min introduction</div>
				<h3 class="font-serif text-2xl md:text-3xl text-ecohubs-deep leading-snug">
					Prefer to <em class="font-story italic font-normal text-stone-500">watch</em> rather than
					read?
				</h3>
				<p class="mt-4 text-stone-700 leading-relaxed">
					A walk-through of what RCOS is, why it exists, and how the layers fit together. The whole
					picture in one sitting.
				</p>
				<a
					href="/blueprint#intro-video"
					class="mt-5 inline-flex items-center gap-2 text-ecohubs-primary hover:text-ecohubs-deep transition-colors font-medium group"
				>
					Open it on the Blueprint page
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6b. MEMBER CONSTELLATION
═══════════════════════════════════════════════════════════════════ -->
{#if data.members?.length}
	<section
		id="members"
		class="relative py-24 md:py-36 overflow-hidden text-ecohubs-ivory bg-ecohubs-deep"
	>
		<div
			class="absolute inset-0 -z-0 opacity-30"
			style="background-image: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25), transparent 55%);"
		></div>
		<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
			<div data-scroll-animate="fade-up" class="max-w-2xl mb-14">
				<div class="kicker text-emerald-300/80 mb-4">The people behind this</div>
				<h2 class="font-serif text-4xl md:text-5xl leading-tight text-ecohubs-ivory">
					EcoHubs is not a product.<br />
					<em class="font-story italic font-normal text-emerald-300">It's the people showing up.</em
					>
				</h2>
				<p class="mt-5 text-lg text-stone-200/75 leading-relaxed">
					Each circle is a real member — contributing their craft, their voice, their time. The
					larger ones carry the most weight right now.
					<em class="font-story italic">Click any one</em> to read their story.
				</p>
			</div>

			<ConstellationMap members={data.members} />
		</div>
	</section>
{/if}
<!-- ═══════════════════════════════════════════════════════════════════
     6c. TECH SERVES LIFE
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-32 bg-ecohubs-ivory overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div class="grid lg:grid-cols-12 gap-12 items-center">
			<div data-scroll-animate="fade-up" class="lg:col-span-5">
				<div class="kicker text-emerald-800 mb-4">On the technology behind this</div>
				<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
					Tech serves life.<br />
					<em class="font-story italic font-normal text-stone-500">Not the other way around.</em>
				</h2>
				<p class="mt-6 text-lg text-stone-700 leading-relaxed">
					People sometimes ask: <em class="font-story italic"
						>how can you use AI and digital platforms while building something regenerative?</em
					> It's a fair question. Our answer is honest — we use technology where it lets one person do
					the work of ten, where it bridges distance, where it lets a community remember what it said.
				</p>
				<p class="mt-5 text-lg text-stone-700 leading-relaxed">
					We don't use it to manufacture engagement, replace relationships, or grow at any cost.
				</p>
				<div class="mt-8 flex flex-col sm:flex-row gap-3">
					<a
						href="/blueprint"
						class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                    hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
					>
						How tech sits in the Blueprint
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					<a
						href="/contact"
						class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                    hover:border-ecohubs-dark pb-1"
					>
						Disagree with us →
					</a>
				</div>
			</div>
			<div class="lg:col-span-7">
				<div data-scroll-stagger class="grid sm:grid-cols-2 gap-4">
					{#each techCards as card}
						<div class="bg-white rounded-2xl p-6 border border-stone-200/80">
							<div
								class="w-10 h-10 rounded-full flex items-center justify-center mb-4
                          {card.accent === 'emerald' ? 'bg-emerald-100' : 'bg-amber-100'}"
							>
								<span
									class="text-lg {card.accent === 'emerald'
										? 'text-emerald-700'
										: 'text-amber-700'}">◈</span
								>
							</div>
							<h3 class="font-serif text-lg text-ecohubs-deep mb-1.5">{card.title}</h3>
							<p class="text-sm text-stone-700 leading-relaxed">{card.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. WHO THIS IS FOR
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-white">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Who this is for</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				If you've been quietly looking for <em class="font-story italic font-normal">this</em>,<br
				/>
				you're in the right place.
			</h2>
		</div>
		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each personas as p}
				<div class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/60">
					<div class="font-story italic text-xl text-ecohubs-deep mb-2">{p.quote}</div>
					<p class="text-sm text-stone-600 leading-relaxed">{p.body}</p>
				</div>
			{/each}
		</div>

		<!-- Inviting CTA — recognises that "this" might be something the visitor's been looking for -->
		<div class="mt-16 max-w-2xl mx-auto text-center">
			<p class="font-story italic text-lg md:text-xl text-stone-600 leading-relaxed mb-7">
				If even one of those felt like it could be your voice — we'd love to meet you.
			</p>
			<a
				href="/membership"
				class="inline-flex items-center gap-2 px-8 py-4 bg-ecohubs-deep text-white font-medium rounded-full
                hover:bg-emerald-900 transition-colors group"
			>
				Become a member
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<p class="mt-4 text-xs text-stone-500 tracking-wide">
				Application is free · we read every one
			</p>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7b. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section id="faq" class="py-24 md:py-32 bg-white">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate="fade-up" class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Questions we hear a lot</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Honest answers <em class="font-story italic font-normal text-stone-500"
					>to the honest questions.</em
				>
			</h2>
		</div>

		<div data-scroll-stagger class="divide-y divide-stone-200 border-t border-b border-stone-200">
			{#each faqItems.slice(0, 6) as item}
				<details class="group py-6">
					<summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
						<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
						<span
							class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none"
							>+</span
						>
					</summary>
					<div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">{item.a}</div>
				</details>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<a
				href="/faq"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				See all questions →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8. ROADMAP
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate="fade-up" class="max-w-2xl mb-16">
			<div class="kicker text-emerald-800 mb-4">Roadmap</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				One step at a time, in the open.
			</h2>
		</div>
		<div data-scroll-stagger class="space-y-6">
			{#each [{ n: '01', color: 'bg-ecohubs-deep', title: 'Gather the people', body: 'First 150 aligned members. Shared values. Foundation of the Blueprint co-created, not dictated.' }, { n: '02', color: 'bg-ecohubs-primary', title: 'Grow the Blueprint', body: 'Open-source, evolving — shaped by practice across ecology, governance, economy, culture, and care.' }, { n: '03', color: 'bg-amber-600', title: 'Pilot, learn, share', body: 'Apply the Blueprint in real communities. Ecuador is the first. Document every scar, every win, openly.' }] as step}
				<div class="grid md:grid-cols-[auto_1fr] gap-6 items-start">
					<div
						class="w-14 h-14 rounded-full {step.color} text-white font-serif text-xl flex items-center justify-center shrink-0"
					>
						{step.n}
					</div>
					<div class="pt-2">
						<h3 class="font-serif text-2xl text-ecohubs-deep mb-2">{step.title}</h3>
						<p class="text-stone-700 leading-relaxed">{step.body}</p>
					</div>
				</div>
			{/each}
		</div>

		<div data-scroll-animate="fade-up" class="mt-14 flex flex-col sm:flex-row gap-3">
			<a
				href="/vision"
				class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				See where this is going
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<a
				href="#already-doing"
				class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                hover:border-ecohubs-dark pb-1"
			>
				What we're doing today →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8b. CO-CREATE CTA
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>
	<div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate="fade-up" class="max-w-2xl mb-12">
			<div class="kicker text-emerald-800 mb-4">Before you join — a different invitation</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				We are not finished.<br />
				<em class="font-story italic font-normal text-stone-500">That is the point.</em>
			</h2>
			<p class="mt-5 text-lg text-stone-700 leading-relaxed">
				EcoHubs is not a product you sign up to. It's a Blueprint that gets better with every person
				who reads it carefully, disagrees with a chapter, runs an experiment, comes back with what
				they learned. There are many ways in.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each [{ tag: 'On the ground', title: 'Apply RCOS in your community.', body: 'Already part of (or starting) a local community? Try a Blueprint chapter on the ground. We help you adapt it, you bring back what you learn.', cta: 'Tell us about it →', href: '/contact' }, { tag: 'Bring a skill', title: 'Contribute what you already do well.', body: 'Permaculture, governance, facilitation, code, listening, storytelling. We need every one of these.', cta: 'See where we need help →', href: '/membership' }, { tag: 'Partner with us', title: 'Become an EcoHubs partner.', body: 'Organisations, foundations, communities and projects working in adjacent terrain — we co-design, fund pilots, and share what we learn.', cta: 'Start a conversation →', href: '/contact' }] as card}
				<a
					href={card.href}
					class="group bg-white rounded-3xl p-7 border border-stone-200/80
                  hover:border-ecohubs-primary/50 transition-colors block"
				>
					<div class="text-[11px] tracking-widest uppercase text-emerald-700 mb-3">{card.tag}</div>
					<h3 class="font-serif text-2xl text-ecohubs-deep leading-snug mb-3">{card.title}</h3>
					<p class="text-sm text-stone-700 leading-relaxed mb-6">{card.body}</p>
					<span
						class="text-sm text-ecohubs-dark font-medium group-hover:translate-x-0.5 inline-block transition-transform"
					>
						{card.cta}
					</span>
				</a>
			{/each}
		</div>

		<p class="mt-10 text-center text-sm text-stone-500 max-w-xl mx-auto font-story italic">
			None of these are tiers. None of these cost. They are the doorways we have noticed people walk
			through.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     9. FINAL CTA
═══════════════════════════════════════════════════════════════════ -->
<section
	id="join"
	class="relative py-28 md:py-40 overflow-hidden bg-ecohubs-deep text-ecohubs-ivory"
>
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.2), transparent 55%);"
	></div>
	<div data-scroll-animate="fade-up" class="max-w-3xl mx-auto px-6 lg:px-8 text-center relative">
		<div class="kicker text-emerald-300 mb-5">An invitation</div>
		<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
			If any part of this<br />
			<em class="font-story italic font-normal text-emerald-300">sounded like your life</em>
			<span class="font-story italic font-light"> —</span><br />
			come build it with us.
		</h2>
		<p class="text-lg text-stone-200/85 leading-relaxed mb-10 max-w-xl mx-auto">
			We're not looking for believers. We're looking for people who are ready to make the invisible
			things explicit — in their own lives, and with others.
		</p>
		<div class="flex flex-col sm:flex-row justify-center gap-3">
			<a
				href="/membership"
				class="px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors"
			>
				Become a founding member
			</a>
			<a
				href="https://ecohubs.community/EcoHubs_Manifesto.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full
                hover:bg-emerald-900/40 transition-colors"
			>
				Read the manifesto
			</a>
		</div>
		<p class="mt-10 text-xs text-emerald-200/60 tracking-widest uppercase">
			Non-speculative · Non-ideological · Built in the open
		</p>
	</div>
</section>

<style>
	/* Page-local: only the homepage uses the quote-mark utility. */
	.quote-mark {
		font-family: var(--font-story, 'Fraunces', serif);
		font-weight: 400;
		font-style: italic;
	}
</style>
