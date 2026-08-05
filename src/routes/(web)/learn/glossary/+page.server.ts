import type { PageServerLoad } from './$types';
import { isIndexable, publishedTerms, topicBySlug } from '$lib/learning';

export const prerender = true;

export const load: PageServerLoad = async () => {
	// Only published terms reach a reader; `isIndexable` additionally decides
	// whether the *index page* may be indexed, since a glossary of two stubs is
	// exactly the thin page we noindexed tag archives to avoid.
	const entries = publishedTerms
		.map((entry) => ({
			...entry.frontmatter,
			topicTitle: topicBySlug.get(entry.frontmatter.topic)?.frontmatter.title ?? entry.frontmatter.topic,
			indexable: isIndexable(entry)
		}))
		.filter((t) => t.indexable)
		.sort((a, b) => a.term.localeCompare(b.term));

	// Grouped by first letter for the A–Z rail.
	const groups = new Map<string, typeof entries>();
	for (const term of entries) {
		const letter = term.term[0]?.toUpperCase() ?? '#';
		if (!groups.has(letter)) groups.set(letter, []);
		groups.get(letter)!.push(term);
	}

	return {
		terms: entries,
		groups: [...groups.entries()].map(([letter, items]) => ({ letter, items })),
		// An empty or near-empty glossary should not be offered to search engines.
		indexable: entries.length >= 5
	};
};
