<script lang="ts">
	import {
		Globe,
		Eye,
		Sprout,
		UserPlus,
		LayoutGrid,
		Compass,
		Vote,
		ShieldCheck,
		Mail,
		ChevronRight,
		ChevronDown,
		ArrowUpRight,
		MessageSquare,
		Video,
		Repeat,
		Clock,
		CalendarPlus,
		Download,
		FileText
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import LiteYouTube from '$lib/components/LiteYouTube.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { SEO_CONFIG } from '$lib/config/seo';
	import { formatDate } from '$lib/utils/blog';
	import logo from '$lib/assets/Logo.svg';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const posts = data.posts ?? [];
	const latestVideo = data.latestVideo;
	// First post is featured (vertical card); the next three render compact below.
	const featuredPost = posts[0];
	const morePosts = posts.slice(1, 4);

	/* Outbound-click analytics. Fires a GA4 `link_click` event when consent has
	   granted analytics storage (gtag is loaded by <Analytics> in the layout);
	   a no-op otherwise, so it's safe to attach everywhere. */
	function track(label: string, url: string) {
		window.gtag?.('event', 'link_click', {
			link_label: label,
			link_url: url,
			link_location: 'links_page'
		});
	}

	type LinkItem = {
		icon: typeof Globe;
		title: string;
		desc: string;
		href: string;
		tag?: string;
		feature?: boolean;
	};

	/* Brand glyphs reuse the shared monochrome set in /static/social-icons —
	   the same assets the site Footer renders, kept consistent here. */
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

	// 1 · About us
	const aboutUs: LinkItem[] = [
		{ icon: FileText, title: 'EcoHubs Manifesto', desc: 'Why we are building a regenerative future — read the PDF.', href: 'https://ecohubs.community/EcoHubs_Manifesto.pdf' },
		{ icon: Globe, title: 'EcoHubs Website', desc: 'Our home base — projects, vision and community.', href: '/' },
		{ icon: Eye, title: 'Our Vision', desc: 'Where we are headed and why it matters.', href: '/vision' },
		{ icon: Sprout, title: 'About RCOS', desc: 'The open-source standard for regenerative communities.', href: '/rcos' },
		{ icon: UserPlus, title: 'Become a Member', desc: 'Free, contribution-based — help co-create the RCOS Standard.', href: '/membership', tag: 'Join us', feature: true }
	];

	// 2 · Our Ecosystem
	const ecosystem: LinkItem[] = [
		{ icon: LayoutGrid, title: 'RCOS Standard', desc: 'The open-source operating system for intentional communities.', href: 'https://rcos.ecohubs.community' },
		{ icon: ShieldCheck, title: 'Community Resilience Assessment', desc: 'Measure and strengthen your community’s resilience.', href: '/community-resilience-assessment' },
		{ icon: ShieldCheck, title: 'Stress-Test Self-Assessment', desc: 'Reveal your community’s hidden weaknesses & resilience gaps before they become real-world failures', href: 'https://rcos.ecohubs.community/articles/rcos-stress-tests/self-assessment' },
		{ icon: Compass, title: 'Community Suitability Index', desc: 'Find out where a regenerative community could thrive.', href: 'https://csi.ecohubs.community', tag: 'New' },
		{ icon: Vote, title: 'VoteCast', desc: 'Collective decision-making, made transparent.', href: 'https://votecast.ecohubs.community' },
	];

	// 3 · Podcast — listen-on channels rendered with each platform's favicon.
	const podcastChannels = [
		{ label: 'Apple Podcasts', href: 'https://podcasts.apple.com/podcast/id1884349817', domain: 'podcasts.apple.com' },
		{ label: 'Spotify', href: 'https://open.spotify.com/show/4pAswyGtil1mLSrhN38bps', domain: 'open.spotify.com' },
		{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=NuF4LobS0lA&list=PLFyJdVEi7LlNZdh0o_2eoyZ3XlUVLkjBe', domain: 'youtube.com' },
		{ label: 'Amazon Music', href: 'https://music.amazon.com/podcasts/210f533e-0b5d-495b-933d-3663bc6e5cb7', domain: 'music.amazon.com' },
		{ label: 'Podcast Index', href: 'https://podcastindex.org/podcast/7756027', domain: 'podcastindex.org' },
		{ label: 'Castamatic', href: 'https://castamatic.com/itunes/1884349817', domain: 'castamatic.com', icon: 'https://castamatic.com/img/favicon-256.png' },
		{ label: 'Overcast', href: 'https://overcast.fm/itunes1884349817', domain: 'overcast.fm' },
		{ label: 'Castro', href: 'https://castro.fm/itunes/1884349817', domain: 'castro.fm' },
		{ label: 'Castbox', href: 'https://castbox.fm/vic/1884349817', domain: 'castbox.fm' },
		{ label: 'CurioCaster', href: 'https://curiocaster.com/podcast/pi7756027', domain: 'curiocaster.com' },
		{ label: 'Pocket Casts', href: 'https://pca.st/itunes/1884349817', domain: 'pocketcasts.com' },
		{ label: 'Podcast Addict', href: 'https://podcastaddict.com/feed/https://media.rss.com/the-regenerative-future-podcast/feed.xml', domain: 'podcastaddict.com' },
		{ label: 'Podcast Guru', href: 'https://app.podcastguru.io/podcast/1884349817', domain: 'podcastguru.io' },
		{ label: 'PodLP', href: 'https://link.podlp.app/938e3a51-03ab-55f2-9491-2daaeee027ac', domain: 'podlp.app' },
		{ label: 'Podverse', href: 'https://api.podverse.fm/api/v1/podcast/podcastindex/7756027', domain: 'podverse.fm' }
	];
	const favicon = (ch: { domain: string; icon?: string }) =>
		ch.icon ?? `https://www.google.com/s2/favicons?domain=${ch.domain}&sz=64`;

	// Show the first 6 channels; the rest collapse behind a "show more" toggle.
	const PODCAST_PREVIEW = 6;
	let showAllChannels = $state(false);
	const visibleChannels = $derived(
		showAllChannels ? podcastChannels : podcastChannels.slice(0, PODCAST_PREVIEW)
	);

	// 4 · Contact
	const contact: LinkItem[] = [
		{ icon: Mail, title: 'Contact Us', desc: 'Questions, partnerships, press.', href: '/contact' }
	];

	const isExternal = (href: string) => href.startsWith('http');
	const year = new Date().getFullYear();

	/* ── Weekly meeting ──────────────────────────────────────────────────── *
	 * Sundays 10:00–11:30 in America/Guayaquil, which is UTC-5 year-round
	 * (no DST) → 15:00–16:30 UTC. We anchor the recurring event to the next
	 * occurrence as an absolute UTC instant, so the calendar links render
	 * identically on server and client (no hydration mismatch); only the
	 * human-readable time is re-localised on the client in onMount. */
	const MEETING = {
		title: 'Weekly EcoHubs Meeting',
		discord: 'https://discord.com/invite/etpg2Ry9JK?event=1503398042479493150',
		location: 'Discord — EcoHubs Community',
		startHourUTC: 15,
		durationMin: 90
	};
	const MEETING_DETAILS = `Weekly EcoHubs community meeting — open to everyone. Join on Discord: ${MEETING.discord}`;

	function nextMeetingStart(): Date {
		const now = new Date();
		const d = new Date(
			Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), MEETING.startHourUTC, 0, 0)
		);
		// Advance to the next Sunday whose start is still in the future.
		while (d.getUTCDay() !== 0 || d.getTime() < now.getTime()) {
			d.setUTCDate(d.getUTCDate() + 1);
		}
		return d;
	}
	const meetingStart = nextMeetingStart();
	const meetingEnd = new Date(meetingStart.getTime() + MEETING.durationMin * 60_000);

	// UTC stamp in iCalendar basic format, e.g. 20260628T150000Z.
	const icsStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

	const gcalHref =
		'https://calendar.google.com/calendar/render?action=TEMPLATE' +
		`&text=${encodeURIComponent(MEETING.title)}` +
		`&dates=${icsStamp(meetingStart)}/${icsStamp(meetingEnd)}` +
		`&details=${encodeURIComponent(MEETING_DETAILS)}` +
		`&location=${encodeURIComponent(MEETING.location)}` +
		`&recur=${encodeURIComponent('RRULE:FREQ=WEEKLY;BYDAY=SU')}`;

	const icsHref =
		'data:text/calendar;charset=utf-8,' +
		encodeURIComponent(
			[
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'PRODID:-//EcoHubs Community//Links//EN',
				'CALSCALE:GREGORIAN',
				'METHOD:PUBLISH',
				'BEGIN:VEVENT',
				'UID:weekly-meeting@ecohubs.community',
				`DTSTAMP:${icsStamp(meetingStart)}`,
				`DTSTART:${icsStamp(meetingStart)}`,
				`DTEND:${icsStamp(meetingEnd)}`,
				'RRULE:FREQ=WEEKLY;BYDAY=SU',
				`SUMMARY:${MEETING.title}`,
				`DESCRIPTION:${MEETING_DETAILS}`,
				`LOCATION:${MEETING.location}`,
				`URL:${MEETING.discord}`,
				'END:VEVENT',
				'END:VCALENDAR'
			].join('\r\n')
		);

	// SSR fallback shows the canonical Guayaquil time; the client swaps in the
	// viewer's local time + timezone abbreviation once mounted.
	let meetingTime = $state('10:00 AM – 11:30 AM');
	let meetingZone = $state('America/Guayaquil');
	onMount(() => {
		const t = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
		const zonePart = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
			.formatToParts(meetingStart)
			.find((p) => p.type === 'timeZoneName')?.value;
		meetingTime = `${t.format(meetingStart)} – ${t.format(meetingEnd)}`;
		if (zonePart) meetingZone = zonePart;
	});

	/* ── SEO ────────────────────────────────────────────────────────────── */
	const site = SEO_CONFIG.siteUrl;
	const pageTitle = 'Links — EcoHubs Community';
	const pageDescription =
		'Every EcoHubs link in one place — watch the intro, explore our ecosystem tools (RCOS, CSI, VoteCast), listen to The Regenerative Future Podcast, and read the latest from the regenerative-communities movement.';
	const abs = (href: string) => (href.startsWith('http') ? href : `${site}${href}`);

	const breadcrumbs = [
		{ name: 'Home', url: site },
		{ name: 'Links', url: `${site}/links` }
	];

	// CollectionPage + ItemList so search engines understand this as a link hub,
	// and a PodcastSeries entity for the show. Organization/WebSite schema is
	// already emitted by the SEO component.
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: pageTitle,
			description: pageDescription,
			url: `${site}/links`,
			isPartOf: { '@type': 'WebSite', name: SEO_CONFIG.siteName, url: site },
			mainEntity: {
				'@type': 'ItemList',
				itemListElement: [...aboutUs, ...ecosystem, ...contact].map((item, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: item.title,
					url: abs(item.href)
				}))
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'PodcastSeries',
			name: 'The Regenerative Future Podcast',
			url: 'https://rss.com/podcasts/the-regenerative-future-podcast',
			webFeed: 'https://media.rss.com/the-regenerative-future-podcast/feed.xml',
			publisher: { '@type': 'Organization', name: SEO_CONFIG.organization.name, url: site }
		}
	];
</script>

<SEO
	title={pageTitle}
	description={pageDescription}
	canonical="/links"
	ogImage="/og-home.jpg"
	ogImageAlt="EcoHubs Community — links, tools and podcast"
	{breadcrumbs}
	{jsonLd}
/>

{#snippet sectionLabel(text: string)}
	<div class="mt-10 mb-4 flex items-center gap-3 px-0.5">
		<span class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ecohubs-light">{text}</span>
		<span class="h-px flex-1 bg-ecohubs-light/20"></span>
	</div>
{/snippet}

{#snippet linkCard(item: LinkItem)}
	{@const Icon = item.icon}
	<a
		href={item.href}
		target={isExternal(item.href) ? '_blank' : undefined}
		rel={isExternal(item.href) ? 'noopener' : undefined}
		onclick={() => track(item.title, item.href)}
		class="group no-external-decoration relative flex items-center gap-4 rounded-2xl border border-transparent p-4 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 {item.feature
			? 'bg-gradient-to-br from-ecohubs-dark to-ecohubs-deep hover:border-ecohubs-light/30'
			: 'bg-ecohubs-base hover:border-ecohubs-primary/40'}"
	>
		<span
			class="grid h-11 w-11 flex-none place-items-center rounded-xl {item.feature
				? 'bg-white/10 text-ecohubs-light'
				: 'bg-ecohubs-ivory text-ecohubs-dark'}"
		>
			<Icon size={22} strokeWidth={1.7} />
		</span>
		<span class="flex min-w-0 flex-1 flex-col">
			<span class="flex items-center gap-2">
				<span class="text-[15px] font-semibold leading-tight {item.feature ? 'text-ecohubs-base' : 'text-ecohubs-deep'}">
					{item.title}
				</span>
				{#if item.tag}
					<span class="text-[10px] font-bold uppercase tracking-[0.12em] px-2 rounded-full text-white {item.feature ? 'bg-ecohubs-light' : 'bg-ecohubs-accent'}">
						{item.tag}
					</span>
				{/if}
			</span>
			<!-- Description forced onto its own line beneath the title. -->
			<span class="mt-1 text-[12.5px] leading-snug {item.feature ? 'text-ecohubs-base/70' : 'text-ecohubs-muted'}">
				{item.desc}
			</span>
		</span>
		{#if isExternal(item.href)}
			<!-- Outbound link → arrow that lifts away from the page. -->
			<ArrowUpRight
				size={18}
				class="flex-none opacity-50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 {item.feature
					? 'text-ecohubs-light'
					: 'text-ecohubs-muted'}"
			/>
		{:else}
			<!-- Internal route → chevron that nudges forward. -->
			<ChevronRight
				size={18}
				class="flex-none opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100 {item.feature
					? 'text-ecohubs-light'
					: 'text-ecohubs-muted'}"
			/>
		{/if}
	</a>
{/snippet}

<div class="relative min-h-screen overflow-hidden bg-ecohubs-deep bg-[radial-gradient(120%_80%_at_50%_-10%,#0e3a2c_0%,#0b2e24_55%,#06170f_100%)]">
	<!-- Texture + ambient glows -->
	<div class="noise pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"></div>
	<div class="pointer-events-none absolute -left-24 -top-20 h-[360px] w-[360px] rounded-full bg-ecohubs-primary/30 blur-[70px]"></div>
	<div class="pointer-events-none absolute -right-28 bottom-[10%] h-[300px] w-[300px] rounded-full bg-ecohubs-light/15 blur-[70px]"></div>

	<div class="relative z-[2] mx-auto max-w-[600px] px-5 pb-20 pt-14">
		<!-- HEADER -->
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

		<!-- 1 · WATCH FIRST -->
		{@render sectionLabel('Watch first')}
		<div class="overflow-hidden rounded-2xl bg-ecohubs-base p-1.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]">
			<LiteYouTube videoId="YNQN5PxXPt0" title="Regenerative Community OS — explained in 7 min" />
			<div class="px-3 pb-2 pt-3">
				<p class="text-[15px] font-semibold leading-tight text-ecohubs-deep">
					Regenerative Community OS — explained in 7 min
				</p>
				<p class="mt-1 text-[12.5px] leading-snug text-ecohubs-muted">
					A short intro to RCOS and how EcoHubs works.
				</p>
			</div>
		</div>

		<!-- 2 · ABOUT US -->
		{@render sectionLabel('About us')}
		<div class="flex flex-col gap-3">
			{#each aboutUs as item (item.title)}
				{@render linkCard(item)}
			{/each}
		</div>


		<!-- 3 · OUR ECOSYSTEM -->
		{@render sectionLabel('Our Ecosystem')}
		<div class="flex flex-col gap-3">
			{#each ecosystem as item (item.title)}
				{@render linkCard(item)}
			{/each}
		</div>

		<!-- 3b · WEEKLY MEETING -->
		{@render sectionLabel('Events')}
		<div class="rounded-2xl bg-gradient-to-br from-ecohubs-dark to-ecohubs-deep p-5 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] ring-1 ring-ecohubs-light/15">
			<!-- Badges -->
			<div class="flex flex-wrap gap-2">
				<span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-ecohubs-light">
					<Video size={13} strokeWidth={2} /> Online
				</span>
				<span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-ecohubs-light">
					<Repeat size={13} strokeWidth={2} /> Every Sun
				</span>
			</div>

			<h3 class="mt-3 text-[17px] font-semibold leading-tight text-ecohubs-base">
				{MEETING.title}
			</h3>
			<div class="mt-2 flex items-start gap-2 text-[13px] text-ecohubs-base/75">
				<Clock size={16} strokeWidth={1.8} class="mt-0.5 flex-none text-ecohubs-light" />
				<span>
					Sundays · {meetingTime}
					<span class="text-ecohubs-base/55">({meetingZone})</span>
				</span>
			</div>

			<!-- Actions -->
			<a
				href={MEETING.discord}
				target="_blank"
				rel="noopener"
				onclick={() => track('Meeting: Join', MEETING.discord)}
				class="no-external-decoration mt-4 flex items-center justify-center gap-2 rounded-xl bg-ecohubs-primary px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-ecohubs-light hover:text-ecohubs-deep"
			>
				<Video size={18} strokeWidth={2} /> Join Meeting Now
			</a>
			<div class="mt-2.5 grid grid-cols-2 gap-2.5">
				<a
					href={gcalHref}
					target="_blank"
					rel="noopener"
					onclick={() => track('Meeting: Google Calendar', gcalHref)}
					class="no-external-decoration flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-[12.5px] font-semibold text-ecohubs-base transition hover:border-ecohubs-light/40 hover:bg-white/[0.16]"
				>
					<CalendarPlus size={16} strokeWidth={1.8} /> Google Calendar
				</a>
				<a
					href={icsHref}
					download="ecohubs-weekly-meeting.ics"
					onclick={() => track('Meeting: ICS download', 'ics')}
					class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-[12.5px] font-semibold text-ecohubs-base transition hover:border-ecohubs-light/40 hover:bg-white/[0.16]"
				>
					<Download size={16} strokeWidth={1.8} /> .ics file
				</a>
			</div>
		</div>

		<!-- 4 · PODCAST -->
		{@render sectionLabel('The Regenerative Future Podcast')}
		<div class="overflow-hidden rounded-2xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]">
			<iframe
				src="https://player.rss.com/the-regenerative-future-podcast?theme=light&v=2"
				width="100%"
				height="393px"
				title="The Regenerative Future Podcast"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				scrolling="no"
			>
				<a href="https://rss.com/podcasts/the-regenerative-future-podcast">The Regenerative Future Podcast | RSS.com</a>
			</iframe>
		</div>
		<p class="mt-5 mb-3 px-0.5 text-[11px] uppercase tracking-[0.22em] text-ecohubs-light">Also available on</p>
		<div class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
			{#each visibleChannels as ch (ch.label)}
				<a
					href={ch.href}
					target="_blank"
					rel="noopener"
					title={ch.label}
					onclick={() => track(`Podcast: ${ch.label}`, ch.href)}
					class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.07] px-2.5 py-2.5 transition hover:-translate-y-0.5 hover:border-ecohubs-light/50 hover:bg-white/[0.16]"
				>
					<img src={favicon(ch)} alt="" width="28" height="28" class="h-7 w-7 flex-none rounded-md" loading="lazy" />
					<span class="flex min-w-0 flex-col leading-tight">
						<span class="text-[9.5px] uppercase tracking-[0.14em] text-ecohubs-base/45">Listen on</span>
						<span class="truncate text-[13px] font-semibold text-ecohubs-base">{ch.label}</span>
					</span>
				</a>
			{/each}
		</div>
		{#if podcastChannels.length > PODCAST_PREVIEW}
			<div class="mt-3 flex justify-center">
				<button
					type="button"
					onclick={() => (showAllChannels = !showAllChannels)}
					aria-expanded={showAllChannels}
					class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[12px] font-semibold text-ecohubs-light transition hover:border-ecohubs-light/40 hover:bg-white/[0.16]"
				>
					{showAllChannels
						? 'Show less'
						: `Show ${podcastChannels.length - PODCAST_PREVIEW} more`}
					<ChevronDown
						size={15}
						class="transition-transform duration-200 {showAllChannels ? 'rotate-180' : ''}"
					/>
				</button>
			</div>
		{/if}

		<!-- 5 · CONTACT -->
		{@render sectionLabel('Contact')}
		<div class="flex flex-col gap-3">
			{#each contact as item (item.title)}
				{@render linkCard(item)}
			{/each}
			<!-- Inline message form (name · email · message + Turnstile) → /api/contact,
			     collapsed into an accordion (closed by default). -->
			<details class="group overflow-hidden rounded-2xl bg-ecohubs-base shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)]">
				<summary
					class="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden"
				>
					<span class="grid h-11 w-11 flex-none place-items-center rounded-xl bg-ecohubs-ivory text-ecohubs-dark">
						<MessageSquare size={22} strokeWidth={1.7} />
					</span>
					<span class="flex min-w-0 flex-1 flex-col">
						<span class="text-[15px] font-semibold leading-tight text-ecohubs-deep">Send us a message</span>
						<span class="mt-1 text-[12.5px] leading-snug text-ecohubs-muted">
							Name, email and a note — we reply within a few days.
						</span>
					</span>
					<ChevronDown
						size={18}
						class="flex-none text-ecohubs-muted opacity-60 transition-transform duration-200 group-open:rotate-180"
					/>
				</summary>
				<div class="border-t border-ecohubs-deep/10 px-5 pb-5 pt-4">
					<ContactForm />
				</div>
			</details>
		</div>

		<!-- 6 · LATEST VIDEO -->
		{#if latestVideo}
			{@render sectionLabel('Latest Video')}
			<div class="overflow-hidden rounded-2xl bg-ecohubs-base p-1.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]">
				<!-- highRes={false} → hqdefault.jpg, which every upload has. maxresdefault
			     is missing on many videos and YouTube serves a gray 120×90 placeholder
			     (HTTP 200) for it, which the component's onerror fallback can't catch. -->
			<LiteYouTube videoId={latestVideo.videoId} title={latestVideo.title} highRes={false} />
				<div class="px-3 pb-2 pt-3">
					<p class="text-[15px] font-semibold leading-tight text-ecohubs-deep">{latestVideo.title}</p>
					<a
						href="https://www.youtube.com/@ecohubs"
						target="_blank"
						rel="noopener"
						onclick={() => track('YouTube channel', 'https://www.youtube.com/@ecohubs')}
						class="no-external-decoration mt-1 inline-block text-[12.5px] text-ecohubs-primary hover:underline"
					>
						More on our YouTube channel →
					</a>
				</div>
			</div>
		{/if}

		<!-- 7 · LATEST BLOG POSTS -->
		{@render sectionLabel('Latest Blog Posts')}
		{#if featuredPost}
			<!-- Featured: vertical card — cover image, then title + description. -->
			<a
				href="/blog/{featuredPost.slug}"
				onclick={() => track(`Blog: ${featuredPost.title}`, `/blog/${featuredPost.slug}`)}
				class="group block overflow-hidden rounded-2xl border border-transparent bg-ecohubs-base shadow-[0_14px_30px_-24px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:border-ecohubs-primary/35"
			>
				<span
					class="grid aspect-[16/9] w-full place-items-center bg-ecohubs-ivory bg-cover bg-center text-[10px] uppercase tracking-[0.1em] text-ecohubs-dark/40"
					style={featuredPost.image ? `background-image:url('${featuredPost.image}')` : ''}
				>
					{featuredPost.image ? '' : 'EcoHubs'}
				</span>
				<span class="block p-4">
					<span class="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ecohubs-primary">
						{formatDate(featuredPost.date)}
					</span>
					<span class="mt-1.5 mb-1.5 block text-[17px] font-semibold leading-tight text-ecohubs-deep">
						{featuredPost.title}
					</span>
					<span class="line-clamp-3 text-[13px] leading-normal text-ecohubs-muted">{featuredPost.excerpt}</span>
				</span>
			</a>

			{#if morePosts.length}
				<div class="mt-3.5 flex flex-col gap-3.5">
					{#each morePosts as post (post.slug)}
						<a
							href="/blog/{post.slug}"
							onclick={() => track(`Blog: ${post.title}`, `/blog/${post.slug}`)}
							class="group flex items-stretch gap-3.5 overflow-hidden rounded-2xl border border-transparent bg-ecohubs-base shadow-[0_14px_30px_-24px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:border-ecohubs-primary/35"
						>
							<span
								class="grid w-[116px] flex-none place-items-center bg-ecohubs-ivory bg-cover bg-center p-1 text-center text-[9px] uppercase tracking-[0.1em] text-ecohubs-dark/40"
								style={post.image ? `background-image:url('${post.image}')` : ''}
							>
								{post.image ? '' : 'EcoHubs'}
							</span>
							<span class="min-w-0 flex-1 py-3.5 pr-4">
								<span class="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ecohubs-primary">
									{formatDate(post.date)}
								</span>
								<span class="mt-1.5 mb-1.5 block text-[15px] font-semibold leading-tight text-ecohubs-deep">
									{post.title}
								</span>
								<span class="line-clamp-2 text-[12.5px] leading-normal text-ecohubs-muted">{post.excerpt}</span>
							</span>
						</a>
					{/each}
				</div>
			{/if}
		{:else}
			<p class="text-center text-[13px] text-ecohubs-base/50">
				No posts yet — visit the <a class="text-ecohubs-light" href="/blog">blog</a>.
			</p>
		{/if}

		<!-- FOOTER -->
		<footer class="mt-11 text-center">
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
	   express inline. Mirrors the .grain helper but tuned for dark sections. */
	.noise {
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
	}
</style>
