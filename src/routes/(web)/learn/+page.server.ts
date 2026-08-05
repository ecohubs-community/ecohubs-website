import type { PageServerLoad } from './$types';
import { isIndexable, publishedComparisons, publishedTerms } from '$lib/learning';

export const prerender = true;

/**
 * The hub shell. Deliberately minimal for now: it lists only the sections that
 * actually have published content, so the hub is never a menu of dead ends.
 * Guides, topics, paths and search appear here as they land.
 */
export const load: PageServerLoad = async () => {
	const glossaryCount = publishedTerms.filter(isIndexable).length;

	const comparisons = publishedComparisons
		.filter(isIndexable)
		.map((c) => ({
			slug: c.frontmatter.slug,
			title: c.frontmatter.title,
			summary: c.frontmatter.summary
		}))
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		glossaryCount,
		comparisons,
		// Nothing published yet means nothing worth offering to a search engine.
		indexable: glossaryCount + comparisons.length > 0
	};
};
