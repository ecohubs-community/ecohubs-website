import { redirect } from '@sveltejs/kit';
import { GHOST_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

/**
 * Social-preview proxy for Ghost feature images.
 *
 * `og:image` cannot point straight at blog.ecohubs.community: that host sends
 * `robots.txt: Disallow: /`, which LinkedIn's and Facebook's crawlers honour
 * for images as well as pages, and Ghost serves whatever the author uploaded
 * — frequently WebP (LinkedIn can't decode it) or a 2 MB+ PNG.
 *
 * So we re-serve Ghost's own "1200px wide, re-encoded to JPEG" transform from
 * ecohubs.community, which crawlers are allowed to read. See `toSocialImageUrl`
 * in `$lib/server/ghost` for the URL-building side.
 */

export const prerender = false;

/** Mirrors GHOST_IMAGE_PATH in $lib/server/ghost — keeps this from being an open proxy. */
const SAFE_PATH = /^\d{4}\/\d{2}\/[A-Za-z0-9._-]+$/;

/** Ghost filenames are content-stamped (`foo-1.png` on re-upload), so a long TTL is safe. */
const UPSTREAM_CACHE = 'public, max-age=604800, s-maxage=31536000';

async function fetchImage(url: string): Promise<Response | null> {
	try {
		const upstream = await fetch(url);
		if (!upstream.ok || !upstream.headers.get('content-type')?.startsWith('image/')) {
			return null;
		}
		return upstream;
	} catch {
		return null;
	}
}

export const GET: RequestHandler = async ({ params }) => {
	const path = params.path;

	if (!GHOST_URL || !SAFE_PATH.test(path)) {
		redirect(302, '/og-blog.jpg');
	}

	// Ghost declines to transform formats it can't re-encode (GIF, SVG), so a
	// failed transform falls back to serving the original bytes.
	const base = GHOST_URL.replace(/\/$/, '');
	const upstream =
		(await fetchImage(`${base}/content/images/size/w1200/format/jpeg/${path}`)) ??
		(await fetchImage(`${base}/content/images/${path}`));

	if (!upstream) {
		redirect(302, '/og-blog.jpg');
	}

	const headers = new Headers({
		'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
		'Cache-Control': UPSTREAM_CACHE
	});
	const length = upstream.headers.get('content-length');
	if (length) headers.set('Content-Length', length);

	return new Response(upstream.body, { headers });
};

// Some crawlers probe with HEAD before fetching; without this they'd get a 405
// and skip the image entirely.
export const HEAD: RequestHandler = GET;
