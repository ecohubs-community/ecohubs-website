import type { QuizDefinition } from '$lib/learning/quiz';

/**
 * Lesson 08's profile — the one interactive piece in the guide that returns no
 * verdict at all.
 *
 * Every other quiz here tells the reader something about themselves. This one
 * refuses to, because the subject is children, ageing and death, and a widget
 * that graded someone's family circumstances would be both useless and
 * offensive. What it produces instead is a list of questions to take to a real
 * community, assembled from the answers given.
 *
 * Deliberately no dimensions. A household with a toddler is not further along
 * a scale than a household with an ageing parent; they need different lists.
 */
export const whatWouldYourHouseholdNeed: QuizDefinition = {
	id: 'what-would-your-household-need',
	mode: 'profile',
	title: 'What would your household need?',
	intro:
		'Six questions about who is in your household and what the next decade might hold. There is no score and no result — at the end you get a list of things worth asking a real community, put together from your answers.',
	questions: [
		{
			id: 'children',
			prompt: 'Are there children in the picture?',
			options: [
				{
					id: 'young',
					label: 'Yes, under school age',
					asks: [
						'How many children under five live here now, and how many did five years ago?',
						'Is childcare shared, and if so is it a rota, a favour, or paid?',
						'Where can a child be, unsupervised, that an adult can still see?'
					]
				},
				{
					id: 'school',
					label: 'Yes, of school age',
					asks: [
						'Which schools do the children here go to, and how do they get there?',
						'Has this community ever run its own school or learning group, and what happened to it?',
						'How are disagreements about other people’s children handled?'
					]
				},
				{
					id: 'teenagers',
					label: 'Yes, teenagers or nearly',
					asks: [
						'What do the teenagers here do on a Friday night, and where do they go?',
						'Has a teenager here ever been asked to change their behaviour by someone who is not their parent? How did that go?',
						'Do young people get a say in decisions, and from what age?'
					]
				},
				{
					id: 'maybe',
					label: 'Possibly, in the next few years',
					asks: [
						'What has happened when a household here has had a baby — did anything change for them practically?',
						'Is there a home here big enough for a growing family, and how would we move into it?'
					]
				},
				{
					id: 'none',
					label: 'No, and not planned',
					asks: [
						'How does the community balance the needs of households with children and those without?',
						'Who pays for things only some households use?'
					]
				}
			]
		},
		{
			id: 'schooling',
			prompt: 'How settled are you about schooling?',
			options: [
				{
					id: 'mainstream',
					label: 'Ordinary local schools are fine',
					asks: [
						'How far is the nearest school, and is there a bus?',
						'Do most families here use the same school? A community whose children are scattered across six schools shares less than it looks.'
					]
				},
				{
					id: 'alternative',
					label: 'We want something alternative',
					asks: [
						'Is what you have here a registered school, a supplementary group, or an intention?',
						'Who teaches, are they paid, and what happens if they leave?',
						'What does the law in this country actually require, and who here has checked recently?'
					]
				},
				{
					id: 'home',
					label: 'We are considering home education',
					asks: [
						'Is home education lawful here, and on what conditions?',
						'Does anyone here home-educate now, and would you introduce us to them?'
					]
				},
				{
					id: 'na',
					label: 'Not applicable',
					asks: []
				}
			]
		},
		{
			id: 'ageing',
			prompt: 'Is anyone in your household ageing, or caring for someone who is?',
			options: [
				{
					id: 'self',
					label: 'We are thinking about our own later years',
					asks: [
						'Who is the oldest person living here, and how long have they been here?',
						'Has anyone grown old and died here? What did the community actually do?',
						'Which homes are step-free, and could one be adapted?'
					]
				},
				{
					id: 'parent',
					label: 'We may need to care for a parent',
					asks: [
						'Could a parent of mine live here, and on what basis — as a member, a guest, or not at all?',
						'Is there a guest room or an annexe, and how is it allocated?',
						'What has the community done when a member needed to be away caring for someone?'
					]
				},
				{
					id: 'both',
					label: 'Both, honestly',
					asks: [
						'What is the community’s position on care — what would you do, and what would you not do?',
						'Has anyone here had to leave because their needs outgrew what the place could offer?'
					]
				},
				{
					id: 'not-yet',
					label: 'Not yet',
					asks: [
						'What is the age spread here? A community with everyone within ten years of each other will meet this all at once.'
					]
				}
			]
		},
		{
			id: 'work',
			prompt: 'Where does your income come from?',
			options: [
				{
					id: 'outside',
					label: 'Jobs outside the community',
					asks: [
						'How do people get to work from here, and how long does it take?',
						'Is the internet good enough to work from home, and who pays for it?'
					]
				},
				{
					id: 'inside',
					label: 'We hope to work here or nearby',
					asks: [
						'Which people here earn their living on site, and doing what?',
						'What does the community charge for use of its space or land for a business?'
					]
				},
				{
					id: 'pension',
					label: 'Pension or savings',
					asks: [
						'What have the monthly charges done over the last ten years?',
						'What happens to a member whose income falls below the charges?'
					]
				},
				{
					id: 'uncertain',
					label: 'Uncertain or changing',
					asks: [
						'Is there any hardship provision, and who decides on it?',
						'Has anyone been carried financially, and for how long?'
					]
				}
			]
		},
		{
			id: 'timeframe',
			prompt: 'How long do you imagine staying?',
			options: [
				{
					id: 'life',
					label: 'The rest of our lives, if it works',
					asks: [
						'What happens to my home when I die, and who decides?',
						'Can a member of my family who is not part of the community inherit it?'
					]
				},
				{
					id: 'decade',
					label: 'Ten years or so, then we will see',
					asks: [
						'How long does it take to sell or hand back a home here, in practice? Ask about the last one.',
						'What did the last household who left take with them?'
					]
				},
				{
					id: 'trial',
					label: 'We want to try before deciding',
					asks: [
						'Is there a way to live here without buying in — a rental, a long guest stay, an associate membership?',
						'What would we get back if we changed our minds at the provisional stage?'
					]
				}
			]
		},
		{
			id: 'support',
			prompt: 'Does anyone in your household have a support need the community should know about?',
			options: [
				{
					id: 'access',
					label: 'Mobility or access',
					asks: [
						'Which parts of this site can a wheelchair reach, including the common house and the meeting room?',
						'Has anyone here needed the buildings changed, and what happened?'
					]
				},
				{
					id: 'mental-health',
					label: 'Mental health',
					asks: [
						'What has the community done when a member was unwell for a long stretch?',
						'Is there any expectation that members support each other through a crisis, and is it written down?'
					]
				},
				{
					id: 'neurodivergence',
					label: 'Neurodivergence, or sensitivity to noise and crowding',
					asks: [
						'How loud is it here in the evening, and where is the quietest home?',
						'Is attendance at meals and meetings genuinely optional, or optional in theory?',
						'How are meetings run — is there a way to contribute in writing rather than out loud?'
					]
				},
				{
					id: 'none',
					label: 'Not that we know of',
					asks: ['How would this place cope if one of us became unable to do our share for a year?']
				},
				{
					id: 'private',
					label: 'Yes, but we would rather not say here',
					asks: [
						'What does the community need to know about a member, and what is nobody’s business?',
						'Who holds personal information about members, and where is it written down?'
					]
				}
			]
		}
	]
};
