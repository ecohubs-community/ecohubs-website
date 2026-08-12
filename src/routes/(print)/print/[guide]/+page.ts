import type { PageLoad } from './$types';

/**
 * The compiled lesson components, in guide order.
 *
 * Eager rather than lazy: this page renders every lesson at once, so there is
 * nothing to defer, and awaiting a dozen dynamic imports would only make the
 * PDF build slower.
 */
const modules = import.meta.glob<{ default: unknown }>('/src/content/learning/lessons/**/*.md', {
	eager: true
});

/** The appendix bodies, globbed separately because they live in their own directory. */
const failures = import.meta.glob<{ default: unknown }>('/src/content/learning/failures/*.md', {
	eager: true
});

export const load: PageLoad = async ({ data, params }) => {
	const content = data.lessons.map((lesson) => ({
		...lesson,
		component: modules[`/src/content/learning/lessons/${params.guide}/${lesson.slug}.md`]?.default
	}));

	const appendix = data.appendix.map((mode) => ({
		...mode,
		component: failures[`/src/content/learning/failures/${mode.slug}.md`]?.default
	}));

	return { ...data, lessons: content, appendix };
};
