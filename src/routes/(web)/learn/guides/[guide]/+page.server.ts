import { error } from '@sveltejs/kit';
import { downloadsFor } from '$lib/learning/downloads';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	contentOfTopic,
	failuresOfGuide,
	guideBySlug,
	isIndexable,
	lessonsOfGuide,
	publishedGuides,
	publishedTopics,
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
	const lessonEntries = lessonsOfGuide(fm.slug);
	const lessons = lessonEntries.map((lesson, i) => ({
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

	/**
	 * Topics to go to next: everything except the one this guide belongs to,
	 * most related first.
	 *
	 * "Related" is measured rather than asserted — how many of the glossary
	 * terms this guide's lessons reference are filed under each topic. A topic
	 * with no overlap still appears, at the end, because the alternative is a
	 * corner of the hub nothing links to.
	 */
	const referenced = new Set(lessonEntries.flatMap((l) => l.frontmatter.terms ?? []));
	const overlap = (topicSlug: string) =>
		contentOfTopic(topicSlug).terms.filter((t) => referenced.has(t.frontmatter.slug)).length;

	const nextTopics = publishedTopics
		.filter((t) => t.frontmatter.slug !== fm.topic)
		.map((t) => ({ entry: t, content: contentOfTopic(t.frontmatter.slug) }))
		.filter(({ entry, content }) => isIndexable(entry) && content.terms.length > 0)
		.map(({ entry, content }) => ({
			slug: entry.frontmatter.slug,
			title: entry.frontmatter.title,
			summary: entry.frontmatter.summary,
			image: entry.frontmatter.image,
			imageAlt: entry.frontmatter.imageAlt,
			motif: entry.frontmatter.motif,
			terms: content.terms.length,
			related: overlap(entry.frontmatter.slug)
		}))
		.sort((a, b) => b.related - a.related || a.title.localeCompare(b.title));

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
		/**
		 * Whether to offer the RCOS session tools.
		 *
		 * Gated on this guide actually having failure modes rather than shown on
		 * every guide: the self-assessment ranks stress tests and the facilitation
		 * guide runs one, so on a guide about what joining costs they would be a
		 * non-sequitur pointing off-site.
		 */
		hasFailureModes: failuresOfGuide(params.guide).length > 0,
		guide: fm,
		lessons,
		otherGuides,
		nextGuides,
		nextTopics,
		totalMinutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished: topic?.frontmatter.status === 'published',
		// A guide is mostly its lessons, so an empty one is a dead end however
		// well written its introduction is.
		indexable: isIndexable(entry) && lessons.length > 0
	};
};
