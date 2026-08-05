import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { lessonBySlug, pathBySlug, publishedPaths, readingMinutes } from '$lib/learning';

export const prerender = true;

export const entries: EntryGenerator = () =>
	publishedPaths.map((p) => ({ slug: p.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = pathBySlug.get(params.slug);

	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No learning path with this name');
	}

	const fm = entry.frontmatter;

	// Unpublished steps are dropped rather than rendered as dead links, so a
	// path stays walkable while its lessons are still being written.
	const steps = fm.steps
		.map((step) => {
			const lesson = lessonBySlug.get(step.lesson);
			if (!lesson || lesson.frontmatter.status !== 'published') return null;
			return {
				guide: step.guide,
				slug: lesson.frontmatter.slug,
				title: lesson.frontmatter.title,
				summary: lesson.frontmatter.summary,
				minutes: readingMinutes(lesson)
			};
		})
		.filter((s): s is NonNullable<typeof s> => s !== null);

	if (steps.length === 0) throw error(404, 'This path has no published lessons yet');

	return {
		path: fm,
		steps,
		minutes: steps.reduce((sum, s) => sum + s.minutes, 0),
		// A path is curation, so it needs steps rather than prose to be worth
		// indexing — `isIndexable` sets its word threshold to zero for that reason.
		indexable: steps.length > 1
	};
};
