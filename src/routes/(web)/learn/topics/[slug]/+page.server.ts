import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	contentOfTopic,
	isIndexable,
	publishedTopics,
	readingMinutes,
	topicBySlug
} from '$lib/learning';

export const prerender = true;

export const entries: EntryGenerator = () =>
	publishedTopics.map((t) => ({ slug: t.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = topicBySlug.get(params.slug);

	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No topic with this name');
	}

	const fm = entry.frontmatter;
	const content = contentOfTopic(fm.slug);

	const guides = content.guides.filter(isIndexable).map((g) => ({
		slug: g.frontmatter.slug,
		title: g.frontmatter.title,
		summary: g.frontmatter.summary,
		level: g.frontmatter.level
	}));

	const comparisons = content.comparisons.filter(isIndexable).map((c) => ({
		slug: c.frontmatter.slug,
		title: c.frontmatter.title,
		summary: c.frontmatter.summary
	}));

	const terms = content.terms.filter(isIndexable).map((t) => ({
		slug: t.frontmatter.slug,
		term: t.frontmatter.term,
		short: t.frontmatter.short
	}));

	const cases = content.cases.filter(isIndexable).map((c) => ({
		slug: c.frontmatter.slug,
		title: c.frontmatter.title,
		summary: c.frontmatter.summary
	}));

	// Lower half of the rail: sideways to other topics that have content.
	const relatedTopics = publishedTopics
		.filter((t) => t.frontmatter.slug !== fm.slug)
		.filter((t) => {
			const c = contentOfTopic(t.frontmatter.slug);
			return c.guides.length + c.comparisons.length + c.terms.length > 0;
		})
		.map((t) => ({ href: `/learn/topics/${t.frontmatter.slug}`, label: t.frontmatter.title }));

	return {
		topic: fm,
		headings: entry.headings,
		relatedTopics,
		guides,
		comparisons,
		terms,
		cases,
		readingMinutes: readingMinutes(entry),
		// A topic with prose but nothing beneath it is still a dead end; require
		// both substance and something to link to.
		indexable: isIndexable(entry) && guides.length + comparisons.length + terms.length > 0
	};
};
