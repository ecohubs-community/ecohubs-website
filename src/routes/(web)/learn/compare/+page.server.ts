import type { PageServerLoad } from './$types';
import { isIndexable, publishedComparisons, readingMinutes, topicBySlug } from '$lib/learning';

export const prerender = true;

/**
 * The comparison index.
 *
 * These pages answer "X vs Y" queries, which is a browsing intent as much as a
 * searching one — someone who wants one comparison usually wants the next.
 * Until this existed they were reachable only from whichever topic happened to
 * list them.
 */
export const load: PageServerLoad = async () => {
	const comparisons = publishedComparisons
		.filter(isIndexable)
		.map((entry) => {
			const fm = entry.frontmatter;
			const topic = topicBySlug.get(fm.topic);
			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				topic: fm.topic,
				topicTitle: topic?.frontmatter.title ?? fm.topic,
				minutes: readingMinutes(entry)
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));

	// Grouped by topic, so the page stays readable as the set grows. Derived
	// from the comparisons themselves, so a heading can never be empty.
	const byTopic = new Map<string, typeof comparisons>();
	for (const item of comparisons) {
		if (!byTopic.has(item.topic)) byTopic.set(item.topic, []);
		byTopic.get(item.topic)!.push(item);
	}
	const groups = [...byTopic.entries()]
		.map(([slug, items]) => ({
			slug,
			title: items[0].topicTitle,
			published: topicBySlug.get(slug)?.frontmatter.status === 'published',
			items
		}))
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		comparisons,
		groups,
		minutes: comparisons.reduce((sum, c) => sum + c.minutes, 0),
		// Two pages is not an index worth offering to a crawler.
		indexable: comparisons.length > 2
	};
};
