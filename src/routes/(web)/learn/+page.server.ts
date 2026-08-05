import type { PageServerLoad } from './$types';
import { isIndexable, publishedTerms } from '$lib/learning';

export const prerender = true;

/**
 * The hub shell. Deliberately minimal for now: it lists only the sections that
 * actually have published content, so the hub is never a menu of dead ends.
 * Guides, topics, paths, comparisons and search appear here as they land.
 */
export const load: PageServerLoad = async () => {
	const glossaryCount = publishedTerms.filter(isIndexable).length;

	return {
		glossaryCount,
		// Nothing published yet means nothing worth offering to a search engine.
		indexable: glossaryCount > 0
	};
};
