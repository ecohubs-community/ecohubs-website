import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params, locals }) => {
	// Ensure user is authenticated
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const draftId = params.id;

	if (!draftId) {
		throw error(400, 'Draft ID is required');
	}

	try {
		// Get draft to check proposal ID
		const { getGhostDraft } = await import('$lib/server/ghost');
		const draft = await getGhostDraft(draftId);

		if (!draft) {
			throw error(404, 'Draft not found');
		}

		// Check if proposal exists and is approved
		const proposalId =
			draft.custom_fields?.snapshot_proposal_id ||
			(await import('$lib/server/blog-snapshot')).getProposalForDraft(draft.title, draft.slug);

		if (!proposalId) {
			throw error(400, 'No Snapshot proposal found for this draft');
		}

		// Import Snapshot functions dynamically
		const { getProposalStatus, isProposalApproved } = await import('$lib/server/blog-snapshot');
		
		// Check proposal status
		const proposalStatus = await getProposalStatus(proposalId);

		if (!proposalStatus || proposalStatus.status !== 'closed') {
			throw error(400, 'Proposal voting is still active');
		}

		// Check if approved
		const approved = await isProposalApproved(proposalId);

		if (!approved) {
			throw error(403, 'Proposal was not approved');
		}

		// Import and publish the draft
		const { publishGhostPost } = await import('$lib/server/ghost');
		await publishGhostPost(draftId);

		return json({ success: true, message: 'Draft published successfully' });
	} catch (err) {
		console.error('Error publishing draft:', err);
		if (err instanceof Error && err.message.includes('Error')) {
			throw error(500, err.message);
		}
		throw error(500, 'Failed to publish draft');
	}
};

