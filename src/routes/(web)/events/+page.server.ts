import { parsePhase } from '$lib/config/events';

// Not prerendered: an event moves from "Coming up" to "Past" when its dates
// pass, and a prerendered file would keep it upcoming until the next deploy.
// The page also re-sorts on mount, so an hour at the edge is harmless.
export function load({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=3600'
	});

	return { renderedAt: Date.now(), preview: parsePhase(url.searchParams.get('phase')) };
}
