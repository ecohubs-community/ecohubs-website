<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import SEO from '$lib/components/SEO.svelte';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations,
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';


	import { principles, notThis, values, loopSteps } from './data';

	onMount(() => {
		if (prefersReducedMotion()) {
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

		const heroKeyframes: Record<string, unknown> = {
			opacity: [0, 1],
			transform: ['translateY(16px)', 'translateY(0px)'],
		};
		document.querySelectorAll<HTMLElement>('[data-hero-step]').forEach((el) => {
			const delay = parseFloat(el.dataset.heroStep ?? '0') || 0;
			animate(el, heroKeyframes as never, {
				duration: 0.7,
				delay,
				ease: [0.22, 1, 0.36, 1],
			});
		});

		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08,
		});
	});
</script>

<SEO
	title="Vision — A future small enough to live inside | EcoHubs"
	description="A growing network of small, human-scale communities — designed to regenerate land, culture, and livelihoods through cooperation and shared responsibility."
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Vision', url: 'https://ecohubs.community/vision' },
	]}
/>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- ═══════════════════════════════════════════════════════════════════
     1. HERO — quietly future-tense
     ═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-gradient-to-b from-[#f5f2ea] via-[#fbfbf9] to-[#fbfbf9]"></div>
	<div
		class="absolute -z-10 top-32 -left-32 w-[520px] h-[520px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -z-10 bottom-0 -right-24 w-[440px] h-[440px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
			<div class="lg:col-span-7">
				<div data-hero-step="0.05" class="kicker text-emerald-700 mb-6 flex items-center gap-3">
					<span
						class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 text-emerald-600 pulse-dot"
					></span>
					The Vision · what we are quietly building toward
				</div>

				<h1
					data-hero-step="0.15"
					class="font-serif text-5xl md:text-6xl lg:text-[80px] leading-[1.02] tracking-tight text-ecohubs-deep"
				>
					A future <em class="font-story italic font-normal text-ecohubs-primary">small enough</em>
					<br class="hidden md:block" />
					to live inside.
				</h1>

				<p
					data-hero-step="0.30"
					class="mt-8 text-xl text-stone-700 leading-relaxed max-w-xl font-light"
				>
					Not a utopia. Not a retreat from the world. A patient, honest answer to a question many of
					us already carry —
					<em class="font-story italic"
						>what would a life worth being inside actually look like?</em
					>
				</p>

				<p
					data-hero-step="0.40"
					class="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl"
				>
					Below is the picture as clearly as we can see it today: the principles, the values, the
					horizon, and the way we plan to walk there — together, and in the open.
				</p>

				<div data-hero-step="0.52" class="mt-10 flex flex-col sm:flex-row gap-3">
					<a
						href="#manifesto"
						class="px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group"
					>
						Read the vision
						<span class="transition-transform group-hover:translate-x-0.5">↓</span>
					</a>
					<a
						href="/blueprint"
						class="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 font-medium rounded-full hover:border-ecohubs-dark hover:text-ecohubs-dark transition-all inline-flex items-center justify-center gap-2"
					>
						See the Blueprint
					</a>
				</div>
			</div>

			<div class="lg:col-span-5 relative">
				<!-- Hand-drawn SVG of "a place" — single, calm illustration instead
				     of the 5×6 photo mosaic used by /, /membership. The arcs around
				     the cluster foreshadow the network strip lower on the page. -->
				<div
					data-hero-step="0.20"
					class="relative h-[480px] rounded-[28px] overflow-hidden soft-shadow bg-gradient-to-b from-ecohubs-ivory to-emerald-50 border border-stone-200/60"
				>
					<svg
						viewBox="0 0 480 480"
						preserveAspectRatio="xMidYMax meet"
						class="absolute inset-0 w-full h-full"
						aria-hidden="true"
					>
						<!-- Subtle grain background -->
						<defs>
							<radialGradient id="sun" cx="50%" cy="50%" r="50%">
								<stop offset="0%" stop-color="#fcd34d" stop-opacity="0.95" />
								<stop offset="60%" stop-color="#fbbf24" stop-opacity="0.55" />
								<stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
							</radialGradient>
							<linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stop-color="#a7f3d0" stop-opacity="0.55" />
								<stop offset="100%" stop-color="#a7f3d0" stop-opacity="0" />
							</linearGradient>
							<linearGradient id="pond" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stop-color="#0b2e24" stop-opacity="0.18" />
								<stop offset="100%" stop-color="#0b2e24" stop-opacity="0.08" />
							</linearGradient>
						</defs>

						<!-- Sun / soft horizon glow -->
						<circle cx="340" cy="180" r="48" fill="url(#sun)" />
						<circle cx="340" cy="180" r="18" fill="#fcd34d" fill-opacity="0.8" />

						<!-- Concentric "network of places" arcs around the cluster -->
						<g stroke="#0b2e24" stroke-opacity="0.12" fill="none" stroke-dasharray="2 4">
							<ellipse cx="240" cy="320" rx="220" ry="60" />
							<ellipse cx="240" cy="320" rx="170" ry="44" />
							<ellipse cx="240" cy="320" rx="120" ry="30" />
						</g>

						<!-- Distant tiny "other places" on the outermost arc -->
						<g fill="#059669" fill-opacity="0.55">
							<circle cx="40" cy="320" r="3" />
							<circle cx="440" cy="320" r="3" />
							<circle cx="100" cy="270" r="2.5" />
							<circle cx="380" cy="370" r="2.5" />
						</g>

						<!-- Far hills -->
						<path d="M0 290 Q120 240 240 270 T480 250 L480 360 L0 360 Z" fill="url(#hill1)" />
						<path
							d="M0 290 Q120 240 240 270 T480 250"
							fill="none"
							stroke="#0b2e24"
							stroke-opacity="0.25"
							stroke-width="1"
						/>

						<!-- Pond -->
						<ellipse cx="120" cy="395" rx="52" ry="8" fill="url(#pond)" />
						<path
							d="M68 395 Q120 388 172 395"
							fill="none"
							stroke="#0b2e24"
							stroke-opacity="0.3"
							stroke-width="1"
						/>

						<!-- Footpath winding toward the cluster -->
						<path
							d="M40 470 Q140 420 220 410 T360 380"
							fill="none"
							stroke="#8b6f47"
							stroke-opacity="0.5"
							stroke-width="2"
							stroke-dasharray="4 4"
						/>

						<!-- Three buildings — small cluster -->
						<g stroke="#0b2e24" stroke-width="1.4" stroke-opacity="0.85">
							<!-- Building 1 (left, larger) -->
							<rect x="218" y="350" width="40" height="36" fill="#fbfbf9" />
							<path d="M214 350 L238 326 L262 350 Z" fill="#fbfbf9" />
							<rect x="232" y="364" width="12" height="22" fill="#0b2e24" fill-opacity="0.55" />
							<rect x="221" y="356" width="6" height="6" fill="#fde68a" fill-opacity="0.9" />
							<rect x="249" y="356" width="6" height="6" fill="#fde68a" fill-opacity="0.9" />

							<!-- Building 2 (right, planted roof) -->
							<rect x="270" y="358" width="34" height="28" fill="#fbfbf9" />
							<path d="M267 358 L287 340 L307 358 Z" fill="#86efac" fill-opacity="0.85" />
							<!-- planted-roof tufts -->
							<circle cx="280" cy="346" r="2" fill="#059669" fill-opacity="0.85" />
							<circle cx="287" cy="343" r="2" fill="#059669" fill-opacity="0.85" />
							<circle cx="295" cy="346" r="2" fill="#059669" fill-opacity="0.85" />
							<rect x="282" y="368" width="10" height="18" fill="#0b2e24" fill-opacity="0.55" />

							<!-- Building 3 (small, behind) -->
							<rect x="195" y="360" width="22" height="22" fill="#fbfbf9" />
							<path d="M193 360 L206 348 L219 360 Z" fill="#fbfbf9" />
							<rect x="201" y="370" width="6" height="12" fill="#0b2e24" fill-opacity="0.55" />
							<rect x="208" y="365" width="5" height="5" fill="#fde68a" fill-opacity="0.85" />
						</g>

						<!-- Trees scattered around -->
						<g stroke="#0b2e24" stroke-width="1.2" stroke-opacity="0.8">
							<!-- Left tree -->
							<line x1="170" y1="386" x2="170" y2="364" />
							<circle cx="170" cy="356" r="14" fill="#86efac" fill-opacity="0.8" />

							<!-- Right tall tree -->
							<line x1="330" y1="386" x2="330" y2="350" />
							<ellipse cx="330" cy="338" rx="11" ry="18" fill="#86efac" fill-opacity="0.8" />

							<!-- Small bush near pond -->
							<circle cx="90" cy="382" r="6" fill="#86efac" fill-opacity="0.85" />
							<circle cx="155" cy="384" r="5" fill="#86efac" fill-opacity="0.85" />

							<!-- Background tree, far right -->
							<line x1="400" y1="362" x2="400" y2="342" />
							<circle cx="400" cy="334" r="10" fill="#86efac" fill-opacity="0.7" />
						</g>

						<!-- Tiny wandering birds near the sun -->
						<g stroke="#0b2e24" stroke-opacity="0.55" stroke-width="1.2" fill="none" stroke-linecap="round">
							<path d="M280 150 q4 -4 8 0 q4 -4 8 0" />
							<path d="M310 130 q3 -3 6 0 q3 -3 6 0" />
						</g>
					</svg>

					<!-- Editorial caption pinned in the upper-left corner of the frame -->
					<div class="absolute top-5 left-6 max-w-[160px]">
						<div class="kicker text-emerald-700 mb-1.5">A place</div>
						<p class="font-story italic text-[13px] leading-snug text-stone-600">
							A small cluster, rooted in a landscape — connected to others like it.
						</p>
					</div>
				</div>

				<div
					data-hero-step="0.65"
					class="absolute -left-3 -bottom-2 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 soft-shadow max-w-[260px] border border-stone-100 hidden md:block"
				>
					<p class="font-story italic text-[15px] leading-snug text-stone-800">
						"We are not designing a perfect place. We are designing a place that can keep getting
						truer."
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
     2. THE MANIFESTO — A network of regenerative EcoHubs
     ═══════════════════════════════════════════════════════════════════ -->
<section
	id="manifesto"
	class="relative py-28 md:py-40 bg-[#0d2a24] text-white overflow-hidden"
>
	<div class="absolute inset-0 grain opacity-50 pointer-events-none"></div>

	<div
		class="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
		style="background: radial-gradient(closest-side, rgba(212,165,116,0.18), transparent 70%);"
	></div>
	<div
		class="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
		style="background: radial-gradient(closest-side, rgba(74,124,89,0.22), transparent 70%);"
	></div>

	<div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
		<div class="kicker text-amber-200/80 mb-8 text-center" data-scroll-animate>
			The vision, in one breath
		</div>

		<h2
			class="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-center max-w-4xl mx-auto"
			data-scroll-animate
		>
			A growing network of
			<em class="font-story italic font-normal text-amber-200/90">small, human-scale</em> communities —
			<br class="hidden md:block" />
			designed to
			<span
				class="underline decoration-amber-300/40 decoration-[3px] underline-offset-[10px]"
				>regenerate land, culture, and livelihoods</span
			>
			through cooperation and shared responsibility.
		</h2>

		<div class="mt-16 md:mt-20 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
			<div class="md:col-span-6 relative md:pr-6" data-scroll-animate>
				<div class="flex items-start gap-4">
					<span class="font-story italic text-3xl text-amber-200/80 leading-none mt-1">i.</span>
					<div>
						<div class="kicker text-amber-200/70 mb-3">Rooted</div>
						<p class="font-serif text-xl md:text-[22px] leading-[1.55] text-white/95">
							Each EcoHub is <em class="font-story italic">deeply adapted</em> to its local ecology
							and culture — the soil under its feet, the language at its long table, the seasons it
							lives by.
						</p>
					</div>
				</div>
			</div>

			<div class="hidden md:flex md:col-span-1 justify-center self-stretch">
				<div class="w-px bg-gradient-to-b from-transparent via-amber-200/30 to-transparent"></div>
			</div>

			<div class="md:col-span-5 md:pl-2" data-scroll-animate>
				<div class="flex items-start gap-4">
					<span class="font-story italic text-3xl text-amber-200/80 leading-none mt-1">ii.</span>
					<div>
						<div class="kicker text-amber-200/70 mb-3">Connected</div>
						<p class="font-serif text-xl md:text-[22px] leading-[1.55] text-white/95">
							And every hub stays connected to a
							<em class="font-story italic">shared global commons</em> that accelerates learning,
							resilience, and regeneration — so no one has to start from zero.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-20 md:mt-28 max-w-3xl mx-auto text-center" data-scroll-animate>
			<div class="flex items-center justify-center gap-6 mb-8" aria-hidden="true">
				<span class="h-px w-16 bg-amber-200/30"></span>
				<span class="w-1.5 h-1.5 rounded-full bg-amber-300/70"></span>
				<span class="h-px w-16 bg-amber-200/30"></span>
			</div>
			<p class="font-story italic text-2xl md:text-3xl leading-[1.4] text-amber-100/95">
				Local enough to feel like home.<br />
				Connected enough to change everything.
			</p>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     3. THE SIX PRINCIPLES — what holds an EcoHub together
     ═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-32 bg-[#fbfbf9]">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="max-w-3xl mb-16" data-scroll-animate>
			<div class="kicker text-emerald-700 mb-4">The principles that hold a hub</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Six things every EcoHub is, <br />
				<em class="font-story italic font-normal text-stone-500">in its own way.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Each hub is shaped by its land, its people, its history. None of them will look the same.
				But underneath the difference, they share six commitments — the things that, if any are
				missing, it is not really an EcoHub anymore.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-scroll-stagger>
			{#each principles as p (p.number)}
				<article
					class="bg-[#f5f2ea] rounded-3xl p-7 border border-stone-200/70 flex flex-col"
				>
					<div class="flex items-baseline justify-between mb-6">
						<span class="font-story italic text-3xl text-ecohubs-primary">{p.number}</span>
						<span class="kicker text-stone-500">{p.kicker}</span>
					</div>
					<h3 class="font-serif text-2xl text-ecohubs-deep mb-3 leading-snug">{p.title}</h3>
					<p class="text-stone-700 leading-relaxed text-[15px]">{p.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     4. WHAT WE WILL NOT DO — negative vision
     ═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-24 md:py-32 bg-ecohubs-deep text-[#f5f2ea] overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.12), transparent 55%);"
	></div>

	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-3xl mb-16" data-scroll-animate>
			<div class="kicker text-emerald-300/80 mb-5">A vision needs edges</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-[#f5f2ea]">
				What this <em class="font-story italic font-normal text-emerald-300">is not</em>, <br />
				and never will be.
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/80 leading-relaxed max-w-2xl">
				Every honest vision can be confused with three or four similar-looking things. So before we
				go further — these are the things we have decided, carefully, that we are
				<em class="font-story italic">not</em>.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-5" data-scroll-stagger>
			{#each notThis as item (item.title)}
				<div class="p-7 rounded-2xl bg-[#0a3d2e]/50 border border-emerald-900/40">
					<div class="text-xs tracking-widest uppercase text-amber-300/80 mb-3">Not this</div>
					<h3 class="font-serif text-2xl text-white mb-3">{item.title}</h3>
					<p class="text-stone-200/80 leading-relaxed">{@html item.bodyHtml}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     5. THREE HORIZONS
     ═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-[#fbfbf9]">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="max-w-3xl mb-16" data-scroll-animate>
			<div class="kicker text-emerald-700 mb-4">The vision at three scales</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				A hub. A network.
				<em class="font-story italic font-normal text-stone-500">A generation.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				The vision is not one size. It works at three. The smallest is a place you can walk across
				in a morning. The largest is a quiet civilizational shift that takes longer than any of us.
				They depend on each other.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-6 lg:gap-8" data-scroll-stagger>
			<!-- Horizon 1 -->
			<article
				class="relative bg-[#f5f2ea] rounded-3xl p-8 border border-stone-200/70 flex flex-col"
			>
				<div class="kicker text-emerald-700 mb-3">Horizon 01 · this decade</div>
				<h3 class="font-serif text-3xl text-ecohubs-deep leading-tight mb-4">A hub.</h3>
				<p class="font-story italic text-lg text-stone-700 leading-snug mb-6">
					One small, locally rooted community where the way of life is honest, regenerative, and
					human-scale.
				</p>
				<ul class="space-y-2.5 text-[15px] text-stone-700 mb-8">
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						~50–150 people, multi-generational
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Land cared for by the people on it
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Local food, energy, work, learning
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Conflict and decision patterns written down
					</li>
				</ul>
				<div class="mt-auto pt-6 border-t border-stone-200/80 flex justify-center">
					<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
				</div>
			</article>

			<!-- Horizon 2 -->
			<article
				class="relative bg-[#f5f2ea] rounded-3xl p-8 border border-stone-200/70 flex flex-col"
			>
				<div class="kicker text-emerald-700 mb-3">Horizon 02 · next ~15 years</div>
				<h3 class="font-serif text-3xl text-ecohubs-deep leading-tight mb-4">A network.</h3>
				<p class="font-story italic text-lg text-stone-700 leading-snug mb-6">
					Many hubs, in many climates and cultures, sharing what they learn through a living,
					open-source Blueprint.
				</p>
				<ul class="space-y-2.5 text-[15px] text-stone-700 mb-8">
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Hubs across continents, each one local
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Patterns, failures, and tools flow freely
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						No central authority. No franchise.
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						Resilience through plurality, not size
					</li>
				</ul>
				<div class="mt-auto pt-6 border-t border-stone-200/80">
					<svg viewBox="0 0 220 70" class="w-full h-12">
						<g stroke="#064e3b" stroke-opacity="0.25" stroke-width="0.8">
							<line x1="20" y1="35" x2="60" y2="20" />
							<line x1="60" y1="20" x2="110" y2="35" />
							<line x1="110" y1="35" x2="160" y2="18" />
							<line x1="160" y1="18" x2="200" y2="35" />
							<line x1="20" y1="35" x2="60" y2="55" />
							<line x1="60" y1="55" x2="110" y2="35" />
							<line x1="110" y1="35" x2="160" y2="55" />
							<line x1="160" y1="55" x2="200" y2="35" />
						</g>
						<g fill="#059669">
							<circle cx="20" cy="35" r="4" />
							<circle cx="60" cy="20" r="4" />
							<circle cx="60" cy="55" r="4" />
							<circle cx="110" cy="35" r="6" />
							<circle cx="160" cy="18" r="4" />
							<circle cx="160" cy="55" r="4" />
							<circle cx="200" cy="35" r="4" />
						</g>
					</svg>
				</div>
			</article>

			<!-- Horizon 3 -->
			<article
				class="relative bg-ecohubs-deep text-[#f5f2ea] rounded-3xl p-8 border border-emerald-900/40 flex flex-col overflow-hidden"
			>
				<div
					class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
				></div>
				<div class="kicker text-emerald-300/80 mb-3 relative">Horizon 03 · a generation</div>
				<h3 class="font-serif text-3xl leading-tight mb-4 relative">A generation.</h3>
				<p class="font-story italic text-lg text-stone-200/85 leading-snug mb-6 relative">
					A way of life that is no longer alternative — it's just one of the ordinary, available
					answers to "how should we live?"
				</p>
				<ul class="space-y-2.5 text-[15px] text-stone-200/85 mb-8 relative">
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
						Children who grew up inside hubs become adults
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
						Local resilience as a baseline, not a project
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
						Commons-stewarded land, openly governed
					</li>
					<li class="flex gap-3">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
						Civilization, quietly, less brittle
					</li>
				</ul>
				<p
					class="mt-auto pt-6 border-t border-emerald-900/40 text-sm text-stone-300/70 leading-relaxed relative"
				>
					We will probably not see the full shape of this in our lifetimes. That's fine. We are
					<em class="font-story italic">planting trees we will not sit under.</em>
				</p>
			</article>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     6. VALUES — what we hold
     ═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-[#f5f2ea] relative">
	<div class="absolute inset-0 grain pointer-events-none opacity-50"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div class="max-w-3xl mb-16" data-scroll-animate>
			<div class="kicker text-emerald-800 mb-4">The cultural floor</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				Five things we hold <br />
				<em class="font-story italic font-normal text-stone-500">underneath all the rest.</em>
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Tools and patterns are surface. Values are what stays when the tools fail and the patterns
				get edited. These are the five we keep coming back to.
			</p>
		</div>

		<div class="space-y-3 max-w-4xl" data-scroll-stagger>
			{#each values as v (v.number)}
				<article
					class="grid md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-start p-6 md:p-8 rounded-2xl bg-white border border-stone-200/70 hover:border-emerald-700/40 transition-colors"
				>
					<div>
						<div class="kicker text-stone-500 mb-2">Value {v.number}</div>
						<div class="font-story italic text-2xl text-ecohubs-primary leading-tight">
							{v.title}
						</div>
					</div>
					<p class="text-stone-700 leading-relaxed text-[16px] md:text-lg">
						{@html v.bodyHtml}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     7. HOW A VISION BECOMES A PLACE — the loop
     ═══════════════════════════════════════════════════════════════════ -->
<section class="py-24 md:py-36 bg-[#fbfbf9]">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="max-w-3xl mb-16" data-scroll-animate>
			<div class="kicker text-emerald-700 mb-4">From idea to ground</div>
			<h2 class="font-serif text-4xl md:text-5xl text-ecohubs-deep leading-tight">
				How a vision <em class="font-story italic font-normal text-stone-500">actually becomes</em>
				<br />
				a place you can stand in.
			</h2>
			<p class="mt-6 text-lg text-stone-700 leading-relaxed">
				Most beautiful visions never leave the page. We have built the work as a loop, not a launch
				— so that every hub teaches the network something, and the next hub starts from a slightly
				stronger Blueprint than the last.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<div class="relative aspect-square max-w-[480px] mx-auto w-full" data-scroll-animate>
				<svg viewBox="0 0 400 400" class="w-full h-full">
					<circle
						cx="200"
						cy="200"
						r="170"
						fill="none"
						stroke="#064e3b"
						stroke-opacity="0.12"
						stroke-width="1"
					/>
					<defs>
						<marker
							id="vision-loop-arrow"
							viewBox="0 0 10 10"
							refX="6"
							refY="5"
							markerWidth="6"
							markerHeight="6"
							orient="auto-start-reverse"
						>
							<path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
						</marker>
					</defs>
					<g
						stroke="#059669"
						stroke-width="1.5"
						fill="none"
						marker-end="url(#vision-loop-arrow)"
						stroke-opacity="0.6"
					>
						<path d="M 200,30 A 170,170 0 0,1 347,114" />
						<path d="M 347,114 A 170,170 0 0,1 347,286" />
						<path d="M 347,286 A 170,170 0 0,1 200,370" />
						<path d="M 200,370 A 170,170 0 0,1 53,286" />
						<path d="M 53,286 A 170,170 0 0,1 53,114" />
						<path d="M 53,114 A 170,170 0 0,1 200,30" />
					</g>

					<g font-family="Pridi, serif" font-size="13" fill="#064e3b" text-anchor="middle">
						<g>
							<circle cx="200" cy="30" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="200" y="35" font-style="italic">01</text>
						</g>
						<g>
							<circle cx="347" cy="114" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="347" y="119" font-style="italic">02</text>
						</g>
						<g>
							<circle cx="347" cy="286" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="347" y="291" font-style="italic">03</text>
						</g>
						<g>
							<circle cx="200" cy="370" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="200" y="375" font-style="italic">04</text>
						</g>
						<g>
							<circle cx="53" cy="286" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="53" y="291" font-style="italic">05</text>
						</g>
						<g>
							<circle cx="53" cy="114" r="22" fill="#fbfbf9" stroke="#059669" stroke-width="1.5" />
							<text x="53" y="119" font-style="italic">06</text>
						</g>
					</g>

					<circle cx="200" cy="200" r="56" fill="#0b2e24" />
					<text
						x="200"
						y="195"
						text-anchor="middle"
						font-family="Pridi, serif"
						font-size="14"
						fill="#a7f3d0">A living</text
					>
					<text
						x="200"
						y="215"
						text-anchor="middle"
						font-family="Fraunces, serif"
						font-style="italic"
						font-size="20"
						fill="#fbfbf9">Blueprint</text
					>
				</svg>
			</div>

			<ol class="space-y-6" data-scroll-stagger>
				{#each loopSteps as step (step.number)}
					<li class="grid grid-cols-[auto_1fr] gap-5">
						<span class="font-story italic text-2xl text-ecohubs-primary w-10 shrink-0"
							>{step.number}</span
						>
						<div>
							<h3 class="font-serif text-xl text-ecohubs-deep mb-1.5">{step.title}</h3>
							<p class="text-stone-700 leading-relaxed">{@html step.bodyHtml}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
     8. CLOSING MANIFESTO + CTA
     ═══════════════════════════════════════════════════════════════════ -->
<section class="relative py-28 md:py-40 overflow-hidden">
	<div class="absolute inset-0 -z-10 bg-ecohubs-deep"></div>
	<div
		class="absolute inset-0 -z-10 opacity-40"
		style="background-image: radial-gradient(circle at 20% 30%, rgba(16,185,129,0.32), transparent 50%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.18), transparent 55%);"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8 text-center text-[#f5f2ea]">
		<div class="kicker text-emerald-300 mb-6" data-scroll-animate>
			Where it ends · where it starts
		</div>

		<h2
			class="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10"
			data-scroll-animate
		>
			The future is not <br class="hidden md:block" />
			a place we are <em class="font-story italic font-normal text-emerald-300">going.</em>
		</h2>

		<p
			class="font-serif text-2xl md:text-3xl leading-snug text-stone-200/90 max-w-3xl mx-auto mb-14"
			data-scroll-animate
		>
			It is a place we are
			<em class="font-story italic text-[#f5f2ea] font-normal">creating together</em>, one hub at a time.
		</p>

		<div class="mx-auto w-16 h-px bg-emerald-500/40 mb-12"></div>

		<p
			class="text-lg text-stone-200/80 leading-relaxed mb-10 max-w-xl mx-auto"
			data-scroll-animate
		>
			If any of this felt familiar — like something you have already been quietly carrying — there's
			a place for you in the work. There are many ways in. None of them require you to move
			tomorrow.
		</p>

		<div class="flex flex-col sm:flex-row justify-center gap-3" data-scroll-animate>
			<a
				href="/membership"
				class="px-8 py-4 bg-[#f5f2ea] text-ecohubs-deep font-medium rounded-full hover:bg-white transition-colors"
			>
				Become a founding member
			</a>
			<a
				href="/blueprint"
				class="px-8 py-4 border border-emerald-300/50 text-emerald-100 font-medium rounded-full hover:bg-emerald-900/40 transition-colors"
			>
				Read the Blueprint
			</a>
		</div>

		<p class="mt-12 text-xs text-emerald-200/60 tracking-widest uppercase">
			Non-speculative · Non-ideological · Built in the open
		</p>
	</div>
</section>

<style>
	/* ─────────────────────────────────────────────────────────────────────────
     Animations: keyframes + FOUC guard for scroll-triggered reveals
     ───────────────────────────────────────────────────────────────────── */
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
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.6);
			opacity: 0;
		}
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

	/* ─────────────────────────────────────────────────────────────────────────
     Typography utilities
     ───────────────────────────────────────────────────────────────────── */
	:global(main p),
	:global(main li),
	:global(main blockquote),
	:global(main span:not([class*='font-'])),
	:global(main div:not([class*='font-'])) {
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			sans-serif;
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

	:global(.grain)::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.5;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
		margin: 0 auto;
	}
</style>
