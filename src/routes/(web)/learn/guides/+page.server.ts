import type { PageServerLoad } from './$types';
import { isIndexable, lessonsOfGuide, publishedGuides, readingMinutes } from '$lib/learning';

export const prerender = true;

/** The guides overview — the section nav links here, so it has to exist. */
export const load: PageServerLoad = async () => {
	const guides = publishedGuides
		.map((entry) => {
			const lessons = lessonsOfGuide(entry.frontmatter.slug);
			const fm = entry.frontmatter;
			return {
				image: fm.image,
				imageAlt: fm.imageAlt,
				motif: fm.motif,
				slug: entry.frontmatter.slug,
				title: entry.frontmatter.title,
				summary: entry.frontmatter.summary,
				level: entry.frontmatter.level,
				lessons: lessons.length,
				minutes: lessons.reduce((sum, l) => sum + readingMinutes(l), 0),
				indexable: isIndexable(entry)
			};
		})
		// A guide with no published lessons is a dead end.
		.filter((g) => g.lessons > 0)
		.sort((a, b) => a.title.localeCompare(b.title));

	return { guides, indexable: guides.some((g) => g.indexable) };
};
