import type { Handle, HandleServerError } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { notifyDiscordError } from '$lib/server/discord';

export const handle: Handle = async ({ event, resolve }) => {
	// Apply paraglide middleware
	return paraglideMiddleware(event.request, async ({ request, locale }) => {
		event.request = request;

		const response = await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});

		// Add security headers
		response.headers.set('X-Frame-Options', 'SAMEORIGIN');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

		return response;
	});
};

/**
 * Catch-all for unexpected server errors — anything that throws during a load,
 * action, or endpoint and isn't handled locally surfaces here as a 500. The
 * per-route handlers already alert on their known failure modes; this is the
 * safety net for everything else. SvelteKit only invokes this for uncaught
 * throws, so it never double-fires with the routes' own returned-500 alerts.
 */
export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	// 404s and other expected client errors also pass through here — only alert
	// on genuine server faults.
	if (status >= 500) {
		await notifyDiscordError({
			source: 'Unhandled server error',
			summary: `${status} at ${event.request.method} ${event.url.pathname}`,
			error,
			context: { route: event.route.id ?? event.url.pathname }
		});
	}
	// Preserve SvelteKit's default behaviour for the client-facing error.
	return { message };
};
