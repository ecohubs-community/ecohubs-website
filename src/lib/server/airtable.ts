import Airtable from 'airtable';
import type { ApplicationFormData } from '$lib/config/application-questions';
import { AIRTABLE_API_KEY, AIRTABLE_APPLICATIONS_TABLE, AIRTABLE_BASE_ID } from '$env/static/private';
import { randomUUID } from 'crypto';

let base: Airtable.Base | null = null;

/**
 * Initialize and return the Airtable base instance
 * Uses singleton pattern to reuse the same instance
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
 * Transform PAGE 1 data for Members table
 */
function transformMemberData(data: ApplicationFormData): Record<string, string> {
	return {
		"E-mail": data.email || '',
		"Member Name": data.fullName || '',
		"Location": data.location || '',
		"Time Availability": data.timeAvailability || '',
		"Languages": data.languages || '',
		"How Discovered": data.discovery || '',
	};
}

/**
 * Transform application form data to Airtable field format
 * - Converts arrays to comma-separated strings
 * - Handles optional fields
 * - Adds metadata fields
 * - Excludes PAGE 1 fields (stored in Members table)
 */
function transformApplicationData(
	data: ApplicationFormData,
	timestamp: string,
	applicationId: string,
	memberId: string
): Record<string, string | number | string[]> {
	return {
		// Link to Member
		"Related Member": [memberId],

		// Page 2: Values & Vision
		"Resonance": data.resonanceCombined || '',
		"Nature Community Meaning": data.natureCommunityMeaning || '',
		"Values": Array.isArray(data.values) ? data.values.join(', ') : data.values || '',

		// Page 3: Emotional Maturity & Communication
		"Work Group": data.groupWork || '',
		"Teamwork Moment": data.teamworkMoment || '',
		"Disagreement Response": data.disagreementResponse || '',
		"Disagreement Response Other": data.disagreementResponseOther || '',
		"Idea Not Chosen": data.ideaNotChosen || '',
		"Idea Not Chosen Other": data.ideaNotChosenOther || '',
		"Comfort Feedback": data.comfortFeedback || 0,
		"Comfort Asking Help": data.comfortAskingHelp || 0,
		"Adapt to Change": data.adaptToChange || 0,
		"Decision Making Value": data.decisionMakingValue || '',

		// Page 4: Motivation, Contribution, Skills
		"Motivation": data.motivation || '',
		"Contribution": data.contribution || '',
		"Receive and Learn": data.receiveLearn || '',
		"Experience Areas": Array.isArray(data.experienceAreas)
			? data.experienceAreas.join(', ')
			: data.experienceAreas || '',
		"Experience Areas Other": data.experienceAreasOther || '',
		"Proud Project": data.proudProject || '',
		"Best Work Environments": data.bestWorkEnvironments || '',

		// Page 5: Stability, Challenges, Next Steps
		"Manage Commitments": data.manageCommitments || '',
		"Collaboration Challenges": data.collaborationChallengesMerged || '',
		"Concerns and Doubts": data.concernsDoubts || '',
		"How to Start Contributing": data.howStartContributing || '',
		"Anything Else": data.anythingElse || '',

		// Metadata
		"Application ID": applicationId,
		"Submitted At": timestamp,
		"Status": 'New',
	};
}

/**
 * Error types for Airtable operations
 */
export class AirtableError extends Error {
	constructor(
		message: string,
		public readonly originalError?: unknown,
		public readonly recordId?: string
	) {
		super(message);
		this.name = 'AirtableError';
	}
}

/**
 * Find or create a Member by email
 * @param data - Application form data (PAGE 1 fields)
 * @returns Promise that resolves to the Member record ID
 * @throws {AirtableError} If the operation fails
 */
async function findOrCreateMember(
	data: ApplicationFormData,
	airtableBase: Airtable.Base
): Promise<string> {
	const membersTableName = 'Members';
	const memberFields = transformMemberData(data);

	try {
		// Try to find existing member by email
		const existingRecords = await airtableBase(membersTableName)
			.select({
				filterByFormula: `{email} = "${data.email}"`,
				maxRecords: 1,
			})
			.firstPage();

		if (existingRecords.length > 0) {
			const memberId = existingRecords[0].id;
			console.log(`Found existing member: ${memberId} (${data.email})`);
			
			// Update member fields in case they've changed
			await airtableBase(membersTableName).update([
				{
					id: memberId,
					fields: memberFields,
				},
			]);
			
			return memberId;
		}

		// Create new member
		const records = await airtableBase(membersTableName).create([
			{
				fields: memberFields,
			},
		]);

		if (records.length === 0) {
			throw new AirtableError('No member record was created in Airtable');
		}

		const memberId = records[0].id;
		console.log(`Created new member: ${memberId} (${data.email})`);
		return memberId;
	} catch (error) {
		if (error instanceof AirtableError) {
			throw error;
		}

		// Handle Airtable-specific errors
		if (error instanceof Error) {
			if (error.message.includes('404') || error.message.includes('Not Found')) {
				throw new AirtableError(
					`Airtable table "${membersTableName}" not found. Check table name and base ID.`,
					error
				);
			}

			if (error.message.includes('422') || error.message.includes('Invalid')) {
				throw new AirtableError(
					'Airtable field validation failed for Members table. Check field names and types.',
					error
				);
			}

			throw new AirtableError(`Failed to find or create member: ${error.message}`, error);
		}

		throw new AirtableError('Unknown error occurred while finding or creating member', error);
	}
}

/**
 * Save application data to Airtable
 * Creates or updates Member first, then creates Application linked to Member
 * @param data - Application form data
 * @param timestamp - ISO timestamp string
 * @returns Promise that resolves to the created application record ID, or null if Airtable is not configured
 * @throws {AirtableError} If the save operation fails
 */
export async function saveApplication(
	data: ApplicationFormData,
	timestamp: string
): Promise<string | null> {
	const airtableBase = getAirtableBase();

	if (!airtableBase) {
		return null;
	}

	// Generate UUID for application
	const applicationId = randomUUID();

	// Find or create Member first
	let memberId: string;
	try {
		memberId = await findOrCreateMember(data, airtableBase);
	} catch (error) {
		if (error instanceof AirtableError) {
			throw error;
		}
		throw new AirtableError('Failed to find or create member', error);
	}

	// Create Application linked to Member
	const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';
	const fields = transformApplicationData(data, timestamp, applicationId, memberId);

	try {
		const records = await airtableBase(tableName).create([
			{
				fields,
			},
		]);

		if (records.length === 0) {
			throw new AirtableError('No record was created in Airtable');
		}

		const recordId = records[0].id;
		console.log(`Application saved to Airtable: ${recordId} (Application ID: ${applicationId}, Member: ${memberId})`);
		return recordId;
	} catch (error) {
		// Handle Airtable-specific errors
		if (error instanceof Error) {
			// Check for rate limiting
			if (error.message.includes('429') || error.message.includes('rate limit')) {
				throw new AirtableError(
					'Airtable rate limit exceeded. Please try again later.',
					error
				);
			}

			// Check for authentication errors
			if (error.message.includes('401') || error.message.includes('Unauthorized')) {
				throw new AirtableError('Airtable authentication failed. Check API key.', error);
			}

			// Check for not found errors
			if (error.message.includes('404') || error.message.includes('Not Found')) {
				throw new AirtableError(
					`Airtable table "${tableName}" not found. Check table name and base ID.`,
					error
				);
			}

			// Check for field validation errors
			if (error.message.includes('422') || error.message.includes('Invalid')) {
				throw new AirtableError(
					'Airtable field validation failed. Check field names and types.',
					error
				);
			}

			// Generic error
			throw new AirtableError(`Failed to save application to Airtable: ${error.message}`, error);
		}

		// Unknown error type
		throw new AirtableError('Unknown error occurred while saving to Airtable', error);
	}
}

/**
 * Verify Airtable connection and configuration
 * @returns true if Airtable is properly configured, false otherwise
 */
export async function verifyAirtableConnection(): Promise<boolean> {
	const airtableBase = getAirtableBase();

	if (!airtableBase) {
		return false;
	}

	const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';

	try {
		// Try to read the first page (limit 1) to verify connection
		await airtableBase(tableName).select({ maxRecords: 1 }).firstPage();
		return true;
	} catch (error) {
		console.error('Airtable connection verification failed:', error);
		return false;
	}
}

