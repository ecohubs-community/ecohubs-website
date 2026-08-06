/**
 * The search index, built once at build time.
 *
 * Emitted as a static JSON file and fetched *only* on `/learn/search`, never on
 * page load — it has no business in the bundle of an article nobody searched
 * from.
 *
 * Built from the source markdown rather than the rendered page, which is what
 * makes it depth-blind: `<Quick>` and `<Deep>` bodies are both just markdown in
 * the file, so a reader who has never opened deep mode can still find what is
 * written there. Drafts are excluded here as everywhere else — the fourth place
 * that matters, after the route, the listings and the sitemap.
 */
import {
	isIndexable,
	publishedCases,
	publishedComparisons,
	publishedGuides,
	publishedLessons,
	publishedPaths,
	publishedTerms,
	publishedTopics,
	urlFor
} from './index';
import { bodyText, normalise, tokenise } from './text';
import type { ContentEntry } from './types';

// A third glob over the same content files. The full text stays confined to
// this module, which only the prerendered endpoint imports, rather than being
// hung on every ContentEntry where any importer would drag it along.
const sources = import.meta.glob<string>('/src/content/learning/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export interface SearchDoc {
	url: string;
	type: string;
	title: string;
	/** One line of context under the result. */
	summary: string;
	/**
	 * Every distinct meaningful word on the page, sorted and space-joined —
	 * the body, plus the topic, target query and glossary terms. Deduplicating
	 * is what keeps this shippable: a long lesson collapses to a few hundred
	 * words, and sorted runs of shared prefixes compress well.
	 */
	text: string;
}

function toDoc(entry: ContentEntry): SearchDoc {
	const fm = entry.frontmatter;
	const extras = [
		(fm as { topic?: string }).topic,
		(fm as { targetQuery?: string }).targetQuery,
		...((fm as { terms?: string[] }).terms ?? [])
	].filter(Boolean) as string[];

	const title = fm.type === 'term' ? (fm as { term: string }).term : fm.title;
	const summary = fm.type === 'term' ? (fm as { short: string }).short : fm.summary;

	return {
		url: urlFor(entry),
		type: fm.type,
		title,
		summary,
		text: tokenise(
			`${title} ${summary} ${extras.join(' ')} ${bodyText(sources[entry.path] ?? '')}`
		).join(' ')
	};
}

/** Everything worth finding. Thin pages are excluded for the same reason they
 *  are kept out of the sitemap: a stub is not a useful result. */
export function buildSearchIndex(): SearchDoc[] {
	return [
		...publishedGuides,
		...publishedLessons,
		...publishedTopics,
		...publishedComparisons,
		...publishedTerms,
		...publishedPaths,
		...publishedCases
	]
		.filter(isIndexable)
		.map(toDoc)
		.sort((a, b) => a.title.localeCompare(b.title));
}

/* ── Matching ────────────────────────────────────────────────────────────
   Deliberately small and dependency-free. Every query token must match
   somewhere, and where it matched decides the rank: a title beats a summary
   beats a passing mention in the body. That is the whole of the ranking, and
   at this scale it is enough.
   ──────────────────────────────────────────────────────────────────────── */

/**
 * Does any word in the token list start with `token`?
 *
 * The list is space-joined, so anchoring the search at a space gives
 * prefix-matching over the whole page in one string scan: searching `" gover"`
 * finds `governance` but not `selfgovernance`.
 */
function hasPrefix(tokens: string, token: string): boolean {
	return ` ${tokens}`.includes(` ${token}`);
}

export function searchDocs(docs: SearchDoc[], query: string, limit = 25): SearchDoc[] {
	const tokens = normalise(query)
		.split(/[^a-z0-9]+/)
		.filter(Boolean);
	if (tokens.length === 0) return [];

	const scored: { doc: SearchDoc; score: number }[] = [];

	for (const doc of docs) {
		const title = normalise(doc.title);
		const summary = normalise(doc.summary);

		let score = 0;
		let matchedAll = true;

		for (const token of tokens) {
			if (title.startsWith(token)) score += 16;
			else if (hasPrefix(title, token)) score += 10;
			else if (summary.includes(token)) score += 4;
			else if (hasPrefix(doc.text, token)) score += 1;
			else {
				matchedAll = false;
				break;
			}
		}

		// A short title matching is a better answer than a long one that happens
		// to contain the word in passing.
		if (matchedAll) scored.push({ doc, score: score - title.length / 200 });
	}

	return scored
		.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
		.slice(0, limit)
		.map((s) => s.doc);
}
