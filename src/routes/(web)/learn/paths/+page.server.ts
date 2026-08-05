import type { PageServerLoad } from './$types';
import { isIndexable, lessonBySlug, publishedPaths, readingMinutes } from '$lib/learning';

export const prerender = true;

/**
 * The paths overview.
 *
 * A path is pure curation — an ordered set of lessons drawn from across the
 * guides — so its length and reading time are derived from the lessons rather
 * than authored, and cannot drift out of date.
 */
export const load: PageServerLoad = async () => {
	const paths = publishedPaths
		.map((entry) => {
			const fm = entry.frontmatter;
			const steps = fm.steps
				.map((step) => lessonBySlug.get(step.lesson))
				.filter((l) => l && l.frontmatter.status === 'published');

			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				steps: steps.length,
				minutes: steps.reduce((sum, l) => sum + readingMinutes(l!), 0),
				endsAt: fm.endsAt ?? null
			};
		})
		// A path whose lessons are all still drafts would render as an empty
		// sequence — the validator catches it, but so does this.
		.filter((p) => p.steps > 0);

	return { paths, indexable: paths.length > 0 };
};
