import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

/*
 * IndexNow — tell participating search engines (Bing, Yandex, Seznam, Naver,
 * Yep) the moment a page appears, changes, or goes away, instead of waiting to
 * be recrawled. Google does not participate, so this complements the sitemap
 * rather than replacing it.
 *
 * Setup: the key must be served as a plain-text file at the site root whose
 * filename is the key itself — `static/<key>.txt`, containing only the key.
 * Set INDEXNOW_KEY to the same value.
 *
 * The protocol's own guidance, which the guardrails below enforce:
 *   - submit added, updated AND deleted URLs (404/410 helps them drop dead pages)
 *   - do NOT submit unchanged URLs, or cosmetic/layout-only changes
 *   - do NOT bulk-submit the whole site — that is what the sitemap is for
 *   - leave at least ~5 minutes between resubmissions of the same URL
 */

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_HOST = 'ecohubs.community';
const MAX_URLS_PER_REQUEST = 10_000;

/** Same URL is not resubmitted within this window (protocol asks for ~5 min). */
const RESUBMIT_COOLDOWN_MS = 5 * 60 * 1000;

/**
 * Recently submitted URLs → timestamp. In-memory, so it resets on cold start;
 * that is acceptable because the cooldown is advisory and the cost of an
 * occasional duplicate is a single ignored request.
 */
const recentlySubmitted = new Map<string, number>();

export interface IndexNowResult {
	submitted: string[];
	skipped: string[];
	status?: number;
	/** Set when submission was not attempted at all. */
	reason?: string;
}

function isOwnUrl(url: string): boolean {
	try {
		return new URL(url).host === SITE_HOST;
	} catch {
		return false;
	}
}

/**
 * Submit URLs whose content has actually changed.
 *
 * Returns rather than throws: a failed ping must never break the request that
 * triggered it (a Ghost webhook, a deploy hook). Callers log the result.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
	const key = env.INDEXNOW_KEY;
	if (!key) return { submitted: [], skipped: urls, reason: 'INDEXNOW_KEY not set' };

	const now = Date.now();
	const submitted: string[] = [];
	const skipped: string[] = [];

	for (const url of new Set(urls)) {
		if (!isOwnUrl(url)) {
			skipped.push(url); // Submitting another host's URL is rejected outright.
			continue;
		}
		const last = recentlySubmitted.get(url);
		if (last && now - last < RESUBMIT_COOLDOWN_MS) {
			skipped.push(url);
			continue;
		}
		submitted.push(url);
	}

	if (submitted.length === 0) {
		return { submitted, skipped, reason: 'nothing new to submit' };
	}
	if (dev) {
		// Pinging real search engines from a dev machine would be noise at best.
		console.info('[indexnow] dev — would submit:', submitted);
		return { submitted, skipped, reason: 'skipped in dev' };
	}

	const batch = submitted.slice(0, MAX_URLS_PER_REQUEST);
	try {
		const res = await fetch(ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ host: SITE_HOST, key, urlList: batch })
		});
		if (res.ok) for (const url of batch) recentlySubmitted.set(url, now);
		if (res.status === 429) console.warn('[indexnow] rate limited (429)');
		return { submitted: batch, skipped, status: res.status };
	} catch (error) {
		console.error('[indexnow] submission failed:', error);
		return { submitted: [], skipped: urls, reason: 'request failed' };
	}
}
