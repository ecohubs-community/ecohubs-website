import type { PageServerLoad } from './$types';
import { getAllAuthors } from '$lib/server/blog';

export const prerender = false; // Mirrors the rest of /blog — authors come from Ghost

export const load: PageServerLoad = async () => {
	return { authors: await getAllAuthors() };
};
