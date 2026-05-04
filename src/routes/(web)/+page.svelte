<script lang="ts">
  import { onMount } from 'svelte';
  import { animate } from 'motion';
  import { Sprout, Users, Compass, Telescope } from 'lucide-svelte';

  import ConstellationMap from '$lib/components/ConstellationMap.svelte';
  import HeroImage from '$lib/assets/hero.webp';
  import BlueprintImage from '$lib/assets/blueprint-community.webp';
  import NetworkImage from '$lib/assets/network-regenerative-ecohubs.webp';
  import jungleNature from '$lib/assets/jungle-nature.webp';
  import fruitHavenTeam from '$lib/assets/fruithaven-team.webp';

  import {
    initScrollAnimations,
    initStaggeredScrollAnimations,
  } from '$lib/utils/scroll-animations';
  import { prefersReducedMotion } from '$lib/utils/animations';

  import {
    stories,
    wounds,
    answers,
    blueprintLayers,
    comparisons,
    techCards,
    personas,
    faqItems,
    placeholderMembers,
  } from './data';

  let { data } = $props();

  // ─── REACTIVE STATE ─────────────────────────────────────────────────────────
  let activeStoryId = $state('stefan');
  const activeStory = $derived(stories.find((s) => s.id === activeStoryId) ?? stories[0]);

  let showAllAnswers = $state(false);
  const ANSWERS_PREVIEW_COUNT = 4;

  // ─── ANIMATIONS ─────────────────────────────────────────────────────────────
  // Hero cascades in on mount; everything below is scroll-triggered via the
  // `data-scroll-animate` / `data-scroll-stagger` attributes sprinkled through
  // the markup. Both paths short-circuit when `prefers-reduced-motion: reduce`.
  onMount(() => {
    if (prefersReducedMotion()) {
      // Show every initially-hidden element instantly so the page is usable.
      document
        .querySelectorAll<HTMLElement>(
          '[data-hero-step], [data-scroll-animate], [data-scroll-stagger] > *'
        )
        .forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      return;
    }

    // Hero — initial-load cascade (not scroll-triggered: it's already in view).
    // Each step's delay is encoded in `data-hero-step` (in seconds, e.g. "0.30").
    // The keyframes object is widened to match `motion`'s loose internal type;
    // the runtime accepts `opacity` + `transform` keyframes verbatim.
    const heroKeyframes: Record<string, unknown> = {
      opacity: [0, 1],
      transform: ['translateY(16px)', 'translateY(0px)'],
    };
    document
      .querySelectorAll<HTMLElement>('[data-hero-step]')
      .forEach((el) => {
        const delay = parseFloat(el.dataset.heroStep ?? '0') || 0;
        animate(el, heroKeyframes as never, {
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        });
      });

    // Everything else — scroll-triggered.
    initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
    initStaggeredScrollAnimations('[data-scroll-stagger]', {
      threshold: 0.15,
      staggerDelay: 0.08,
    });
  });
</script>

<svelte:head>
  <title>EcoHubs — A Regenerative Future Designed Together</title>
  <meta name="description" content="EcoHubs is a growing network of people building a different way to live together — rooted in nature, honest about conflict, and designed so that belonging is built in, not left to chance." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"></div>
  <div class="absolute -z-10 top-20 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-200/25 blur-3xl"></div>
  <div class="absolute -z-10 bottom-0 -right-20 w-[420px] h-[420px] rounded-full bg-amber-200/30 blur-3xl"></div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

      <!-- Left: copy -->
      <div class="lg:col-span-7">
        <div data-hero-step="0.05" class="kicker text-emerald-700 mb-6 flex items-center gap-3">
          <span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 pulse-dot"></span>
          A living project · Pilot hub active in Ecuador
        </div>

        <h1 data-hero-step="0.15" class="font-serif text-5xl md:text-6xl lg:text-[76px] leading-[1.02] tracking-tight text-ecohubs-deep">
          Maybe it isn't <br class="hidden md:block" />
          <em class="font-story italic font-normal text-ecohubs-primary">you</em><span
            class="text-stone-400 font-story italic font-light"> —</span><br class="hidden md:block" />
          maybe it is the <br class="hidden md:block" />way we live.
        </h1>

        <p data-hero-step="0.30" class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light">
          EcoHubs is a growing network of people building a different way to live
          together — rooted in nature, honest about conflict, and designed so that
          belonging is built in, not left to chance.
        </p>

        <div data-hero-step="0.42" class="mt-10 flex flex-col sm:flex-row gap-3">
          <a href="#story"
            class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full
                   hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group">
            Read the story behind this
            <span class="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#join"
            class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium
                   rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all
                   inline-flex items-center justify-center gap-2">
            Join the community
          </a>
        </div>

        <div data-hero-step="0.52" class="mt-14 flex items-start gap-4 max-w-md">
          <div class="flex -space-x-2 shrink-0">
            {#each [
              { Icon: Sprout,    label: 'Permaculturists' },
              { Icon: Users,     label: 'Community builders' },
              { Icon: Compass,   label: 'Systems thinkers' },
              { Icon: Telescope, label: 'Seekers' },
            ] as { Icon, label }}
              <div
                class="w-10 h-10 rounded-full border-2 border-ecohubs-base bg-white
                       shadow-[0_2px_6px_rgba(11,46,36,0.08)] flex items-center justify-center
                       text-emerald-700"
                title={label}
                aria-label={label}
              >
                <Icon class="w-[18px] h-[18px]" strokeWidth={1.6} aria-hidden="true" />
              </div>
            {/each}
          </div>
          <div class="text-sm text-stone-600 leading-snug pt-1">
            Permaculturists, community builders, systems thinkers and
            <em class="font-story italic">seekers of a different kind of life</em> —
            co-creating this, one pilot at a time.
          </div>
        </div>
      </div>

      <!-- Right: image mosaic -->
      <div class="lg:col-span-5 relative">
        <div data-hero-step="0.20" class="grid grid-cols-5 grid-rows-6 gap-3 h-[520px]">
          <div class="col-span-3 row-span-4 rounded-[28px] overflow-hidden soft-shadow">
            <img src={HeroImage} alt="Community working together" class="w-full h-full object-cover" />
          </div>
          <div class="col-span-2 row-span-3 rounded-[24px] overflow-hidden soft-shadow mt-8">
            <img src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=700&auto=format&fit=crop"
                 alt="Quiet moment in nature" class="w-full h-full object-cover" />
          </div>
          <div class="col-span-2 row-span-3 rounded-[24px] overflow-hidden soft-shadow">
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=700&auto=format&fit=crop"
                 alt="Community meal" class="w-full h-full object-cover" />
          </div>
          <div class="col-span-3 row-span-2 rounded-[24px] overflow-hidden soft-shadow">
            <img src={BlueprintImage} alt="Community blueprint" class="w-full h-full object-cover" />
          </div>
        </div>
        <!-- Floating quote chip — pulled down/out so only its top-right corner overlaps -->
        <div data-hero-step="0.65" class="absolute -left-8 lg:-left-12 -bottom-8 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 soft-shadow
                    max-w-[260px] border border-stone-100 hidden md:block">
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
        EcoHubs didn't come from a single person with a plan — it came from many people, in different corners
        of the world, who quietly felt the similar things. Read their stories.
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
          onclick={() => { if (!story.placeholder) activeStoryId = story.id; }}
        >
          <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border
                      {story.cta
                        ? 'border-dashed border-emerald-400 bg-emerald-50 flex items-center justify-center'
                        : 'bg-stone-200 border-stone-200'}">
            {#if story.img}
              <img src={story.img} alt={story.name} class="w-full h-full object-cover" />
            {:else if story.cta}
              <span class="text-emerald-600 text-2xl leading-none select-none">+</span>
            {:else}
              <div class="w-full h-full flex items-center justify-center text-stone-400 font-serif text-lg select-none">?</div>
            {/if}
          </div>
          <div>
            <div class="font-story italic text-xl leading-tight
                        {story.cta ? 'text-emerald-700' : 'text-ecohubs-deep'}">{story.keyword}</div>
            <div class="text-xs mt-0.5 {story.cta ? 'text-emerald-600/70' : 'text-stone-500'}">{story.name} · {story.location}</div>
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
        <div class="rounded-[28px] border border-dashed border-emerald-400/60 bg-white/60 p-10 md:p-14 text-center">
          <div class="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-50
                      flex items-center justify-center mx-auto mb-6 text-3xl text-emerald-600 select-none">+</div>
          <h3 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight mb-4">
            Your story belongs here.
          </h3>
          <p class="text-lg text-stone-600 leading-relaxed mb-3">
            If something in what you read felt familiar — the loneliness, the search, the quiet sense that
            something is missing — we want to hear it.
          </p>
          <p class="text-stone-500 leading-relaxed mb-10">
            Stories like Stefan's don't start as stories. They start as feelings most people never say out loud.
            Sharing yours helps others realise they're not alone — and helps us build something that fits the
            people who need it.
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
              <img src={activeStory.img} alt="{activeStory.name}" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -bottom-5 left-6 right-6 bg-ecohubs-base rounded-2xl p-5 border border-stone-200 shadow-sm">
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
                <blockquote class="relative bg-white rounded-[28px] p-8 md:p-12 border border-stone-200/80">
                  <span class="quote-mark absolute -top-4 left-8 text-7xl leading-none text-ecohubs-primary/30">"</span>
                  <p class="font-story text-2xl md:text-[26px] leading-[1.4] text-ecohubs-deep">
                    {@html beat.pullQuote}
                  </p>
                </blockquote>
              </article>
            {:else if beat.image}
              <article class="grid md:grid-cols-5 gap-6 items-start">
                <div class="md:col-span-2 md:order-2">
                  <div class="rounded-2xl overflow-hidden soft-shadow aspect-[4/5]">
                    <img src={beat.image} alt="" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="md:col-span-3 md:order-1 relative pl-6 border-l border-emerald-900/15">
                  <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-ecohubs-primary"></div>
                  <div class="kicker text-stone-500 mb-3">{beat.number} · {beat.title}</div>
                  {#each beat.content ?? [] as para, pi}
                    <p class="{pi === 0 ? 'font-story text-xl leading-[1.55] text-stone-800' : 'mt-4 text-stone-700 leading-relaxed'}">{@html para}</p>
                  {/each}
                </div>
              </article>
            {:else}
              <article class="relative pl-6 border-l border-emerald-900/15">
                <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full
                           {beat.color === 'amber' ? 'bg-amber-600' : 'bg-ecohubs-primary'}"></div>
                <div class="kicker text-stone-500 mb-3">{beat.number} · {beat.title}</div>
                {#each beat.content ?? [] as para, pi}
                  <p class="{pi === 0
                    ? 'font-story text-2xl md:text-[28px] leading-[1.35] text-ecohubs-deep drop-cap'
                    : 'mt-5 text-stone-700 leading-relaxed text-lg max-w-xl'}">{@html para}</p>
                {/each}
                {#if beat.number === '05'}
                  <p class="mt-6 text-sm text-stone-500">— Stefan</p>
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
            <div class="w-full h-full flex items-center justify-center text-stone-400 font-serif text-lg select-none">
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
<section class="relative py-24 md:py-36 bg-ecohubs-deep text-[#f5f2ea] overflow-hidden">
  <div class="absolute inset-0 -z-0 opacity-40"
       style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.15), transparent 55%);"></div>
  <div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
    <div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
      <div class="kicker text-emerald-300/80 mb-5">If Stefan's story sounded familiar</div>
      <h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-[#f5f2ea]">
        It's <em class="font-story italic font-normal text-emerald-300">not just you.</em><br />
        It's the system we all grew up inside.
      </h2>
      <p class="mt-6 text-lg md:text-xl text-stone-200/80 leading-relaxed max-w-2xl">
        What most of us live with wasn't designed for humans. It was designed for output, for growth, for scale.
        These are some of the wounds it leaves.
      </p>
    </div>

    <div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each wounds as w}
        <div class="p-6 rounded-2xl border border-emerald-900/40" style="background: rgba(10,61,46,0.5);">
          <div class="text-xs tracking-widest uppercase text-amber-300/80 mb-3">{w.cat}</div>
          <h3 class="font-serif text-xl text-white mb-2">{w.title}</h3>
          <p class="text-stone-200/80 text-sm leading-relaxed">{w.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3b. MANIFESTO MOMENT
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-28 md:py-36 overflow-hidden text-[#f5f2ea]" style="background: #0a1f18;">
  <div class="absolute inset-0 -z-0 opacity-40"
       style="background-image: radial-gradient(circle at 50% 40%, rgba(16,185,129,0.25), transparent 55%);"></div>
  <div data-scroll-animate="fade-up" class="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
    <div class="kicker text-emerald-300/80 mb-6">Our stance</div>
    <p class="font-serif text-3xl md:text-[44px] leading-[1.2] text-[#f5f2ea]">
      <span class="font-story italic text-stone-400/80 font-light">The system does not provide —</span><br />
      <span class="text-emerald-300 font-story italic font-normal">nature does.</span>
    </p>
    <p class="mt-10 font-serif text-2xl md:text-3xl leading-[1.35] text-stone-200/90 max-w-3xl mx-auto">
      Power is a human construct.<br />
      <em class="font-story italic text-stone-400/80 font-light">It only works as long as we consent to it.</em>
    </p>
    <div class="mt-14 mx-auto w-16 h-px bg-emerald-500/40"></div>
    <p class="mt-10 text-lg text-stone-200/80 max-w-2xl mx-auto leading-relaxed">
      We are not waiting for permission from a system that cannot heal itself.
      We are quietly building a different way of life <em class="font-story italic">inside</em> it —
      one that needs it less, and less, and less.
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
        Most of these wounds <em class="font-story italic font-normal text-stone-500">dissolve</em><br />
        when the scale gets small again.
      </h2>
      <p class="mt-6 text-lg text-stone-700 leading-relaxed">
        Not because community is a cure, but because most of our pain comes from living at a scale humans were
        never built for. Bring the scale back down — to a place, to people you know by name — and the knots
        start to loosen on their own.
      </p>
    </div>

    <div data-scroll-stagger class="grid md:grid-cols-2 gap-4">
      {#each answers.slice(0, ANSWERS_PREVIEW_COUNT) as a}
        <div class="grid grid-cols-[auto,1fr] gap-5 p-6 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
          <div class="w-10 h-10 rounded-full bg-ecohubs-deep text-emerald-200 flex items-center justify-center font-serif shrink-0">→</div>
          <div>
            <div class="text-xs tracking-widest uppercase text-stone-500 mb-1">{a.cat}</div>
            <h3 class="font-serif text-xl text-ecohubs-deep mb-1.5">{a.title}</h3>
            <p class="text-stone-700 text-sm leading-relaxed">{a.body}</p>
          </div>
        </div>
      {/each}

      {#if showAllAnswers}
        {#each answers.slice(ANSWERS_PREVIEW_COUNT) as a}
          <div class="reveal-fade-in grid grid-cols-[auto,1fr] gap-5 p-6 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
            <div class="w-10 h-10 rounded-full bg-ecohubs-deep text-emerald-200 flex items-center justify-center font-serif shrink-0">→</div>
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
            <stop offset="0%" stop-color="#059669" stop-opacity="1"/>
            <stop offset="100%" stop-color="#064e3b" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <g stroke="#064e3b" stroke-opacity="0.25" stroke-width="1">
          <line x1="200" y1="200" x2="80"  y2="100"/>
          <line x1="200" y1="200" x2="320" y2="80"/>
          <line x1="200" y1="200" x2="340" y2="240"/>
          <line x1="200" y1="200" x2="260" y2="340"/>
          <line x1="200" y1="200" x2="90"  y2="310"/>
          <line x1="200" y1="200" x2="60"  y2="220"/>
          <line x1="80"  y1="100" x2="320" y2="80"/>
          <line x1="320" y1="80"  x2="340" y2="240"/>
          <line x1="340" y1="240" x2="260" y2="340"/>
          <line x1="260" y1="340" x2="90"  y2="310"/>
          <line x1="90"  y1="310" x2="60"  y2="220"/>
          <line x1="60"  y1="220" x2="80"  y2="100"/>
        </g>
        <circle cx="200" cy="200" r="18" fill="url(#hubGrad)"/>
        <circle cx="80"  cy="100" r="10" fill="#059669"/>
        <circle cx="320" cy="80"  r="10" fill="#059669"/>
        <circle cx="340" cy="240" r="10" fill="#059669"/>
        <circle cx="260" cy="340" r="10" fill="#059669"/>
        <circle cx="90"  cy="310" r="10" fill="#059669"/>
        <circle cx="60"  cy="220" r="10" fill="#059669"/>
        <circle cx="200" cy="200" r="28" fill="none" stroke="#059669" stroke-opacity="0.35"/>
        <circle cx="200" cy="200" r="40" fill="none" stroke="#059669" stroke-opacity="0.18"/>
      </svg>
    </div>

    <div data-scroll-animate="fade-up" class="lg:col-span-7">
      <div class="kicker text-emerald-700 mb-4">A network, not an escape</div>
      <h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
        One community is a refuge.<br />
        <em class="font-story italic font-normal">A network of them</em> is an answer.
      </h2>
      <p class="text-lg text-stone-700 leading-relaxed mb-5">
        An EcoHub on its own is a beautiful project. But the vision is bigger:
        an <strong>interconnected network</strong> of small, locally rooted communities
        that share what they learn and strengthen each other.
      </p>
      <p class="text-lg text-stone-700 leading-relaxed mb-8">
        We are not trying to replace the system with a revolution. We are quietly
        reducing our dependency on it — community by community — until a different
        way of life becomes normal, accessible, and replicable.
      </p>
      <div data-scroll-stagger class="grid sm:grid-cols-3 gap-4">
        {#each [
          { label: 'Local',       desc: 'Rooted in a place, adapted to its culture and climate.' },
          { label: 'Connected',   desc: 'Sharing patterns, failures, and tools through the Blueprint.' },
          { label: 'Replicable',  desc: 'Forkable. Not franchised. Every hub stays its own place.' },
        ] as item}
          <div class="p-4 rounded-xl bg-white border border-stone-200/70">
            <div class="font-story italic text-2xl text-ecohubs-primary">{item.label}</div>
            <p class="text-sm text-stone-600 mt-1">{item.desc}</p>
          </div>
        {/each}
      </div>
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
          <img src={NetworkImage} alt="Regenerative community network" class="w-full h-full object-cover" />
        </div>
        <div class="rounded-2xl overflow-hidden aspect-[3/4] soft-shadow">
          <img src={jungleNature}
               alt="Shared meal" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <div data-scroll-animate="fade-up">
      <div class="kicker text-emerald-700 mb-4">The Vision</div>
      <h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
        Small places<br />
        <em class="font-story italic font-normal">where your work, your home,<br />and the people you love</em><br />
        are in the same story.
      </h2>
      <p class="text-lg text-stone-700 leading-relaxed mb-5">
        An EcoHub is a small, place-based community where people live, work, and
        learn together while regenerating the land they depend on. Human-scale.
        Locally rooted. Connected to a wider network of others doing the same.
      </p>
      <p class="text-lg text-stone-700 leading-relaxed mb-8">
        Not a utopia. Not an escape. A working model for belonging, tested in
        real conditions and shared openly so others don't have to start from zero.
      </p>
      <ul class="space-y-3 mb-10">
        {#each [
          'Work that means something because it shows up in your neighbors\' lives',
          'Decisions made in the open, by the people they affect',
          'Land and resources held in care, not in competition',
          'Conflict treated as information, not as failure',
        ] as item}
          <li class="flex items-start gap-3 text-stone-800">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
            {item}
          </li>
        {/each}
      </ul>
      <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
        <a href="/vision"
           class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                  hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group">
          Read the full vision
          <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a href="#blueprint"
           class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                  hover:border-ecohubs-dark pb-1">
          See how we're making it practical →
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. BLUEPRINT
═══════════════════════════════════════════════════════════════════ -->
<section id="blueprint" class="py-24 md:py-32 bg-ecohubs-ivory relative">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div data-scroll-animate="fade-up" class="max-w-3xl mb-16">
      <div class="kicker text-emerald-800 mb-4">The Blueprint · RCOS</div>
      <h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
        <em class="font-story italic font-normal">The guidebook I wished existed,</em><br />
        now open-source.
      </h2>
      <p class="text-lg text-stone-700 leading-relaxed">
        The Blueprint (formally: the Regenerative Community Operating System)
        is the first tangible outcome of EcoHubs. It is not a rulebook. It's a
        living set of patterns that helps a community make the invisible things
        explicit — before they quietly break the whole thing.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      {#each blueprintLayers as layer}
        <div class="p-6 bg-white rounded-2xl border border-stone-200/80">
          <div class="text-xs tracking-widest uppercase text-stone-400 mb-2">{layer.layer}</div>
          <h3 class="font-serif text-xl text-ecohubs-deep mb-2">{layer.title}</h3>
          <p class="text-sm text-stone-600 leading-relaxed">{layer.body}</p>
        </div>
      {/each}
      <a href="/blueprint"
         class="p-6 bg-ecohubs-deep text-white rounded-2xl border border-emerald-900/40 group flex flex-col justify-between">
        <div>
          <div class="text-xs tracking-widest uppercase text-emerald-300/80 mb-2">Explore</div>
          <h3 class="font-serif text-xl mb-2">Open the full Blueprint</h3>
          <p class="text-sm text-stone-300 leading-relaxed">It's freely readable. Editable by members. Evolving with every pilot.</p>
        </div>
        <span class="mt-4 text-emerald-300 group-hover:translate-x-1 transition-transform inline-block">→</span>
      </a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5b. WHAT MAKES US DIFFERENT
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div data-scroll-animate="fade-up" class="max-w-2xl mb-14">
      <div class="kicker text-emerald-700 mb-4">Why this isn't another community project</div>
      <h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
        Other people have tried.<br />
        <em class="font-story italic font-normal text-stone-500">We learned from where they broke.</em>
      </h2>
      <p class="mt-5 text-lg text-stone-700 leading-relaxed max-w-xl">
        We are not the first to try this — and that is the point. Most intentional communities fail in the
        same handful of ways. The Blueprint is built around those failure points, not around anyone's ideology.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      {#each comparisons as c}
        <div class="relative bg-white rounded-3xl p-7 border border-stone-200/80">
          <div class="text-[11px] tracking-widest uppercase text-stone-500 mb-4">Most projects</div>
          <p class="font-serif text-lg text-stone-700 leading-snug mb-6 line-through decoration-stone-300/80 decoration-1">{c.most}</p>
          <div class="text-[11px] tracking-widest uppercase text-emerald-700 mb-3">EcoHubs</div>
          <p class="font-serif text-xl text-ecohubs-deep leading-snug"><em class="font-story italic">{c.eco}</em></p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. ECUADOR PILOT
═══════════════════════════════════════════════════════════════════ -->
<section id="pilot" class="py-24 md:py-36 relative overflow-hidden">
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-base to-ecohubs-ivory"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">

    <div data-scroll-animate="fade-up" class="lg:col-span-5 relative">
      <div class="rounded-[32px] overflow-hidden soft-shadow aspect-[4/5]">
        <img src={fruitHavenTeam}
             alt="FruitHaven Community in Ecuador" class="w-full h-full object-cover" />
      </div>
      <div class="absolute -bottom-6 left-4 right-4 md:left-auto md:-right-8 md:w-[22rem] bg-white rounded-2xl px-6 py-5 border border-stone-200 soft-shadow">
        <div class="text-xs tracking-widest uppercase text-emerald-700 mb-2 flex items-center gap-2 whitespace-nowrap">
          <span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 pulse-dot shrink-0"></span>
          Pilot · Active now
        </div>
        <div class="font-serif text-lg text-ecohubs-deep leading-tight">FruitHaven community in Ecuador</div>
        <div class="text-xs text-stone-500 mt-1.5">Applying RCOS Blueprint practice since March 2026</div>
      </div>
    </div>

    <div data-scroll-animate="fade-up" class="lg:col-span-7">
      <div class="kicker text-emerald-700 mb-4">Already Living, Not Just Planned</div>
      <h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-8">
        A pilot is already happening<br />
        <em class="font-story italic font-normal text-stone-500">— and it's working.</em>
      </h2>
      <p class="text-lg text-stone-700 leading-relaxed mb-5">
        In March 2026, we introduced the Blueprint to a community in Ecuador facing complex, long-standing divisions. 
        These were people deeply committed to healing, yet they needed a new path forward to bridge the gaps that had persisted for so long.
      </p>
      <p class="text-lg text-stone-700 leading-relaxed mb-8">
        The Blueprint doesn't magic away the pain. It does something quieter:
        it <em class="font-story italic">names the thing that's hard</em>, and gives the
        community a shared language to work on it together.
      </p>
      <blockquote class="pl-6 border-l-2 border-emerald-700/40 mb-10">
        <p class="font-story italic text-xl text-ecohubs-deep leading-snug">
          "The introduction of the Regenerative Community Operating System sparked renewed motivation and inspiration within our community."
        </p>
        <p class="mt-3 text-sm text-stone-500">— Boris P., Member of the pilot community</p>
      </blockquote>
      <div class="flex flex-wrap items-center gap-6 text-sm text-stone-600 mb-8">
        {#each ['Non-ideological', 'Works online or offline', 'Fork-friendly · use your own way'] as tag}
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>{tag}
          </div>
        {/each}
      </div>

      <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
        <a href="https://fruithaven.land/"
           target="_blank" rel="noopener noreferrer"
           class="no-external-decoration px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full
                  hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group">
          Visit FruitHaven
          <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a href="https://www.youtube.com/playlist?list=PLuxOGwcC8ea2RfBxhMgBWg6xnyeFYdzn1"
           target="_blank" rel="noopener noreferrer"
           class="no-external-decoration inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40
                  hover:border-ecohubs-dark pb-1">
          Listen to the session recordings →
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6b. MEMBER CONSTELLATION
═══════════════════════════════════════════════════════════════════ -->
<section id="members" class="relative py-24 md:py-36 overflow-hidden text-[#f5f2ea]" style="background: #0a1f18;">
  <div class="absolute inset-0 -z-0 opacity-30"
       style="background-image: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25), transparent 55%);"></div>
  <div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
    <div data-scroll-animate="fade-up" class="max-w-2xl mb-14">
      <div class="kicker text-emerald-300/80 mb-4">The people behind this</div>
      <h2 class="font-serif text-4xl md:text-5xl leading-tight text-[#f5f2ea]">
        EcoHubs is not a product.<br />
        <em class="font-story italic font-normal text-emerald-300">It's the people showing up.</em>
      </h2>
      <p class="mt-5 text-lg text-stone-200/75 leading-relaxed">
        Each circle is a real member — contributing their craft, their voice, their time.
        The larger ones carry the most weight right now.
        <em class="font-story italic">Click any one</em> to read their story.
      </p>
    </div>

    <ConstellationMap members={data.members?.length ? data.members : placeholderMembers} />
  </div>
</section>

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
          People sometimes ask: <em class="font-story italic">how can you use AI and digital platforms while
          building something regenerative?</em> It's a fair question. Our answer is honest — we use technology
          where it lets one person do the work of ten, where it bridges distance, where it lets a community
          remember what it said.
        </p>
        <p class="mt-5 text-lg text-stone-700 leading-relaxed">
          We don't use it to manufacture engagement, replace relationships, or grow at any cost. When the
          platform is doing its job well, you forget it's there.
        </p>
      </div>
      <div class="lg:col-span-7">
        <div data-scroll-stagger class="grid sm:grid-cols-2 gap-4">
          {#each techCards as card}
            <div class="bg-white rounded-2xl p-6 border border-stone-200/80">
              <div class="w-10 h-10 rounded-full flex items-center justify-center mb-4
                          {card.accent === 'emerald' ? 'bg-emerald-100' : 'bg-amber-100'}">
                <span class="text-lg {card.accent === 'emerald' ? 'text-emerald-700' : 'text-amber-700'}">◈</span>
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
        If you've been quietly looking for <em class="font-story italic font-normal">this</em>,<br />
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
      <a href="/membership"
         class="inline-flex items-center gap-2 px-8 py-4 bg-ecohubs-deep text-white font-medium rounded-full
                hover:bg-emerald-900 transition-colors group">
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
        Honest answers <em class="font-story italic font-normal text-stone-500">to the honest questions.</em>
      </h2>
    </div>

    <div data-scroll-stagger class="divide-y divide-stone-200 border-t border-b border-stone-200">
      {#each faqItems as item}
        <details class="group py-6">
          <summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
            <span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
            <span class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0 select-none">+</span>
          </summary>
          <div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">{item.a}</div>
        </details>
      {/each}
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
      {#each [
        { n: '01', color: 'bg-ecohubs-deep',    title: 'Gather the people',  body: 'First 150 aligned members. Shared values. Foundation of the Blueprint co-created, not dictated.' },
        { n: '02', color: 'bg-ecohubs-primary', title: 'Grow the Blueprint', body: 'Open-source, evolving — shaped by practice across ecology, governance, economy, culture, and care.' },
        { n: '03', color: 'bg-amber-600',       title: 'Pilot, learn, share', body: 'Apply the Blueprint in real communities. Ecuador is the first. Document every scar, every win, openly.' },
      ] as step}
        <div class="grid md:grid-cols-[auto,1fr] gap-6 items-start">
          <div class="w-14 h-14 rounded-full {step.color} text-white font-serif text-xl flex items-center justify-center shrink-0">
            {step.n}
          </div>
          <div class="pt-2">
            <h3 class="font-serif text-2xl text-ecohubs-deep mb-2">{step.title}</h3>
            <p class="text-stone-700 leading-relaxed">{step.body}</p>
          </div>
        </div>
      {/each}
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
        EcoHubs is not a product you sign up to. It's a Blueprint that gets better with every person who reads
        it carefully, disagrees with a chapter, runs an experiment, comes back with what they learned.
        There are many ways in.
      </p>
    </div>

    <div data-scroll-stagger class="grid md:grid-cols-3 gap-5">
      {#each [
        { tag: 'Read & respond',  title: 'Critique a chapter of the Blueprint.',      body: 'No commitment. Read what we have, tell us where it\'s wrong. The best critiques become co-authors.', cta: 'Open the Blueprint →', href: '/blueprint' },
        { tag: 'Bring a skill',   title: 'Contribute what you already do well.',      body: 'Permaculture, governance, translation, code, cooking, listening. We need every one of these.',        cta: 'See where we need help →', href: '/membership' },
        { tag: 'Host a hub',      title: 'Start a local circle where you live.',      body: 'A monthly meal, a weekly listening circle, a piece of land. We help you set the form, you hold the room.', cta: 'Apply to host →', href: '/contact' },
      ] as card}
        <a href={card.href}
           class="group bg-white rounded-3xl p-7 border border-stone-200/80
                  hover:border-ecohubs-primary/50 transition-colors block">
          <div class="text-[11px] tracking-widest uppercase text-emerald-700 mb-3">{card.tag}</div>
          <h3 class="font-serif text-2xl text-ecohubs-deep leading-snug mb-3">{card.title}</h3>
          <p class="text-sm text-stone-700 leading-relaxed mb-6">{card.body}</p>
          <span class="text-sm text-ecohubs-dark font-medium group-hover:translate-x-0.5 inline-block transition-transform">
            {card.cta}
          </span>
        </a>
      {/each}
    </div>

    <p class="mt-10 text-center text-sm text-stone-500 max-w-xl mx-auto font-story italic">
      None of these are tiers. None of these cost. They are the doorways we have noticed people walk through.
    </p>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     9. FINAL CTA
═══════════════════════════════════════════════════════════════════ -->
<section id="join" class="relative py-28 md:py-40 overflow-hidden bg-ecohubs-deep text-[#f5f2ea]">
  <div class="absolute inset-0 -z-0 opacity-40"
       style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.2), transparent 55%);"></div>
  <div data-scroll-animate="fade-up" class="max-w-3xl mx-auto px-6 lg:px-8 text-center relative">
    <div class="kicker text-emerald-300 mb-5">An invitation</div>
    <h2 class="font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
      If any part of this<br />
      <em class="font-story italic font-normal text-emerald-300">sounded like your life</em>
      <span class="font-story italic font-light"> —</span><br />
      come build it with us.
    </h2>
    <p class="text-lg text-stone-200/85 leading-relaxed mb-10 max-w-xl mx-auto">
      We're not looking for believers. We're looking for people who are ready
      to make the invisible things explicit — in their own lives, and with others.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-3">
      <a href="/membership"
         class="px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors">
        Become a founding member
      </a>
      <a href="https://ecohubs.community/EcoHubs_Manifesto.pdf"
         target="_blank" rel="noopener noreferrer"
         class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full
                hover:bg-emerald-900/40 transition-colors">
        Read the manifesto
      </a>
    </div>
    <p class="mt-10 text-xs text-emerald-200/60 tracking-widest uppercase">
      Non-speculative · Non-ideological · Built in the open
    </p>
  </div>
</section>

<style>
  /* ─────────────────────────────────────────────────────────────────────────
     Animations: keyframes + FOUC guard for scroll-triggered reveals
     ───────────────────────────────────────────────────────────────────── */

  /* Elements marked for reveal start invisible at first paint so they don't
     flash before `onMount` swaps them. The reduced-motion media query
     restores visibility for users who opt out of motion. */
  :global([data-scroll-animate]),
  :global([data-scroll-stagger] > *),
  :global([data-hero-step]) {
    opacity: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    :global([data-scroll-animate]),
    :global([data-scroll-stagger] > *),
    :global([data-hero-step]) {
      opacity: 1 !important;
      transform: none !important;
    }
  }

  @keyframes pulse-ring {
    0%, 100% { transform: scale(1);   opacity: 0.25; }
    50%      { transform: scale(1.6); opacity: 0;    }
  }

  @keyframes reveal-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Used by the answers-section "See the rest" toggle. */
  :global(.reveal-fade-in) {
    animation: reveal-fade-in 0.6s ease-out both;
  }

  /* Pulsing "live" indicator dot — used in the hero kicker and pilot card. */
  :global(.pulse-dot)::before {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 9999px;
    background: currentColor;
    opacity: 0.25;
    animation: pulse-ring 2.4s ease-in-out infinite;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Typography utilities (global so they work on dynamically-rendered nodes)
     ───────────────────────────────────────────────────────────────────── */

  /* Inter for body copy — matches the redesign mockup. .font-serif and
     .font-story override this where they appear. */
  :global(main p),
  :global(main li),
  :global(main blockquote),
  :global(main span:not([class*="font-"])),
  :global(main div:not([class*="font-"])) {
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

  :global(.drop-cap)::first-letter {
    font-family: var(--font-story, 'Fraunces', serif);
    font-weight: 500;
    font-size: 4.5rem;
    line-height: 0.9;
    float: left;
    padding: 0.35rem 0.7rem 0 0;
    color: #064e3b;
    font-style: italic;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Decoration utilities
     ───────────────────────────────────────────────────────────────────── */

  :global(.soft-shadow) {
    box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
  }

  :global(.grain)::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.5;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Page-local selectors (not exported via :global)
     ───────────────────────────────────────────────────────────────────── */

  .hairline {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
    margin: 0 auto;
  }

  .quote-mark {
    font-family: var(--font-story, 'Fraunces', serif);
    font-weight: 400;
    font-style: italic;
  }

  /* Hide the default disclosure marker on FAQ <summary> elements. */
  details summary::-webkit-details-marker {
    display: none;
  }
</style>
