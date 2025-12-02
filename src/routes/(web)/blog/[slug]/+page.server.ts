import { getAllPosts } from '$lib/server/blog';

export const prerender = true;

// Generate static paths for all blog posts
export async function entries() {
	const posts = await getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

