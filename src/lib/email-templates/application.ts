export interface ApplicationEmailData {
	// PAGE 1 — Basic Information
	fullName: string;
	email: string;
	location: string;
	timeAvailability: string;
	languages: string;
	discovery: string;
	
	// PAGE 2 — Values & Vision
	resonanceCombined: string;
	natureCommunityMeaning: string;
	values: string | string[];
	
	// PAGE 3 — Emotional Maturity & Communication
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
	
	// PAGE 4 — Motivation, Contribution, Skills
	motivation: string;
	contribution: string;
	receiveLearn: string;
	experienceAreas: string | string[];
	experienceAreasOther?: string;
	proudProject: string;
	bestWorkEnvironments: string;
	
	// PAGE 5 — Stability, Challenges, Next Steps
	manageCommitments: string;
	collaborationChallengesMerged: string;
	concernsDoubts: string;
	howStartContributing: string;
	anythingElse?: string;
	
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
				<div class="section-title">Page 2: Values & Vision</div>
				<div class="field">
					<div class="field-label">What Resonates with EcoHubs</div>
					<div class="text-box">${data.resonanceCombined.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Living Well in Community and Alignment with Nature</div>
					<div class="text-box">${data.natureCommunityMeaning.replace(/\n/g, '<br>')}</div>
				</div>
				<div class="field">
					<div class="field-label">Essential Values (up to 3)</div>
					<div class="field-value">${Array.isArray(data.values) ? data.values.join(', ') : data.values}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Page 3: Emotional Maturity & Communication</div>
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
			</div>

			<div class="section">
				<div class="section-title">Page 4: Motivation, Contribution, Skills</div>
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
				<div class="section-title">Page 5: Stability, Challenges, Next Steps</div>
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

PAGE 2: VALUES & VISION
--------------------------
What Resonates with EcoHubs: ${data.resonanceCombined}

Living Well in Community and Alignment with Nature: ${data.natureCommunityMeaning}

Essential Values: ${Array.isArray(data.values) ? data.values.join(', ') : data.values}

PAGE 3: EMOTIONAL MATURITY & COMMUNICATION
------------------------------------------
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

PAGE 4: MOTIVATION, CONTRIBUTION, SKILLS
-----------------------------------------
Motivation: ${data.motivation}

What to Contribute: ${data.contribution}

What to Receive/Learn: ${data.receiveLearn}

Experience Areas: ${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}
${data.experienceAreasOther ? `Other: ${data.experienceAreasOther}\n` : ''}

Proud Project: ${data.proudProject}

Best Work Environments: ${data.bestWorkEnvironments}

PAGE 5: STABILITY, CHALLENGES, NEXT STEPS
------------------------------------------
Manage Commitments: ${data.manageCommitments}

Collaboration Challenges: ${data.collaborationChallengesMerged}

Concerns/Doubts: ${data.concernsDoubts}

How to Start Contributing: ${data.howStartContributing}
${data.anythingElse ? `\nAnything Else: ${data.anythingElse}\n` : ''}

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
					<li><strong>Review Process:</strong> Our team will carefully review your application within 3-5 days.</li>
					<li><strong>Selection:</strong> We're looking for the first 500 founding members who align with our vision for making regenerative communities more accessible.</li>
					<li><strong>You'll Hear From Us:</strong> We'll email you with next steps, whether you're selected for the first cohort.</li>
				</ul>
			</div>

			<p><strong>While You Wait...</strong></p>
			<ul>
				<li>Explore our <a href="https://blueprint.ecohubs.community" style="color: #059669;">RCOS blueprint</a> in detail</li>
				<li>Join the conversation on <a href="https://discord.gg/Xnh7247Nq3" style="color: #059669;">Discord</a></li>
				<li>Follow us on Social Media for updates (links below)</li>
				<li>Share EcoHubs with others who might be interested</li>
			</ul>

			<p>We believe that regenerative communities are not just possible—they're necessary. Thank you for being part of this vision.</p>

			<p><em>With gratitude,<br>Stefan from the EcoHubs Team</em></p>

			<center>
				<a href="https://ecohubs.community/vision" class="button">Explore Our Vision</a>
			</center>
		</div>
		<div class="footer">
			<p><strong>EcoHubs.community</strong></p>
			<p>Co-Creating the Blueprint for Regenerative Living</p>
			<p style="margin-top: 16px;">
				<a href="https://ecohubs.community" style="color: #059669; text-decoration: none;">Website</a> •
				<a href="https://mastodon.social/@ecohubs" style="color: #059669; text-decoration: none;">Mastadon</a> •
				<a href="https://farcaster.xyz/ecohubs" style="color: #059669; text-decoration: none;">Farcaster</a> •
				<a href="https://x.com/eco_hubs" style="color: #059669; text-decoration: none;">X</a> •
				<a href="https://www.instagram.com/ecohubs_community/" style="color: #059669; text-decoration: none;">Instagram</a> •
				<a href="https://github.com/ecohubs-community" style="color: #059669; text-decoration: none;">GitHub</a>
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

- Review Process: Our team will carefully review your application within 3-5 days.
- Selection: We're looking for the first 500 founding members who align with our vision for making regenerative communities more accessible.
- You'll Hear From Us: We'll email you with next steps, whether you're selected for the first cohort.

WHILE YOU WAIT...

- Explore our RCOS blueprint: https://blueprint.ecohubs.community
- Join the conversation on Discord: https://discord.gg/Xnh7247Nq3
- Follow us on Social Media for updates (links below)
- Share EcoHubs with others who might be interested

We believe that regenerative communities are not just possible—they're necessary. Thank you for being part of this vision.

With gratitude,
Stefan from the EcoHubs Team

---
EcoHubs.community
Co-Creating the Blueprint for Regenerative Living

Website: https://ecohubs.community
Mastadon: https://mastodon.social/@ecohubs
Farcaster: https://farcaster.xyz/ecohubs
X: https://x.com/eco_hubs
Instagram: https://www.instagram.com/ecohubs_community/
GitHub: https://github.com/ecohubs-community
`;
}

