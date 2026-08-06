import type { PageServerLoad } from './$types';

export const prerender = true;

/**
 * Nothing to load: the page resolves stored ids against the catalogue the
 * `/learn` layout already ships. It is `noindex` and absent from the sitemap —
 * for a crawler it is empty by construction.
 */
export const load: PageServerLoad = async () => ({});
