import type { RequestHandler } from './$types';

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
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
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



