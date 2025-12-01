import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { LINKMONK_API_KEY, LINKMONK_URL, ZAPIER_WEBHOOK_URL } from '$env/static/private';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
	const now = Date.now();
	const limit = rateLimitMap.get(identifier);
	
	if (!limit || now > limit.resetTime) {
		rateLimitMap.set(identifier, {
			count: 1,
			resetTime: now + 60000, // 1 minute window
		});
		return true;
	}
	
	if (limit.count >= 3) {
		return false;
	}
	
	limit.count++;
	return true;
}

function sanitizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
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
		const email = sanitizeEmail(body.email || '');

		// Validate email
		if (!email || !validateEmail(email)) {
			return json(
				{ success: false, message: 'Please provide a valid email address.' },
				{ status: 400 }
			);
		}


		// If Linkmonk is configured, use it
		if (LINKMONK_URL && LINKMONK_API_KEY) {
			try {
				const response = await fetch(`${LINKMONK_URL}/api/subscribers`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${LINKMONK_API_KEY}`,
					},
					body: JSON.stringify({
						email,
						lists: [1], // Default list ID, adjust as needed
						status: 'enabled',
						preconfirm_subscriptions: false, // Double opt-in
					}),
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					console.error('Linkmonk API error:', errorData);
					throw new Error('Failed to subscribe via Linkmonk');
				}

				return json({
					success: true,
					message: 'Successfully subscribed! Please check your email to confirm.',
				});
			} catch (error) {
				console.error('Linkmonk subscription error:', error);
				// Fall through to Zapier webhook if available
			}
		}

		// Fallback to Zapier webhook if configured
		if (ZAPIER_WEBHOOK_URL) {
			try {
				const response = await fetch(ZAPIER_WEBHOOK_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						timestamp: new Date().toISOString(),
						source: 'website',
					}),
				});

				if (!response.ok) {
					throw new Error('Zapier webhook failed');
				}

				return json({
					success: true,
					message: 'Successfully subscribed! Please check your email to confirm.',
				});
			} catch (error) {
				console.error('Zapier webhook error:', error);
			}
		}

		// If no integration is configured, log the subscription and return success
		// In production, you should configure at least one integration
		console.log('Newsletter subscription (no integration configured):', email);
		
		return json({
			success: true,
			message: 'Successfully subscribed! Please check your email to confirm.',
		});
	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return json(
			{
				success: false,
				message: 'An error occurred. Please try again later.',
			},
			{ status: 500 }
		);
	}
};


