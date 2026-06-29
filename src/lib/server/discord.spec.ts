import { describe, it, expect, vi, beforeEach } from 'vitest';

// Control the webhook URL per-test by mutating this object — the util reads
// `env.DISCORD_ERRORS_WEBHOOK_URL` at call time. Declared via vi.hoisted so it
// exists before the hoisted vi.mock factories run.
const { mockEnv } = vi.hoisted(() => ({
	mockEnv: {} as { DISCORD_ERRORS_WEBHOOK_URL?: string }
}));
vi.mock('$env/dynamic/private', () => ({ env: mockEnv }));
vi.mock('$app/environment', () => ({ dev: true }));

import { notifyDiscordError, isConfigGap } from './discord';

describe('isConfigGap', () => {
	it('flags "not configured" errors as intentional config gaps', () => {
		expect(isConfigGap('MAUTIC_NEWSLETTER_FORM_ID not configured')).toBe(true);
		expect(isConfigGap('Listmonk not configured')).toBe(true);
	});

	it('does not flag genuine runtime errors', () => {
		expect(isConfigGap('fetch failed')).toBe(false);
		expect(isConfigGap('500 Internal Server Error')).toBe(false);
		expect(isConfigGap(undefined)).toBe(false);
	});
});

describe('notifyDiscordError', () => {
	beforeEach(() => {
		mockEnv.DISCORD_ERRORS_WEBHOOK_URL = undefined;
		vi.restoreAllMocks();
	});

	it('is a no-op when no webhook URL is configured', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch');
		await notifyDiscordError({ source: 'unset-case', summary: 'should not send' });
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it('POSTs a well-formed embed when the webhook URL is set', async () => {
		mockEnv.DISCORD_ERRORS_WEBHOOK_URL = 'https://discord.test/webhook';
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(new Response(null, { status: 204 }));

		await notifyDiscordError({
			source: 'post-case',
			summary: 'Something broke',
			error: new Error('kaboom'),
			context: { email: 'visitor@example.com', status: 503 }
		});

		expect(fetchSpy).toHaveBeenCalledOnce();
		const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
		expect(url).toBe('https://discord.test/webhook');
		expect(init.method).toBe('POST');

		const payload = JSON.parse(init.body as string);
		const embed = payload.embeds[0];
		expect(embed.title).toContain('post-case');
		expect(embed.description).toBe('Something broke');
		const fieldNames = embed.fields.map((f: { name: string }) => f.name);
		expect(fieldNames).toContain('Error');
		expect(fieldNames).toContain('email');
		expect(fieldNames).toContain('status');
	});

	it('collapses identical alerts fired within the throttle window', async () => {
		mockEnv.DISCORD_ERRORS_WEBHOOK_URL = 'https://discord.test/webhook';
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(new Response(null, { status: 204 }));

		const alert = { source: 'throttle-case', summary: 'repeated failure' };
		await notifyDiscordError(alert);
		await notifyDiscordError(alert);
		await notifyDiscordError(alert);

		expect(fetchSpy).toHaveBeenCalledOnce();
	});

	it('never throws when the webhook request itself fails', async () => {
		mockEnv.DISCORD_ERRORS_WEBHOOK_URL = 'https://discord.test/webhook';
		vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

		await expect(
			notifyDiscordError({ source: 'reject-case', summary: 'discord unreachable' })
		).resolves.toBeUndefined();
	});
});
