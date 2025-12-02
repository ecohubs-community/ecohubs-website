import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateApplicationProposalId } from '$lib/server/airtable-proposals';

export const POST: RequestHandler = async ({ request, locals }) => {
	// Ensure user is authenticated
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	try {
		const { recordId, proposalId } = await request.json();

		if (!recordId || !proposalId) {
			throw error(400, 'Missing required fields: recordId, proposalId');
		}

		await updateApplicationProposalId(recordId, proposalId);

		return json({ success: true });
	} catch (err) {
		console.error('Error updating proposal ID:', err);
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to update proposal ID');
	}
};

