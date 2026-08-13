import type { PageServerLoad } from './$types';
import { isIndexable, lessonsOfGuide, publishedGuides, readingMinutes } from '$lib/learning';

export const prerender = true;

/** Reading order: what a newcomer should meet first. */
const LEVEL_ORDER = ['foundational', 'intermediate', 'advanced'] as const;

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
		/**
		 * Foundational first, then by title.
		 *
		 * The page features whichever guide sorts first, so this ordering is a
		 * real editorial decision rather than a tidy-up. Sorting on title alone
		 * meant the second guide took the featured slot the day it was added,
		 * purely because its title began "The" — demoting the orientation guide
		 * that most readers need first to a compact card beside it.
		 *
		 * Level is the honest key: a reader who lands here without knowing the
		 * subject should meet the foundational guide, whatever it is called.
		 */
		.sort(
			(a, b) =>
				LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level) ||
				a.title.localeCompare(b.title)
		);

	return { guides, indexable: guides.some((g) => g.indexable) };
};
