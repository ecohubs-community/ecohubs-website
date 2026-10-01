import { campPhase, parsePhase } from '$lib/config/mycelium-camp';

// Not prerendered: the page flips to its "after the event" copy on 28 Oct and
// a prerendered file would keep promising tickets until the next deploy. An
// hour at the edge is plenty; the page also re-checks the date on mount.
export function load({ url, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=3600'
	});

	const preview = parsePhase(url.searchParams.get('phase'));
	return { phase: preview ?? campPhase(), preview: preview !== null };
}
