import { GHOST_URL, GHOST_CONTENT_API_KEY, GHOST_ADMIN_API_KEY } from '$env/static/private';

// Ghost API types
export interface GhostPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	html: string;
	published_at?: string;
	updated_at: string;
	feature_image?: string;
	authors?: Array<{ name: string; slug: string }>;
	tags?: Array<{ name: string; slug: string }>;
	reading_time?: number;
	meta_title?: string;
	meta_description?: string;
	custom_excerpt?: string;
	status?: 'published' | 'draft' | 'scheduled';
	custom_fields?: Record<string, unknown>;
}

export interface GhostDraft extends GhostPost {
	status: 'draft';
}

// Type definitions for Ghost API clients
type GhostContentAPIClient = {
	posts: {
		browse: (options: { limit: string; include: string[]; filter: string }) => Promise<GhostPost[]>;
		read: (options: { slug: string }, include?: { include: string[] }) => Promise<GhostPost>;
	};
};

type GhostAdminAPIClient = {
	posts: {
		browse: (options: {
			limit: string;
			include: string[];
			filter: string;
		}) => Promise<GhostDraft[]>;
		read: (options: { id: string }, include?: { include: string[] }) => Promise<GhostDraft>;
		edit: (
			options: { id: string; status?: string; custom_fields?: Record<string, unknown> },
			include?: { include: string[] }
		) => Promise<GhostPost>;
	};
};

/* ─────────────────────────────────────────────────────────────────────────
   Social preview images

   Feature images can't be handed to LinkedIn / Facebook as-is:

   1. The Ghost host serves `robots.txt` with `Disallow: /` (deliberate — it
      keeps the CMS out of search results, since ecohubs.community is the
      canonical surface). Social crawlers honour that for images too, so
      anything on blog.ecohubs.community is unfetchable to them.
   2. Ghost stores whatever the author uploaded — often WebP, which
      LinkedIn's crawler cannot decode, or 2 MB+ PNGs.

   Both go away by pointing `og:image` at our own `/og-image/…` route, which
   proxies Ghost's "1200px wide, re-encoded as JPEG" transform from a host
   crawlers are allowed to read.
   ───────────────────────────────────────────────────────────────────────── */

/** Ghost lays content images out as `/content/images/YYYY/MM/<file>`. */
const GHOST_IMAGE_PATH = /^\/content\/images\/(\d{4}\/\d{2}\/[A-Za-z0-9._-]+)$/;

/**
 * Rewrite a Ghost `feature_image` into something a social crawler can
 * actually fetch and render. Non-Ghost images are passed through (Unsplash
 * gets its own resize/format params); anything unrecognised returns
 * `undefined` so the caller can fall back to a static OG image.
 */
export function toSocialImageUrl(featureImage?: string): string | undefined {
	if (!featureImage) return undefined;

	let url: URL;
	try {
		url = new URL(featureImage, GHOST_URL || 'https://ecohubs.community');
	} catch {
		return undefined;
	}

	if (GHOST_URL) {
		let ghostOrigin: string | undefined;
		try {
			ghostOrigin = new URL(GHOST_URL).origin;
		} catch {
			ghostOrigin = undefined;
		}
		if (ghostOrigin && url.origin === ghostOrigin) {
			const path = url.pathname.match(GHOST_IMAGE_PATH)?.[1];
			// Relative on purpose — <SEO> prefixes it with the canonical site URL.
			return path ? `/og-image/${path}` : undefined;
		}
	}

	if (url.hostname.endsWith('images.unsplash.com')) {
		url.searchParams.set('w', '1200');
		url.searchParams.set('fm', 'jpg');
		url.searchParams.set('q', '80');
		return url.toString();
	}

	// Some other absolute URL — SVG is not a valid OG image anywhere, and a
	// WebP we can't transform would fail on LinkedIn, so both fall back.
	if (/\.(svg|webp)$/i.test(url.pathname)) return undefined;
	return url.toString();
}

// Lazy initialization of API clients to avoid errors when env vars are missing
let contentApi: GhostContentAPIClient | null = null;
let adminApi: GhostAdminAPIClient | null = null;

async function getContentApi(): Promise<GhostContentAPIClient | null> {
	if (!GHOST_URL || !GHOST_CONTENT_API_KEY) {
		return null;
	}
	if (!contentApi) {
		const GhostContentAPI = (await import('@tryghost/content-api')).default;
		contentApi = new GhostContentAPI({
			url: GHOST_URL,
			key: GHOST_CONTENT_API_KEY,
			version: 'v5.0'
		}) as GhostContentAPIClient;
	}
	return contentApi;
}

async function getAdminApi(): Promise<GhostAdminAPIClient | null> {
	if (!GHOST_URL || !GHOST_ADMIN_API_KEY) {
		return null;
	}
	if (!adminApi) {
		const GhostAdminAPI = (await import('@tryghost/admin-api')).default;
		adminApi = new GhostAdminAPI({
			url: GHOST_URL,
			key: GHOST_ADMIN_API_KEY,
			version: 'v5.0'
		}) as GhostAdminAPIClient;
	}
	return adminApi;
}

/**
 * Fetch all published posts from Ghost Content API
 */
export async function getAllGhostPosts(): Promise<GhostPost[]> {
	try {
		const api = await getContentApi();
		if (!api) {
			console.warn('Ghost Content API not configured');
			return [];
		}

		const posts = await api.posts.browse({
			limit: 'all',
			include: ['authors', 'tags'],
			filter: 'status:published'
		});

		return posts as GhostPost[];
	} catch (error) {
		console.error('Error fetching Ghost posts:', error);
		return [];
	}
}

/**
 * Fetch single published post by slug from Ghost Content API
 */
export async function getGhostPost(slug: string): Promise<GhostPost | null> {
	try {
		const api = await getContentApi();
		if (!api) {
			console.warn('Ghost Content API not configured');
			return null;
		}

		const post = await api.posts.read({ slug }, { include: ['authors', 'tags'] });
		return post as GhostPost;
	} catch (error: unknown) {
		// Handle 404 errors gracefully (post not found)
		const err = error as { type?: string; response?: { status?: number } };
		if (err?.type === 'NotFoundError' || err?.response?.status === 404) {
			return null;
		}
		console.error(`Error fetching Ghost post ${slug}:`, error);
		return null;
	}
}

/**
 * Fetch all drafts from Ghost Admin API
 */
export async function getAllGhostDrafts(): Promise<GhostDraft[]> {
	try {
		const api = await getAdminApi();
		if (!api) {
			console.warn('Ghost Admin API not configured');
			return [];
		}

		const posts = await api.posts.browse({
			limit: 'all',
			include: ['authors', 'tags'],
			filter: 'status:draft'
		});

		return posts as GhostDraft[];
	} catch (error) {
		console.error('Error fetching Ghost drafts:', error);
		return [];
	}
}

/**
 * Fetch single draft by ID from Ghost Admin API
 */
export async function getGhostDraft(id: string): Promise<GhostDraft | null> {
	try {
		const api = await getAdminApi();
		if (!api) {
			console.warn('Ghost Admin API not configured');
			return null;
		}

		const post = await api.posts.read({ id }, { include: ['authors', 'tags'] });
		return post as GhostDraft;
	} catch (error: unknown) {
		// Handle 404 errors gracefully (draft not found)
		const err = error as { type?: string; response?: { status?: number } };
		if (err?.type === 'NotFoundError' || err?.response?.status === 404) {
			return null;
		}
		console.error(`Error fetching Ghost draft ${id}:`, error);
		return null;
	}
}

/**
 * Publish a draft post via Ghost Admin API
 */
export async function publishGhostPost(id: string): Promise<GhostPost | null> {
	try {
		const api = await getAdminApi();
		if (!api) {
			throw new Error('Ghost Admin API not configured');
		}

		const post = await api.posts.edit(
			{
				id,
				status: 'published'
			},
			{ include: ['authors', 'tags'] }
		);

		return post as GhostPost;
	} catch (error) {
		console.error(`Error publishing Ghost post ${id}:`, error);
		throw error;
	}
}

/**
 * Update custom fields for a Ghost post
 */
export async function updateGhostPostCustomFields(
	id: string,
	fields: Record<string, unknown>
): Promise<GhostPost | null> {
	try {
		const api = await getAdminApi();
		if (!api) {
			throw new Error('Ghost Admin API not configured');
		}

		const post = await api.posts.edit(
			{
				id,
				custom_fields: fields
			},
			{ include: ['authors', 'tags'] }
		);

		return post as GhostPost;
	} catch (error) {
		console.error(`Error updating Ghost post custom fields ${id}:`, error);
		throw error;
	}
}

/**
 * Get related posts by tags
 */
export async function getRelatedGhostPosts(
	currentSlug: string,
	currentTags: string[],
	limit: number = 3
): Promise<GhostPost[]> {
	try {
		const api = await getContentApi();
		if (!api) {
			return [];
		}

		if (currentTags.length === 0) {
			return [];
		}

		// Build filter for posts with matching tags
		const tagSlugs = currentTags.map((tag) => tag.toLowerCase().replace(/\s+/g, '-'));
		const filter = `status:published+tag:[${tagSlugs.join(',')}]`;

		const posts = await api.posts.browse({
			limit: String(limit + 1), // Get one extra to exclude current post
			include: ['authors', 'tags'],
			filter
		});

		// Filter out current post and limit results
		const relatedPosts = (posts as GhostPost[])
			.filter((post) => post.slug !== currentSlug)
			.slice(0, limit);

		return relatedPosts;
	} catch (error) {
		console.error('Error fetching related Ghost posts:', error);
		return [];
	}
}
