import { describe, expect, it } from 'vitest';
import { GET } from './+server';
import { LEARN_SECTIONS } from '$lib/learning/sections';
import { isIndexable, publishedContent, urlFor } from '$lib/learning';

const body = await (GET() as Response).text();
const lines = body.split('\n');

/** Every `- [...]` entry, tagged with the `##` section it sits under. */
const entries = (() => {
	let section = '';
	const found: { section: string; line: string }[] = [];
	for (const line of lines) {
		if (line.startsWith('## ')) section = line.slice(3).trim();
		else if (line.startsWith('- [')) found.push({ section, line });
	}
	return found;
})();

/**
 * The point of generating this file is that it cannot fall behind the content.
 * These assert that property rather than any particular wording, so writing a
 * new lesson does not break the test — but forgetting to list one does.
 */
describe('llms.txt', () => {
	const indexable = publishedContent.filter(isIndexable);

	it('lists every indexable page, of every type', () => {
		expect(indexable.length).toBeGreaterThan(50);
		for (const entry of indexable) {
			expect(body, `${urlFor(entry)} is missing`).toContain(`${urlFor(entry)})`);
		}
	});

	/**
	 * The check that would have caught `case` being left out: it has no files
	 * yet, so listing the collections by hand missed it silently.
	 */
	it('covers every content type that exists', () => {
		const types = new Set(indexable.map((e) => e.frontmatter.type));
		expect(types.size).toBeGreaterThan(3);
		for (const type of types) {
			const sample = indexable.find((e) => e.frontmatter.type === type)!;
			expect(body, `no ${type} is listed`).toContain(`${urlFor(sample)})`);
		}
	});

	it('lists every nav section, with a sentence', () => {
		for (const { href, label } of LEARN_SECTIONS) {
			const entry = entries.find((e) => e.line.includes(`](https://ecohubs.community${href})`));
			expect(entry, `${href} is not listed`).toBeDefined();
			expect(entry!.line, `${href} has no sentence`).toMatch(/\): .+/);
			expect(entry!.line).toContain(label);
		}
	});

	it('omits the pages that are permanently noindex', () => {
		expect(body).not.toContain('/learn/search)');
		expect(body).not.toContain('/learn/bookmarks)');
	});

	it('keeps the hand-written sections that are not generated', () => {
		for (const heading of ['Core pages', 'Tools', 'Learning', 'Writing', 'Optional']) {
			expect(lines).toContain(`## ${heading}`);
		}
		expect(body).toContain('/blog/the-exit-clause-designing-a-community-youre-allowed-to-leave');
		expect(body).toContain('/privacy');
	});

	/**
	 * Sentences are required everywhere except `## Optional`, which is
	 * deliberately bare links. Allowing them to be optional everywhere — as this
	 * first did — would have let a generated page lose its summary silently,
	 * which is the one thing the file is for.
	 */
	it('gives every entry outside Optional a link and a sentence', () => {
		expect(entries.length).toBeGreaterThan(60);

		for (const { section, line } of entries) {
			const shape =
				section === 'Optional'
					? /^- \[[^\]]+\]\(https?:\/\/[^)]+\)$/
					: /^- \[[^\]]+\]\(https?:\/\/[^)]+\): \S.*$/;
			expect(line, `${section}: ${line}`).toMatch(shape);
		}
	});

	it('describes pages in their own words, so a description cannot drift', () => {
		const lesson = indexable.find((e) => e.frontmatter.slug === 'what-joining-costs');
		expect(lesson).toBeDefined();
		expect(body).toContain(lesson!.frontmatter.summary);
	});

	it('prints no heading for a group with nothing in it', () => {
		const hasCases = indexable.some((e) => e.frontmatter.type === 'case');
		expect(body.includes('### Case studies')).toBe(hasCases);
	});

	it('serves as plain text', () => {
		const response = GET() as Response;
		expect(response.headers.get('Content-Type')).toMatch(/^text\/plain/);
	});
});
