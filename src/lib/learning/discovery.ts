/**
 * The hub's discovery surfaces: what changed lately, what the hub links to
 * most, and the rabbit hole.
 *
 * All build-time and derived from the content itself. Nothing here needs
 * analytics, which is deliberate — a "popular" list we cannot measure would be
 * a guess dressed up as data.
 */
import {
	allEntries,
	isIndexable,
	publishedCases,
	publishedComparisons,
	publishedGuides,
	publishedPaths,
	publishedTerms,
	publishedTopics,
	urlFor
} from './index';
import type { ContentEntry } from './types';

/** What a card says a thing is. Matches the design's kind labels. */
const KIND: Record<string, string> = {
	guide: 'Guide',
	lesson: 'Lesson',
	topic: 'Topic',
	compare: 'Compared',
	term: 'Glossary',
	path: 'Learning path',
	case: 'Case study'
};

export interface DiscoveryItem {
	url: string;
	kind: string;
	title: string;
	summary: string;
	updated: string;
}

function toItem(entry: ContentEntry): DiscoveryItem {
	const fm = entry.frontmatter;
	return {
		url: urlFor(entry),
		kind: KIND[fm.type] ?? fm.type,
		title: fm.type === 'term' ? (fm as { term: string }).term : fm.title,
		summary: fm.type === 'term' ? (fm as { short: string }).short : fm.summary,
		updated: fm.updated
	};
}

/** Everything a reader could usefully land on. */
function discoverable(): ContentEntry[] {
	return [
		...publishedGuides,
		...publishedTopics,
		...publishedComparisons,
		...publishedTerms,
		...publishedPaths,
		...publishedCases
	].filter(isIndexable);
}

/** Newest first, by the `updated` date authors maintain by hand. */
export function recentlyUpdated(limit = 5): DiscoveryItem[] {
	return discoverable()
		.map(toItem)
		.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title))
		.slice(0, limit);
}

/**
 * What the rest of the hub points at most.
 *
 * This is the honest version of the design's "Popular this week": we have no
 * analytics, so rather than invent traffic we count inbound references — the
 * `terms:` and `related:` lists other pages already maintain. It answers a
 * real question ("what does this body of work keep coming back to?") instead
 * of pretending to answer one we cannot.
 */
export function mostReferenced(limit = 5): DiscoveryItem[] {
	const inbound = new Map<string, number>();
	for (const entry of allEntries) {
		if (entry.frontmatter.status !== 'published') continue;
		const fm = entry.frontmatter as { terms?: string[]; related?: string[] };
		for (const slug of [...(fm.terms ?? []), ...(fm.related ?? [])]) {
			inbound.set(slug, (inbound.get(slug) ?? 0) + 1);
		}
	}

	return discoverable()
		.map((e) => ({ item: toItem(e), score: inbound.get(e.frontmatter.slug) ?? 0 }))
		.filter((r) => r.score > 0)
		.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
		.slice(0, limit)
		.map((r) => r.item);
}

/**
 * The pool the rabbit hole draws from — everything, of every kind.
 *
 * The whole pool ships rather than one pick, because "↻ another" has to work
 * without a round trip. It is small: a title and a sentence per page.
 */
export function rabbitPool(): DiscoveryItem[] {
	return discoverable()
		.map(toItem)
		.sort((a, b) => a.url.localeCompare(b.url));
}
