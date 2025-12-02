import { SNAPSHOT_SPACE } from '$env/static/private';
import type { ApplicationEmailData } from '$lib/email-templates/application';

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

