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
import { isIndexable, publishedContent, urlFor } from './index';
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

/** Display labels and the order the design groups results in. */
export const KIND_ORDER = [
	'Topic',
	'Guide',
	'Lesson',
	'Failure mode',
	'Compared',
	'Learning path',
	'Glossary'
];

const KIND: Record<string, string> = {
	topic: 'Topic',
	guide: 'Guide',
	lesson: 'Lesson',
	compare: 'Compared',
	path: 'Learning path',
	term: 'Glossary',
	case: 'Case study',
	failure: 'Failure mode'
};

export interface SearchDoc {
	url: string;
	type: string;
	/** What the card's chip says, and what results are grouped under. */
	kind: string;
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
		kind: KIND[fm.type] ?? fm.type,
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
	/**
	 * `publishedContent`, not a hand-listed set of collections.
	 *
	 * This function used to spread the seven collections by name, which meant a
	 * new content type was silently absent from search until somebody noticed —
	 * and nobody would, because a search that returns fewer results looks like
	 * a search. `llms.txt` had already been caught by exactly this and was
	 * converted for the same reason; adding the `failure` type caught it here.
	 */
	return publishedContent
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

/** Results split by kind, in the design's order. Empty groups are dropped. */
export function groupByKind(docs: SearchDoc[]): { kind: string; docs: SearchDoc[] }[] {
	const groups = new Map<string, SearchDoc[]>();
	for (const doc of docs) {
		const list = groups.get(doc.kind);
		if (list) list.push(doc);
		else groups.set(doc.kind, [doc]);
	}

	// Known kinds first, in order; anything new falls in behind rather than
	// disappearing because it was not on the list.
	const known = KIND_ORDER.filter((k) => groups.has(k));
	const rest = [...groups.keys()].filter((k) => !KIND_ORDER.includes(k)).sort();
	return [...known, ...rest].map((kind) => ({ kind, docs: groups.get(kind)! }));
}
