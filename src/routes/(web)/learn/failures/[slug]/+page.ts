import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/**
 * Loads the compiled markdown for one failure mode.
 *
 * Universal, like the glossary and comparison routes: the return value is never
 * serialised so it may carry a Svelte component, and the lazy glob gives each
 * page its own chunk — which matters more here than elsewhere, because there
 * are twenty-four of them and a reader arrives at one.
 */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/failures/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/failures/${params.slug}.md`];
	if (!loader) throw error(404, 'No failure mode with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
