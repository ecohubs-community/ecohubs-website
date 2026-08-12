import { describe, expect, it } from 'vitest';
import { guidesToRebuild } from './build-downloads';

const ALL = ['intentional-communities', 'community-governance'];

describe('guidesToRebuild', () => {
	it('leaves everything alone when nothing relevant changed', () => {
		expect(guidesToRebuild(['README.md', 'src/routes/(web)/+layout.svelte'], ALL)).toEqual([]);
	});

	it('rebuilds only the guide whose lesson changed', () => {
		const changed = ['src/content/learning/lessons/intentional-communities/what-joining-costs.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual(['intentional-communities']);
	});

	it('rebuilds a guide when its own file changed', () => {
		expect(guidesToRebuild(['src/content/learning/guides/community-governance.md'], ALL)).toEqual([
			'community-governance'
		]);
	});

	/**
	 * Quizzes, glossary terms and the print machinery all end up inside every
	 * PDF, so there is no way to attribute a change in them to one guide.
	 */
	it.each([
		'src/content/learning/quizzes/what-would-you-own.ts',
		'src/content/learning/terms/consent.md',
		'src/routes/(print)/print.css',
		'src/lib/learning/cost.ts',
		'src/lib/learning/questions.ts',
		'scripts/worksheet.ts'
	])('rebuilds everything when %s changed', (path) => {
		expect(guidesToRebuild([path], ALL)).toEqual(ALL);
	});

	/**
	 * A failure page prints in the appendix of whichever guide owns its lesson,
	 * and its path does not say which guide that is — the link runs through
	 * `lesson:` in frontmatter. So it is shared, and editing one must not leave
	 * a stale appendix in a guide this function decided to skip.
	 */
	it('rebuilds everything when a failure page changed', () => {
		const changed = ['src/content/learning/failures/founder-informal-veto.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual(ALL);
	});

	it('does not mistake a similarly named directory for a guide', () => {
		// `intentional-communities-old/` must not match `intentional-communities`.
		const changed = ['src/content/learning/lessons/intentional-communities-old/a.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual([]);
	});

	it('keeps the given order and does not repeat a guide', () => {
		const changed = [
			'src/content/learning/guides/intentional-communities.md',
			'src/content/learning/lessons/intentional-communities/what-joining-costs.md',
			'src/content/learning/guides/community-governance.md'
		];
		expect(guidesToRebuild(changed, ALL)).toEqual(ALL);
	});

	it('ignores a guide that is not published, because it is not in the list', () => {
		const changed = ['src/content/learning/lessons/starting-an-ecovillage/one.md'];
		expect(guidesToRebuild(changed, ALL)).toEqual([]);
	});
});
