import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 04's check — the best quiz opportunity in the guide.
 *
 * Telling a preference from a paramount objection is the single most useful
 * distinction in community governance, it is genuinely hard to absorb from
 * prose, and it is easy to test. Five statements, and two of them are
 * deliberately not a clean yes or no: one belongs to the conflict process
 * rather than the decision, and one is a stand-aside.
 *
 * Explanations carry the teaching, so they are written to be worth reading
 * whether the reader got it right or wrong.
 */
export const isThisABlockingConcern: QuizDefinition = {
	id: 'is-this-a-blocking-concern',
	mode: 'check',
	title: 'Is this a blocking concern?',
	intro:
		'A proposal is on the table: replace the common house roof this autumn, using the maintenance fund. Five people speak. Which of them has raised something that should stop the decision?',
	questions: [
		{
			id: 'different-builder',
			prompt: '"I would have chosen a different builder."',
			options: [
				{
					id: 'block',
					label: 'A blocking concern',
					explanation:
						'This is a preference. It may be an informed one, and it is worth hearing during the proposal stage — but it names no harm to the group or its aim. Treating preferences as blocks is how consensus quietly becomes a veto.'
				},
				{
					id: 'preference',
					label: 'A preference',
					correct: true,
					explanation:
						'Right. The test is not whether you would have done it differently; it is whether this would damage the group or stop it meeting its aim. "I would have chosen differently" almost never clears that bar.'
				}
			]
		},
		{
			id: 'winter-fund',
			prompt: '"This spends the reserve we agreed in March to hold for winter heating repairs."',
			options: [
				{
					id: 'block',
					label: 'A blocking concern',
					correct: true,
					explanation:
						'Right. It names a specific harm, ties it to something the group already agreed, and is checkable — anyone can go and read the March minutes. This is exactly the shape a valid objection takes.'
				},
				{
					id: 'preference',
					label: 'A preference',
					explanation:
						'It reads like a factual correction, which is what makes it strong. A reasoned objection points at a consequence the group has already said it does not want.'
				}
			]
		},
		{
			id: 'dont-trust',
			prompt: '"I don\'t trust the person who brought this proposal."',
			options: [
				{
					id: 'block',
					label: 'A blocking concern',
					explanation:
						'It may be a serious and legitimate problem — but it is not an objection to this proposal, and blocking here would settle nothing. The roof still needs deciding, and the distrust would surface again next month on a different subject.'
				},
				{
					id: 'neither',
					label: 'Neither — this belongs somewhere else',
					correct: true,
					explanation:
						'Right, and this is the one groups handle worst. A real concern about a person goes to the conflict process, not the decision. Communities that let it be raised as a block end up relitigating a relationship every time anyone proposes anything.'
				}
			]
		},
		{
			id: 'no-new-debt',
			prompt: '"We agreed last year not to take on new debt, and this needs a loan."',
			options: [
				{
					id: 'block',
					label: 'A blocking concern',
					correct: true,
					explanation:
						'Right. Like the reserve, it is a conflict with a standing agreement — and the resolution is not to override it quietly but to either change the proposal or reopen the agreement deliberately.'
				},
				{
					id: 'preference',
					label: 'A preference',
					explanation:
						'A standing agreement is not a preference. Where a proposal contradicts one, the group has two honest options and neither of them is to proceed while pretending the agreement does not exist.'
				}
			]
		},
		{
			id: 'uneasy',
			prompt: '"Something about this makes me uneasy and I can\'t say what."',
			options: [
				{
					id: 'block',
					label: 'A blocking concern',
					explanation:
						'Not yet — an objection has to be articulable, or nobody can address it and the proposal simply stalls. But dismissing it is the wrong move too: unease often turns out to be right, and it is worth asking for time to find the words.'
				},
				{
					id: 'stand-aside',
					label: 'Not yet — this is a stand-aside',
					correct: true,
					explanation:
						'Right. Standing aside records the disagreement without stopping the group, which is what makes it possible to be honest about doubt. If the unease later becomes specific, it can be raised properly — and the minutes will show who felt it first.'
				}
			]
		}
	]
};
