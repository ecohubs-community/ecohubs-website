import { fail } from '@sveltejs/kit';
import { parsePhase } from '$lib/config/events';
import { seriesPhase } from '$lib/config/rcos-workshop';

// Not prerendered: sessions go from "register" to "live" to "recording coming
// soon" on their own dates, and a prerendered file would keep inviting people
// to a session that has already happened until the next deploy. The page also
// re-checks the clock in the browser, so an hour at the edge is harmless.
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

export const actions = {
	// The "tell me when" form without JavaScript (or submitted before
	// hydration). With JavaScript the page posts to /api/newsletter itself;
	// this hands the same address to the same endpoint, so validation, rate
	// limiting and both mailing lists stay in one place.
	default: async ({ request, fetch }) => {
		const email = String((await request.formData()).get('email') ?? '').trim();
		if (!email) return fail(400, { message: 'Please enter your email address.' });

		const res = await fetch('/api/newsletter', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		if (!res.ok) {
			const body = (await res.json().catch(() => ({}))) as { message?: string };
			return fail(res.status, {
				message: body.message || 'Could not subscribe. Please try again.'
			});
		}
		return { subscribed: true };
	}
};
