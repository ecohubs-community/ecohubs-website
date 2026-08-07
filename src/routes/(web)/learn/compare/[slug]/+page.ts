import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Loads the compiled markdown for one comparison.
 *
 * Universal on purpose — see the glossary route for the reasoning: its return
 * value is never serialised, so it may carry a Svelte component, and the lazy
 * glob lets Vite give each comparison its own chunk.
 */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/compare/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/compare/${params.slug}.md`];
	if (!loader) throw error(404, 'No comparison with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
