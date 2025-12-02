import Airtable from 'airtable';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_APPLICATIONS_TABLE, SNAPSHOT_SPACE } from '$env/static/private';
import { AirtableError } from './airtable';

let base: Airtable.Base | null = null;

// Cache applications for performance (refresh every 5 minutes)
let cachedApplications: ApplicationRecord[] | null = null;
let cacheTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface ApplicationRecord {
	id: string; // Airtable record ID
	applicationId: string; // UUID from Application ID field
	fullName: string;
	email: string;
	location: string;
	timeAvailability: string;
	languages: string;
	motivation: string;
	contribution: string;
	experienceAreas: string;
	proudProject: string;
	resonanceCombined: string;
	natureCommunityMeaning: string;
	values: string;
	submittedAt: string;
	status: string;
  aiRecommendation?: string;
	snapshotProposalId?: string; // Snapshot Proposal ID field
  snapshotProposalLink?: string; // Snapshot Proposal Link field
}

/**
 * Initialize and return the Airtable base instance
 */
function getAirtableBase(): Airtable.Base | null {
	if (base) {
		return base;
	}

	const apiKey = AIRTABLE_API_KEY;
	const baseId = AIRTABLE_BASE_ID;

	if (!apiKey || !baseId) {
		console.warn('Airtable not configured: AIRTABLE_API_KEY or AIRTABLE_BASE_ID missing');
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

/**
 * Get all applications from Airtable with caching
 * Fetches applications with related Member data
 */
export async function getApplications(): Promise<ApplicationRecord[]> {
	const now = Date.now();

	// Return cached data if available and fresh
	if (cachedApplications && cacheTime && now - cacheTime < CACHE_DURATION) {
		return cachedApplications;
	}

	const airtableBase = getAirtableBase();
	if (!airtableBase) {
		return cachedApplications || [];
	}

	const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';

	try {
		// Fetch all applications
		// Note: Airtable will return linked record IDs, not full records
		const records = await airtableBase(tableName)
			.select({
				sort: [{ field: 'Submitted At', direction: 'desc' }]
			})
			.all();

		// Transform records - we'll fetch member data separately if needed
		const applications: ApplicationRecord[] = await Promise.all(
			records.map(async (record) => {
				const fields = record.fields;
				const relatedMemberIds = (fields['Related Member'] as string[]) || [];
				const memberId = relatedMemberIds[0];

				// Fetch member data if linked
				let memberFields: Record<string, string> | null = null;
				if (memberId) {
					try {
						const membersTable = airtableBase('Members');
						const memberRecord = await membersTable.find(memberId);
						memberFields = memberRecord.fields as Record<string, string>;
					} catch (err) {
						console.warn(`Failed to fetch member ${memberId}:`, err);
					}
				}

				const space = SNAPSHOT_SPACE || 'ecohubs.eth';

				return {
					id: record.id,
					applicationId: (fields['Application ID'] as string) || '',
					fullName: (memberFields?.['Member Name'] as string) || 'Unknown',
					email: (memberFields?.['E-Mail'] as string) || '',
					location: (memberFields?.['Location'] as string) || '',
					timeAvailability: (memberFields?.['Time Availability'] as string) || '',
					languages: (memberFields?.['Languages'] as string) || '',
					motivation: (fields['Motivation'] as string) || '',
					contribution: (fields['Contribution'] as string) || '',
					experienceAreas: (fields['Experience Areas'] as string) || '',
					proudProject: (fields['Proud Project'] as string) || '',
					resonanceCombined: (fields['Resonance'] as string) || '',
					natureCommunityMeaning: (fields['Nature Community Meaning'] as string) || '',
					values: (fields['Values'] as string) || '',
					submittedAt: (fields['Submitted At'] as string) || '',
					status: (fields['Status'] as string) || 'New',
          aiRecommendation: (fields['Recommendation (AI)'] as string) || '',
					snapshotProposalId: (fields['Snapshot Proposal ID'] as string) || undefined,
          snapshotProposalLink: (fields['Snapshot Proposal Link'] as string) || (fields['Snapshot Proposal ID'] as string) ? `https://snapshot.org/#/${space}/proposal/${(fields['Snapshot Proposal ID'] as string)}` : undefined
				} as ApplicationRecord;
			})
		);

		cachedApplications = applications;
		cacheTime = now;

		return applications;
	} catch (error) {
		console.error('Error fetching applications from Airtable:', error);
		return cachedApplications || []; // Return stale cache on error
	}
}

/**
 * Get applications that don't have Snapshot proposals yet
 */
export async function getApplicationsWithoutProposals(): Promise<ApplicationRecord[]> {
	const applications = await getApplications();
	return applications.filter((app) => !app.snapshotProposalId);
}

/**
 * Update an application record with Snapshot proposal ID
 */
export async function updateApplicationProposalId(
	recordId: string,
	proposalId: string
): Promise<void> {
	const airtableBase = getAirtableBase();
	if (!airtableBase) {
		throw new AirtableError('Airtable not configured');
	}

	const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';

	try {
		await airtableBase(tableName).update([
			{
				id: recordId,
				fields: {
					'Snapshot Proposal ID': proposalId
				}
			}
		]);

		// Invalidate cache
		cachedApplications = null;
		cacheTime = null;

		console.log(`Updated application ${recordId} with proposal ID: ${proposalId}`);
	} catch (error) {
		if (error instanceof Error) {
			throw new AirtableError(`Failed to update proposal ID: ${error.message}`, error);
		}
		throw new AirtableError('Failed to update proposal ID', error);
	}
}

