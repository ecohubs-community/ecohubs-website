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

// The load functions only touch `params`; the rest of the event is unused.
const call = <T>(fn: unknown, params: Record<string, string> = {}) =>
	(fn as (e: { params: Record<string, string> }) => T)({ params });

describe('glossary index', () => {
	it('lists only published, substantial terms', async () => {
		const data = await call<Promise<{ terms: { slug: string }[] }>>(loadIndex);
		const slugs = data.terms.map((t) => t.slug);

		expect(slugs).toContain('consent'); // published and complete
		expect(slugs).not.toContain('sociocracy'); // draft
		expect(slugs).not.toContain('cohousing'); // draft
	});

	it('stays out of the index while the glossary is still thin', async () => {
		// A glossary of a couple of entries is exactly the thin page we
		// noindexed tag archives to avoid.
		const data = await call<Promise<{ terms: unknown[]; indexable: boolean }>>(loadIndex);
		expect(data.indexable).toBe(data.terms.length >= 5);
	});

	it('groups terms alphabetically for the A–Z rail', async () => {
		const data = await call<Promise<{ groups: { letter: string }[] }>>(loadIndex);
		const letters = data.groups.map((g) => g.letter);
		expect(letters).toEqual([...letters].sort());
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

	it('404s a draft rather than exposing unpublished work', async () => {
		await expect(async () =>
			call<Promise<unknown>>(loadTerm, { slug: 'sociocracy' })
		).rejects.toThrow();
	});

	it('404s an unknown slug', async () => {
		await expect(async () =>
			call<Promise<unknown>>(loadTerm, { slug: 'not-a-term' })
		).rejects.toThrow();
	});

	it('never links a related term that is unpublished', async () => {
		// `consent` relates to consensus and sociocracy, both drafts.
		const data = await call<Promise<{ related: unknown[] }>>(loadTerm, { slug: 'consent' });
		expect(data.related).toEqual([]);
	});

	it('never links a topic page that does not exist yet', async () => {
		const data = await call<Promise<{ topicPublished: boolean; topicTitle: string }>>(loadTerm, {
			slug: 'consent'
		});
		expect(data.topicPublished).toBe(false);
		expect(data.topicTitle).toBe('Community Governance'); // still named, just not linked
	});

	it('prerenders one entry per published term, and no drafts', () => {
		const slugs = (entries as () => { slug: string }[])().map((e) => e.slug);
		expect(slugs).toContain('consent');
		expect(slugs).not.toContain('sociocracy');
	});
});
