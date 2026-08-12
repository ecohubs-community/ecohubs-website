import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	guideBySlug,
	lessonsOfGuide,
	publishedFailures,
	publishedTerms,
	readingMinutes
} from '$lib/learning';

export const load: PageServerLoad = async ({ params }) => {
	const guide = guideBySlug.get(params.guide);
	if (!guide || guide.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	const lessons = lessonsOfGuide(params.guide);
	if (lessons.length === 0) throw error(404, 'This guide has no published lessons yet');

	/**
	 * The failure modes, as a printed appendix, in the order their lessons
	 * introduce them.
	 *
	 * Ordered by lesson rather than alphabetically because the appendix has to
	 * read in the same sequence as the guide it is bound into — a reader working
	 * through lesson 3 should find its modes together, not scattered between A
	 * and W. Guides with no failure modes get no appendix and no empty heading.
	 */
	const order = new Map(lessons.map((lesson, index) => [lesson.frontmatter.slug, index]));
	const appendix = publishedFailures
		.filter((entry) => order.has(entry.frontmatter.lesson))
		.sort(
			(a, b) =>
				order.get(a.frontmatter.lesson)! - order.get(b.frontmatter.lesson)! ||
				a.frontmatter.title.localeCompare(b.frontmatter.title)
		)
		.map((entry) => ({
			slug: entry.frontmatter.slug,
			title: entry.frontmatter.title,
			summary: entry.frontmatter.summary,
			signs: entry.frontmatter.signs,
			layer: entry.frontmatter.layer,
			lesson: entry.frontmatter.lesson,
			lessonTitle: lessons.find((l) => l.frontmatter.slug === entry.frontmatter.lesson)!.frontmatter
				.title
		}));

	return {
		appendix,
		guide: guide.frontmatter,
		// Glossary references inside the lessons read these from context, exactly
		// as they do under the /learn layout.
		definitions: publishedTerms.map((t) => ({
			slug: t.frontmatter.slug,
			term: t.frontmatter.term,
			short: t.frontmatter.short,
			published: true
		})),
		// Stamped by the server so the cover can date itself. `new Date()` in the
		// component would differ between the SSR pass and any later render.
		generatedAt: new Date().toISOString(),
		lessons: lessons.map((lesson, i) => ({
			slug: lesson.frontmatter.slug,
			title: lesson.frontmatter.title,
			summary: lesson.frontmatter.summary,
			marker: String(i + 1).padStart(2, '0'),
			minutes: readingMinutes(lesson)
		})),
		minutes: lessons.reduce((sum, lesson) => sum + readingMinutes(lesson), 0)
	};
};
