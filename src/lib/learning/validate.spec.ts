import { describe, expect, it } from 'vitest';
import { formatIssues, isIndexable, MIN_WORDS, validateContent } from './validate';
import type { ContentEntry, Frontmatter } from './types';
import { CLUSTER_KEYS, type ClusterKey } from './clusters';

/** Build an entry without touching the filesystem — validation is pure. */
function entry(frontmatter: Partial<Frontmatter> & { type: Frontmatter['type'] }, words = 5000) {
	return {
		frontmatter: {
			title: 'T',
			slug: 's',
			summary: 'S',
			status: 'published',
			updated: '2026-08-05',
			...frontmatter
		},
		component: null,
		path: `/src/content/learning/${frontmatter.type}/${frontmatter.slug ?? 's'}.md`,
		words
	} as ContentEntry;
}

const topic = (slug: string) => entry({ type: 'topic', slug, cluster: 'culture' });
const term = (slug: string, topicSlug = 'a-topic') =>
	entry({ type: 'term', slug, term: slug, topic: topicSlug, short: 'A definition.' });

describe('validateContent — required fields', () => {
	it('reports a missing required field', () => {
		const issues = validateContent([
			entry({ type: 'topic', slug: 'x', cluster: 'culture', title: undefined })
		]);
		expect(issues.some((i) => i.message.includes('"title"'))).toBe(true);
	});

	it('rejects a non-kebab-case slug', () => {
		const issues = validateContent([
			entry({ type: 'topic', slug: 'Not_Kebab', cluster: 'culture' })
		]);
		expect(issues.some((i) => i.message.includes('kebab-case'))).toBe(true);
	});

	it('rejects a malformed date', () => {
		const issues = validateContent([
			entry({ type: 'topic', slug: 'x', cluster: 'culture', updated: '5 Aug 2026' })
		]);
		expect(issues.some((i) => i.message.includes('YYYY-MM-DD'))).toBe(true);
	});

	it('accepts a well-formed entry', () => {
		expect(validateContent([topic('a-topic')])).toEqual([]);
	});
});

describe('validateContent — references', () => {
	it('catches a lesson pointing at a guide that does not exist', () => {
		const issues = validateContent([
			entry({ type: 'lesson', slug: 'l1', guide: 'ghost-guide', order: 1 })
		]);
		expect(issues.some((i) => i.message.includes('unknown guide "ghost-guide"'))).toBe(true);
	});

	it('catches a terms: entry with no glossary file', () => {
		const issues = validateContent([
			topic('a-topic'),
			entry({ type: 'topic', slug: 'b', terms: ['nope'] })
		]);
		expect(issues.some((i) => i.message.includes('unknown glossary term "nope"'))).toBe(true);
	});

	it('catches an unknown topic reference', () => {
		const issues = validateContent([term('consent', 'missing-topic')]);
		expect(issues.some((i) => i.message.includes('unknown topic "missing-topic"'))).toBe(true);
	});

	it('catches a path step pointing at a missing lesson', () => {
		const issues = validateContent([
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			topic('t'),
			entry({
				type: 'path',
				slug: 'p',
				status: 'draft',
				steps: [{ guide: 'g', lesson: 'not-a-lesson' }]
			})
		]);
		expect(issues.some((i) => i.message.includes('unknown lesson "not-a-lesson"'))).toBe(true);
	});

	it('allows a reference to a draft term — it will resolve when published', () => {
		const draftTerm = entry({
			type: 'term',
			slug: 'consent',
			term: 'Consent',
			topic: 't',
			short: 'x',
			status: 'draft'
		});
		const issues = validateContent([
			topic('t'),
			draftTerm,
			entry({ type: 'topic', slug: 'b', cluster: 'culture', terms: ['consent'] })
		]);
		expect(issues).toEqual([]);
	});
});

describe('validateContent — structural rules', () => {
	it('catches duplicate slugs of the same type', () => {
		const issues = validateContent([topic('same'), topic('same')]);
		expect(issues.some((i) => i.message.includes('duplicate topic slug'))).toBe(true);
	});

	it('allows the same slug across different types', () => {
		// A guide and its topic legitimately share a slug.
		const issues = validateContent([
			topic('intentional-communities'),
			entry({ type: 'guide', slug: 'intentional-communities', topic: 'intentional-communities' })
		]);
		expect(issues).toEqual([]);
	});

	it('catches two lessons claiming the same order in one guide', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1 }),
			entry({ type: 'lesson', slug: 'l2', guide: 'g', order: 1 })
		]);
		expect(issues.some((i) => i.message.includes('order 1 already used'))).toBe(true);
	});

	it('allows the same order in different guides', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g1', topic: 't' }),
			entry({ type: 'guide', slug: 'g2', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g1', order: 1 }),
			entry({ type: 'lesson', slug: 'l2', guide: 'g2', order: 1 })
		]);
		expect(issues).toEqual([]);
	});

	it('catches a published path whose steps are all drafts', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1, status: 'draft' }),
			entry({ type: 'path', slug: 'p', steps: [{ guide: 'g', lesson: 'l1' }] })
		]);
		expect(issues.some((i) => i.message.includes('no published steps'))).toBe(true);
	});

	/**
	 * A symptom-led path is mostly failure modes rather than lessons, so a step
	 * may reference one directly. These pin the two shapes and the ways of
	 * getting a step wrong — the reason the schema uses optional fields plus a
	 * validator rather than a union.
	 */
	const failurePage = (slug: string, status = 'published') =>
		entry({
			type: 'failure',
			slug,
			lesson: 'l1',
			layer: 2,
			rcos: 'governance-power/x',
			signs: ['a', 'b', 'c'],
			status
		} as never);

	it('accepts a step that references a failure mode', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1 }),
			failurePage('f1'),
			entry({ type: 'path', slug: 'p', steps: [{ failure: 'f1' }] })
		]);
		expect(issues).toEqual([]);
	});

	it('reports a step referencing a failure mode that does not exist', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'path', slug: 'p', steps: [{ failure: 'nope' }] })
		]);
		expect(issues.some((i) => i.message.includes('unknown failure mode "nope"'))).toBe(true);
	});

	it('reports a step that is neither a lesson nor a failure mode', () => {
		const issues = validateContent([topic('t'), entry({ type: 'path', slug: 'p', steps: [{}] })]);
		expect(issues.some((i) => i.message.includes('needs either'))).toBe(true);
	});

	/**
	 * A failure names its lesson, and a typo used to publish silently: the page
	 * built and rendered, while `failuresOfGuide()` — which matches on the
	 * lesson slug — dropped it from the guide's appendix and its checklist.
	 */
	it('reports a failure whose lesson does not exist', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1 }),
			entry({
				type: 'failure',
				slug: 'f1',
				lesson: 'l-typo',
				layer: 2,
				rcos: 'governance-power/x',
				signs: ['a', 'b', 'c']
			} as never)
		]);
		expect(issues.some((i) => i.message.includes('lesson "l-typo" does not exist'))).toBe(true);
	});

	/**
	 * `signs: warning` is a string, and a string has a truthy `.length` of 7 —
	 * so a count check passed it and `failureArticle()` then mapped over the
	 * characters. The shape has to be established before the size means
	 * anything.
	 */
	it('reports signs written as a scalar rather than a list', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1 }),
			entry({
				type: 'failure',
				slug: 'f1',
				lesson: 'l1',
				layer: 2,
				rcos: 'governance-power/x',
				signs: 'warning'
			} as never)
		]);
		expect(issues.some((i) => i.message.includes('"signs" must be a list'))).toBe(true);
	});

	/**
	 * Steps are keyed by type as well as slug. With bare slugs a published
	 * lesson vouched for a draft failure that happened to share its name, so a
	 * path with one unwalkable step looked fine.
	 */
	it('does not let a published lesson vouch for a draft failure of the same slug', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'same', guide: 'g', order: 1 }),
			failurePage('same', 'draft'),
			entry({ type: 'path', slug: 'p', steps: [{ failure: 'same' }] })
		]);
		expect(issues.some((i) => i.message.includes('no published steps'))).toBe(true);
	});

	it('reports a step that is both at once', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'path', slug: 'p', steps: [{ guide: 'g', lesson: 'l1', failure: 'f1' }] })
		]);
		expect(issues.some((i) => i.message.includes('has both'))).toBe(true);
	});

	it('counts a published failure mode as a walkable step', () => {
		const issues = validateContent([
			topic('t'),
			entry({ type: 'guide', slug: 'g', topic: 't' }),
			entry({ type: 'lesson', slug: 'l1', guide: 'g', order: 1, status: 'draft' }),
			failurePage('f1'),
			entry({ type: 'path', slug: 'p', steps: [{ guide: 'g', lesson: 'l1' }, { failure: 'f1' }] })
		]);
		expect(issues.some((i) => i.message.includes('no published steps'))).toBe(false);
	});
});

/**
 * The Keyword Map's rule — one primary term per page — had nothing enforcing it
 * inside the hub, and five pairs had drifted into competing for the same query.
 */
describe('validateContent — targetQuery collisions', () => {
	const targeting = (slug: string, targetQuery: string, status = 'published') =>
		entry({ type: 'topic', slug, cluster: 'culture', targetQuery, status } as never);

	it('reports two indexable pages competing for one term', () => {
		const issues = validateContent([
			targeting('a', 'why do intentional communities fail'),
			targeting('b', 'why do intentional communities fail')
		]);
		expect(issues.some((i) => i.message.includes('already claimed by'))).toBe(true);
	});

	it('names the page that claimed it first, so the fix is obvious', () => {
		const issues = validateContent([
			targeting('first', 'shared query'),
			targeting('second', 'shared query')
		]);
		const clash = issues.find((i) => i.message.includes('already claimed by'));
		expect(clash?.path).toContain('second');
		expect(clash?.message).toContain('first');
	});

	it('ignores case and surrounding whitespace', () => {
		const issues = validateContent([
			targeting('a', 'Community Governance'),
			targeting('b', '  community governance  ')
		]);
		expect(issues.some((i) => i.message.includes('already claimed by'))).toBe(true);
	});

	/**
	 * mdsvex's YAML preserves internal runs — `targetQuery: a  b` arrives with
	 * both spaces — so without collapsing them a typo would evade the check
	 * while looking identical to a reader.
	 */
	it('ignores repeated whitespace inside the term', () => {
		const issues = validateContent([
			targeting('a', 'intentional community membership'),
			targeting('b', 'intentional  community   membership'),
			targeting('c', 'intentional\tcommunity membership')
		]);
		const clashes = issues.filter((i) => i.message.includes('already claimed by'));
		expect(clashes).toHaveLength(2);
	});

	it('allows distinct terms', () => {
		const issues = validateContent([
			targeting('a', 'intentional community'),
			targeting('b', 'types of intentional communities'),
			targeting('c', 'intentional community definition')
		]);
		expect(issues.filter((i) => i.message.includes('already claimed by'))).toEqual([]);
	});

	/** A draft competes for nothing, and a rewrite should not fail the build. */
	it('ignores drafts, which are not indexable', () => {
		const issues = validateContent([
			targeting('a', 'shared query'),
			targeting('b', 'shared query', 'draft')
		]);
		expect(issues.filter((i) => i.message.includes('already claimed by'))).toEqual([]);
	});

	it('ignores pages with no targetQuery at all', () => {
		const issues = validateContent([topic('a'), topic('b')]);
		expect(issues.filter((i) => i.message.includes('already claimed by'))).toEqual([]);
	});
});

describe('isIndexable', () => {
	it('excludes drafts however long they are', () => {
		const longDraft = entry(
			{ type: 'term', slug: 'x', term: 'X', topic: 't', short: 'd', status: 'draft' },
			9999
		);
		expect(isIndexable(longDraft)).toBe(false);
	});

	it('excludes a published but too-thin term', () => {
		const thin = entry(
			{ type: 'term', slug: 'x', term: 'X', topic: 't', short: 'd' },
			MIN_WORDS.term - 1
		);
		expect(isIndexable(thin)).toBe(false);
	});

	it('includes a published term of sufficient length', () => {
		const full = entry(
			{ type: 'term', slug: 'x', term: 'X', topic: 't', short: 'd' },
			MIN_WORDS.term
		);
		expect(isIndexable(full)).toBe(true);
	});

	it('excludes a term with no one-line definition, since tooltips and schema need it', () => {
		const noShort = entry({ type: 'term', slug: 'x', term: 'X', topic: 't', short: '  ' }, 5000);
		expect(isIndexable(noShort)).toBe(false);
	});

	it('indexes a path despite having no prose of its own', () => {
		expect(isIndexable(entry({ type: 'path', slug: 'p', steps: [] }, 0))).toBe(true);
	});
});

describe('formatIssues', () => {
	it('names every offending file so a failed build is actionable', () => {
		const message = formatIssues([
			{ path: '/a.md', message: 'first' },
			{ path: '/b.md', message: 'second' }
		]);
		expect(message).toContain('2 issues');
		expect(message).toContain('/a.md');
		expect(message).toContain('/b.md');
	});
});

describe('validateContent — clusters', () => {
	it('reports a topic with no cluster', () => {
		const issues = validateContent([entry({ type: 'topic', slug: 'x' })]);
		expect(issues.some((i) => i.message.includes('"cluster"'))).toBe(true);
	});

	it('reports a cluster that does not exist', () => {
		// Cast: frontmatter is untyped YAML at runtime, and catching exactly this is
		// the validator's job — TypeScript cannot see a bad value in a .md file.
		const issues = validateContent([
			entry({ type: 'topic', slug: 'x', cluster: 'weather' as ClusterKey })
		]);
		expect(issues.some((i) => i.message.includes('unknown cluster'))).toBe(true);
	});

	it('accepts every real cluster key', () => {
		const bad = CLUSTER_KEYS.filter(
			(key) =>
				validateContent([entry({ type: 'topic', slug: 'x', cluster: key as ClusterKey })]).length >
				0
		);
		expect(bad).toEqual([]);
		expect(CLUSTER_KEYS.length).toBeGreaterThan(0);
	});

	/** Only topics are placed on the map, so nothing else should need one. */
	it('does not ask other types for a cluster', () => {
		const issues = validateContent([term('consent')]);
		expect(issues.some((i) => i.message.includes('cluster'))).toBe(false);
	});
});
