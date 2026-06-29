import type { RequestHandler } from './$types';
import { getAllPosts } from '$lib/server/blog';

const siteUrl = 'https://ecohubs.community';

interface SitemapRoute {
	path: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
}

const routes: SitemapRoute[] = [
	{ path: '', priority: '1.0', changefreq: 'weekly' },
	{ path: '/vision', priority: '0.9', changefreq: 'monthly' },
	{ path: '/rcos', priority: '0.8', changefreq: 'monthly' },
	{ path: '/membership', priority: '0.9', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/join', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.7', changefreq: 'yearly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' },

	// Landing pages
	{ path: '/community-resilience-assessment', priority: '0.8', changefreq: 'monthly' },
	{ path: '/join-the-waitlist', priority: '0.9', changefreq: 'weekly' },
	{ path: '/links', priority: '0.6', changefreq: 'weekly' },
	// Note: /welcome is intentionally omitted — it's a noindex interstitial.
];

export const prerender = true;

export const GET: RequestHandler = async () => {
	const blogPosts = await getAllPosts();

	// Collect unique tag slugs across all posts for tag-archive pages.
	const tagSlugs = new Set<string>();
	for (const post of blogPosts) {
		for (const tag of post.tags ?? []) {
			tagSlugs.add(tag.slug);
		}
	}

	const allRoutes = [
		...routes,
		...blogPosts.map((post) => ({
			path: `/blog/${post.slug}`,
			priority: '0.7',
			changefreq: 'monthly' as const,
			lastmod: post.date
		})),
		...Array.from(tagSlugs).map(
			(slug): SitemapRoute => ({
				path: `/blog/tag/${slug}`,
				priority: '0.5',
				changefreq: 'weekly'
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
