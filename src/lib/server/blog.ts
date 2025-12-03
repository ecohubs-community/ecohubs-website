import type {
	GhostPost
} from './ghost';

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image?: string;
	tags?: string[];
	readingTime?: number;
	html?: string; // HTML content from Ghost
}

export interface BlogPostWithContent extends BlogPost {
	html: string; // HTML content from Ghost
}

/**
 * Map Ghost post to BlogPost interface
 */
function mapGhostPostToBlogPost(ghostPost: GhostPost): BlogPost {
	return {
		slug: ghostPost.slug,
		title: ghostPost.title,
		excerpt: ghostPost.excerpt || ghostPost.custom_excerpt || ghostPost.meta_description || '',
		date: ghostPost.published_at || ghostPost.updated_at,
		author: ghostPost.authors?.[0]?.name || 'EcoHubs Team',
		image: ghostPost.feature_image || undefined,
		tags: ghostPost.tags?.map(tag => tag.name) || [],
		readingTime: ghostPost.reading_time || calculateReadingTime(ghostPost.html || '')
	};
}

function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
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
	
	return {
		...mapped,
		html: ghostPost.html || ''
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


