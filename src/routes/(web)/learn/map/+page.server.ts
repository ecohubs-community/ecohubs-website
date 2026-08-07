import type { PageServerLoad } from './$types';
import { contentOfTopic, isIndexable, publishedTopics } from '$lib/learning';
import { CLUSTERS } from '$lib/learning/clusters';
import { layoutMap } from '$lib/learning/map';
import { rabbitPool } from '$lib/learning/discovery';

export const prerender = true;

export const load: PageServerLoad = async () => {
	// The same gate the topics index uses: a topic with nothing under it is a
	// dead end, and a dead end on a map is worse than an absence.
	const topics = publishedTopics
		.filter(isIndexable)
		.map((entry) => {
			const fm = entry.frontmatter;
			const content = contentOfTopic(fm.slug);
			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				cluster: fm.cluster,
				articles:
					content.guides.filter(isIndexable).length +
					content.comparisons.filter(isIndexable).length +
					content.terms.filter(isIndexable).length +
					content.cases.filter(isIndexable).length
			};
		})
		.filter((t) => t.articles > 0);

	// Coordinates are computed here, not in the browser: the page ships a
	// finished SVG that a crawler can read and that never reflows on load.
	//
	// Two of them, because the choice between a two-column map and a stacked
	// one is a question about render width, and a prerendered page cannot ask.
	// Both ship and CSS picks; the hidden one is `display:none`, so it is out
	// of the accessibility tree and out of the tab order rather than merely
	// invisible.
	const layout = layoutMap(topics);
	const narrowLayout = layoutMap(topics, { compact: true });

	const clusters = CLUSTERS.map((cluster) => {
		const items = topics.filter((t) => t.cluster === cluster.key);
		return {
			key: cluster.key,
			label: cluster.label,
			topics: items,
			articles: items.reduce((sum, t) => sum + t.articles, 0)
		};
	}).filter((c) => c.topics.length > 0);

	return {
		layout,
		narrowLayout,
		clusters,
		rabbit: rabbitPool(),
		// A map of one topic tells a reader nothing they did not already know.
		indexable: topics.length > 2
	};
};
