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
