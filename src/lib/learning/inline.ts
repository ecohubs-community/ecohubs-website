/**
 * Inline markdown links inside a plain-text field.
 *
 * Frontmatter strings are not run through mdsvex — a guide's FAQ answers, a
 * quiz intro and an outcome description are all rendered as text. That is
 * usually right, but it meant a URL in an answer appeared as a bare
 * `/learn/how-this-is-written` in the middle of a sentence.
 *
 * So: `[label](href)` only. Not a markdown subset that will grow — bold,
 * lists and headings in a one-paragraph answer are a sign the answer belongs
 * somewhere else. Everything outside a link stays literal text, and Svelte
 * escapes it, so there is no HTML-injection surface here.
 */

export type InlineSegment =
	| { kind: 'text'; text: string }
	| { kind: 'link'; text: string; href: string };

/** `[label](href)` — no nested brackets in the label, no spaces in the href. */
const LINK = /\[([^\]]+)\]\((\S+?)\)/g;

export function parseInline(value: string): InlineSegment[] {
	const segments: InlineSegment[] = [];
	let last = 0;

	for (const match of value.matchAll(LINK)) {
		const start = match.index ?? 0;
		if (start > last) segments.push({ kind: 'text', text: value.slice(last, start) });
		segments.push({ kind: 'link', text: match[1], href: match[2] });
		last = start + match[0].length;
	}

	if (last < value.length) segments.push({ kind: 'text', text: value.slice(last) });
	return segments;
}

/** Whether a link leaves the site, so the caller can mark it as such. */
export function isExternal(href: string): boolean {
	return /^https?:\/\//.test(href);
}
