import type { RequestHandler } from '@sveltejs/kit';
import { getAllPosts } from '$lib/server/blog';

const SITE_URL = 'https://ecohubs.community';

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
	try {
		const posts = await getAllPosts();

		const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>EcoHubs Blog</title>
		<link>${SITE_URL}/blog</link>
		<description>Insights, updates, and reflections on regenerative community building, DAO governance, and the future of intentional living.</description>
		<language>en-US</language>
		<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${posts
			.map(
				(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${SITE_URL}/blog/${post.slug}</link>
			<description>${escapeXml(post.excerpt)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
			${post.image ? `<enclosure url="${post.image.startsWith('http') ? post.image : SITE_URL + post.image}" type="image/jpeg" />` : ''}
			${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
			${post.tags && post.tags.length > 0 ? `<category>${post.tags.map(escapeXml).join('</category><category>')}</category>` : ''}
		</item>`
			)
			.join('')}
	</channel>
</rss>`;

		return new Response(rss, {
			headers: {
				'Content-Type': 'application/rss+xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch (error) {
		console.error('Error generating RSS feed:', error);
		return new Response('Error generating RSS feed', { status: 500 });
	}
};
