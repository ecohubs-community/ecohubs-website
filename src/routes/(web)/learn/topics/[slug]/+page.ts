import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Loads the compiled markdown for one topic. Universal for the same reason as
 * the glossary and comparison routes: its return value is never serialised, so
 * it may carry a Svelte component, and the lazy glob keeps each topic in its
 * own chunk.
 */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/topics/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/topics/${params.slug}.md`];
	if (!loader) throw error(404, 'No topic with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
