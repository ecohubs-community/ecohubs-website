import Airtable from 'airtable';
import type { ApplicationFormData } from '$lib/config/application-questions';
import { AIRTABLE_API_KEY, AIRTABLE_APPLICATIONS_TABLE, AIRTABLE_BASE_ID } from '$env/static/private';

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
 * Transform application form data to Airtable field format
 * - Converts arrays to comma-separated strings
 * - Handles optional fields
 * - Adds metadata fields
 */
function transformApplicationData(
	data: ApplicationFormData,
	timestamp: string
): Record<string, string | number> {
	return {
		// Page 1: Basic Information
		fullName: data.fullName || '',
		email: data.email || '',
		location: data.location || '',
		timeAvailability: data.timeAvailability || '',
		languages: data.languages || '',
		discovery: data.discovery || '',

		// Page 2: Values & Vision
		resonanceCombined: data.resonanceCombined || '',
		natureCommunityMeaning: data.natureCommunityMeaning || '',
		values: Array.isArray(data.values) ? data.values.join(', ') : data.values || '',

		// Page 3: Emotional Maturity & Communication
		groupWork: data.groupWork || '',
		teamworkMoment: data.teamworkMoment || '',
		disagreementResponse: data.disagreementResponse || '',
		disagreementResponseOther: data.disagreementResponseOther || '',
		ideaNotChosen: data.ideaNotChosen || '',
		ideaNotChosenOther: data.ideaNotChosenOther || '',
		comfortFeedback: data.comfortFeedback || 0,
		comfortAskingHelp: data.comfortAskingHelp || 0,
		adaptToChange: data.adaptToChange || 0,
		decisionMakingValue: data.decisionMakingValue || '',

		// Page 4: Motivation, Contribution, Skills
		motivation: data.motivation || '',
		contribution: data.contribution || '',
		receiveLearn: data.receiveLearn || '',
		experienceAreas: Array.isArray(data.experienceAreas)
			? data.experienceAreas.join(', ')
			: data.experienceAreas || '',
		experienceAreasOther: data.experienceAreasOther || '',
		proudProject: data.proudProject || '',
		bestWorkEnvironments: data.bestWorkEnvironments || '',

		// Page 5: Stability, Challenges, Next Steps
		manageCommitments: data.manageCommitments || '',
		collaborationChallengesMerged: data.collaborationChallengesMerged || '',
		concernsDoubts: data.concernsDoubts || '',
		howStartContributing: data.howStartContributing || '',
		anythingElse: data.anythingElse || '',

		// Metadata
		submittedAt: timestamp,
		status: 'New',
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
 * Save application data to Airtable
 * @param data - Application form data
 * @param timestamp - ISO timestamp string
 * @returns Promise that resolves to the created record ID, or null if Airtable is not configured
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

	const tableName = AIRTABLE_APPLICATIONS_TABLE || 'Applications';
	const fields = transformApplicationData(data, timestamp);

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
		console.log(`Application saved to Airtable: ${recordId} (${data.email})`);
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

