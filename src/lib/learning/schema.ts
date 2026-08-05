/**
 * JSON-LD for Learning Hub content.
 *
 * `DefinedTermSet` / `DefinedTerm` is the strongest structured-data
 * opportunity in the hub: well supported, and almost unused in this field. A
 * glossary marked up this way is exactly the shape an AI assistant quotes.
 *
 * Only facts the page actually states are asserted here — the same rule
 * applied to the VoteCast and CSI schema.
 */
import type { CompareFrontmatter, TermFrontmatter } from './types';

const SITE = 'https://ecohubs.community';
const GLOSSARY_URL = `${SITE}/learn/glossary`;

const PUBLISHER = {
	'@type': 'Organization',
	name: 'EcoHubs.community',
	url: SITE
} as const;

/** The glossary as a whole. */
export function definedTermSet(terms: TermFrontmatter[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		'@id': GLOSSARY_URL,
		name: 'EcoHubs Glossary',
		description:
			'Plain definitions of the words used in intentional communities, ecovillages and community governance.',
		url: GLOSSARY_URL,
		publisher: PUBLISHER,
		hasDefinedTerm: terms.map((t) => ({
			'@type': 'DefinedTerm',
			'@id': `${SITE}/learn/glossary/${t.slug}`,
			name: t.term,
			description: t.short,
			url: `${SITE}/learn/glossary/${t.slug}`
		}))
	};
}

/** A single entry. `inDefinedTermSet` is what ties it back to the glossary. */
export function definedTerm(term: TermFrontmatter) {
	const url = `${SITE}/learn/glossary/${term.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'DefinedTerm',
		'@id': url,
		name: term.term,
		description: term.short,
		url,
		inDefinedTermSet: {
			'@type': 'DefinedTermSet',
			'@id': GLOSSARY_URL,
			name: 'EcoHubs Glossary',
			url: GLOSSARY_URL
		},
		publisher: PUBLISHER
	};
}

/**
 * A comparison page.
 *
 * Plain `Article` rather than anything cleverer: schema.org has no comparison
 * type, and the value here comes from the `<table>` in the body being real
 * markup that a snippet or an AI answer can extract — not from the JSON-LD.
 */
export function comparisonArticle(compare: CompareFrontmatter) {
	const url = `${SITE}/learn/compare/${compare.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': url,
		headline: compare.title,
		description: compare.summary,
		url,
		dateModified: compare.updated,
		isPartOf: {
			'@type': 'WebSite',
			name: 'EcoHubs.community',
			url: SITE
		},
		publisher: PUBLISHER,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url }
	};
}

/**
 * Breadcrumbs shared by every hub page.
 *
 * Deduplicated by URL, keeping the first occurrence. A repeated URL is always a
 * mistake — an intermediate crumb pointing at a section index that does not
 * exist — and it has two consequences worth guarding against: `Breadcrumbs.svelte`
 * keys its `each` on the URL, so a duplicate throws `each_key_duplicate` and
 * kills client-side navigation to that page, and the BreadcrumbList schema
 * would claim the same URL sits at two positions in the trail.
 */
export function learningBreadcrumbs(trail: { name: string; path: string }[]) {
	const crumbs = [
		{ name: 'Home', url: `${SITE}/` },
		{ name: 'Learn', url: `${SITE}/learn` },
		...trail.map((t) => ({ name: t.name, url: `${SITE}${t.path}` }))
	];

	const seen = new Set<string>();
	return crumbs.filter((crumb) => {
		if (seen.has(crumb.url)) return false;
		seen.add(crumb.url);
		return true;
	});
}
