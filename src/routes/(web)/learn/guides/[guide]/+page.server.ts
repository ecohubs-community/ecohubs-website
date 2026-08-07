import { error } from '@sveltejs/kit';
import { downloadsFor } from '$lib/learning/downloads';
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

	// Lower half of the rail: sideways to sibling guides.
	const siblings = publishedGuides
		.filter((g) => g.frontmatter.slug !== fm.slug)
		.filter((g) => lessonsOfGuide(g.frontmatter.slug).length > 0);

	const otherGuides = siblings.map((g) => ({
		href: `/learn/guides/${g.frontmatter.slug}`,
		label: g.frontmatter.title
	}));

	// The same siblings as cards, for "after this guide".
	const nextGuides = siblings.map((g) => {
		const theirLessons = lessonsOfGuide(g.frontmatter.slug);
		return {
			slug: g.frontmatter.slug,
			title: g.frontmatter.title,
			image: g.frontmatter.image,
			imageAlt: g.frontmatter.imageAlt,
			motif: g.frontmatter.motif,
			lessons: theirLessons.length,
			minutes: theirLessons.reduce((sum, l) => sum + readingMinutes(l), 0)
		};
	});

	return {
		// Only present once `pnpm downloads` has generated them.
		downloads: downloadsFor(params.guide),
		guide: fm,
		lessons,
		otherGuides,
		nextGuides,
		totalMinutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished: topic?.frontmatter.status === 'published',
		// A guide is mostly its lessons, so an empty one is a dead end however
		// well written its introduction is.
		indexable: isIndexable(entry) && lessons.length > 0
	};
};
