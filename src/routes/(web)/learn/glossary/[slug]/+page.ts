import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Loads the compiled markdown for one term.
 *
 * This is a *universal* load on purpose. Its return value is never serialised —
 * it re-runs during hydration — so it may return a Svelte component, which a
 * `+page.server.ts` could not. The glob is lazy, so Vite code-splits each term
 * into its own chunk and a reader downloads only the entry they opened.
 *
 * Serialisable metadata comes from `+page.server.ts`, which keeps the heavy
 * content index server-side.
 */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/terms/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/terms/${params.slug}.md`];
	if (!loader) throw error(404, 'No glossary entry with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
