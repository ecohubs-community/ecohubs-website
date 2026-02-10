export interface ContactEmailData {
	name: string;
	email: string;
	message: string;
	timestamp: string;
}

export function getContactEmailHTML(data: ContactEmailData): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>New Contact Form Submission</title>
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
			padding: 30px;
			text-align: center;
		}
		.header h1 {
			margin: 0;
			font-size: 24px;
			font-weight: 600;
		}
		.content {
			padding: 30px;
		}
		.field {
			margin-bottom: 24px;
		}
		.field-label {
			font-weight: 600;
			color: #059669;
			font-size: 12px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			margin-bottom: 8px;
		}
		.field-value {
			color: #1f2937;
			font-size: 16px;
		}
		.message-box {
			background-color: #f3f4f6;
			border-left: 4px solid #059669;
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
		.reply-button {
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
			<h1>📧 New Contact Form Submission</h1>
		</div>
		<div class="content">
			<div class="field">
				<div class="field-label">From</div>
				<div class="field-value">${data.name}</div>
			</div>
			<div class="field">
				<div class="field-label">Email</div>
				<div class="field-value"><a href="mailto:${data.email}" style="color: #059669;">${data.email}</a></div>
			</div>
			<div class="field">
				<div class="field-label">Received</div>
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
			<div class="field">
				<div class="field-label">Message</div>
				<div class="message-box">
					${data.message.replace(/\n/g, '<br>')}
				</div>
			</div>
			<center>
				<a href="mailto:${data.email}?subject=Re: Your message to EcoHubs" class="reply-button">
					Reply to ${data.name}
				</a>
			</center>
		</div>
		<div class="footer">
			<p>This message was sent via the EcoHubs.community contact form.</p>
		</div>
	</div>
</body>
</html>
`;
}

export function getContactEmailText(data: ContactEmailData): string {
	return `
NEW CONTACT FORM SUBMISSION

From: ${data.name}
Email: ${data.email}
Received: ${new Date(data.timestamp).toLocaleString()}

Message:
${data.message}

---
This message was sent via the EcoHubs.community contact form.
Reply to: ${data.email}
`;
}

export function getContactConfirmationHTML(name: string): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Thanks for Reaching Out</title>
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
			font-size: 28px;
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
			padding: 16px;
			border-radius: 4px;
			margin: 24px 0;
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
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>🌱 Thanks for Reaching Out!</h1>
		</div>
		<div class="content">
			<p>Hi ${name},</p>
			<p>Thank you for contacting EcoHubs.community. We've received your message and will get back to you as soon as possible.</p>
			<div class="highlight">
				<strong>What happens next?</strong><br>
				Our team typically responds within 24-48 hours. In the meantime, feel free to explore our vision for regenerative communities.
			</div>
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
				<a href="https://x.com/eco_hubs" style="color: #059669; text-decoration: none;">X</a> •
				<a href="https://www.instagram.com/ecohubs_community/" style="color: #059669; text-decoration: none;">Instagram</a>
			</p>
		</div>
	</div>
</body>
</html>
`;
}

export function getContactConfirmationText(name: string): string {
	return `
Hi ${name},

Thank you for contacting EcoHubs.community. We've received your message and will get back to you as soon as possible.

Our team typically responds within 24-48 hours. In the meantime, feel free to explore our vision for regenerative communities at https://ecohubs.community/vision

---
EcoHubs.community
Co-Creating the Blueprint for Regenerative Living

Website: https://ecohubs.community
GitHub: https://github.com/ecohubs-community
Twitter: https://twitter.com/ecohubs
Instagram: https://www.instagram.com/ecohubs_community/
`;
}




