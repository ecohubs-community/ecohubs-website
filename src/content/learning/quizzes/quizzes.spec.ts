/**
 * Guards on the quiz definitions themselves.
 *
 * These are the failures type-checking cannot catch: a weight pointing at an
 * outcome that does not exist, or a link to a page that is still a draft.
 * Both shipped in the first version of the fits quiz.
 */
import { describe, expect, it } from 'vitest';
import { QUIZZES } from './index';
import { allEntries, urlFor } from '$lib/learning';

const quizzes = Object.values(QUIZZES);

/** Every path a reader could actually reach. */
const publishedUrls = new Set(
	allEntries.filter((e) => e.frontmatter.status === 'published').map((e) => urlFor(e))
);

describe('quiz definitions', () => {
	it('registers each quiz under its own id', () => {
		for (const [key, quiz] of Object.entries(QUIZZES)) {
			expect(key).toBe(quiz.id);
		}
	});

	it('only weights outcomes that exist', () => {
		for (const quiz of quizzes) {
			const ids = new Set((quiz.outcomes ?? []).map((o) => o.id));
			for (const question of quiz.questions) {
				for (const option of question.options) {
					for (const outcome of Object.keys(option.weights ?? {})) {
						expect(ids, `${quiz.id}/${question.id}/${option.id}`).toContain(outcome);
					}
				}
			}
		}
	});

	it('only scores dimensions that exist', () => {
		// Collected rather than asserted in the loop, so the expectation still
		// holds — and still runs — while no quiz uses profile mode.
		const unknown: string[] = [];
		for (const quiz of quizzes) {
			const ids = new Set((quiz.dimensions ?? []).map((d) => d.id));
			for (const question of quiz.questions) {
				for (const option of question.options) {
					for (const dimension of Object.keys(option.scores ?? {})) {
						if (!ids.has(dimension)) unknown.push(`${quiz.id}/${question.id} → ${dimension}`);
					}
				}
			}
		}
		expect(unknown).toEqual([]);
	});

	it('never links an outcome to an unpublished page', () => {
		// The first version pointed at /learn/glossary/commune and
		// /learn/glossary/community-land-trust — one a draft, one nonexistent.
		for (const quiz of quizzes) {
			for (const outcome of quiz.outcomes ?? []) {
				if (!outcome.href?.startsWith('/learn/')) continue;
				expect(publishedUrls, `${quiz.id} → ${outcome.id}`).toContain(outcome.href);
			}
		}
	});

	it('gives every outcome a description worth indexing, not a punchline', () => {
		// Outcome text renders in the server HTML whether or not anyone takes
		// the quiz, so it has to stand on its own.
		for (const quiz of quizzes) {
			for (const outcome of quiz.outcomes ?? []) {
				expect(
					outcome.description.split(/\s+/).length,
					`${quiz.id} → ${outcome.id}`
				).toBeGreaterThan(20);
			}
		}
	});

	it('gives every question at least two options and a unique id', () => {
		for (const quiz of quizzes) {
			const seen = new Set<string>();
			for (const question of quiz.questions) {
				expect(seen.has(question.id), `${quiz.id}/${question.id} duplicated`).toBe(false);
				seen.add(question.id);
				expect(question.options.length).toBeGreaterThan(1);
			}
		}
	});

	it('marks at least one correct option on every check-mode question', () => {
		const missing: string[] = [];
		for (const quiz of quizzes.filter((q) => q.mode === 'check')) {
			for (const question of quiz.questions) {
				if (!question.options.some((o) => o.correct)) missing.push(`${quiz.id}/${question.id}`);
			}
		}
		expect(missing).toEqual([]);
	});
});
