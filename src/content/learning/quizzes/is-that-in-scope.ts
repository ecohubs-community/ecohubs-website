import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 04's check.
 *
 * Unlike the other quizzes in this guide, this one is answered against a
 * document rather than against judgement: the intro states a scope, and every
 * question is decided by reading it. That is the whole point. A community
 * arguing about whether it may have an opinion on somebody's diet is arguing
 * from instinct because it has nothing to read, and the exercise is meant to
 * demonstrate how quickly these stop being arguments once something exists.
 *
 * The hardest question is deliberately one where the scope binds against the
 * reader's sympathies. A boundary that only holds when it is comfortable is
 * not a boundary, and a quiz where every answer felt good would teach the
 * wrong lesson.
 */
export const isThatInScope: QuizDefinition = {
	id: 'is-that-in-scope',
	mode: 'check',
	title: 'Is that the community’s business?',
	intro:
		'A community has written a scope statement. It governs: the land and buildings, the shared budget, the common meals, the work rota, and who becomes a member. It states as out of scope: members’ incomes, their religious practice, and their relationships. Nothing else is written down anywhere. Five things now happen — decide each one against that document, not against what you would want.',
	questions: [
		{
			id: 'oil-job',
			prompt:
				'A member takes a well-paid job with an oil company. Several members find this incompatible with why they are all here.',
			options: [
				{
					id: 'out',
					label: 'Out of scope — they may dislike it, and disliking it is not authority',
					correct: true,
					explanation:
						'Right, and this is the case that proves the document is real. Income is explicitly out of scope, so there is nothing to decide and nobody has to win an argument. If the community wants this to be its business, the route is to declare an identity constraint that is testable and to do it in the calm — not to discover one during a case about a named person.'
				},
				{
					id: 'in',
					label: 'In scope — the agreements cover this',
					explanation:
						'Nothing in the statement reaches it. Reading a general commitment into a scope that lists incomes as out of scope is exactly the move the document exists to prevent, and the next person it is used on will have watched how it was invented.'
				},
				{
					id: 'partly',
					label: 'Partly — separate the part that is governed from the part that is not',
					explanation:
						'There is no governed part here. No land, no budget, no rota and no meal is affected — only how a number of members feel about a colleague’s employer.'
				}
			],
			href: '/learn/failures/governance-creep-into-private-life'
		},
		{
			id: 'business',
			prompt:
				'A member starts a small furniture business, using the shared workshop on weekday evenings and three car-park spaces for deliveries.',
			options: [
				{
					id: 'in',
					label: 'In scope — the agreements cover this',
					correct: true,
					explanation:
						'Right, and note it is not in scope because it is a business. Their income is nobody’s business; the workshop and the car park are listed, and sustained private use of a shared asset is a decision the community is entitled to make. Framed that way it is an ordinary allocation question rather than a referendum on somebody’s livelihood.'
				},
				{
					id: 'out',
					label: 'Out of scope — they may dislike it, and disliking it is not authority',
					explanation:
						'Income is out of scope. The workshop and the car park are explicitly in it, and this uses both, regularly, in a way that affects everyone else’s access.'
				},
				{
					id: 'partly',
					label: 'Partly — separate the part that is governed from the part that is not',
					explanation:
						'A reasonable instinct, and here the ungoverned part is not really in dispute — nobody is proposing to rule on what they earn. The question in front of the group is entirely about the shared assets.'
				}
			]
		},
		{
			id: 'home-school',
			prompt:
				'A member decides to home-school their two children. Several others think this is a mistake and that the children will be isolated.',
			options: [
				{
					id: 'out',
					label: 'Out of scope — they may dislike it, and disliking it is not authority',
					correct: true,
					explanation:
						'Right, and for a different reason from the oil job: this is not on either list. The default rule is what decides it — anything not explicitly declared as in scope is out of scope, so silence resolves in the member’s favour. That is the opposite of how an unwritten arrangement drifts, where silence resolves in favour of whoever feels most strongly.'
				},
				{
					id: 'in',
					label: 'In scope — the agreements cover this',
					explanation:
						'It appears nowhere in the statement. A community that treats an unlisted matter as governed has no scope statement in practice, only a list of things it happens to have thought of first.'
				},
				{
					id: 'partly',
					label: 'Partly — separate the part that is governed from the part that is not',
					explanation:
						'There is no governed part. If the children’s presence at common meals or on the land raised a real question, that would be in scope — but concern about a parenting decision is not that question wearing a disguise.'
				}
			],
			href: '/learn/failures/governance-creep-into-private-life'
		},
		{
			id: 'rota',
			prompt: 'A member has not done a rota shift in four months and has not said why.',
			options: [
				{
					id: 'in',
					label: 'In scope — the agreements cover this',
					correct: true,
					explanation:
						'Right, and the easy half is that the rota is listed. The harder half is what the community may do about it, which the scope statement does not answer — this is where a ladder of cheap, early, reversible steps matters, because a group with only one available response tends to wait until it is furious and then use it.'
				},
				{
					id: 'partly',
					label: 'Partly — separate the part that is governed from the part that is not',
					explanation:
						'Nearly, and worth holding onto: the rota is governed, and why they have stopped may not be. A community can require the shifts without acquiring a right to the reason.'
				},
				{
					id: 'out',
					label: 'Out of scope — they may dislike it, and disliking it is not authority',
					explanation:
						'The work rota is on the list. A scope statement that cannot reach four months of unexplained non-participation is not protecting anybody.'
				}
			],
			href: '/learn/failures/self-sufficiency-without-collective-contribution'
		},
		{
			id: 'partner',
			prompt:
				'A member’s new partner moves into their home. The partner does not come to common meals, does not do rota shifts, and has not applied for anything.',
			options: [
				{
					id: 'partly',
					label: 'Partly — separate the part that is governed from the part that is not',
					correct: true,
					explanation:
						'Right, and doing the separation out loud is what keeps this from becoming a row about somebody’s relationship. The relationship is explicitly out of scope. Who becomes a member is explicitly in it, and so is the rota — so the live questions are what status a resident non-member has and what the household owes, neither of which requires anyone to have a view about the couple.'
				},
				{
					id: 'in',
					label: 'In scope — the agreements cover this',
					explanation:
						'Much of it is, and saying so without qualification is how the conversation ends up including opinions about the partner. The statement lists relationships as out of scope, and that clause earns its keep on exactly this kind of evening.'
				},
				{
					id: 'out',
					label: 'Out of scope — they may dislike it, and disliking it is not authority',
					explanation:
						'The relationship is out of scope; a person living on the land without any defined status is not. A community with no answer here has an undefined membership state, which is where expulsion-without-process cases usually begin.'
				}
			],
			href: '/learn/failures/expulsion-without-due-process'
		}
	]
};
