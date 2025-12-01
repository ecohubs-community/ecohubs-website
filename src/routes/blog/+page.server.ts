import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/blog';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts() || [];
	return {
		posts,
	};
};


