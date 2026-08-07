import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	compareBySlug,
	isIndexable,
	publishedComparisons,
	readingMinutes,
	termBySlug,
	topicBySlug
} from '$lib/learning';

export const prerender = true;

export const entries: EntryGenerator = () =>
	publishedComparisons.map((c) => ({ slug: c.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = compareBySlug.get(params.slug);

	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No comparison with this name');
	}

	const fm = entry.frontmatter;
	const topic = topicBySlug.get(fm.topic);

	// Terms this page leans on, so a reader can jump to a definition. Only the
	// published ones become links — same rule as everywhere else in the hub.
	const terms = (fm.terms ?? [])
		.map((slug) => termBySlug.get(slug))
		.filter((t) => t && t.frontmatter.status === 'published')
		.map((t) => ({
			slug: t!.frontmatter.slug,
			term: t!.frontmatter.term,
			short: t!.frontmatter.short
		}));

	// Other comparisons, for the "still deciding?" rail at the foot.
	const others = publishedComparisons
		.filter((c) => c.frontmatter.slug !== fm.slug)
		.filter(isIndexable)
		.slice(0, 3)
		.map((c) => ({
			slug: c.frontmatter.slug,
			title: c.frontmatter.title,
			summary: c.frontmatter.summary
		}));

	return {
		compare: fm,
		headings: entry.headings,
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished: topic?.frontmatter.status === 'published',
		terms,
		others,
		readingMinutes: readingMinutes(entry),
		indexable: isIndexable(entry)
	};
};
