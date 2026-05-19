<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { SEO_CONFIG, generateBreadcrumbs } from '$lib/config/seo';

	const breadcrumbs = generateBreadcrumbs('terms');

	const sections = [
		{ id: 'acceptance', num: '01', title: 'Acceptance of terms' },
		{ id: 'description', num: '02', title: 'Description of service' },
		{ id: 'responsibilities', num: '03', title: 'User responsibilities' },
		{ id: 'open-source', num: '04', title: 'Open-source Blueprint' },
		{ id: 'ip', num: '05', title: 'Intellectual property' },
		{ id: 'submissions', num: '06', title: 'User submissions' },
		{ id: 'warranties', num: '07', title: 'Disclaimer of warranties' },
		{ id: 'liability', num: '08', title: 'Limitation of liability' },
		{ id: 'indemnification', num: '09', title: 'Indemnification' },
		{ id: 'third-parties', num: '10', title: 'Third-party links' },
		{ id: 'modifications', num: '11', title: 'Modifications to terms' },
		{ id: 'governing-law', num: '12', title: 'Governing law' },
		{ id: 'disputes', num: '13', title: 'Dispute resolution' },
		{ id: 'severability', num: '14', title: 'Severability' },
		{ id: 'contact', num: '15', title: 'Contact information' }
	];
</script>

<SEO
	title={SEO_CONFIG.pages.terms.title}
	description={SEO_CONFIG.pages.terms.description}
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
			<div class="kicker text-emerald-700">The understanding</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			Terms of <em class="font-story italic font-normal text-stone-500">service.</em>
		</h1>
		<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			By using EcoHubs.community you agree to a small set of expectations — written in plain
			language so they're actually readable. Have a look. If anything is unclear, write to us.
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
					Welcome to EcoHubs.community. By accessing or using our website and services, you agree to
					be bound by these Terms of Service. Please read them carefully.
				</p>

				<h2 id="acceptance"><span class="kicker-num">01</span> Acceptance of terms</h2>
				<p>
					By accessing and using EcoHubs.community ("the Service"), you accept and agree to be bound
					by these Terms of Service and our <a href="/privacy">Privacy Policy</a>. If you do not
					agree to these terms, please do not use our Service.
				</p>

				<h2 id="description"><span class="kicker-num">02</span> Description of service</h2>
				<p>EcoHubs.community is a platform dedicated to:</p>
				<ul>
					<li>
						Co-creating and sharing an open-source blueprint for regenerative intentional
						communities.
					</li>
					<li>Connecting individuals interested in sustainable community living.</li>
					<li>Facilitating community governance through decentralised mechanisms.</li>
					<li>Providing educational resources about regenerative practices.</li>
				</ul>

				<h2 id="responsibilities"><span class="kicker-num">03</span> User responsibilities</h2>
				<p>By using our Service, you agree to:</p>
				<ul>
					<li>Provide accurate and truthful information in all submissions.</li>
					<li>Respect other users and community members.</li>
					<li>Not use the Service for any unlawful purpose.</li>
					<li>Not attempt to gain unauthorised access to any part of the Service.</li>
					<li>Not interfere with or disrupt the Service or servers.</li>
					<li>Comply with all applicable laws and regulations.</li>
				</ul>

				<h2 id="open-source"><span class="kicker-num">04</span> Open-source Blueprint</h2>
				<p>
					The EcoHubs Blueprint and associated documentation are released under open-source
					principles:
				</p>
				<ul>
					<li>The Blueprint is freely available for use, modification, and distribution.</li>
					<li>Derivative works should acknowledge EcoHubs.community as the original source.</li>
					<li>
						Commercial use of the Blueprint is permitted, provided proper attribution is given.
					</li>
					<li>We encourage contributions back to the community to improve the Blueprint.</li>
				</ul>
				<p>
					Specific licensing terms for individual components may be detailed in their respective
					documentation.
				</p>

				<h2 id="ip"><span class="kicker-num">05</span> Intellectual property</h2>
				<p>
					Unless otherwise stated, EcoHubs.community and/or its licensors own the intellectual
					property rights for all material on EcoHubs.community. This includes:
				</p>
				<ul>
					<li>Website design and user interface.</li>
					<li>Logos and branding elements.</li>
					<li>Original content not covered by open-source licences.</li>
				</ul>
				<p>
					You may view and/or print pages from the website for your own personal use, subject to
					restrictions set in these Terms.
				</p>

				<h2 id="submissions"><span class="kicker-num">06</span> User submissions</h2>
				<p>When you submit content through our contact forms, applications, or other means:</p>
				<ul>
					<li>You retain ownership of your original content.</li>
					<li>
						You grant us a non-exclusive right to use your submission for the purposes described at
						the time of collection.
					</li>
					<li>You represent that you have the right to submit such content.</li>
				</ul>

				<h2 id="warranties"><span class="kicker-num">07</span> Disclaimer of warranties</h2>
				<p>
					The Service is provided "as is" and "as available" without warranties of any kind, either
					express or implied, including but not limited to:
				</p>
				<ul>
					<li>Implied warranties of merchantability.</li>
					<li>Fitness for a particular purpose.</li>
					<li>Non-infringement.</li>
				</ul>
				<p>We do not warrant that the Service will be uninterrupted, secure, or error-free.</p>

				<h2 id="liability"><span class="kicker-num">08</span> Limitation of liability</h2>
				<p>
					To the maximum extent permitted by applicable law, EcoHubs.community shall not be liable
					for:
				</p>
				<ul>
					<li>Any indirect, incidental, special, consequential, or punitive damages.</li>
					<li>Any loss of profits, data, use, goodwill, or other intangible losses.</li>
					<li>Any damages resulting from your use or inability to use the Service.</li>
					<li>Any content obtained from the Service.</li>
				</ul>

				<h2 id="indemnification"><span class="kicker-num">09</span> Indemnification</h2>
				<p>
					You agree to indemnify and hold harmless EcoHubs.community, its founders, contributors,
					and affiliates from any claims, damages, losses, or expenses arising from:
				</p>
				<ul>
					<li>Your use of the Service.</li>
					<li>Your violation of these Terms.</li>
					<li>Your violation of any third-party rights.</li>
				</ul>

				<h2 id="third-parties"><span class="kicker-num">10</span> Third-party links</h2>
				<p>
					Our Service may contain links to third-party websites or services that are not owned or
					controlled by EcoHubs.community. We have no control over, and assume no responsibility
					for:
				</p>
				<ul>
					<li>The content, privacy policies, or practices of any third-party websites.</li>
					<li>Any damages or losses caused by third-party websites.</li>
				</ul>

				<h2 id="modifications"><span class="kicker-num">11</span> Modifications to terms</h2>
				<p>
					We reserve the right to modify these Terms at any time. We will provide notice of material
					changes by:
				</p>
				<ul>
					<li>Updating the "Last updated" date at the top of these Terms.</li>
					<li>Posting a notice on our website for significant changes.</li>
				</ul>
				<p>
					Your continued use of the Service after changes constitutes acceptance of the modified
					Terms.
				</p>

				<h2 id="governing-law"><span class="kicker-num">12</span> Governing law</h2>
				<p>
					These Terms shall be governed by and construed in accordance with the laws of the Republic
					of Ecuador, without regard to its conflict-of-law provisions.
				</p>

				<h2 id="disputes"><span class="kicker-num">13</span> Dispute resolution</h2>
				<p>
					Any disputes arising from these Terms or your use of the Service shall be resolved
					through:
				</p>
				<ol>
					<li>
						<strong>Informal resolution</strong> — first, by attempting to resolve the dispute informally
						by contacting us.
					</li>
					<li>
						<strong>Mediation</strong> — if informal resolution fails, through mediation in Ecuador.
					</li>
					<li>
						<strong>Legal proceedings</strong> — if mediation fails, through the courts of Ecuador.
					</li>
				</ol>

				<h2 id="severability"><span class="kicker-num">14</span> Severability</h2>
				<p>
					If any provision of these Terms is found to be unenforceable or invalid, that provision
					will be limited or eliminated to the minimum extent necessary so that the Terms will
					otherwise remain in full force and effect.
				</p>

				<h2 id="contact"><span class="kicker-num">15</span> Contact information</h2>
				<p>If you have any questions about these Terms, write to us:</p>
				<ul>
					<li>
						<strong>Email</strong> —
						<a href="mailto:legal@ecohubs.community">legal@ecohubs.community</a>
					</li>
					<li><strong>Contact form</strong> — <a href="/contact">ecohubs.community/contact</a></li>
				</ul>
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

	/* The .prose-legal styles are also defined on /privacy with identical
	   rules — keeping them duplicated keeps the two pages independent. */

	:global(.prose-legal) {
		color: #1c1917;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 1rem;
		line-height: 1.75;
	}

	:global(.prose-legal .lead) {
		font-family: 'Fraunces', Georgia, serif;
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
		font-family: 'Fraunces', Georgia, serif;
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
