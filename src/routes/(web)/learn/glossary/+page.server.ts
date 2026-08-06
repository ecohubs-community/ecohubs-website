import type { PageServerLoad } from './$types';
import { allEntries, isIndexable, publishedTerms, topicBySlug } from '$lib/learning';

export const prerender = true;

export const load: PageServerLoad = async () => {
	// Only published terms reach a reader; `isIndexable` additionally decides
	// whether the *index page* may be indexed, since a glossary of two stubs is
	// exactly the thin page we noindexed tag archives to avoid.
	const entries = publishedTerms
		.map((entry) => ({
			...entry.frontmatter,
			topicTitle:
				topicBySlug.get(entry.frontmatter.topic)?.frontmatter.title ?? entry.frontmatter.topic,
			indexable: isIndexable(entry)
		}))
		.filter((t) => t.indexable)
		.sort((a, b) => a.term.localeCompare(b.term));

	// The topics represented, for the filter chips. Derived from the terms
	// themselves, so a chip can never filter to nothing.
	const topics = [...new Map(entries.map((t) => [t.topic, t.topicTitle])).entries()]
		.map(([slug, title]) => ({ slug, title }))
		.sort((a, b) => a.title.localeCompare(b.title));

	// How often the rest of the hub cites each term. Used to order the rail's
	// short list — the honest version of "most looked up", which would need
	// analytics we deliberately do not have.
	const citations = new Map<string, number>();
	for (const entry of allEntries) {
		if (entry.frontmatter.status !== 'published') continue;
		for (const slug of (entry.frontmatter as { terms?: string[] }).terms ?? []) {
			citations.set(slug, (citations.get(slug) ?? 0) + 1);
		}
	}
	const mostCited = entries
		.map((t) => ({ slug: t.slug, term: t.term, count: citations.get(t.slug) ?? 0 }))
		.filter((t) => t.count > 0)
		.sort((a, b) => b.count - a.count || a.term.localeCompare(b.term))
		.slice(0, 5);

	return {
		// Everything ships; the filters only ever reduce what is shown, so a
		// crawler and a reader without JavaScript still get the whole glossary.
		terms: entries,
		topics,
		mostCited,
		// An empty or near-empty glossary should not be offered to search engines.
		indexable: entries.length >= 5
	};
};
