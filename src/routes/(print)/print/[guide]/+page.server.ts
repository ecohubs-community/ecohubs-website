import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { guideBySlug, lessonsOfGuide, publishedTerms, readingMinutes } from '$lib/learning';

export const load: PageServerLoad = async ({ params }) => {
	const guide = guideBySlug.get(params.guide);
	if (!guide || guide.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	const lessons = lessonsOfGuide(params.guide);
	if (lessons.length === 0) throw error(404, 'This guide has no published lessons yet');

	return {
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
