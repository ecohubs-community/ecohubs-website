/**
 * Generates the guide downloads: the full-guide PDF, the visit-questions PDF,
 * and the cost model worksheet.
 *
 *     pnpm downloads                 # every published guide
 *     pnpm downloads intentional-communities
 *     pnpm downloads --staged        # only guides whose content is staged
 *     BASE=http://localhost:5180 pnpm downloads
 *
 * The PDFs are printed from the `/print/<guide>` routes through headless
 * Chrome, so what ships is what the site renders. Nothing here re-states any
 * content.
 *
 * If a server is already listening at BASE it is used; otherwise one is started
 * and stopped again, so the pre-commit hook does not depend on the developer
 * happening to have `pnpm dev` open.
 *
 * Guide-agnostic on purpose: it discovers guides from the content directory,
 * and a guide only gets a worksheet if one of its lessons actually uses the
 * cost estimator. Adding a second guide means running this again.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:net';
import { spawn, type ChildProcess } from 'node:child_process';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildWorkbook } from './worksheet.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src/content/learning');
const OUT = join(ROOT, 'static/downloads');
const BASE = process.env.BASE ?? 'http://localhost:5173';

interface Entry {
	kind: 'pdf' | 'xlsx';
	label: string;
	detail: string;
	file: string;
	bytes: number;
	pages?: number;
}

/* ── Reading the content directory ───────────────────────────────────────── */

/** One frontmatter scalar, without pulling in a YAML parser for two fields. */
function field(source: string, name: string): string | undefined {
	const match = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
	return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

async function publishedGuides(): Promise<{ slug: string; title: string }[]> {
	const dir = join(CONTENT, 'guides');
	const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
	const guides = [];

	for (const file of files) {
		const source = await readFile(join(dir, file), 'utf8');
		if (field(source, 'status') !== 'published') continue;
		const slug = field(source, 'slug');
		const title = field(source, 'title');
		if (slug && title) guides.push({ slug, title });
	}
	return guides;
}

/** Whether any lesson in this guide uses the estimator, and so needs a sheet. */
async function usesEstimator(slug: string): Promise<boolean> {
	const dir = join(CONTENT, 'lessons', slug);
	if (!existsSync(dir)) return false;

	for (const file of await readdir(dir)) {
		if (!file.endsWith('.md')) continue;
		const source = await readFile(join(dir, file), 'utf8');
		if (/<CostEstimator[\s/>]/.test(source)) return true;
	}
	return false;
}

/* ── PDF ─────────────────────────────────────────────────────────────────── */

const footer = (label: string) => `
	<div style="width:100%;font-family:ui-sans-serif,system-ui,sans-serif;font-size:7.5pt;
	            color:#8a8a80;padding:0 16mm;display:flex;justify-content:space-between;">
		<span>${label}</span>
		<span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
	</div>`;

/**
 * Page count, read straight out of the PDF.
 *
 * `/Type /Page` counts leaves; `/Type /Pages` is the tree node, so the
 * negative lookahead is what stops every document reporting one page too many.
 */
function pageCount(pdf: Buffer): number {
	return (pdf.toString('latin1').match(/\/Type\s*\/Page(?![sA-Za-z])/g) ?? []).length;
}

async function renderPdf(
	page: import('playwright').Page,
	url: string,
	out: string,
	label: string,
	{ cover }: { cover: boolean }
): Promise<{ bytes: number; pages: number }> {
	const response = await page.goto(url, { waitUntil: 'networkidle' });
	if (!response?.ok()) throw new Error(`${url} returned ${response?.status()}`);

	await page.emulateMedia({ media: 'print' });

	const pdf = await page.pdf({
		format: 'A4',
		printBackground: true,
		displayHeaderFooter: true,
		headerTemplate: '<span></span>',
		footerTemplate: footer(label),
		// The cover bleeds to the paper edge, so the first page's margins are
		// removed in print.css; Chrome still needs room for the running footer.
		margin: cover
			? { top: '0', bottom: '14mm', left: '0', right: '0' }
			: { top: '16mm', bottom: '16mm', left: '16mm', right: '16mm' }
	});

	await mkdir(dirname(out), { recursive: true });
	await writeFile(out, pdf);
	return { bytes: pdf.length, pages: pageCount(pdf) };
}

/* ── The server ──────────────────────────────────────────────────────────── */

async function reachable(url: string): Promise<boolean> {
	try {
		return (await fetch(url, { signal: AbortSignal.timeout(2000) })).ok;
	} catch {
		return false;
	}
}

/**
 * A port nothing is listening on.
 *
 * Asked for rather than assumed: a hardcoded one collided with a server this
 * machine already had open, and `--strictPort` then killed the run with a
 * message that said only "exited".
 */
function freePort(): Promise<number> {
	return new Promise((resolve, reject) => {
		const probe = createServer();
		probe.once('error', reject);
		probe.listen(0, '127.0.0.1', () => {
			const { port } = probe.address() as { port: number };
			probe.close(() => resolve(port));
		});
	});
}

/**
 * Starts `vite dev` and waits for it, returning a handle to stop it again.
 *
 * Dev rather than preview because preview needs a build first, and a build is
 * far slower than the thirty seconds this whole job takes.
 */
async function startServer(port: number): Promise<ChildProcess> {
	const child = spawn('npx', ['vite', 'dev', '--port', String(port), '--strictPort'], {
		cwd: ROOT,
		stdio: ['ignore', 'ignore', 'pipe']
	});

	// Kept so a failure can say what Vite said, rather than "exited".
	let stderr = '';
	child.stderr?.on('data', (chunk) => (stderr += String(chunk)));

	const deadline = Date.now() + 90_000;
	while (Date.now() < deadline) {
		if (child.exitCode !== null) {
			throw new Error(`the dev server exited while starting:\n${stderr.trim() || '(no output)'}`);
		}
		if (await reachable(`http://localhost:${port}`)) return child;
		await new Promise((r) => setTimeout(r, 500));
	}

	child.kill();
	throw new Error(`the dev server did not come up on port ${port} within 90s`);
}

/* ── Which guides need doing ─────────────────────────────────────────────── */

/**
 * Guides whose downloads are stale given a set of changed paths.
 *
 * A guide's own file or one of its lessons affects only that guide. Everything
 * else that ends up inside a PDF — quizzes, glossary terms, the print routes,
 * the cost model — is shared, so a change there invalidates every guide.
 */
export function guidesToRebuild(changed: string[], all: string[]): string[] {
	const SHARED = [
		'src/routes/(print)/',
		'src/content/learning/quizzes/',
		'src/content/learning/terms/',
		'src/lib/learning/cost.ts',
		'src/lib/learning/questions.ts',
		'scripts/worksheet.ts',
		'scripts/build-downloads.ts'
	];

	if (changed.some((path) => SHARED.some((prefix) => path.startsWith(prefix)))) return all;

	const stale = new Set<string>();
	for (const slug of all) {
		const own = `src/content/learning/guides/${slug}.md`;
		const lessons = `src/content/learning/lessons/${slug}/`;
		if (changed.some((path) => path === own || path.startsWith(lessons))) stale.add(slug);
	}
	return all.filter((slug) => stale.has(slug));
}

function stagedFiles(): string[] {
	return execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
		cwd: ROOT,
		encoding: 'utf8'
	})
		.split('\n')
		.filter(Boolean);
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

async function main() {
	const args = process.argv.slice(2);
	const staged = args.includes('--staged');
	const wanted = args.filter((a) => !a.startsWith('--'));

	const published = await publishedGuides();
	let guides = published.filter((g) => wanted.length === 0 || wanted.includes(g.slug));

	if (staged) {
		const stale = guidesToRebuild(
			stagedFiles(),
			published.map((g) => g.slug)
		);
		guides = guides.filter((g) => stale.includes(g.slug));
		if (guides.length === 0) {
			console.log('No staged change affects a guide download.');
			return;
		}
	}

	if (guides.length === 0) {
		console.error(
			wanted.length ? `No published guide matching ${wanted.join(', ')}` : 'No guides.'
		);
		process.exit(1);
	}

	let base = BASE;
	let server: ChildProcess | null = null;
	if (!(await reachable(base))) {
		const port = await freePort();
		console.log(`No server at ${base} — starting one on ${port}.`);
		server = await startServer(port);
		base = `http://localhost:${port}`;
	}

	const generatedAt = new Date();
	const browser = await chromium.launch();
	const page = await browser.newPage();
	const manifest: Record<string, { generatedAt: string; entries: Entry[] }> = {};

	for (const guide of guides) {
		console.log(`\n${guide.title}`);
		const entries: Entry[] = [];
		const dir = join(OUT, guide.slug);

		const full = `${guide.slug}-guide.pdf`;
		const fullResult = await renderPdf(
			page,
			`${base}/print/${guide.slug}`,
			join(dir, full),
			guide.title,
			{ cover: true }
		);
		entries.push({
			kind: 'pdf',
			label: 'The whole guide as one PDF',
			detail: `PDF · ${fullResult.pages} pages · printable`,
			file: `/downloads/${guide.slug}/${full}`,
			...fullResult
		});
		console.log(`  ${full} — ${fullResult.pages} pages, ${Math.round(fullResult.bytes / 1024)} kB`);

		const questions = `${guide.slug}-visit-questions.pdf`;
		const questionsUrl = `${base}/print/${guide.slug}/questions`;
		const head = await fetch(questionsUrl);
		if (head.ok) {
			const count = (await head.text()).match(/(\d+) questions, drawn/)?.[1];
			const result = await renderPdf(page, questionsUrl, join(dir, questions), guide.title, {
				cover: false
			});
			entries.push({
				kind: 'pdf',
				label: 'Questions to ask on a visit',
				detail: `PDF · ${result.pages} ${result.pages === 1 ? 'page' : 'pages'}${count ? ` · ${count} questions` : ''}`,
				file: `/downloads/${guide.slug}/${questions}`,
				...result
			});
			console.log(`  ${questions} — ${result.pages} pages, ${count ?? '?'} questions`);
		} else {
			console.log('  no visit questions in this guide — skipped');
		}

		if (await usesEstimator(guide.slug)) {
			const sheet = `${guide.slug}-cost-model.xlsx`;
			const workbook = buildWorkbook(guide.title, generatedAt);
			await mkdir(dir, { recursive: true });
			await workbook.xlsx.writeFile(join(dir, sheet));
			const { size } = await stat(join(dir, sheet));
			entries.push({
				kind: 'xlsx',
				label: 'Cost model worksheet',
				detail: 'XLSX · entry / monthly / exit',
				file: `/downloads/${guide.slug}/${sheet}`,
				bytes: size
			});
			console.log(`  ${sheet} — ${Math.round(size / 1024)} kB`);
		} else {
			console.log('  no cost estimator in this guide — no worksheet');
		}

		manifest[guide.slug] = { generatedAt: generatedAt.toISOString(), entries };
	}

	await browser.close();
	server?.kill();
	await mkdir(OUT, { recursive: true });
	await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, '\t') + '\n');
	console.log(`\nWrote ${Object.keys(manifest).length} guide(s) to static/downloads.`);
}

// Guarded so a spec can import `guidesToRebuild` without generating anything —
// the same pattern `scripts/build-icons.mjs` uses.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
