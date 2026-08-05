import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAuthor } from '$lib/server/blog';

export const prerender = false; // Mirrors the rest of /blog — authors come from Ghost

export const load: PageServerLoad = async ({ params }) => {
	const result = await getAuthor(params.slug);

	// Also covers staff users who exist in Ghost but have not published yet:
	// they have no public presence, so neither does this page.
	if (!result) throw error(404, 'No author with this name');

	return result;
};
