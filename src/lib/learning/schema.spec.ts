import { describe, expect, it } from 'vitest';
import { learningBreadcrumbs } from './schema';

describe('learningBreadcrumbs', () => {
	it('always starts at Home then Learn', () => {
		const crumbs = learningBreadcrumbs([{ name: 'Glossary', path: '/learn/glossary' }]);
		expect(crumbs.map((c) => c.name)).toEqual(['Home', 'Learn', 'Glossary']);
	});

	it('drops a crumb that repeats a URL already in the trail', () => {
		// This exact case shipped and broke client-side navigation: a "Compare"
		// crumb pointing at /learn, duplicating the Learn crumb. Breadcrumbs.svelte
		// keys its each block on the URL, so Svelte threw each_key_duplicate —
		// silently during SSR, fatally on the client.
		const crumbs = learningBreadcrumbs([
			{ name: 'Compare', path: '/learn' },
			{ name: 'Cohousing vs ecovillage', path: '/learn/compare/cohousing-vs-ecovillage' }
		]);

		const urls = crumbs.map((c) => c.url);
		expect(new Set(urls).size).toBe(urls.length);
		expect(crumbs.map((c) => c.name)).toEqual(['Home', 'Learn', 'Cohousing vs ecovillage']);
	});

	it('keeps every crumb when the trail is already unique', () => {
		const crumbs = learningBreadcrumbs([
			{ name: 'Glossary', path: '/learn/glossary' },
			{ name: 'Consent', path: '/learn/glossary/consent' }
		]);
		expect(crumbs).toHaveLength(4);
	});
});
