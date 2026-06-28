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
 * Registry of multi-field landing-page forms submitted server-side.
 *
 * One entry per form is the single source of truth for its Mautic form id,
 * field allowlist, and (optionally) a Listmonk list to dual-subscribe to.
 * `allowedFields` is a strict allowlist, so the browser can never write to
 * fields a form doesn't expose. Add a new entry here (plus a matching Mautic
 * form) to wire up another landing page.
 *
 * The form id is either static (`formId`, e.g. the resilience quiz) or read
 * from a private env var at request time (`formIdEnv`, e.g. the waitlist) —
 * resolved server-side via `resolveMauticFormId()` so the id never ships to
 * the client.
 */
export interface MauticFormDef {
	/** Static Mautic form id, when it's safe to commit. */
	formId?: number;
	/** Name of the private env var holding the form id, resolved server-side. */
	formIdEnv?: string;
	formName: string;
	/** Alias of the email field within `allowedFields` (defaults to `email`). */
	emailField?: string;
	allowedFields: readonly string[];
	/** When set, signups also subscribe to this Listmonk list. */
	listmonk?: { listIdEnv?: string; defaultListId: number };
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
	},
	/**
	 * EcoHub One waitlist — the /join-the-waitlist landing page, submitted via
	 * /api/waitlist. Two-step progressive profiling against a single Mautic form
	 * (Mautic upserts by email, so step 2 updates the contact step 1 created):
	 *   - Step 1 "create": just `email` — also subscribes the address to Listmonk.
	 *   - Step 2 "update": the optional profile fields.
	 */
	waitlist: {
		formIdEnv: 'MAUTIC_WAITLIST_FORM_ID',
		formName: 'waitlist',
		emailField: 'email',
		allowedFields: ['email', 'f_name', 'location', 'skillsprofession', 'why_do_you_want_to_join'],
		listmonk: { listIdEnv: 'LISTMONK_WAITLIST_LIST_ID', defaultListId: 1 }
	}
} as const satisfies Record<string, MauticFormDef>;

export type MauticFormKey = keyof typeof MAUTIC_FORMS;
