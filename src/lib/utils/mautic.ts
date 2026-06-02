/**
 * Client-side Mautic tracking helpers, shared across landing pages.
 *
 * `initMauticTracking()` boots the `mtc.js` pixel (anonymous visitor tracking
 * + pageview). Once it resolves, Mautic exposes the tracked contact id on
 * `window.mtcId`; `getMauticContactId()` reads it so a server-side form
 * submission can be stitched onto that visitor's session.
 *
 * Note: `window.mtcId` only populates in production where Mautic's CORS event
 * endpoint is reachable and the visitor has a tracking session. On localhost
 * it stays empty, and submissions simply create an unlinked contact.
 */

import { MAUTIC_BASE_URL } from '$lib/config/mautic';

interface MauticWindow {
	MauticTrackingObject?: string;
	mt?: ((...args: unknown[]) => void) & { q?: unknown[][] };
	mtcId?: string | number | null;
}

/** Load mtc.js (once) and send a pageview. Safe to call on every landing page. */
export function initMauticTracking(): void {
	if (typeof window === 'undefined') return;
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
