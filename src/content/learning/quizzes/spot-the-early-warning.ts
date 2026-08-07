import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 10's check.
 *
 * The exercise is calibration rather than recall. Several of these sound
 * alarming and are not — a serious conflict that two households left over is
 * evidence the place is real — and the most dangerous one sounds like
 * administrative untidiness.
 *
 * Three answers per question rather than two, because "amber" is the honest
 * verdict on a good deal of what a visitor sees, and a red/green quiz would
 * teach a reader to sort the world into alarms and non-alarms.
 */
export const spotTheEarlyWarning: QuizDefinition = {
	id: 'spot-the-early-warning',
	mode: 'check',
	title: 'Spot the early warning',
	intro:
		'Five things you might notice on a visit. Which ones would genuinely worry you? Some of these sound much worse than they are, and one sounds like nothing at all.',
	questions: [
		{
			id: 'founders',
			prompt:
				'Twelve years in, the founders still make most of the significant decisions. Nothing about their role is written down — it is simply how things happen.',
			options: [
				{
					id: 'red',
					label: 'Serious — I would want this resolved before joining',
					correct: true,
					explanation:
						'Right. This is founder authority that never converted into anything anyone can hold. It is not that the founders are doing wrong; it is that their power cannot be delegated, limited, questioned or inherited, so the community has no way to continue without them and no way to disagree with them.'
				},
				{
					id: 'amber',
					label: 'Worth watching, but not disqualifying',
					explanation:
						'Twelve years is long past the point where this is a phase. Early on, founders deciding things is simply how a project gets built; a decade later, an unwritten authority is the structure, and the community has quietly chosen not to have a governance system.'
				},
				{
					id: 'fine',
					label: 'Normal — someone has to lead',
					explanation:
						'Leadership is not the issue. Unaccountable leadership is: nobody voted for it, nobody can end it, and the founders themselves usually cannot put it down even when they want to.'
				}
			]
		},
		{
			id: 'conflict',
			prompt:
				'There was a serious conflict here last year. It went on for months and in the end two households left.',
			options: [
				{
					id: 'fine',
					label: 'Not a warning sign in itself',
					correct: true,
					explanation:
						'Right, and this is the one people misread most. A community that has had a real conflict and survived it has information about itself that a placid one does not. The follow-up question is the whole thing: what changed afterwards? An answer names a rule, a process or a role. No answer means it was endured rather than resolved.'
				},
				{
					id: 'red',
					label: 'Serious — two households is a lot',
					explanation:
						'Departures are the visible part and the least informative. Communities that never lose anybody are usually either very young or very good at making people quietly stop speaking up.'
				},
				{
					id: 'amber',
					label: 'Worth watching',
					explanation:
						'Reasonable caution, but it points at the wrong thing. Watch what the community did after, not the fact that it happened.'
				}
			]
		},
		{
			id: 'agreements',
			prompt:
				'You ask to read the agreements. Everyone is friendly about it, and after twenty minutes nobody can find a current copy.',
			options: [
				{
					id: 'red',
					label: 'Serious — this is the most dangerous item here',
					correct: true,
					explanation:
						'Right, and it is the quiet one. Agreements nobody can find are agreements nobody has consulted, which means the community is running on memory and habit. Every dispute now becomes an argument about what was decided, settled by whoever has been there longest — which is founder authority arriving by the back door.'
				},
				{
					id: 'amber',
					label: 'Untidy, but a filing problem',
					explanation:
						'That is exactly how it presents, which is why it survives for years. The test is not whether the document is tidy but whether anyone has read it recently; a text nobody consults has stopped governing anything.'
				},
				{
					id: 'fine',
					label: 'Fine — the culture is what matters',
					explanation:
						'Culture is what happens when everyone agrees. Agreements are what you need when they do not, and the moment you need them is exactly the moment nobody can find them.'
				}
			]
		},
		{
			id: 'meetings',
			prompt:
				'Meetings routinely run to three hours. Several people mention, without much rancour, that they are exhausting.',
			options: [
				{
					id: 'amber',
					label: 'Worth watching — a fixable problem',
					correct: true,
					explanation:
						'Right. This is usually a method problem rather than a power problem: too much brought to the whole group, no delegated domains, weak facilitation. It is genuinely fixable, and communities fix it all the time. It becomes serious only if you find they have known for years and nothing has changed.'
				},
				{
					id: 'red',
					label: 'Serious — this will burn people out',
					explanation:
						'It does burn people out, and it is still the most tractable item on this page. Long meetings have known remedies — circles with real authority, a consent threshold, a rotating facilitator — and a community open enough to admit its meetings are exhausting is usually open enough to try them.'
				},
				{
					id: 'fine',
					label: 'Normal — self-governance takes time',
					explanation:
						'Partly true, and it is also how a community ends up with a governing class of whoever can still concentrate at eleven at night. Length is not a virtue.'
				}
			]
		},
		{
			id: 'single-point',
			prompt:
				'One member covers a large share of the running costs. Asked what would happen if they left, people laugh and say they never would.',
			options: [
				{
					id: 'red',
					label: 'Serious — the community has a single point of failure',
					correct: true,
					explanation:
						'Right, and there are two problems, not one. The financial exposure is obvious. The subtler one is that a member the community cannot afford to lose has power nobody granted them and nobody can name — which distorts every decision they have an opinion about, whether or not they ever use it.'
				},
				{
					id: 'amber',
					label: 'Worth watching',
					explanation:
						'The laughter is the finding. A community that has thought about this has an answer — a reserve, a plan, a cap on any one member’s share — and one that has not is relying on a person rather than a structure.'
				},
				{
					id: 'fine',
					label: 'Fine — generosity is a good thing',
					explanation:
						'It usually is generous, and generously meant. It is still a dependency, and dependencies that nobody will discuss are the ones that end projects.'
				}
			]
		}
	]
};
