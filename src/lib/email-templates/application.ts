export interface ApplicationEmailData {
	// PAGE 1
	fullName: string;
	email: string;
	location: string;
	timeAvailability: string;
	languages: string;
	discovery: string;
	
	// PAGE 2
	resonance: string;
	missingInSociety: string;
	attraction: string;
	values: string | string[];
	alignmentWithNature: string;
	
	// PAGE 3
	groupWork: string;
	teamworkMoment: string;
	disagreementResponse: string;
	disagreementResponseOther?: string;
	ideaNotChosen: string;
	ideaNotChosenOther?: string;
	comfortFeedback: number;
	comfortAskingHelp: number;
	adaptToChange: number;
	decisionMakingValue: string;
	personalPatternOptional?: string;
	
	// PAGE 4
	motivation: string;
	contribution: string;
	receiveLearn: string;
	communityMeaning: string;
	joiningReason: string;
	
	// PAGE 5
	experienceAreas: string | string[];
	experienceAreasOther?: string;
	proudProject: string;
	bestWorkEnvironments: string;
	
	// PAGE 6
	manageCommitments: string;
	obstaclesToContribution: string;
	stability: string;
	stabilityComment?: string;
	commitmentLevel: string;
	
	// PAGE 7
	reactToIdeasNotChosen: string;
	collaborationChallenges: string;
	personalPattern: string;
	howOthersDescribe: string;
	
	// PAGE 8
	whatExcites: string;
	concernsDoubts: string;
	howStartContributing: string;
	anythingElse?: string;
	
	// PAGE 9
	lifeMeaning: string;
	responsibilityMeaning: string;
	freedomMeaning: string;
	
	timestamp: string;
}

export function getApplicationEmailHTML(data: ApplicationEmailData): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>New Application Submission</title>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #1f2937;
			background-color: #f9fafb;
			margin: 0;
			padding: 0;
		}
		.container {
			max-width: 700px;
			margin: 40px auto;
			background-color: #ffffff;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
		.header {
			background: linear-gradient(135deg, #059669 0%, #064e3b 100%);
			color: #ffffff;
			padding: 30px;
			text-align: center;
		}
		.header h1 {
			margin: 0;
			font-size: 28px;
			font-weight: 600;
		}
		.content {
			padding: 30px;
		}
		.section {
			margin-bottom: 28px;
			padding-bottom: 24px;
			border-bottom: 1px solid #e5e7eb;
		}
		.section:last-child {
			border-bottom: none;
		}
		.section-title {
			font-weight: 700;
			color: #059669;
			font-size: 14px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			margin-bottom: 12px;
		}
		.field {
			margin-bottom: 16px;
		}
		.field-label {
			font-weight: 600;
			color: #6b7280;
			font-size: 12px;
			margin-bottom: 4px;
		}
		.field-value {
			color: #1f2937;
			font-size: 15px;
		}
		.text-box {
			background-color: #f9fafb;
			border-left: 3px solid #059669;
			padding: 16px;
			border-radius: 4px;
			margin-top: 8px;
		}
		.footer {
			background-color: #f9fafb;
			padding: 20px;
			text-align: center;
			font-size: 12px;
			color: #6b7280;
			border-top: 1px solid #e5e7eb;
		}
		.button {
			display: inline-block;
			background-color: #059669;
			color: #ffffff;
			text-decoration: none;
			padding: 12px 24px;
			border-radius: 6px;
			margin-top: 20px;
			font-weight: 600;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>🌱 New Application Received</h1>
		</div>
		<div class="content">
			<div class="section">
				<div class="section-title">Page 1: Basic Information</div>
				<div class="field">
					<div class="field-label">Name</div>
					<div class="field-value">${data.fullName}</div>
				</div>
				<div class="field">
					<div class="field-label">Email</div>
					<div class="field-value"><a href="mailto:${data.email}" style="color: #059669;">${data.email}</a></div>
				</div>
				<div class="field">
					<div class="field-label">Location</div>
					<div class="field-value">${data.location}</div>
				</div>
				<div class="field">
					<div class="field-label">Time Availability</div>
					<div class="field-value">${data.timeAvailability}</div>
				</div>
				<div class="field">
					<div class="field-label">Languages</div>
					<div class="text-box">${data.languages.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">How Discovered</div>
					<div class="text-box">${data.discovery.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Submitted</div>
					<div class="field-value">${new Date(data.timestamp).toLocaleString('en-US', { 
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						timeZoneName: 'short'
					})}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 2: Values & Alignment</div>
				<div class="field">
					<div class="field-label">What Resonates with Regenerative Living</div>
					<div class="text-box">${data.resonance.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">What's Missing in Society</div>
					<div class="text-box">${data.missingInSociety.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">What Attracts to EcoHubs</div>
					<div class="text-box">${data.attraction.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Essential Values (up to 3)</div>
					<div class="field-value">${Array.isArray(data.values) ? data.values.join(', ') : data.values}</div>
				</div>
				<div class="field">
					<div class="field-label">Living in Alignment with Nature</div>
					<div class="text-box">${data.alignmentWithNature.replace(/\n/g, '<br>')}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 3: Collaboration & Self-Awareness</div>
				<div class="field">
					<div class="field-label">What Helps Groups Work</div>
					<div class="text-box">${data.groupWork.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Teamwork Moment</div>
					<div class="text-box">${data.teamworkMoment.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Disagreement Response</div>
					<div class="field-value">${data.disagreementResponse}</div>
					${data.disagreementResponseOther ? `<div class="text-box" style="margin-top: 8px;">${data.disagreementResponseOther.replace(/\n/g, '<br>')}</div>` : ''}
				</div>
				<div class="field">
					<div class="field-label">Idea Not Chosen Response</div>
					<div class="field-value">${data.ideaNotChosen}</div>
					${data.ideaNotChosenOther ? `<div class="text-box" style="margin-top: 8px;">${data.ideaNotChosenOther.replace(/\n/g, '<br>')}</div>` : ''}
				</div>
				<div class="field">
					<div class="field-label">Comfort Receiving Feedback</div>
					<div class="field-value">${data.comfortFeedback}/10</div>
				</div>
				<div class="field">
					<div class="field-label">Comfort Asking for Help</div>
					<div class="field-value">${data.comfortAskingHelp}/10</div>
				</div>
				<div class="field">
					<div class="field-label">Adapt to Change</div>
					<div class="field-value">${data.adaptToChange}/10</div>
				</div>
				<div class="field">
					<div class="field-label">Decision-Making Value</div>
					<div class="field-value">${data.decisionMakingValue}</div>
				</div>
				${data.personalPatternOptional ? `
				<div class="field">
					<div class="field-label">Personal Pattern (Optional)</div>
					<div class="text-box">${data.personalPatternOptional.replace(/\n/g, '<br>')}</div>
				</div>
				` : ''}
			</div>

			<div class="section">
				<div class="section-title">Page 4: Motivation & Contribution</div>
				<div class="field">
					<div class="field-label">Motivation</div>
					<div class="text-box">${data.motivation.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">What to Contribute</div>
					<div class="text-box">${data.contribution.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">What to Receive/Learn</div>
					<div class="text-box">${data.receiveLearn.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Community Meaning</div>
					<div class="text-box">${data.communityMeaning.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Joining Reason</div>
					<div class="text-box">${data.joiningReason.replace(/\n/g, '<br>')}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 5: Experience & Skills</div>
				<div class="field">
					<div class="field-label">Experience Areas</div>
					<div class="field-value">${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}</div>
					${data.experienceAreasOther ? `<div class="text-box" style="margin-top: 8px;">${data.experienceAreasOther.replace(/\n/g, '<br>')}</div>` : ''}
				</div>
				<div class="field">
					<div class="field-label">Proud Project</div>
					<div class="text-box">${data.proudProject.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Best Work Environments</div>
					<div class="text-box">${data.bestWorkEnvironments.replace(/\n/g, '<br>')}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 6: Commitment & Stability</div>
				<div class="field">
					<div class="field-label">Manage Commitments</div>
					<div class="text-box">${data.manageCommitments.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Obstacles to Contribution</div>
					<div class="text-box">${data.obstaclesToContribution.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Stability</div>
					<div class="field-value">${data.stability}</div>
					${data.stabilityComment ? `<div class="text-box" style="margin-top: 8px;">${data.stabilityComment.replace(/\n/g, '<br>')}</div>` : ''}
				</div>
				<div class="field">
					<div class="field-label">Commitment Level</div>
					<div class="field-value">${data.commitmentLevel}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 7: Self-Reflection</div>
				<div class="field">
					<div class="field-label">React to Ideas Not Chosen</div>
					<div class="text-box">${data.reactToIdeasNotChosen.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Collaboration Challenges</div>
					<div class="text-box">${data.collaborationChallenges.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Personal Pattern</div>
					<div class="text-box">${data.personalPattern.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">How Others Describe You</div>
					<div class="text-box">${data.howOthersDescribe.replace(/\n/g, '<br>')}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 8: Vision & Concerns</div>
				<div class="field">
					<div class="field-label">What Excites</div>
					<div class="text-box">${data.whatExcites.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Concerns/Doubts</div>
					<div class="text-box">${data.concernsDoubts.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">How to Start Contributing</div>
					<div class="text-box">${data.howStartContributing.replace(/\n/g, '<br>')}</div>
				</div>
				${data.anythingElse ? `
				<div class="field">
					<div class="field-label">Anything Else</div>
					<div class="text-box">${data.anythingElse.replace(/\n/g, '<br>')}</div>
				</div>
				` : ''}
			</div>

			<div class="section">
				<div class="section-title">Page 9: Consciousness & Meaning</div>
				<div class="field">
					<div class="field-label">Life Meaning</div>
					<div class="text-box">${data.lifeMeaning.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Responsibility Meaning</div>
					<div class="text-box">${data.responsibilityMeaning.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Freedom Meaning</div>
					<div class="text-box">${data.freedomMeaning.replace(/\n/g, '<br>')}</div>
				</div>
			</div>

			<center>
				<a href="mailto:${data.email}?subject=Re: Your EcoHubs Application" class="button">
					Reply to ${data.fullName}
				</a>
			</center>
		</div>
		<div class="footer">
			<p>This application was submitted via the EcoHubs.community website.</p>
		</div>
	</div>
</body>
</html>
`;
}

export function getApplicationEmailText(data: ApplicationEmailData): string {
	return `
NEW APPLICATION SUBMISSION

PAGE 1: BASIC INFORMATION
--------------------------
Name: ${data.fullName}
Email: ${data.email}
Location: ${data.location}
Time Availability: ${data.timeAvailability}
Languages: ${data.languages}
How Discovered: ${data.discovery}
Submitted: ${new Date(data.timestamp).toLocaleString()}

PAGE 2: VALUES & ALIGNMENT
--------------------------
What Resonates: ${data.resonance}

What's Missing in Society: ${data.missingInSociety}

What Attracts: ${data.attraction}

Essential Values: ${Array.isArray(data.values) ? data.values.join(', ') : data.values}

Living in Alignment: ${data.alignmentWithNature}

PAGE 3: COLLABORATION & SELF-AWARENESS
--------------------------------------
What Helps Groups Work: ${data.groupWork}

Teamwork Moment: ${data.teamworkMoment}

Disagreement Response: ${data.disagreementResponse}
${data.disagreementResponseOther ? `Details: ${data.disagreementResponseOther}\n` : ''}

Idea Not Chosen Response: ${data.ideaNotChosen}
${data.ideaNotChosenOther ? `Details: ${data.ideaNotChosenOther}\n` : ''}

Comfort Receiving Feedback: ${data.comfortFeedback}/10
Comfort Asking for Help: ${data.comfortAskingHelp}/10
Adapt to Change: ${data.adaptToChange}/10

Decision-Making Value: ${data.decisionMakingValue}
${data.personalPatternOptional ? `\nPersonal Pattern (Optional): ${data.personalPatternOptional}\n` : ''}

PAGE 4: MOTIVATION & CONTRIBUTION
----------------------------------
Motivation: ${data.motivation}

What to Contribute: ${data.contribution}

What to Receive/Learn: ${data.receiveLearn}

Community Meaning: ${data.communityMeaning}

Joining Reason: ${data.joiningReason}

PAGE 5: EXPERIENCE & SKILLS
----------------------------
Experience Areas: ${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}
${data.experienceAreasOther ? `Other: ${data.experienceAreasOther}\n` : ''}

Proud Project: ${data.proudProject}

Best Work Environments: ${data.bestWorkEnvironments}

PAGE 6: COMMITMENT & STABILITY
-------------------------------
Manage Commitments: ${data.manageCommitments}

Obstacles to Contribution: ${data.obstaclesToContribution}

Stability: ${data.stability}
${data.stabilityComment ? `Comment: ${data.stabilityComment}\n` : ''}

Commitment Level: ${data.commitmentLevel}

PAGE 7: SELF-REFLECTION
------------------------
React to Ideas Not Chosen: ${data.reactToIdeasNotChosen}

Collaboration Challenges: ${data.collaborationChallenges}

Personal Pattern: ${data.personalPattern}

How Others Describe You: ${data.howOthersDescribe}

PAGE 8: VISION & CONCERNS
--------------------------
What Excites: ${data.whatExcites}

Concerns/Doubts: ${data.concernsDoubts}

How to Start Contributing: ${data.howStartContributing}
${data.anythingElse ? `\nAnything Else: ${data.anythingElse}\n` : ''}

PAGE 9: CONSCIOUSNESS & MEANING
--------------------------------
Life Meaning: ${data.lifeMeaning}

Responsibility Meaning: ${data.responsibilityMeaning}

Freedom Meaning: ${data.freedomMeaning}

---
Reply to: ${data.email}
`;
}

export function getApplicationConfirmationHTML(name: string): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Application Received</title>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #1f2937;
			background-color: #f9fafb;
			margin: 0;
			padding: 0;
		}
		.container {
			max-width: 600px;
			margin: 40px auto;
			background-color: #ffffff;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
		.header {
			background: linear-gradient(135deg, #059669 0%, #064e3b 100%);
			color: #ffffff;
			padding: 40px 30px;
			text-align: center;
		}
		.header h1 {
			margin: 0;
			font-size: 32px;
			font-weight: 600;
		}
		.content {
			padding: 40px 30px;
		}
		.content p {
			margin: 16px 0;
			font-size: 16px;
			color: #4b5563;
		}
		.highlight {
			background-color: #d1fae5;
			border-left: 4px solid #059669;
			padding: 20px;
			border-radius: 4px;
			margin: 28px 0;
		}
		.highlight h3 {
			margin: 0 0 12px 0;
			color: #064e3b;
			font-size: 18px;
		}
		.footer {
			background-color: #f9fafb;
			padding: 30px;
			text-align: center;
			font-size: 14px;
			color: #6b7280;
			border-top: 1px solid #e5e7eb;
		}
		.button {
			display: inline-block;
			background-color: #059669;
			color: #ffffff;
			text-decoration: none;
			padding: 14px 28px;
			border-radius: 6px;
			margin-top: 20px;
			font-weight: 600;
		}
		ul {
			padding-left: 24px;
		}
		li {
			margin: 8px 0;
			color: #4b5563;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>🌱 Welcome to EcoHubs!</h1>
		</div>
		<div class="content">
			<p><strong>Hi ${name},</strong></p>
			<p>Thank you for applying to join the EcoHubs community. Your application has been successfully received, and we're excited to review it!</p>
			
			<div class="highlight">
				<h3>What Happens Next?</h3>
				<ul style="margin: 0;">
					<li><strong>Review Process:</strong> Our team will carefully review your application within 7-10 days.</li>
					<li><strong>Selection:</strong> We're looking for the first 1000 founding members who align with our vision for regenerative communities.</li>
					<li><strong>You'll Hear From Us:</strong> We'll email you with next steps, whether you're selected for the first cohort or invited to join a waiting list.</li>
				</ul>
			</div>

			<p><strong>While You Wait...</strong></p>
			<ul>
				<li>Explore our <a href="https://ecohubs.community/blueprint" style="color: #059669;">blueprint</a> in detail</li>
				<li>Join the conversation on <a href="https://github.com/ecohubs" style="color: #059669;">GitHub</a></li>
				<li>Follow us on <a href="https://twitter.com/ecohubs" style="color: #059669;">Twitter</a> for updates</li>
				<li>Share EcoHubs with others who might be interested</li>
			</ul>

			<p>We believe that regenerative communities are not just possible—they're necessary. Thank you for being part of this vision.</p>

			<p><em>With gratitude,<br>The EcoHubs Team</em></p>

			<center>
				<a href="https://ecohubs.community/vision" class="button">Explore Our Vision</a>
			</center>
		</div>
		<div class="footer">
			<p><strong>EcoHubs.community</strong></p>
			<p>Co-Creating the Blueprint for Regenerative Living</p>
			<p style="margin-top: 16px;">
				<a href="https://ecohubs.community" style="color: #059669; text-decoration: none;">Website</a> •
				<a href="https://github.com/ecohubs" style="color: #059669; text-decoration: none;">GitHub</a> •
				<a href="https://twitter.com/ecohubs" style="color: #059669; text-decoration: none;">Twitter</a>
			</p>
		</div>
	</div>
</body>
</html>
`;
}

export function getApplicationConfirmationText(name: string): string {
	return `
Hi ${name},

Thank you for applying to join the EcoHubs community. Your application has been successfully received, and we're excited to review it!

WHAT HAPPENS NEXT?

- Review Process: Our team will carefully review your application within 7-10 days.
- Selection: We're looking for the first 1000 founding members who align with our vision for regenerative communities.
- You'll Hear From Us: We'll email you with next steps, whether you're selected for the first cohort or invited to join a waiting list.

WHILE YOU WAIT...

- Explore our blueprint: https://ecohubs.community/blueprint
- Join the conversation on GitHub: https://github.com/ecohubs
- Follow us on Twitter: https://twitter.com/ecohubs
- Share EcoHubs with others who might be interested

We believe that regenerative communities are not just possible—they're necessary. Thank you for being part of this vision.

With gratitude,
The EcoHubs Team

---
EcoHubs.community
Co-Creating the Blueprint for Regenerative Living

Website: https://ecohubs.community
GitHub: https://github.com/ecohubs
Twitter: https://twitter.com/ecohubs
`;
}

