<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { SEO_CONFIG, generateBreadcrumbs } from '$lib/config/seo';
	import { POLICY, sections, bases, processors, retention, rights } from './data';

	const breadcrumbs = generateBreadcrumbs('privacy');
</script>

<SEO
	title={SEO_CONFIG.pages.privacy.title}
	description={SEO_CONFIG.pages.privacy.description}
	{breadcrumbs}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="flex items-start justify-between gap-4 flex-wrap mb-5">
			<div class="kicker text-emerald-700">The fine print, plainly</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			How we handle <em class="font-story italic font-normal text-stone-500">your data.</em>
		</h1>
		<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			Privacy isn't a footer link to us — it's a posture. This page describes what we collect, why,
			who else sees it, how long we keep it, and what you can do about it, in line with Ecuador's
			Organic Law on Personal Data Protection (LOPDP).
		</p>
		<p class="mt-5 text-sm text-stone-500 font-story italic">Last updated · {POLICY.updated}</p>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. BODY
═══════════════════════════════════════════════════════════════════ -->
<article class="py-16 md:py-24 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
		<!-- TOC (desktop only) -->
		<aside class="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 self-start">
			<div class="kicker text-emerald-700 mb-4">On this page</div>
			<ol class="space-y-2.5 text-sm">
				{#each sections as s (s.id)}
					<li class="flex gap-3">
						<span class="font-story italic text-ecohubs-dark shrink-0 w-6">{s.num}</span>
						<a href="#{s.id}" class="text-stone-600 hover:text-ecohubs-deep transition-colors"
							>{s.title}</a
						>
					</li>
				{/each}
			</ol>
		</aside>

		<!-- Body -->
		<div class="lg:col-span-8">
			<div class="prose-legal max-w-none">
				<div class="short-version">
					<div class="kicker text-emerald-700 mb-3">The short version</div>
					<ul>
						<li>
							We only ask for what we need to answer you, consider your application, or write to
							you.
						</li>
						<li>People read everything you send us. Nothing about you is decided by a machine.</li>
						<li>We don't sell or rent your data, and we don't advertise.</li>
						<li>
							Tracking cookies are set only if you accept them. Our own visitor counts use no
							cookies and can't identify you.
						</li>
						<li>
							You can ask what we hold, correct it, or have it deleted at any time: write to <a
								href="mailto:{POLICY.contact}">{POLICY.contact}</a
							>.
						</li>
					</ul>
				</div>

				<h2 id="controller"><span class="kicker-num">01</span> Who is responsible</h2>
				<p>
					The data controller is {POLICY.controller}. Questions, requests and complaints about your
					data go to <a href="mailto:{POLICY.contact}">{POLICY.contact}</a>, or through our
					<a href="/contact">contact form</a>.
				</p>
				<p>
					We have not designated a Data Protection Officer. Everything about your data goes to the
					address above, and a person answers.
				</p>
				<p>
					Membership records, governance and voting live in <strong>ecohubsOS</strong>
					(os.ecohubs.community), our own membership system, run by the same team. This page covers what
					reaches it from this website.
				</p>
				<p>
					This policy also covers <strong>rcos.ecohubs.community</strong>, the website of the RCOS
					standard, run by the same team. It has no forms and uses fewer services: Vercel hosts it,
					Google Analytics works there exactly as described below, and its video and podcast players
					load only when you press play. Your cookie choice applies to both sites.
				</p>

				<h2 id="data-collected"><span class="kicker-num">02</span> What we collect</h2>
				<h3>If you write to us</h3>
				<ul>
					<li>Your name, email address and message.</li>
					<li>We email the message to our team and send you a confirmation.</li>
				</ul>

				<h3>If you apply for membership</h3>
				<ul>
					<li>Your name, email address, location, languages and time availability.</li>
					<li>
						Your answers about your values, motivation, experience, how you work with others and
						what you hope to give and receive.
					</li>
					<li>
						The application goes to ecohubsOS, and a copy is emailed to our team so a person reads
						it. You get a confirmation email.
					</li>
					<li>
						While you fill it in, a draft is saved in your own browser so you don't lose your work.
						We don't receive it until you submit, and it is cleared when you do.
					</li>
				</ul>

				<h3>If you subscribe to the newsletter or join the EcoHub One waitlist</h3>
				<ul>
					<li>Your email address, and the list you joined.</li>
					<li>
						For the waitlist, anything you choose to add in the optional second step: first name,
						location, skills or profession, and why you want to join.
					</li>
					<li>
						Whether you confirmed the subscription, and whether you unsubscribed. Our mailing tools
						can also record whether an email was opened and which links were clicked.
					</li>
				</ul>

				<h3>If you take the Community Resilience Assessment</h3>
				<ul>
					<li>
						Your email address, your community's name, website, location and size, and a summary of
						your quiz answers.
					</li>
					<li>
						If you then send us your community's agreements for a report, we read them, write the
						report, and delete the documents.
					</li>
				</ul>

				<h3>Everyone who visits</h3>
				<ul>
					<li>
						<strong>Request logs</strong>: your IP address, the time and the page requested, kept
						for security and to fix problems.
					</li>
					<li>
						<strong>Anonymous visitor counts</strong> (Vercel Web Analytics): pages viewed,
						referrer, country, device and browser type. No cookies; see
						<a href="#cookies">section 05</a>.
					</li>
					<li>
						<strong>Your IP address, briefly and in memory only</strong>, to stop the same address
						from sending dozens of form submissions. It is not stored.
					</li>
					<li>
						<strong>Google Analytics</strong>: cookieless measurement until you choose, and cookies
						only if you accept them in the cookie banner; see <a href="#cookies">section 05</a>.
					</li>
				</ul>

				<h3>If you are an EcoHubs member</h3>
				<p>
					If your ecohubsOS profile is public, the member map on our homepage shows your display
					name, location, profile photo and contribution points. We fetch it from ecohubsOS and keep
					a copy for up to 12 hours. To be taken off the map, write to us.
				</p>

				<h3>In your own browser</h3>
				<p>
					Some things are saved only on your device and never sent to us: your cookie choice, your
					application draft, whether you have dismissed the newsletter pop-up, your colour theme,
					and in the Learning Hub your reading depth, progress, bookmarks and quiz answers.
				</p>

				<h2 id="sensitive"><span class="kicker-num">03</span> Sensitive information</h2>
				<p>
					Our application asks how you want to live and work with others, so your answers may touch
					on things like your beliefs, health or family situation. We don't ask for these directly.
					Share only what you are comfortable with. Whatever you write is used only to consider your
					application, is read only by the people who do that, and is never published.
				</p>

				<h2 id="legal-basis">
					<span class="kicker-num">04</span> Why we use it, and on what basis
				</h2>
				<p>
					Every use has its own basis under Article 7 of the LOPDP. We ask for consent separately
					for each purpose and never bundle them:
				</p>
				<ul>
					{#each bases as b (b.purpose)}
						<li><strong>{b.purpose}</strong>: {b.basis}</li>
					{/each}
				</ul>
				<p>
					You can withdraw any consent at any time: unsubscribe from an email, change your cookie
					choice, or write to us. Withdrawing doesn't affect what happened before.
				</p>

				<h2 id="cookies"><span class="kicker-num">05</span> Cookies, analytics and tracking</h2>
				<h3>Vercel Web Analytics (always on, no cookies)</h3>
				<p>
					Counts page views without cookies. It recognises a visit only by a code derived from the
					request, which changes every 24 hours, so it can't follow you across days or identify you.
				</p>
				<h3>Google Analytics 4 (cookies only with your consent)</h3>
				<p>
					The Google tag loads on every page, but until you accept in the cookie banner it sets no
					cookies and stores nothing on your device. It does send Google cookieless signals, such as
					that a page was viewed, which carry no identifier of yours and which Google uses to
					estimate overall numbers. As with any request, Google sees your IP address; anonymisation
					is on.
				</p>
				<p>
					If you accept, it also sets its cookies (<code>_ga</code>, <code>_ga_*</code>) to show us
					which pages people read and how they found us. Accepting grants analytics only: Google's
					advertising signals stay switched off. Everything works the same if you decline.
				</p>
				<h3>Campaign tracking on two landing pages (Mautic, only with your consent)</h3>
				<p>
					On the <a href="/community-resilience-assessment">Community Resilience Assessment</a> and
					the <a href="/join-the-waitlist">EcoHub One waitlist</a> pages, if you accept in the
					cookie banner, we load the tracking script of our own Mautic installation. It sets cookies
					(<code>mtc_id</code>, <code>mautic_device_id</code>) that recognise your browser on those
					pages, and if you then sign up, it links those visits to your email address so we can see
					how you found us. It runs on our own server, and nothing goes to an advertising network.
					If you decline, it never loads, and the forms work exactly the same. No other page loads
					it.
				</p>
				<h3>Spam protection and videos</h3>
				<p>
					Cloudflare Turnstile checks that a form is sent by a person; it sees your IP address and
					browser signals. Video previews are images loaded from YouTube; the video player itself
					(youtube-nocookie.com) loads only when you press play. On rcos.ecohubs.community, the
					podcast player (RSS.com) also loads only when you press play.
				</p>
				<h3>Changing your choice</h3>
				<p>
					Your choice is stored in a cookie (<code>ecohubs_consent</code>) that ecohubs.community
					and rcos.ecohubs.community share, so you choose once for both. It expires after six
					months, and then we ask again. To change it sooner, use <em>Cookie settings</em> at the bottom
					of any page. Our fonts are hosted by us, so loading the site doesn't contact Google Fonts.
				</p>

				<h2 id="third-parties"><span class="kicker-num">06</span> Who else handles your data</h2>
				<p>
					These providers process data on our behalf and only for the purpose described. We don't
					sell, rent or trade personal data, and nobody else gets it.
				</p>
				<dl class="facts">
					{#each processors as p (p.name)}
						<div>
							<dt>{p.name}</dt>
							<dd>
								{p.role}
								<span class="where">{p.where}</span>
							</dd>
						</div>
					{/each}
				</dl>

				<h2 id="transfers"><span class="kicker-num">07</span> International transfers</h2>
				<p>
					We are based in Ecuador, but most of our infrastructure is not. The server we rent from
					IONOS, which also runs the mail server, is located in the United States, as are Vercel,
					Cloudflare, Google and Discord. Using this site therefore means your data is transferred
					to the United States.
				</p>
				<p>
					We only use providers that protect data with the safeguards the LOPDP recognises for such
					transfers, such as data processing agreements with standard contractual clauses, and we
					send each of them only what their task needs.
				</p>

				<h2 id="retention"><span class="kicker-num">08</span> How long we keep it</h2>
				<dl class="facts">
					{#each retention as r (r.what)}
						<div>
							<dt>{r.what}</dt>
							<dd>{r.howLong}</dd>
						</div>
					{/each}
				</dl>

				<h2 id="rights"><span class="kicker-num">09</span> Your rights</h2>
				<p>Under the LOPDP you have the right to:</p>
				<ul>
					{#each rights as r (r.name)}
						<li><strong>{r.name}</strong>: {r.detail}</li>
					{/each}
				</ul>
				<p>
					Write to <a href="mailto:{POLICY.contact}">{POLICY.contact}</a> from the address you gave us,
					or tell us how we can confirm it's you. We answer within 15 business days, as the LOPDP requires,
					and it costs nothing.
				</p>

				<h2 id="security"><span class="kicker-num">10</span> Security</h2>
				<ul>
					<li>The site and every service behind it are served only over HTTPS.</li>
					<li>
						Forms are protected by Cloudflare Turnstile, a hidden spam trap and rate limits. The
						website talks to ecohubsOS only with secret keys.
					</li>
					<li>Access to applications, messages and subscriber lists is limited to our team.</li>
					<li>
						We keep an internal record of what we process and why, collect as little as we can, and
						delete what we no longer need.
					</li>
					<li>
						If a breach puts your data at risk, we tell the supervisory authority and you, within
						the deadlines the LOPDP sets.
					</li>
				</ul>

				<h2 id="children"><span class="kicker-num">11</span> Children</h2>
				<p>
					EcoHubs is for adults. Our forms are not meant for anyone under 18, and we don't knowingly
					collect their data. If you believe a child has sent us something, write to us and we
					delete it.
				</p>

				<h2 id="updates"><span class="kicker-num">12</span> Changes to this policy</h2>
				<p>
					When we change something that matters, we update this page and the date at the top. If a
					change affects what we do with data you have already given us, we ask you again.
				</p>

				<h2 id="authority"><span class="kicker-num">13</span> Complaints</h2>
				<p>
					If you think we have handled your data wrongly, please tell us first. We'd like to put it
					right. You can also complain to Ecuador's
					<a href={POLICY.authority.url} target="_blank" rel="noopener noreferrer"
						>{POLICY.authority.name}</a
					>.
				</p>
			</div>
		</div>
	</div>
</article>

<!-- ═══════════════════════════════════════════════════════════════════
		3. FOOTER NOTE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-16 md:py-20 bg-ecohubs-ivory border-t border-stone-200/70 text-center">
	<div class="max-w-2xl mx-auto px-6 lg:px-8">
		<div class="kicker text-emerald-700 mb-3">If anything is unclear</div>
		<p class="font-story italic text-xl text-ecohubs-deep">
			Write to us — we'd rather have the conversation than leave you guessing.
		</p>
		<a
			href="/contact"
			class="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ecohubs-dark text-white text-sm font-medium hover:bg-ecohubs-deep transition-colors group"
		>
			Get in touch
			<span class="transition-transform group-hover:translate-x-0.5">→</span>
		</a>
	</div>
</section>

<style>
	/* ────────────────────────────────────────────────────────────────────
	   Long-form legal styles — Pridi headings, Inter body, generous
	   leading, and emerald accents that match the v2 design.
	──────────────────────────────────────────────────────────────────── */

	:global(.prose-legal) {
		color: #1c1917;
		font-family:
			'Inter Variable',
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 1rem;
		line-height: 1.75;
	}

	:global(.prose-legal .lead) {
		font-family: 'Fraunces Variable', 'Fraunces', Georgia, serif;
		font-style: italic;
		font-size: 1.18em;
		line-height: 1.6;
		color: #0b2e24;
		margin: 0 0 2em 0;
		padding-left: 1em;
		border-left: 2px solid rgba(5, 150, 105, 0.4);
	}

	:global(.prose-legal h2) {
		font-family: 'Pridi', Georgia, serif;
		font-weight: 500;
		font-size: 1.6em;
		line-height: 1.2;
		color: #0b2e24;
		margin: 2.4em 0 0.7em 0;
		padding-top: 1.6em;
		border-top: 1px solid rgba(6, 78, 59, 0.15);
		letter-spacing: -0.005em;
	}

	:global(.prose-legal h2 .kicker-num) {
		display: inline-block;
		font-family: 'Fraunces Variable', 'Fraunces', Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: 0.7em;
		color: #059669;
		margin-right: 0.5em;
		vertical-align: 0.15em;
	}

	:global(.prose-legal h3) {
		font-family: 'Pridi', Georgia, serif;
		font-weight: 500;
		font-size: 1.15em;
		color: #064e3b;
		margin: 1.6em 0 0.6em 0;
	}

	:global(.prose-legal p) {
		margin: 1em 0;
	}

	:global(.prose-legal ul),
	:global(.prose-legal ol) {
		margin: 1em 0;
		padding-left: 1.6em;
	}

	:global(.prose-legal ul) {
		list-style-type: disc;
	}

	:global(.prose-legal ol) {
		list-style-type: decimal;
	}

	:global(.prose-legal li) {
		margin: 0.4em 0;
		padding-left: 0.4em;
	}

	:global(.prose-legal ul > li::marker) {
		color: #059669;
	}

	:global(.prose-legal ol > li::marker) {
		color: #059669;
		font-weight: 600;
	}

	:global(.prose-legal a) {
		color: #064e3b;
		text-decoration: underline;
		text-decoration-color: rgba(5, 150, 105, 0.4);
		text-underline-offset: 3px;
		transition: all 0.2s;
	}

	:global(.prose-legal a:hover) {
		color: #059669;
		text-decoration-color: #059669;
	}

	:global(.prose-legal strong) {
		color: #0b2e24;
		font-weight: 600;
	}

	:global(.prose-legal h2:first-of-type) {
		border-top: none;
		padding-top: 0;
		margin-top: 0;
	}

	:global(.prose-legal h2[id]) {
		scroll-margin-top: 6rem;
	}

	/* Page-only pieces: the short-version box and the two fact tables. */

	.short-version {
		margin: 0 0 3em 0;
		padding: 1.5em 1.75em 1em;
		border: 1px solid rgba(231, 229, 228, 0.8);
		border-radius: 1.5rem;
		background: var(--color-ecohubs-ivory, #f5f2ea);
	}

	.short-version ul {
		margin-top: 0;
	}

	.prose-legal code {
		font-family: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.85em;
		padding: 0.1em 0.35em;
		border-radius: 0.3em;
		background: rgba(6, 78, 59, 0.07);
		color: #064e3b;
	}

	.facts {
		margin: 1.5em 0;
		border-top: 1px solid rgba(6, 78, 59, 0.15);
	}

	.facts > div {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(6, 78, 59, 0.15);
	}

	.facts dt {
		font-weight: 600;
		color: #0b2e24;
		line-height: 1.45;
	}

	.facts dd {
		margin: 0;
		line-height: 1.55;
	}

	.facts .where {
		display: block;
		margin-top: 0.3em;
		font-size: 0.85em;
		color: #6b7265;
	}

	@media (max-width: 640px) {
		.facts > div {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}
</style>
