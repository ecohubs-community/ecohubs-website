import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 01's check.
 *
 * The definition has three conditions and readers absorb them far better by
 * ruling cases in and out than by being told them. Each scenario fails or
 * passes on exactly one condition, so the explanations teach the test rather
 * than just marking the answer.
 *
 * Explanations are written to be worth reading whether the reader got it right
 * or wrong — they render in the server HTML either way.
 */
export const isThisAnIntentionalCommunity: QuizDefinition = {
	id: 'is-this-an-intentional-community',
	mode: 'check',
	title: 'Is this an intentional community?',
	intro:
		'Four real-ish situations. Each one fails or passes on a single condition — chosen membership, proximity, or written agreements. Ruling cases out is the fastest way to learn the definition.',
	questions: [
		{
			id: 'friends-flats',
			prompt:
				'Six friends bought flats in the same building over several years. They eat together most Sundays and lend each other tools. Nothing is written down.',
			options: [
				{
					id: 'yes',
					label: 'Yes — they chose each other and live together',
					explanation:
						'Two of the three conditions are met, and that is exactly the trap. Without written agreements there is no way to settle a disagreement about money, noise or who joins next — which is what the third condition exists for. This is a very good friendship group.'
				},
				{
					id: 'no',
					label: 'No — there are no agreements',
					correct: true,
					explanation:
						'Right. Chosen membership and proximity are both there; the written part is missing. Groups in exactly this position are usually fine for years and then discover, all at once, that they never agreed how to decide anything.'
				}
			]
		},
		{
			id: 'cohousing-project',
			prompt:
				'Forty households in private homes around a common house. There is a written decision-making process, a membership procedure, and a schedule of shared costs.',
			options: [
				{
					id: 'yes',
					label: 'Yes',
					correct: true,
					explanation:
						'All three conditions are met. This is cohousing — the form that asks least of your finances, and much the commoner of the two arrangements this guide compares.'
				},
				{
					id: 'no',
					label: 'No — they do not share income',
					explanation:
						'Sharing income is not part of the definition. Only communes do that, and they are a minority. An intentional community can have entirely private finances.'
				}
			]
		},
		{
			id: 'online-network',
			prompt:
				'Three hundred people worldwide who share a set of values, hold a constitution, elect a council and meet once a year in person.',
			options: [
				{
					id: 'yes',
					label: 'Yes — they have agreements and chose each other',
					explanation:
						'Two conditions again, and a different one missing. Everything here is real and well organised, but nobody lives near anyone else, so none of the daily questions an intentional community exists to answer ever arise.'
				},
				{
					id: 'no',
					label: 'No — they do not live together or nearby',
					correct: true,
					explanation:
						'Right. This is an association or a network. Proximity is what turns shared values into shared laundry, shared noise and shared decisions about the roof.'
				}
			]
		},
		{
			id: 'developer-coliving',
			prompt:
				'A developer markets "co-living" apartments with a shared roof terrace, a co-working room and a residents\' messaging group. Anyone who can pay may buy one.',
			options: [
				{
					id: 'yes',
					label: 'Yes — shared space and a community of residents',
					explanation:
						"Shared facilities are not the test. Nobody chose anybody, there is no membership process, and the building rules are the developer's rather than the residents'. This is a housing product with amenities."
				},
				{
					id: 'no',
					label: 'No — nobody chose each other and nothing governs it',
					correct: true,
					explanation:
						'Right, and this is the most common way the term gets stretched. Watch for it: shared space is easy to build and easy to advertise, while chosen membership and self-governance are neither.'
				}
			]
		}
	]
};
