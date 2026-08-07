import type { PageServerLoad } from './$types';

export const prerender = true;

/** The index arrives client-side; nothing to load here. */
export const load: PageServerLoad = async () => ({});
