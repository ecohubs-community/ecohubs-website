import type { PageServerLoad } from './$types';
import {
	contentOfTopic,
	isIndexable,
	lessonBySlug,
	lessonsOfGuide,
	publishedComparisons,
	publishedGuides,
	publishedPaths,
	publishedTerms,
	publishedTopics,
	readingMinutes
} from '$lib/learning';
import { mostReferenced, rabbitPool, recentlyUpdated } from '$lib/learning/discovery';

export const prerender = true;

/**
 * The hub shell. Deliberately minimal for now: it lists only the sections that
 * actually have published content, so the hub is never a menu of dead ends.
 * Guides, topics, paths and search appear here as they land.
 */
export const load: PageServerLoad = async () => {
	const glossaryCount = publishedTerms.filter(isIndexable).length;

	// A topic only appears once it has something beneath it — the same rule the
	// topics index applies, so the two can never disagree.
	const topics = publishedTopics
		.filter(isIndexable)
		.map((t) => {
			const c = contentOfTopic(t.frontmatter.slug);
			return {
				slug: t.frontmatter.slug,
				title: t.frontmatter.title,
				summary: t.frontmatter.summary,
				updated: t.frontmatter.updated,
				image: t.frontmatter.image,
				imageAlt: t.frontmatter.imageAlt,
				motif: t.frontmatter.motif,
				total:
					c.guides.filter(isIndexable).length +
					c.comparisons.filter(isIndexable).length +
					c.terms.filter(isIndexable).length
			};
		})
		.filter((t) => t.total > 0)
		.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title))
		.slice(0, 9);

	// Paths are curation, so they are listed once they have published lessons
	// behind them rather than on word count.
	const paths = publishedPaths
		.map((p) => {
			const steps = p.frontmatter.steps
				.map((s) => lessonBySlug.get(s.lesson))
				.filter((l) => l?.frontmatter.status === 'published');
			return {
				slug: p.frontmatter.slug,
				title: p.frontmatter.title,
				summary: p.frontmatter.summary,
				updated: p.frontmatter.updated,
				steps: steps.map((l) => ({ slug: l!.frontmatter.slug, title: l!.frontmatter.title })),
				minutes: steps.reduce((sum, l) => sum + readingMinutes(l!), 0)
			};
		})
		.filter((p) => p.steps.length > 1)
		.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title))
		.slice(0, 4);

	// Every published guide that has lessons behind it. The first is featured.
	// Gated on having lessons, not on its own word count: a guide's body is a
	// short intro by design, so `isIndexable` — right for the sitemap — would
	// hide guides here that the guides index happily lists.
	const guides = publishedGuides
		.map((entry) => {
			const fm = entry.frontmatter;
			const lessons = lessonsOfGuide(fm.slug);
			return {
				slug: fm.slug,
				title: fm.title,
				summary: fm.summary,
				level: fm.level,
				image: fm.image,
				imageAlt: fm.imageAlt,
				motif: fm.motif,
				lessons: lessons.length,
				minutes: lessons.reduce((sum, l) => sum + readingMinutes(l), 0)
			};
		})
		.filter((g) => g.lessons > 0)
		.slice(0, 5);

	const comparisons = publishedComparisons
		.filter(isIndexable)
		.map((c) => ({
			slug: c.frontmatter.slug,
			title: c.frontmatter.title,
			summary: c.frontmatter.summary
		}))
		.sort((a, b) => a.title.localeCompare(b.title));

	return {
		glossaryCount,
		guides,
		topics,
		paths,
		comparisons,
		// Prerendered, so this is the build date — which is exactly the reference
		// point "2 days ago" should be measured from.
		recent: recentlyUpdated(new Date().toISOString().slice(0, 10)),
		referenced: mostReferenced(),
		rabbit: rabbitPool(),
		// Nothing published yet means nothing worth offering to a search engine.
		indexable: glossaryCount + comparisons.length + topics.length + paths.length > 0
	};
};
