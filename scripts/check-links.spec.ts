/**
 * The address guard on the link checker.
 *
 * `pnpm links` fetches whatever URL a content file contains, and content files
 * arrive in pull requests. Without this, `https://…` in a markdown file is
 * enough to make a maintainer's own machine probe its own network. The guard is
 * small enough to be deleted by accident, so these pin it.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { lookup } from 'node:dns/promises';
import { assertRequestable, isPublicAddress, validatingLookup } from './check-links.ts';

/**
 * DNS is stubbed rather than exercised. These tests are about what
 * `validatingLookup` does with an answer, and running them against the real
 * resolver made the suite depend on a network and on whatever the machine
 * thinks `localhost` is — flaky in CI, and untestable for the case that
 * matters most: a name answering with a public *and* a private address, which
 * is the shape of a rebinding attack and which no real hostname will produce
 * on demand.
 */
vi.mock('node:dns/promises', () => ({ lookup: vi.fn() }));

const PUBLIC = [{ address: '93.184.216.34', family: 4 }];

function answers(...entries: { address: string; family: number }[]) {
	vi.mocked(lookup).mockResolvedValue(entries as never);
}

/**
 * Braces, not a concise body. `mockReset()` returns the mock, and a hook that
 * returns a function has handed vitest a teardown callback — so the concise
 * form made vitest *call the mock* after each test. With a rejecting
 * implementation that produced an unhandled rejection and failed the test that
 * had just passed, blaming a line three tests away.
 */
beforeEach(() => {
	vi.mocked(lookup).mockReset();
});

/** Promise wrapper, because the lookup has to keep Node's callback shape. */
function resolveVia(hostname: string, options: Record<string, unknown> = {}): Promise<unknown> {
	return new Promise((resolve, reject) =>
		validatingLookup(hostname, options, (error, address) =>
			error ? reject(error) : resolve(address)
		)
	);
}

describe('isPublicAddress', () => {
	it('accepts ordinary public addresses', () => {
		for (const ip of ['93.184.216.34', '1.1.1.1', '8.8.8.8', '2606:2800:220:1:248:1893:25c8:1946'])
			expect(isPublicAddress(ip), ip).toBe(true);
	});

	it('rejects loopback, private and link-local IPv4', () => {
		const blocked = [
			'127.0.0.1',
			'127.1.2.3',
			'0.0.0.0',
			'10.0.0.5',
			'172.16.0.1',
			'172.31.255.255',
			'192.168.1.1',
			'100.64.0.1', // carrier-grade NAT
			'198.18.0.1', // benchmarking
			'224.0.0.1', // multicast
			'255.255.255.255'
		];
		for (const ip of blocked) expect(isPublicAddress(ip), ip).toBe(false);
	});

	/** The one an attacker actually reaches for. */
	it('rejects the cloud metadata address', () => {
		expect(isPublicAddress('169.254.169.254')).toBe(false);
	});

	it('rejects the neighbours of a private range without over-blocking it', () => {
		// 172.16/12 is the block, so .15 and .32 are ordinary public space.
		expect(isPublicAddress('172.15.0.1')).toBe(true);
		expect(isPublicAddress('172.32.0.1')).toBe(true);
		expect(isPublicAddress('11.0.0.1')).toBe(true);
		expect(isPublicAddress('169.253.0.1')).toBe(true);
	});

	it('rejects IPv6 loopback, unique-local and link-local', () => {
		for (const ip of ['::1', '::', 'fc00::1', 'fd12:3456::1', 'fe80::1'])
			expect(isPublicAddress(ip), ip).toBe(false);
	});

	/** `::ffff:127.0.0.1` is loopback with a hat on, and reads as v6. */
	it('sees through an IPv4-mapped IPv6 address', () => {
		expect(isPublicAddress('::ffff:127.0.0.1')).toBe(false);
		expect(isPublicAddress('::ffff:169.254.169.254')).toBe(false);
		expect(isPublicAddress('::ffff:93.184.216.34')).toBe(true);
	});

	/**
	 * The bug the dotted cases above did not catch, and could not: `new URL()`
	 * rewrites `[::ffff:127.0.0.1]` to `[::ffff:7f00:1]`, so the readable
	 * spelling never reaches the guard and the hex one was let through as
	 * ordinary IPv6. A test asserting only the dotted form passes against
	 * code that is wide open.
	 */
	it('sees through the hexadecimal mapped form, which is what a URL produces', () => {
		expect(isPublicAddress('::ffff:7f00:1')).toBe(false); // 127.0.0.1
		expect(isPublicAddress('::ffff:a9fe:a9fe')).toBe(false); // 169.254.169.254
		expect(isPublicAddress('::ffff:a00:5')).toBe(false); // 10.0.0.5
		expect(isPublicAddress('::ffff:c0a8:101')).toBe(false); // 192.168.1.1
		expect(isPublicAddress('::ffff:5db8:d822')).toBe(true); // 93.184.216.34
	});

	/** The deprecated IPv4-compatible form carries an address too. */
	it('sees through the IPv4-compatible form', () => {
		expect(isPublicAddress('::7f00:1')).toBe(false);
		expect(isPublicAddress('::a9fe:a9fe')).toBe(false);
	});

	it('parses every spelling of the same address alike', () => {
		for (const spelling of [
			'::ffff:7f00:1',
			'::FFFF:7F00:1',
			'0:0:0:0:0:ffff:7f00:1',
			'0000:0000:0000:0000:0000:ffff:127.0.0.1',
			'[::ffff:7f00:1]'
		]) {
			expect(isPublicAddress(spelling), spelling).toBe(false);
		}
	});

	/** Refusing beats guessing: an address we cannot parse is not requested. */
	it('refuses an address it cannot parse', () => {
		for (const bad of ['::ffff:7f00:1::2', 'gggg::1', '1:2:3:4:5:6:7', '::ffff:999.1.1.1'])
			expect(isPublicAddress(bad), bad).toBe(false);
	});
});

describe('validatingLookup', () => {
	it('passes a public answer through', async () => {
		answers(...PUBLIC);
		await expect(resolveVia('example.com')).resolves.toBe('93.184.216.34');
	});

	/** What `localhost` does, without depending on the machine agreeing. */
	it('refuses a name that resolves into private space', async () => {
		answers({ address: '127.0.0.1', family: 4 });
		await expect(resolveVia('internal.example.com')).rejects.toThrow(/non-public/);
	});

	/**
	 * The case worth having a stub for: no real hostname will answer with one
	 * public and one private address on demand, and it is precisely the shape a
	 * rebinding attack takes. `every`, not `some`.
	 */
	it('refuses a mixed answer, not just an all-private one', async () => {
		answers({ address: '93.184.216.34', family: 4 }, { address: '10.0.0.5', family: 4 });
		await expect(resolveVia('split.example.com')).rejects.toThrow(/non-public/);
	});

	it('names the addresses it refused, so the report can be acted on', async () => {
		answers({ address: '::1', family: 6 }, { address: '127.0.0.1', family: 4 });
		await expect(resolveVia('internal.example.com')).rejects.toThrow(
			/internal\.example\.com → ::1, 127\.0\.0\.1/
		);
	});

	/**
	 * The reason this is a `lookup` and not a check before the request: it is the
	 * resolution the socket uses, so there is no second answer to disagree with
	 * it. Node calls this at connect time and connects to what it returns —
	 * which only works if it keeps Node's exact callback contract.
	 */
	it('keeps Node’s callback contract, so http.request can use it directly', async () => {
		answers(...PUBLIC);
		expect(await resolveVia('example.com')).toBe('93.184.216.34');

		answers(...PUBLIC);
		expect(await resolveVia('example.com', { all: true })).toEqual(PUBLIC);
	});

	/** `all: true` regardless of the caller, or a second address goes unchecked. */
	it('always asks for every address, whatever it was asked for', async () => {
		answers(...PUBLIC);
		await resolveVia('example.com', { family: 4 });
		expect(vi.mocked(lookup)).toHaveBeenCalledWith('example.com', { family: 4, all: true });
	});

	it('reports a resolution failure rather than swallowing it', async () => {
		// `mockRejectedValue` builds its rejected promise up front, which vitest
		// then reports as unhandled whether or not the mock is ever called.
		// Rejecting from the implementation keeps it to one, on the call.
		vi.mocked(lookup).mockImplementation(() => Promise.reject(new Error('ENOTFOUND')));
		await expect(resolveVia('nonexistent.invalid')).rejects.toThrow(/ENOTFOUND/);
	});
});

describe('assertRequestable', () => {
	it('refuses a non-http scheme', () => {
		expect(() => assertRequestable('file:///etc/passwd')).toThrow(/non-http/);
		expect(() => assertRequestable('ftp://example.com/x')).toThrow(/non-http/);
	});

	/**
	 * The regression this exists for. `http.request` skips `lookup` entirely
	 * when the host is already an address, so a literal reaches the socket
	 * unless it is stopped here. The first version of the guard missed it.
	 */
	it('refuses a literal private address, which never reaches the lookup', () => {
		for (const url of [
			'http://169.254.169.254/latest/meta-data/',
			'http://127.0.0.1:5173/',
			'http://10.0.0.5/',
			'http://[::1]:8080/',
			'https://192.168.1.1/',
			// Written dotted; `new URL` hands the guard `[::ffff:7f00:1]`.
			'http://[::ffff:127.0.0.1]/',
			'http://[::ffff:7f00:1]/',
			'http://[::ffff:a9fe:a9fe]/latest/meta-data/'
		]) {
			expect(() => assertRequestable(url), url).toThrow(/non-public/);
		}
	});

	it('allows http and https to a public host or address', () => {
		expect(() => assertRequestable('https://www.ic.org/')).not.toThrow();
		expect(() => assertRequestable('http://example.com/')).not.toThrow();
		expect(() => assertRequestable('https://93.184.216.34/')).not.toThrow();
	});
});
