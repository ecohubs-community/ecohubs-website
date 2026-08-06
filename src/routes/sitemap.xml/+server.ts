import type { RequestHandler } from './$types';
import { getAllAuthors, getAllPosts, MIN_POSTS_FOR_INDEXABLE_TAG } from '$lib/server/blog';
import { sitemapEntries as learningEntries } from '$lib/learning';

const siteUrl = 'https://ecohubs.community';

interface SitemapRoute {
	path: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
}

/**
 * The Learning Hub's section index pages.
 *
 * Derived rather than written out one by one: each was previously its own
 * near-identical block, and adding `/learn/guides` meant remembering to write a
 * fifth — which is exactly how it came to be missing.
 *
 * A section appears only once it holds something indexable, and its `lastmod`
 * is the newest thing it contains. An index over nothing but stubs is itself
 * thin, and dating it "today" would be the kind of lie the note below warns of.
 */
function learnSectionRoutes(): SitemapRoute[] {
	const all = learningEntries();
	return [
		'/learn/compare',
		'/learn/guides',
		'/learn/glossary',
		'/learn/paths',
		'/learn/topics'
	].flatMap((path) => {
		const lastmod = all
			.filter((e) => e.url.startsWith(`${path}/`))
			.map((e) => e.lastmod)
			.sort()
			.at(-1);
		return lastmod ? [{ path, priority: '0.6', changefreq: 'weekly', lastmod }] : [];
	});
}

/*
 * `lastmod` is the one hint here Google actually reads (priority and changefreq
 * are ignored). It is only useful while it stays truthful, so these are real
 * last-substantive-change dates, not the build date — stamping every page with
 * "today" on each deploy teaches crawlers to distrust the field entirely.
 *
 * Update the date on a page when you meaningfully change its content.
 * Blog posts and tag pages get theirs from Ghost automatically, below.
 */
const routes: SitemapRoute[] = [
	{ path: '', priority: '1.0', changefreq: 'weekly', lastmod: '2026-08-04' },
	{ path: '/vision', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-23' },
	{ path: '/rcos', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/csi', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/votecast', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/seeking', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/membership', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-04' },
	{ path: '/join', priority: '0.7', changefreq: 'monthly', lastmod: '2026-06-28' },
	{ path: '/contact', priority: '0.7', changefreq: 'yearly', lastmod: '2026-08-04' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: '2026-08-04' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-04' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-04' },

	// Landing pages
	{
		path: '/community-resilience-assessment',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-06-16'
	},
	{ path: '/join-the-waitlist', priority: '0.9', changefreq: 'weekly', lastmod: '2026-07-24' },
	{ path: '/links', priority: '0.6', changefreq: 'weekly', lastmod: '2026-06-23' }
	// Note: /welcome is intentionally omitted — it's a noindex interstitial.
];

export const prerender = true;

export const GET: RequestHandler = async () => {
	const blogPosts = await getAllPosts();

	// Collect tag slugs, remembering the newest post date behind each one so the
	// tag archive can carry a truthful `lastmod` rather than none at all.
	// `getAllPosts` returns newest-first, so the first sighting of a tag wins.
	// Tags too thin to be indexable are left out entirely — the route marks them
	// `noindex`, and listing a noindex URL in the sitemap sends mixed signals.
	const tagLastmod = new Map<string, string>();
	const tagCount = new Map<string, number>();
	for (const post of blogPosts) {
		for (const tag of post.tags ?? []) {
			if (!tagLastmod.has(tag.slug)) tagLastmod.set(tag.slug, post.date);
			tagCount.set(tag.slug, (tagCount.get(tag.slug) ?? 0) + 1);
		}
	}
	for (const [slug, count] of tagCount) {
		if (count < MIN_POSTS_FOR_INDEXABLE_TAG) tagLastmod.delete(slug);
	}

	// Author archives. Ghost only exposes authors who have published, so every
	// one of these has posts behind it; `lastmod` is their newest post.
	const authorLastmod = new Map<string, string>();
	for (const post of blogPosts) {
		if (post.authorSlug && !authorLastmod.has(post.authorSlug)) {
			authorLastmod.set(post.authorSlug, post.date);
		}
	}
	const authors = await getAllAuthors();

	const allRoutes = [
		...routes,
		...blogPosts.map((post) => ({
			path: `/blog/${post.slug}`,
			priority: '0.7',
			changefreq: 'monthly' as const,
			lastmod: post.date
		})),
		...Array.from(
			tagLastmod,
			([slug, lastmod]): SitemapRoute => ({
				path: `/blog/tag/${slug}`,
				priority: '0.5',
				changefreq: 'weekly',
				lastmod
			})
		),
		...(authors.length
			? [
					{
						path: '/blog/authors',
						priority: '0.5',
						changefreq: 'monthly',
						lastmod: authors
							.map((a) => authorLastmod.get(a.slug))
							.filter((d): d is string => Boolean(d))
							.sort()
							.at(-1)
					} as SitemapRoute
				]
			: []),
		...authors.map(
			(a): SitemapRoute => ({
				path: `/blog/authors/${a.slug}`,
				priority: '0.6',
				changefreq: 'monthly',
				lastmod: authorLastmod.get(a.slug)
			})
		),
		// Learning Hub. `sitemapEntries()` already applies `isIndexable`, so
		// drafts and stubs are filtered at the source rather than here — one
		// gate driving both the sitemap and each page's robots meta.
		//
		// The hub and glossary index are listed only once there is something
		// behind them; an empty section should not be offered to a crawler.
		// `lastmod` is the newest thing they contain, which is truthful and
		// updates itself.
		...(learningEntries().length
			? ([
					{
						path: '/learn',
						priority: '0.7',
						changefreq: 'weekly',
						lastmod: learningEntries()
							.map((e) => e.lastmod)
							.sort()
							.at(-1)
					},
					...learnSectionRoutes()
				] as SitemapRoute[])
			: []),
		...learningEntries().map(
			({ url, lastmod }): SitemapRoute => ({
				path: url,
				priority: '0.5',
				changefreq: 'monthly',
				lastmod
			})
		)
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>${route.lastmod ? `\n    <lastmod>${new Date(route.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
