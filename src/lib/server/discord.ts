/**
 * Discord error alerts.
 *
 * Posts a compact embed to a Discord channel via an incoming webhook whenever a
 * server-side integration fails — contact email delivery, the /join application
 * submit, the Mautic / Listmonk signups (newsletter, self-assignment, waitlist),
 * or any uncaught 500. Best-effort and fire-and-forget: if the webhook is unset
 * or Discord is unreachable, it logs and moves on. Alerting must never break the
 * request it is reporting on.
 *
 * Enable by setting DISCORD_ERRORS_WEBHOOK_URL (Discord → Channel → Edit →
 * Integrations → Webhooks → New Webhook → Copy URL). Unset = silently disabled,
 * which is the expected state for local dev and CI.
 */
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

export interface DiscordAlert {
	/** Short label for where it broke, e.g. 'Contact form' or 'Waitlist · Mautic'. */
	source: string;
	/** One-line human summary of what went wrong. */
	summary: string;
	/** The thrown error or a descriptive detail string. */
	error?: unknown;
	/** Extra key/value context rendered as embed fields (status, email, url, …). */
	context?: Record<string, string | number | boolean | undefined | null>;
}

// Collapse identical alerts fired within this window into a single message, so a
// flapping integration (e.g. Mautic down) pings once rather than on every
// submission. The follow-up message reports how many were suppressed.
const THROTTLE_MS = 5 * 60 * 1000;
// Cap how long a webhook POST may block the request that triggered it.
const WEBHOOK_TIMEOUT_MS = 4000;
const DISCORD_DANGER = 0xed4245;

// In-memory throttle keyed by source+summary. Resets on server restart — fine
// for a best-effort alerter, and consistent with the in-memory rate limiters
// the API routes already use.
const lastSent = new Map<string, { at: number; suppressed: number }>();

/**
 * True when a failed integration result is merely an unconfigured / disabled
 * service (e.g. a missing form id) rather than a genuine runtime failure. Lets
 * callers skip alerting on integrations that are intentionally switched off —
 * the newsletter's Mautic form, for instance, is optional.
 */
export function isConfigGap(error: unknown): boolean {
	return typeof error === 'string' && /not configured/i.test(error);
}

function describe(error: unknown): string | undefined {
	if (error == null) return undefined;
	if (error instanceof Error) return `${error.name}: ${error.message}`;
	if (typeof error === 'string') return error;
	try {
		return JSON.stringify(error).slice(0, 500);
	} catch {
		return String(error);
	}
}

/**
 * Send a failure alert to the Discord error channel. Never throws and never
 * blocks for longer than WEBHOOK_TIMEOUT_MS. Resolves once the webhook call
 * settles (or is skipped), so callers on a failure path can `await` it safely.
 */
export async function notifyDiscordError(alert: DiscordAlert): Promise<void> {
	const url = env.DISCORD_ERRORS_WEBHOOK_URL;
	if (!url) return; // disabled — no webhook configured

	const key = `${alert.source}::${alert.summary}`;
	const now = Date.now();
	const prev = lastSent.get(key);
	if (prev && now - prev.at < THROTTLE_MS) {
		prev.suppressed++;
		return; // within throttle window — collapse into the next message
	}
	const suppressed = prev?.suppressed ?? 0;
	lastSent.set(key, { at: now, suppressed: 0 });

	const fields: { name: string; value: string; inline?: boolean }[] = [];
	const errDetail = describe(alert.error);
	if (errDetail) {
		fields.push({ name: 'Error', value: '```' + errDetail.slice(0, 1000) + '```' });
	}
	for (const [name, value] of Object.entries(alert.context ?? {})) {
		if (value === undefined || value === null || value === '') continue;
		fields.push({ name, value: String(value).slice(0, 1024), inline: true });
	}
	if (suppressed > 0) {
		fields.push({
			name: 'Suppressed',
			value: `${suppressed} identical alert(s) in the previous 5 min`,
			inline: true
		});
	}

	const payload = {
		username: 'EcoHubs Alerts',
		embeds: [
			{
				title: `🔴 ${alert.source}`.slice(0, 256),
				description: alert.summary.slice(0, 2048),
				color: DISCORD_DANGER,
				fields: fields.slice(0, 25),
				footer: { text: `ecohubs.community · ${dev ? 'development' : 'production'}` },
				timestamp: new Date(now).toISOString()
			}
		]
	};

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
			signal: controller.signal
		});
		if (!res.ok) {
			const body = await res.text().catch(() => '');
			console.error(`Discord alert rejected: ${res.status} ${body}`.slice(0, 300));
		}
	} catch (err) {
		console.error('Discord alert failed to send:', err instanceof Error ? err.message : err);
	} finally {
		clearTimeout(timer);
	}
}
