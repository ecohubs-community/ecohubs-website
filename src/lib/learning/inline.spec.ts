import { describe, expect, it } from 'vitest';
import { isExternal, parseInline } from './inline';

describe('parseInline', () => {
	it('leaves plain text alone', () => {
		expect(parseInline('Yes, and it stays free.')).toEqual([
			{ kind: 'text', text: 'Yes, and it stays free.' }
		]);
	});

	it('splits a link out of the sentence around it', () => {
		expect(
			parseInline('See [how this is written](/learn/how-this-is-written) for the detail.')
		).toEqual([
			{ kind: 'text', text: 'See ' },
			{ kind: 'link', text: 'how this is written', href: '/learn/how-this-is-written' },
			{ kind: 'text', text: ' for the detail.' }
		]);
	});

	it('handles a link at either end without emitting empty text', () => {
		expect(parseInline('[Start here](/learn)')).toEqual([
			{ kind: 'link', text: 'Start here', href: '/learn' }
		]);
		expect(parseInline('[a](/x) then [b](/y)')).toEqual([
			{ kind: 'link', text: 'a', href: '/x' },
			{ kind: 'text', text: ' then ' },
			{ kind: 'link', text: 'b', href: '/y' }
		]);
	});

	/**
	 * A bare path is left as text on purpose. Auto-linking would guess, and the
	 * fix for a bare URL in prose is to give it words, not a link.
	 */
	it('does not touch a bare URL or path', () => {
		const value = 'It is set out at /learn/how-this-is-written in full.';
		expect(parseInline(value)).toEqual([{ kind: 'text', text: value }]);
	});

	it('leaves unmatched brackets as literal text', () => {
		expect(parseInline('An aside [like this] stays.')).toEqual([
			{ kind: 'text', text: 'An aside [like this] stays.' }
		]);
	});

	it('reassembles to something with no markup left over', () => {
		const segments = parseInline('Read [the note](/a) and [the other](/b) too.');
		expect(segments.map((s) => s.text).join('')).toBe('Read the note and the other too.');
	});
});

describe('isExternal', () => {
	it('tells a site path from an outside link', () => {
		expect(isExternal('/learn/how-this-is-written')).toBe(false);
		expect(isExternal('https://www.ic.org/')).toBe(true);
	});
});
