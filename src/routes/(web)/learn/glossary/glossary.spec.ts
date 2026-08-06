/**
 * Route-level guarantees for the glossary.
 *
 * Drafts have to be invisible in four places — route, listing, sitemap and
 * search — and it is the route and listing that are easiest to get wrong when
 * someone later adds a feature. These lock that behaviour down.
 */
import { describe, expect, it } from 'vitest';
import { load as loadIndex } from './+page.server';
import { load as loadTerm, entries } from './[slug]/+page.server';
import { terms } from '$lib/learning';
import { isIndexable } from '$lib/learning/validate';

/** Whatever is currently unpublished — named slugs would make these tests fail
 *  the day someone finishes the draft they happened to reference. */
const drafts = terms.filter((t) => t.frontmatter.status !== 'published');

// The load functions only touch `params`; the rest of the event is unused.
const call = <T>(fn: unknown, params: Record<string, string> = {}) =>
	(fn as (e: { params: Record<string, string> }) => T)({ params });

describe('glossary index', () => {
	it('lists only published, substantial terms', async () => {
		const data = await call<Promise<{ terms: { slug: string }[] }>>(loadIndex);
		const slugs = new Set(data.terms.map((t) => t.slug));

		// The rule, not a sample: everything listed passes the gate, and
		// everything that fails it is absent.
		const wrong = terms.filter((t) => slugs.has(t.frontmatter.slug) !== isIndexable(t));
		expect(wrong.map((t) => t.frontmatter.slug)).toEqual([]);
		expect(slugs.size).toBeGreaterThan(0);
	});

	it('stays out of the index while the glossary is still thin', async () => {
		// A glossary of a couple of entries is exactly the thin page we
		// noindexed tag archives to avoid.
		const data = await call<Promise<{ terms: unknown[]; indexable: boolean }>>(loadIndex);
		expect(data.indexable).toBe(data.terms.length >= 5);
	});

	it('returns terms alphabetically, which the A–Z grouping relies on', async () => {
		// Grouping moved to the page so it can react to the search and topic
		// filters; the load's contract is now just that the order is right.
		const data = await call<Promise<{ terms: { term: string }[] }>>(loadIndex);
		const names = data.terms.map((t) => t.term);
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
		expect(names.length).toBeGreaterThan(0);
	});

	it('offers a topic filter for every topic present, and no others', async () => {
		const data =
			await call<Promise<{ terms: { topic: string }[]; topics: { slug: string }[] }>>(loadIndex);
		expect(data.topics.map((t) => t.slug).sort()).toEqual(
			[...new Set(data.terms.map((t) => t.topic))].sort()
		);
	});

	it('ranks most-linked terms by citations, highest first', async () => {
		const data = await call<Promise<{ mostCited: { count: number }[] }>>(loadIndex);
		const counts = data.mostCited.map((t) => t.count);
		expect(counts).toEqual([...counts].sort((a, b) => b - a));
		expect(counts.every((c) => c > 0)).toBe(true);
	});
});

describe('term page', () => {
	it('serves a published term', async () => {
		const data = await call<Promise<{ term: { slug: string }; indexable: boolean }>>(loadTerm, {
			slug: 'consent'
		});
		expect(data.term.slug).toBe('consent');
		expect(data.indexable).toBe(true);
	});

	it.runIf(drafts.length > 0)('404s a draft rather than exposing unpublished work', async () => {
		for (const draft of drafts) {
			await expect(async () =>
				call<Promise<unknown>>(loadTerm, { slug: draft.frontmatter.slug })
			).rejects.toThrow();
		}
	});

	it('404s an unknown slug', async () => {
		await expect(async () =>
			call<Promise<unknown>>(loadTerm, { slug: 'not-a-term' })
		).rejects.toThrow();
	});

	it('never links a related term that is unpublished', async () => {
		const draftSlugs = new Set(drafts.map((t) => t.frontmatter.slug));
		const leaked: string[] = [];

		for (const term of terms.filter((t) => t.frontmatter.status === 'published')) {
			const data = await call<Promise<{ related: { slug: string }[] }>>(loadTerm, {
				slug: term.frontmatter.slug
			});
			leaked.push(...data.related.map((r) => r.slug).filter((s) => draftSlugs.has(s)));
		}
		expect(leaked).toEqual([]);
	});

	it('never links a topic page that does not exist yet', async () => {
		const data = await call<Promise<{ topicPublished: boolean; topicTitle: string }>>(loadTerm, {
			slug: 'consent'
		});
		expect(data.topicPublished).toBe(false);
		expect(data.topicTitle).toBe('Community Governance'); // still named, just not linked
	});

	it('prerenders one entry per published term, and no drafts', () => {
		const slugs = new Set((entries as () => { slug: string }[])().map((e) => e.slug));
		const wrong = terms.filter(
			(t) => slugs.has(t.frontmatter.slug) !== (t.frontmatter.status === 'published')
		);
		expect(wrong.map((t) => t.frontmatter.slug)).toEqual([]);
		expect(slugs.size).toBeGreaterThan(0);
	});
});
