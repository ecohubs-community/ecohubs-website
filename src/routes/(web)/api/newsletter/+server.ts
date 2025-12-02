import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { 
	LINKMONK_URL,
	LINKMONK_USERNAME,
	LINKMONK_PASSWORD,
	ZAPIER_WEBHOOK_URL 
} from '$env/static/private';

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


		// If Listmonk is configured, use it
		// Listmonk uses Basic Auth with username and password
		const listmonkUsername = LINKMONK_USERNAME || '';
		const listmonkPassword = LINKMONK_PASSWORD || '';
		
		// Debug logging
		console.log('Listmonk config check:', {
			url: LINKMONK_URL,
			hasUsername: !!listmonkUsername,
			hasPassword: !!listmonkPassword,
			usernameLength: listmonkUsername?.length || 0
		});
		
		if (LINKMONK_URL && listmonkUsername) {
			try {
				// Listmonk requires Basic Authentication with username:password
				const authHeader = `Basic ${Buffer.from(`${listmonkUsername}:${listmonkPassword}`).toString('base64')}`;
				
				console.log('Attempting Listmonk subscription for:', email);
				
				const response = await fetch(`${LINKMONK_URL}/api/subscribers`, {
					method: 'POST',
					headers: {
						'Authorization': authHeader,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						name: email.split('@')[0],
						status: 'enabled',
						preconfirm_subscriptions: false,
						lists: [1],
					}),
				});

				const responseText = await response.text();
				console.log('Listmonk response status:', response.status);
				console.log('Listmonk response:', responseText);

				if (!response.ok) {
					// Try to parse error response, but handle non-JSON gracefully
					const contentType = response.headers.get('content-type');
					let errorData: { message?: string } = {};
					
					if (contentType && contentType.includes('application/json')) {
						try {
							errorData = JSON.parse(responseText) as { message?: string };
						} catch {
							console.error('Listmonk API error (non-JSON):', responseText);
							errorData = { message: responseText || 'Unknown error' };
						}
					} else {
						console.error('Listmonk API error (non-JSON):', responseText);
						errorData = { message: responseText || 'Unknown error' };
					}
					
					console.error('Listmonk API error:', errorData);
					throw new Error(errorData.message || 'Failed to subscribe via Listmonk');
				}

				// Parse successful response
				let responseData: { data?: unknown } = {};
				try {
					responseData = JSON.parse(responseText);
				} catch {
					// Response might be empty, which is fine
				}

				console.log('Listmonk subscription successful:', responseData);
				return json({
					success: true,
					message: 'Successfully subscribed! Please check your email to confirm.',
				});
			} catch (error) {
				console.error('Listmonk subscription error:', error);
				// Don't silently fall through - re-throw if it's a known error
				if (error instanceof Error && error.message.includes('Failed to subscribe')) {
					throw error;
				}
				// Fall through to Zapier webhook if available
			}
		} else {
			console.warn('Listmonk not configured:', {
				hasUrl: !!LINKMONK_URL,
				hasUsername: !!listmonkUsername
			});
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


