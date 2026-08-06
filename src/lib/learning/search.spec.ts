import { describe, expect, it } from 'vitest';
import { buildSearchIndex, groupByKind, searchDocs, type SearchDoc } from './search';
import { allEntries } from './index';
import { isIndexable } from './validate';
import { bodyText, tokenise } from './text';

/** A doc built the way buildSearchIndex builds one, so the matcher is tested
 *  against the same shape it meets in production. */
function doc(title: string, summary = '', body = '', type = 'topic', kind = 'Topic'): SearchDoc {
	return {
		url: `/learn/topics/${title.toLowerCase().replace(/\W+/g, '-')}`,
		type,
		kind,
		title,
		summary,
		text: tokenise(`${title} ${summary} ${body}`).join(' ')
	};
}

describe('searchDocs — matching', () => {
	it('returns nothing for an empty or punctuation-only query', () => {
		const docs = [doc('Governance')];
		expect(searchDocs(docs, '')).toHaveLength(0);
		expect(searchDocs(docs, '   ')).toHaveLength(0);
		expect(searchDocs(docs, '—?')).toHaveLength(0);
	});

	it('requires every token to match somewhere', () => {
		const docs = [doc('Community governance', 'How decisions get made.')];
		expect(searchDocs(docs, 'community governance')).toHaveLength(1);
		expect(searchDocs(docs, 'community bicycle')).toHaveLength(0);
	});

	it('matches a word prefix but not a word interior', () => {
		const docs = [doc('Governance')];
		expect(searchDocs(docs, 'gover')).toHaveLength(1);
		// Anchoring at the token boundary is the whole point: without it every
		// query would match half the hub on substrings.
		expect(searchDocs(docs, 'ernance')).toHaveLength(0);
	});

	it('ignores case and accents on both sides', () => {
		expect(searchDocs([doc('Ecoaldea')], 'ECOALDEA')).toHaveLength(1);
		expect(searchDocs([doc('Ecoaldéa')], 'ecoaldea')).toHaveLength(1);
	});
});

describe('searchDocs — ranking', () => {
	it('ranks a title match above a body-only match', () => {
		const docs = [
			doc('Cohousing vs ecovillage', 'Two words often confused.', 'consent appears here'),
			doc('Consent', 'A decision passes when no one objects.')
		];
		expect(searchDocs(docs, 'consent').map((d) => d.title)).toEqual([
			'Consent',
			'Cohousing vs ecovillage'
		]);
	});

	it('ranks a title that starts with the query above one that merely contains it', () => {
		const docs = [doc('The economics of land', 'x'), doc('Land and who owns it', 'x')];
		expect(searchDocs(docs, 'land')[0].title).toBe('Land and who owns it');
	});

	it('honours the result limit', () => {
		const docs = Array.from({ length: 30 }, (_, i) => doc(`Governance ${i}`));
		expect(searchDocs(docs, 'governance', 5)).toHaveLength(5);
	});
});

describe('buildSearchIndex', () => {
	const index = buildSearchIndex();

	it('indexes every indexable page and nothing else', () => {
		const expected = allEntries.filter(isIndexable).length;
		expect(index).toHaveLength(expected);
		expect(expected).toBeGreaterThan(0);
	});

	/**
	 * The failure this guards against is silent and bad: unpublished work made
	 * discoverable through the site's own search, long before anyone meant to
	 * ship it.
	 */
	// Skipped rather than failed when everything is published: there is nothing
	// to leak, and the invariant above ("nothing else") already covers the
	// general case. It comes back the moment a draft does.
	it.runIf(allEntries.some((e) => e.frontmatter.status !== 'published'))('leaks no drafts', () => {
		const draftSlugs = new Set(
			allEntries.filter((e) => e.frontmatter.status !== 'published').map((e) => e.frontmatter.slug)
		);
		const leaked = index.filter((d) => draftSlugs.has(d.url.split('/').pop() ?? ''));
		expect(leaked.map((d) => d.url)).toEqual([]);
	});

	it('gives every entry a url, title and summary', () => {
		const incomplete = index.filter((d) => !d.url || !d.title || !d.summary);
		expect(incomplete.map((d) => d.url)).toEqual([]);
	});

	/**
	 * The depth switch hides text from readers who chose "quick"; it must never
	 * hide it from search. Since the index is built from source markdown, every
	 * layer is present — this asserts that stays true.
	 */
	it('indexes text that only exists inside a Deep block', () => {
		const withDeep = allEntries.filter((e) => isIndexable(e) && /<Deep[\s>]/.test(rawOf(e.path)));
		expect(withDeep.length).toBeGreaterThan(0);

		const missing: string[] = [];
		let checked = 0;
		for (const entry of withDeep) {
			const indexed = index.find((d) => d.title === titleOf(entry));
			expect(indexed, `${entry.path} is indexable but absent from the index`).toBeDefined();
			for (const word of deepOnlyWords(rawOf(entry.path))) {
				checked++;
				if (!searchDocs([indexed!], word).length) missing.push(`${entry.path}: ${word}`);
			}
		}
		expect(missing).toEqual([]);
		// Without a deep-only word to look for, the loop above proves nothing.
		expect(checked).toBeGreaterThan(0);
	});
});

/* ── Helpers for the Deep-layer assertion ─────────────────────────────────── */

const sources = import.meta.glob<string>('/src/content/learning/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const rawOf = (path: string) => sources[path] ?? '';

function titleOf(entry: (typeof allEntries)[number]): string {
	const fm = entry.frontmatter;
	return fm.type === 'term' ? (fm as { term: string }).term : fm.title;
}

/** Words long enough to be distinctive that appear only inside `<Deep>`. */
function deepOnlyWords(raw: string): string[] {
	const deep = (raw.match(/<Deep[\s>][\s\S]*?<\/Deep>/g) ?? []).join(' ');
	const elsewhere = new Set(tokenise(bodyText(raw.replace(/<Deep[\s>][\s\S]*?<\/Deep>/g, ' '))));
	return tokenise(deep)
		.filter((w) => w.length >= 7 && !elsewhere.has(w))
		.slice(0, 5);
}

describe('groupByKind', () => {
	it("returns the design's order, skipping kinds with no results", () => {
		const docs = [
			doc('A term', '', '', 'term', 'Glossary'),
			doc('A guide', '', '', 'guide', 'Guide'),
			doc('A topic', '', '', 'topic', 'Topic')
		];
		expect(groupByKind(docs).map((g) => g.kind)).toEqual(['Topic', 'Guide', 'Glossary']);
	});

	it('keeps every document', () => {
		const docs = [
			doc('One', '', '', 'topic', 'Topic'),
			doc('Two', '', '', 'topic', 'Topic'),
			doc('Three', '', '', 'term', 'Glossary')
		];
		const grouped = groupByKind(docs);
		expect(grouped.flatMap((g) => g.docs)).toHaveLength(3);
		expect(grouped.find((g) => g.kind === 'Topic')?.docs).toHaveLength(2);
	});

	/** A new content type must not vanish from search because nobody added it
	 *  to the order list. */
	it('keeps an unknown kind, after the known ones', () => {
		const docs = [doc('Odd', '', '', 'zine', 'Zine'), doc('A topic', '', '', 'topic', 'Topic')];
		expect(groupByKind(docs).map((g) => g.kind)).toEqual(['Topic', 'Zine']);
	});

	it('returns nothing for no results', () => {
		expect(groupByKind([])).toEqual([]);
	});
});
