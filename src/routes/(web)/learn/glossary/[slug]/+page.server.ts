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
		.map((t) => ({
			slug: t!.frontmatter.slug,
			term: t!.frontmatter.term,
			short: t!.frontmatter.short
		}));

	// Reverse index: where this term is actually used. Built from `terms:`
	// frontmatter, so nobody maintains this list by hand.
	//
	// The owning topic is dropped: it lists its own terms, so it would otherwise
	// appear twice — once as its own card and once in this list.
	const usedIn = (termUsage.get(fm.slug) ?? [])
		.filter((used) => !(used.frontmatter.type === 'topic' && used.frontmatter.slug === fm.topic))
		.map((used) => ({
			title: used.frontmatter.title,
			url: urlFor(used),
			type: used.frontmatter.type
		}));

	// Only offer the topic as a link once that page exists — same rule as
	// related terms, so an entry can never point at a 404.
	const topic = topicBySlug.get(fm.topic);
	const topicPublished = topic?.frontmatter.status === 'published';

	// Alphabetical neighbours, so the glossary can be read straight through
	// rather than only searched. Crawlers follow these too, which is how a term
	// nobody links to still gets found.
	const ordered = publishedTerms
		.filter(isIndexable)
		.map((t) => ({ slug: t.frontmatter.slug, term: t.frontmatter.term }))
		.sort((a, b) => a.term.localeCompare(b.term));
	const here = ordered.findIndex((t) => t.slug === fm.slug);
	// Wraps, so the last term still offers somewhere to go.
	const next = ordered.length > 1 ? ordered[(here + 1) % ordered.length] : null;
	const previous =
		ordered.length > 1 ? ordered[(here - 1 + ordered.length) % ordered.length] : null;

	return {
		term: fm,
		topicTitle: topic?.frontmatter.title ?? fm.topic,
		topicPublished,
		// Written once per topic; the same advice applies to every term under it.
		practice: topic?.frontmatter.practice ?? null,
		next,
		previous,
		related,
		usedIn,
		// A stub entry stays readable but is kept out of the index — the same
		// gate that keeps thin tag pages out of the sitemap.
		indexable: isIndexable(entry)
	};
};
