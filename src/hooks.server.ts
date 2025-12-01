import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { verifyJWT } from '$lib/server/auth-helpers';

export const handle: Handle = async ({ event, resolve }) => {
	// Get token from cookie
	const token = event.cookies.get('auth_token');

	// Verify token and add to locals
	if (token) {
		try {
			const payload = await verifyJWT(token);
			event.locals.user = payload;
		} catch (err) {
			// Invalid token, clear cookie
			event.cookies.delete('auth_token', { path: '/' });
		}
	}

	// Protect /admin routes (except sign-in page)
	if (event.url.pathname.startsWith('/admin')) {
		if (!event.locals.user) {
			throw redirect(303, '/auth/signin');
		}
	}

	// Redirect authenticated users away from sign-in page
	if (event.url.pathname === '/auth/signin' && event.locals.user) {
		throw redirect(303, '/admin');
	}

	// Apply paraglide middleware
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};
