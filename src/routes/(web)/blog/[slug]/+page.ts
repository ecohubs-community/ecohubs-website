import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../../content/blog/${params.slug}.svx`);
		
		if (!post.metadata) {
			throw error(404, 'Post not found');
		}
		
		return {
			post: {
				slug: params.slug,
				...post.metadata,
				content: post.default,
			},
		};
	} catch (e) {
		throw error(404, 'Post not found');
	}
};

