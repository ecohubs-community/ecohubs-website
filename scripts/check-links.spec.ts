/**
 * The address guard on the link checker.
 *
 * `pnpm links` fetches whatever URL a content file contains, and content files
 * arrive in pull requests. Without this, `https://…` in a markdown file is
 * enough to make a maintainer's own machine probe its own network. The guard is
 * small enough to be deleted by accident, so these pin it.
 */
import { describe, expect, it } from 'vitest';
import { assertPublic, isPublicAddress } from './check-links.ts';

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
});

describe('assertPublic', () => {
	it('refuses a literal private address in a URL', async () => {
		await expect(assertPublic('http://169.254.169.254/latest/meta-data/')).rejects.toThrow(
			/non-public/
		);
		await expect(assertPublic('http://127.0.0.1:5173/')).rejects.toThrow(/non-public/);
		await expect(assertPublic('http://[::1]:8080/')).rejects.toThrow(/non-public/);
	});

	/** `localhost` is the case a hostname-string blocklist would miss. */
	it('resolves a hostname before judging it', async () => {
		await expect(assertPublic('http://localhost:3000/')).rejects.toThrow(/non-public/);
	});

	it('refuses a non-http scheme', async () => {
		await expect(assertPublic('file:///etc/passwd')).rejects.toThrow(/non-http/);
	});

	it('allows a real public citation', async () => {
		await expect(assertPublic('https://www.ic.org/')).resolves.toBeUndefined();
	});
});
