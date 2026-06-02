/**
 * Mautic configuration — single source of truth for base URL, form IDs,
 * and field aliases used across the site.
 *
 * Most forms POST natively into a hidden iframe (no CORS, no fetch) using
 * the action returned by `mauticFormAction(formId)`. The newsletter modal
 * and footer instead submit through `/api/newsletter`, which forwards to
 * both Mautic and Listmonk server-side via `$lib/server/mautic.ts`.
 */

export const MAUTIC_BASE_URL = 'https://mautic.ecohubs.community';

export function mauticFormAction(formId: number): string {
	return `${MAUTIC_BASE_URL}/form/submit?formId=${formId}`;
}

/** Community Resilience Assessment — the long multi-field form. */
export const MAUTIC_RESILIENCE_ASSESSMENT = {
	formId: 1,
	formName: 'communityresilienceassessment',
	/**
	 * Mautic truncated the field alias `resilience_assessment_quiz` to fit its
	 * column length, dropping the trailing "z". Keep the truncated alias here
	 * so submissions land in the correct custom field.
	 */
	quizSummaryField: 'resilience_assessment_qui'
} as const;

/**
 * Newsletter signup — single-field form (`signup_email`) reused by the
 * footer subscribe and the scroll-triggered modal. Submitted server-side
 * via `/api/newsletter`, so the form ID lives in a private env var.
 */
export const MAUTIC_NEWSLETTER_EMAIL_FIELD = 'signup_email';

/**
 * Registry of multi-field landing-page forms submitted through `/api/mautic`.
 *
 * The endpoint looks a form up by key and uses `allowedFields` as a strict
 * allowlist, so the browser can never write to fields a form doesn't expose.
 * Add a new entry here (plus a matching Mautic form) to wire up another
 * landing page — no endpoint changes required.
 */
export interface MauticFormDef {
	formId: number;
	formName: string;
	allowedFields: readonly string[];
}

export const MAUTIC_FORMS = {
	'resilience-assessment': {
		formId: MAUTIC_RESILIENCE_ASSESSMENT.formId,
		formName: MAUTIC_RESILIENCE_ASSESSMENT.formName,
		allowedFields: [
			'email',
			'ccommunity_name',
			'ccommunity_website',
			'ccommunity_location',
			'ccommunity_size',
			MAUTIC_RESILIENCE_ASSESSMENT.quizSummaryField
		]
	}
} as const satisfies Record<string, MauticFormDef>;

export type MauticFormKey = keyof typeof MAUTIC_FORMS;
