import { describe, expect, it } from 'vitest';
import { isComplete, score, type QuizDefinition } from './quiz';

const weighted: QuizDefinition = {
	id: 'fits',
	mode: 'weighted',
	title: 'Which fits?',
	intro: 'Five questions.',
	outcomes: [
		{ id: 'cohousing', title: 'Cohousing', description: 'Own door, own money.' },
		{ id: 'commune', title: 'Commune', description: 'Shared income.' }
	],
	questions: [
		{
			id: 'money',
			prompt: 'Money?',
			options: [
				{ id: 'separate', label: 'Separate', weights: { cohousing: 3 } },
				{ id: 'shared', label: 'Shared', weights: { commune: 3 } }
			]
		},
		{
			id: 'space',
			prompt: 'Space?',
			options: [
				{ id: 'private', label: 'Private', weights: { cohousing: 2 } },
				{ id: 'communal', label: 'Communal', weights: { commune: 2 } }
			]
		}
	]
};

const check: QuizDefinition = {
	id: 'governance',
	mode: 'check',
	title: 'Check',
	intro: 'Three questions.',
	questions: [
		{
			id: 'q1',
			prompt: 'Consent means?',
			options: [
				{ id: 'a', label: 'Everyone agrees', explanation: 'That is consensus.' },
				{ id: 'b', label: 'No paramount objection', correct: true, explanation: 'Right.' }
			]
		},
		{
			id: 'q2',
			prompt: 'Which are governance methods?',
			multiple: true,
			options: [
				{ id: 'a', label: 'Sociocracy', correct: true },
				{ id: 'b', label: 'Consensus', correct: true },
				{ id: 'c', label: 'Permaculture' }
			]
		}
	]
};

const profile: QuizDefinition = {
	id: 'ready',
	mode: 'profile',
	title: 'Ready?',
	intro: 'Two questions.',
	dimensions: [
		{ id: 'governance', label: 'Governance', description: 'How you decide.' },
		{ id: 'money', label: 'Money', description: 'How you pay.' }
	],
	questions: [
		{
			id: 'q1',
			prompt: 'Written agreements?',
			options: [
				{ id: 'yes', label: 'Yes', scores: { governance: 2 } },
				{ id: 'no', label: 'No', scores: { governance: 0 } }
			]
		},
		{
			id: 'q2',
			prompt: 'Exit terms written?',
			options: [
				{ id: 'yes', label: 'Yes', scores: { money: 2 } },
				{ id: 'no', label: 'No', scores: { money: 0 } }
			]
		}
	]
};

describe('weighted scoring', () => {
	it('ranks outcomes by total weight', () => {
		const result = score(weighted, { money: 'shared', space: 'communal' });
		expect(result.outcomes[0].outcome.id).toBe('commune');
		expect(result.outcomes[0].score).toBe(5);
	});

	it('returns every outcome, not just the winner', () => {
		// Showing the full ranking is more honest than declaring one answer.
		const result = score(weighted, { money: 'separate' });
		expect(result.outcomes).toHaveLength(2);
		expect(result.outcomes.map((o) => o.outcome.id)).toContain('commune');
	});

	it('expresses each outcome as a share of the total, for the ranked bars', () => {
		const result = score(weighted, { money: 'separate', space: 'communal' });
		const total = result.outcomes.reduce((sum, o) => sum + o.share, 0);
		expect(total).toBeCloseTo(1);
	});

	it('scores a partially answered quiz rather than refusing', () => {
		const result = score(weighted, { money: 'separate' });
		expect(result.answered).toBe(1);
		expect(result.total).toBe(2);
		expect(result.outcomes[0].outcome.id).toBe('cohousing');
	});

	it('gives every outcome a zero share when nothing is answered', () => {
		const result = score(weighted, {});
		expect(result.outcomes.every((o) => o.share === 0)).toBe(true);
	});
});

describe('check scoring', () => {
	it('counts a single correct answer', () => {
		expect(score(check, { q1: 'b' }).correct).toBe(1);
	});

	it('does not count a wrong answer', () => {
		expect(score(check, { q1: 'a' }).correct).toBe(0);
	});

	it('requires every correct option on a multiple-answer question', () => {
		expect(score(check, { q2: ['a'] }).correct).toBe(0);
		expect(score(check, { q2: ['a', 'b'] }).correct).toBe(1);
	});

	it('rejects a correct set that also includes a wrong option', () => {
		expect(score(check, { q2: ['a', 'b', 'c'] }).correct).toBe(0);
	});
});

describe('profile scoring', () => {
	it('reports each dimension as a proportion of its maximum', () => {
		const result = score(profile, { q1: 'yes', q2: 'no' });
		const governance = result.dimensions.find((d) => d.dimension.id === 'governance')!;
		const money = result.dimensions.find((d) => d.dimension.id === 'money')!;
		expect(governance.share).toBe(1);
		expect(money.share).toBe(0);
	});

	it('never divides by zero when a dimension has no points available', () => {
		const empty: QuizDefinition = { ...profile, questions: [] };
		expect(score(empty, {}).dimensions.every((d) => d.share === 0)).toBe(true);
	});
});

describe('isComplete', () => {
	it('is false while a question is unanswered', () => {
		expect(isComplete(weighted, { money: 'separate' })).toBe(false);
	});

	it('is true once every question has an answer', () => {
		expect(isComplete(weighted, { money: 'separate', space: 'private' })).toBe(true);
	});

	it('treats an empty multi-select as unanswered', () => {
		expect(isComplete(check, { q1: 'b', q2: [] })).toBe(false);
	});
});
