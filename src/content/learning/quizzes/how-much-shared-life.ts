import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 03's profile.
 *
 * Deliberately not scored against a right answer. It returns a reading across
 * three dimensions and names what each suggests, because "I want a lot of
 * privacy" is a finding rather than a failing — and someone who discovers that
 * about themselves before joining has been served well.
 *
 * Every option scores on every dimension, so the proportions mean something.
 * An option that only ever adds points would make the reading meaningless.
 */
export const howMuchSharedLife: QuizDefinition = {
	id: 'how-much-shared-life',
	mode: 'profile',
	title: 'How much shared life do you actually want?',
	intro:
		'Five questions, no right answers. Communities differ enormously in how much contact, process and privacy they expect, and knowing your own shape first saves everyone a wasted year.',
	dimensions: [
		{
			id: 'contact',
			label: 'Contact',
			description:
				'How much daily overlap with other people you want. High: shared meals most nights, doors open, people in your kitchen. Low: warm neighbours you see when you choose to.'
		},
		{
			id: 'process',
			label: 'Process',
			description:
				'How much collective decision-making you can tolerate — and enjoy. High: you find meetings a reasonable price for being heard. Low: you would rather someone competent just decided.'
		},
		{
			id: 'privacy',
			label: 'Privacy',
			description:
				'How much unobserved life you need. High: you need a door that closes and time nobody accounts for. Low: you are comfortable being known, and being noticed when you are not around.'
		}
	],
	questions: [
		{
			id: 'evenings',
			prompt: 'It is an ordinary Tuesday evening. What would you like to be true?',
			options: [
				{
					id: 'shared-table',
					label: 'Dinner is cooked for thirty people and I am at the table',
					scores: { contact: 3, process: 1, privacy: 0 }
				},
				{
					id: 'sometimes',
					label: 'There is a shared meal I could go to, and tonight I did not',
					scores: { contact: 2, process: 1, privacy: 1 }
				},
				{
					id: 'own-kitchen',
					label: 'I am cooking in my own kitchen and might knock on a door later',
					scores: { contact: 1, process: 0, privacy: 3 }
				}
			]
		},
		{
			id: 'meetings',
			prompt: 'Your community meets for two hours, twice a month. How does that land?',
			options: [
				{
					id: 'good',
					label: 'Good — that is how I know what is happening and get a say',
					scores: { contact: 2, process: 3, privacy: 0 }
				},
				{
					id: 'fine',
					label: 'Fine, if the meetings are well run and actually decide things',
					scores: { contact: 1, process: 2, privacy: 1 }
				},
				{
					id: 'heavy',
					label: 'Heavy — I would want to delegate most of it and be told the outcome',
					scores: { contact: 0, process: 0, privacy: 2 }
				}
			]
		},
		{
			id: 'noticed',
			prompt:
				'You had a difficult week and were visibly not yourself. Several people noticed and one asked.',
			options: [
				{
					id: 'welcome',
					label: 'That is exactly why I want to live somewhere like this',
					scores: { contact: 3, process: 1, privacy: 0 }
				},
				{
					id: 'mixed',
					label: 'Glad someone asked, though I would want to be able to say "not now"',
					scores: { contact: 2, process: 1, privacy: 2 }
				},
				{
					id: 'intrusive',
					label: 'I would find being observed that closely difficult',
					scores: { contact: 0, process: 0, privacy: 3 }
				}
			]
		},
		{
			id: 'work',
			prompt: 'The community needs about four hours a week from each adult. How do you feel?',
			options: [
				{
					id: 'more',
					label: 'Four is low — I would want the work to be a real part of my life here',
					scores: { contact: 3, process: 2, privacy: 0 }
				},
				{
					id: 'about-right',
					label: 'About right, as long as it is counted fairly',
					scores: { contact: 2, process: 2, privacy: 1 }
				},
				{
					id: 'pay-instead',
					label: 'I would rather contribute money than hours',
					scores: { contact: 0, process: 1, privacy: 2 }
				}
			]
		},
		{
			id: 'disagreement',
			prompt: 'You disagree with a decision the group is about to make.',
			options: [
				{
					id: 'talk-it-through',
					label: 'I want the conversation, even if it takes three meetings',
					scores: { contact: 2, process: 3, privacy: 0 }
				},
				{
					id: 'say-once',
					label: 'I say it once, clearly, then live with the outcome',
					scores: { contact: 1, process: 1, privacy: 2 }
				},
				{
					id: 'avoid',
					label: 'I would probably not raise it at all',
					scores: { contact: 0, process: 0, privacy: 3 }
				}
			]
		}
	]
};
