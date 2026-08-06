/**
 * Learning Hub content model.
 *
 * Frontmatter *is* the schema — there is no database. These types mirror what
 * an author writes at the top of a markdown file in `src/content/learning`,
 * and `validate.ts` checks real files against them at build time so a broken
 * reference fails the build rather than rendering a dead link.
 *
 * See `Learning Hub — Implementation Plan.md` §3.
 */

import type { ClusterKey } from './clusters';

export const CONTENT_TYPES = [
	'guide',
	'lesson',
	'topic',
	'compare',
	'term',
	'path',
	'case'
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/** `draft` is invisible everywhere: routes, listings, sitemap and search. */
export type Status = 'draft' | 'published';

/** The three levels of the depth switch. */
export const DEPTHS = ['quick', 'standard', 'deep'] as const;
export type Depth = (typeof DEPTHS)[number];

/**
 * The generated cover art, from the design's six CSS motifs.
 *
 * Cheaper than an image in every sense — no file, no request, no layout shift —
 * and it means a page always has a cover even before anyone commissions art.
 * A page with a real `image` uses that instead.
 */
export const MOTIFS = ['rings', 'strata', 'grid', 'tide', 'seed', 'weave'] as const;
export type Motif = (typeof MOTIFS)[number];

/** Fields every piece of content carries. */
export interface BaseFrontmatter {
	title: string;
	slug: string;
	/** One sentence. Becomes the meta description and the card text. */
	summary: string;
	status: Status;
	/** ISO date (YYYY-MM-DD). Only bump on substantive change — same honesty
	 *  rule as sitemap `lastmod`. */
	updated: string;
	/** The single query this page is meant to answer. One page, one query. */
	targetQuery?: string;
	/** Cover image, absolute from `static/`. Falls back to a motif when unset. */
	image?: string;
	/** Required whenever `image` is set — a cover is never decorative. */
	imageAlt?: string;
	/** Which motif to use when there is no image. Defaults to one picked from
	 *  the slug, so it is stable and neighbouring cards differ. */
	motif?: Motif;
}

export interface GuideFrontmatter extends BaseFrontmatter {
	type: 'guide';
	level: 'foundational' | 'intermediate' | 'advanced';
	/** Topic slug this guide sits under. */
	topic: string;
	/** "What this guide covers", one line each. */
	outcomes?: string[];
	/** What a reader asks before committing to a long read. */
	faq?: { question: string; answer: string }[];
	/** What you need first. Omit when there is nothing. */
	prerequisites?: string;
}

export interface LessonFrontmatter extends BaseFrontmatter {
	type: 'lesson';
	/** Slug of the owning guide. Validated to exist. */
	guide: string;
	/** Position within the guide, 1-based. Validated to be unique per guide. */
	order: number;
	/** Glossary term slugs used in this lesson — drives <Gloss> and
	 *  "terms used here". Every entry is validated to exist. */
	terms?: string[];
	/** Sibling content slugs worth reading next. */
	related?: string[];
}

export interface TopicFrontmatter extends BaseFrontmatter {
	type: 'topic';
	/** The RCOS Core layer this topic maps to, when it maps to one. */
	rcosLayer?: number;
	/** Which grouping it sits in on the knowledge map. See `clusters.ts`. */
	cluster: ClusterKey;
	/**
	 * How to check a term from this topic against reality — shown on every
	 * glossary term filed under it. Written once per topic rather than per
	 * term, because the advice is the same for all of them.
	 */
	practice?: string;
	terms?: string[];
}

export interface CompareFrontmatter extends BaseFrontmatter {
	type: 'compare';
	topic: string;
	terms?: string[];
}

export interface TermFrontmatter extends BaseFrontmatter {
	type: 'term';
	/** Display name — may differ from the title casing, e.g. "Community land trust". */
	term: string;
	topic: string;
	/** The one-sentence definition. Used in hover tooltips, search results and
	 *  `DefinedTerm.description`. The most quotable string on the site. */
	short: string;
	related?: string[];
}

export interface PathStep {
	guide: string;
	lesson: string;
}

export interface PathFrontmatter extends BaseFrontmatter {
	type: 'path';
	/** Ordered lessons drawn from across the guides. Curation only, no prose. */
	steps: PathStep[];
	/** Who it is for, in a few words — the kicker above the title. */
	audience?: string;
	/** "What you will be able to do", one line each. */
	outcomes?: string[];
	/** Worth reading alongside this path. */
	pairs?: { label: string; href: string }[];
	/** Where the path deliberately sends the reader when it ends. */
	endsAt?: { label: string; href: string };
}

export interface CaseFrontmatter extends BaseFrontmatter {
	type: 'case';
	topic: string;
	terms?: string[];
}

export type Frontmatter =
	| GuideFrontmatter
	| LessonFrontmatter
	| TopicFrontmatter
	| CompareFrontmatter
	| TermFrontmatter
	| PathFrontmatter
	| CaseFrontmatter;

/** A loaded file: its frontmatter, its compiled component, and derived facts. */
export interface ContentEntry<F extends Frontmatter = Frontmatter> {
	frontmatter: F;
	/** The mdsvex-compiled component, rendered by the route. */
	component: unknown;
	/** Absolute path of the source file — used in validation messages. */
	path: string;
	/** Word count of the source body, used for reading time. */
	words: number;
	/** Top-level (`##`) sections, for the table of contents. Ids match the ones
	 *  stamped onto the rendered headings — both come from `headings.js`. */
	headings: TocHeading[];
}

/** One entry in a page's table of contents. */
export interface TocHeading {
	id: string;
	text: string;
}

/** A problem found by the validator. */
export interface ValidationIssue {
	path: string;
	message: string;
}
