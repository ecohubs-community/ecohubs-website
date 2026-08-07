import { describe, expect, it } from 'vitest';
import { coverUrl, resolveCover } from './images';

const BUNDLED = {
	'/src/lib/assets/learning/learning-paths/join-community.webp':
		'/assets/join-community.abc123.webp',
	'/src/lib/assets/learning/guides/foo.png': '/assets/foo.def456.png'
};

describe('resolveCover', () => {
	it('leaves a page with no cover alone', () => {
		expect(resolveCover(undefined, BUNDLED, 'a.md')).toBeUndefined();
	});

	it('resolves a bundled name to its hashed URL', () => {
		expect(resolveCover('learning-paths/join-community.webp', BUNDLED, 'a.md')).toBe(
			'/assets/join-community.abc123.webp'
		);
	});

	it('accepts the source path spelled out, either way', () => {
		const expected = '/assets/join-community.abc123.webp';
		expect(
			resolveCover('$lib/assets/learning/learning-paths/join-community.webp', BUNDLED, 'a.md')
		).toBe(expected);
		expect(
			resolveCover('src/lib/assets/learning/learning-paths/join-community.webp', BUNDLED, 'a.md')
		).toBe(expected);
	});

	/** The pre-existing convention, which must keep working. */
	it('passes an absolute static path through untouched', () => {
		expect(resolveCover('/learning/foo.webp', BUNDLED, 'a.md')).toBe('/learning/foo.webp');
	});

	it('passes external and inlined images through untouched', () => {
		expect(resolveCover('https://example.com/a.jpg', BUNDLED, 'a.md')).toBe(
			'https://example.com/a.jpg'
		);
		expect(resolveCover('data:image/gif;base64,R0lGOD', BUNDLED, 'a.md')).toBe(
			'data:image/gif;base64,R0lGOD'
		);
	});

	/**
	 * The whole reason this throws rather than returning undefined: a missing
	 * cover on a prerendered page is silent, and stays broken.
	 */
	it('throws for a name that matches nothing, naming the file and the options', () => {
		expect(() => resolveCover('nope.webp', BUNDLED, 'paths/looking-to-join.md')).toThrow(
			/looking-to-join\.md.*nope\.webp/s
		);
		expect(() => resolveCover('nope.webp', BUNDLED, 'a.md')).toThrow(
			/learning-paths\/join-community\.webp/
		);
	});

	it('does not match a name that only ends the same way', () => {
		expect(() => resolveCover('join-community.webp', BUNDLED, 'a.md')).toThrow();
	});
});

describe('coverUrl, against the real asset directory', () => {
	/**
	 * Asserts the shape rather than a filename: enhanced-img hashes the output,
	 * so there is no join-community in the URL to match on.
	 */
	it('resolves the path cover to a responsive picture', () => {
		const picture = coverUrl('learning-paths/join-community.webp', 'paths/looking-to-join.md');
		expect(typeof picture).toBe('object');

		const { img, sources } = picture as {
			img: { src: string; w: number; h: number };
			sources: Record<string, string>;
		};
		expect(img.src).toBeTruthy();
		expect(img.w).toBeGreaterThan(0);
		expect(img.h).toBeGreaterThan(0);
		// The point of routing covers through enhanced-img at all: a modern
		// format alongside a fallback. The exact descriptors imagetools emits
		// depend on the source width, so they are not asserted here.
		expect(Object.keys(sources)).toContain('avif');
		expect(Object.keys(sources)).toContain('webp');
		expect(sources.avif).toBeTruthy();
	});

	it('leaves a static path a plain string, so Cover renders a plain img', () => {
		expect(coverUrl('/learning/foo.webp', 'a.md')).toBe('/learning/foo.webp');
	});
});
