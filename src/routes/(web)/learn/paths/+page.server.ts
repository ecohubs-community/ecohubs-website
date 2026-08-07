import type { PageServerLoad } from './$types';
import { lessonBySlug, publishedPaths, readingMinutes } from '$lib/learning';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const paths = publishedPaths
		.map((entry) => {
			const fm = entry.frontmatter;
			// Unpublished steps are dropped rather than rendered as dead links, so
			// a path stays walkable while its lessons are still being written.
			const steps = fm.steps
				.map((step) => lessonBySlug.get(step.lesson))
				.filter((l) => l?.frontmatter.status === 'published');

			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				audience: fm.audience,
				image: fm.image,
				imageAlt: fm.imageAlt,
				motif: fm.motif,
				steps: steps.map((l) => ({ slug: l!.frontmatter.slug, title: l!.frontmatter.title })),
				minutes: steps.reduce((sum, l) => sum + readingMinutes(l!), 0),
				endsAt: fm.endsAt ?? null
			};
		})
		// A path whose lessons are all still drafts would render as an empty
		// sequence — the validator catches it, but so does this.
		.filter((p) => p.steps.length > 0);

	return {
		paths,
		totals: {
			paths: paths.length,
			steps: paths.reduce((sum, p) => sum + p.steps.length, 0),
			minutes: paths.reduce((sum, p) => sum + p.minutes, 0)
		},
		indexable: paths.length > 0
	};
};
