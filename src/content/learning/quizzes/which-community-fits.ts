import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Q1 from the content plan — "Which community type fits you?".
 *
 * The five questions are the five dimensions the taxonomy work settled on:
 * purpose, economic model, governance, land ownership and lifestyle. Keeping
 * the quiz on the same axes as the writing means the result explains itself,
 * and the same vocabulary can drive directory filters later.
 *
 * Outcome descriptions are written as content, not as a punchline: they render
 * in the server HTML whether or not anyone takes the quiz, so they are
 * indexable and worth reading on their own.
 */
export const whichCommunityFits: QuizDefinition = {
	id: 'which-community-fits',
	mode: 'weighted',
	title: 'Which kind of community fits you?',
	intro:
		'Five questions, along the five dimensions that actually predict daily life. There is no right answer — the point is to find out what you are looking for before you go looking.',
	outcomes: [
		{
			id: 'cohousing',
			title: 'Cohousing',
			description:
				'Your own front door and your own finances, with neighbours you actually know. The lowest-risk form here: if it does not work out you sell a home much like any other. Best when you want company and shared facilities rather than a shared economy.',
			href: '/learn/compare/cohousing-vs-ecovillage'
		},
		{
			id: 'ecovillage',
			title: 'Ecovillage',
			description:
				'The ecological work is the point — land, water, food, the long horizon. Expect far more variation in what you are joining, and read carefully: the label is self-applied and covers everything from three households to several hundred.',
			href: '/learn/compare/cohousing-vs-ecovillage'
		},
		{
			id: 'commune',
			title: 'Commune or income-sharing community',
			description:
				'Shared income and usually shared property. It removes internal wealth gaps and most wage-based hierarchy, and it asks for the deepest interdependence of any form here. Read the exit terms before anything else.',
			href: '/learn/topics/intentional-communities'
		},
		{
			id: 'coop',
			title: 'Housing co-operative or land trust',
			description:
				'A legal structure more than a lifestyle: the land or building is held collectively and you hold a right to live there. Strong on affordability and permanence, lighter on shared daily life than the other three.',
			href: '/learn/topics/intentional-communities'
		}
	],
	questions: [
		{
			id: 'purpose',
			prompt: 'What would you most want the place to be for?',
			options: [
				{ id: 'neighbours', label: 'Knowing my neighbours and not raising a family alone', weights: { cohousing: 3, coop: 1 } },
				{ id: 'land', label: 'Healing a piece of land and living from it', weights: { ecovillage: 3, commune: 1 } },
				{ id: 'together', label: 'Building a shared life, not just shared facilities', weights: { commune: 3, ecovillage: 1 } },
				{ id: 'afford', label: 'Somewhere secure I can actually afford, long term', weights: { coop: 3, cohousing: 1 } }
			]
		},
		{
			id: 'money',
			prompt: 'How much would you want money to be shared?',
			options: [
				{ id: 'separate', label: 'Not at all — my income stays mine', weights: { cohousing: 3, coop: 2 } },
				{ id: 'costs', label: 'Shared costs and some shared assets', weights: { coop: 2, ecovillage: 2 } },
				{ id: 'most', label: 'Most things pooled, with a common budget', weights: { ecovillage: 2, commune: 2 } },
				{ id: 'all', label: 'Everything — one purse, needs met from it', weights: { commune: 4 } }
			]
		},
		{
			id: 'governance',
			prompt: 'How should decisions get made?',
			options: [
				{ id: 'light', label: 'Lightly — I would rather not be in many meetings', weights: { coop: 2, cohousing: 2 } },
				{ id: 'consent', label: 'By consent, with written agreements everyone can see', weights: { cohousing: 2, ecovillage: 2 } },
				{ id: 'deep', label: 'Together and at length, even when it is slow', weights: { commune: 3, ecovillage: 1 } },
				{ id: 'delegate', label: 'Mostly delegated to people who know the subject', weights: { coop: 3 } }
			]
		},
		{
			id: 'land',
			prompt: 'What would you want to own?',
			options: [
				{ id: 'home', label: 'My home, outright', weights: { cohousing: 4 } },
				{ id: 'share', label: 'A share of something held in common', weights: { coop: 3, ecovillage: 1 } },
				{ id: 'nothing', label: 'Nothing personally — the land belongs to the project', weights: { commune: 3, ecovillage: 2 } },
				{ id: 'unsure', label: 'I would want that decided carefully, not quickly', weights: { coop: 1, ecovillage: 1, cohousing: 1, commune: 1 } }
			]
		},
		{
			id: 'lifestyle',
			prompt: 'Where and how would you want to live?',
			options: [
				{ id: 'urban', label: 'In or near a town, with my current work and life', weights: { cohousing: 3, coop: 2 } },
				{ id: 'rural', label: 'Rural, hands in the soil, a slower income', weights: { ecovillage: 3, commune: 2 } },
				{ id: 'offgrid', label: 'As self-reliant as possible, off-grid if I can', weights: { ecovillage: 3, commune: 1 } },
				{ id: 'flexible', label: 'Somewhere I can leave and return to without drama', weights: { cohousing: 2, coop: 2 } }
			]
		}
	]
};
