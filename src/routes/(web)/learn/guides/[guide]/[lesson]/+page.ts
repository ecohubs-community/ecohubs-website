import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** Universal for the same reason as the other content routes; the lazy glob
 *  gives each lesson its own chunk. */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/lessons/**/*.md');

export const load: PageLoad = async ({ data, params }) => {
	const loader = modules[`/src/content/learning/lessons/${params.guide}/${params.lesson}.md`];
	if (!loader) throw error(404, 'No lesson with this name');

	const module = await loader();
	return { ...data, content: module.default };
};
