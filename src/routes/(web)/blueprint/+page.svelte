<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import { generateBreadcrumbs } from '$lib/config/seo';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';

	const breadcrumbs = generateBreadcrumbs('blueprint');

	import {
		failureModes,
		whatItIs,
		whatItIsNot,
		coreLayers,
		modules,
		applicationSteps,
		personas,
		contributePaths,
		faq
	} from './data';
	import { comparisons } from '../data';
	import fruitHavenTeam from '$lib/assets/fruithaven-team.webp?enhanced';

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="The Blueprint — RCOS, the open standard for regenerative communities | EcoHubs"
	description="The Blueprint (RCOS) is an open standard for designing and operating regenerative communities — modular, forkable, and tested in a live pilot."
	ogImage="/og-blueprint.jpg"
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
						The Blueprint · the first tangible outcome of EcoHubs
					</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<h1
					data-scroll-animate
					class="font-serif text-5xl md:text-6xl lg:text-[80px] leading-[1.02] tracking-tight text-ecohubs-deep"
				>
					The guidebook <br class="hidden md:block" />
					<em class="font-story italic font-normal text-ecohubs-primary">we wished</em> had existed.
				</h1>

				<p
					data-scroll-animate
					class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light"
				>
					The Blueprint — formally
					<strong class="text-ecohubs-deep">RCOS</strong> (Regenerative Community Operating System)
					— is an open standard for designing and operating regenerative communities. Not software,
					not an ideology — a shared way to make community structure
					<em class="font-story italic">explicit, testable, and improvable.</em>
				</p>

				<p data-scroll-animate class="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl">
					It is the place where the EcoHubs vision meets the ground. The first tangible thing that
					any community — including yours — can pick up, read, fork, and put to work today.
				</p>

				<div data-scroll-animate class="mt-10 flex flex-col sm:flex-row gap-3">
					<a
						href="https://blueprint.ecohubs.community"
						target="_blank"
						rel="noopener noreferrer"
						class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
					>
						Open the live Blueprint
						<span class="transition-transform group-hover:translate-x-0.5">↗</span>
					</a>
					<a
						href="#layers"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
					>
						See what's inside
					</a>
				</div>

				<div
					data-scroll-animate
					class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600"
				>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Open standard
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Modular &amp; forkable
					</span>
					<span class="flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span> Tested in a live pilot
					</span>
				</div>
			</div>

			<!-- Right: stylized "spec" card -->
			<div data-scroll-animate class="lg:col-span-5 relative">
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
							<span class="text-stone-800">conflict, repair &amp; accountability</span>
						</div>
						<div>
							<span class="text-emerald-700">layer 5</span> ·
							<span class="text-stone-800">operations &amp; coordination</span>
						</div>
						<div>
							<span class="text-emerald-700">layer 6</span> ·
							<span class="text-stone-800">evolution &amp; adaptation</span>
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
							<span class="text-amber-700">module</span> ·
							<span class="text-stone-800">housing</span>
						</div>
						<div>
							<span class="text-amber-700">module</span> ·
							<span class="text-stone-800">land commons safeguards</span>
						</div>
						<div>
							<span class="text-amber-700">module</span> ·
							<span class="text-stone-800">alternative economies</span>
						</div>
					</div>

					<div
						class="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500"
					>
						<span>Open · Forkable · Adaptable</span>
						<a
							href="https://blueprint.ecohubs.community"
							target="_blank"
							rel="noopener noreferrer"
							class="text-ecohubs-primary hover:underline font-medium"
							>blueprint.ecohubs.community ↗</a
						>
					</div>
				</div>

				<div
					class="absolute -left-3 -bottom-2 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 soft-shadow max-w-[260px] border border-stone-100 hidden md:block"
				>
					<p class="font-story italic text-[15px] leading-snug text-stone-800">
						"Structure before ideology. Clarity before persuasion."
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     1b. INTRODUCTION VIDEO — 19-min explainer
═══════════════════════════════════════════════════════════════════ -->
<section id="intro-video" class="py-20 md:py-28 bg-ecohubs-ivory">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-10">
			<div class="kicker text-emerald-700 mb-4">19-min introduction</div>
			<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight">
				If you have <em class="font-story italic font-normal text-stone-500">nineteen minutes,</em><br
				/>
				<em class="font-story italic font-normal text-ecohubs-primary"
					>here is the whole picture.</em
				>
			</h2>
			<p class="mt-5 text-lg text-stone-700 leading-relaxed">
				A walk-through of what RCOS is, why it exists, and how the layers fit together. Best watched
				with a coffee — it covers the ground that the rest of this page only sketches.
			</p>
		</div>
		<div data-scroll-animate>
			<LiteYouTube videoId="JwTf6BFhdYY" title="Introduction to RCOS — EcoHubs" />
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     2. WHY STRUCTURE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Why structure, before anything else</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Most communities don't fail
				<em class="font-story italic font-normal text-stone-500">on values.</em> <br />
				They fail on the things <em class="font-story italic font-normal">no one wrote down.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				It's estimated that <strong class="text-ecohubs-deep"
					>80–90% of intentional communities collapse</strong
				> — not because the vision was wrong, but because the same handful of invisible things were never
				made explicit. The Blueprint is built around those failure points, so a community can name them
				before they break.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each failureModes as mode}
				<article class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="kicker text-stone-500 mb-3">Failure mode · {mode.number}</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{mode.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{mode.body}</p>
				</article>
			{/each}
		</div>

		<p
			data-scroll-animate
			class="mt-12 max-w-2xl text-stone-600 leading-relaxed font-story italic text-lg"
		>
			The Blueprint doesn't promise harmony. It just refuses to leave these things unsaid.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. WHAT IT IS / WHAT IT IS NOT
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-32 bg-ecohubs-deep text-ecohubs-ivory overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.12), transparent 55%);"
	></div>

	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-300/80 mb-5">What the Blueprint is, and isn't</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-ecohubs-ivory">
				Clarity, <em class="font-story italic font-normal text-emerald-300">not persuasion.</em>
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/80 leading-relaxed max-w-2xl">
				The Blueprint can be misread as a lot of things it isn't. Before going further, here is the
				line we hold — carefully, on purpose.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-10 md:gap-14">
			<div data-scroll-animate>
				<div class="flex items-center gap-3 mb-7">
					<span class="pill bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
						>It is</span
					>
					<span class="text-stone-300/70 text-sm">A formal, open standard.</span>
				</div>
				<ul class="space-y-5">
					{#each whatItIs as item}
						<li class="grid grid-cols-[28px_1fr] gap-3">
							<span class="font-story italic text-emerald-300 text-xl">✓</span>
							<div>
								<div class="font-serif text-lg text-white">{item.title}</div>
								<p class="text-sm text-stone-300/80 mt-1 leading-relaxed">{item.body}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<div data-scroll-animate>
				<div class="flex items-center gap-3 mb-7">
					<span class="pill bg-amber-300/10 text-amber-200 border border-amber-300/30"
						>It is not</span
					>
					<span class="text-stone-300/70 text-sm">And never quietly will be.</span>
				</div>
				<ul class="space-y-5">
					{#each whatItIsNot as item}
						<li class="grid grid-cols-[28px_1fr] gap-3">
							<span class="font-story italic text-amber-300/80 text-xl">×</span>
							<div>
								<div class="font-serif text-lg text-white">{item.title}</div>
								<p class="text-sm text-stone-300/80 mt-1 leading-relaxed">{item.body}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     4. CORE LAYERS
═══════════════════════════════════════════════════════════════════ -->
<section id="layers" class="relative py-24 md:py-36 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">RCOS Core · the seven layers</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Seven layers,
				<em class="font-story italic font-normal text-stone-500">each with one job.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				RCOS is structured into layers with clear responsibility boundaries. Communities adapt the
				implementation details — the boundaries themselves are what keep assumptions from going
				implicit.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-3 gap-4">
			{#each coreLayers as layer}
				<article
					class="layer-card bg-white rounded-2xl p-6 border border-stone-200/80 flex flex-col"
				>
					<div class="flex items-baseline justify-between mb-3">
						<span class="layer-num text-2xl text-ecohubs-primary">{layer.id}</span>
						<span class="text-xs tracking-widest uppercase text-stone-400">{layer.kicker}</span>
					</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2 leading-snug">{layer.title}</h3>
					<p class="text-sm text-stone-600 leading-relaxed mb-4">{layer.body}</p>
					<div class="mt-auto flex flex-wrap gap-1.5 text-[11px]">
						{#each layer.tags as tag}
							<span
								class="px-2 py-0.5 rounded-full bg-ecohubs-ivory border border-stone-200 text-stone-600"
								>{tag}</span
							>
						{/each}
					</div>
				</article>
			{/each}

			<!-- Modules -->
			<article
				class="layer-card bg-ecohubs-ivory rounded-2xl p-6 border border-stone-200/80 flex flex-col"
			>
				<div class="flex items-baseline justify-between mb-3">
					<span class="layer-num text-2xl text-amber-700">+</span>
					<span class="text-xs tracking-widest uppercase text-stone-400">Modules</span>
				</div>
				<h3 class="font-serif text-xl text-ecohubs-deep mb-2 leading-snug">Real-world domains.</h3>
				<p class="text-sm text-stone-600 leading-relaxed">
					Permaculture, education, housing, culture — applied, not theoretical.
				</p>
			</article>

			<!-- Explore CTA -->
			<a
				href="https://blueprint.ecohubs.community"
				target="_blank"
				rel="noopener noreferrer"
				class="layer-card bg-ecohubs-deep text-white rounded-2xl p-6 border border-emerald-900/40 group flex flex-col justify-between"
			>
				<div>
					<div class="flex items-baseline justify-between mb-3">
						<span class="layer-num text-2xl text-emerald-300">↗</span>
						<span class="text-xs tracking-widest uppercase text-emerald-300/80">Explore</span>
					</div>
					<h3 class="font-serif text-xl mb-2 leading-snug">Open the full Blueprint</h3>
					<p class="text-sm text-stone-300 leading-relaxed">
						It's freely readable. Editable by members. Evolving with every pilot.
					</p>
				</div>
				<span
					class="mt-4 text-emerald-300 group-hover:translate-x-1 transition-transform inline-block"
					>→</span
				>
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. CORE + MODULES diagram
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
		<!-- Diagram -->
		<div data-scroll-animate class="lg:col-span-5">
			<svg viewBox="-20 -20 440 440" class="w-full max-w-md mx-auto">
				<circle
					cx="200"
					cy="200"
					r="170"
					fill="none"
					stroke="#d97706"
					stroke-opacity="0.35"
					stroke-width="1"
					stroke-dasharray="3 5"
				/>
				<text
					x="200"
					y="14"
					text-anchor="middle"
					font-family="Inter"
					font-size="10"
					letter-spacing="2"
					fill="#b45309"
				>
					MODULES · OPTIONAL
				</text>

				<circle
					cx="200"
					cy="200"
					r="120"
					fill="#fbfbf9"
					stroke="#059669"
					stroke-opacity="0.5"
					stroke-width="1.2"
				/>
				<text
					x="200"
					y="64"
					text-anchor="middle"
					font-family="Inter"
					font-size="10"
					letter-spacing="2"
					fill="#047857"
				>
					RCOS CORE
				</text>

				<circle cx="200" cy="200" r="56" fill="#0b2e24" />
				<text
					x="200"
					y="195"
					text-anchor="middle"
					font-family="Pridi, serif"
					font-size="13"
					fill="#a7f3d0">A living</text
				>
				<text
					x="200"
					y="215"
					text-anchor="middle"
					font-family="Fraunces, serif"
					font-style="italic"
					font-size="20"
					fill="#fbfbf9"
				>
					Blueprint
				</text>

				<g font-family="Pridi, serif" font-size="11" fill="#064e3b" text-anchor="middle">
					<g
						><circle cx="200" cy="80" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="200"
							y="84"
							font-style="italic">L0</text
						></g
					>
					<g
						><circle cx="304" cy="125" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="304"
							y="129"
							font-style="italic">L1</text
						></g
					>
					<g
						><circle cx="320" cy="240" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="320"
							y="244"
							font-style="italic">L2</text
						></g
					>
					<g
						><circle cx="245" cy="320" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="245"
							y="324"
							font-style="italic">L3</text
						></g
					>
					<g
						><circle cx="155" cy="320" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="155"
							y="324"
							font-style="italic">L4</text
						></g
					>
					<g
						><circle cx="80" cy="240" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="80"
							y="244"
							font-style="italic">L5</text
						></g
					>
					<g
						><circle cx="96" cy="125" r="14" fill="#fbfbf9" stroke="#059669" /><text
							x="96"
							y="129"
							font-style="italic">L6</text
						></g
					>
				</g>

				<g font-family="Inter" font-size="10" fill="#7c2d12" text-anchor="middle">
					<g
						><circle cx="200" cy="30" r="9" fill="#fef3c7" stroke="#d97706" /><text x="200" y="33"
							>P</text
						></g
					>
					<g
						><circle cx="346" cy="98" r="9" fill="#fef3c7" stroke="#d97706" /><text x="346" y="101"
							>E</text
						></g
					>
					<g
						><circle cx="370" cy="245" r="9" fill="#fef3c7" stroke="#d97706" /><text x="370" y="248"
							>H</text
						></g
					>
					<g
						><circle cx="265" cy="368" r="9" fill="#fef3c7" stroke="#d97706" /><text x="265" y="371"
							>L</text
						></g
					>
					<g
						><circle cx="135" cy="368" r="9" fill="#fef3c7" stroke="#d97706" /><text x="135" y="371"
							>A</text
						></g
					>
					<g
						><circle cx="30" cy="245" r="9" fill="#fef3c7" stroke="#d97706" /><text x="30" y="248"
							>M</text
						></g
					>
				</g>
			</svg>

			<div class="mt-6 text-xs text-stone-500 text-center font-mono">
				Core invariants stay the same · modules extend, never override
			</div>
		</div>

		<!-- Copy + module list -->
		<div data-scroll-animate class="lg:col-span-7">
			<div class="kicker text-emerald-800 mb-4">Modules · the optional outer ring</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-6">
				The core stays small. <br />
				<em class="font-story italic font-normal">The modules go where life is.</em>
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				Modules are
				<strong class="text-ecohubs-deep">optional extensions</strong> that apply RCOS to specific domains
				— food systems, education, housing, land — without changing the core layers or overriding governance.
				Adopt the ones that fit your land, your people, your stage. Skip the rest.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed mb-8">
				Modules describe <em class="font-story italic">structure</em>, not "the right way" to live.
				A community can run the Permaculture module or the Minimal one — both sit cleanly on the
				same core.
			</p>

			<div class="grid sm:grid-cols-2 gap-3">
				{#each modules as mod}
					<div class="p-4 rounded-xl bg-white border border-stone-200/70 flex items-start gap-3">
						<span class="font-mono text-[11px] text-amber-700 mt-0.5">{mod.code}</span>
						<div>
							<div class="font-serif text-base text-ecohubs-deep">{mod.name}</div>
							<p class="text-xs text-stone-600 mt-0.5">{mod.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5b. WHY THIS ISN'T ANOTHER COMMUNITY PROJECT
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-36 bg-ecohubs-deep text-ecohubs-ivory overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-50"
		style="background-image: radial-gradient(circle at 15% 20%, rgba(217,119,6,0.18), transparent 55%), radial-gradient(circle at 85% 80%, rgba(16,185,129,0.22), transparent 55%);"
	></div>
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-14">
			<div class="kicker text-amber-200/80 mb-5 flex items-center gap-3">
				<span class="h-px w-8 bg-amber-200/40"></span>
				Why this isn't another community project
			</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-ecohubs-ivory">
				Other people have tried.<br />
				<em class="font-story italic font-normal text-emerald-300"
					>We learned from where they broke.</em
				>
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/85 leading-relaxed max-w-2xl">
				We are not the first to try this — and that is the point. Most intentional communities fail
				in the same handful of ways. The Blueprint is built around those failure points, not around
				anyone's ideology.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
			{#each comparisons as c, i}
				<article
					class="group relative rounded-3xl border border-emerald-900/40 overflow-hidden
					       bg-gradient-to-br from-[#0a3d2e]/70 to-[#0b2e24]/80 hover:border-emerald-400/40 transition-colors"
				>
					<div
						class="absolute top-0 right-0 font-story italic text-[80px] leading-none text-emerald-300/10 pr-5 pt-3 select-none"
					>
						{String(i + 1).padStart(2, '0')}
					</div>

					<!-- "Most projects" — muted, struck-through, deliberately quieter -->
					<div class="px-7 pt-7 pb-5 border-b border-emerald-900/40 relative">
						<div
							class="flex items-center gap-2 text-[11px] tracking-widest uppercase text-amber-300/70 mb-3"
						>
							<span class="w-1.5 h-1.5 rounded-full bg-amber-400/60"></span>
							Most projects
						</div>
						<p
							class="font-serif text-base text-stone-300/55 leading-snug line-through decoration-amber-300/30 decoration-1"
						>
							{c.most}
						</p>
					</div>

					<!-- "EcoHubs" — bold, emerald, clearly the answer -->
					<div class="px-7 pt-5 pb-7 relative">
						<div
							class="flex items-center gap-2 text-[11px] tracking-widest uppercase text-emerald-300 mb-3"
						>
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
							EcoHubs
						</div>
						<p class="font-serif text-xl text-ecohubs-ivory leading-snug">
							<em class="font-story italic text-emerald-100">{c.eco}</em>
						</p>
					</div>
				</article>
			{/each}
		</div>

		<div data-scroll-animate class="mt-14 flex flex-col sm:flex-row gap-3 items-start">
			<a
				href="https://blueprint.ecohubs.community"
				target="_blank"
				rel="noopener noreferrer"
				class="px-7 py-3.5 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
			>
				See how the Blueprint avoids each one
				<span class="text-sm">↗</span>
			</a>
			<a
				href="#pilot"
				class="px-7 py-3.5 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors inline-flex items-center justify-center gap-2"
			>
				Watch it tested in the pilot →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. HOW IT CONNECTS TO THE VISION
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-base relative">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Where the Blueprint sits in the EcoHubs vision</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				The vision is the
				<em class="font-story italic font-normal text-stone-500">why.</em><br />
				The Blueprint is
				<em class="font-story italic font-normal">the first thing you can hold.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				EcoHubs is a long-horizon project — small, human-scale communities, woven into a global
				commons. The Blueprint is the first concrete piece of that. The bridge between intention and
				ground.
			</p>
		</div>

		<div data-scroll-stagger class="grid lg:grid-cols-3 gap-6 lg:gap-0 relative">
			<article
				class="relative bg-ecohubs-ivory rounded-3xl p-8 border border-stone-200/70 lg:rounded-r-none lg:border-r-0"
			>
				<div class="kicker text-emerald-700 mb-3">01 · Vision</div>
				<h3 class="font-serif text-2xl text-ecohubs-deep mb-3">A network of regenerative hubs.</h3>
				<p class="text-stone-700 text-[15px] leading-relaxed">
					Small, place-based communities, each adapted to its land and culture, woven into a shared
					commons that gets stronger over time.
				</p>
				<a
					href="/vision"
					class="mt-5 inline-flex items-center gap-1.5 text-sm text-ecohubs-dark font-medium hover:underline"
					>Read the vision →</a
				>
			</article>

			<article
				class="relative bg-ecohubs-deep text-ecohubs-ivory rounded-3xl p-8 border border-emerald-900/40 lg:rounded-none -mt-2 lg:-mt-6 lg:mb-2 shadow-[0_30px_60px_-30px_rgba(11,46,36,0.5)]"
			>
				<div class="kicker text-emerald-300/80 mb-3">
					02 · Blueprint <span class="text-amber-300/80">· you are here</span>
				</div>
				<h3 class="font-serif text-2xl text-white mb-3">An open standard any hub can pick up.</h3>
				<p class="text-stone-200/85 text-[15px] leading-relaxed">
					RCOS makes the structure of community life explicit — so a hub doesn't have to invent
					membership, governance, or repair from scratch.
				</p>
				<a
					href="https://blueprint.ecohubs.community"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-5 inline-flex items-center gap-1.5 text-sm text-emerald-300 font-medium hover:underline"
					>Open the Blueprint ↗</a
				>
			</article>

			<article
				class="relative bg-ecohubs-ivory rounded-3xl p-8 border border-stone-200/70 lg:rounded-l-none lg:border-l-0"
			>
				<div class="kicker text-emerald-700 mb-3">03 · Pilots</div>
				<h3 class="font-serif text-2xl text-ecohubs-deep mb-3">Real communities, applying it.</h3>
				<p class="text-stone-700 text-[15px] leading-relaxed">
					A first community in Ecuador is already running the Blueprint under real ecological,
					social, and economic constraints — feeding what they learn back into the standard.
				</p>
				<a
					href="#pilot"
					class="mt-5 inline-flex items-center gap-1.5 text-sm text-ecohubs-dark font-medium hover:underline"
					>See the Ecuador pilot →</a
				>
			</article>
		</div>

		<p class="mt-12 text-center text-sm text-stone-500 font-story italic max-w-xl mx-auto">
			Every pilot teaches the standard. Every standard improvement helps the next pilot. That loop
			is the project.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. HOW IT'S APPLIED — the loop
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-ecohubs-ivory relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-800 mb-4">From idea to ground, and back</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				How the Blueprint
				<em class="font-story italic font-normal text-stone-500">actually gets applied.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl">
				It is built as a loop, not a launch. Every community that runs it teaches the next one
				something — and the Blueprint that comes after is a little truer than the one that came
				before.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
			<ol data-scroll-stagger class="space-y-7">
				{#each applicationSteps as step}
					<li class="grid grid-cols-[auto_1fr] gap-5 items-start">
						<span
							class="font-story italic text-2xl w-10 shrink-0 {step.accent === 'amber'
								? 'text-amber-700'
								: 'text-ecohubs-primary'}">{step.number}</span
						>
						<div>
							<h3 class="font-serif text-xl text-ecohubs-deep mb-1.5">{step.title}</h3>
							<p class="text-stone-700 leading-relaxed">{step.body}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div data-scroll-animate class="lg:sticky lg:top-28">
				<div class="bg-white rounded-3xl border border-stone-200/80 soft-shadow overflow-hidden">
					<div class="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
							<span class="text-xs tracking-widest uppercase text-stone-500 font-semibold"
								>Pilot · Ecuador</span
							>
						</div>
						<span class="text-[11px] text-stone-400 font-mono">running RCOS v0.4</span>
					</div>
					<div class="p-6 font-mono text-[12.5px] leading-[2] text-stone-700">
						<div>
							<span class="text-emerald-700">L0</span> purpose
							<span class="text-stone-400">// adopted, ratified</span>
						</div>
						<div>
							<span class="text-emerald-700">L1</span> membership
							<span class="text-stone-400">// adopted, in use</span>
						</div>
						<div>
							<span class="text-emerald-700">L2</span> governance
							<span class="text-amber-700">// adapted: small-circle quorum</span>
						</div>
						<div>
							<span class="text-emerald-700">L3</span> economy
							<span class="text-amber-700">// adapted: contribution log</span>
						</div>
						<div>
							<span class="text-emerald-700">L4</span> conflict
							<span class="text-stone-400">// adopted, two repairs run</span>
						</div>
						<div>
							<span class="text-emerald-700">L5</span> operations
							<span class="text-stone-400">// in progress</span>
						</div>
						<div>
							<span class="text-emerald-700">L6</span> evolution
							<span class="text-stone-400">// scheduled, month 3</span>
						</div>
						<div class="mt-3">
							<span class="text-amber-700">module</span> permaculture
							<span class="text-stone-400">// active</span>
						</div>
						<div>
							<span class="text-amber-700">module</span> education
							<span class="text-stone-400">// scoping</span>
						</div>
						<div class="mt-4 pt-4 border-t border-stone-200 text-stone-500">
							<div># lessons sent back</div>
							<div>+ pattern: silent-exit repair</div>
							<div>+ stress test: month-3 rotation</div>
							<div>~ delegation: rotation cap (proposed)</div>
						</div>
					</div>
				</div>
				<p class="mt-5 text-sm text-stone-500 leading-relaxed">
					Every line above is a real choice the pilot is documenting in the open — the same way any
					community that adopts the Blueprint can.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7b. ECUADOR PILOT — Already Living, Not Just Planned
═══════════════════════════════════════════════════════════════════ -->
<section id="pilot" class="py-24 md:py-36 relative overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-base to-ecohubs-ivory"></div>
	<div class="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
		<div data-scroll-animate class="lg:col-span-5 relative">
			<div class="rounded-[32px] overflow-hidden soft-shadow aspect-[4/5]">
				<enhanced:img
					src={fruitHavenTeam}
					alt="FruitHaven Community in Ecuador"
					sizes="(max-width: 768px) 90vw, 400px"
					loading="lazy"
					class="w-full h-full object-cover"
				/>
			</div>
			<div
				class="absolute -bottom-6 left-4 right-4 md:left-auto md:-right-8 md:w-[22rem] bg-white rounded-2xl px-6 py-5 border border-stone-200 soft-shadow"
			>
				<div
					class="text-xs tracking-widest uppercase text-emerald-700 mb-2 flex items-center gap-2 whitespace-nowrap"
				>
					<span class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 pulse-dot shrink-0"
					></span>
					Pilot · Active now
				</div>
				<div class="font-serif text-lg text-ecohubs-deep leading-tight">
					FruitHaven community in Ecuador
				</div>
				<div class="text-xs text-stone-500 mt-1.5">
					Applying RCOS Blueprint practice since March 2026
				</div>
			</div>
		</div>

		<div data-scroll-animate class="lg:col-span-7">
			<div class="kicker text-emerald-700 mb-4">Already Living, Not Just Planned</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight mb-8">
				A pilot is already happening<br />
				<em class="font-story italic font-normal text-stone-500">— and it's working.</em>
			</h2>
			<p class="text-lg text-stone-700 leading-relaxed mb-5">
				In March 2026, we introduced the Blueprint to a community in Ecuador facing complex,
				long-standing divisions. These were people deeply committed to healing, yet they needed a
				new path forward to bridge the gaps that had persisted for so long.
			</p>
			<p class="text-lg text-stone-700 leading-relaxed mb-8">
				The Blueprint doesn't magic away the pain. It does something quieter: it
				<em class="font-story italic">names the thing that's hard</em>, and gives the community a
				shared language to work on it together.
			</p>
			<blockquote class="pl-6 border-l-2 border-emerald-700/40 mb-10">
				<p class="font-story italic text-xl text-ecohubs-deep leading-snug">
					"The introduction of the Regenerative Community Operating System sparked renewed
					motivation and inspiration within our community."
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
				<a
					href="https://fruithaven.land/"
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
				>
					Visit FruitHaven
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="https://www.youtube.com/playlist?list=PLuxOGwcC8ea2RfBxhMgBWg6xnyeFYdzn1"
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
				>
					Listen to the session recordings →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8. WHO IT'S FOR
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-700 mb-4">Who picks this up</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				The Blueprint is useful
				<em class="font-story italic font-normal text-stone-500"
					>to more than one kind of person.</em
				>
			</h2>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
			{#each personas as p}
				<div class="p-7 rounded-2xl bg-ecohubs-ivory border border-stone-200/70">
					<div class="kicker text-stone-500 mb-3">{p.kicker}</div>
					<h3 class="font-serif text-xl text-ecohubs-deep mb-2">{p.title}</h3>
					<p class="text-stone-700 text-[15px] leading-relaxed">{p.body}</p>
				</div>
			{/each}
		</div>

		<div data-scroll-animate class="mt-12 flex flex-col sm:flex-row gap-3">
			<a
				href="/membership"
				class="px-6 py-3 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-colors inline-flex items-center justify-center gap-2 group"
			>
				Find your way in
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				Talk to us first →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     9. CONTRIBUTE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-ivory relative">
	<div class="max-w-5xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-12">
			<div class="kicker text-emerald-800 mb-4">Contribute</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				We are not finished. <br />
				<em class="font-story italic font-normal text-stone-500">That is the point.</em>
			</h2>
			<p class="mt-5 text-lg text-stone-700 leading-relaxed">
				The Blueprint gets better with every person who reads it carefully, disagrees with a
				chapter, runs an experiment, or comes back with what they learned. There are four ways in.
			</p>
		</div>

		<div data-scroll-stagger class="grid md:grid-cols-2 gap-5">
			{#each contributePaths as path}
				<a
					href={path.href}
					target={path.external ? '_blank' : undefined}
					rel={path.external ? 'noopener' : undefined}
					class="group bg-white rounded-3xl p-7 border border-stone-200/80 hover:border-ecohubs-primary/50 transition-colors block"
				>
					<div class="text-[11px] tracking-widest uppercase text-emerald-700 mb-3">
						{path.number} · {path.kicker}
					</div>
					<h3 class="font-serif text-2xl text-ecohubs-deep leading-snug mb-3">{path.title}</h3>
					<p class="text-sm text-stone-700 leading-relaxed mb-6">{path.body}</p>
					<span
						class="text-sm text-ecohubs-dark font-medium group-hover:translate-x-0.5 inline-block transition-transform"
						>{path.cta}</span
					>
				</a>
			{/each}
		</div>

		<p class="mt-10 text-sm text-stone-500 font-story italic max-w-xl">
			Contributions sit inside membership — not because we're gating, but because the standard stays
			coherent when the people editing it are part of the wider community.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     10. FAQ
═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-32 bg-ecohubs-base">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-animate class="max-w-2xl mb-14">
			<div class="kicker text-emerald-700 mb-4">Honest questions, honest answers</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				About the Blueprint,
				<em class="font-story italic font-normal text-stone-500">specifically.</em>
			</h2>
		</div>

		<div data-scroll-animate class="divide-y divide-stone-200 border-t border-b border-stone-200">
			{#each faq as item}
				<details class="group py-6">
					<summary class="flex items-start justify-between gap-6 cursor-pointer list-none">
						<span class="font-serif text-xl text-ecohubs-deep leading-snug">{item.q}</span>
						<span
							class="mt-1 text-2xl text-ecohubs-primary font-story italic transition-transform group-open:rotate-45 shrink-0"
							>+</span
						>
					</summary>
					<div class="mt-4 text-stone-700 leading-relaxed max-w-2xl">
						{@html item.aHtml}
					</div>
				</details>
			{/each}
		</div>

		<div class="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-8">
			<a
				href="/faq#blueprint"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				See all questions across the project →
			</a>
			<a
				href="/community-resilience-assessment"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark font-medium border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1"
			>
				See how your community measures up — free resilience assessment →
			</a>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     11. CLOSING CTA
═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-28 md:py-40 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-ecohubs-deep"></div>
	<div
		class="absolute inset-0 -z-10 opacity-40"
		style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.32), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.18), transparent 55%);"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8 text-center text-ecohubs-ivory">
		<div data-scroll-animate class="kicker text-emerald-300 mb-6">
			The Blueprint is freely readable
		</div>

		<h2
			data-scroll-animate
			class="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10"
		>
			Read it. Argue with it. <br class="hidden md:block" />
			<em class="font-story italic font-normal text-emerald-300">Run it.</em>
		</h2>

		<p
			data-scroll-animate
			class="font-serif text-xl md:text-2xl leading-snug text-stone-200/90 max-w-2xl mx-auto mb-14"
		>
			The standard is open. The pilots are live. The next version is shaped by whoever shows up and
			edits it well.
		</p>

		<div class="mx-auto w-16 h-px bg-emerald-500/40 mb-12"></div>

		<div data-scroll-animate class="flex flex-col sm:flex-row justify-center gap-3">
			<a
				href="https://blueprint.ecohubs.community"
				target="_blank"
				rel="noopener noreferrer"
				class="px-8 py-4 bg-ecohubs-ivory text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
			>
				Open the live Blueprint
				<span class="text-sm">↗</span>
			</a>
			<a
				href="/#join"
				class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors"
			>
				Become a member &amp; contribute
			</a>
		</div>

		<p class="mt-12 text-xs text-emerald-200/60 tracking-widest uppercase">
			Open standard · Modular · Forkable · Built in the open
		</p>
	</div>
</section>

<style>
	/* Page-local: pill chip and "layer card" lift used by the Blueprint hero/spec. */
	:global(.pill) {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.7rem;
		border-radius: 9999px;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 600;
	}

	:global(.layer-card) {
		transition:
			transform 0.35s ease,
			border-color 0.35s ease,
			background-color 0.35s ease;
	}
	:global(.layer-card:hover) {
		transform: translateY(-2px);
		border-color: rgba(5, 150, 105, 0.35);
	}

	:global(.layer-num) {
		font-family: 'Fraunces Variable', 'Fraunces', serif;
		font-style: italic;
		font-weight: 400;
	}
</style>
