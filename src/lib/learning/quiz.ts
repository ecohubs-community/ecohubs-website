/**
 * Quiz definitions and scoring.
 *
 * One component, three modes — the differences are in how answers are scored
 * and how the result is drawn, not in the interaction:
 *
 *   weighted  each option carries weights across outcomes; highest total wins
 *   check     each option is right or wrong, with an explanation
 *   profile   questions grouped into dimensions; result is a per-dimension shape
 *
 * The scoring here is deliberately pure — no DOM, no storage, no component —
 * so it can be unit-tested directly. Nothing is ever submitted anywhere.
 */

export type QuizMode = 'weighted' | 'check' | 'profile';

export interface QuizOption {
	id: string;
	label: string;
	/** `weighted`: points contributed to each outcome id. */
	weights?: Record<string, number>;
	/** `profile`: points contributed to each dimension id. */
	scores?: Record<string, number>;
	/** `check`: whether this option is a correct answer. */
	correct?: boolean;
	/** `check`: shown once the reader answers, right or wrong. */
	explanation?: string;
}

export interface QuizQuestion {
	id: string;
	prompt: string;
	/** `check`: allow more than one correct answer. */
	multiple?: boolean;
	options: QuizOption[];
	/** Where to send a reader who wants the reasoning. */
	href?: string;
}

export interface QuizOutcome {
	id: string;
	title: string;
	/** Written as content, not a punchline — it is indexable and quotable. */
	description: string;
	href?: string;
}

export interface QuizDimension {
	id: string;
	label: string;
	description: string;
}

export interface QuizDefinition {
	id: string;
	mode: QuizMode;
	title: string;
	/** One or two sentences saying what the quiz measures. Rendered above it. */
	intro: string;
	questions: QuizQuestion[];
	/** `weighted` only. */
	outcomes?: QuizOutcome[];
	/** `profile` only. */
	dimensions?: QuizDimension[];
}

/** A reader's answers: question id → chosen option id(s). */
export type Answers = Record<string, string | string[]>;

export interface ScoredOutcome {
	outcome: QuizOutcome;
	score: number;
	/** Share of the total, 0–1, for the ranked bars. */
	share: number;
}

export interface QuizResult {
	/** `weighted`: every outcome, highest first. Never a single winner only —
	 *  showing the full ranking is more honest than declaring one answer. */
	outcomes: ScoredOutcome[];
	/** `profile`: dimension id → 0–1. */
	dimensions: { dimension: QuizDimension; score: number; max: number; share: number }[];
	/** `check`: how many questions were answered correctly. */
	correct: number;
	answered: number;
	total: number;
}

function chosen(answers: Answers, question: QuizQuestion): QuizOption[] {
	const raw = answers[question.id];
	if (raw === undefined) return [];
	const ids = Array.isArray(raw) ? raw : [raw];
	return question.options.filter((o) => ids.includes(o.id));
}

/**
 * Score a set of answers.
 *
 * Unanswered questions are simply skipped rather than counted as wrong, so a
 * partially completed quiz still gives a usable reading.
 */
export function score(definition: QuizDefinition, answers: Answers): QuizResult {
	const totals = new Map<string, number>();
	const dimensionTotals = new Map<string, number>();
	const dimensionMax = new Map<string, number>();
	let correct = 0;
	let answered = 0;

	for (const question of definition.questions) {
		const picked = chosen(answers, question);
		if (picked.length > 0) answered++;

		for (const option of picked) {
			for (const [outcome, points] of Object.entries(option.weights ?? {})) {
				totals.set(outcome, (totals.get(outcome) ?? 0) + points);
			}
			for (const [dimension, points] of Object.entries(option.scores ?? {})) {
				dimensionTotals.set(dimension, (dimensionTotals.get(dimension) ?? 0) + points);
			}
		}

		// The best possible score per dimension, so a profile is a proportion
		// rather than a raw number nobody can interpret.
		for (const dimension of definition.dimensions ?? []) {
			const best = Math.max(0, ...question.options.map((o) => o.scores?.[dimension.id] ?? 0));
			dimensionMax.set(dimension.id, (dimensionMax.get(dimension.id) ?? 0) + best);
		}

		if (definition.mode === 'check' && picked.length > 0) {
			const expected = question.options.filter((o) => o.correct).map((o) => o.id);
			const got = picked.map((o) => o.id);
			const same =
				expected.length === got.length && expected.every((id) => got.includes(id));
			if (same) correct++;
		}
	}

	const outcomeSum = [...totals.values()].reduce((a, b) => a + b, 0);
	const outcomes = (definition.outcomes ?? [])
		.map((outcome) => {
			const value = totals.get(outcome.id) ?? 0;
			return {
				outcome,
				score: value,
				share: outcomeSum > 0 ? value / outcomeSum : 0
			};
		})
		.sort((a, b) => b.score - a.score || a.outcome.title.localeCompare(b.outcome.title));

	const dimensions = (definition.dimensions ?? []).map((dimension) => {
		const value = dimensionTotals.get(dimension.id) ?? 0;
		const max = dimensionMax.get(dimension.id) ?? 0;
		return { dimension, score: value, max, share: max > 0 ? value / max : 0 };
	});

	return {
		outcomes,
		dimensions,
		correct,
		answered,
		total: definition.questions.length
	};
}

/** True once every question has an answer. */
export function isComplete(definition: QuizDefinition, answers: Answers): boolean {
	return definition.questions.every((q) => {
		const raw = answers[q.id];
		return Array.isArray(raw) ? raw.length > 0 : Boolean(raw);
	});
}
