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
import type {
	CompareFrontmatter,
	GuideFrontmatter,
	LessonFrontmatter,
	PathFrontmatter,
	TermFrontmatter,
	TopicFrontmatter
} from './types';

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
 * A guide, plus its lessons as an ordered `ItemList`.
 *
 * Deliberately not `HowTo`: these are explanations of how communities work,
 * not steps that produce a result, and marking them up as instructions would
 * misrepresent them. The lesson order is real information, so it is expressed
 * as an ItemList instead.
 */
export function guideArticle(guide: GuideFrontmatter, lessons: { slug: string; title: string }[]) {
	const url = `${SITE}/learn/guides/${guide.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': url,
		headline: guide.title,
		description: guide.summary,
		url,
		dateModified: guide.updated,
		publisher: PUBLISHER,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		hasPart: {
			'@type': 'ItemList',
			numberOfItems: lessons.length,
			itemListElement: lessons.map((lesson, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: lesson.title,
				url: `${url}/${lesson.slug}`
			}))
		}
	};
}

/** A lesson, tied back to the guide that contains it. */
export function lessonArticle(lesson: LessonFrontmatter, guide: { slug: string; title: string }) {
	const guideUrl = `${SITE}/learn/guides/${guide.slug}`;
	const url = `${guideUrl}/${lesson.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': url,
		headline: lesson.title,
		description: lesson.summary,
		url,
		dateModified: lesson.updated,
		publisher: PUBLISHER,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		isPartOf: {
			'@type': 'Article',
			'@id': guideUrl,
			name: guide.title,
			url: guideUrl
		}
	};
}

/**
 * A learning path as a `Course`.
 *
 * `Course` fits: an ordered sequence of instructional content on one subject.
 * `courseMode: 'online'` and a zero-price offer are stated because Google
 * requires provider, mode and price for course rich results — and all three
 * are simply true here. No `hasCourseInstance` with dates: nothing is
 * scheduled, and inventing a schedule to satisfy a rich result would be
 * misrepresentation.
 */
export function courseSchema(
	path: PathFrontmatter,
	steps: { guide: string; slug: string; title: string }[]
) {
	const url = `${SITE}/learn/paths/${path.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		'@id': url,
		name: path.title,
		description: path.summary,
		url,
		provider: PUBLISHER,
		isAccessibleForFree: true,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', category: 'Free' },
		courseMode: 'online',
		numberOfCredits: 0,
		hasPart: steps.map((step, i) => ({
			'@type': 'LearningResource',
			position: i + 1,
			name: step.title,
			url: `${SITE}/learn/guides/${step.guide}/${step.slug}`
		}))
	};
}

/** A topic page — the hub for one subject. */
export function topicArticle(topic: TopicFrontmatter) {
	const url = `${SITE}/learn/topics/${topic.slug}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': url,
		headline: topic.title,
		description: topic.summary,
		url,
		dateModified: topic.updated,
		isPartOf: { '@type': 'WebSite', name: 'EcoHubs.community', url: SITE },
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
