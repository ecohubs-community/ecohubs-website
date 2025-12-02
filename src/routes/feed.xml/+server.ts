import type { RequestHandler } from './$types';
import { getAllPosts } from '$lib/server/blog';

const siteUrl = 'https://ecohubs.community';

// XML escape function to prevent invalid XML
function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>EcoHubs.community Blog</title>
    <description>Articles about intentional communities, blockchain technology, and regenerative practices</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts
	.map(
		(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
      ${post.tags && post.tags.length > 0 ? `<category>${post.tags.map(tag => escapeXml(tag)).join('</category><category>')}</category>` : ''}
    </item>`
	)
	.join('\n')}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};




