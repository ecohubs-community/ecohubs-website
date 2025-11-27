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
				fullName: data.fullName,
				email: data.email,
				location: data.location,
				background: data.background,
				backgroundOther: data.backgroundOther,
				motivation: data.motivation,
				skills: data.skills,
				involvement: data.involvement,
				timeline: data.timeline,
				communityExperience: data.communityExperience,
				communityDetails: data.communityDetails,
				questions: data.questions,
				referral: data.referral,
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

			if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
				try {
					const [owner, repo] = (process.env.GITHUB_REPO || '').split('/');
					await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
							'Content-Type': 'application/json',
							'Accept': 'application/vnd.github.v3+json',
						},
						body: JSON.stringify({
							title: `Application: ${data.fullName}`,
							body: formatApplicationForGitHub(applicationData),
							labels: ['application', 'new'],
						}),
					});
				} catch (error) {
					console.error('Failed to create GitHub issue:', error);
				}
			}

			if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
				try {
					const tableName = process.env.AIRTABLE_APPLICATIONS_TABLE || 'Applications';
					await fetch(
						`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableName}`,
						{
							method: 'POST',
							headers: {
								'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								records: [
									{
										fields: {
											...data,
											involvement: Array.isArray(data.involvement) 
												? data.involvement.join(', ') 
												: data.involvement,
											submittedAt: timestamp,
											status: 'New',
										},
									},
								],
							}),
						}
					);
				} catch (error) {
					console.error('Failed to save to Airtable:', error);
				}
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

function formatApplicationForGitHub(data: ApplicationEmailData): string {
	return `
## Applicant Information

**Name:** ${data.fullName}
**Email:** ${data.email}
**Location:** ${data.location}

## Background

**Field:** ${data.background}
${data.backgroundOther ? `**Details:** ${data.backgroundOther}
` : ''}

## Motivation

${data.motivation}

## Skills & Experience

${data.skills}

## Involvement Preferences

**Type:** ${Array.isArray(data.involvement) ? data.involvement.join(', ') : data.involvement}
**Timeline:** ${data.timeline}

## Community Experience

**Previous Experience:** ${data.communityExperience}
${data.communityDetails ? `
**Details:** ${data.communityDetails}
` : ''}

## Additional Information

${data.questions || 'N/A'}

**Referral Source:** ${data.referral || 'Not specified'}

---

*Submitted: ${new Date().toLocaleString()}*
`;
}
