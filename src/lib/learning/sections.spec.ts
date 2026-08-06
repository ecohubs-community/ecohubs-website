import { describe, expect, it } from 'vitest';
import { LEARN_SECTIONS, activeSection, currentState } from './sections';

const section = (key: string) => LEARN_SECTIONS.find((s) => s.key === key)!;

describe('activeSection', () => {
	it('marks each section on its own index page', () => {
		const wrong = LEARN_SECTIONS.filter((s) => activeSection(s.href) !== s.key);
		expect(wrong.map((s) => s.href)).toEqual([]);
	});

	it('resolves a nested page to its section, not the hub', () => {
		expect(activeSection('/learn/topics/intentional-communities')).toBe('topics');
		expect(activeSection('/learn/guides/a/b')).toBe('guides');
		expect(activeSection('/learn/glossary/consent')).toBe('glossary');
	});

	it('falls back to the hub for pages with no section of their own', () => {
		expect(activeSection('/learn/compare/cohousing-vs-ecovillage')).toBe('hub');
		expect(activeSection('/learn/saved')).toBe('hub');
	});

	/** Search has a field in the rail and a tab of its own, so no section
	 *  should light up there. */
	it('marks no section on the search page', () => {
		expect(activeSection('/learn/search')).toBe('');
	});

	it('excludes search from the section list', () => {
		expect(LEARN_SECTIONS.map((s) => s.href)).not.toContain('/learn/search');
	});

	it('does not match a path that merely shares a prefix', () => {
		expect(activeSection('/learning')).toBe('');
		expect(activeSection('/learn/topicsomething')).toBe('hub');
	});
});

describe('currentState', () => {
	it('says "page" only when the link is the page you are on', () => {
		expect(currentState('/learn/topics', section('topics'), 'topics')).toBe('page');
	});

	it('says "true" for the section containing the page', () => {
		expect(currentState('/learn/topics/intentional-communities', section('topics'), 'topics')).toBe(
			'true'
		);
	});

	it('marks exactly one entry, whatever the page', () => {
		const paths = [
			'/learn',
			'/learn/topics',
			'/learn/topics/intentional-communities',
			'/learn/guides/a/b',
			'/learn/saved',
			'/learn/compare/x'
		];
		const counts = paths.map((p) => {
			const active = activeSection(p);
			return LEARN_SECTIONS.filter((s) => currentState(p, s, active)).length;
		});
		expect(counts).toEqual(paths.map(() => 1));
	});

	it('leaves unrelated entries unmarked', () => {
		expect(currentState('/learn/topics', section('guides'), 'topics')).toBeUndefined();
	});
});

describe('LEARN_SECTIONS', () => {
	it('has unique keys and hrefs', () => {
		expect(new Set(LEARN_SECTIONS.map((s) => s.key)).size).toBe(LEARN_SECTIONS.length);
		expect(new Set(LEARN_SECTIONS.map((s) => s.href)).size).toBe(LEARN_SECTIONS.length);
	});

	/** The prerenderer turns a link to a route that does not exist into a build
	 *  failure, which is how /learn/search first showed up. */
	it('points only at routes that exist', async () => {
		const { existsSync } = await import('node:fs');
		const missing = LEARN_SECTIONS.filter(
			(s) => !existsSync(`src/routes/(web)${s.href}/+page.svelte`)
		);
		expect(missing.map((s) => s.href)).toEqual([]);
	});
});
