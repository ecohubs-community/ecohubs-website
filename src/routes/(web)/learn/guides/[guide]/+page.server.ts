import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	guideBySlug,
	isIndexable,
	lessonsOfGuide,
	publishedGuides,
	readingMinutes,
	topicBySlug
} from '$lib/learning';

export const prerender = true;

export const entries: EntryGenerator = () =>
	publishedGuides.map((g) => ({ guide: g.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = guideBySlug.get(params.guide);

	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	const fm = entry.frontmatter;
	const lessons = lessonsOfGuide(fm.slug).map((lesson, i) => ({
		slug: lesson.frontmatter.slug,
		title: lesson.frontmatter.title,
		summary: lesson.frontmatter.summary,
		number: i + 1,
		minutes: readingMinutes(lesson)
	}));

	const topic = topicBySlug.get(fm.topic);

	return {
		guide: fm,
		lessons,
		totalMinutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished: topic?.frontmatter.status === 'published',
		// A guide is mostly its lessons, so an empty one is a dead end however
		// well written its introduction is.
		indexable: isIndexable(entry) && lessons.length > 0
	};
};
