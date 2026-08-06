/**
 * The Learning Hub's own navigation.
 *
 * Every page in the section shows this list with the current entry marked —
 * in the left rail on desktop, as a tab row on smaller screens. It is the
 * thing that makes `/learn` feel like one place rather than a set of
 * unrelated pages, and the first draft of the rail left it out entirely.
 *
 * Entries appear only when their route exists: never link to a 404.
 */
export interface LearnSection {
	key: string;
	label: string;
	href: string;
}

export const LEARN_SECTIONS: LearnSection[] = [
	{ key: 'hub', label: 'Learning', href: '/learn' },
	{ key: 'guides', label: 'Guides', href: '/learn/guides' },
	{ key: 'topics', label: 'Topics', href: '/learn/topics' },
	{ key: 'paths', label: 'Learning paths', href: '/learn/paths' },
	{ key: 'glossary', label: 'Glossary', href: '/learn/glossary' },
	{ key: 'search', label: 'Search', href: '/learn/search' }
	// Knowledge Map joins this list when /learn/map exists (step 11).
];

/**
 * Which section a path belongs to — longest prefix wins, so a lesson URL
 * resolves to Guides rather than to the hub.
 *
 * `/learn` prefixes every page here, so pages with no section of their own —
 * a comparison, the saved list — fall back to the hub rather than to nothing.
 * That is deliberate: an unmarked nav on a page that plainly sits inside the
 * hub reads as a bug.
 */
export function activeSection(pathname: string): string {
	const match = [...LEARN_SECTIONS]
		.filter((s) => pathname === s.href || pathname.startsWith(`${s.href}/`))
		.sort((a, b) => b.href.length - a.href.length)[0];
	return match?.key ?? '';
}

/**
 * What to put in `aria-current` for a nav entry.
 *
 * `page` asserts that the link points at what you are reading, so it is only
 * right on an exact match; the section merely *containing* the current page
 * gets `true`. Both are styled identically — the distinction is for screen
 * readers, which otherwise announce six pages as "current" across the hub.
 */
export function currentState(
	pathname: string,
	section: LearnSection,
	active: string
): 'page' | 'true' | undefined {
	if (active !== section.key) return undefined;
	return pathname === section.href ? 'page' : 'true';
}
