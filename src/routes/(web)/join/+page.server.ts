import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { applicationSchema, type ApplicationFormData } from '$lib/config/application-questions';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { sendEmail } from '$lib/server/email';
import {
	getApplicationEmailHTML,
	getApplicationEmailText,
	getApplicationConfirmationHTML,
	getApplicationConfirmationText,
	type ApplicationEmailData
} from '$lib/email-templates/application';
import { ADMIN_EMAIL, TURNSTILE_SECRET_KEY, ECOHUBSOS_API_URL, ECOHUBSOS_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
	// @ts-expect-error - Zod v3 compatibility with sveltekit-superforms
	const form = await superValidate(zod(applicationSchema));
	return { form };
};

async function verifyTurnstile(token: string): Promise<{ success: boolean; 'error-codes'?: string[] }> {
	if (!TURNSTILE_SECRET_KEY) {
		console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification');
		return { success: true };
	}

	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret: TURNSTILE_SECRET_KEY,
				response: token
			})
		});
		return response.json();
	} catch (error) {
		console.error('Turnstile verification error:', error);
		return { success: false, 'error-codes': ['network-error'] };
	}
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		// @ts-expect-error - Zod v3 compatibility with sveltekit-superforms
		const form = await superValidate(request, zod(applicationSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Get Turnstile token from form data
		const formData = await request.clone().formData();
		const turnstileToken = formData.get('cf-turnstile-response');

		// Verify Turnstile token
		if (turnstileToken && typeof turnstileToken === 'string') {
			const turnstileResult = await verifyTurnstile(turnstileToken);
			if (!turnstileResult.success) {
				console.error('Turnstile verification failed:', turnstileResult['error-codes']);
				return fail(400, {
					form,
					error: 'Bot verification failed. Please try again.'
				});
			}
		} else if (TURNSTILE_SECRET_KEY) {
			// Token required but not provided
			return fail(400, {
				form,
				error: 'Please complete the verification challenge.'
			});
		}

		try {
			const adminEmail = ADMIN_EMAIL || 'admin@ecohubs.community';
			const timestamp = new Date().toISOString();
			const data = form.data as ApplicationFormData;

			// Submit to ecohubsOS API
			if (ECOHUBSOS_API_URL && ECOHUBSOS_API_KEY) {
				try {
					const response = await fetch(`${ECOHUBSOS_API_URL}/api/applications`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'x-api-key': ECOHUBSOS_API_KEY
						},
						body: JSON.stringify({
							...data,
							submittedAt: timestamp
						})
					});

					if (!response.ok) {
						const errorData = await response.json().catch(() => ({}));

						// Handle rate limiting
						if (response.status === 429) {
							return fail(429, {
								form,
								error: 'Too many applications submitted. Please try again later.',
								isRateLimited: true
							});
						}

						// Handle other API errors
						console.error('ecohubsOS API error:', response.status, errorData);
						return fail(response.status, {
							form,
							error: errorData.message || 'Failed to submit application. Please try again.'
						});
					}
				} catch (error) {
					console.error('ecohubsOS API request failed:', error);
					return fail(500, {
						form,
						error: 'Unable to submit application. Please try again later.'
					});
				}
			} else {
				console.warn('ECOHUBSOS_API_URL or ECOHUBSOS_API_KEY not configured');
			}

			const applicationData: ApplicationEmailData = {
				// PAGE 1 — Basic Information
				fullName: data.fullName,
				email: data.email,
				location: data.location,
				timeAvailability: data.timeAvailability,
				languages: data.languages,
				discovery: data.discovery,

				// PAGE 2 — Values & Vision
				resonanceCombined: data.resonanceCombined,
				natureCommunityMeaning: data.natureCommunityMeaning,
				values: data.values,

				// PAGE 3 — Emotional Maturity & Communication
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

				// PAGE 4 — Motivation, Contribution, Skills
				motivation: data.motivation,
				contribution: data.contribution,
				receiveLearn: data.receiveLearn,
				experienceAreas: data.experienceAreas,
				experienceAreasOther: data.experienceAreasOther,
				proudProject: data.proudProject,
				bestWorkEnvironments: data.bestWorkEnvironments,

				// PAGE 5 — Stability, Challenges, Next Steps
				manageCommitments: data.manageCommitments,
				collaborationChallengesMerged: data.collaborationChallengesMerged,
				concernsDoubts: data.concernsDoubts,
				howStartContributing: data.howStartContributing,
				anythingElse: data.anythingElse,

				timestamp
			};

			// Send emails (non-blocking - don't fail submission if email fails)
			try {
				await sendEmail({
					to: adminEmail,
					subject: `New Application: ${data.fullName}`,
					html: getApplicationEmailHTML(applicationData),
					text: getApplicationEmailText(applicationData),
					replyTo: data.email
				});
			} catch (error) {
				console.error('Failed to send admin notification email:', error);
				// Don't fail the form submission if email fails
			}

			try {
				await sendEmail({
					to: data.email,
					subject: 'Application Received - EcoHubs Community',
					html: getApplicationConfirmationHTML(data.fullName),
					text: getApplicationConfirmationText(data.fullName)
				});
			} catch (error) {
				console.error('Failed to send confirmation email:', error);
				// Don't fail the form submission if email fails
			}

			return { form, success: true };
		} catch (error) {
			console.error('Application submission error:', error);
			return fail(500, {
				form,
				error: 'Failed to submit application. Please try again.'
			});
		}
	}
};
