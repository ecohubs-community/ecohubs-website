import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/blog';

export const prerender = false; // Mirrors parent /blog dynamic rendering

export const load: PageServerLoad = async ({ params }) => {
	const allPosts = await getAllPosts();
	const posts = allPosts.filter((post) => post.tags?.some((t) => t.slug === params.tag));

	if (posts.length === 0) {
		throw error(404, 'No posts with this tag');
	}

	// The display name comes from any post's matching tag (Ghost normalises casing).
	const tagName =
		posts[0].tags?.find((t) => t.slug === params.tag)?.name ?? params.tag;

	return {
		posts,
		tag: { name: tagName, slug: params.tag }
	};
};
