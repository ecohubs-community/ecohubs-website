<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import SEO from '$lib/components/SEO.svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import WaitlistForm from '$lib/components/waitlist/WaitlistForm.svelte';
	import WaitlistProfileModal from '$lib/components/waitlist/WaitlistProfileModal.svelte';
	import { initMauticTracking } from '$lib/utils/mautic';
	import { initScrollAnimations, initStaggeredScrollAnimations } from '$lib/utils/scroll-animations';
	import { SEO_CONFIG } from '$lib/config/seo';
	import { Users, MapPin, Coins, Network } from 'lucide-svelte';

	import LogoSrc from '$lib/assets/Logo.svg';
	import HeroImage from '$lib/assets/waitlist/hero-ecohub.webp?enhanced';
	import JavierProfile from '$lib/assets/waitlist/javier-profile.webp?enhanced';
	import JavierHub from '$lib/assets/waitlist/javier-hub.webp?enhanced';
	import JavierDome from '$lib/assets/waitlist/javier-dome.webp?enhanced';
	import JavierGreenhouse from '$lib/assets/waitlist/javier-greenhouse.webp?enhanced';
	import StefanImg from '$lib/assets/waitlist/stefan.webp?enhanced';
	import LuisaImg from '$lib/assets/waitlist/luisa.webp?enhanced';
	import CalebeImg from '$lib/assets/waitlist/calebe.webp?enhanced';

	const SEO_PAGE = SEO_CONFIG.pages.waitlist;

	/* ─── Content data ───────────────────────────────────────────── */
	const principles = [
		{
			n: '01',
			title: "Regenerate, don't sustain.",
			body: 'Leave soil, water and people better.'
		},
		{ n: '02', title: 'People before infrastructure.', body: 'Settle the human system first.' },
		{ n: '03', title: 'Belonging by design.', body: 'Clear roles, fair repair, real voice.' },
		{ n: '04', title: 'Replicable, not precious.', body: 'Built so the next hub is easier.' }
	];

	const pillars = [
		{
			icon: Users,
			title: 'Human structure',
			note: '(RCOS)',
			body: "Explicit, agreed rules for decisions, roles and repair — so communities don't fail on conflict.",
			href: 'https://rcos.ecohubs.community',
			cta: 'Explore RCOS →'
		},
		{
			icon: MapPin,
			title: 'The right place',
			body: 'A map weighing 29+ data sources — water, climate, soil, community — to find where an EcoHub will actually thrive. Sites shortlisted across 3 continents.',
			href: 'https://csi.ecohubs.community',
			cta: 'Open the map →'
		},
		{
			icon: Coins,
			title: 'A real business',
			body: 'Every EcoHub is also a regenerative enterprise — so it pays for itself instead of running on goodwill and grants.',
			footnote: 'income, not subsidy'
		},
		{
			icon: Network,
			title: 'A network, not an island',
			body: 'Hubs connect and share. A regenerative finance model lets one healthy hub help fund the next.',
			footnote: 'one funds the next'
		}
	];

	const journey = [
		{
			n: 1,
			title: 'Join the waitlist',
			body: 'Free, today. One email. Nothing owed.',
			here: true
		},
		{
			n: 2,
			title: 'Get to know each other',
			body: 'Calls, conversations, the RCOS Standard. No pressure, both ways.'
		},
		{
			n: 3,
			title: 'Selection',
			body: 'Deliberately strict — for the health of the community and your own fit.'
		},
		{
			n: 4,
			title: 'Pioneer training',
			body: '6–12 months: business, self-governance, permaculture, energy, water, ecological building, no-waste, legal, human systems.'
		},
		{
			n: 5,
			title: 'Make the leap',
			body: 'Move in, build, and begin living the thing you helped design. Target: Q2 2027.'
		}
	];

	const team = [
		{ img: StefanImg, name: 'Stefan Lessle', role: 'EcoHubs initiator · Web Developer' },
		{ img: LuisaImg, name: 'Luisa', role: 'EcoHubs co-founder · Consultant & Trusted Advisor' },
		{ img: CalebeImg, name: 'Calebe', role: 'EcoHubs contributor · Regenerative Economist' },
		{ img: JavierProfile, name: 'Javier Yanez', role: 'Natural builder · open-source dome systems' }
	];

	const faqItems: { q: string; a: string; link?: { href: string; label: string } }[] = [
		{
			q: 'Is joining a commitment?',
			a: 'No. The waitlist is free and completely non-binding. You\'re saying "tell me more, keep me posted" — nothing else. You can leave any time, and joining never obligates you to move, pay, or decide anything.'
		},
		{
			q: 'Will it cost money later?',
			a: "We'll be transparent: nothing is owed by joining. Much later, pioneers who move forward contribute a fixed amount to a foundation that buys the land — which they then co-steward. It's shared regenerative assets you have a stake in, not a payment to us. No tiers, no subscription, no surprise fees."
		},
		{
			q: 'Do I need to be an expert, or move now?',
			a: 'No to both. The path is gradual and there\'s training built in. What matters far more than existing skills is curiosity, care, and a willingness to learn alongside others. Plenty of people on the list are simply paying attention for now.'
		},
		{
			q: "Can I help even if I don't move in?",
			a: "Yes. Most of the people shaping EcoHubs aren't moving in — they're advising, designing, testing the RCOS Standard, or simply cheering it on. Belonging here isn't only about residence; it's about contribution, in whatever form fits your life."
		},
		{
			q: 'Do I have to live in a geodesic dome like the ones above, or are other homes possible?',
			a: "Not at all. Building with Javier's dome system is just one option we're considering today — not a requirement. We're actively exploring a wider range of low-impact building approaches, so pioneers can choose what best fits their climate, needs and budget. And if you know a builder or system we should look into, we'd genuinely love an introduction —",
			link: { href: '/contact', label: 'get in touch via our contact form →' }
		}
	];

	const navLinks = [
		{ href: '#why', label: 'The why' },
		{ href: '#what', label: 'What it is' },
		{ href: '#system', label: 'The system' },
		{ href: '#journey', label: 'The journey' },
		{ href: '#faq', label: 'FAQ' }
	];

	const year = new Date().getFullYear();

	/* ─── UI state ───────────────────────────────────────────────── */
	let mobileNavOpen = $state(false);
	let stickyVisible = $state(false);
	let openFaq = $state(0);

	let modalOpen = $state(false);
	let modalEmail = $state('');

	function onSignup(email: string) {
		modalEmail = email;
		modalOpen = true;
	}

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? -1 : i;
	}

	onMount(() => {
		initMauticTracking();
		initScrollAnimations();
		initStaggeredScrollAnimations('[data-scroll-stagger]');

		// Reveal the sticky mobile CTA once the hero scrolls out of view.
		const hero = document.getElementById('hero');
		if (!hero) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) stickyVisible = !entry.isIntersecting;
			},
			{ threshold: 0.05 }
		);
		io.observe(hero);
		return () => io.disconnect();
	});
</script>

<SEO
	title={SEO_PAGE.title}
	description={SEO_PAGE.description}
	canonical="/join-the-waitlist"
	ogImage={SEO_PAGE.ogImage}
	breadcrumbs={[
		{ name: 'Home', url: SEO_CONFIG.siteUrl },
		{ name: 'Join the Waitlist', url: `${SEO_CONFIG.siteUrl}/join-the-waitlist` }
	]}
	faq={faqItems.map((f) => ({
		question: f.q,
		answer: f.link ? `${f.a} Contact us: ${SEO_CONFIG.siteUrl}${f.link.href}` : f.a
	}))}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Join the EcoHub One Waitlist',
		url: `${SEO_CONFIG.siteUrl}/join-the-waitlist`,
		description: SEO_PAGE.description,
		inLanguage: 'en',
		isPartOf: { '@type': 'WebSite', name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }
	}}
/>

<!-- ============ NAV ============ -->
<header
	class="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-ecohubs-base/80 border-b border-stone-200/60"
>
	<div class="flex items-center justify-between h-16 px-5 mx-auto max-w-7xl lg:px-8">
		<a href="#hero" class="flex items-center gap-2.5 font-serif text-[17px] text-ecohubs-dark">
			<img src={LogoSrc} alt="EcoHubs" class="w-8 h-8" />
			EcoHubs
		</a>
		<nav class="items-center hidden gap-8 text-sm md:flex text-stone-700">
			{#each navLinks as link}
				<a href={link.href} class="transition-colors hover:text-ecohubs-dark">{link.label}</a>
			{/each}
		</nav>
		<div class="flex items-center gap-2">
			<a
				href="#join"
				class="hidden px-4 py-2 text-sm text-white transition-colors rounded-full sm:inline-flex bg-ecohubs-dark hover:bg-ecohubs-deep"
			>
				Join the founding community
			</a>
			<button
				onclick={() => (mobileNavOpen = !mobileNavOpen)}
				class="flex items-center justify-center w-10 h-10 border rounded-full md:hidden border-stone-300 text-ecohubs-dark"
				aria-label="Menu"
				aria-expanded={mobileNavOpen}
			>
				<span
					class="block w-4 h-px bg-current relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:w-4 before:h-px before:bg-current after:content-[''] after:absolute after:top-1.5 after:left-0 after:w-4 after:h-px after:bg-current"
				></span>
			</button>
		</div>
	</div>
	{#if mobileNavOpen}
		<div
			class="md:hidden border-t border-stone-200/60 bg-ecohubs-base/95 backdrop-blur-md"
			transition:slide
		>
			<nav class="px-5 py-4 flex flex-col gap-1 text-[15px] text-stone-700">
				{#each navLinks as link}
					<a href={link.href} class="py-2" onclick={() => (mobileNavOpen = false)}>{link.label}</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<main class="overflow-x-hidden">
	<!-- ============ 1 · HERO ============ -->
	<section
		id="hero"
		class="relative flex flex-col lg:min-h-screen lg:justify-end scroll-mt-16"
	>
		<!-- Content — kept in normal flow on desktop so a tall block grows the
		     section instead of being clipped above the fold. The image sits behind
		     it as an absolute background. -->
		<div
			class="order-1 relative lg:z-20 w-full max-w-7xl mx-auto px-5 lg:px-8 flex flex-col justify-end pt-28 pb-12 lg:pt-28 lg:pb-24 bg-ecohubs-base lg:bg-transparent"
		>
			<div class="max-w-2xl">
				<div class="flex items-center gap-3 mb-6 kicker text-emerald-700">
					<span class="relative inline-block w-2 h-2 bg-current rounded-full pulse-dot"></span>
					Co-found EcoHub One · a regenerative community · waitlist open
				</div>

				<h1
					class="font-serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[68px] lg:leading-[1.04] tracking-tight text-ecohubs-deep"
				>
					A new way of living — with nature,
					<em class="italic font-normal font-story text-ecohubs-primary">and each other</em>.
				</h1>

				<p class="max-w-xl mt-6 text-lg font-light leading-relaxed text-stone-600 sm:text-xl">
					We're building EcoHub One — a regenerative community designed so people thrive together, and
					the land does too. It starts with a small founding circle. The first step is just saying
					you're in.
				</p>

				<div class="mt-8">
					<WaitlistForm variant="light" onsuccess={onSignup} />
				</div>

				<!-- Founding members get -->
				<div
					class="mt-9 max-w-md rounded-2xl bg-white/85 backdrop-blur-sm border border-stone-200/70 soft-shadow p-5"
				>
					<p class="kicker text-emerald-700 mb-3">Founding members get</p>
					<ul class="space-y-2.5">
						{#each ['Early invites to our monthly community calls', 'First access when pioneer selection opens', "A say in the RCOS Standard while it's still being written"] as item}
							<li class="flex items-start gap-2.5 text-[14px] text-stone-700 leading-snug">
								<span class="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<!-- Media -->
		<div
			class="order-2 lg:order-none relative w-full h-[62vw] min-h-[230px] max-h-[440px] lg:absolute lg:inset-0 lg:z-0 lg:h-full lg:max-h-none"
		>
			<enhanced:img
				src={HeroImage}
				alt="An EcoHub community living and working on regenerating land"
				sizes="(max-width: 1023px) 100vw, 100vw"
				loading="eager"
				fetchpriority="high"
				class="absolute inset-0 w-full h-full object-cover"
			/>
			<!-- Soft white wash from the design: a halo centered on the text column
			     plus a bottom-left anchor wash, so the dark headline lifts off the
			     photo. Desktop only — on mobile the copy sits on a solid bg. -->
			<div
				class="hidden lg:block absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(30%_80%_at_28%_52%,rgba(251,251,249,0.95)_0%,rgba(251,251,249,0.88)_30%,rgba(251,251,249,0.55)_52%,rgba(251,251,249,0)_78%),radial-gradient(140%_125%_at_0%_100%,rgba(251,251,249,0.97)_0%,rgba(251,251,249,0.9)_22%,rgba(251,251,249,0.62)_42%,rgba(251,251,249,0.28)_57%,rgba(251,251,249,0)_72%)]"
			></div>
		</div>
	</section>

	<!-- ============ 2 · THE WHY ============ -->
	<section id="why" class="py-24 md:py-32 bg-ecohubs-ivory grain relative overflow-hidden scroll-mt-16">
		<div class="relative max-w-4xl px-5 mx-auto lg:px-8" data-scroll-animate="fade-up">
			<div class="mb-5 kicker text-emerald-800">The why</div>
			<h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-ecohubs-deep leading-[1.12]">
				Most of us feel a little disconnected —
				<em class="italic font-normal font-story text-stone-500"
					>from nature, from each other, from work that matters.</em
				>
			</h2>
			<div class="grid gap-8 mt-8 md:grid-cols-2 md:gap-12">
				<p class="text-[17px] leading-[1.75] text-stone-700">
					We're not the first to dream of living differently. People have tried for decades. And most
					intentional communities don't fail on solar panels or vegetable beds — they fail on the
					hard, human part: conflict, unclear decisions, burnout, who-does-what.
				</p>
				<p class="text-[17px] leading-[1.75] text-stone-700">
					<strong class="font-medium text-ecohubs-deep">EcoHubs starts with that hard part.</strong>
					Clear human structure first, then the land, the buildings, the business. So belonging isn't
					a hope — it's something the community is actually built to hold.
				</p>
			</div>
		</div>
	</section>

	<!-- ============ 3 · WHAT IS AN ECOHUB ============ -->
	<section id="what" class="py-24 md:py-32 bg-ecohubs-base scroll-mt-16">
		<div class="px-5 mx-auto max-w-7xl lg:px-8">
			<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<div data-scroll-animate="fade-up">
					<div class="mb-5 kicker text-emerald-700">What is an EcoHub?</div>
					<h2 class="font-serif text-3xl sm:text-4xl md:text-[44px] text-ecohubs-deep leading-[1.12]">
						A small community that lives well together —
						<em class="italic font-normal font-story text-ecohubs-primary"
							>and gives more to the land than it takes.</em
						>
					</h2>
					<p class="mt-6 text-[17px] leading-[1.75] text-stone-700 max-w-xl">
						Picture a handful of households on regenerating land: shared gardens and kitchens,
						low-impact homes, real work and real income, and a way of making decisions together that
						actually holds. Not a commune, not an eco-resort — a living place designed to be repeated.
					</p>

					<div class="grid gap-3 mt-9 sm:grid-cols-2">
						{#each principles as p}
							<div class="rounded-2xl bg-ecohubs-ivory border border-stone-200/70 p-5">
								<div class="font-mono text-[11px] tracking-widest uppercase text-emerald-700 mb-1.5">
									{p.n}
								</div>
								<p class="text-[14.5px] text-stone-800 leading-snug">
									<strong class="text-ecohubs-deep">{p.title}</strong>
									{p.body}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<div data-scroll-animate="fade-up">
					<div class="rounded-[28px] overflow-hidden soft-shadow">
						<LiteYouTube videoId="7tby1xZzMMk" title="A Day in an EcoHub" />
					</div>
					<p class="mt-3 text-[13px] text-stone-500 font-story italic">
						Six minutes inside the vision — morning to evening in a working hub.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ 4 · THE SYSTEM — 4 PILLARS ============ -->
	<section
		id="system"
		class="py-24 md:py-32 bg-ecohubs-deep text-emerald-50 relative overflow-hidden scroll-mt-16"
	>
		<div class="absolute inset-0 pointer-events-none grain opacity-40"></div>
		<div class="relative px-5 mx-auto max-w-7xl lg:px-8">
			<div class="max-w-2xl mb-12 md:mb-16" data-scroll-animate="fade-up">
				<div class="mb-5 kicker text-emerald-300/80">The system</div>
				<h2 class="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-emerald-50">
					Four pillars hold an EcoHub up.
					<em class="italic font-normal font-story text-emerald-200/80">Miss one and it tilts.</em>
				</h2>
				<p class="mt-5 text-[17px] leading-relaxed text-emerald-100/80">
					This is the part that's usually skipped — so it's the part we built first.
				</p>
			</div>

			{#snippet pillarContent(p: (typeof pillars)[number])}
				{@const Icon = p.icon}
				<span
					class="flex items-center justify-center mb-6 border rounded-full w-11 h-11 border-emerald-300/50 text-emerald-300"
				>
					<Icon size={20} strokeWidth={1.75} />
				</span>
				<h3 class="mb-2 font-serif text-xl leading-snug text-emerald-50">
					{p.title}
					{#if p.note}<span class="font-mono text-[12px] text-emerald-300/70">{p.note}</span>{/if}
				</h3>
				<p class="text-[14.5px] text-emerald-100/75 leading-relaxed flex-1">{p.body}</p>
				{#if p.cta}
					<span
						class="mt-5 text-[13px] text-emerald-200 font-medium inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
						>{p.cta}</span
					>
				{:else if p.footnote}
					<span class="mt-5 text-[12px] font-mono text-emerald-300/60">{p.footnote}</span>
				{/if}
			{/snippet}

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" data-scroll-stagger>
				{#each pillars as p}
					{#if p.href}
						<a
							href={p.href}
							target="_blank"
							rel="noopener"
							class="no-external-decoration group bg-emerald-50/[0.04] border border-emerald-100/15 rounded-3xl p-7 flex flex-col hover:bg-emerald-50/[0.07] hover:border-emerald-100/30 transition-colors"
						>
							{@render pillarContent(p)}
						</a>
					{:else}
						<div
							class="bg-emerald-50/[0.04] border border-emerald-100/15 rounded-3xl p-7 flex flex-col"
						>
							{@render pillarContent(p)}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ MID-PAGE CTA ============ -->
	<section class="py-16 md:py-20 bg-ecohubs-base">
		<div class="max-w-3xl px-5 mx-auto text-center lg:px-8" data-scroll-animate="fade-up">
			<h2 class="font-serif text-2xl leading-snug sm:text-3xl text-ecohubs-deep">
				Like the way this is being built?
				<em class="italic font-normal font-story text-stone-500"
					>Stand near the door while it's open.</em
				>
			</h2>
			<div class="flex flex-col items-center justify-center gap-3 mt-7">
				<a
					href="#join"
					class="px-8 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center gap-2 group"
				>
					<span>Join the founding community</span>
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<div class="text-[13.5px] text-stone-500">
					Free to join. No commitment — just the first step.
				</div>
			</div>
		</div>
	</section>

	<!-- ============ 5 · BUILDING IT FOR REAL — JAVIER'S DOMES ============ -->
	<section id="build" class="py-24 md:py-32 bg-ecohubs-ivory grain relative overflow-hidden scroll-mt-16">
		<div class="relative px-5 mx-auto max-w-7xl lg:px-8">
			<div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
				<div class="lg:col-span-5" data-scroll-animate="fade-up">
					<div class="mb-5 kicker text-emerald-800">Building it for real</div>
					<h2 class="font-serif text-3xl sm:text-4xl md:text-[44px] text-ecohubs-deep leading-[1.12]">
						The homes already exist —
						<em class="italic font-normal font-story text-stone-500"
							>and they're buildable almost anywhere.</em
						>
					</h2>
					<p class="mt-6 text-[17px] leading-[1.75] text-stone-700">
						This isn't a render. Natural builder Javier Yanez has developed an affordable, replicable
						geodesic dome system: CNC-cut frames assembled with local, natural materials. A 7-metre
						dome runs roughly
						<strong class="font-medium text-ecohubs-deep">$10k–$20k</strong> — strong, beautiful, and
						within reach.
					</p>

					<div class="flex items-center gap-4 mt-8">
						<div class="relative w-16 h-16 overflow-hidden rounded-full shrink-0 soft-shadow">
							<enhanced:img
								src={JavierProfile}
								alt="Javier Yanez"
								sizes="64px"
								class="absolute inset-0 object-cover w-full h-full"
							/>
						</div>
						<div>
							<p class="font-medium text-ecohubs-deep text-[15px]">Javier Yanez</p>
							<p class="text-[13px] text-stone-600 font-story italic">
								natural builder · HUB open construction system
							</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-3 lg:col-span-7 sm:gap-4" data-scroll-animate="fade-up">
					<div
						class="col-span-2 rounded-[28px] overflow-hidden soft-shadow relative aspect-[16/10] bg-ecohubs-ivory"
					>
						<enhanced:img
							src={JavierHub}
							alt="HUB — open construction for a regenerative future"
							sizes="(max-width: 1023px) 100vw, 640px"
							class="absolute inset-0 object-cover w-full h-full"
						/>
					</div>
					<div
						class="rounded-[24px] overflow-hidden soft-shadow relative aspect-square bg-ecohubs-ivory max-h-[200px] w-full"
					>
						<enhanced:img
							src={JavierDome}
							alt="Geodesic dome frame under construction"
							sizes="(max-width: 1023px) 50vw, 320px"
							class="absolute inset-0 object-cover w-full h-full"
						/>
						<div class="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/35 to-transparent">
							<span class="text-white text-[12px] font-medium drop-shadow">Dome frame in the field</span>
						</div>
					</div>
					<div
						class="rounded-[24px] overflow-hidden soft-shadow relative aspect-square bg-ecohubs-ivory max-h-[200px] w-full"
					>
						<enhanced:img
							src={JavierGreenhouse}
							alt="Finished dome interior used as a greenhouse"
							sizes="(max-width: 1023px) 50vw, 320px"
							class="absolute inset-0 object-cover w-full h-full"
						/>
						<div class="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/35 to-transparent">
							<span class="text-white text-[12px] font-medium drop-shadow">Living interior</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ 6 · THE JOURNEY ============ -->
	<section id="journey" class="py-24 md:py-32 bg-ecohubs-base scroll-mt-16">
		<div class="px-5 mx-auto max-w-7xl lg:px-8">
			<div class="max-w-2xl mb-12 md:mb-16" data-scroll-animate="fade-up">
				<div class="mb-5 kicker text-emerald-700">The journey</div>
				<h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-ecohubs-deep leading-[1.12]">
					A long, intentional process —
					<em class="italic font-normal font-story text-ecohubs-primary"
						>that starts with one no-pressure step.</em
					>
				</h2>
			</div>

			<div class="relative">
				<div
					class="absolute left-0 right-0 hidden h-px lg:block top-5 bg-gradient-to-r from-transparent via-ecohubs-dark/30 to-transparent"
				></div>
				<ol class="grid gap-8 lg:grid-cols-5 lg:gap-5">
					{#each journey as step, i}
						<li class="relative pl-12 lg:pl-0" data-scroll-animate="fade-up">
							{#if i < journey.length - 1}
								<div
									class="lg:hidden absolute left-[10px] top-6 bottom-[-2rem] w-px bg-gradient-to-b from-ecohubs-dark/30 to-ecohubs-dark/30"
								></div>
							{/if}
							<span
								class="absolute left-0 top-0.5 lg:static w-[22px] h-[22px] lg:w-10 lg:h-10 rounded-full font-mono text-[11px] lg:text-[13px] flex items-center justify-center lg:mb-5 z-10 {step.here
									? 'bg-ecohubs-primary text-white'
									: i === journey.length - 1
										? 'bg-ecohubs-dark text-white'
										: 'bg-white border border-ecohubs-dark text-ecohubs-dark'}"
							>
								{step.n}
							</span>
							<h3 class="font-serif text-lg leading-snug text-ecohubs-deep lg:mt-0">{step.title}</h3>
							<p class="mt-1.5 text-[14px] text-stone-600 leading-relaxed">{step.body}</p>
							{#if step.here}
								<span
									class="mt-2 inline-block font-mono text-[10.5px] tracking-wider uppercase text-emerald-700"
									>you are here</span
								>
							{/if}
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</section>

	<!-- ============ 7 · CREDIBILITY ============ -->
	<section
		id="credibility"
		class="py-20 md:py-24 bg-ecohubs-ivory grain relative overflow-hidden scroll-mt-16"
	>
		<div class="relative max-w-5xl px-5 mx-auto text-center lg:px-8" data-scroll-animate="fade-up">
			<div class="mb-5 kicker text-emerald-800">Who's behind it</div>
			<h2
				class="font-serif text-2xl sm:text-3xl md:text-4xl text-ecohubs-deep leading-[1.15] max-w-3xl mx-auto"
			>
				Not one founder with a dream —
				<em class="italic font-normal font-story text-stone-500"
					>a working network of people who've done the parts before.</em
				>
			</h2>
			<p class="mt-5 text-[16px] text-stone-700 leading-relaxed max-w-2xl mx-auto">
				Permaculturists, economists, software developers and ecological builders, designing this
				together in the open — 15+ contributors across 10 countries.
			</p>
			<div class="grid grid-cols-2 gap-x-6 gap-y-9 mt-12 sm:grid-cols-4 sm:gap-x-4 max-w-3xl mx-auto">
				{#each team as person}
					<figure class="flex flex-col items-center gap-2.5 text-center">
						<div class="relative w-20 h-20 overflow-hidden rounded-full soft-shadow">
							<enhanced:img
								src={person.img}
								alt={person.name}
								sizes="80px"
								class="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
						<figcaption>
							<span class="block text-[14px] font-medium text-ecohubs-deep">{person.name}</span>
							<span class="block text-[12px] text-stone-500 leading-snug mt-0.5">{person.role}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
			<div class="mt-10">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-ecohubs-dark/30 text-ecohubs-dark text-[13px] font-medium hover:bg-ecohubs-dark hover:text-white transition-colors group"
				>
					Looking for further partners
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
			</div>
		</div>
	</section>

	<!-- ============ 8 · FAQ ============ -->
	<section id="faq" class="py-24 md:py-32 bg-ecohubs-base scroll-mt-16">
		<div class="max-w-3xl px-5 mx-auto lg:px-8">
			<div class="mb-12" data-scroll-animate="fade-up">
				<div class="mb-5 kicker text-emerald-700">Honest answers</div>
				<h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-ecohubs-deep leading-[1.12]">
					The questions <em class="italic font-normal font-story text-stone-500">people actually ask.</em>
				</h2>
			</div>

			<div class="divide-y divide-stone-200">
				{#each faqItems as item, i}
					<div class="py-1">
						<button
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
							class="flex items-start justify-between w-full gap-6 py-5 text-left"
						>
							<span class="font-serif text-lg leading-snug sm:text-xl text-ecohubs-deep">{item.q}</span
							>
							<span
								class="mt-1.5 shrink-0 w-3.5 h-3.5 relative transition-transform duration-300 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-3.5 before:h-px before:bg-ecohubs-dark after:content-[''] after:absolute after:left-1/2 after:top-0 after:h-3.5 after:w-px after:bg-ecohubs-dark {openFaq ===
								i
									? 'rotate-45'
									: ''}"
							></span>
						</button>
						{#if openFaq === i}
							<div transition:slide>
								<p class="pb-6 text-[16px] leading-[1.7] text-stone-700">
										{item.a}
										{#if item.link}
											<a
												href={item.link.href}
												class="text-ecohubs-dark font-medium underline underline-offset-2 hover:text-ecohubs-primary transition-colors"
												>{item.link.label}</a
											>
										{/if}
									</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ============ 9 · FINAL CTA ============ -->
	<section
		id="join"
		class="py-24 md:py-36 bg-ecohubs-deep text-emerald-50 relative overflow-hidden scroll-mt-16"
	>
		<div class="absolute inset-0 pointer-events-none grain opacity-40"></div>
		<div
			class="absolute top-10 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-700/20 blur-3xl"
		></div>
		<div
			class="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full bg-amber-700/15 blur-3xl"
		></div>

		<div class="relative max-w-3xl px-5 mx-auto text-center lg:px-8" data-scroll-animate="fade-up">
			<div class="flex items-center justify-center gap-3 mb-6 kicker text-emerald-300/80">
				<span
					class="relative inline-block w-2 h-2 rounded-full bg-emerald-400 text-emerald-400 pulse-dot"
				></span>
				The first cohort is forming
			</div>
			<h2 class="font-serif text-3xl sm:text-5xl md:text-[56px] leading-[1.08] text-emerald-50">
				A new way of living is being built.
				<em class="italic font-normal font-story text-emerald-200/85">Belong to it from the start.</em>
			</h2>
			<p class="max-w-xl mx-auto mt-6 text-lg font-light leading-relaxed text-emerald-100/80">
				One email puts you in the room while EcoHub One takes shape — no commitment, no cost, just the
				first step.
			</p>

			<div class="mt-9">
				<WaitlistForm variant="dark" onsuccess={onSignup} />
			</div>

			<p class="mt-7 font-story italic text-[15px] text-emerald-200/70">
				First cohort: ~20 pioneers, forming 2026 — kept small so the people in it can truly know each
				other.
			</p>
		</div>
	</section>

	<!-- ============ FOOTER ============ -->
	<footer class="py-14 bg-ecohubs-deep text-emerald-200/70 border-t border-emerald-900/60">
		<div
			class="flex flex-col items-start justify-between gap-6 px-5 mx-auto max-w-7xl lg:px-8 md:flex-row md:items-center"
		>
			<!-- Brand links back to the main site (this is a standalone landing page). -->
			<a href="/" class="flex items-center gap-3 group">
				<img src={LogoSrc} alt="EcoHubs" class="w-8 h-8 brightness-[1.6]" />
				<div>
					<div class="font-serif text-lg text-emerald-50">EcoHubs</div>
					<div class="font-mono text-[11px] text-emerald-200/60 mt-0.5">
						A regenerative future, designed together.
					</div>
				</div>
			</a>
			<a
				href="#join"
				class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-ecohubs-primary hover:bg-emerald-500 group"
			>
				<span>Join the founding community</span>
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
		</div>
		<div class="px-5 mx-auto max-w-7xl lg:px-8 mt-8 pt-6 border-t border-emerald-900/40">
			<p class="text-[12px] text-emerald-200/50">
				© {year} EcoHubs Community ·
				<a
					href="/"
					class="text-emerald-200/80 underline underline-offset-2 hover:text-emerald-100 transition-colors"
					>ecohubs.community</a
				>
			</p>
		</div>
	</footer>
</main>

<!-- ============ STICKY MOBILE CTA ============ -->
<div
	class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ecohubs-base/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3 transition-transform duration-300 {stickyVisible
		? 'translate-y-0'
		: 'translate-y-[120%]'}"
>
	<div class="flex-1 min-w-0">
		<p class="text-[13px] font-medium text-ecohubs-deep leading-tight">Be part of EcoHub One</p>
		<p class="text-[11px] text-stone-500 leading-tight truncate">
			Free to join. No commitment — just the first step.
		</p>
	</div>
	<a href="#join" class="px-5 py-3 text-sm font-medium text-white rounded-full shrink-0 bg-ecohubs-dark"
		>Join the founding community</a
	>
</div>

<WaitlistProfileModal bind:open={modalOpen} email={modalEmail} />
