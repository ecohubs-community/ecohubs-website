import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { SNAPSHOT_SPACE } from '$env/static/private';
import { env } from '$env/dynamic/private';

export interface DraftWithProposal {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	updated_at: string;
	tags?: string[];
	proposalId: string | null;
	proposalStatus: 'none' | 'active' | 'closed';
	isApproved: boolean;
	proposalEnd?: number;
}

export const load: PageServerLoad = async ({ locals }) => {
	// Ensure user is authenticated
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	try {
		// Fetch all drafts from Ghost (dynamic import to avoid circular dependencies)
		const { getAllGhostDrafts } = await import('$lib/server/ghost');
		const drafts = await getAllGhostDrafts();
		
		// Import Snapshot functions dynamically
		const {
			getProposalForDraft,
			getProposalStatus,
			isProposalApproved
		} = await import('$lib/server/blog-snapshot');

		// Enrich drafts with proposal information
		const draftsWithProposals: DraftWithProposal[] = await Promise.all(
			drafts.map(async (draft) => {
				// Check custom fields first
				const customFields = draft.custom_fields as Record<string, unknown> | undefined;
				const proposalIdFromFields = customFields?.snapshot_proposal_id;
				let proposalId: string | null =
					typeof proposalIdFromFields === 'string' ? proposalIdFromFields : null;

				// If not in custom fields, try to find by title pattern
				if (!proposalId) {
					proposalId = await getProposalForDraft(draft.title, draft.slug);
				}

				let proposalStatus: 'none' | 'active' | 'closed' = 'none';
				let isApproved = false;
				let proposalEnd: number | undefined;

				if (proposalId) {
					const status = await getProposalStatus(proposalId);
					if (status) {
						proposalStatus = status.status;
						proposalEnd = status.end;
						if (status.status === 'closed') {
							isApproved = await isProposalApproved(proposalId);
						}
					}
				}

				return {
					id: draft.id,
					slug: draft.slug,
					title: draft.title,
					excerpt: draft.excerpt || draft.custom_excerpt || '',
					author: draft.authors?.[0]?.name || 'Unknown',
					updated_at: draft.updated_at,
					tags: draft.tags?.map(tag => tag.name) || [],
					proposalId,
					proposalStatus,
					isApproved,
					proposalEnd
				};
			})
		);

		return {
			user: locals.user,
			drafts: draftsWithProposals,
			snapshotSpace: SNAPSHOT_SPACE || 'ecohubs.eth',
			votingDuration: parseInt(env.SNAPSHOT_BLOG_VOTING_DURATION || '172800') // 2 days default (172800 seconds)
		};
	} catch (err) {
		console.error('Error loading blog drafts page:', err);
		throw error(500, 'Failed to load blog drafts data');
	}
};
