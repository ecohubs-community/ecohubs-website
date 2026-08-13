import { describe, expect, it } from 'vitest';
import { rabbitPool, relativeDate } from './discovery';
import { publishedContent } from './index';
import { isIndexable, urlFor } from './index';

/**
 * The discovery pool is assembled by hand from named collections, and a new
 * content type has twice been given a card label while nobody added it to that
 * list — `case` first, then `failure`, which left twenty-five pages one line
 * short of appearing anywhere.
 *
 * So the test is written against the general defect rather than against
 * failures: every published page a reader can land on belongs in the pool. That
 * fails the next time too, which a test naming one type would not.
 *
 * Lessons are the deliberate exception. They are reached through their guide,
 * and listing both would put a guide and its six lessons in the same "recently
 * updated" column. `KIND` still carries a `lesson` label, which is dead —
 * left alone here because changing what the hub surfaces is a content decision,
 * not a fix.
 */
describe('the discovery pool', () => {
	it('contains every published page except lessons, whatever its type', () => {
		const pooled = new Set(rabbitPool().map((item) => item.url));
		const missing = publishedContent
			.filter(isIndexable)
			.filter((entry) => entry.frontmatter.type !== 'lesson')
			.map(urlFor)
			.filter((url) => !pooled.has(url));

		expect(missing).toEqual([]);
	});

	it('gives every pooled item a human label rather than a raw type name', () => {
		// A type absent from KIND falls through to the bare string, so a card
		// would read "failure" instead of "Failure mode".
		const raw = rabbitPool().filter((item) => item.kind === item.kind.toLowerCase());
		expect(raw.map((i) => `${i.url} → ${i.kind}`)).toEqual([]);
	});

	it('gives every pooled item a title and a summary to render', () => {
		const empty = rabbitPool()
			.filter((item) => !item.title?.trim() || !item.summary?.trim())
			.map((item) => item.url);
		expect(empty).toEqual([]);
	});
});

describe('relativeDate', () => {
	it('reads the near past in the words a person would use', () => {
		expect(relativeDate('2026-08-12', '2026-08-12')).toBe('today');
		expect(relativeDate('2026-08-11', '2026-08-12')).toBe('yesterday');
		expect(relativeDate('2026-08-09', '2026-08-12')).toBe('3 days ago');
		expect(relativeDate('2026-08-04', '2026-08-12')).toBe('last week');
	});

	it('treats a future date as today rather than counting backwards', () => {
		// `updated` is maintained by hand, so a typo dated next month must not
		// render as "-30 days ago" on a live card.
		expect(relativeDate('2026-09-12', '2026-08-12')).toBe('today');
	});
});
