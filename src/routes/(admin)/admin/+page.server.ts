import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getCachedSafeOwners } from '$lib/server/safe-auth';

export const load: PageServerLoad = async ({ locals }) => {
	// Ensure user is authenticated (should be handled by hooks, but double-check)
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	try {
		const safeOwners = await getCachedSafeOwners();

		return {
			user: locals.user,
			stats: {
				safeOwnersCount: safeOwners.length
			}
		};
	} catch (err) {
		console.error('Error loading admin dashboard:', err);
		throw error(500, 'Failed to load dashboard data');
	}
};
