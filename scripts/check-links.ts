/**
 * Checks every external link in the Learning Hub content.
 *
 *     pnpm links            # report, exit non-zero if anything is broken
 *     pnpm links --quiet    # only the problems
 *
 * **Deliberately not part of CI.** It needs the network, so as a build gate it
 * would fail for reasons that have nothing to do with the change being made —
 * somebody else's server having a bad afternoon. Run it before a content
 * release, or on a schedule.
 *
 * Internal links need nothing like this: everything is prerendered, so a link
 * to a missing route already fails `pnpm build` with the page that linked it.
 * This covers the part the build cannot see.
 *
 * Redirects are reported rather than passed over. That is how the Cohousing
 * Association's move to cohousingalliance.org was caught — the old URL still
 * answered 200, at a different address, and the citation had quietly become
 * wrong about who publishes it.
 *
 * Three outcomes, not two. **A 403 is a server refusing us, not a dead page** —
 * Twin Oaks, Fannie Mae and Wiley all have bot protection and all are perfectly
 * alive in a browser. Reporting those as broken is the same naive-measurement
 * mistake that put two false positives in the original SEO audit, so they are
 * counted separately and do not fail the run. Everything else at 400 or above,
 * and every request that fails outright, does fail it.
 *
 * These are public citations, and a content file — which arrives in a pull
 * request — is not entitled to make whoever runs this reach into their own
 * network. `validatingLookup()` is the DNS resolution the socket itself uses,
 * on the first request and on every redirect hop, so there is no gap between
 * checking an address and connecting to it.
 */
import { readFile, readdir } from 'node:fs/promises';
import { lookup } from 'node:dns/promises';
import type { LookupAddress, LookupOptions } from 'node:dns';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { isIP } from 'node:net';
import { join, relative } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src/content/learning');

/** A browser agent: several publishers refuse an obvious script. */
const UA =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const CONCURRENCY = 6;
const TIMEOUT_MS = 25_000;

interface Link {
	url: string;
	file: string;
}

interface Result extends Link {
	status: number | null;
	finalUrl?: string;
	error?: string;
}

/* ── Finding the links ───────────────────────────────────────────────────── */

async function* walk(dir: string): AsyncGenerator<string> {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full);
		else if (entry.name.endsWith('.md') || entry.name.endsWith('.ts')) yield full;
	}
}

/**
 * `url: 'https://…'` in a Sources block, `](https://…)` in prose, and
 * `href="https://…"` on a component — which is how every `<Rcos>` card cites
 * the clause it is paraphrasing, and therefore the one form of citation the
 * first two patterns would have walked straight past.
 */
const PATTERNS = [
	/url:\s*'(https?:\/\/[^']+)'/g,
	/\]\((https?:\/\/[^)\s]+)\)/g,
	/href="(https?:\/\/[^"]+)"/g
];

async function collect(): Promise<Link[]> {
	const found = new Map<string, Set<string>>();

	for await (const file of walk(CONTENT)) {
		const source = await readFile(file, 'utf8');
		for (const pattern of PATTERNS) {
			for (const [, url] of source.matchAll(pattern)) {
				// Trailing punctuation sometimes rides along in prose links.
				const clean = url.replace(/[.,;]+$/, '');
				if (!found.has(clean)) found.set(clean, new Set());
				found.get(clean)!.add(relative(ROOT, file));
			}
		}
	}

	return [...found].map(([url, files]) => ({ url, file: [...files].sort().join(', ') }));
}

/* ── Checking them ───────────────────────────────────────────────────────── */

/**
 * A URL without its fragment or its trailing slash.
 *
 * `fetch` never puts the fragment in `response.url` — it is a client-side
 * concern the server never sees — so a link to `…/layer-4…#63-safeguards`
 * would otherwise be reported as redirecting to `…/layer-4…` on every run.
 * Every `<Rcos>` citation is anchored, so without this the redirect list is all
 * noise and stops being read, which is the only way it does any good.
 */
function comparable(url: string): string {
	try {
		const parsed = new URL(url);
		parsed.hash = '';
		return parsed.href.replace(/\/$/, '');
	} catch {
		return url;
	}
}

/**
 * An IPv6 address as its eight 16-bit groups, or `null` if it will not parse.
 *
 * Written out rather than pattern-matched because **the textual form is not
 * the one you are given**: `new URL('http://[::ffff:127.0.0.1]/').hostname` is
 * `[::ffff:7f00:1]`, so a check for the readable dotted spelling matches a
 * string that never reaches it. That was a live bypass — `::ffff:7f00:1` is
 * loopback, and a regex looking for `::ffff:` followed by digits and dots let
 * it straight through while a unit test on the dotted spelling passed.
 *
 * Numbers have one spelling. Text has several.
 */
function hextets(ip: string): number[] | null {
	let text = ip.toLowerCase().replace(/^\[|\]$/g, '');

	// A dotted tail (`::ffff:127.0.0.1`) is the low 32 bits written as IPv4.
	const dotted = text.match(/^(.*:)(\d{1,3}(?:\.\d{1,3}){3})$/);
	if (dotted) {
		const octets = dotted[2].split('.').map(Number);
		if (octets.some((octet) => octet > 255)) return null;
		const high = ((octets[0] << 8) | octets[1]).toString(16);
		const low = ((octets[2] << 8) | octets[3]).toString(16);
		text = `${dotted[1]}${high}:${low}`;
	}

	const halves = text.split('::');
	if (halves.length > 2) return null;

	const left = halves[0] ? halves[0].split(':') : [];
	const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];

	// Without `::` the address must already be all eight groups.
	if (halves.length === 1) {
		if (left.length !== 8) return null;
	} else if (left.length + right.length > 7) {
		return null;
	}

	const zeros: string[] = new Array(8 - left.length - right.length).fill('0');
	const groups = halves.length === 1 ? left : [...left, ...zeros, ...right];

	const numbers = groups.map((group) =>
		/^[0-9a-f]{1,4}$/.test(group) ? parseInt(group, 16) : NaN
	);
	return numbers.some(Number.isNaN) ? null : numbers;
}

/**
 * Address ranges this script will not send a request to.
 *
 * Every URL here arrives from a content file, and a content file arrives in a
 * pull request. Left unchecked, `https://…` is enough to make somebody who runs
 * `pnpm links` probe their own network: `169.254.169.254` for cloud metadata, a
 * loopback port to learn what a maintainer is running, an internal host to fire
 * a state-changing GET at. Only the status code comes back, so this is an
 * oracle rather than a leak — but it is somebody else's machine either way.
 *
 * Ranges follow the IANA special-purpose registries; the useful ones here are
 * loopback, link-local (which is what carries cloud metadata), the RFC 1918
 * blocks, and the carrier-grade NAT range that home routers sit behind.
 */
export function isPublicAddress(ip: string): boolean {
	// Brackets belong to the URL, not the address, and `isIP` rejects them.
	const bare = ip.replace(/^\[|\]$/g, '');
	const kind = isIP(bare);

	// Anything that is not an address at all is refused rather than waved
	// through. This branch used to fall into the IPv4 arithmetic below, where a
	// malformed string produced `NaN` comparisons, every test failed, and the
	// function answered `true` — open by default, on exactly the inputs least
	// worth trusting.
	if (kind === 0) return false;

	if (kind === 6) {
		const groups = hextets(bare);
		// Unparseable is refused rather than allowed: the whole point of this
		// function is that anything it cannot vouch for does not get requested.
		if (!groups) return false;

		const [a, , , , , sixth, seventh, eighth] = groups;

		// The first 80 bits being zero means the address embeds an IPv4 one:
		// `::ffff:x` is IPv4-mapped, `::x` the deprecated IPv4-compatible form.
		// Both have to be judged as the IPv4 address they carry.
		if (groups.slice(0, 5).every((group) => group === 0) && (sixth === 0xffff || sixth === 0)) {
			if (sixth === 0 && seventh === 0 && eighth <= 1) return false; // :: and ::1
			const octets = [seventh >> 8, seventh & 0xff, eighth >> 8, eighth & 0xff];
			return isPublicAddress(octets.join('.'));
		}

		if ((a & 0xfe00) === 0xfc00) return false; // fc00::/7 unique-local
		if ((a & 0xffc0) === 0xfe80) return false; // fe80::/10 link-local
		if ((a & 0xff00) === 0xff00) return false; // ff00::/8 multicast
		return true;
	}

	const [a, b] = bare.split('.').map(Number);
	if (a === 0 || a === 10 || a === 127) return false;
	if (a === 169 && b === 254) return false; // link-local, incl. cloud metadata
	if (a === 172 && b >= 16 && b <= 31) return false;
	if (a === 192 && b === 168) return false;
	if (a === 100 && b >= 64 && b <= 127) return false; // CGNAT
	if (a === 192 && b === 0) return false; // IETF protocol assignments
	if (a === 198 && (b === 18 || b === 19)) return false; // benchmarking
	if (a >= 224) return false; // multicast and reserved
	return true;
}

/**
 * A `dns.lookup` replacement that refuses to hand back a non-public address.
 *
 * This is the whole SSRF defence, and it lives here rather than in a check
 * before the request for one reason: **it is the resolution the socket
 * actually uses.** Validating separately and then letting the client resolve
 * again leaves a window — a hostile name server can answer publicly for the
 * check and privately for the connection a millisecond later, which is DNS
 * rebinding and is not a theoretical attack. `http.request` takes a `lookup`,
 * calls it at connect time, and connects to whatever it returns, so there is no
 * second resolution to disagree with this one.
 */
export function validatingLookup(
	hostname: string,
	options: LookupOptions,
	callback: (error: Error | null, address?: string | LookupAddress[], family?: number) => void
): void {
	lookup(hostname, { ...options, all: true }).then((entries) => {
		// `every`, not `some`: a name answering with one public and one private
		// address is the shape of an attack, not a coincidence.
		if (!entries.every((entry) => isPublicAddress(entry.address))) {
			const seen = entries.map((entry) => entry.address).join(', ');
			callback(new Error(`refusing non-public address: ${hostname} → ${seen}`));
			return;
		}

		if (options.all) callback(null, entries);
		else callback(null, entries[0].address, entries[0].family);
	}, callback);
}

/**
 * Rejects a URL this script has no business requesting, before it is requested.
 *
 * `validatingLookup` covers hostnames but cannot cover `http://127.0.0.1/` —
 * **there is nothing to look up, so Node never calls it** and connects to the
 * literal. That gap is not theoretical: it is how the first version of this
 * guard let `169.254.169.254` through, caught by running the checker against a
 * planted URL rather than by reading the code.
 */
export function assertRequestable(url: string): void {
	const { protocol, hostname } = new URL(url);
	if (protocol !== 'http:' && protocol !== 'https:') {
		throw new Error(`refusing non-http(s) URL: ${protocol}`);
	}

	const literal = hostname.replace(/^\[|\]$/g, '');
	if (isIP(literal) && !isPublicAddress(literal)) {
		throw new Error(`refusing non-public address: ${literal}`);
	}
}

const MAX_REDIRECTS = 10;

/**
 * Status and `Location` for one URL, and nothing else.
 *
 * `node:http` rather than `fetch`, because `fetch` gives no way to own the DNS
 * lookup without pulling in undici as a dependency. It costs nothing here: this
 * script never wants a response body, so the socket is destroyed as soon as the
 * headers land — which is less work than `fetch` was doing, not more.
 */
function head(url: string, method: 'HEAD' | 'GET'): Promise<{ status: number; location?: string }> {
	assertRequestable(url);
	const request = url.startsWith('https:') ? httpsRequest : httpRequest;

	return new Promise((resolve, reject) => {
		const outgoing = request(
			url,
			{
				method,
				headers: { 'User-Agent': UA, Accept: '*/*' },
				lookup: validatingLookup,
				timeout: TIMEOUT_MS
			},
			(response) => {
				resolve({
					status: response.statusCode ?? 0,
					location: response.headers.location
				});
				// Nothing here reads a body; holding the socket open to download
				// one would be the only expensive part of the run.
				response.destroy();
			}
		);

		outgoing.on('timeout', () => outgoing.destroy(new Error(`timed out after ${TIMEOUT_MS}ms`)));
		outgoing.on('error', reject);
		outgoing.end();
	});
}

async function check(link: Link): Promise<Result> {
	/**
	 * Redirects are followed by hand rather than by the client, so that every
	 * hop goes through `validatingLookup` rather than only the URL in the
	 * content file. A public host that 302s to `127.0.0.1` is otherwise the
	 * whole bypass.
	 */
	const follow = async (method: 'HEAD' | 'GET') => {
		let url = link.url;

		for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
			const response = await head(url, method);

			if (response.status < 300 || response.status >= 400 || !response.location) {
				return { status: response.status, url };
			}

			url = new URL(response.location, url).href;
		}

		throw new Error(`more than ${MAX_REDIRECTS} redirects`);
	};

	try {
		// HEAD first — cheap — but plenty of servers answer it wrongly, so a
		// non-OK HEAD is retried as a GET before being called a failure.
		let result = await follow('HEAD');
		if (result.status >= 400) result = await follow('GET');

		return {
			...link,
			status: result.status,
			finalUrl: comparable(result.url) !== comparable(link.url) ? result.url : undefined
		};
	} catch (error) {
		return { ...link, status: null, error: (error as Error).message };
	}
}

async function pool<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = [];
	let next = 0;

	await Promise.all(
		Array.from({ length: Math.min(size, items.length) }, async () => {
			while (next < items.length) {
				const index = next++;
				results[index] = await fn(items[index]);
			}
		})
	);

	return results;
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

async function main() {
	const quiet = process.argv.includes('--quiet');
	const links = await collect();
	console.log(`Checking ${links.length} external links…\n`);

	const results = await pool(links, CONCURRENCY, check);

	// 401/403/429 mean "not to you, not right now". Only a page that is actually
	// gone, or a server that is actually failing, counts as broken.
	const BLOCKED = [401, 403, 429];
	const blocked = results.filter((r) => r.status !== null && BLOCKED.includes(r.status));
	const broken = results.filter(
		(r) => !blocked.includes(r) && (r.status === null || r.status >= 400)
	);
	const redirected = results.filter(
		(r) => !broken.includes(r) && !blocked.includes(r) && r.finalUrl
	);
	const ok = results.filter(
		(r) => !broken.includes(r) && !redirected.includes(r) && !blocked.includes(r)
	);

	if (!quiet) {
		for (const r of ok.sort((a, b) => a.url.localeCompare(b.url))) {
			console.log(`  ${r.status}  ${r.url}`);
		}
		console.log();
	}

	if (redirected.length) {
		console.log(
			`↪ ${redirected.length} redirect(s) — check the citation still names the right publisher:`
		);
		for (const r of redirected) {
			console.log(`    ${r.url}\n      → ${r.finalUrl}\n      ${r.file}`);
		}
		console.log();
	}

	if (blocked.length) {
		console.log(`⊘ ${blocked.length} blocked to scripts — check by hand, these are usually fine:`);
		for (const r of blocked) {
			console.log(`    ${r.status}  ${r.url}`);
		}
		console.log();
	}

	if (broken.length) {
		console.log(`✗ ${broken.length} broken:`);
		for (const r of broken) {
			console.log(`    ${r.status ?? r.error}  ${r.url}\n      ${r.file}`);
		}
		console.log();
	}

	console.log(
		`${ok.length} ok · ${redirected.length} redirected · ${blocked.length} blocked · ${broken.length} broken`
	);

	// Redirects are reported, not failed: a publisher moving a page is normal and
	// needs a person to judge whether the citation still says the right thing.
	if (broken.length) process.exit(1);
}

// Guarded so the spec can import the address guard without running a network
// sweep — the same pattern `scripts/build-downloads.ts` uses.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
