import type { PageServerLoad } from './$types';
import { isIndexable, lessonBySlug, publishedFailures, readingMinutes } from '$lib/learning';

export const prerender = true;

/**
 * The failure-mode catalogue.
 *
 * Grouped by the lesson that introduces each one, in guide order, so the index
 * reads in the same sequence as the guide and the printed appendix. Sorting
 * alphabetically would be easier and would scatter co-morbid patterns — the
 * whole point of the grouping is that failures arrive together.
 */
export const load: PageServerLoad = async () => {
	const modes = publishedFailures.filter(isIndexable).map((entry) => {
		const fm = entry.frontmatter;
		const lesson = lessonBySlug.get(fm.lesson);
		return {
			slug: fm.slug,
			title: fm.title,
			summary: fm.summary,
			signs: fm.signs,
			layer: fm.layer,
			lesson: fm.lesson,
			lessonTitle: lesson?.frontmatter.title ?? fm.lesson,
			lessonOrder: lesson?.frontmatter.order ?? Number.MAX_SAFE_INTEGER,
			minutes: readingMinutes(entry)
		};
	});

	const byLesson = new Map<string, typeof modes>();
	for (const mode of modes) {
		if (!byLesson.has(mode.lesson)) byLesson.set(mode.lesson, []);
		byLesson.get(mode.lesson)!.push(mode);
	}

	const groups = [...byLesson.entries()]
		.map(([slug, items]) => ({
			slug,
			title: items[0].lessonTitle,
			order: items[0].lessonOrder,
			published: lessonBySlug.get(slug)?.frontmatter.status === 'published',
			guide: lessonBySlug.get(slug)?.frontmatter.guide ?? null,
			items: items.sort((a, b) => a.title.localeCompare(b.title))
		}))
		.sort((a, b) => a.order - b.order);

	return {
		modes,
		groups,
		// Same threshold as the comparison index: a handful of entries is not an
		// index worth offering to a crawler.
		indexable: modes.length > 2
	};
};
