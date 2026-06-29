import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MAUTIC_FORMS, type MauticFormKey } from '$lib/config/mautic';
import { resolveMauticFormId, submitMauticForm } from '$lib/server/mautic';
import { notifyDiscordError } from '$lib/server/discord';

// Simple in-memory rate limiting (for production, use Redis or similar)
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

/**
 * Generic Mautic form relay for multi-field landing pages.
 *
 * Body: `{ form: MauticFormKey, fields: Record<string, string>, mtcId?: string }`.
 * The form key selects an entry from `MAUTIC_FORMS`; only fields named in that
 * entry's `allowedFields` are forwarded, so the browser can't write arbitrary
 * Mautic fields. `mtcId` (the visitor's tracked contact id) is forwarded so
 * Mautic stitches the submission onto their session.
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
		const formKey = body.form as MauticFormKey;
		const def = MAUTIC_FORMS[formKey];

		if (!def) {
			return json({ success: false, message: 'Unknown form.' }, { status: 400 });
		}

		// Keep only allowlisted, non-empty string fields — trimmed.
		const incoming = (body.fields ?? {}) as Record<string, unknown>;
		const fields: Record<string, string> = {};
		for (const alias of def.allowedFields) {
			const value = incoming[alias];
			if (typeof value === 'string' && value.trim()) {
				fields[alias] = value.trim();
			}
		}

		if (!fields.email || !validateEmail(fields.email)) {
			return json(
				{ success: false, message: 'Please provide a valid email address.' },
				{ status: 400 }
			);
		}

		const mtcId = typeof body.mtcId === 'string' ? body.mtcId : undefined;

		const formId = resolveMauticFormId(def);
		if (!formId) {
			console.error(`Mautic form id for "${formKey}" not configured`);
			await notifyDiscordError({
				source: `Mautic form · ${formKey}`,
				summary: `Mautic form "${formKey}" is misconfigured — no form id resolved.`,
				context: { form: formKey }
			});
			return json(
				{ success: false, message: 'Submission service is temporarily unavailable.' },
				{ status: 503 }
			);
		}

		const result = await submitMauticForm(formId, fields, {
			formName: def.formName,
			mtcId,
			clientIp
		});

		if (!result.ok) {
			console.error('Mautic form submission failed:', result);
			await notifyDiscordError({
				source: `Mautic form · ${formKey}`,
				summary: `A "${formKey}" Mautic form submission failed.`,
				error: result.error,
				context: { form: formKey, email: fields.email, status: result.status }
			});
			return json(
				{ success: false, message: 'Submission service is temporarily unavailable.' },
				{ status: 503 }
			);
		}

		return json({ success: true });
	} catch (error) {
		console.error('Mautic form submission error:', error);
		await notifyDiscordError({
			source: 'Mautic form',
			summary: 'A Mautic form submission failed unexpectedly (500).',
			error
		});
		return json({ success: false, message: 'An error occurred. Please try again later.' }, {
			status: 500
		});
	}
};
