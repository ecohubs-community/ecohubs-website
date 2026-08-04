/**
 * Renders the VoteCast wireframes in `wireframes.html` to the three PNGs used by
 * the `/votecast` page's "What it actually looks like" section.
 *
 *   node design_files/votecast-wireframes/render.mjs
 *
 * Writes 1600×1000 PNGs to `static/votecast/`. Edit `wireframes.html` — plain
 * HTML/CSS, one `.frame` per image — and re-run.
 *
 * Rendered through a real browser rather than ImageMagick: IM's built-in SVG
 * renderer on macOS has no font list and drops paths and unfilled circles, so
 * the output was unusable. Chromium gets the site's own self-hosted @fontsource
 * faces (Fraunces, Inter, JetBrains Mono) via the file:// URLs the HTML builds.
 *
 * Requires Playwright's Chromium (`npx playwright install chromium`) — or set
 * CHROME_PATH to any Chrome/Chromium binary.
 */

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../..');
const OUT = resolve(REPO, 'static/votecast');
const FRAMES = ['screen-proposal', 'screen-result', 'screen-community'];

/** Playwright pins one Chromium build; fall back to whatever is in its cache. */
function findChromium() {
	if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
	const cache = resolve(homedir(), 'Library/Caches/ms-playwright');
	let builds = [];
	try {
		builds = readdirSync(cache).filter((d) => d.startsWith('chromium-'));
	} catch {
		return undefined; // no cache — let Playwright resolve its own default
	}
	builds.sort();
	for (const build of builds.reverse()) {
		for (const arch of ['chrome-mac-arm64', 'chrome-mac']) {
			for (const app of ['Google Chrome for Testing', 'Chromium']) {
				const bin = resolve(cache, build, arch, `${app}.app/Contents/MacOS/${app}`);
				try {
					readFileSync(bin, { flag: 'r' });
					return bin;
				} catch {
					/* keep looking */
				}
			}
		}
	}
	return undefined;
}

// The @font-face rules carry a `REPO/` placeholder so the checked-in file has no
// machine-specific paths in it.
const html = readFileSync(`${HERE}/wireframes.html`, 'utf8').replaceAll('REPO/', `file://${REPO}/`);
const tmp = `${HERE}/.wireframes.resolved.html`;
writeFileSync(tmp, html);

mkdirSync(OUT, { recursive: true });

const executablePath = findChromium();
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(`file://${tmp}`);
await page.waitForFunction(() => document.fonts.status === 'loaded');

for (const id of FRAMES) {
	await page.locator(`#${id}`).screenshot({ path: `${OUT}/${id}.png` });
	console.log(`wrote static/votecast/${id}.png`);
}

await browser.close();
