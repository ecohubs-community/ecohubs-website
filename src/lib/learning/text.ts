/**
 * Turning a source file into plain reader-visible text.
 *
 * Shared by the word count (which drives reading time and the thin-content
 * gate) and the search index, so the two can never disagree about what counts
 * as content on a page.
 */

/**
 * The prose a reader actually sees, as one string.
 *
 * Naively stripping tags would score a comparison page near zero, because its
 * table lives in `<Compare rows={…} />` props — and on that kind of page the
 * table *is* the content. So prose written inside component props is kept too:
 * quoted strings of more than two words, excluding URLs and paths.
 *
 * Depth layers need no special handling: `<Quick>` and `<Deep>` bodies are
 * plain markdown in the source, so every layer is included whatever the reader
 * later chooses to see.
 */
export function bodyText(raw: string): string {
	const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').replace(/```[\s\S]*?```/g, ' ');

	// Prose written as component props, e.g. a Compare row or a Sources title.
	const inProps: string[] = [];
	for (const tag of body.match(/<[A-Z][^>]*>/gs) ?? []) {
		for (const [, quoted] of tag.matchAll(/['"]([^'"]{6,})['"]/g)) {
			const looksLikeUrl = /^(https?:|\/|#|mailto:)/.test(quoted) || !quoted.includes(' ');
			if (!looksLikeUrl) inProps.push(quoted);
		}
	}

	const prose = body.replace(/<[^>]+>/g, ' ').replace(/[#*_>`|-]/g, ' ');
	return `${prose} ${inProps.join(' ')}`;
}

export function countWords(raw: string): number {
	return bodyText(raw).split(/\s+/).filter(Boolean).length;
}

/** Lowercase, strip accents — applied to both the index and the query so they
 *  meet in the middle. */
export function normalise(value: string): string {
	return value.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
}

// Words that would match nearly every page, and so rank nothing.
const STOPWORDS = new Set(
	`a an and are as at be been but by can do does for from had has have how i if in into is it its
	 may more most no not of on or our so than that the their them then there these they this to
	 was we were what when where which who will with would you your`.split(/\s+/)
);

/**
 * The distinct, meaningful words on a page.
 *
 * Deduplicated and sorted, because this ships to the browser: a 2,000-word
 * lesson collapses to a few hundred tokens, and sorting means gzip has runs of
 * shared prefixes to work with. Ordering carries no meaning for a matcher that
 * only asks whether a word is present.
 */
export function tokenise(text: string): string[] {
	const seen = new Set<string>();
	for (const word of normalise(text).split(/[^a-z0-9]+/)) {
		if (word.length > 2 && !STOPWORDS.has(word)) seen.add(word);
	}
	return [...seen].sort();
}
