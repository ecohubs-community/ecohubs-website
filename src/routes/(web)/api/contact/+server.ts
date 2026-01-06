import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { sendEmail } from '$lib/server/email';
import {
	getContactEmailHTML,
	getContactEmailText,
	getContactConfirmationHTML,
	getContactConfirmationText,
	type ContactEmailData
} from '$lib/email-templates/contact';
import { ADMIN_EMAIL, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW, ZAPIER_WEBHOOK_URL, TURNSTILE_SECRET_KEY } from '$env/static/private';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
	const now = Date.now();
	const limit = rateLimitMap.get(identifier);
	
	const maxRequests = parseInt(RATE_LIMIT_MAX_REQUESTS || '5');
	const windowMs = parseInt(RATE_LIMIT_WINDOW || '60000');
	
	if (!limit || now > limit.resetTime) {
		rateLimitMap.set(identifier, {
			count: 1,
			resetTime: now + windowMs,
		});
		return true;
	}
	
	if (limit.count >= maxRequests) {
		return false;
	}
	
	limit.count++;
	return true;
}

function sanitizeInput(input: string): string {
	return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
	if (!TURNSTILE_SECRET_KEY) {
		// If no secret key configured, skip verification
		return true;
	}

	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				secret: TURNSTILE_SECRET_KEY,
				response: token,
				remoteip: ip
			})
		});

		const result = await response.json();
		return result.success === true;
	} catch (error) {
		console.error('Turnstile verification error:', error);
		return false;
	}
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const clientIp = getClientAddress();

		// Rate limiting
		if (!checkRateLimit(clientIp)) {
			return json(
				{ success: false, message: 'Too many requests. Please try again later.' },
				{ status: 429 }
			);
		}

		const body = await request.json();

		// Honeypot check - if website field is filled, it's likely a bot
		if (body.website) {
			// Silently reject but return success to fool bots
			console.log('Honeypot triggered - likely bot submission');
			return json({
				success: true,
				message: 'Message sent successfully!'
			});
		}

		// Verify Turnstile token
		const turnstileToken = body.turnstileToken || '';
		if (TURNSTILE_SECRET_KEY && turnstileToken) {
			const isValidToken = await verifyTurnstile(turnstileToken, clientIp);
			if (!isValidToken) {
				return json(
					{ success: false, message: 'Security verification failed. Please try again.' },
					{ status: 400 }
				);
			}
		} else if (TURNSTILE_SECRET_KEY && !turnstileToken) {
			// Turnstile is configured but no token provided
			return json(
				{ success: false, message: 'Please complete the security verification.' },
				{ status: 400 }
			);
		}

		// Sanitize and validate inputs
		const name = sanitizeInput(body.name || '');
		const email = sanitizeInput(body.email || '').toLowerCase();
		const message = sanitizeInput(body.message || '');

		// Validation
		if (!name || name.length < 2) {
			return json(
				{ success: false, message: 'Please provide a valid name.' },
				{ status: 400 }
			);
		}

		if (!email || !validateEmail(email)) {
			return json(
				{ success: false, message: 'Please provide a valid email address.' },
				{ status: 400 }
			);
		}

		if (!message || message.length < 10) {
			return json(
				{ success: false, message: 'Please provide a message (at least 10 characters).' },
				{ status: 400 }
			);
		}

		const adminEmail = ADMIN_EMAIL || 'admin@ecohubs.community';
		const zapierWebhook = ZAPIER_WEBHOOK_URL || '';
		const timestamp = new Date().toISOString();

		const contactData: ContactEmailData = {
			name,
			email,
			message,
			timestamp
		};

		// Try to send email via Nodemailer
		try {
			// Send notification to admin
			await sendEmail({
				to: adminEmail,
				subject: `New Contact Form: ${name}`,
				html: getContactEmailHTML(contactData),
				text: getContactEmailText(contactData),
				replyTo: email,
			});

			// Send confirmation to user
			await sendEmail({
				to: email,
				subject: 'Thanks for reaching out to EcoHubs',
				html: getContactConfirmationHTML(name),
				text: getContactConfirmationText(name),
			});

			return json({
				success: true,
				message: 'Message sent successfully! We\'ll get back to you soon.',
			});
		} catch (emailError) {
			console.error('Email sending failed:', emailError);
			
			// Fallback to Zapier webhook if configured
			if (zapierWebhook) {
				try {
					const response = await fetch(zapierWebhook, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							name,
							email,
							message,
							timestamp,
							source: 'contact_form',
						}),
					});

					if (response.ok) {
						return json({
							success: true,
							message: 'Message received! We\'ll get back to you soon.',
						});
					}
				} catch (webhookError) {
					console.error('Zapier webhook failed:', webhookError);
				}
			}

			// If both methods fail, still log the message but return an error
			console.log('Contact form submission (email failed):', { name, email, message: message.substring(0, 50) });
			
			throw new Error('Failed to send message. Please try again or contact us directly.');
		}
	} catch (error) {
		console.error('Contact form error:', error);
		return json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'An error occurred. Please try again later.',
			},
			{ status: 500 }
		);
	}
};


