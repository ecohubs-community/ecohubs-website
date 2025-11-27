export interface ApplicationEmailData {
	fullName: string;
	email: string;
	location: string;
	background: string;
	backgroundOther?: string;
	motivation: string;
	skills: string;
	involvement: string;
	timeline: string;
	communityExperience: string;
	communityDetails?: string;
	questions?: string;
	referral?: string;
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
				<div class="section-title">Applicant Information</div>
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
				<div class="section-title">Background</div>
				<div class="field">
					<div class="field-label">Field</div>
					<div class="field-value">${data.background}</div>
				</div>
				${data.backgroundOther ? `
				<div class="field">
					<div class="field-label">Additional Details</div>
					<div class="field-value">${data.backgroundOther}</div>
				</div>
				` : ''}
			</div>

			<div class="section">
				<div class="section-title">Motivation</div>
				<div class="text-box">
					${data.motivation.replace(/\n/g, '<br>')}
				</div>
			</div>

			<div class="section">
				<div class="section-title">Skills & Experience</div>
				<div class="text-box">
					${data.skills.replace(/\n/g, '<br>')}
				</div>
			</div>

			<div class="section">
				<div class="section-title">Participation Preferences</div>
				<div class="field">
					<div class="field-label">Involvement Type</div>
					<div class="field-value">${data.involvement}</div>
				</div>
				<div class="field">
					<div class="field-label">Timeline</div>
					<div class="field-value">${data.timeline}</div>
				</div>
			</div>

			<div class="section">
				<div class="section-title">Community Experience</div>
				<div class="field">
					<div class="field-label">Previous Experience</div>
					<div class="field-value">${data.communityExperience}</div>
				</div>
				${data.communityDetails ? `
				<div class="field">
					<div class="text-box">
						${data.communityDetails.replace(/\n/g, '<br>')}
					</div>
				</div>
				` : ''}
			</div>

			${data.questions ? `
			<div class="section">
				<div class="section-title">Questions / Comments</div>
				<div class="text-box">
					${data.questions.replace(/\n/g, '<br>')}
				</div>
			</div>
			` : ''}

			${data.referral ? `
			<div class="section">
				<div class="section-title">Referral Source</div>
				<div class="field-value">${data.referral}</div>
			</div>
			` : ''}

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

Applicant Information
---------------------
Name: ${data.fullName}
Email: ${data.email}
Location: ${data.location}
Submitted: ${new Date(data.timestamp).toLocaleString()}

Background
----------
Field: ${data.background}
${data.backgroundOther ? `Details: ${data.backgroundOther}\n` : ''}

Motivation
----------
${data.motivation}

Skills & Experience
-------------------
${data.skills}

Participation Preferences
-------------------------
Type: ${data.involvement}
Timeline: ${data.timeline}

Community Experience
--------------------
Previous Experience: ${data.communityExperience}
${data.communityDetails ? `\nDetails:\n${data.communityDetails}\n` : ''}

${data.questions ? `Questions / Comments\n--------------------\n${data.questions}\n` : ''}
${data.referral ? `Referral Source: ${data.referral}\n` : ''}

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

