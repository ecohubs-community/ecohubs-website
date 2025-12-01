import { SNAPSHOT_NETWORK, SNAPSHOT_SPACE, SNAPSHOT_VOTING_DURATION } from '$env/static/private';
import type { ApplicationFormData } from '$lib/config/application-questions';
import type { ApplicationEmailData } from '$lib/email-templates/application';

/**
 * Error types for Snapshot operations
 */
export class SnapshotError extends Error {
	constructor(
		message: string,
		public readonly originalError?: unknown,
		public readonly proposalId?: string
	) {
		super(message);
		this.name = 'SnapshotError';
	}
}

/**
 * Format application data for Snapshot proposal body
 * Includes key information while maintaining privacy
 */
export function formatApplicationForSnapshot(data: ApplicationEmailData): string {
	return `## Application Review

**Applicant:** ${data.fullName}
**Location:** ${data.location}
**Time Availability:** ${data.timeAvailability}
**Languages:** ${data.languages}

### Values & Vision

**What Resonates with EcoHubs:** ${data.resonanceCombined.substring(0, 200)}${data.resonanceCombined.length > 200 ? '...' : ''}

**Living in Alignment with Nature:** ${data.natureCommunityMeaning.substring(0, 200)}${data.natureCommunityMeaning.length > 200 ? '...' : ''}

**Essential Values:** ${Array.isArray(data.values) ? data.values.join(', ') : data.values}

### Contribution & Experience

**Motivation:** ${data.motivation.substring(0, 200)}${data.motivation.length > 200 ? '...' : ''}

**What They Want to Contribute:** ${data.contribution.substring(0, 200)}${data.contribution.length > 200 ? '...' : ''}

**Experience Areas:** ${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}

**Proud Project:** ${data.proudProject.substring(0, 200)}${data.proudProject.length > 200 ? '...' : ''}

### Collaboration Style

**Comfort Receiving Feedback:** ${data.comfortFeedback}/10
**Comfort Asking for Help:** ${data.comfortAskingHelp}/10
**Adapt to Change:** ${data.adaptToChange}/10

**Decision-Making Value:** ${data.decisionMakingValue}

### Challenges & Next Steps

**Collaboration Challenges:** ${data.collaborationChallengesMerged.substring(0, 200)}${data.collaborationChallengesMerged.length > 200 ? '...' : ''}

**Concerns/Doubts:** ${data.concernsDoubts.substring(0, 200)}${data.concernsDoubts.length > 200 ? '...' : ''}

**How They Want to Start Contributing:** ${data.howStartContributing.substring(0, 200)}${data.howStartContributing.length > 200 ? '...' : ''}

---

*Submitted: ${new Date(data.timestamp).toLocaleString()}*

**Note:** Full application details are stored securely in Airtable. This proposal contains a summary for voting purposes.
`;
}

/**
 * Get the latest block number from Ethereum network
 * Required for Snapshot proposal creation
 */
async function getLatestBlockNumber(networkId: number = 1): Promise<number> {
	const rpcUrl =
		networkId === 1
			? 'https://eth.llamarpc.com'
			: networkId === 137
				? 'https://polygon.llamarpc.com'
				: `https://rpc.ankr.com/eth_goerli`;

	try {
		const response = await fetch(rpcUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: 'eth_blockNumber',
				params: [],
				id: 1,
			}),
		});

		const data = await response.json();
		if (data.error) {
			throw new Error(data.error.message);
		}

		// Convert hex to decimal
		return parseInt(data.result, 16);
	} catch (error) {
		console.error('Failed to get latest block number:', error);
		// Return a recent block number as fallback (approximate)
		// This is not ideal but allows proposal creation to continue
		return Math.floor(Date.now() / 1000 / 12); // Rough estimate: ~12 seconds per block
	}
}

/**
 * Create a Snapshot proposal for an application
 * 
 * IMPORTANT: Snapshot's public GraphQL API does NOT support mutations (proposal creation).
 * Proposals must be created through:
 * 1. The Snapshot web interface (with wallet signing)
 * 2. Wallet-signed messages (requires private key - not recommended server-side)
 * 3. Snapshot delegation features
 * 4. Webhook/automation integrations
 * 
 * This function will gracefully skip proposal creation and return null, as this is expected
 * behavior. The application submission will still succeed.
 * 
 * For automated proposal creation, consider:
 * - Using Snapshot's delegation system to allow a service account to create proposals
 * - Setting up webhook automation (e.g., Zapier, Make.com) to create proposals from Airtable
 * - Using Snapshot's API with proper wallet authentication (requires private key management)
 * - Creating proposals manually from the Snapshot interface
 * 
 * This is a non-blocking operation - application submission will succeed even if this returns null.
 * 
 * @param data - Application form data
 * @param applicationData - Formatted application email data
 * @returns Promise that resolves to null (proposals cannot be created via public API)
 */
export async function createApplicationProposal(
	data: ApplicationFormData,
	applicationData: ApplicationEmailData
): Promise<string | null> {
	const space = SNAPSHOT_SPACE;
	const networkId = parseInt(SNAPSHOT_NETWORK || '1');
	const votingDuration = parseInt(SNAPSHOT_VOTING_DURATION || '604800'); // 7 days default

	if (!space) {
		console.warn('Snapshot not configured: SNAPSHOT_SPACE missing');
		return null;
	}

	const title = `Application Review: ${data.fullName}`;
	const body = formatApplicationForSnapshot(applicationData);
	const choices = ['Approve', 'Reject', 'Needs Review'];
	const start = Math.floor(Date.now() / 1000);
	const end = start + votingDuration;

	try {
		// Get current block number for snapshot
		const snapshot = await getLatestBlockNumber(networkId);

		// Snapshot uses GraphQL API
		const query = `
			mutation CreateProposal($space: String!, $type: String!, $title: String!, $body: String!, $choices: [String!]!, $start: Int!, $end: Int!, $snapshot: Int!) {
				createProposal(
					space: $space
					type: $type
					title: $title
					body: $body
					choices: $choices
					start: $start
					end: $end
					snapshot: $snapshot
				) {
					id
				}
			}
		`;

		const variables = {
			space,
			type: 'single-choice',
			title,
			body,
			choices,
			start,
			end,
			snapshot,
		};

		// Snapshot GraphQL endpoint
		const snapshotApiUrl = 'https://hub.snapshot.org/graphql';
		
		const response = await fetch(snapshotApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		// Check if response is JSON before parsing
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			const text = await response.text();
			throw new SnapshotError(
				`Snapshot API returned non-JSON response (${response.status}): ${text.substring(0, 200)}`,
				{ status: response.status, text }
			);
		}

		const result = await response.json();

		if (result.errors) {
			const errorMessage = result.errors[0]?.message || 'Unknown Snapshot error';
			
			// Check for mutation errors (Snapshot doesn't allow mutations via public API)
			if (errorMessage.includes('mutations') || errorMessage.includes('mutation')) {
				console.warn(
					'Snapshot proposal creation skipped: Snapshot requires wallet signing for proposal creation. ' +
					'Proposals must be created through the Snapshot web interface or with wallet authentication. ' +
					'Consider using Snapshot delegation or webhook automation for automated proposal creation.'
				);
				// Return null instead of throwing - this is expected behavior
				return null;
			}

			// Check for authentication errors
			if (errorMessage.includes('unauthorized') || errorMessage.includes('authentication')) {
				throw new SnapshotError(
					'Snapshot authentication failed. Check your space configuration and permissions.',
					result.errors[0]
				);
			}

			// Check for validation errors
			if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
				throw new SnapshotError(
					`Snapshot validation failed: ${errorMessage}. Check your space settings and proposal format.`,
					result.errors[0]
				);
			}

			// Generic error
			throw new SnapshotError(`Failed to create Snapshot proposal: ${errorMessage}`, result.errors[0]);
		}

		if (!result.data?.createProposal?.id) {
			throw new SnapshotError('No proposal ID returned from Snapshot');
		}

		const proposalId = result.data.createProposal.id;
		const proposalUrl = `https://snapshot.org/#/${space}/proposal/${proposalId}`;
		
		console.log(`Snapshot proposal created: ${proposalId} (${data.email})`);
		console.log(`Proposal URL: ${proposalUrl}`);

		return proposalId;
	} catch (error) {
		if (error instanceof SnapshotError) {
			throw error;
		}

		// Handle network errors
		if (error instanceof Error) {
			if (error.message.includes('fetch')) {
				throw new SnapshotError(
					'Failed to connect to Snapshot API. Check your internet connection.',
					error
				);
			}

			throw new SnapshotError(`Failed to create Snapshot proposal: ${error.message}`, error);
		}

		// Unknown error type
		throw new SnapshotError('Unknown error occurred while creating Snapshot proposal', error);
	}
}

/**
 * Verify Snapshot connection and configuration
 * @returns true if Snapshot is properly configured, false otherwise
 */
export async function verifySnapshotConnection(): Promise<boolean> {
	const space = SNAPSHOT_SPACE;

	if (!space) {
		return false;
	}

	try {
		// Query Snapshot to verify space exists
		const query = `
			query GetSpace($id: String!) {
				space(id: $id) {
					id
					name
				}
			}
		`;

		// Snapshot GraphQL endpoint
		const snapshotApiUrl = 'https://hub.snapshot.org/graphql';
		
		const response = await fetch(snapshotApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables: { id: space },
			}),
		});

		const result = await response.json();

		if (result.errors) {
			console.error('Snapshot connection verification failed:', result.errors);
			return false;
		}

		return !!result.data?.space;
	} catch (error) {
		console.error('Snapshot connection verification failed:', error);
		return false;
	}
}

