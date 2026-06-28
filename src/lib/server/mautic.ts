/**
 * Server-side Mautic submission helpers.
 *
 * Mautic's `/form/submit` endpoint accepts a multipart/form-data POST with
 * field names of the form `mauticform[<alias>]`. We replicate the browser
 * iframe flow on the server so the newsletter modal and footer can subscribe
 * users to Mautic AND Listmonk in a single round-trip.
 */

import {
	MAUTIC_BASE_URL,
	MAUTIC_NEWSLETTER_EMAIL_FIELD,
	MAUTIC_FORMS,
	mauticFormAction,
	type MauticFormDef
} from '$lib/config/mautic';
import { env } from '$env/dynamic/private';

export interface MauticSubmitResult {
	ok: boolean;
	status?: number;
	error?: string;
}

export interface MauticSubmitOptions {
	/** Mautic form name — sent as a hidden field, as the frontend does. */
	formName?: string;
	/**
	 * Tracked-contact id from the browser (`window.mtcId`). Forwarded as the
	 * `mtc_id` cookie so Mautic stitches the submission onto the visitor's
	 * tracked session instead of creating a detached contact.
	 */
	mtcId?: string;
	/** Real visitor IP, forwarded so Mautic geolocates the contact correctly. */
	clientIp?: string;
}

/**
 * Submit an arbitrary map of `{ alias → value }` fields to a Mautic form.
 * `formId` and any optional `formName` are added as hidden form fields, as
 * Mautic's frontend would. When `mtcId`/`clientIp` are supplied they're
 * forwarded so the server-side POST behaves like the browser's would.
 */
export async function submitMauticForm(
	formId: number,
	fields: Record<string, string>,
	opts: MauticSubmitOptions = {}
): Promise<MauticSubmitResult> {
	const body = new FormData();
	body.append('mauticform[formId]', String(formId));
	body.append('mauticform[return]', '');
	body.append('mauticform[messenger]', '1');
	if (opts.formName) body.append('mauticform[formName]', opts.formName);
	for (const [alias, value] of Object.entries(fields)) {
		body.append(`mauticform[${alias}]`, value);
	}
	body.append('mauticform[submit]', '1');

	const headers: Record<string, string> = {};
	if (opts.mtcId) headers.Cookie = `mtc_id=${opts.mtcId}`;
	if (opts.clientIp) headers['X-Forwarded-For'] = opts.clientIp;

	try {
		const response = await fetch(mauticFormAction(formId), {
			method: 'POST',
			body,
			headers,
			redirect: 'manual'
		});
		// Mautic answers a 200 or 3xx redirect on success; either is fine.
		const ok = response.status >= 200 && response.status < 400;
		if (!ok) {
			const text = await response.text().catch(() => '');
			return { ok: false, status: response.status, error: text.slice(0, 200) };
		}
		return { ok: true, status: response.status };
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}

/**
 * Subscribe an email address to the newsletter Mautic form.
 *
 * Reads `MAUTIC_NEWSLETTER_FORM_ID` from env. Returns `{ ok: false }` with
 * a descriptive error when the env var is missing — callers can choose to
 * log-and-continue (we don't want to block Listmonk subscription on it).
 */
export async function subscribeNewsletterMautic(email: string): Promise<MauticSubmitResult> {
	const formId = Number(env.MAUTIC_NEWSLETTER_FORM_ID);
	if (!formId) {
		return { ok: false, error: 'MAUTIC_NEWSLETTER_FORM_ID not configured' };
	}
	return submitMauticForm(formId, { [MAUTIC_NEWSLETTER_EMAIL_FIELD]: email });
}

/**
 * Resolve a registry form's Mautic id — static `formId`, or read from the
 * private env var named by `formIdEnv`. Returns `undefined` when neither is
 * configured so callers can fail gracefully.
 */
export function resolveMauticFormId(def: MauticFormDef): number | undefined {
	if (def.formId) return def.formId;
	if (def.formIdEnv) return Number(env[def.formIdEnv]) || undefined;
	return undefined;
}

/**
 * Submit a registry form to Mautic by its key. The form's id and name come from
 * `MAUTIC_FORMS`; `mtcId`/`clientIp` are forwarded so the submission stitches
 * onto the tracked visitor, exactly as the browser iframe flow would. The same
 * form serves repeated submissions (e.g. the waitlist's create then update) —
 * Mautic upserts by email, so a later submission updates the existing contact.
 */
export async function submitRegistryForm(
	formKey: keyof typeof MAUTIC_FORMS,
	fields: Record<string, string>,
	opts: Pick<MauticSubmitOptions, 'mtcId' | 'clientIp'> = {}
): Promise<MauticSubmitResult> {
	const def = MAUTIC_FORMS[formKey];
	const formId = resolveMauticFormId(def);
	if (!formId) {
		return { ok: false, error: `Form id for "${formKey}" not configured` };
	}
	return submitMauticForm(formId, fields, { formName: def.formName, ...opts });
}

export { MAUTIC_BASE_URL };
