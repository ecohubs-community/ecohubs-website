import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 01's check, and the guide's central skill.
 *
 * The same three options on every question, deliberately: the point is not to
 * recognise five unrelated scenarios but to practise one judgement until it is
 * available under stress. A reader who has answered "the structure" four times
 * has learned something a paragraph cannot teach them.
 *
 * Weighted towards structural answers because the lesson's claim is that the
 * reverse mistake — reading a structural failure as somebody's character — is
 * both more common and more expensive. The two exceptions are there so the
 * quiz does not simply teach "always blame the structure", which would be its
 * own miscalibration and would leave a community unable to name conduct.
 */
export const structureOrPerson: QuizDefinition = {
	id: 'structure-or-person',
	mode: 'check',
	title: 'Is it the structure, or is it the person?',
	intro:
		'Five situations. In each one, decide whether you are looking at something the structure produces — which would happen to whoever was standing there — or something about this particular person. They look identical from inside, and the wrong answer costs years.',
	questions: [
		{
			id: 'treasurer',
			prompt:
				'Over six years three different people have held the money role. Each time, within about a year, the group is complaining that spending decisions get made without them.',
			options: [
				{
					id: 'structure',
					label: 'The structure — this would happen to whoever was standing there',
					correct: true,
					explanation:
						'Right, and this is the cleanest test there is. When the same complaint survives three changes of personnel, the one thing it cannot be about is the personnel. Something about the role — its limits, its spending threshold, what it must bring back to the group — was never written, so each new holder discovers the boundary by crossing it.'
				},
				{
					id: 'person',
					label: 'The person — the last three have all overreached',
					explanation:
						'Three people with nothing in common but a job title is not a run of bad luck. If your explanation requires each of them to have independently developed the same fault, the explanation is doing too much work.'
				},
				{
					id: 'both',
					label: 'Both, and the structure has to be dealt with first',
					explanation:
						'Defensible, but it concedes too much. There is no evidence here about any of the three as people — only about what happens to anybody who takes the role. Adding a character question invites a conversation that will hurt somebody for no diagnostic gain.'
				}
			],
			href: '/learn/failures/invisible-power-via-responsibilities'
		},
		{
			id: 'talking-over',
			prompt:
				'One member routinely talks over others. They have been asked privately three times, by three different people, and agreed each time. Nobody else who has facilitated has done this.',
			options: [
				{
					id: 'person',
					label: 'The person — this is about conduct, and no rule will fix it',
					correct: true,
					explanation:
						'Right. Asked, agreed, unchanged, three times, and not reproduced by anybody else in the same position — that is conduct, and a decision matrix has nothing to say about it. Communities reach for a structural fix here because it feels less confrontational, and they end up writing a rule that constrains everybody in order to avoid one conversation.'
				},
				{
					id: 'structure',
					label: 'The structure — there is no facilitator with authority to intervene',
					explanation:
						'Worth fixing anyway, and it will make the room better. But it does not explain this: other facilitators in the same structure do not produce this behaviour, and someone who has agreed three times and changed nothing is telling you something about themselves.'
				},
				{
					id: 'both',
					label: 'Both, and the structure has to be dealt with first',
					explanation:
						'Doing the structural half first is exactly how this gets postponed for another two years. A facilitation agreement gives the group something to point at, which is useful — and it is also a way of never saying the thing to the person.'
				}
			],
			href: '/learn/guides/why-communities-fail/conflict-that-never-resolves'
		},
		{
			id: 'founder',
			prompt:
				'Nothing proceeds if the founder disapproves, though no document says they may decide anything alone. Asked about it, the founder says — sincerely — that they wish other people would take more on.',
			options: [
				{
					id: 'structure',
					label: 'The structure — this would happen to whoever was standing there',
					correct: true,
					explanation:
						'Right, and the sincerity is the evidence, not a defence. Informal power is not something people feel themselves holding; it is something other people feel themselves working around. The founder is describing their experience accurately and it tells you nothing about whether the veto exists. What exists is an authority nobody granted, nobody can limit, and nobody can inherit.'
				},
				{
					id: 'person',
					label: 'The person — they are more attached to control than they admit',
					explanation:
						'This is the reading that feels insightful and closes the only door that was open. It requires the founder to be lying about their own experience, which is both unlikely and unprovable — and it turns a question about roles into a question about somebody’s character, which cannot be raised in a meeting.'
				},
				{
					id: 'both',
					label: 'Both, and the structure has to be dealt with first',
					explanation:
						'The structural half is the whole of it here. There is nothing on the record about how this founder behaves — only about what the group does in anticipation, which is a fact about the group.'
				}
			],
			href: '/learn/failures/founder-informal-veto'
		},
		{
			id: 'decision-type',
			prompt:
				'A question about the guest policy went to the whole group last spring and was settled by two people in the autumn. Both times, everyone involved thought they were following the normal process.',
			options: [
				{
					id: 'structure',
					label: 'The structure — this would happen to whoever was standing there',
					correct: true,
					explanation:
						'Right. Nobody bent a rule, because there was no rule to bend: the same question is operational or constitutional depending on who is asked, so both routes were taken in good faith. Until decisions carry a stated type, every borderline case drifts toward whichever meeting is easier to convene.'
				},
				{
					id: 'person',
					label: 'The person — whoever took it in the autumn overstepped',
					explanation:
						'They thought they were following the normal process, and so did everybody around them at the time. Somebody who cannot have known they were overstepping has not overstepped; they have found a gap.'
				},
				{
					id: 'both',
					label: 'Both, and the structure has to be dealt with first',
					explanation:
						'Nothing here distinguishes the autumn pair from the spring group except which route they took. Treating that as partly a character question would make two people answer for a gap the whole community left open.'
				}
			],
			href: '/learn/failures/undefined-decision-type'
		},
		{
			id: 'accounts',
			prompt:
				'A member is genuinely unpleasant in meetings — several people have stopped coming. They are also the only person who understands the accounts, and have been for eleven years.',
			options: [
				{
					id: 'both',
					label: 'Both, and the structure has to be dealt with first',
					correct: true,
					explanation:
						'Right, and this is the one case where the order matters. The conduct is real and needs saying. But a community that cannot survive a month without this person cannot have that conversation honestly — every version of it is shadowed by what happens if they walk out. Get a second person into the accounts and the conversation becomes possible. Do it the other way round and you are negotiating with someone who holds the lights.'
				},
				{
					id: 'person',
					label: 'The person — this is about conduct, and no rule will fix it',
					explanation:
						'The conduct is not in doubt. What is in doubt is whether this group can act on it, and eleven years of sole custody of the accounts is the reason it has not. Naming the behaviour without changing the dependency is how communities arrive at an ultimatum they cannot afford to mean.'
				},
				{
					id: 'structure',
					label: 'The structure — this would happen to whoever was standing there',
					explanation:
						'The single point of failure is structural and would happen to anybody. Being unpleasant in meetings would not. Reading this as purely structural is how a group talks about succession planning for two years and never mentions why people stopped coming.'
				}
			],
			href: '/learn/failures/invisible-power-via-responsibilities'
		}
	]
};
