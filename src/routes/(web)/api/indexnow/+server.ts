import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { submitToIndexNow } from '$lib/server/indexnow';

/*
 * Ping IndexNow when blog content changes.
 *
 * Wired to Ghost webhooks (Settings → Integrations → custom integration):
 *   post.published          → new post
 *   post.published.edited   → published post edited
 *   post.unpublished        → post pulled
 *   post.deleted            → post removed
 * Target URL: https://ecohubs.community/api/indexnow?token=$INDEXNOW_WEBHOOK_TOKEN
 *
 * Ghost does not sign custom webhooks, so the shared token in the query string
 * is the authentication. It only guards a "please recrawl these public URLs"
 * action, so the blast radius of a leak is nil — but it stops the endpoint
 * being used as free traffic against the IndexNow quota.
 *
 * Also accepts a manual list, for pinging static pages after a deploy:
 *   POST { "urls": ["https://ecohubs.community/rcos"] }
 */

const SITE = 'https://ecohubs.community';

/** Ghost sends `{ post: { current: {...}, previous: {...} } }`. */
interface GhostWebhookBody {
	post?: {
		current?: { slug?: string; status?: string } | null;
		previous?: { slug?: string; status?: string } | null;
	};
	urls?: string[];
}

export const POST: RequestHandler = async ({ request, url }) => {
	const expected = env.INDEXNOW_WEBHOOK_TOKEN;
	if (!expected) throw error(503, 'IndexNow webhook not configured');
	if (url.searchParams.get('token') !== expected) throw error(401, 'Unauthorized');

	let body: GhostWebhookBody;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Expected JSON');
	}

	const urls = new Set<string>();

	// Manual submission — an explicit list of already-absolute URLs.
	for (const u of body.urls ?? []) urls.add(u);

	// Ghost webhook. `previous` carries the old slug on a rename, so a renamed
	// post pings both: the new URL to index and the old one, now a 404, to drop.
	const current = body.post?.current;
	const previous = body.post?.previous;
	if (current?.slug) urls.add(`${SITE}/blog/${current.slug}`);
	if (previous?.slug && previous.slug !== current?.slug) {
		urls.add(`${SITE}/blog/${previous.slug}`);
	}

	// A publish or unpublish changes the listing pages too.
	if (current?.slug || previous?.slug) {
		urls.add(`${SITE}/blog`);
		urls.add(`${SITE}/blog/authors`);
	}

	if (urls.size === 0) return json({ ok: true, submitted: [], reason: 'no URLs in payload' });

	const result = await submitToIndexNow([...urls]);
	console.info('[indexnow] webhook result:', result);
	return json({ ok: true, ...result });
};
