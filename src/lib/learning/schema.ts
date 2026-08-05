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
import type { TermFrontmatter } from './types';

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

/** Breadcrumbs shared by every hub page. */
export function learningBreadcrumbs(trail: { name: string; path: string }[]) {
	return [
		{ name: 'Home', url: `${SITE}/` },
		{ name: 'Learn', url: `${SITE}/learn` },
		...trail.map((t) => ({ name: t.name, url: `${SITE}${t.path}` }))
	];
}
