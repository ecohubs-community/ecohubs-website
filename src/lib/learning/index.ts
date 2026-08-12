/**
 * The Learning Hub index — this is the "database".
 *
 * `import.meta.glob` gives Vite a static list of every content file at build
 * time, so the whole hub resolves to plain objects in memory with no runtime
 * fetch, no server and no database. For ~140 pages this is faster and simpler
 * than a database would be, and a rebuild is the cache invalidation.
 *
 * Everything here is derived once at module load and frozen.
 */
import { building, dev } from '$app/environment';
import type {
	CaseFrontmatter,
	FailureFrontmatter,
	CompareFrontmatter,
	ContentEntry,
	Frontmatter,
	GuideFrontmatter,
	LessonFrontmatter,
	PathFrontmatter,
	TermFrontmatter,
	TopicFrontmatter
} from './types';
import { formatIssues, isIndexable, validateContent } from './validate';
import { coverUrl } from './images';
import { countWords } from './text';
import { extractHeadings } from './headings.js';

/* ── Loading ─────────────────────────────────────────────────────────────── */

// Two globs over the same files: the compiled component, and the raw source
// (for word counts, which drive reading time and the depth gate — computed,
// never hand-authored, because hand-written estimates drift).
const modules = import.meta.glob<{ default: unknown; metadata: Frontmatter }>(
	'/src/content/learning/**/*.md',
	{ eager: true }
);
const sources = import.meta.glob<string>('/src/content/learning/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

/**
 * YAML turns an unquoted `2026-08-05` into a date, which mdsvex then serialises
 * as a full ISO timestamp (`2026-08-05T00:00:00.000Z`). Quoting it in every
 * file would work but is a trap for whoever writes content, so normalise both
 * shapes back to a plain `YYYY-MM-DD` here.
 */
function normalise(fm: Frontmatter, path: string): Frontmatter {
	let out = fm;

	const updated = fm.updated as unknown;
	if (updated instanceof Date) {
		out = { ...out, updated: updated.toISOString().slice(0, 10) };
	} else if (typeof updated === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(updated)) {
		out = { ...out, updated: updated.slice(0, 10) };
	}

	// Resolved once, here, so every consumer of `frontmatter.image` gets a URL
	// rather than each route remembering to resolve it. See `images.ts`.
	if (typeof fm.image === 'string') out = { ...out, image: coverUrl(fm.image, path) };

	return out;
}

const entries: ContentEntry[] = Object.entries(modules).map(([path, module]) => {
	// mdsvex leaves `metadata` undefined when the YAML fails to parse — most
	// often an unquoted value containing ": ", which YAML reads as a nested
	// mapping. Without this the whole index dies on `undefined.updated`, with no
	// clue which of a hundred files is at fault.
	if (!module.metadata) {
		throw new Error(`${path}: frontmatter did not parse. A value containing ": " must be quoted.`);
	}

	return {
		frontmatter: normalise(module.metadata, path),
		component: module.default,
		path,
		words: countWords(sources[path] ?? ''),
		// Kept so anything deriving from the markdown itself — the search index,
		// the visit-questions download — reads the same text the page renders.
		source: sources[path] ?? '',
		headings: extractHeadings(sources[path] ?? '')
	};
});

/* ── Validation ──────────────────────────────────────────────────────────── */

// Runs on every import, so a broken reference fails `npm run build` (all pages
// are prerendered) and shows up immediately in `npm run dev`. In production the
// content is already known-good, because a bad build never shipped.
const issues = validateContent(entries);
if (issues.length > 0 && (building || dev)) {
	throw new Error(formatIssues(issues));
}

/* ── Derived views ───────────────────────────────────────────────────────── */

type Typed<F extends Frontmatter> = ContentEntry<F>;

function ofType<F extends Frontmatter>(type: F['type']): Typed<F>[] {
	return entries.filter((e) => e.frontmatter.type === type) as Typed<F>[];
}

/**
 * Everything, including drafts. Prefer the `published*` accessors — drafts must
 * be filtered in four places (route, listings, sitemap, search index) and doing
 * it at the boundary means no caller can forget.
 */
export const allEntries: readonly ContentEntry[] = Object.freeze(entries);

const published = entries.filter((e) => e.frontmatter.status === 'published');

export const guides = ofType<GuideFrontmatter>('guide');
export const lessons = ofType<LessonFrontmatter>('lesson');
export const topics = ofType<TopicFrontmatter>('topic');
export const comparisons = ofType<CompareFrontmatter>('compare');
export const terms = ofType<TermFrontmatter>('term');
export const paths = ofType<PathFrontmatter>('path');
export const cases = ofType<CaseFrontmatter>('case');
export const failures = ofType<FailureFrontmatter>('failure');

const publishedOf = <F extends Frontmatter>(list: Typed<F>[]) =>
	list.filter((e) => e.frontmatter.status === 'published');

export const publishedGuides = publishedOf(guides);
export const publishedLessons = publishedOf(lessons);
export const publishedTopics = publishedOf(topics);
export const publishedComparisons = publishedOf(comparisons);
export const publishedTerms = publishedOf(terms);
export const publishedPaths = publishedOf(paths);
export const publishedCases = publishedOf(cases);
export const publishedFailures = publishedOf(failures);

/**
 * Every published entry, of every type.
 *
 * Exported so a consumer that must cover *all* content — the sitemap, and
 * `llms.txt` — can group by `type` instead of listing the collections by hand.
 * Hand-listed, `llms.txt` had already missed `case`, a type with no files yet
 * and so no way to notice.
 */
export const publishedContent: ContentEntry[] = published;

/** slug → entry, per type, for O(1) route lookups. */
function bySlug<F extends Frontmatter>(list: Typed<F>[]): ReadonlyMap<string, Typed<F>> {
	return new Map(list.map((e) => [e.frontmatter.slug, e]));
}

export const guideBySlug = bySlug(guides);
export const lessonBySlug = bySlug(lessons);
export const topicBySlug = bySlug(topics);
export const compareBySlug = bySlug(comparisons);
export const termBySlug = bySlug(terms);
export const pathBySlug = bySlug(paths);
export const caseBySlug = bySlug(cases);
export const failureBySlug = bySlug(failures);

/** Lessons of a guide, in author-defined order. */
export function lessonsOfGuide(
	guideSlug: string,
	includeDrafts = false
): Typed<LessonFrontmatter>[] {
	return (includeDrafts ? lessons : publishedLessons)
		.filter((l) => l.frontmatter.guide === guideSlug)
		.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/** Previous/next within a guide, skipping drafts so readers never hit a gap. */
export function guideNeighbours(guideSlug: string, lessonSlug: string) {
	const ordered = lessonsOfGuide(guideSlug);
	const i = ordered.findIndex((l) => l.frontmatter.slug === lessonSlug);
	return {
		previous: i > 0 ? ordered[i - 1] : null,
		next: i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null
	};
}

/** Everything that sits under a topic, for the topic page. */
export function contentOfTopic(topicSlug: string) {
	const inTopic = <F extends Frontmatter>(list: Typed<F>[]) =>
		list.filter((e) => (e.frontmatter as { topic?: string }).topic === topicSlug);
	return {
		guides: inTopic(publishedGuides),
		comparisons: inTopic(publishedComparisons),
		terms: inTopic(publishedTerms),
		cases: inTopic(publishedCases)
	};
}

/**
 * Reverse index: which pages use a given glossary term.
 *
 * Built from `terms:` frontmatter, so a term page can honestly list where it is
 * used without anyone maintaining that list by hand.
 */
export const termUsage: ReadonlyMap<string, ContentEntry[]> = (() => {
	const map = new Map<string, ContentEntry[]>();
	for (const entry of published) {
		for (const term of (entry.frontmatter as { terms?: string[] }).terms ?? []) {
			if (!map.has(term)) map.set(term, []);
			map.get(term)!.push(entry);
		}
	}
	return map;
})();

/**
 * slug → one-line definition, for `<Gloss>` tooltips.
 *
 * Includes drafts deliberately: a lesson may reference a term whose page is not
 * finished, and showing the definition is better than showing nothing. The
 * *link* is what respects publication status.
 */
export const termDefinitions: ReadonlyMap<
	string,
	{ term: string; short: string; published: boolean }
> = new Map(
	terms.map((t) => [
		t.frontmatter.slug,
		{
			term: t.frontmatter.term,
			short: t.frontmatter.short,
			published: t.frontmatter.status === 'published'
		}
	])
);

/* ── Helpers shared with routes and the sitemap ──────────────────────────── */

export { isIndexable };

/** Canonical path for any entry. Single source of truth for URL shape. */
export function urlFor(entry: ContentEntry): string {
	const fm = entry.frontmatter;
	switch (fm.type) {
		case 'guide':
			return `/learn/guides/${fm.slug}`;
		case 'lesson':
			return `/learn/guides/${fm.guide}/${fm.slug}`;
		case 'topic':
			return `/learn/topics/${fm.slug}`;
		case 'compare':
			return `/learn/compare/${fm.slug}`;
		case 'term':
			return `/learn/glossary/${fm.slug}`;
		case 'path':
			return `/learn/paths/${fm.slug}`;
		case 'case':
			return `/learn/cases/${fm.slug}`;
		case 'failure':
			return `/learn/failures/${fm.slug}`;
	}
}

/** Reading time in minutes at 200 wpm, floor of 1. */
export function readingMinutes(entry: ContentEntry): number {
	return Math.max(1, Math.round(entry.words / 200));
}

/**
 * Everything that belongs in the sitemap: published, substantial, and never
 * the personal or empty-for-crawlers routes.
 */
export function sitemapEntries(): { url: string; lastmod: string }[] {
	return published
		.filter(isIndexable)
		.map((e) => ({ url: urlFor(e), lastmod: e.frontmatter.updated }))
		.sort((a, b) => a.url.localeCompare(b.url));
}

/** Surfaced for a build-time report; the throw above is the real gate. */
export const validationIssues = issues;
