import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { subscribeToListmonk } from '$lib/server/listmonk';
import { subscribeNewsletterMautic } from '$lib/server/mautic';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
	const now = Date.now();
	const limit = rateLimitMap.get(identifier);

	if (!limit || now > limit.resetTime) {
		rateLimitMap.set(identifier, {
			count: 1,
			resetTime: now + 60000 // 1 minute window
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

		if (!checkRateLimit(clientIp)) {
			return json(
				{ success: false, message: 'Too many requests. Please try again later.' },
				{ status: 429 }
			);
		}

		const body = await request.json();
		const email = sanitizeEmail(body.email || '');

		if (!email || !validateEmail(email)) {
			return json(
				{ success: false, message: 'Please provide a valid email address.' },
				{ status: 400 }
			);
		}

		// Fire both subscriptions in parallel — neither blocks the other.
		const [listmonkResult, mauticResult] = await Promise.all([
			subscribeToListmonk(email),
			subscribeNewsletterMautic(email)
		]);

		if (!listmonkResult.ok) {
			console.error('Listmonk subscription failed:', listmonkResult);
		}
		if (!mauticResult.ok) {
			console.error('Mautic subscription failed:', mauticResult);
		}

		// Succeed if at least one destination accepted the subscription.
		if (listmonkResult.ok || mauticResult.ok) {
			return json({
				success: true,
				message: 'Successfully subscribed! Please check your email to confirm.'
			});
		}

		console.error('Newsletter subscription failed for:', email);
		return json(
			{
				success: false,
				message: 'Subscription service is temporarily unavailable. Please try again later.'
			},
			{ status: 503 }
		);
	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return json(
			{
				success: false,
				message: 'An error occurred. Please try again later.'
			},
			{ status: 500 }
		);
	}
};
