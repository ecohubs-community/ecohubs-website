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
 * counted separately and do not fail the run.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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

async function check(link: Link): Promise<Result> {
	const attempt = async (method: 'HEAD' | 'GET') =>
		fetch(link.url, {
			method,
			redirect: 'follow',
			headers: { 'User-Agent': UA, Accept: '*/*' },
			signal: AbortSignal.timeout(TIMEOUT_MS)
		});

	try {
		// HEAD first — cheap — but plenty of servers answer it wrongly, so a
		// non-OK HEAD is retried as a GET before being called a failure.
		let response = await attempt('HEAD');
		if (!response.ok) response = await attempt('GET');

		return {
			...link,
			status: response.status,
			finalUrl: comparable(response.url) !== comparable(link.url) ? response.url : undefined
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

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
