import type { RequestHandler } from './$types';

const siteUrl = 'https://ecohubs.community';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// TODO: Fetch blog posts from mdsvex files
	const posts: Array<{ slug: string; title: string; description: string; date: string }> = [];

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
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




