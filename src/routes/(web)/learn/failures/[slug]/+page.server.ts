import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	failureBySlug,
	isIndexable,
	lessonBySlug,
	publishedFailures,
	readingMinutes,
	termBySlug
} from '$lib/learning';
import { RCOS_STRESS_TESTS, rcosLayerLabel, rcosLayerUrl } from '$lib/learning/rcos';

/**
 * Prerendered only once there is something to prerender.
 *
 * A route marked prerenderable whose `entries()` is empty fails the build —
 * and this catalogue is written before it is published, so every page here is
 * a draft for a while. Deriving the flag keeps the build green during that
 * window and turns prerendering back on by itself the moment the first page
 * publishes, with no second edit to forget.
 */
export const prerender = publishedFailures.length > 0;

export const entries: EntryGenerator = () =>
	publishedFailures.map((f) => ({ slug: f.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = failureBySlug.get(params.slug);

	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No failure mode with this name');
	}

	const fm = entry.frontmatter;
	const lesson = lessonBySlug.get(fm.lesson);

	const terms = (fm.terms ?? [])
		.map((slug) => termBySlug.get(slug))
		.filter((t) => t && t.frontmatter.status === 'published')
		.map((t) => ({
			slug: t!.frontmatter.slug,
			term: t!.frontmatter.term,
			short: t!.frontmatter.short
		}));

	// Siblings from the same lesson, because failures are co-morbid: the reader
	// who arrived here searching one symptom is usually living with two more.
	const siblings = publishedFailures
		.filter((f) => f.frontmatter.lesson === fm.lesson && f.frontmatter.slug !== fm.slug)
		.filter(isIndexable)
		.map((f) => ({
			slug: f.frontmatter.slug,
			title: f.frontmatter.title,
			summary: f.frontmatter.summary
		}));

	return {
		failure: fm,
		headings: entry.headings,
		lessonTitle: lesson?.frontmatter.title ?? null,
		lessonGuide: lesson?.frontmatter.guide ?? null,
		lessonPublished: lesson?.frontmatter.status === 'published',
		layerUrl: rcosLayerUrl(fm.layer),
		layerLabel: rcosLayerLabel(fm.layer),
		// `none` means RCOS has no test for this pattern — a claim the page makes
		// out loud rather than a gap it hides.
		stressTestUrl: fm.rcos === 'none' ? null : `${RCOS_STRESS_TESTS}/${fm.rcos}`,
		terms,
		siblings,
		readingMinutes: readingMinutes(entry),
		indexable: isIndexable(entry)
	};
};
