/**
 * Server-side Listmonk subscription helper.
 * Extracted from the newsletter endpoint so it can be reused alongside the
 * Mautic helper for dual-destination signups.
 */

import { LINKMONK_URL, LINKMONK_USERNAME, LINKMONK_PASSWORD } from '$env/static/private';

export interface ListmonkResult {
	ok: boolean;
	status?: number;
	error?: string;
}

export async function subscribeToListmonk(email: string, listIds: number[] = [1]): Promise<ListmonkResult> {
	if (!LINKMONK_URL || !LINKMONK_USERNAME) {
		return { ok: false, error: 'Listmonk not configured' };
	}

	const auth = `Basic ${Buffer.from(`${LINKMONK_USERNAME}:${LINKMONK_PASSWORD || ''}`).toString('base64')}`;

	try {
		const response = await fetch(`${LINKMONK_URL}/api/subscribers`, {
			method: 'POST',
			headers: {
				Authorization: auth,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				name: email.split('@')[0],
				status: 'enabled',
				preconfirm_subscriptions: false,
				lists: listIds
			})
		});

		const text = await response.text();

		if (!response.ok) {
			// Listmonk returns 409 when the subscriber already exists — treat that
			// as a soft success so the user-facing flow stays smooth.
			if (response.status === 409) {
				return { ok: true, status: 409 };
			}
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
