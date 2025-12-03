import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost, getRelatedPosts } from '$lib/server/blog';

export const prerender = false; // Dynamic rendering for Ghost CMS

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);
	
	if (!post) {
		throw error(404, 'Post not found');
	}
	
	// Get related posts based on tags
	const relatedPosts = await getRelatedPosts(
		post.slug,
		post.tags || [],
		3
	);
	
	return {
		post,
		relatedPosts
	};
};
