import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	isIndexable,
	publishedTerms,
	termBySlug,
	termUsage,
	topicBySlug,
	urlFor
} from '$lib/learning';

export const prerender = true;

/** Prerender one page per published term, rather than relying on link crawling. */
export const entries: EntryGenerator = () =>
	publishedTerms.map((t) => ({ slug: t.frontmatter.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const entry = termBySlug.get(params.slug);

	// Drafts are invisible: no route, no listing, no sitemap, no search.
	if (!entry || entry.frontmatter.status !== 'published') {
		throw error(404, 'No glossary entry with this name');
	}

	const fm = entry.frontmatter;

	// Only link related terms that are themselves published, so an entry never
	// points at a 404.
	const related = (fm.related ?? [])
		.map((slug) => termBySlug.get(slug))
		.filter((t) => t && t.frontmatter.status === 'published')
		.map((t) => ({ slug: t!.frontmatter.slug, term: t!.frontmatter.term, short: t!.frontmatter.short }));

	// Reverse index: where this term is actually used. Built from `terms:`
	// frontmatter, so nobody maintains this list by hand.
	const usedIn = (termUsage.get(fm.slug) ?? []).map((used) => ({
		title: used.frontmatter.title,
		url: urlFor(used),
		type: used.frontmatter.type
	}));

	// Only offer the topic as a link once that page exists — same rule as
	// related terms, so an entry can never point at a 404.
	const topic = topicBySlug.get(fm.topic);
	const topicPublished = topic?.frontmatter.status === 'published';

	return {
		term: fm,
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished,
		related,
		usedIn,
		// A stub entry stays readable but is kept out of the index — the same
		// gate that keeps thin tag pages out of the sitemap.
		indexable: isIndexable(entry)
	};
};
