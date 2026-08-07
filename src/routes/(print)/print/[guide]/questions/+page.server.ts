import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { guideBySlug, lessonsOfGuide } from '$lib/learning';
import { countQuestions, questionGroups } from '$lib/learning/questions';

export const load: PageServerLoad = async ({ params }) => {
	const guide = guideBySlug.get(params.guide);
	if (!guide || guide.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	// Derived from the lessons themselves, so the sheet cannot drift from the
	// guide the way a hand-maintained copy would. See `questions.ts`.
	const groups = questionGroups(
		lessonsOfGuide(params.guide).map((lesson) => ({
			title: lesson.frontmatter.title,
			order: lesson.frontmatter.order,
			source: lesson.source
		}))
	);

	if (groups.length === 0) throw error(404, 'This guide has no visit questions yet');

	return {
		guide: guide.frontmatter,
		groups,
		total: countQuestions(groups),
		generatedAt: new Date().toISOString()
	};
};
