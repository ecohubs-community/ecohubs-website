import type { PageServerLoad } from './$types';
import { contentOfTopic, isIndexable, publishedComparisons, publishedTerms, publishedTopics } from '$lib/learning';

export const prerender = true;

/**
 * The hub shell. Deliberately minimal for now: it lists only the sections that
 * actually have published content, so the hub is never a menu of dead ends.
 * Guides, topics, paths and search appear here as they land.
 */
export const load: PageServerLoad = async () => {
	const glossaryCount = publishedTerms.filter(isIndexable).length;

	// A topic only appears once it has something beneath it — the same rule the
	// topics index applies, so the two can never disagree.
	const topics = publishedTopics
		.filter(isIndexable)
		.map((t) => {
			const c = contentOfTopic(t.frontmatter.slug);
			return {
				slug: t.frontmatter.slug,
				title: t.frontmatter.title,
				summary: t.frontmatter.summary,
				total:
					c.guides.filter(isIndexable).length +
					c.comparisons.filter(isIndexable).length +
					c.terms.filter(isIndexable).length
			};
		})
		.filter((t) => t.total > 0)
		.sort((a, b) => a.title.localeCompare(b.title));

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
		topics,
		comparisons,
		// Nothing published yet means nothing worth offering to a search engine.
		indexable: glossaryCount + comparisons.length + topics.length > 0
	};
};
