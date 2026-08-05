import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Universal for the same reason as the other content routes — see the
 *  glossary route. Lazy glob keeps each guide in its own chunk. */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/guides/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/guides/${params.guide}.md`];
	if (!loader) throw error(404, 'No guide with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
