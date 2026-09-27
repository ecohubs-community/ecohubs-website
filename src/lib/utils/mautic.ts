/**
 * Client-side Mautic tracking helpers, shared across landing pages.
 *
 * `initMauticTracking()` boots the `mtc.js` pixel (visitor tracking cookies
 * + pageview), but only once the visitor has accepted cookies in the banner —
 * /privacy promises it. Once it resolves, Mautic exposes the tracked contact
 * id on `window.mtcId`; `getMauticContactId()` reads it so a server-side form
 * submission can be stitched onto that visitor's session.
 *
 * Without consent the pixel never loads, `window.mtcId` stays empty, and
 * submissions simply create an unlinked contact — the same as on localhost,
 * where Mautic's CORS event endpoint is unreachable.
 */

import { MAUTIC_BASE_URL } from '$lib/config/mautic';

interface MauticWindow {
	MauticTrackingObject?: string;
	mt?: ((...args: unknown[]) => void) & { q?: unknown[][] };
	mtcId?: string | number | null;
}

function hasAcceptedCookies(): boolean {
	try {
		return localStorage.getItem('cookie_consent') === 'accepted';
	} catch {
		// Storage blocked — no recorded consent.
		return false;
	}
}

/**
 * Start Mautic tracking if the visitor has accepted cookies, or as soon as
 * they accept in the banner. Call from `onMount` and return the result: it
 * removes the consent listener when the page unmounts.
 */
export function initMauticTracking(): () => void {
	if (typeof window === 'undefined') return () => {};

	if (hasAcceptedCookies()) {
		loadMauticTracking();
		return () => {};
	}

	// `cookie-consent-change` is dispatched by CookieConsent.svelte.
	const onConsent = (event: Event) => {
		if ((event as CustomEvent<{ accepted: boolean }>).detail?.accepted !== true) return;
		window.removeEventListener('cookie-consent-change', onConsent);
		loadMauticTracking();
	};
	window.addEventListener('cookie-consent-change', onConsent);
	return () => window.removeEventListener('cookie-consent-change', onConsent);
}

/** Load mtc.js (once) and send a pageview. */
function loadMauticTracking(): void {
	const w = window as unknown as MauticWindow;

	if (w.MauticTrackingObject) {
		w.mt?.('send', 'pageview');
		return;
	}

	w.MauticTrackingObject = 'mt';
	const fn = function (...args: unknown[]) {
		(fn.q = fn.q || []).push(args);
	} as ((...args: unknown[]) => void) & { q?: unknown[][] };
	w.mt = fn;

	const s = document.createElement('script');
	s.async = true;
	s.src = `${MAUTIC_BASE_URL}/mtc.js`;
	document.head.appendChild(s);

	w.mt('send', 'pageview');
}

/** The tracked Mautic contact id, or undefined if tracking hasn't resolved. */
export function getMauticContactId(): string | undefined {
	if (typeof window === 'undefined') return undefined;
	const id = (window as unknown as MauticWindow).mtcId;
	return id ? String(id) : undefined;
}
