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
	publishedFailures,
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
	case: 'Case study',
	failure: 'Failure mode'
};

export interface DiscoveryItem {
	url: string;
	kind: string;
	title: string;
	summary: string;
	updated: string;
	/** The second line on a discovery card, e.g. "3 pages link here". */
	note?: string;
}

/**
 * "2 days ago", "last week".
 *
 * Built from a date passed in rather than `new Date()`, so the string is fixed
 * at build time and cannot disagree between the server render and the client.
 */
export function relativeDate(iso: string, today: string): string {
	const days = Math.round(
		(Date.parse(`${today}T00:00:00Z`) - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000
	);
	if (days <= 0) return 'today';
	if (days === 1) return 'yesterday';
	if (days < 7) return `${days} days ago`;
	if (days < 14) return 'last week';
	if (days < 60) return `${Math.round(days / 7)} weeks ago`;
	if (days < 365) return `${Math.round(days / 30)} months ago`;
	return `${Math.round(days / 365)} years ago`;
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
		...publishedCases,
		...publishedFailures
	].filter(isIndexable);
}

/**
 * Newest first, by the `updated` date authors maintain by hand.
 *
 * `today` is passed in — the load supplies the build date — so the relative
 * strings are baked at build time rather than drifting between the server
 * render and the client.
 */
export function recentlyUpdated(today: string, limit = 4): DiscoveryItem[] {
	return discoverable()
		.map(toItem)
		.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title))
		.slice(0, limit)
		.map((item) => ({
			...item,
			note: `${item.kind} · updated ${relativeDate(item.updated, today)}`
		}));
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
export function mostReferenced(limit = 4): DiscoveryItem[] {
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
		.map((r) => ({
			...r.item,
			note: `${r.score} ${r.score === 1 ? 'page links' : 'pages link'} here`
		}));
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
