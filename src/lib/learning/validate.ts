/**
 * Build-time validation for Learning Hub content.
 *
 * Without a database there is no referential integrity, so this is the
 * substitute: a `guide:` pointing at nothing, a `terms:` entry with no
 * glossary file, a duplicate `order` — all should break the build, not render
 * a dead link. `index.ts` calls this eagerly, so `npm run build` fails loudly.
 *
 * Deliberately pure: it takes already-parsed entries and returns issues, so it
 * can be unit-tested without touching the filesystem or Vite.
 */
import type {
	ContentEntry,
	Frontmatter,
	LessonFrontmatter,
	PathFrontmatter,
	ValidationIssue
} from './types';
import { CONTENT_TYPES } from './types';
import { CLUSTER_KEYS } from './clusters';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
/** `<category>/<slug>` under `/articles/rcos-stress-tests/`. */
const RCOS_TEST_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Minimum body length before a piece may be indexed — see `isIndexable`. */
export const MIN_WORDS = {
	term: 250,
	lesson: 900,
	topic: 600,
	compare: 800,
	case: 800,
	guide: 200, // a guide is mostly its lessons
	// Deliberately the shortest prose type. A failure page is a catalogue entry
	// meant to be read mid-crisis, and padding one to lesson length would make
	// it worse at its job — but under this it is a stub, not an entry.
	failure: 400,
	path: 0 // curation only, no prose
} as const;

/**
 * Whether a published piece is substantial enough to index.
 *
 * Mirrors `MIN_POSTS_FOR_INDEXABLE_TAG` on the blog: thin pages stay reachable
 * for readers but are marked `noindex` and kept out of the sitemap. One helper
 * drives both so page meta and sitemap can never disagree.
 */
export function isIndexable(entry: ContentEntry): boolean {
	const fm = entry.frontmatter;
	if (fm.status !== 'published') return false;
	if (entry.words < MIN_WORDS[fm.type]) return false;
	// A term without its one-line definition is unusable in tooltips and schema.
	if (fm.type === 'term' && !fm.short?.trim()) return false;
	return true;
}

function checkBase(fm: Frontmatter, path: string, issues: ValidationIssue[]) {
	// Without a cluster a topic cannot be placed on the knowledge map. Required
	// rather than defaulted: a silent default puts new topics in the wrong group,
	// and a wrong group is harder to notice than a missing one.
	if (fm.type === 'topic') {
		if (!fm.cluster) {
			issues.push({ path, message: 'topic is missing "cluster"' });
		} else if (!CLUSTER_KEYS.includes(fm.cluster)) {
			issues.push({
				path,
				message: `unknown cluster "${fm.cluster}" — expected one of ${CLUSTER_KEYS.join(', ')}`
			});
		}
	}

	/**
	 * A failure page has to be able to point at its evidence.
	 *
	 * The whole claim of the catalogue is that these are *documented* patterns
	 * rather than a list of things that sound plausible, and the difference
	 * between those two is a citation. So `rcos` is required, and shaped:
	 * `<category>/<slug>` under `/articles/rcos-stress-tests/`.
	 *
	 * `none` is the deliberate exception — a pattern RCOS does not catalogue.
	 * Spelling it out is the point: it makes "RCOS has no test for this" a
	 * statement an author had to write, rather than a field they left blank.
	 */
	if (fm.type === 'failure') {
		const failure = fm as unknown as {
			rcos?: string;
			lesson?: string;
			layer?: number;
			signs?: string[];
		};

		if (!failure.rcos) {
			issues.push({ path, message: 'failure is missing "rcos" (use "none" if RCOS has no test)' });
		} else if (failure.rcos !== 'none' && !RCOS_TEST_RE.test(failure.rcos)) {
			issues.push({
				path,
				message: `rcos "${failure.rcos}" must be "<category>/<slug>" or "none"`
			});
		}

		if (!failure.lesson) issues.push({ path, message: 'failure is missing "lesson"' });
		if (typeof failure.layer !== 'number') {
			issues.push({ path, message: 'failure is missing "layer" (RCOS Core layer, 0–6)' });
		} else if (failure.layer < 0 || failure.layer > 6) {
			issues.push({ path, message: `layer ${failure.layer} is outside RCOS Core's 0–6` });
		}

		// The listing and the printed appendix both render these; one sign is a
		// heading, not a diagnostic.
		if (!failure.signs?.length) {
			issues.push({ path, message: 'failure is missing "signs"' });
		} else if (failure.signs.length < 3) {
			issues.push({
				path,
				message: `failure has ${failure.signs.length} sign(s) — at least 3 make it diagnosable`
			});
		}
	}

	// A cover carries meaning often enough that a blank alt has to be a choice,
	// not an oversight — so say so explicitly by writing `imageAlt: ''`.
	if (fm.image && fm.imageAlt === undefined) {
		issues.push({ path, message: '"image" is set but "imageAlt" is missing' });
	}

	if (!CONTENT_TYPES.includes(fm.type)) {
		issues.push({ path, message: `unknown type "${fm.type}"` });
	}
	for (const field of ['title', 'slug', 'summary', 'status', 'updated'] as const) {
		if (!fm[field]) issues.push({ path, message: `missing required field "${field}"` });
	}
	if (fm.slug && !SLUG_RE.test(fm.slug)) {
		issues.push({ path, message: `slug "${fm.slug}" must be lowercase kebab-case` });
	}
	if (fm.updated && !DATE_RE.test(fm.updated)) {
		issues.push({ path, message: `updated "${fm.updated}" must be YYYY-MM-DD` });
	}
	if (fm.status && fm.status !== 'draft' && fm.status !== 'published') {
		issues.push({ path, message: `status must be "draft" or "published", got "${fm.status}"` });
	}
}

/**
 * Validate a whole content set.
 *
 * References are checked against *all* entries, not just published ones: a
 * lesson may legitimately point at a term that is still in draft, and we want
 * that to be a working link the day the term publishes — not a build failure
 * today and a silent dead link later.
 */
export function validateContent(entries: ContentEntry[]): ValidationIssue[] {
	const issues: ValidationIssue[] = [];
	const byType = new Map<string, Set<string>>();
	const seen = new Map<string, string>(); // "type:slug" -> path

	for (const entry of entries) {
		const { frontmatter: fm, path } = entry;
		checkBase(fm, path, issues);

		const key = `${fm.type}:${fm.slug}`;
		const previous = seen.get(key);
		if (previous) {
			issues.push({
				path,
				message: `duplicate ${fm.type} slug "${fm.slug}" (also in ${previous})`
			});
		} else {
			seen.set(key, path);
		}

		if (!byType.has(fm.type)) byType.set(fm.type, new Set());
		byType.get(fm.type)!.add(fm.slug);
	}

	const has = (type: string, slug: string) => byType.get(type)?.has(slug) ?? false;

	// Cross-references, once every slug is known.
	for (const entry of entries) {
		const { frontmatter: fm, path } = entry;

		for (const term of (fm as { terms?: string[] }).terms ?? []) {
			if (!has('term', term)) {
				issues.push({ path, message: `terms: references unknown glossary term "${term}"` });
			}
		}

		if ('topic' in fm && fm.topic && !has('topic', fm.topic)) {
			issues.push({ path, message: `topic: references unknown topic "${fm.topic}"` });
		}

		if (fm.type === 'lesson') {
			if (!has('guide', fm.guide)) {
				issues.push({ path, message: `guide: references unknown guide "${fm.guide}"` });
			}
			if (!Number.isInteger(fm.order) || fm.order < 1) {
				issues.push({ path, message: `order must be a positive integer, got ${fm.order}` });
			}
		}

		if (fm.type === 'path') {
			if (!Array.isArray(fm.steps) || fm.steps.length === 0) {
				issues.push({ path, message: 'path has no steps' });
			}
			for (const [i, step] of (fm.steps ?? []).entries()) {
				if (!has('guide', step.guide)) {
					issues.push({ path, message: `step ${i + 1}: unknown guide "${step.guide}"` });
				}
				if (!has('lesson', step.lesson)) {
					issues.push({ path, message: `step ${i + 1}: unknown lesson "${step.lesson}"` });
				}
			}
		}

		// `related` may point at any content type, so accept a match anywhere.
		for (const rel of (fm as { related?: string[] }).related ?? []) {
			const found = [...byType.values()].some((slugs) => slugs.has(rel));
			if (!found) issues.push({ path, message: `related: references unknown slug "${rel}"` });
		}
	}

	// Lesson ordering must be unique within a guide, or prev/next is ambiguous.
	const lessonsByGuide = new Map<string, Map<number, string>>();
	for (const entry of entries) {
		if (entry.frontmatter.type !== 'lesson') continue;
		const fm = entry.frontmatter as LessonFrontmatter;
		if (!lessonsByGuide.has(fm.guide)) lessonsByGuide.set(fm.guide, new Map());
		const orders = lessonsByGuide.get(fm.guide)!;
		const clash = orders.get(fm.order);
		if (clash) {
			issues.push({
				path: entry.path,
				message: `order ${fm.order} already used in guide "${fm.guide}" by ${clash}`
			});
		} else {
			orders.set(fm.order, entry.path);
		}
	}

	/**
	 * Two pages competing for the same search term.
	 *
	 * The Keyword Map's governing rule is "one primary term per page, and no
	 * page competes with another" — when several target the same phrase, Google
	 * picks one and the rest dilute it. The map was written before the hub
	 * existed and its guardrails only cover hub-vs-marketing-page collisions, so
	 * nothing was watching the hub's own pages: five had drifted into duplicates,
	 * every one of them a topic and its twin lesson.
	 *
	 * Drafts are excluded — an unpublished page competes for nothing, and a
	 * rewrite in progress should not fail the build. `isIndexable` is the same
	 * gate the sitemap uses, so this asks exactly the question that matters:
	 * of the pages Google can see, do any two want the same query?
	 */
	const byQuery = new Map<string, string>();
	for (const entry of entries) {
		// Internal runs collapse as well as trimming, because mdsvex's YAML keeps
		// them: `targetQuery: intentional  community` reaches us with both spaces
		// intact, and a check that treats that as a different term from the
		// single-spaced one is a check a typo walks straight through.
		const query = entry.frontmatter.targetQuery?.trim().toLowerCase().replace(/\s+/g, ' ');
		if (!query || !isIndexable(entry)) continue;

		const previous = byQuery.get(query);
		if (previous) {
			issues.push({
				path: entry.path,
				message: `targetQuery "${query}" is already claimed by ${previous} — two indexable pages competing for one term`
			});
		} else {
			byQuery.set(query, entry.path);
		}
	}

	// A published path whose steps are all drafts would render as an empty
	// sequence — worth catching, since it looks fine in the source.
	const publishedLessons = new Set(
		entries
			.filter((e) => e.frontmatter.type === 'lesson' && e.frontmatter.status === 'published')
			.map((e) => e.frontmatter.slug)
	);
	for (const entry of entries) {
		if (entry.frontmatter.type !== 'path' || entry.frontmatter.status !== 'published') continue;
		const fm = entry.frontmatter as PathFrontmatter;
		if ((fm.steps ?? []).length && !fm.steps.some((s) => publishedLessons.has(s.lesson))) {
			issues.push({ path: entry.path, message: 'published path has no published lessons' });
		}
	}

	return issues;
}

/** Format issues into one readable error message for a failed build. */
export function formatIssues(issues: ValidationIssue[]): string {
	const lines = issues.map((i) => `  ${i.path}\n    → ${i.message}`);
	return `Learning Hub content is invalid (${issues.length} issue${
		issues.length === 1 ? '' : 's'
	}):\n\n${lines.join('\n')}\n`;
}
