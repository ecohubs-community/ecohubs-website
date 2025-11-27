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
											values: Array.isArray(data.values) 
												? data.values.join(', ') 
												: data.values,
											experienceAreas: Array.isArray(data.experienceAreas) 
												? data.experienceAreas.join(', ') 
												: data.experienceAreas,
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
## Page 1: Basic Information

**Name:** ${data.fullName}
**Email:** ${data.email}
**Location:** ${data.location}
**Time Availability:** ${data.timeAvailability}
**Languages:** ${data.languages}
**How Discovered:** ${data.discovery}

## Page 2: Values & Alignment

**What Resonates:** ${data.resonance}

**What's Missing in Society:** ${data.missingInSociety}

**What Attracts You:** ${data.attraction}

**Essential Values:** ${Array.isArray(data.values) ? data.values.join(', ') : data.values}

**Living in Alignment:** ${data.alignmentWithNature}

## Page 3: Collaboration & Self-Awareness

**What Helps Groups Work:** ${data.groupWork}

**Teamwork Moment:** ${data.teamworkMoment}

**Disagreement Response:** ${data.disagreementResponse}
${data.disagreementResponseOther ? `**Details:** ${data.disagreementResponseOther}\n` : ''}

**Idea Not Chosen Response:** ${data.ideaNotChosen}
${data.ideaNotChosenOther ? `**Details:** ${data.ideaNotChosenOther}\n` : ''}

**Comfort Receiving Feedback:** ${data.comfortFeedback}/10
**Comfort Asking for Help:** ${data.comfortAskingHelp}/10
**Adapt to Change:** ${data.adaptToChange}/10

**Decision-Making Value:** ${data.decisionMakingValue}

${data.personalPatternOptional ? `**Personal Pattern (Optional):** ${data.personalPatternOptional}\n` : ''}

## Page 4: Motivation & Contribution

**Motivation:** ${data.motivation}

**What to Contribute:** ${data.contribution}

**What to Receive/Learn:** ${data.receiveLearn}

**Community Meaning:** ${data.communityMeaning}

**Joining Reason:** ${data.joiningReason}

## Page 5: Experience & Skills

**Experience Areas:** ${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}
${data.experienceAreasOther ? `**Other:** ${data.experienceAreasOther}\n` : ''}

**Proud Project:** ${data.proudProject}

**Best Work Environments:** ${data.bestWorkEnvironments}

## Page 6: Commitment & Stability

**Manage Commitments:** ${data.manageCommitments}

**Obstacles to Contribution:** ${data.obstaclesToContribution}

**Stability:** ${data.stability}
${data.stabilityComment ? `**Comment:** ${data.stabilityComment}\n` : ''}

**Commitment Level:** ${data.commitmentLevel}

## Page 7: Self-Reflection

**React to Ideas Not Chosen:** ${data.reactToIdeasNotChosen}

**Collaboration Challenges:** ${data.collaborationChallenges}

**Personal Pattern:** ${data.personalPattern}

**How Others Describe You:** ${data.howOthersDescribe}

## Page 8: Vision & Concerns

**What Excites:** ${data.whatExcites}

**Concerns/Doubts:** ${data.concernsDoubts}

**How to Start Contributing:** ${data.howStartContributing}

${data.anythingElse ? `**Anything Else:** ${data.anythingElse}\n` : ''}

## Page 9: Consciousness & Meaning

**Life Meaning:** ${data.lifeMeaning}

**Responsibility Meaning:** ${data.responsibilityMeaning}

**Freedom Meaning:** ${data.freedomMeaning}

---

*Submitted: ${new Date(data.timestamp).toLocaleString()}*
`;
}
