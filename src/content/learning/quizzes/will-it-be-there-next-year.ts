import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 03's check.
 *
 * The run rate is the one calculation in this guide a community can do in an
 * evening and almost none have done, so the quiz rehearses the step that
 * actually stops people: deciding which lines on last year's income count.
 * Every figure here is invented, because the point is the classification
 * rather than any real community's numbers.
 *
 * The third option exists because "recurring" and "one-off" are not the honest
 * pair. Most of what quietly holds a community's budget together is neither —
 * it recurs exactly as long as a grant term, a person's health, or a reserve
 * balance allows, and calling that income is how thirty years happens.
 */
export const willItBeThereNextYear: QuizDefinition = {
	id: 'will-it-be-there-next-year',
	mode: 'check',
	title: 'Which of these will be there next year?',
	intro:
		'Five lines from a community’s income last year. The run rate is not the budget — it is the gap between what recurs and what does not, and working it out means classifying each line honestly. Assume the community needs about €95,000 a year to operate.',
	questions: [
		{
			id: 'land',
			prompt: '€18,000 from selling a strip of land along the north boundary to a neighbour.',
			options: [
				{
					id: 'once',
					label: 'One-off — this year only',
					correct: true,
					explanation:
						'Right, and the follow-up question is the one that changes the conversation: how many more of these are there? A community closing an €18,000 gap from land sales, with three saleable parcels left, has three years. Findhorn’s own audited accounts record over thirty years of selling non-core assets to cover deficits — no single year of which was the mistake.'
				},
				{
					id: 'recurring',
					label: 'Recurring — it will be there next year',
					explanation:
						'Only if there is another strip, and then another. That is precisely the arithmetic communities avoid doing: each sale is defensible on its own, and the pattern never appears on an agenda because a pattern is not an agenda item.'
				},
				{
					id: 'conditional',
					label: 'Recurring, but only while something else lasts',
					explanation:
						'Closer than it looks — the something else is the land. But treat this as income of any kind and you have already made the choice the lesson is about, which is whether the model or the commons is the fixed variable.'
				}
			],
			href: '/learn/failures/commons-privatization-through-land-sales'
		},
		{
			id: 'courses',
			prompt: '€24,000 in course fees. It has been between €21,000 and €26,000 for six years.',
			options: [
				{
					id: 'recurring',
					label: 'Recurring — it will be there next year',
					correct: true,
					explanation:
						'Right. Six years of a stable band is about as good as evidence gets for a small organisation, and this is the kind of line a run rate is built on. Worth knowing what it depends on — a venue, an accreditation, two people who teach — but on the numbers alone this recurs.'
				},
				{
					id: 'conditional',
					label: 'Recurring, but only while something else lasts',
					explanation:
						'Everything is conditional on something eventually. Six years of stability is real evidence, and treating solid recurring income as fragile makes the run rate as useless as ignoring the fragile lines does.'
				},
				{
					id: 'once',
					label: 'One-off — this year only',
					explanation:
						'Nothing here suggests that. The discipline of the exercise is to be equally honest in both directions, or the number it produces is just a mood.'
				}
			]
		},
		{
			id: 'reserve',
			prompt: '€30,000 drawn from the reserve fund to cover the winter heating bills.',
			options: [
				{
					id: 'once',
					label: 'One-off — this year only',
					correct: true,
					explanation:
						'Right, and it is not really income at all — it is last year’s surplus being spent again. A reserve fund with a stated purpose exists so that this is a decision somebody has to make and record. Drawn quietly, twice, it becomes the way the winter gets paid for, and the reserve is gone in the year the roof goes.'
				},
				{
					id: 'conditional',
					label: 'Recurring, but only while something else lasts',
					explanation:
						'Defensible arithmetic — it lasts as long as the balance does. But classifying a reserve draw as any kind of income is the error itself: money already earned, counted a second time, in a year it was not earned in.'
				},
				{
					id: 'recurring',
					label: 'Recurring — it will be there next year',
					explanation:
						'A reserve that funds operating costs every year is not a reserve. This is the clearest case in the set for the rule that shortfalls should not be funded from capital without a decision at the constitutional tier.'
				}
			],
			href: '/learn/glossary/reserve-fund'
		},
		{
			id: 'grant',
			prompt: '€12,000 from a regional grant. It is a three-year award and this was year two.',
			options: [
				{
					id: 'conditional',
					label: 'Recurring, but only while something else lasts',
					correct: true,
					explanation:
						'Right, and the useful version of that answer has a date in it: one more year. This is the most common way a community is surprised by a gap it could have seen coming — the grant was in the budget for three years running, so it stopped feeling like a grant and started feeling like income.'
				},
				{
					id: 'recurring',
					label: 'Recurring — it will be there next year',
					explanation:
						'It will be there next year, and not the year after. That distinction is the entire value of doing this exercise more than twelve months out.'
				},
				{
					id: 'once',
					label: 'One-off — this year only',
					explanation:
						'Too pessimistic, and being wrong in this direction has its own cost: a community that writes off a year of funding it actually has may cut something it did not need to cut.'
				}
			]
		},
		{
			id: 'unpaid',
			prompt:
				'€9,000 that does not appear anywhere, being what the community would have paid for the bookkeeping, the maintenance and the bookings if one member were not doing all three unpaid.',
			options: [
				{
					id: 'conditional',
					label: 'Recurring, but only while something else lasts',
					correct: true,
					explanation:
						'Right, and the something else is a person. This line is invisible precisely because it never enters the accounts, which is what makes it the most dangerous entry in the set: the community discovers the number on the day that member is ill, resigns, or finally says no. Put it in the run rate anyway — with the name of what it depends on beside it.'
				},
				{
					id: 'recurring',
					label: 'Recurring — it will be there next year',
					explanation:
						'It has recurred for years, which is why everyone has stopped seeing it. But nothing obliges it to recur, no agreement records it, and the person doing it is usually the last to raise it.'
				},
				{
					id: 'once',
					label: 'One-off — this year only',
					explanation:
						'It is the opposite of a one-off — it is the line most likely to have been there, unremarked, for a decade. The reason to count it is that a community which cannot see it cannot replace it either.'
				}
			],
			href: '/learn/failures/invisible-care-labor-burnout'
		}
	]
};
