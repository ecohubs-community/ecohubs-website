import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * The check for the Decision Methods topic.
 *
 * Sorting decisions by stakes is the transferable idea on that page, and it is
 * one people agree with in the abstract and get wrong the moment a concrete
 * case arrives. Five decisions, and three of them are traps: one looks
 * administrative and changes how the group decides, one looks like a purchase
 * and commits the land, and one looks like a favour and is really about who
 * lives here.
 *
 * The explanations carry the teaching — including the escalation rule, which
 * is what makes the scheme hold rather than leak downward.
 */
export const whichTierIsThisDecision: QuizDefinition = {
	id: 'which-tier-is-this-decision',
	mode: 'check',
	title: 'Which tier is this decision?',
	intro:
		'Operational decisions are day-to-day business inside rules already agreed. Strategic decisions commit real money or change direction. Constitutional decisions change the community’s purpose, its agreements, its membership rules, or how it decides. Five decisions — which tier does each belong to?',
	questions: [
		{
			id: 'greenhouse-pump',
			prompt:
				'Replace the failed greenhouse pump — €340, from the maintenance budget agreed in March.',
			options: [
				{
					id: 'operational',
					label: 'Operational',
					correct: true,
					explanation:
						'Right. It spends money the group has already allocated, for a purpose already agreed, and it is entirely reversible. This is exactly what a maintenance circle’s domain is for — and if it still reaches a general meeting, that domain was never real.'
				},
				{
					id: 'strategic',
					label: 'Strategic',
					explanation:
						'The amount feels significant, but the test is not size — it is whether the decision commits the community to something new. This one operates inside a budget the group already approved.'
				},
				{
					id: 'constitutional',
					label: 'Constitutional',
					explanation:
						'Nothing here touches the community’s purpose, agreements or membership. Treating routine spending this way is how a group ends up with four-hour meetings about pumps.'
				}
			]
		},
		{
			id: 'barn-loan',
			prompt: 'Borrow €120,000 to convert the barn into four more homes.',
			options: [
				{
					id: 'operational',
					label: 'Operational',
					explanation:
						'No amount of routine framing makes a twenty-year debt operational. The test that catches this: how long would it take to undo, and what would undoing it cost?'
				},
				{
					id: 'strategic',
					label: 'Strategic',
					correct: true,
					explanation:
						'Right. It commits significant resource and changes the community’s direction, but it does not change the rules the community lives by. A supermajority, a real deliberation window, and a delay before it takes effect all earn their cost here.'
				},
				{
					id: 'constitutional',
					label: 'Constitutional',
					explanation:
						'Close, and worth arguing. If four more homes would take the community past a size its agreements were written for, it becomes constitutional too — which is a good illustration of why the escalation rule exists.'
				}
			]
		},
		{
			id: 'quorum-change',
			prompt:
				'Lower the quorum for budget votes from two-thirds of members to half, because meetings keep failing to reach it.',
			options: [
				{
					id: 'operational',
					label: 'Operational',
					explanation:
						'This is the trap. It arrives as housekeeping — a number that is not working, adjusted. But the number is part of how the community decides, which puts it in a different category entirely.'
				},
				{
					id: 'strategic',
					label: 'Strategic',
					explanation:
						'It commits no money and changes no direction. What it changes is the machinery, and that is a category of its own.'
				},
				{
					id: 'constitutional',
					label: 'Constitutional',
					correct: true,
					explanation:
						'Right. Any change to how the group decides is constitutional, however administrative it looks — and it should be decided under the *old* rule, not the new one. The underlying problem is real, and the honest fix is usually to lower the quorum for operational business while leaving it high where it matters.'
				}
			]
		},
		{
			id: 'grazing-licence',
			prompt:
				'Accept a neighbouring farmer’s offer to graze sheep on the lower field for three years. No money changes hands.',
			options: [
				{
					id: 'operational',
					label: 'Operational',
					explanation:
						'The absence of money is doing a lot of work here. A three-year commitment of land is not reversible next season, and "it costs nothing" is not the same as "it commits nothing".'
				},
				{
					id: 'strategic',
					label: 'Strategic',
					correct: true,
					explanation:
						'Right. It commits a significant shared asset for years and forecloses other uses of that field — a direction decision wearing the clothes of a favour. Resource does not only mean cash.'
				},
				{
					id: 'constitutional',
					label: 'Constitutional',
					explanation:
						'Defensible if the community’s stated purpose says something specific about how its land is used — in which case this is testing that purpose and belongs higher. Otherwise it is a significant commitment inside existing aims.'
				}
			]
		},
		{
			id: 'adult-son',
			prompt:
				'Let a member’s adult son stay in their spare room for six months while he looks for work.',
			options: [
				{
					id: 'operational',
					label: 'Operational',
					explanation:
						'It is operational *if* the group has a written guest policy that covers a six-month stay. Most groups do not, and answering it case by case is how a community decides its membership rules by precedent without ever noticing.'
				},
				{
					id: 'strategic',
					label: 'Strategic',
					explanation:
						'No resource is being committed. What is at stake is who lives here and on what basis — a question about the rules rather than about the plan.'
				},
				{
					id: 'constitutional',
					label: 'Constitutional',
					correct: true,
					explanation:
						'Right, in the absence of a written rule. Anything touching who lives here and for how long is membership territory, and an unclassifiable decision defaults to the higher tier. The real answer is to decide it once, properly, as a guest policy — and then every case after it genuinely is operational.'
				}
			]
		}
	]
};
