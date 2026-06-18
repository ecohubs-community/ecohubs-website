<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { SEO_CONFIG, generateBreadcrumbs } from '$lib/config/seo';

	const breadcrumbs = generateBreadcrumbs('privacy');

	const sections = [
		{ id: 'controller', num: '01', title: 'Data controller' },
		{ id: 'legal-basis', num: '02', title: 'Legal basis for processing' },
		{ id: 'data-collected', num: '03', title: 'Personal data we collect' },
		{ id: 'purpose', num: '04', title: 'Purpose of processing' },
		{ id: 'cookies', num: '05', title: 'Cookies and analytics' },
		{ id: 'third-parties', num: '06', title: 'Third-party services' },
		{ id: 'rights', num: '07', title: 'Your rights under LOPDP' },
		{ id: 'retention', num: '08', title: 'Data retention' },
		{ id: 'transfers', num: '09', title: 'International data transfers' },
		{ id: 'security', num: '10', title: 'Security measures' },
		{ id: 'children', num: '11', title: "Children's privacy" },
		{ id: 'updates', num: '12', title: 'Updates to this policy' },
		{ id: 'contact', num: '13', title: 'Contact information' },
		{ id: 'authority', num: '14', title: 'Supervisory authority' }
	];
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
			and what you can do about it. In line with Ecuador's Organic Law on Personal Data Protection
			(LOPDP) and international data-protection standards.
		</p>
		<p class="mt-5 text-sm text-stone-500 font-story italic">Last updated · January 2025</p>
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
				{#each sections as s}
					<li class="flex gap-3">
						<span class="font-story italic text-ecohubs-primary shrink-0 w-6">{s.num}</span>
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
				<p class="lead">
					EcoHubs.community ("we," "us," or "our") is committed to protecting your personal data in
					accordance with Ecuador's Organic Law on Personal Data Protection (LOPDP) and
					international data-protection standards.
				</p>

				<h2 id="controller"><span class="kicker-num">01</span> Data controller</h2>
				<p>The data controller responsible for your personal data is:</p>
				<ul>
					<li><strong>Entity:</strong> EcoHubs.community</li>
					<li><strong>Location:</strong> Ecuador</li>
					<li>
						<strong>Contact:</strong>
						<a href="mailto:privacy@ecohubs.community">privacy@ecohubs.community</a>
					</li>
				</ul>

				<h2 id="legal-basis"><span class="kicker-num">02</span> Legal basis for processing</h2>
				<p>
					In accordance with Article 10 of the LOPDP, we process your personal data on the following
					grounds:
				</p>
				<ul>
					<li>
						<strong>Consent</strong> — when you voluntarily provide information through our contact or
						application forms.
					</li>
					<li>
						<strong>Legitimate interest</strong> — for website analytics to improve our services (with
						anonymised data).
					</li>
					<li><strong>Legal obligation</strong> — when required by applicable laws.</li>
				</ul>

				<h2 id="data-collected"><span class="kicker-num">03</span> Personal data we collect</h2>
				<h3>Contact form data</h3>
				<ul>
					<li>Name</li>
					<li>Email address</li>
					<li>Message content</li>
				</ul>
				<h3>Application form data</h3>
				<ul>
					<li>Full name</li>
					<li>Email address</li>
					<li>Location / country</li>
					<li>Skills and experience</li>
					<li>Motivation and interests</li>
				</ul>
				<h3>Automatically collected data</h3>
				<ul>
					<li>IP address (anonymised)</li>
					<li>Browser type and version</li>
					<li>Pages visited and time spent</li>
					<li>Referring website</li>
				</ul>

				<h2 id="purpose"><span class="kicker-num">04</span> Purpose of processing</h2>
				<p>In keeping with the LOPDP's transparency principle, we use your personal data to:</p>
				<ul>
					<li>Respond to your inquiries and messages.</li>
					<li>Process community-membership applications.</li>
					<li>Send relevant updates about EcoHubs.community (with your consent).</li>
					<li>Improve our website and services through anonymised analytics.</li>
					<li>Comply with legal obligations.</li>
				</ul>

				<h2 id="cookies"><span class="kicker-num">05</span> Cookies and analytics</h2>
				<p>We use cookies and similar technologies to enhance your experience.</p>
				<h3>Essential cookies</h3>
				<p>
					Necessary for the website to function and not disable-able. They include cookies that
					remember your cookie-consent preferences.
				</p>
				<h3>Analytics cookies (Google Analytics 4)</h3>
				<p>
					With your consent, we use Google Analytics 4 to understand how visitors interact with our
					website. We have configured GA4 with privacy-enhancing settings:
				</p>
				<ul>
					<li>IP anonymisation enabled.</li>
					<li>Secure cookie flags (SameSite=Strict).</li>
					<li>No data sharing with Google for advertising purposes.</li>
				</ul>
				<p>
					You can withdraw your consent at any time by clearing your browser cookies and declining
					when the consent banner appears again.
				</p>

				<h2 id="third-parties"><span class="kicker-num">06</span> Third-party services</h2>
				<p>We use the following third-party services that may process your data:</p>
				<ul>
					<li><strong>Ghost CMS</strong> — for blog content delivery.</li>
					<li><strong>Google Analytics</strong> — for website analytics (consent-based).</li>
				</ul>
				<p>
					Each third-party service has its own privacy policy governing its data-processing
					activities.
				</p>

				<h2 id="rights"><span class="kicker-num">07</span> Your rights under LOPDP</h2>
				<p>Under Ecuador's LOPDP, you have the following rights regarding your personal data:</p>
				<ul>
					<li>
						<strong>Right of access</strong> — request information about what personal data we hold about
						you.
					</li>
					<li>
						<strong>Right to rectification</strong> — request correction of inaccurate or incomplete
						data.
					</li>
					<li><strong>Right to erasure</strong> — request deletion of your personal data.</li>
					<li>
						<strong>Right to data portability</strong> — receive your data in a structured, commonly
						used format.
					</li>
					<li>
						<strong>Right to withdraw consent</strong> — withdraw consent at any time without affecting
						prior processing.
					</li>
					<li>
						<strong>Right to object</strong> — object to processing based on legitimate interests.
					</li>
				</ul>
				<p>
					To exercise any of these rights, write to <a href="mailto:privacy@ecohubs.community"
						>privacy@ecohubs.community</a
					>. We respond within 15 business days as required by the LOPDP.
				</p>

				<h2 id="retention"><span class="kicker-num">08</span> Data retention</h2>
				<p>We retain your personal data only for as long as necessary:</p>
				<ul>
					<li><strong>Contact form data</strong> — 2 years from last interaction.</li>
					<li>
						<strong>Application data</strong> — duration of membership consideration plus 1 year.
					</li>
					<li><strong>Analytics data</strong> — 14 months (Google Analytics default).</li>
				</ul>

				<h2 id="transfers"><span class="kicker-num">09</span> International data transfers</h2>
				<p>
					Some of our third-party providers may process data outside Ecuador. When that happens, we
					ensure appropriate safeguards are in place as required by the LOPDP, including:
				</p>
				<ul>
					<li>Use of services with adequate data-protection certifications.</li>
					<li>Standard contractual clauses where applicable.</li>
				</ul>

				<h2 id="security"><span class="kicker-num">10</span> Security measures</h2>
				<p>
					We implement appropriate technical and organisational measures to protect your personal
					data, including:
				</p>
				<ul>
					<li>HTTPS encryption for all data transmission.</li>
					<li>Secure server infrastructure.</li>
					<li>Access controls and authentication.</li>
					<li>Regular security assessments.</li>
				</ul>

				<h2 id="children"><span class="kicker-num">11</span> Children's privacy</h2>
				<p>
					Our services are not directed to individuals under 18 years of age. We do not knowingly
					collect personal data from children.
				</p>

				<h2 id="updates"><span class="kicker-num">12</span> Updates to this policy</h2>
				<p>
					We may update this privacy policy from time to time. We will notify you of any material
					changes by posting the new policy on this page with an updated revision date.
				</p>

				<h2 id="contact"><span class="kicker-num">13</span> Contact information</h2>
				<p>
					If you have any questions about this privacy policy or our data practices, write to us:
				</p>
				<ul>
					<li>
						<strong>Email</strong> —
						<a href="mailto:privacy@ecohubs.community">privacy@ecohubs.community</a>
					</li>
					<li><strong>Contact form</strong> — <a href="/contact">ecohubs.community/contact</a></li>
				</ul>

				<h2 id="authority"><span class="kicker-num">14</span> Supervisory authority</h2>
				<p>
					If you believe your data-protection rights have been violated, you have the right to lodge
					a complaint with the Superintendencia de Protección de Datos Personales (SPDP) of Ecuador.
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
	:global(main p),
	:global(main li),
	:global(main span:not([class*='font-'])),
	:global(main div:not([class*='font-'])) {
		font-family:
			'Inter Variable',
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
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

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
	}

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
</style>
