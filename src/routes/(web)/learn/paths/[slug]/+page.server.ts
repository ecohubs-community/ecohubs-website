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
				slug: lesson.frontmatter.slug,
				title: lesson.frontmatter.title,
				// The step's description is the lesson's own summary rather than a
				// second copy in the path file — one place to change it.
				summary: lesson.frontmatter.summary,
				minutes: readingMinutes(lesson),
				href: `/learn/guides/${step.guide}/${lesson.frontmatter.slug}`
			};
		})
		.filter((s): s is NonNullable<typeof s> => s !== null);

	if (steps.length === 0) throw error(404, 'This path has no published lessons yet');

	// Sibling paths, for the rail and the tail of the page.
	const others = publishedPaths
		.filter((p) => p.frontmatter.slug !== fm.slug)
		.map((p) => {
			const count = p.frontmatter.steps.filter(
				(s) => lessonBySlug.get(s.lesson)?.frontmatter.status === 'published'
			).length;
			return {
				slug: p.frontmatter.slug,
				title: p.frontmatter.title,
				image: p.frontmatter.image,
				imageAlt: p.frontmatter.imageAlt,
				motif: p.frontmatter.motif,
				steps: count
			};
		})
		.filter((p) => p.steps > 0);

	return {
		path: fm,
		steps,
		others,
		minutes: steps.reduce((sum, s) => sum + s.minutes, 0),
		// A path is curation, so it needs steps rather than prose to be worth
		// indexing — `isIndexable` sets its word threshold to zero for that reason.
		indexable: steps.length > 1
	};
};
