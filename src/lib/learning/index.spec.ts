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
	terms,
	termUsage,
	topicBySlug,
	urlFor,
	validationIssues
} from './index';
import { isIndexable } from './validate';

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

	it('counts prose written inside component props, such as a Compare table', () => {
		// Stripping tags naively would score a comparison page near zero, since
		// its table lives in `<Compare rows={…} />` — and there the table is the
		// content. Undercounting would keep a substantial page out of the index.
		const compare = [...allEntries].find((e) => e.frontmatter.slug === 'cohousing-vs-ecovillage');
		expect(compare).toBeDefined();
		expect(compare!.words).toBeGreaterThan(800);
	});

	it('does not count URLs as prose', () => {
		// `Sources` carries links; those must not inflate the count towards the
		// indexability threshold.
		const compare = [...allEntries].find((e) => e.frontmatter.slug === 'cohousing-vs-ecovillage');
		expect(compare!.words).toBeLessThan(1200);
	});
});

describe('derived views', () => {
	/**
	 * Asserts the ordering rule rather than today's lesson count — the previous
	 * version hard-coded `[1, 2]` and broke the moment a lesson was written,
	 * which is the opposite of what a test about ordering should do.
	 */
	it('orders lessons within a guide', () => {
		expect(guideBySlug.get('intentional-communities')).toBeDefined();
		const orders = lessonsOfGuide('intentional-communities').map((l) => l.frontmatter.order);

		expect(orders.length).toBeGreaterThan(1);
		expect(orders).toEqual([...orders].sort((a, b) => a - b));
		expect(new Set(orders).size, 'duplicate order values').toBe(orders.length);
	});

	it('links neighbours within a guide', () => {
		const ordered = lessonsOfGuide('intentional-communities');

		const first = guideNeighbours('intentional-communities', ordered[0].frontmatter.slug);
		expect(first.previous).toBeNull();
		expect(first.next?.frontmatter.slug).toBe(ordered[1].frontmatter.slug);

		const last = guideNeighbours('intentional-communities', ordered.at(-1)!.frontmatter.slug);
		expect(last.previous?.frontmatter.slug).toBe(ordered.at(-2)!.frontmatter.slug);
		expect(last.next).toBeNull();
	});

	it('skips drafts when linking neighbours, so a reader never hits a gap', () => {
		// Only published lessons are offered as prev/next.
		const ordered = lessonsOfGuide('intentional-communities');
		for (const lesson of ordered) {
			const { previous, next } = guideNeighbours(
				'intentional-communities',
				lesson.frontmatter.slug
			);
			for (const neighbour of [previous, next]) {
				if (neighbour) expect(neighbour.frontmatter.status).toBe('published');
			}
		}
	});

	it('extracts a table of contents whose ids match the rendered headings', () => {
		// Both come from headings.js, so a contents link can never point at an
		// anchor that does not exist.
		const topic = [...allEntries].find(
			(e) => e.frontmatter.slug === 'intentional-communities' && e.frontmatter.type === 'topic'
		);
		expect(topic!.headings.length).toBeGreaterThan(2);
		for (const heading of topic!.headings) {
			expect(heading.id).toMatch(/^[a-z0-9-]+$/);
			expect(heading.text.length).toBeGreaterThan(0);
		}
	});

	it('builds a term definition map usable by tooltips', () => {
		const consent = termDefinitions.get('consent');
		expect(consent?.short).toContain('paramount objection');
		expect(consent?.published).toBe(true);
	});

	it('includes drafts in the definition map, so a tooltip still works', () => {
		// A lesson may reference a term whose page is unfinished; showing the
		// definition beats showing nothing. `published` decides the link.
		//
		// Asserted as a rule over every term rather than against one named slug:
		// publishing a draft should not break a test about drafts.
		const wrong = terms.filter((t) => {
			const entry = termDefinitions.get(t.frontmatter.slug);
			return !entry?.short || entry.published !== (t.frontmatter.status === 'published');
		});
		expect(wrong.map((t) => t.frontmatter.slug)).toEqual([]);
		expect(terms.length).toBeGreaterThan(0);
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

	/**
	 * Stated as an equivalence rather than "no drafts appear": with everything
	 * published that loop had nothing to iterate and the test passed while
	 * checking nothing. This version stays meaningful whatever the content is.
	 */
	it('lists exactly the indexable entries — no drafts, no stubs', () => {
		const urls = new Set(sitemapEntries().map((e) => e.url));
		const wrong = allEntries.filter((e) => urls.has(urlFor(e)) !== isIndexable(e));
		expect(wrong.map((e) => e.path)).toEqual([]);
		expect(urls.size).toBeGreaterThan(0);
	});

	it('carries a lastmod for every entry, since that is the field Google reads', () => {
		for (const entry of sitemapEntries()) {
			expect(entry.lastmod, entry.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		}
	});
});
