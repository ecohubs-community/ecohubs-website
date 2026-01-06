import { error } from '@sveltejs/kit';

export function load() {
	// Page is not ready yet - return 404
	throw error(404, 'Page not found');
}
