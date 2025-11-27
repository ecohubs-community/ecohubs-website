import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { applicationSchema } from '$lib/config/application-questions';
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
	const form = await superValidate(zod(applicationSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(applicationSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecohubs.community';
			const timestamp = new Date().toISOString();

			const applicationData: ApplicationEmailData = {
				...form.data,
				timestamp,
			};

			await sendEmail({
				to: adminEmail,
				subject: `New Application: ${form.data.fullName}`,
				html: getApplicationEmailHTML(applicationData),
				text: getApplicationEmailText(applicationData),
				replyTo: form.data.email,
			});

			await sendEmail({
				to: form.data.email,
				subject: 'Application Received - EcoHubs Community',
				html: getApplicationConfirmationHTML(form.data.fullName),
				text: getApplicationConfirmationText(form.data.fullName),
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
							title: `Application: ${form.data.fullName}`,
							body: formatApplicationForGitHub(form.data),
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
											...form.data,
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

function formatApplicationForGitHub(data: any): string {
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

**Type:** ${data.involvement}
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
