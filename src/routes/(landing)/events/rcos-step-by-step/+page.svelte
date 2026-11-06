<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import { SEO_CONFIG } from '$lib/config/seo';
	import {
		rcosWorkshop as series,
		sessions,
		seriesPhase,
		sessionState,
		sessionEnd,
		nextSession,
		recordedCount,
		templateUrl,
		rcosLayerUrl,
		formatSessionTime,
		type WorkshopSession
	} from '$lib/config/rcos-workshop';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';

	import logo from '$lib/assets/Logo.svg';
	import writingTheRules from '$lib/assets/rcos-workshop/writing-the-rules.webp?enhanced';
	import askingTheQuestion from '$lib/assets/rcos-workshop/asking-the-question.webp?enhanced';
	// A square crop of the Mycelium portrait, so the face fills the 80px circle.
	import stefan from '$lib/assets/rcos-workshop/stefan-headshot.webp?enhanced';

	import { howItWorks, forWho, selfGuide, practical } from './data';

	let { data, form } = $props();

	// The server's clock first, so hydration matches the cached HTML; then the
	// reader's, ticking each minute so a page left open moves from "register"
	// to "live" to "recording soon" on its own. A `?phase=` preview is fixed.
	let now = $state(new Date(data.renderedAt));
	const phase = $derived(data.preview ? data.phase : seriesPhase(now));
	const over = $derived(phase === 'over');
	const next = $derived(over ? null : nextSession(now));
	const nextLive = $derived(next ? sessionState(next, now) === 'live' : false);
	// Claims about recordings count the videos that are actually up: the last
	// session can be over before its recording is.
	const recorded = recordedCount();

	/** The next session in the reader's own time zone — only after mount, so SSR stays stable. */
	let mounted = $state(false);
	const localTime = $derived.by(() => {
		if (!mounted || !next?.startsAt) return null;
		if (-next.startsAt.getTimezoneOffset() === -5 * 60) return null;
		return new Intl.DateTimeFormat(undefined, {
			weekday: 'short',
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short'
		}).format(next.startsAt);
	});

	function trackRegister(location: string, session: WorkshopSession) {
		window.gtag?.('event', 'link_click', {
			link_label: `Register part ${session.part}`,
			link_url: session.lumaUrl,
			link_location: `rcos_step_by_step_${location}`
		});
	}

	// "Tell me when" — the same /api/newsletter the site footer posts to.
	let email = $state('');
	let sent = $state<'idle' | 'sending' | 'done' | 'error'>('idle');
	let sentError = $state('');
	// Without JavaScript the form posts to this page's action instead; its
	// result arrives as `form`.
	const status = $derived(
		sent !== 'idle' ? sent : form?.subscribed ? 'done' : form?.message ? 'error' : 'idle'
	);
	const errorMessage = $derived(sentError || form?.message || '');

	async function subscribe(event: SubmitEvent) {
		event.preventDefault();
		sent = 'sending';
		sentError = '';
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const body = (await res.json().catch(() => ({}))) as { message?: string };
			if (!res.ok) throw new Error(body.message || 'Could not subscribe. Please try again.');
			sent = 'done';
			window.gtag?.('event', 'newsletter_signup', { location: 'rcos_step_by_step' });
		} catch (err) {
			sent = 'error';
			sentError = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
		}
	}

	onMount(() => {
		now = new Date();
		mounted = true;
		const tick = setInterval(() => (now = new Date()), 60_000);

		if (!prefersReducedMotion()) {
			initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
			initStaggeredScrollAnimations('[data-scroll-stagger]', {
				threshold: 0.15,
				staggerDelay: 0.08
			});
		}

		return () => clearInterval(tick);
	});

	const code = (s: WorkshopSession) => (s.layer === undefined ? 'Intro' : `L${s.layer}`);
	const pad = (n: number) => String(n).padStart(2, '0');

	// One Event per dated session, gathered into a series. Undated parts are
	// left out rather than given an invented date.
	const seriesSchema = {
		'@context': 'https://schema.org',
		'@type': 'EventSeries',
		name: series.fullTitle,
		description:
			'A free eight-part online workshop series applying RCOS, the Regenerative Community Operating System, to a community one layer at a time.',
		url: `${SEO_CONFIG.siteUrl}${series.path}`,
		eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
		organizer: {
			'@type': 'Organization',
			name: SEO_CONFIG.organization.name,
			url: SEO_CONFIG.siteUrl
		},
		subEvent: sessions
			.filter((s) => s.startsAt && s.lumaUrl)
			.map((s) => ({
				'@type': 'Event',
				name: `RCOS: ${s.title} (Part ${s.part}/8)`,
				startDate: s.startsAt!.toISOString(),
				endDate: sessionEnd(s)!.toISOString(),
				eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
				eventStatus: 'https://schema.org/EventScheduled',
				location: { '@type': 'VirtualLocation', url: s.lumaUrl },
				offers: { '@type': 'Offer', url: s.lumaUrl, price: '0', priceCurrency: 'USD' }
			}))
	};

	const mono = 'font-mono text-[11px] tracking-[0.1em] uppercase';
	const accentBtn =
		'no-external-decoration inline-flex items-center justify-center whitespace-nowrap rounded-full bg-ecohubs-accent font-semibold text-ecohubs-deep transition-colors hover:bg-amber-400';
</script>

<SEO
	title="RCOS, step by step — a free 8-part online workshop · EcoHubs"
	description="Apply the Regenerative Community Operating System to your community, one layer per session. Free, online, eight parts, with every session recorded."
	ogImage="/og-rcos.jpg"
	ogImageAlt="RCOS — the Regenerative Community Operating System"
	canonical={series.path}
	jsonLd={seriesSchema}
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Events', url: 'https://ecohubs.community/events' },
		{ name: series.name, url: `https://ecohubs.community${series.path}` }
	]}
/>

{#snippet registerButton(session: WorkshopSession, size: 'sm' | 'lg', location: string)}
	<a
		href={session.lumaUrl}
		target="_blank"
		rel="noopener noreferrer"
		onclick={() => trackRegister(location, session)}
		class="{accentBtn} {size === 'sm' ? 'px-4 py-2 text-sm' : 'px-7 py-4 text-[17px]'}"
	>
		{#if sessionState(session, now) === 'live'}
			Join Part {session.part} now
		{:else if size === 'sm'}
			<span class="sm:hidden">Register</span><span class="hidden sm:inline"
				>Register for Part {session.part}</span
			>
		{:else}
			Register for Part {session.part} · free
		{/if}
	</a>
{/snippet}

<div class="bg-ecohubs-base font-['Inter_Variable',Inter,system-ui,sans-serif] text-ecohubs-text">
	<!-- Sticky series header — a standalone landing page carries its own nav. -->
	<div
		class="sticky top-0 z-50 border-b border-ecohubs-light/10 bg-ecohubs-deep/90 backdrop-blur-md"
	>
		<div class="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-2.5">
			<a href="#top" class="flex items-center gap-2.5 text-ecohubs-ivory">
				<img src={logo} alt="EcoHubs" class="size-7" />
				<span class="whitespace-nowrap font-serif text-base font-medium sm:text-lg"
					>{series.name}</span
				>
			</a>
			<div class="flex items-center gap-6">
				<nav class="hidden gap-5 text-sm md:flex" aria-label="Page sections">
					<a href="#sessions" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">Sessions</a>
					<a href="#how" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">How it works</a>
					<a href="#hosts" class="text-ecohubs-ivory/80 hover:text-ecohubs-light">Hosts</a>
				</nav>
				{#if next?.lumaUrl}
					{@render registerButton(next, 'sm', 'header')}
				{:else}
					<a
						href="#sessions"
						class="whitespace-nowrap rounded-full border border-ecohubs-ivory/30 px-4 py-2 text-sm font-medium text-ecohubs-ivory transition-colors hover:border-ecohubs-light"
					>
						{recorded ? 'Watch the sessions' : 'See the sessions'}
					</a>
				{/if}
			</div>
		</div>
	</div>

	<main>
		<!-- ═══ HERO ═══
		     Light, with the whole syllabus on the first screen: someone sent this
		     link should see the eight steps before they scroll. -->
		<header id="top" class="bg-ecohubs-ivory">
			<div
				class="mx-auto grid max-w-[1180px] items-center gap-10 px-6 pb-10 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-14"
			>
				<div
					data-hero-step="0.3"
					style="--hero-delay: 0.3s"
					class="order-2 lg:order-1 lg:col-span-5"
				>
					<enhanced:img
						src={writingTheRules}
						alt="A group sits on the grass above the sea and writes their community's rules together on a large sheet"
						sizes="(min-width: 1024px) 440px, 100vw"
						loading="eager"
						fetchpriority="high"
						class="aspect-[4/3] w-full rounded-3xl border border-stone-300/60 object-cover"
					/>
				</div>
				<div class="order-1 lg:order-2 lg:col-span-7">
					<div
						data-hero-step="0.05"
						style="--hero-delay: 0.05s"
						class="font-mono text-xs uppercase tracking-[0.14em] text-emerald-700"
					>
						{over
							? 'A step-by-step guide in eight recordings'
							: `Free online workshop · 8 parts · with Stefan & ${series.coHost}`}
					</div>
					<h1
						data-hero-step="0.15"
						style="--hero-delay: 0.15s"
						class="mt-4 text-balance font-serif text-[clamp(46px,6.6vw,80px)] font-normal leading-none tracking-tight text-ecohubs-deep"
					>
						RCOS,
						<em class="font-story font-light italic text-ecohubs-primary">step by step.</em>
					</h1>
					<p
						data-hero-step="0.3"
						style="--hero-delay: 0.3s"
						class="mt-6 max-w-[600px] text-pretty text-lg leading-relaxed text-stone-700 md:text-[19px]"
					>
						{#if over}
							Apply the Regenerative Community Operating System to your own community at your own
							pace. Watch in order, keep the template open, and pause to write your own answers.
						{:else if recorded}
							Apply the Regenerative Community Operating System to your own community, one layer per
							session. Missed one? Every session is recorded and posted below, next to its template.
						{:else}
							Apply the Regenerative Community Operating System to your own community. One
							introduction, then one layer per session, through each template definition by
							definition, with worked examples from {series.coHost}.
						{/if}
					</p>
					<div
						data-hero-step="0.42"
						style="--hero-delay: 0.42s"
						class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
					>
						{#if next?.lumaUrl}
							<a
								href={next.lumaUrl}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => next && trackRegister('hero', next)}
								class="no-external-decoration rounded-full bg-ecohubs-dark px-7 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
							>
								{nextLive ? `Join Part ${next.part} now` : `Register for Part ${next.part} · free`}
							</a>
						{:else}
							<a
								href={recorded ? '#part-1' : '#sessions'}
								class="rounded-full bg-ecohubs-dark px-7 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
							>
								{recorded ? 'Start with Part 1' : 'See the sessions'}
							</a>
						{/if}
						<span class="font-mono text-[13px] text-stone-600">
							{#if next?.startsAt}
								{formatSessionTime(next.startsAt)} · Zoom
							{:else if over}
								{recorded === 8 ? '8 recordings' : `${recorded} of 8 recorded`} · free
							{:else}
								Next date coming soon
							{/if}
						</span>
					</div>
					{#if localTime && next}
						<p class="mt-3 text-sm text-stone-600">
							Part {next.part} in your time zone: {localTime}
						</p>
					{/if}
				</div>
			</div>

			<!-- The syllabus: every part, its state, and a jump to its card. -->
			<div class="mx-auto max-w-[1180px] px-6 pb-16">
				<section
					aria-label="The eight sessions at a glance"
					data-hero-step="0.5"
					style="--hero-delay: 0.5s"
					class="rounded-3xl border border-stone-200/80 bg-white px-5 pb-5 pt-5 soft-shadow md:px-6"
				>
					<div class="mb-4 flex items-baseline justify-between gap-4">
						<h2 class="{mono} text-stone-600">The eight sessions</h2>
						<span class="font-mono text-xs text-stone-600">
							{recorded === 8
								? 'All 8 recorded'
								: recorded
									? `${recorded} of 8 recorded`
									: 'Every session is recorded'}
						</span>
					</div>
					<ol class="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
						{#each sessions as s (s.part)}
							{@const st = sessionState(s, now)}
							{@const isNext = s === next}
							<li>
								<a
									href="#part-{s.part}"
									class="group flex h-full flex-col gap-1.5 border-t-[3px] pt-3
										{st === 'recorded'
										? 'border-ecohubs-primary'
										: isNext
											? 'border-ecohubs-accent'
											: 'border-stone-200'}"
								>
									<span class="font-mono text-[11px] uppercase text-emerald-700"
										>{pad(s.part)} · {code(s)}</span
									>
									<span
										class="min-h-10 font-serif text-base leading-tight text-ecohubs-text group-hover:text-ecohubs-dark"
										>{s.short}</span
									>
									<span
										class="font-mono text-[10.5px] uppercase tracking-[0.04em]
											{st === 'recorded' ? 'text-emerald-700' : isNext ? 'text-amber-700' : 'text-stone-500'}"
									>
										{#if st === 'recorded'}
											Watch →
										{:else if st === 'live'}
											Live now
										{:else if st === 'scheduled'}
											{formatSessionTime(s.startsAt!).split(' · ')[0]}
										{:else if st === 'processing'}
											Recording soon
										{:else}
											Date TBA
										{/if}
									</span>
								</a>
							</li>
						{/each}
					</ol>
				</section>
			</div>
		</header>

		<!-- ═══ WHY ═══ -->
		<section class="bg-ecohubs-base">
			<div
				class="mx-auto grid max-w-[1180px] items-start gap-14 px-6 py-24 md:grid-cols-2"
				data-scroll-animate="fade-up"
			>
				<div>
					<div class="kicker mb-4 font-mono text-ecohubs-dark">Why a series</div>
					<h2 class="text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]">
						A standard is easy to agree with and hard to apply.
					</h2>
				</div>
				<div class="flex flex-col gap-5 text-lg leading-relaxed text-stone-700">
					<p class="text-pretty">
						<a
							href="/rcos"
							class="border-b border-ecohubs-dark/40 text-ecohubs-dark hover:border-ecohubs-dark"
							>RCOS</a
						>
						names the questions every community has to answer: why it exists, who belongs, who decides,
						how money and land are shared, what happens in a conflict, who does the work, and how the
						rules change. Seven layers, each with a template.
					</p>
					<p class="text-pretty">
						Reading the templates alone, most people stall somewhere around the third definition. So
						we read them together, one layer per session, and talk through what each definition
						would look like in a community that actually exists.
					</p>
					<ul class="mt-2 flex flex-col gap-3 border-t border-stone-300 pt-6 text-base">
						{#each forWho as line}
							<li class="grid grid-cols-[20px_1fr] gap-1 text-stone-700">
								<span aria-hidden="true" class="text-ecohubs-primary">—</span>{line}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- ═══ SESSIONS ═══ -->
		<section id="sessions" class="scroll-mt-16 bg-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-24 md:py-28">
				<div class="mb-12 grid items-end gap-8 md:grid-cols-2" data-scroll-animate="fade-up">
					<div>
						<div class="kicker mb-4 font-mono text-ecohubs-dark">The eight sessions</div>
						<h2 class="text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]">
							From why you exist to how you change.
						</h2>
					</div>
					<p class="text-pretty text-[17px] leading-relaxed text-stone-600">
						The layers build on each other, so the order matters. Each session gets its date here
						and on Luma once it is set, and its recording goes up on this page afterwards.
					</p>
				</div>

				<ol class="flex flex-col gap-5">
					{#each sessions as s (s.part)}
						{@const state = sessionState(s, now)}
						{@const isNext = s === next}
						<li
							id="part-{s.part}"
							data-scroll-animate="fade-up"
							class="scroll-mt-20 rounded-3xl border bg-white p-6 soft-shadow transition-colors md:p-8
								{isNext ? 'border-ecohubs-accent/60' : 'border-stone-200/80 hover:border-ecohubs-primary/50'}"
						>
							<div class="grid gap-6 md:grid-cols-[88px_minmax(0,1fr)_auto] md:items-start">
								<div class="flex items-baseline gap-3 md:block">
									<div class="font-serif text-[48px] leading-none text-ecohubs-dark">
										{pad(s.part)}
									</div>
									<div class="{mono} text-ecohubs-primary md:mt-2">{code(s)}</div>
								</div>

								<div>
									<div class="{mono} mb-2 text-stone-500">Part {s.part} of 8</div>
									<h3 class="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.15]">
										{s.title}
									</h3>
									<p class="mt-1.5 font-story text-lg italic leading-snug text-stone-600">
										{s.question}
									</p>
									{#if s.layer !== undefined}
										<div class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium">
											<a
												href={templateUrl(s.layer)}
												target="_blank"
												rel="noopener noreferrer"
												class="no-external-decoration text-ecohubs-dark hover:text-ecohubs-primary"
												>Layer {s.layer} template ↗</a
											>
											<a
												href={rcosLayerUrl(s.layer)}
												target="_blank"
												rel="noopener noreferrer"
												class="no-external-decoration text-ecohubs-dark hover:text-ecohubs-primary"
												>Read the layer ↗</a
											>
										</div>
									{/if}
								</div>

								<div
									class="flex flex-col items-start gap-2 md:min-w-[220px] md:items-end md:text-right"
								>
									{#if state === 'live'}
										<span class="flex items-center gap-2 {mono} text-ecohubs-accent">
											<span
												class="pulse-dot relative inline-block size-2 rounded-full bg-ecohubs-accent"
											></span>
											Live now
										</span>
										{#if s.lumaUrl}{@render registerButton(s, 'sm', `part_${s.part}`)}{/if}
									{:else if state === 'scheduled'}
										<span class="{mono} text-ecohubs-dark">{formatSessionTime(s.startsAt!)}</span>
										{#if isNext && localTime}
											<span class="text-sm text-stone-500">Your time: {localTime}</span>
										{/if}
										{#if s.lumaUrl}{@render registerButton(s, 'sm', `part_${s.part}`)}{/if}
									{:else if state === 'processing'}
										<span class="{mono} text-stone-500">Recording coming soon</span>
									{:else if state === 'unscheduled'}
										<span class="{mono} text-stone-500">Date to be announced</span>
										<a
											href="#notify"
											class="border-b border-ecohubs-dark/40 pb-0.5 text-sm text-ecohubs-dark hover:border-ecohubs-dark"
											>Tell me when</a
										>
									{:else}
										<span class="{mono} text-ecohubs-primary">Recorded</span>
									{/if}
								</div>
							</div>

							{#if s.videoId}
								<div class="mt-7">
									<LiteYouTube
										videoId={s.videoId}
										title="RCOS, step by step — Part {s.part}: {s.title}"
										frameClass="rounded-2xl border border-stone-200"
									/>
								</div>
							{/if}
						</li>
					{/each}
				</ol>
			</div>
		</section>

		<!-- ═══ HOW A SESSION WORKS ═══ -->
		<section id="how" class="scroll-mt-16 bg-ecohubs-deep text-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-24 md:py-28">
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-light">How a session works</div>
					<h2
						class="mb-14 max-w-[820px] text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]"
					>
						We don’t fill in the whole template. We make it make sense.
					</h2>
				</div>
				<div data-scroll-stagger class="grid gap-4 md:grid-cols-3">
					{#each howItWorks as item, i}
						<div class="rounded-2xl border border-ecohubs-ivory/10 bg-ecohubs-ivory/5 p-7">
							<div class="{mono} mb-3 text-ecohubs-light">{pad(i + 1)} · {item.label}</div>
							<h3 class="mb-2 font-serif text-2xl">{item.title}</h3>
							<p class="text-[15px] leading-relaxed text-ecohubs-ivory/75">{item.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══ ON YOUR OWN ═══ -->
		<section class="bg-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-24 md:py-28">
				<div class="mb-14 grid items-end gap-8 md:grid-cols-2" data-scroll-animate="fade-up">
					<div>
						<div class="kicker mb-4 font-mono text-ecohubs-dark">Can’t make it live?</div>
						<h2 class="text-balance font-serif text-[clamp(32px,4.4vw,52px)] leading-[1.08]">
							Use the recordings as a step-by-step guide.
						</h2>
					</div>
					<p class="text-pretty text-[17px] leading-relaxed text-stone-600">
						Every session is recorded and posted here, next to the template it works through. That
						makes the series usable in your own time, with your own group, at whatever pace your
						community can manage.
					</p>
				</div>
				<div data-scroll-stagger class="grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
					{#each selfGuide as step}
						<div class="border-t border-ecohubs-text pt-4">
							<div class="mb-2.5 font-mono text-xs uppercase text-ecohubs-primary">
								{step.label}
							</div>
							<h3 class="mb-2 font-serif text-[22px] leading-tight">{step.title}</h3>
							<p class="text-[15px] leading-relaxed text-stone-600">{step.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══ HOSTS + INTRO VIDEO ═══ -->
		<section id="hosts" class="scroll-mt-16 bg-ecohubs-base">
			<div
				class="mx-auto grid max-w-[1180px] items-center gap-14 px-6 py-24 md:py-28 lg:grid-cols-2"
			>
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-6 font-mono text-ecohubs-dark">Your hosts</div>
					<div class="flex flex-col gap-8">
						<div class="flex gap-5">
							<!-- The wrapper, not the img, is the flex item: <picture> would shrink. -->
							<div class="size-20 shrink-0">
								<enhanced:img
									src={stefan}
									alt="Stefan Lessle"
									sizes="80px"
									loading="lazy"
									class="size-20 rounded-full object-cover ring-1 ring-stone-300"
								/>
							</div>
							<div>
								<h3 class="font-serif text-2xl leading-tight">{series.host}</h3>
								<p class="mt-0.5 text-sm text-ecohubs-muted">Initiator of EcoHubs and RCOS</p>
								<p class="mt-3 text-[15px] leading-relaxed text-stone-700">
									Systems designer, based in coastal Ecuador. Has spent years studying why most
									intentional communities fail, and wrote RCOS to make the structures that hold them
									together explicit.
								</p>
							</div>
						</div>
						<div class="flex gap-5">
							<div
								aria-hidden="true"
								class="flex size-20 shrink-0 items-center justify-center rounded-full bg-ecohubs-ivory font-serif text-3xl text-ecohubs-dark ring-1 ring-stone-300"
							>
								S
							</div>
							<div>
								<h3 class="font-serif text-2xl leading-tight">{series.coHost}</h3>
								<p class="mt-0.5 text-sm text-ecohubs-muted">Co-host</p>
								<p class="mt-3 text-[15px] leading-relaxed text-stone-700">
									A founding member of Golden World. A builder by hand and heart, he stewards
									Sushumna, an eco-living sanctuary in the jungle of Mexico near the ocean. His work
									is devoted to living Vedic principles of simplicity, ahimsa and divine love in
									community.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div data-scroll-animate="fade-up">
					<div class="kicker mb-4 font-mono text-ecohubs-dark">Before Part 1</div>
					<LiteYouTube
						videoId={series.introVideoId}
						title="An introduction to RCOS — the Regenerative Community Operating System"
					/>
					<p class="mt-4 text-[15px] leading-relaxed text-stone-600">
						Want a head start? This 19-minute introduction covers what RCOS is and why it exists.
						The full standard is at
						<a
							href={series.specUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="text-ecohubs-dark underline underline-offset-2 hover:text-ecohubs-primary"
							>rcos.ecohubs.community</a
						>.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══ PRACTICAL + NOTIFY ═══ -->
		<section class="bg-ecohubs-ivory">
			<div class="mx-auto max-w-[1180px] px-6 py-24 md:py-28">
				<div class="kicker mb-4 font-mono text-ecohubs-dark">Practical</div>
				<h2 class="mb-12 font-serif text-[clamp(28px,3.6vw,40px)] leading-[1.1]">
					Everything you need to know
				</h2>
				<div class="grid border-t border-stone-300 sm:grid-cols-2 lg:grid-cols-3">
					{#each practical as item}
						<div class="border-b border-stone-300 py-6 pr-6">
							<div class="{mono} mb-2 text-ecohubs-primary">{item.label}</div>
							<p class="text-base leading-relaxed text-stone-700">{item.body}</p>
						</div>
					{/each}
				</div>

				<div
					id="notify"
					class="mt-16 grid scroll-mt-20 items-center gap-8 rounded-3xl bg-ecohubs-deep p-8 text-ecohubs-ivory md:grid-cols-2 md:p-10"
				>
					<div>
						<div class="{mono} mb-3 text-ecohubs-light">New dates</div>
						<h3 class="font-serif text-[clamp(24px,3vw,34px)] leading-[1.15]">
							Hear when the next session is set.
						</h3>
						<p class="mt-3 text-[15px] leading-relaxed text-ecohubs-ivory/75">
							Dates go up here and on Luma first. The EcoHubs newsletter announces each one, along
							with the recordings. It’s rare, and you can leave any time.
						</p>
					</div>
					<!-- POST, so a submit before hydration never puts the address in a URL. -->
					<form method="POST" class="flex flex-col gap-3" onsubmit={subscribe}>
						<div class="flex flex-col gap-3 sm:flex-row">
							<label class="sr-only" for="notify-email">Email address</label>
							<input
								id="notify-email"
								type="email"
								name="email"
								required
								bind:value={email}
								placeholder="your@email.com"
								disabled={status === 'sending' || status === 'done'}
								class="flex-1 rounded-full border border-ecohubs-light/25 bg-ecohubs-ivory/5 px-5 py-3.5 text-ecohubs-ivory placeholder:text-ecohubs-light/40 focus:border-ecohubs-light/70 focus:outline-none disabled:opacity-60"
							/>
							<button
								type="submit"
								disabled={status === 'sending' || status === 'done'}
								class="whitespace-nowrap rounded-full bg-ecohubs-ivory px-6 py-3.5 font-medium text-ecohubs-deep transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
							>
								{status === 'sending' ? 'Sending…' : status === 'done' ? 'Thank you' : 'Notify me'}
							</button>
						</div>
						{#if status === 'done'}
							<p class="text-sm text-ecohubs-light" role="status">
								Check your inbox to confirm your address.
							</p>
						{:else if status === 'error'}
							<p class="text-sm text-amber-300" role="alert">{errorMessage}</p>
						{/if}
						<p class="text-xs text-ecohubs-ivory/55">
							We never pass your address on.
							<a href="/privacy" class="underline underline-offset-2 hover:text-ecohubs-ivory"
								>How we handle your data</a
							>
						</p>
					</form>
				</div>
			</div>
		</section>

		<!-- ═══ FINAL INVITATION ═══ -->
		<section class="relative overflow-hidden bg-ecohubs-deep text-ecohubs-ivory">
			<enhanced:img
				src={askingTheQuestion}
				alt=""
				sizes="100vw"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover opacity-30"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-ecohubs-deep via-ecohubs-deep/70 to-ecohubs-deep/90"
			></div>
			<div
				class="relative mx-auto flex max-w-[860px] flex-col items-center px-6 py-32 text-center"
				data-scroll-animate="fade-up"
			>
				<img src={logo} alt="" class="mb-7 size-14" />
				<h2
					class="text-balance font-story text-[clamp(32px,5vw,58px)] font-light italic leading-[1.12]"
				>
					Most communities write their rules down after something has gone wrong. This is a chance
					to do it before.
				</h2>
				<div class="mt-11 flex flex-wrap justify-center gap-3.5">
					{#if next?.lumaUrl}
						{@render registerButton(next, 'lg', 'final')}
					{:else}
						<a href="#part-1" class="{accentBtn} px-8 py-4 text-lg">
							{recorded ? 'Start with Part 1' : 'See the sessions'}
						</a>
					{/if}
				</div>
				<p class="mt-4 text-sm text-ecohubs-ivory/60">
					{series.place} · {series.price} · Hosted by {series.host} and {series.coHost}
				</p>
			</div>
		</section>
	</main>

	<footer class="bg-ecohubs-deep text-ecohubs-light/60">
		<div
			class="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 border-t border-ecohubs-light/10 px-6 py-9 text-sm"
		>
			<div class="flex items-center gap-3">
				<a href="/" class="flex shrink-0"><img src={logo} alt="EcoHubs" class="size-6" /></a>
				<span>{series.name} · an online workshop series by EcoHubs</span>
			</div>
			<nav class="flex flex-wrap gap-5" aria-label="Related links">
				<a href="/rcos" class="text-ecohubs-ivory/75 hover:text-ecohubs-light">About RCOS</a>
				<a
					href={series.templatesUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="no-external-decoration text-ecohubs-ivory/75 hover:text-ecohubs-light"
					>Templates ↗</a
				>
				<a href="/events" class="text-ecohubs-ivory/75 hover:text-ecohubs-light">Events</a>
				<a href="/" class="text-ecohubs-ivory/75 hover:text-ecohubs-light">EcoHubs</a>
			</nav>
		</div>
	</footer>
</div>
