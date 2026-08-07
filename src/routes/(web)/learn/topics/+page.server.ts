import type { PageServerLoad } from './$types';
import { contentOfTopic, isIndexable, publishedTopics } from '$lib/learning';

export const prerender = true;

/**
 * The topics overview.
 *
 * Each card carries what is actually behind the topic, so a reader can see
 * before clicking whether there is anything there — and an empty topic is not
 * listed at all.
 */
export const load: PageServerLoad = async () => {
	const topics = publishedTopics
		.filter(isIndexable)
		.map((entry) => {
			const fm = entry.frontmatter;
			const content = contentOfTopic(fm.slug);
			const counts = {
				guides: content.guides.filter(isIndexable).length,
				comparisons: content.comparisons.filter(isIndexable).length,
				terms: content.terms.filter(isIndexable).length,
				cases: content.cases.filter(isIndexable).length
			};
			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				image: fm.image,
				imageAlt: fm.imageAlt,
				motif: fm.motif,
				rcosLayer: fm.rcosLayer,
				counts,
				total: counts.guides + counts.comparisons + counts.terms + counts.cases
			};
		})
		// A topic page with nothing under it is a dead end for the reader and a
		// thin page for a crawler.
		.filter((t) => t.total > 0)
		.sort((a, b) => a.title.localeCompare(b.title));

	return { topics, indexable: topics.length > 0 };
};
