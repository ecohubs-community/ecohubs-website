import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { buildSearchIndex } from '$lib/learning/search';

export const prerender = true;

/** Static JSON, fetched only by /learn/search. */
export const GET: RequestHandler = async () => json(buildSearchIndex());
