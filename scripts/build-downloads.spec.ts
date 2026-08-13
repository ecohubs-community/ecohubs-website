import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFile } from 'node:fs/promises';
import { guidesToRebuild, readManifest } from './build-downloads';

vi.mock('node:fs/promises', async (importOriginal) => ({
	...(await importOriginal<typeof import('node:fs/promises')>()),
	readFile: vi.fn()
}));

const ALL = ['intentional-communities', 'community-governance'];

describe('guidesToRebuild', () => {
	it('leaves everything alone when nothing relevant changed', () => {
		expect(guidesToRebuild(['README.md', 'src/routes/(web)/+layout.svelte'], ALL)).toEqual([]);
	});

	it('rebuilds only the guide whose lesson changed', () => {
		const changed = ['src/content/learning/lessons/intentional-communities/what-joining-costs.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual(['intentional-communities']);
	});

	it('rebuilds a guide when its own file changed', () => {
		expect(guidesToRebuild(['src/content/learning/guides/community-governance.md'], ALL)).toEqual([
			'community-governance'
		]);
	});

	/**
	 * Quizzes, glossary terms and the print machinery all end up inside every
	 * PDF, so there is no way to attribute a change in them to one guide.
	 */
	it.each([
		'src/content/learning/quizzes/what-would-you-own.ts',
		'src/content/learning/terms/consent.md',
		'src/routes/(print)/print.css',
		'src/lib/learning/cost.ts',
		'src/lib/learning/questions.ts',
		'scripts/worksheet.ts'
	])('rebuilds everything when %s changed', (path) => {
		expect(guidesToRebuild([path], ALL)).toEqual(ALL);
	});

	/**
	 * A failure page prints in the appendix of whichever guide owns its lesson,
	 * and its path does not say which guide that is — the link runs through
	 * `lesson:` in frontmatter. So it is shared, and editing one must not leave
	 * a stale appendix in a guide this function decided to skip.
	 */
	it('rebuilds everything when a failure page changed', () => {
		const changed = ['src/content/learning/failures/founder-informal-veto.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual(ALL);
	});

	it('does not mistake a similarly named directory for a guide', () => {
		// `intentional-communities-old/` must not match `intentional-communities`.
		const changed = ['src/content/learning/lessons/intentional-communities-old/a.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual([]);
	});

	it('keeps the given order and does not repeat a guide', () => {
		const changed = [
			'src/content/learning/guides/intentional-communities.md',
			'src/content/learning/lessons/intentional-communities/what-joining-costs.md',
			'src/content/learning/guides/community-governance.md'
		];
		expect(guidesToRebuild(changed, ALL)).toEqual(ALL);
	});

	it('ignores a guide that is not published, because it is not in the list', () => {
		const changed = ['src/content/learning/lessons/starting-an-ecovillage/one.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual([]);
	});
});

/**
 * The manifest is merged rather than replaced, because most runs rebuild only
 * the guides whose sources changed. That makes an empty return value dangerous
 * in a specific way: the run then writes keys for the guides it did rebuild,
 * and every other guide's downloads section disappears from the site while its
 * files sit untouched on disk.
 *
 * So only a missing file may be treated as empty. These pin the difference.
 */
describe('readManifest', () => {
	beforeEach(() => {
		vi.mocked(readFile).mockReset();
	});

	it('starts empty when the manifest does not exist yet', async () => {
		const enoent = Object.assign(new Error('no such file'), { code: 'ENOENT' });
		vi.mocked(readFile).mockRejectedValue(enoent);
		await expect(readManifest()).resolves.toEqual({});
	});

	it('returns what is on disk so a partial rebuild merges', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify({ 'a-guide': { generatedAt: '2026-08-12', entries: [] } })
		);
		await expect(readManifest()).resolves.toHaveProperty('a-guide');
	});

	it('refuses to start empty when the manifest is unreadable', async () => {
		const denied = Object.assign(new Error('permission denied'), { code: 'EACCES' });
		vi.mocked(readFile).mockRejectedValue(denied);
		await expect(readManifest()).rejects.toThrow('permission denied');
	});

	it('refuses to start empty when the manifest is not valid JSON', async () => {
		vi.mocked(readFile).mockResolvedValue('{ this is not json');
		await expect(readManifest()).rejects.toThrow();
	});

	it('refuses a JSON value that is not an object of guides', async () => {
		// `[]` parses, and would then merge into nothing and silently drop
		// every guide — the exact failure this guard exists to prevent.
		vi.mocked(readFile).mockResolvedValue('[]');
		await expect(readManifest()).rejects.toThrow('not a JSON object');
	});
});
