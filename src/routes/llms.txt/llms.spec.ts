import { describe, expect, it } from 'vitest';
import { GET } from './+server';
import {
	isIndexable,
	publishedComparisons,
	publishedGuides,
	publishedLessons,
	publishedPaths,
	publishedTerms,
	publishedTopics,
	urlFor
} from '$lib/learning';

const body = await (GET() as Response).text();

/**
 * The point of generating this file is that it cannot fall behind the content.
 * These assert that property rather than any particular wording, so writing a
 * new lesson does not break the test — but forgetting to list one does.
 */
describe('llms.txt', () => {
	it('lists every indexable learning page', () => {
		const all = [
			...publishedGuides,
			...publishedLessons,
			...publishedTopics,
			...publishedComparisons,
			...publishedPaths,
			...publishedTerms
		].filter(isIndexable);

		expect(all.length).toBeGreaterThan(50);
		for (const entry of all) {
			expect(body, `${urlFor(entry)} is missing`).toContain(`${urlFor(entry)})`);
		}
	});

	it('keeps the hand-written sections that are not generated', () => {
		for (const heading of [
			'## Core pages',
			'## Tools',
			'## Learning',
			'## Writing',
			'## Optional'
		]) {
			expect(body).toContain(heading);
		}
		expect(body).toContain('/blog/the-exit-clause-designing-a-community-youre-allowed-to-leave');
		expect(body).toContain('/privacy');
	});

	it('gives every entry a link and a sentence', () => {
		const entries = body.split('\n').filter((l) => l.startsWith('- ['));
		expect(entries.length).toBeGreaterThan(60);

		for (const entry of entries) {
			// `- [Title](url)` optionally followed by `: sentence`. The Optional
			// section is deliberately bare links, so the sentence is not required
			// there — but the link always is.
			expect(entry, entry).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)]+\)(: .+)?$/);
		}
	});

	it('describes pages in their own words, so a description cannot drift', () => {
		const lesson = publishedLessons.find((l) => l.frontmatter.slug === 'what-joining-costs');
		expect(lesson).toBeDefined();
		expect(body).toContain(lesson!.frontmatter.summary);
	});

	it('serves as plain text', () => {
		const response = GET() as Response;
		expect(response.headers.get('Content-Type')).toMatch(/^text\/plain/);
	});
});
