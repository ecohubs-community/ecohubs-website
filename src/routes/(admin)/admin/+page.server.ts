import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getCachedSafeOwners } from '$lib/server/safe-auth';
import Airtable from 'airtable';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_APPLICATIONS_TABLE } from '$env/static/private';

let base: Airtable.Base | null = null;

function getAirtableBase(): Airtable.Base | null {
	if (base) {
		return base;
	}

	const apiKey = AIRTABLE_API_KEY;
	const baseId = AIRTABLE_BASE_ID;

	if (!apiKey || !baseId) {
		return null;
	}

	try {
		Airtable.configure({ apiKey });
		base = new Airtable({ apiKey }).base(baseId);
		return base;
	} catch (error) {
		console.error('Failed to initialize Airtable:', error);
		return null;
	}
}

async function getApplicationCount(): Promise<number> {
	const airtableBase = getAirtableBase();
	if (!airtableBase) {
		return 0;
	}

	try {
		const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';
		const table = airtableBase(tableName);
		const records = await table.select({}).all();
		return records.length;
	} catch (err) {
		console.error('Error fetching application count:', err);
		return 0;
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	// Ensure user is authenticated (should be handled by hooks, but double-check)
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	try {
		// Fetch stats in parallel
		const [safeOwners, applicationCount] = await Promise.all([
			getCachedSafeOwners(),
			getApplicationCount()
		]);

		return {
			user: locals.user,
			stats: {
				safeOwnersCount: safeOwners.length,
				applicationCount
			}
		};
	} catch (err) {
		console.error('Error loading admin dashboard:', err);
		throw error(500, 'Failed to load dashboard data');
	}
};

