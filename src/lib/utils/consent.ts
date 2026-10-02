/**
 * Cookie consent, shared with rcos.ecohubs.community.
 *
 * The choice lives in a first-party cookie on `.ecohubs.community`, so a visitor
 * decides once for both sites. On localhost and preview hosts the Domain
 * attribute is left out (browsers reject it there), which makes it a host-only
 * cookie. Keep the cookie name and format in step with the RCOS site
 * (src/lib/consent/consent.svelte.ts there) and with the pre-paint check in
 * app.html.
 *
 * The choice used to live in localStorage (`cookie_consent`). It is copied into
 * the cookie the first time it is read, so nobody is asked twice.
 */
export type Consent = 'accepted' | 'declined';

export const CONSENT_COOKIE = 'ecohubs_consent';
const LEGACY_KEY = 'cookie_consent';
const SHARED_DOMAIN = 'ecohubs.community';
/** Ask again after six months. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 182;

/** Dispatched on window when the visitor chooses; detail: { accepted }. */
export const CONSENT_CHANGE_EVENT = 'cookie-consent-change';
/** Dispatched on window by "Cookie settings" to show the banner again. */
export const CONSENT_REOPEN_EVENT = 'cookie-consent-reopen';

export function writeConsent(value: Consent): void {
	const host = location.hostname;
	const domain =
		host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`)
			? `; Domain=.${SHARED_DOMAIN}`
			: '';
	const secure = location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${domain}${secure}`;
	// A choice made now replaces any older one, so a stale legacy value can never
	// come back once this cookie expires.
	removeLegacy();
}

function removeLegacy(): void {
	if (!readCookie()) return; // keep the old choice if the cookie could not be written
	try {
		localStorage.removeItem(LEGACY_KEY);
	} catch {
		// Storage blocked: nothing stored there either.
	}
}

function readCookie(): Consent | null {
	const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(accepted|declined)`));
	return (match?.[1] as Consent | undefined) ?? null;
}

export function readConsent(): Consent | null {
	const stored = readCookie();
	if (stored) return stored;
	let legacy: string | null = null;
	try {
		legacy = localStorage.getItem(LEGACY_KEY);
	} catch {
		// Storage blocked: no recorded choice.
	}
	if (legacy !== 'accepted' && legacy !== 'declined') return null;
	// Migrate once. writeConsent removes the legacy value, but only after the
	// cookie is really there (cookies can be blocked); otherwise keep it and
	// still honour it for this page.
	writeConsent(legacy);
	return readCookie() ?? legacy;
}
