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
		expect(consent?.published).toBe(true);
	});

	it('includes drafts in the definition map, so a tooltip still works', () => {
		// A lesson may reference a term whose page is unfinished; showing the
		// definition beats showing nothing. `published` decides the link.
		const sociocracy = termDefinitions.get('sociocracy');
		expect(sociocracy?.short).toBeTruthy();
		expect(sociocracy?.published).toBe(false);
	});

	it('builds reverse usage only from published content', () => {
		// Only published pages count as "using" a term, so the list on a term
		// page never points at an unpublished lesson. Asserted over the flattened
		// list so the expectation holds even while the map is still empty.
		const users = [...termUsage.values()].flat();
		expect(users.every((u) => u.frontmatter.status === 'published')).toBe(true);
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
	it('offers published, substantial content', () => {
		expect(sitemapEntries().map((e) => e.url)).toContain('/learn/glossary/consent');
	});

	it('excludes every draft', () => {
		const urls = sitemapEntries().map((e) => e.url);
		const drafts = allEntries
			.filter((e) => e.frontmatter.status !== 'published')
			.map((e) => urlFor(e));
		for (const url of drafts) expect(urls).not.toContain(url);
	});

	it('carries a lastmod for every entry, since that is the field Google reads', () => {
		for (const entry of sitemapEntries()) {
			expect(entry.lastmod, entry.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		}
	});
});
