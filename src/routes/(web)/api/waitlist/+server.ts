import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAUTIC_FORMS } from '$lib/config/mautic';
import { submitRegistryForm } from '$lib/server/mautic';
import { subscribeToListmonk } from '$lib/server/listmonk';
import { notifyDiscordError, isConfigGap } from '$lib/server/discord';
import { env } from '$env/dynamic/private';

const WAITLIST = MAUTIC_FORMS.waitlist;
const EMAIL_ALIAS = WAITLIST.emailField;

// Simple in-memory rate limiting (for production, use Redis or similar).
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
	const now = Date.now();
	const limit = rateLimitMap.get(identifier);

	if (!limit || now > limit.resetTime) {
		rateLimitMap.set(identifier, { count: 1, resetTime: now + 60000 });
		return true;
	}

	if (limit.count >= 5) {
		return false;
	}

	limit.count++;
	return true;
}

function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/** Listmonk list(s) waitlist signups subscribe to (separate from the newsletter). */
function waitlistListIds(): number[] {
	const cfg = WAITLIST.listmonk;
	const id = cfg.listIdEnv ? Number(env[cfg.listIdEnv]) : 0;
	return [id || cfg.defaultListId];
}

/**
 * EcoHub One waitlist relay — backs the /join-the-waitlist landing page.
 *
 * Body: `{ step: 'create' | 'update', fields: Record<string, string>, mtcId?: string }`.
 * Only aliases in `MAUTIC_WAITLIST.allowedFields` are forwarded, so the browser
 * can't write arbitrary Mautic fields.
 *
 *   - `create` (step 1): email capture. Subscribes the address to Listmonk AND
 *     creates the Mautic contact. Succeeds if either destination accepted it.
 *   - `update` (step 2): optional progressive-profiling fields. Re-submits the
 *     same Mautic form; Mautic upserts by email, updating the existing contact.
 */
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
		const step = body.step === 'update' ? 'update' : 'create';

		// Keep only allowlisted, non-empty string fields — trimmed.
		const incoming = (body.fields ?? {}) as Record<string, unknown>;
		const fields: Record<string, string> = {};
		for (const alias of WAITLIST.allowedFields) {
			const value = incoming[alias];
			if (typeof value === 'string' && value.trim()) {
				fields[alias] = value.trim();
			}
		}

		const email = fields[EMAIL_ALIAS];
		if (!email || !validateEmail(email)) {
			return json(
				{ success: false, message: 'Please provide a valid email address.' },
				{ status: 400 }
			);
		}

		const mtcId = typeof body.mtcId === 'string' ? body.mtcId : undefined;

		if (step === 'update') {
			// Step 2 — progressive profiling. Mautic only here (the contact and
			// Listmonk subscription were created in step 1).
			const result = await submitRegistryForm('waitlist', fields, { mtcId, clientIp });
			if (!result.ok) {
				console.error('Waitlist profile update failed:', result);
				await notifyDiscordError({
					source: 'Waitlist · profile update (Mautic)',
					summary: 'A waitlist profile update (step 2) failed to save to Mautic.',
					error: result.error,
					context: { email, status: result.status }
				});
				return json(
					{ success: false, message: 'Submission service is temporarily unavailable.' },
					{ status: 503 }
				);
			}
			return json({ success: true });
		}

		// Step 1 — create. Fire both subscriptions in parallel; neither blocks the
		// other, and we succeed if at least one destination accepted the contact.
		const [mauticResult, listmonkResult] = await Promise.all([
			submitRegistryForm('waitlist', { [EMAIL_ALIAS]: email }, { mtcId, clientIp }),
			subscribeToListmonk(email, waitlistListIds())
		]);

		if (!mauticResult.ok) console.error('Waitlist Mautic signup failed:', mauticResult);
		if (!listmonkResult.ok) console.error('Waitlist Listmonk signup failed:', listmonkResult);

		if (mauticResult.ok || listmonkResult.ok) {
			// Partial failure — the signup still succeeds for the user, but one
			// destination is silently dropping it. Alert on each genuine failure
			// (skip integrations that are intentionally unconfigured).
			if (!mauticResult.ok && !isConfigGap(mauticResult.error)) {
				await notifyDiscordError({
					source: 'Waitlist · Mautic',
					summary: 'Waitlist Mautic signup failed (Listmonk still accepted it).',
					error: mauticResult.error,
					context: { email, status: mauticResult.status }
				});
			}
			if (!listmonkResult.ok && !isConfigGap(listmonkResult.error)) {
				await notifyDiscordError({
					source: 'Waitlist · Listmonk',
					summary: 'Waitlist Listmonk signup failed (Mautic still accepted it).',
					error: listmonkResult.error,
					context: { email, status: listmonkResult.status }
				});
			}
			return json({ success: true });
		}

		await notifyDiscordError({
			source: 'Waitlist signup',
			summary: 'Waitlist signup failed — both Mautic and Listmonk rejected it.',
			// Prefer a genuine runtime error over a config-gap message.
			error:
				[listmonkResult, mauticResult].find((r) => !isConfigGap(r.error))?.error ??
				mauticResult.error ??
				listmonkResult.error,
			context: {
				email,
				mauticStatus: mauticResult.status,
				listmonkStatus: listmonkResult.status
			}
		});
		return json(
			{ success: false, message: 'Submission service is temporarily unavailable.' },
			{ status: 503 }
		);
	} catch (error) {
		console.error('Waitlist submission error:', error);
		await notifyDiscordError({
			source: 'Waitlist signup',
			summary: 'Waitlist signup failed unexpectedly (500).',
			error
		});
		return json(
			{ success: false, message: 'An error occurred. Please try again later.' },
			{ status: 500 }
		);
	}
};
