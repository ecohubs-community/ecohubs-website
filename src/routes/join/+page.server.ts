import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { applicationSchema, type ApplicationFormData } from '$lib/config/application-questions';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { sendEmail } from '$lib/server/email';
import { saveApplication, AirtableError } from '$lib/server/airtable';
import { createApplicationProposal, SnapshotError } from '$lib/server/snapshot';
import {
	getApplicationEmailHTML,
	getApplicationEmailText,
	getApplicationConfirmationHTML,
	getApplicationConfirmationText,
	type ApplicationEmailData
} from '$lib/email-templates/application';

export const load: PageServerLoad = async () => {
	// @ts-expect-error - Zod v3 compatibility with sveltekit-superforms
	const form = await superValidate(zod(applicationSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		// @ts-expect-error - Zod v3 compatibility with sveltekit-superforms
		const form = await superValidate(request, zod(applicationSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecohubs.community';
			const timestamp = new Date().toISOString();
			const data = form.data as ApplicationFormData;

			const applicationData: ApplicationEmailData = {
				// PAGE 1
				fullName: data.fullName,
				email: data.email,
				location: data.location,
				timeAvailability: data.timeAvailability,
				languages: data.languages,
				discovery: data.discovery,
				
				// PAGE 2
				resonance: data.resonance,
				missingInSociety: data.missingInSociety,
				attraction: data.attraction,
				values: data.values,
				alignmentWithNature: data.alignmentWithNature,
				
				// PAGE 3
				groupWork: data.groupWork,
				teamworkMoment: data.teamworkMoment,
				disagreementResponse: data.disagreementResponse,
				disagreementResponseOther: data.disagreementResponseOther,
				ideaNotChosen: data.ideaNotChosen,
				ideaNotChosenOther: data.ideaNotChosenOther,
				comfortFeedback: data.comfortFeedback,
				comfortAskingHelp: data.comfortAskingHelp,
				adaptToChange: data.adaptToChange,
				decisionMakingValue: data.decisionMakingValue,
				personalPatternOptional: data.personalPatternOptional,
				
				// PAGE 4
				motivation: data.motivation,
				contribution: data.contribution,
				receiveLearn: data.receiveLearn,
				communityMeaning: data.communityMeaning,
				joiningReason: data.joiningReason,
				
				// PAGE 5
				experienceAreas: data.experienceAreas,
				experienceAreasOther: data.experienceAreasOther,
				proudProject: data.proudProject,
				bestWorkEnvironments: data.bestWorkEnvironments,
				
				// PAGE 6
				manageCommitments: data.manageCommitments,
				obstaclesToContribution: data.obstaclesToContribution,
				stability: data.stability,
				stabilityComment: data.stabilityComment,
				commitmentLevel: data.commitmentLevel,
				
				// PAGE 7
				reactToIdeasNotChosen: data.reactToIdeasNotChosen,
				collaborationChallenges: data.collaborationChallenges,
				personalPattern: data.personalPattern,
				howOthersDescribe: data.howOthersDescribe,
				
				// PAGE 8
				whatExcites: data.whatExcites,
				concernsDoubts: data.concernsDoubts,
				howStartContributing: data.howStartContributing,
				anythingElse: data.anythingElse,
				
				// PAGE 9
				lifeMeaning: data.lifeMeaning,
				responsibilityMeaning: data.responsibilityMeaning,
				freedomMeaning: data.freedomMeaning,
				
				timestamp,
			};

			await sendEmail({
				to: adminEmail,
				subject: `New Application: ${data.fullName}`,
				html: getApplicationEmailHTML(applicationData),
				text: getApplicationEmailText(applicationData),
				replyTo: data.email,
			});

			await sendEmail({
				to: data.email,
				subject: 'Application Received - EcoHubs Community',
				html: getApplicationConfirmationHTML(data.fullName),
				text: getApplicationConfirmationText(data.fullName),
			});

			// Save to Airtable (non-blocking)
			try {
				await saveApplication(data, timestamp);
			} catch (error) {
				if (error instanceof AirtableError) {
					console.error('Airtable error:', error.message);
					if (error.originalError) {
						console.error('Original error:', error.originalError);
					}
				} else {
					console.error('Failed to save to Airtable:', error);
				}
				// Don't fail the form submission if Airtable fails
			}

			// Create Snapshot proposal (non-blocking)
			try {
				await createApplicationProposal(data, applicationData);
			} catch (error) {
				if (error instanceof SnapshotError) {
					console.error('Snapshot error:', error.message);
					if (error.originalError) {
						console.error('Original error:', error.originalError);
					}
				} else {
					console.error('Failed to create Snapshot proposal:', error);
				}
				// Don't fail the form submission if Snapshot fails
			}

			return { form, success: true };
		} catch (error) {
			console.error('Application submission error:', error);
			return fail(500, {
				form,
				error: 'Failed to submit application. Please try again.',
			});
		}
	},
};
