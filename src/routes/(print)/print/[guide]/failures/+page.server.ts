import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { failuresOfGuide, guideBySlug } from '$lib/learning';

export const load: PageServerLoad = async ({ params }) => {
	const guide = guideBySlug.get(params.guide);
	if (!guide || guide.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	const modes = failuresOfGuide(params.guide);
	if (modes.length === 0) throw error(404, 'This guide has no failure modes');

	/**
	 * Grouped by the lesson that introduces them, because that is how the sheet
	 * gets used: a group is one sitting's worth of checking, and the lesson title
	 * says what the group has in common better than any heading we could invent.
	 */
	const groups: { lesson: string; title: string; modes: typeof modes }[] = [];
	for (const mode of modes) {
		const last = groups.at(-1);
		if (last?.lesson === mode.lesson) last.modes.push(mode);
		else groups.push({ lesson: mode.lesson, title: mode.lessonTitle, modes: [mode] });
	}

	return {
		guide: guide.frontmatter,
		groups,
		total: modes.length,
		signs: modes.reduce((sum, mode) => sum + mode.signs.length, 0),
		generatedAt: new Date().toISOString()
	};
};
