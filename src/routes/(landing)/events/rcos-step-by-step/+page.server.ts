import { parsePhase } from '$lib/config/events';
import { seriesPhase } from '$lib/config/rcos-workshop';

// Not prerendered: sessions go from "register" to "live" to "recording coming
// soon" on their own dates, and a prerendered file would keep inviting people
// to a session that has already happened until the next deploy. The page also
// re-checks the clock on mount, so an hour at the edge is harmless.
export function load({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=3600'
	});

	const preview = parsePhase(url.searchParams.get('phase'));
	return {
		renderedAt: Date.now(),
		phase: preview ?? seriesPhase(),
		preview: preview !== null
	};
}
