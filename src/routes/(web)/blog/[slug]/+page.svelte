<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { formatDate } from '$lib/utils/blog';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = data.post;
	const formattedDate = formatDate(post.date);
	const siteUrl = 'https://ecohubs.community';

	// Only surface an "Updated" line when the modification falls on a later
	// calendar day — Ghost touches `updated_at` minutes after publish for
	// trivial post-publish edits (image uploads, slug tweaks), which would
	// otherwise show "Updated <same-day>" right next to the publish date.
	const showUpdated =
		!!post.dateModified &&
		post.dateModified.slice(0, 10) !== post.date.slice(0, 10);

	// Full breadcrumb feeds JSON-LD (SERP rich-result hierarchy); the visible
	// breadcrumb drops the post title because it would duplicate the H1 below.
	const jsonLdBreadcrumbs = [
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Blog', url: 'https://ecohubs.community/blog' },
		{ name: post.title, url: `https://ecohubs.community/blog/${post.slug}` }
	];
	const visibleBreadcrumbs = jsonLdBreadcrumbs.slice(0, 2);

	// Channels from the site footer that support URL-based sharing.
	// Discord / Instagram / GitHub have no share-intent URL, so we skip them.
	const shareUrl = `${siteUrl}/blog/${post.slug}`;
	const shareText = post.title;
	const shareLinks = [
		{
			label: 'X',
			href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
			icon: '/social-icons/x.svg'
		},
		{
			label: 'LinkedIn',
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
			icon: '/social-icons/linkedin.svg'
		},
		{
			label: 'Mastodon',
			href: `https://mastodon.social/share?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
			icon: '/social-icons/mastodon.svg'
		},
		{
			label: 'Farcaster',
			href: `https://farcaster.xyz/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`,
			icon: '/social-icons/farcaster.svg'
		},
		{
			label: 'Email',
			href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
			icon: '/social-icons/email.svg'
		}
	];

	// Article JSON-LD schema
	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		image: post.image
			? post.image.startsWith('http')
				? post.image
				: `${siteUrl}${post.image}`
			: `${siteUrl}/og-blog.jpg`,
		datePublished: post.date,
		dateModified: post.dateModified || post.date,
		author: {
			'@type': 'Person',
			name: post.author
		},
		publisher: {
			'@type': 'Organization',
			name: 'EcoHubs.community',
			logo: {
				'@type': 'ImageObject',
				url: `${siteUrl}/logo.png`
			}
		},
		...(post.tags && post.tags.length > 0
			? { articleSection: post.tags.map((t) => t.name).join(', ') }
			: {})
	};
</script>

<SEO
	title="{post.title} — EcoHubs blog"
	description={post.excerpt}
	type="article"
	ogImage={post.image || '/og-blog.jpg'}
	jsonLd={articleJsonLd}
	breadcrumbs={jsonLdBreadcrumbs}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		HEADER (kicker, title, meta)
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="max-w-3xl mx-auto px-6 lg:px-8">
		<div class="mb-10">
			<Breadcrumbs items={visibleBreadcrumbs} />
		</div>

		{#if post.tags && post.tags.length > 0}
			<div class="flex flex-wrap gap-2 mb-6">
				{#each post.tags as tag}
					<a
						href="/blog/tag/{tag.slug}"
						class="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-medium hover:bg-emerald-100 transition-colors"
					>
						{tag.name}
					</a>
				{/each}
			</div>
		{/if}

		<h1
			class="font-serif text-4xl md:text-5xl lg:text-[56px] text-ecohubs-deep leading-[1.08] tracking-tight mb-8"
		>
			{post.title}
		</h1>

		<div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
			<span class="inline-flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
				<span class="font-medium text-ecohubs-deep">{post.author}</span>
			</span>
			<span class="text-stone-300">·</span>
			<time datetime={post.date} class="font-story italic">{formattedDate}</time>
			{#if showUpdated}
				<span class="text-stone-300">·</span>
				<span class="font-story italic">
					Updated <time datetime={post.dateModified}>{formatDate(post.dateModified!)}</time>
				</span>
			{/if}
			{#if post.readingTime}
				<span class="text-stone-300">·</span>
				<span class="font-story italic">{post.readingTime} min read</span>
			{/if}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		FEATURED IMAGE
═══════════════════════════════════════════════════════════════════ -->
{#if post.image}
	<div class="max-w-5xl mx-auto px-6 lg:px-8 -mt-2 mb-14 md:mb-20">
		<div class="rounded-[28px] overflow-hidden soft-shadow">
			<img
				src={post.image}
				srcset={post.image.includes('unsplash.com')
					? `${post.image}&w=400 400w, ${post.image}&w=800 800w, ${post.image}&w=1200 1200w`
					: post.image}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
				alt={post.title}
				width="1200"
				height="630"
				class="w-full h-auto object-cover"
				loading="eager"
			/>
		</div>
	</div>
{:else}
	<div class="hairline max-w-3xl mx-auto"></div>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════
		ARTICLE BODY
═══════════════════════════════════════════════════════════════════ -->
<article class="pb-20 md:pb-28 bg-ecohubs-base">
	<div class="max-w-3xl mx-auto px-6 lg:px-8">
		<div class="prose prose-lg prose-ecohubs max-w-none">
			{@html post.html}
		</div>
	</div>
</article>

<!-- ═══════════════════════════════════════════════════════════════════
		RELATED POSTS
═══════════════════════════════════════════════════════════════════ -->
{#if data.relatedPosts && data.relatedPosts.length > 0}
	<section
		class="py-20 md:py-28 bg-ecohubs-ivory border-t border-stone-200/70 relative overflow-hidden"
	>
		<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>
		<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
			<div class="max-w-2xl mb-12">
				<div class="kicker text-emerald-700 mb-4">If this resonated</div>
				<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight">
					You might also want <em class="font-story italic font-normal text-stone-500"
						>to sit with these.</em
					>
				</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{#each data.relatedPosts as relatedPost}
					<article
						class="bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col"
					>
						{#if relatedPost.image}
							<a href="/blog/{relatedPost.slug}" class="block h-44 overflow-hidden">
								<img
									src={relatedPost.image}
									alt={relatedPost.title}
									width="900"
									height="600"
									class="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700"
									loading="lazy"
								/>
							</a>
						{/if}
						<div class="p-6 flex flex-col flex-1">
							<h3 class="font-serif text-lg text-ecohubs-deep leading-snug mb-3">
								<a
									href="/blog/{relatedPost.slug}"
									class="hover:text-ecohubs-primary transition-colors"
								>
									{relatedPost.title}
								</a>
							</h3>
							<p class="text-stone-700 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
								{relatedPost.excerpt}
							</p>
							<a
								href="/blog/{relatedPost.slug}"
								class="text-sm text-ecohubs-dark font-medium hover:text-ecohubs-deep transition-colors inline-flex items-center gap-1 group self-start"
							>
								Read this one
								<span class="transition-transform group-hover:translate-x-0.5">→</span>
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════
		FOOTER (share + back to blog)
═══════════════════════════════════════════════════════════════════ -->
<section class="py-20 md:py-24 bg-ecohubs-base border-t border-stone-200/70">
	<div class="max-w-3xl mx-auto px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
			<div>
				<div class="kicker text-emerald-700 mb-2">Pass it on</div>
				<p class="font-story italic text-lg text-ecohubs-deep">
					If this letter found you — it might find someone you know, too.
				</p>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex flex-wrap items-center gap-2" aria-label="Share this letter">
					{#each shareLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share on {link.label}"
							title="Share on {link.label}"
							class="share-btn inline-flex items-center justify-center w-11 h-11 rounded-full border border-stone-300 text-stone-800 hover:border-ecohubs-dark hover:bg-ecohubs-dark transition-colors"
						>
							<img src={link.icon} alt="" width="18" height="18" class="w-[18px] h-[18px]" />
						</a>
					{/each}
				</div>
				<a
					href="/blog"
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ecohubs-dark text-white text-sm font-medium hover:bg-ecohubs-deep transition-colors group ml-auto sm:ml-2"
				>
					<span class="transition-transform group-hover:-translate-x-0.5">←</span>
					Back to all letters
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Body & UI typography mirrors the rest of the v2 site. */
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

	:global(.soft-shadow) {
		box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
	}

	.share-btn img {
		transition: filter 0.2s ease;
	}
	.share-btn:hover img {
		filter: invert(1) brightness(1.2);
	}

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
		margin: 0 auto;
	}

	:global(.grain)::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.5;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}

	/* ────────────────────────────────────────────────────────────────────
	   Long-form article styles — Pridi headings, generous Inter body, and
	   ecohubs-tinted accents that match the rest of the v2 design.
	──────────────────────────────────────────────────────────────────── */

	:global(.prose-ecohubs) {
		color: #1c1917;
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 1.0625rem;
		line-height: 1.8;
	}

	:global(.prose-ecohubs h1),
	:global(.prose-ecohubs h2),
	:global(.prose-ecohubs h3),
	:global(.prose-ecohubs h4),
	:global(.prose-ecohubs h5),
	:global(.prose-ecohubs h6) {
		font-family: 'Pridi', Georgia, 'Times New Roman', serif;
		color: #0b2e24;
		font-weight: 500;
		letter-spacing: -0.005em;
	}

	:global(.prose-ecohubs h1) {
		font-size: 2.25em;
		margin-top: 1.6em;
		margin-bottom: 0.7em;
		line-height: 1.15;
	}

	:global(.prose-ecohubs h2) {
		font-size: 1.7em;
		margin-top: 2em;
		margin-bottom: 0.8em;
		line-height: 1.2;
	}

	:global(.prose-ecohubs h3) {
		font-size: 1.35em;
		margin-top: 1.7em;
		margin-bottom: 0.7em;
		color: #064e3b;
	}

	:global(.prose-ecohubs h4),
	:global(.prose-ecohubs h5),
	:global(.prose-ecohubs h6) {
		color: #064e3b;
		margin-top: 1.4em;
		margin-bottom: 0.6em;
	}

	:global(.prose-ecohubs p) {
		margin-top: 1em;
		margin-bottom: 1em;
	}

	:global(.prose-ecohubs a) {
		color: #064e3b;
		text-decoration: underline;
		text-decoration-color: rgba(5, 150, 105, 0.4);
		text-underline-offset: 3px;
		transition: all 0.2s;
	}

	:global(.prose-ecohubs a:hover) {
		color: #059669;
		text-decoration-color: #059669;
	}

	:global(.prose-ecohubs blockquote) {
		font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
		font-style: italic;
		font-size: 1.2em;
		line-height: 1.55;
		color: #0b2e24;
		border-left: 3px solid #059669;
		padding: 0.2em 0 0.2em 1.4em;
		margin: 1.8em 0;
	}

	:global(.prose-ecohubs blockquote p) {
		margin: 0.4em 0;
	}

	:global(.prose-ecohubs strong) {
		font-weight: 600;
		color: #0b2e24;
	}

	:global(.prose-ecohubs em) {
		font-style: italic;
		font-family: 'Fraunces', Georgia, serif;
	}

	:global(.prose-ecohubs ul),
	:global(.prose-ecohubs ol) {
		margin-top: 1em;
		margin-bottom: 1em;
		padding-left: 1.6em;
	}

	:global(.prose-ecohubs ul) {
		list-style-type: disc;
	}

	:global(.prose-ecohubs ol) {
		list-style-type: decimal;
	}

	:global(.prose-ecohubs li) {
		margin-top: 0.4em;
		margin-bottom: 0.4em;
		padding-left: 0.4em;
	}

	:global(.prose-ecohubs ul > li::marker) {
		color: #059669;
	}

	:global(.prose-ecohubs ol > li::marker) {
		color: #059669;
		font-weight: 600;
	}

	:global(.prose-ecohubs code) {
		background-color: #f5f2ea;
		color: #064e3b;
		padding: 0.15em 0.4em;
		border-radius: 4px;
		font-size: 0.92em;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	:global(.prose-ecohubs pre) {
		background-color: #0b2e24;
		color: #e7e2d4;
		padding: 1.25em 1.4em;
		border-radius: 12px;
		overflow-x: auto;
		font-size: 0.92em;
		line-height: 1.6;
		margin: 1.6em 0;
	}

	:global(.prose-ecohubs pre code) {
		background: transparent;
		color: inherit;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
	}

	/* Media (images, videos, embeds) fills the text column width. */
	:global(.prose-ecohubs figure),
	:global(.prose-ecohubs img),
	:global(.prose-ecohubs video),
	:global(.prose-ecohubs iframe),
	:global(.prose-ecohubs .kg-image-card),
	:global(.prose-ecohubs .kg-video-card),
	:global(.prose-ecohubs .kg-embed-card),
	:global(.prose-ecohubs .kg-gallery-card) {
		display: block;
		width: 100%;
		max-width: 100%;
		margin-top: 2em;
		margin-bottom: 2em;
		height: auto;
		border-radius: 16px;
		box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
	}

	:global(.prose-ecohubs figure img),
	:global(.prose-ecohubs figure video),
	:global(.prose-ecohubs figure iframe),
	:global(.prose-ecohubs .kg-image-card img),
	:global(.prose-ecohubs .kg-video-card video),
	:global(.prose-ecohubs .kg-video-card iframe),
	:global(.prose-ecohubs .kg-embed-card iframe) {
		width: 100%;
		max-width: 100%;
		margin: 0;
		border-radius: inherit;
		box-shadow: none;
	}

	:global(.prose-ecohubs iframe) {
		aspect-ratio: 16 / 9;
	}

	:global(.prose-ecohubs figcaption) {
		font-family: 'Fraunces', Georgia, serif;
		font-style: italic;
		text-align: center;
		color: #6b6b62;
		font-size: 0.92em;
		margin-top: 0.8em;
	}

	:global(.prose-ecohubs hr) {
		border: none;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
		margin: 2.4em 0;
	}

	:global(.prose-ecohubs table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.8em 0;
		font-size: 0.95em;
	}

	:global(.prose-ecohubs th),
	:global(.prose-ecohubs td) {
		border: 1px solid #e7e2d4;
		padding: 0.7em 1em;
		text-align: left;
	}

	:global(.prose-ecohubs th) {
		background-color: #f5f2ea;
		font-family: 'Pridi', Georgia, serif;
		font-weight: 500;
		color: #0b2e24;
	}
</style>
