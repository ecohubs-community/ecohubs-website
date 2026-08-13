import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 05's check.
 *
 * The only lesson in the guide where the community can already see the
 * problem, so a recognition quiz would test nothing. What fails here is the
 * response, and it fails in two specific ways — so those are the two wrong
 * answers, on every question, and the reader is choosing between three
 * responses that all sound caring.
 *
 * No names and no attribution: the lesson already carries the one first-hand
 * account it is entitled to, and these are constructed cases.
 */
export const wouldThatActuallyHelp: QuizDefinition = {
	id: 'would-that-actually-help',
	mode: 'check',
	title: 'Would that actually redistribute anything?',
	intro:
		'One member is carrying far too much and everybody knows it. Here are five things a community might do next. All of them are well meant. Two kinds of response fail reliably, and both feel like progress at the time.',
	questions: [
		{
			id: 'step-up',
			prompt:
				'At the next meeting the group agrees that this member has too much on, and that everyone should step up more.',
			options: [
				{
					id: 'description',
					label: 'A description, not an intervention',
					correct: true,
					explanation:
						'Right, and a community can do this twenty times. "You have too much" is a description, and a description cannot be acted on — there is nothing in it anybody could start on Monday. A group that has raised something repeatedly and seen no change does not have a communication problem; it has a missing structure, and more conversation will not produce one.'
				},
				{
					id: 'works',
					label: 'It would change something',
					explanation:
						'Nothing here would. "Everyone" is not a holder and "more" is not a quantity, so there is no version of next week in which anybody has done this or failed to. It is the single most common response to overload and it has no mechanism in it at all.'
				},
				{
					id: 'one-more',
					label: 'It asks the overloaded person for one more thing',
					explanation:
						'Not directly — nothing is asked of them here. That is a different failure, and this one is gentler and just as ineffective.'
				}
			]
		},
		{
			id: 'write-the-list',
			prompt:
				'The group asks the overloaded member to write down everything they do, so it can be shared out.',
			options: [
				{
					id: 'one-more',
					label: 'It asks the overloaded person for one more thing',
					correct: true,
					explanation:
						'Right, and this is the version communities get wrong most reliably, because it looks like exactly the right step. Enumeration is most of the labour — and asking the person with the least room to produce it adds a task to the top of the pile. It is why the attempt fails in the third week, every time, and why the group concludes the person does not really want to let go.'
				},
				{
					id: 'works',
					label: 'It would change something',
					explanation:
						'The list is the right artefact and this is the wrong author. Everything that follows depends on a document only the busiest person can write, which means it does not get written.'
				},
				{
					id: 'description',
					label: 'A description, not an intervention',
					explanation:
						'It is more than a description — it names a concrete deliverable. The problem is who it is addressed to.'
				}
			],
			href: '/learn/failures/invisible-power-via-responsibilities'
		},
		{
			id: 'audit',
			prompt:
				'A member who holds no roles spends two hours with them, writes down each separate thing they do, and comes back to the group with a list of eleven items.',
			options: [
				{
					id: 'works',
					label: 'It would change something',
					correct: true,
					explanation:
						'Right — and note that nothing has been handed over yet. This is the step that gets skipped, done by the only kind of person who can do it: somebody with capacity. Eleven named items can each find a holder. "The admin" cannot. The list is also usually shorter than the group feared and more alarming in what it reveals about single points of failure.'
				},
				{
					id: 'description',
					label: 'A description, not an intervention',
					explanation:
						'A list of eleven named responsibilities is the opposite of a description — it is the thing that makes every later step possible, and it took one person two hours.'
				},
				{
					id: 'one-more',
					label: 'It asks the overloaded person for one more thing',
					explanation:
						'Two hours of their time, once, to produce something that removes work permanently. That is the trade worth making, and it is affordable precisely because somebody else is holding the pen.'
				}
			],
			href: '/learn/failures/undefined-information-access'
		},
		{
			id: 'working-group',
			prompt:
				'The group creates a wellbeing working group to look at workload across the community and report back in due course.',
			options: [
				{
					id: 'description',
					label: 'A description, not an intervention',
					correct: true,
					explanation:
						'Right. A body with no list, no named owner and no date is a description with a membership. Projects need an owner and a deadline; without them this reports back in due course, which is to say at the meeting after the one where somebody remembers to ask. Compare the two hours in the previous question, which produced something.'
				},
				{
					id: 'works',
					label: 'It would change something',
					explanation:
						'A working group is not a holder — it is a set of people who may each reasonably assume another of them is doing it. "In due course" is not a date.'
				},
				{
					id: 'one-more',
					label: 'It asks the overloaded person for one more thing',
					explanation:
						'Usually it does, in the end: the overloaded member joins the working group about their own overload, because they know the most. But the primary failure here is that nothing in it has an owner.'
				}
			]
		},
		{
			id: 'ceiling',
			prompt:
				'The community writes into its agreements that no one person may hold more than three named roles at a time.',
			options: [
				{
					id: 'works',
					label: 'It would change something',
					correct: true,
					explanation:
						'Right, though what it changes is subtler than a handover. Without a stated limit there is no moment at which anybody is entitled to say this is too much without it sounding like a complaint about their own capacity — which is exactly why the overloaded person never says it. A ceiling makes overload a fact about the structure that anyone may point at.'
				},
				{
					id: 'description',
					label: 'A description, not an intervention',
					explanation:
						'A written rule is not a description of the situation; it is a constraint on it, and it applies to people who have not joined yet. It does not redistribute anything by itself, which is why it belongs alongside the audit rather than instead of it.'
				},
				{
					id: 'one-more',
					label: 'It asks the overloaded person for one more thing',
					explanation:
						'It asks them for nothing. What it does is remove the need for them to be the one who raises it, which is the specific thing they have been unable to do.'
				}
			],
			href: '/learn/glossary/invisible-work'
		}
	]
};
