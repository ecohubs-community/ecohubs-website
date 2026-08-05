import type { GhostPost } from './ghost';
import { toSocialImageUrl } from './ghost';

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	/** Ghost's SEO title, when set. Lets an editor give a long headline a short
	 *  search-results form without shortening the headline itself. */
	metaTitle?: string;
	/** Ghost's SEO description, when set — otherwise the excerpt is used, which
	 *  is often longer than the ~160 chars Google will show. */
	metaDescription?: string;
	date: string;
	dateModified?: string;
	author: string;
	image?: string;
	/** Crawler-safe variant of `image` — see `toSocialImageUrl` in ./ghost. */
	socialImage?: string;
	tags?: { name: string; slug: string }[];
	readingTime?: number;
	html?: string; // HTML content from Ghost
}

export interface TocHeading {
	id: string;
	text: string;
}

export interface BlogPostWithContent extends BlogPost {
	html: string; // HTML content from Ghost
	headings: TocHeading[]; // Top-level (h2) sections, in document order
}

/**
 * A tag archive earns a place in the index once it collects this many posts.
 *
 * Below it the page is a heading and a single card — near-duplicate of the post
 * it links to, and the kind of thin, overlapping page search engines discount
 * (and which drags on how the rest of the blog is assessed). Such tags stay
 * reachable and useful for readers; they are just kept out of the sitemap and
 * marked `noindex` until they have enough behind them.
 *
 * Shared by the tag route and the sitemap so the two can never disagree.
 */
export const MIN_POSTS_FOR_INDEXABLE_TAG = 2;

/**
 * Map Ghost post to BlogPost interface
 */
function mapGhostPostToBlogPost(ghostPost: GhostPost): BlogPost {
	return {
		slug: ghostPost.slug,
		title: ghostPost.title,
		excerpt: ghostPost.excerpt || ghostPost.custom_excerpt || ghostPost.meta_description || '',
		metaTitle: ghostPost.meta_title || undefined,
		metaDescription: ghostPost.meta_description || undefined,
		date: ghostPost.published_at || ghostPost.updated_at,
		dateModified: ghostPost.updated_at || undefined,
		author: ghostPost.authors?.[0]?.name || 'EcoHubs Team',
		image: ghostPost.feature_image || undefined,
		socialImage: toSocialImageUrl(ghostPost.feature_image),
		tags: ghostPost.tags?.map((tag) => ({ name: tag.name, slug: tag.slug })) || [],
		readingTime: ghostPost.reading_time || calculateReadingTime(ghostPost.html || '')
	};
}

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}

/* ─────────────────────────────────────────────────────────────────────────
   Table of contents

   Ghost already emits `id`s on headings, but it percent-encodes anything
   non-ASCII — a heading containing an em dash becomes
   `id="what-we-were-built-for-%E2%80%94-and-what-we-got-instead"`, whose
   matching `href` would need the `%` double-encoded to survive the browser
   decoding the fragment. Rather than ship that, we keep Ghost's id when it
   is already clean (so any anchor someone has already shared keeps working)
   and re-slugify the rest.
   ───────────────────────────────────────────────────────────────────────── */

const H2_TAG = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;
const ID_ATTR = /\sid\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i;
/** An id we can put in an `href="#…"` verbatim — ASCII, no percent-escapes. */
const CLEAN_ID = /^[A-Za-z][A-Za-z0-9._-]*$/;

const NAMED_ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	hellip: '…',
	mdash: '—',
	ndash: '–',
	lsquo: '‘',
	rsquo: '’',
	ldquo: '“',
	rdquo: '”'
};

function decodeEntities(input: string): string {
	return input.replace(/&(#[Xx]?[0-9A-Fa-f]+|[A-Za-z]+);/g, (whole, body: string) => {
		if (body[0] !== '#') return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
		const hex = body[1] === 'x' || body[1] === 'X';
		const code = Number.parseInt(hex ? body.slice(2) : body.slice(1), hex ? 16 : 10);
		if (!Number.isInteger(code) || code < 1 || code > 0x10ffff) return whole;
		return String.fromCodePoint(code);
	});
}

function escapeAttribute(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function slugify(text: string): string {
	return (
		text
			.normalize('NFKD')
			.replace(/[\u0300-\u036f]/g, '') // strip the diacritics NFKD just split off
			// Apostrophes and quotes vanish rather than becoming dashes, so
			// "the community you're allowed to leave" stays one readable word.
			.replace(/['‘’"“”]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 70)
			.replace(/-+$/g, '')
	);
}

/**
 * Collect the `<h2>` sections of a rendered post and give each one a stable,
 * link-safe id plus the hover-revealed "#" permalink the article page styles.
 *
 * Returns the rewritten HTML — headings that are empty or contain no text are
 * left exactly as they were and stay out of the table of contents.
 */
export function withHeadingAnchors(html: string): { html: string; headings: TocHeading[] } {
	const headings: TocHeading[] = [];
	const used = new Set<string>();

	const rewritten = html.replace(H2_TAG, (whole, rawAttrs: string, inner: string) => {
		const text = decodeEntities(inner.replace(/<[^>]*>/g, ''))
			.replace(/\s+/g, ' ')
			.trim();
		if (!text) return whole;

		const existing = rawAttrs.match(ID_ATTR)?.[1]?.replace(/^["']|["']$/g, '');
		let id =
			existing && CLEAN_ID.test(existing) && !used.has(existing)
				? existing
				: slugify(text) || `section-${headings.length + 1}`;

		if (used.has(id)) {
			let suffix = 2;
			while (used.has(`${id}-${suffix}`)) suffix++;
			id = `${id}-${suffix}`;
		}
		used.add(id);
		headings.push({ id, text });

		const attrs = rawAttrs.replace(ID_ATTR, '');

		// A heading that already contains a link can't take the permalink —
		// nested <a> is invalid and browsers unnest it into a mess. It still
		// gets an id, so the contents entry works.
		if (/<a\b/i.test(inner)) return `<h2${attrs} id="${id}">${inner}</h2>`;

		const label = escapeAttribute(`Copy link to section: ${text}`);
		return (
			`<h2${attrs} id="${id}">` +
			`<a class="heading-anchor" href="#${id}" aria-label="${label}" data-heading-anchor>#</a>` +
			inner +
			`</h2>`
		);
	});

	return { html: rewritten, headings };
}

/**
 * Fetch all published posts from Ghost
 */
export async function getAllPosts(): Promise<BlogPost[]> {
	const { getAllGhostPosts } = await import('./ghost');
	const ghostPosts = await getAllGhostPosts();
	const posts = ghostPosts.map(mapGhostPostToBlogPost);

	// Sort by date, newest first
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Fetch single post from Ghost by slug
 */
export async function getPost(slug: string): Promise<BlogPostWithContent | null> {
	const { getGhostPost } = await import('./ghost');
	const ghostPost = await getGhostPost(slug);

	if (!ghostPost) {
		return null;
	}

	const mapped = mapGhostPostToBlogPost(ghostPost);
	const { html, headings } = withHeadingAnchors(ghostPost.html || '');

	return {
		...mapped,
		html,
		headings
	};
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(
	currentSlug: string,
	currentTags: string[],
	limit: number = 3
): Promise<BlogPost[]> {
	const { getRelatedGhostPosts } = await import('./ghost');
	const relatedGhostPosts = await getRelatedGhostPosts(currentSlug, currentTags, limit);
	return relatedGhostPosts.map(mapGhostPostToBlogPost);
}
