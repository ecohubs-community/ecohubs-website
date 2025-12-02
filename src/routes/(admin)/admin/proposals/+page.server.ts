import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getApplicationsWithoutProposals, getApplications } from '$lib/server/airtable-proposals';
import { SNAPSHOT_SPACE, SNAPSHOT_VOTING_DURATION } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	// Ensure user is authenticated
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	try {
		// Fetch all applications and those without proposals
		const [allApplications, applicationsWithoutProposals] = await Promise.all([
			getApplications(),
			getApplicationsWithoutProposals()
		]);

		return {
			user: locals.user,
			snapshotSpace: SNAPSHOT_SPACE || 'ecohubs.eth',
			applications: allApplications,
			applicationsWithoutProposals,
			votingDuration: parseInt(SNAPSHOT_VOTING_DURATION || '604800')
		};
	} catch (err) {
		console.error('Error loading proposals page:', err);
		throw error(500, 'Failed to load applications data');
	}
};

