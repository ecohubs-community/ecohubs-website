import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	// Ensure user is authenticated
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const draftId = params.id;

	if (!draftId) {
		throw error(400, 'Draft ID is required');
	}

	try {
		const body = await request.json();
		const { proposalId } = body;

		if (!proposalId) {
			throw error(400, 'Proposal ID is required');
		}

		// Update Ghost custom fields (dynamic import)
		const { updateGhostPostCustomFields } = await import('$lib/server/ghost');
		await updateGhostPostCustomFields(draftId, {
			snapshot_proposal_id: proposalId
		});

		return json({ success: true, message: 'Proposal ID saved' });
	} catch (err) {
		console.error('Error updating proposal ID:', err);
		if (err instanceof Error && err.message.includes('Error')) {
			throw error(500, err.message);
		}
		throw error(500, 'Failed to update proposal ID');
	}
};

