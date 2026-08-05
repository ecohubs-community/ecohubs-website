/**
 * Exercises the real index against the real content files, so the glob,
 * frontmatter parsing and derived views are proven end to end — not just the
 * pure validation logic.
 */
import { describe, expect, it } from 'vitest';
import {
	allEntries,
	guideBySlug,
	guideNeighbours,
	lessonsOfGuide,
	readingMinutes,
	sitemapEntries,
	termDefinitions,
	termUsage,
	topicBySlug,
	urlFor,
	validationIssues
} from './index';

describe('content index', () => {
	it('loads content files and parses their frontmatter', () => {
		expect(allEntries.length).toBeGreaterThan(0);
		for (const entry of allEntries) {
			expect(entry.frontmatter.slug, `${entry.path} has no slug`).toBeTruthy();
			expect(entry.frontmatter.type, `${entry.path} has no type`).toBeTruthy();
		}
	});

	it('finds no validation issues in the committed content', () => {
		// The build throws on these; this reports them readably instead.
		expect(validationIssues).toEqual([]);
	});

	it('counts words from the body, excluding frontmatter', () => {
		const term = [...allEntries].find((e) => e.frontmatter.type === 'term');
		expect(term).toBeDefined();
		expect(term!.words).toBeGreaterThan(0);
		expect(readingMinutes(term!)).toBeGreaterThanOrEqual(1);
	});
});

describe('derived views', () => {
	it('orders lessons within a guide, and links neighbours', () => {
		const guide = guideBySlug.get('intentional-communities');
		expect(guide).toBeDefined();

		// Fixture lessons are drafts, so ask for them explicitly.
		const ordered = lessonsOfGuide('intentional-communities', true);
		expect(ordered.map((l) => l.frontmatter.order)).toEqual([1, 2]);

		const { previous, next } = guideNeighbours('intentional-communities', ordered[0].frontmatter.slug);
		expect(previous).toBeNull();
		// Neighbours skip drafts, so with draft-only fixtures there is no next.
		expect(next).toBeNull();
	});

	it('builds a term definition map usable by tooltips', () => {
		const consent = termDefinitions.get('consent');
		expect(consent?.short).toContain('paramount objection');
		expect(consent?.published).toBe(false); // fixtures ship as drafts
	});

	it('builds reverse usage only from published content', () => {
		// Every fixture is a draft, so nothing counts as "used" yet.
		expect(termUsage.size).toBe(0);
	});
});

describe('urls', () => {
	it('nests a lesson under its guide', () => {
		const lesson = [...allEntries].find((e) => e.frontmatter.type === 'lesson');
		expect(urlFor(lesson!)).toMatch(/^\/learn\/guides\/[^/]+\/[^/]+$/);
	});

	it('places a term under the glossary', () => {
		const topic = topicBySlug.get('intentional-communities');
		expect(urlFor(topic!)).toBe('/learn/topics/intentional-communities');
	});

	it('never emits a trailing slash, matching the site canonical', () => {
		for (const entry of allEntries) {
			expect(urlFor(entry).endsWith('/'), `${entry.path}`).toBe(false);
		}
	});
});

describe('sitemap', () => {
	it('excludes drafts entirely', () => {
		// All fixtures are drafts; nothing should be offered to the sitemap.
		expect(sitemapEntries()).toEqual([]);
	});
});
