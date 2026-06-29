<script lang="ts">
	import { Sprout, ShieldCheck, Compass, ChevronRight } from 'lucide-svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { SEO_CONFIG } from '$lib/config/seo';
	import logo from '$lib/assets/Logo.svg';

	/* Outbound-click analytics. Fires a GA4 `link_click` event when consent has
	   granted analytics storage (gtag is loaded by <Analytics> in the layout);
	   a no-op otherwise, so it's safe to attach everywhere. */
	function track(label: string, url: string) {
		window.gtag?.('event', 'link_click', {
			link_label: label,
			link_url: url,
			link_location: 'welcome_page'
		});
	}

	/* Brand glyphs reuse the shared monochrome set in /static/social-icons —
	   the same assets the site Footer renders, kept consistent with /links. */
	const socials = [
		{ href: 'https://www.instagram.com/ecohubs_community/', label: 'Instagram', icon: '/social-icons/instagram.svg' },
		{ href: 'https://x.com/eco_hubs', label: 'X', icon: '/social-icons/x.svg' },
		{ href: 'https://www.youtube.com/@ecohubs', label: 'YouTube', icon: '/social-icons/youtube.svg' },
		{ href: 'https://discord.gg/Xnh7247Nq3', label: 'Discord', icon: '/social-icons/discord.svg' },
		{ href: 'https://mastodon.social/@ecohubs', label: 'Mastodon', icon: '/social-icons/mastodon.svg' },
		{ href: 'https://farcaster.xyz/ecohubs', label: 'Farcaster', icon: '/social-icons/farcaster.svg' },
		{ href: 'https://www.linkedin.com/company/ecohubs/', label: 'LinkedIn', icon: '/social-icons/linkedin.svg' },
		{ href: 'https://github.com/ecohubs-community', label: 'GitHub', icon: '/social-icons/github.svg' }
	];

	type Path = {
		icon: typeof Sprout;
		title: string;
		desc: string;
		href: string;
		feature?: boolean;
	};

	// Three doorways into the site — first-person voice keeps the choices personal
	// and parallel ("I want… / I already… / I just…").
	const paths: Path[] = [
		{
			icon: Sprout,
			title: 'I want to live in an intentional community',
			desc: 'Join the waitlist for EcoHub One — be first in line for our founding regenerative community.',
			href: '/join-the-waitlist',
			feature: true
		},
		{
			icon: ShieldCheck,
			title: 'I already live in an intentional community',
			desc: 'Take the Community Resilience Assessment — measure your strengths and uncover hidden gaps.',
			href: '/community-resilience-assessment'
		},
		{
			icon: Compass,
			title: 'I just want to look around',
			desc: 'Explore everything EcoHubs — our tools, podcast, blog and the wider movement.',
			href: '/links'
		}
	];

	/* ── SEO ────────────────────────────────────────────────────────────── */
	const site = SEO_CONFIG.siteUrl;
	const pageTitle = 'Welcome — EcoHubs Community';
	const pageDescription =
		'Find your way into EcoHubs Community — join the waitlist for a regenerative community, assess the resilience of the community you already live in, or explore everything we are building.';

	const year = new Date().getFullYear();
</script>

<!-- noindex: this is a thin interstitial / doorway page whose only job is to
     route visitors deeper. It carries no unique content worth ranking, so we
     keep it out of the index (but `follow` lets crawlers reach the targets). -->
<SEO title={pageTitle} description={pageDescription} canonical="/welcome" ogImage="/og-home.jpg" noindex />

<div class="relative min-h-screen overflow-hidden bg-ecohubs-deep bg-[radial-gradient(120%_80%_at_50%_-10%,#0e3a2c_0%,#0b2e24_55%,#06170f_100%)]">
	<!-- Texture + ambient glows -->
	<div class="noise pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"></div>
	<div class="pointer-events-none absolute -left-24 -top-20 h-[360px] w-[360px] rounded-full bg-ecohubs-primary/30 blur-[70px]"></div>
	<div class="pointer-events-none absolute -right-28 bottom-[10%] h-[300px] w-[300px] rounded-full bg-ecohubs-light/15 blur-[70px]"></div>

	<div class="relative z-[2] mx-auto flex min-h-screen max-w-[600px] flex-col px-5 pb-16 pt-14">
		<!-- HEADER (mirrors /links) -->
		<header class="text-center">
			<div class="mx-auto mb-5 grid h-26 w-26 place-items-center rounded-full bg-ecohubs-base shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_24px_50px_-22px_rgba(0,0,0,0.6)]">
				<img src={logo} alt="EcoHubs Community" class="h-16 w-16" />
			</div>
			<h1 class="mb-3 font-serif text-[27px] font-medium tracking-tight text-ecohubs-base">EcoHubs Community</h1>
			<p class="mx-auto max-w-[460px] text-[15px] leading-relaxed text-ecohubs-base/80">
				🌍 A regenerative future, designed together. We're co-creating
				<strong class="font-medium text-ecohubs-light"
					>the world's first open-source standard for regenerative communities</strong
				> — making them more accessible, resilient, replicable, and normal. 🌱
			</p>

			<!-- SOCIAL ICON ROW -->
			<nav class="mx-auto mt-6 flex max-w-[460px] flex-wrap justify-center gap-2.5" aria-label="Social media">
				{#each socials as s (s.label)}
					<a
						href={s.href}
						target="_blank"
						rel="noopener"
						aria-label={s.label}
						title={s.label}
						onclick={() => track(`Social: ${s.label}`, s.href)}
						class="grid h-[42px] w-[42px] place-items-center rounded-xl border border-white/10 bg-white/[0.07] transition hover:-translate-y-0.5 hover:border-ecohubs-light/50 hover:bg-white/[0.16]"
					>
						<img src={s.icon} alt="" class="h-[19px] w-[19px]" style="filter: invert(1) brightness(1.2);" />
					</a>
				{/each}
			</nav>
		</header>

		<!-- PROMPT -->
		<p class="mt-12 mb-5 text-center text-[13px] font-semibold uppercase tracking-[0.22em] text-ecohubs-light">
			Where would you like to start?
		</p>

		<!-- THREE BIG DOORWAYS -->
		<div class="flex flex-col gap-4">
			{#each paths as p (p.title)}
				{@const Icon = p.icon}
				<a
					href={p.href}
					onclick={() => track(p.title, p.href)}
					class="group relative flex items-center gap-4 rounded-2xl border border-transparent p-5 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 {p.feature
						? 'bg-gradient-to-br from-ecohubs-dark to-ecohubs-deep hover:border-ecohubs-light/30'
						: 'bg-ecohubs-base hover:border-ecohubs-primary/40'}"
				>
					<span
						class="grid h-14 w-14 flex-none place-items-center rounded-xl {p.feature
							? 'bg-white/10 text-ecohubs-light'
							: 'bg-ecohubs-ivory text-ecohubs-dark'}"
					>
						<Icon size={28} strokeWidth={1.7} />
					</span>
					<span class="flex min-w-0 flex-1 flex-col">
						<span class="text-[17px] font-semibold leading-snug {p.feature ? 'text-ecohubs-base' : 'text-ecohubs-deep'}">
							{p.title}
						</span>
						<span class="mt-1.5 text-[13px] leading-snug {p.feature ? 'text-ecohubs-base/70' : 'text-ecohubs-muted'}">
							{p.desc}
						</span>
					</span>
					<ChevronRight
						size={20}
						class="flex-none opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100 {p.feature
							? 'text-ecohubs-light'
							: 'text-ecohubs-muted'}"
					/>
				</a>
			{/each}
		</div>

		<!-- FOOTER -->
		<footer class="mt-auto pt-12 text-center">
			<img src={logo} alt="" class="mx-auto mb-3 block h-[30px] w-[30px] opacity-50" style="filter: brightness(0) invert(1);" />
			<p class="text-[12px] text-ecohubs-base/50">
				© {year} EcoHubs Community ·
				<a class="text-ecohubs-light/80" href="https://ecohubs.community" target="_blank" rel="noopener">ecohubs.community</a>
			</p>
		</footer>
	</div>
</div>

<style>
	/* Subtle film grain over the dark stage — the one texture Tailwind can't
	   express inline. Mirrors /links so the two pages feel like one family. */
	.noise {
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
	}
</style>
