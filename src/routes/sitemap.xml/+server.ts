import type { RequestHandler } from './$types';
import { getAllPosts } from '$lib/server/blog';

const siteUrl = 'https://ecohubs.community';

const routes = [
	{ path: '', priority: '1.0', changefreq: 'weekly' },
	{ path: '/vision', priority: '0.9', changefreq: 'monthly' },
	{ path: '/dao', priority: '0.8', changefreq: 'monthly' },
	{ path: '/ecotoken', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blueprint', priority: '0.8', changefreq: 'monthly' },
	{ path: '/join', priority: '0.9', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.7', changefreq: 'yearly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' }
];

export const prerender = true;

export const GET: RequestHandler = async () => {
	const blogPosts = await getAllPosts();
	
	const allRoutes = [
		...routes,
		...blogPosts.map((post) => ({
			path: `/blog/${post.slug}`,
			priority: '0.7',
			changefreq: 'monthly' as const,
			lastmod: post.date
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${route.lastmod ? new Date(route.lastmod).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
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



