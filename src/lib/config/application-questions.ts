import { z } from 'zod';

export type QuestionType = 'text' | 'textarea' | 'email' | 'select' | 'radio' | 'checkbox' | 'number' | 'scale';

export interface Question {
	id: string;
	type: QuestionType;
	question: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
	options?: string[];
	page?: number; // Group questions into pages (defaults to sequential if not specified)
	scaleLabels?: {
		min: string; // Label for 1
		max: string; // Label for 10
	};
	conditionalOn?: {
		questionId: string;
		value: string;
	};
	validationSchema: z.ZodSchema;
}

export const applicationQuestions: Question[] = [
	// PAGE 1 — Basic Information
	{
		id: 'fullName',
		type: 'text',
		question: "What's your full name?",
		required: true,
		page: 1,
		validationSchema: z.string().min(2).max(100),
	},
	{
		id: 'email',
		type: 'email',
		question: "What's your email address?",
		required: true,
		page: 1,
		validationSchema: z.string().email(),
	},
	{
		id: 'location',
		type: 'text',
		question: 'Country / Location',
		placeholder: 'e.g., Ecuador, Berlin, Germany',
		required: true,
		page: 1,
		validationSchema: z.string().min(2),
	},
	{
		id: 'timeAvailability',
		type: 'select',
		question: 'Time availability to contribute per week',
		required: true,
		page: 1,
		options: [
			'1–3 hours',
			'3–6 hours',
			'6–10 hours',
			'10+ hours',
			'It varies',
		],
		validationSchema: z.string().min(1),
	},
	{
		id: 'languages',
		type: 'text',
		question: 'What languages do you speak?',
		placeholder: 'e.g., English, Spanish, German...',
		required: true,
		page: 1,
		validationSchema: z.string().min(2),
	},
	{
		id: 'discovery',
		type: 'text',
		question: 'How did you discover EcoHubs?',
		placeholder: 'Tell us how you found us...',
		required: true,
		page: 1,
		validationSchema: z.string().min(10),
	},

	// PAGE 2 — Values & Vision
	{
		id: 'resonanceCombined',
		type: 'textarea',
		question:
			'What resonates most with EcoHubs and the idea of regenerative, community-based living? Why?',
		placeholder: 'Share your thoughts...',
		required: true,
		page: 2,
		validationSchema: z.string().min(50),
	},
	{
		id: 'natureCommunityMeaning',
		type: 'textarea',
		question:
			'In your own words, what does “living well in community and in alignment with nature” mean to you?',
		placeholder: 'Share your understanding...',
		required: true,
		page: 2,
		validationSchema: z.string().min(50),
	},
	{
		id: 'values',
		type: 'checkbox',
		question: 'Which values resonate most with you? (choose up to 3)',
		required: true,
		page: 2,
		options: [
			'Collaboration',
			'Community',
			'Transparency',
			'Regeneration',
			'Cooperation',
			'Sustainability',
			'Conscious communication',
			'Innovation',
			'Decentralized governance',
			'Ecological living',
			'Shared responsibility',
			'Resilience',
			'Cultural evolution',
			'Inner growth',
		],
		validationSchema: z.array(z.string()).min(1).max(3),
	},

	// PAGE 3 — Emotional Maturity & Communication
	{
		id: 'groupWork',
		type: 'textarea',
		question: 'What helps a group work well together, in your experience?',
		placeholder: 'Share your insights...',
		required: true,
		page: 3,
		validationSchema: z.string().min(50),
	},
	{
		id: 'teamworkMoment',
		type: 'textarea',
		question: 'Describe a moment when teamwork felt easy for you. What made it work?',
		placeholder: 'Share a specific example...',
		required: true,
		page: 3,
		validationSchema: z.string().min(50),
	},
	{
		id: 'disagreementResponse',
		type: 'radio',
		question:
			"Imagine two people strongly disagree in a group you're part of. What would you naturally do?",
		required: true,
		page: 3,
		options: [
			'Listen and observe quietly',
			'Ask clarifying questions',
			'Try to mediate',
			'Support one of them',
			'Step back from the situation',
			'Other',
		],
		validationSchema: z.string().min(1),
	},
	{
		id: 'disagreementResponseOther',
		type: 'textarea',
		question: 'Please explain your approach',
		placeholder: 'Describe what you would do...',
		required: false,
		page: 3,
		conditionalOn: {
			questionId: 'disagreementResponse',
			value: 'Other',
		},
		validationSchema: z.string().optional(),
	},
	{
		id: 'ideaNotChosen',
		type: 'radio',
		question: 'You propose an idea and the group chooses another direction. What is your usual response?',
		required: true,
		page: 3,
		options: [
			'I get curious about their choice',
			'I feel disappointed but adapt',
			'I prefer to revisit my idea later',
			'I push harder to explain my view',
			'I disengage',
			'Other',
		],
		validationSchema: z.string().min(1),
	},
	{
		id: 'ideaNotChosenOther',
		type: 'textarea',
		question: 'Please explain your response',
		placeholder: 'Describe how you typically respond...',
		required: false,
		page: 3,
		conditionalOn: {
			questionId: 'ideaNotChosen',
			value: 'Other',
		},
		validationSchema: z.string().optional(),
	},
	{
		id: 'comfortFeedback',
		type: 'scale',
		question: 'On a scale from 1–10, how comfortable are you receiving constructive feedback?',
		required: true,
		page: 3,
		scaleLabels: {
			min: 'Very uncomfortable',
			max: 'Very comfortable',
		},
		validationSchema: z.number().min(1).max(10),
	},
	{
		id: 'comfortAskingHelp',
		type: 'scale',
		question: 'On a scale from 1–10, how comfortable are you asking for help when needed?',
		required: true,
		page: 3,
		scaleLabels: {
			min: 'Very uncomfortable',
			max: 'Very comfortable',
		},
		validationSchema: z.number().min(1).max(10),
	},
	{
		id: 'adaptToChange',
		type: 'scale',
		question: 'On a scale from 1–10, how easily do you adapt when plans change?',
		required: true,
		page: 3,
		scaleLabels: {
			min: 'Very difficult',
			max: 'Very easy',
		},
		validationSchema: z.number().min(1).max(10),
	},
	{
		id: 'decisionMakingValue',
		type: 'radio',
		question: 'Which of these do you value more in group decision-making?',
		required: true,
		page: 3,
		options: ['Harmony', 'Truth', 'Efficiency', 'Inclusion', 'Clarity'],
		validationSchema: z.string().min(1),
	},

	// PAGE 4 — Motivation, Contribution, Skills
	{
		id: 'motivation',
		type: 'textarea',
		question: 'What motivates you to join a project like EcoHubs?',
		placeholder: 'Share your motivation...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50),
	},
	{
		id: 'contribution',
		type: 'textarea',
		question: 'What would you like to contribute?',
		placeholder: 'Share what you can bring...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50),
	},
	{
		id: 'receiveLearn',
		type: 'textarea',
		question: 'What would you hope to receive or learn?',
		placeholder: 'Share your expectations...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50),
	},
	{
		id: 'experienceAreas',
		type: 'checkbox',
		question: 'Which areas do you have experience in? (choose all that apply)',
		required: true,
		page: 4,
		options: [
			'Ecology / permaculture / regenerative agriculture',
			'Natural building / architecture',
			'Energy systems / circular economy',
			'Facilitation / conflict resolution',
			'DAO / governance / Web3',
			'Software engineering',
			'UX / UI / design',
			'Community building / project management',
			'Education / teaching',
			'Health / wellness / emotional support',
			'Art / culture / storytelling',
			'Other',
		],
		validationSchema: z.array(z.string()).min(1),
	},
	{
		id: 'experienceAreasOther',
		type: 'textarea',
		question: 'Please describe your other experience areas',
		placeholder: 'Tell us about your experience...',
		required: false,
		page: 4,
		conditionalOn: {
			questionId: 'experienceAreas',
			value: 'Other',
		},
		validationSchema: z.string().optional(),
	},
	{
		id: 'proudProject',
		type: 'textarea',
		question:
			"Describe a project you've helped build or contribute to that you're proud of.",
		placeholder: 'Share the project and your role...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50),
	},
	{
		id: 'bestWorkEnvironments',
		type: 'textarea',
		question: 'What environments help you do your best work?',
		placeholder: 'Describe the conditions that support you...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50),
	},

	// PAGE 5 — Stability, Challenges, Next Steps
	{
		id: 'manageCommitments',
		type: 'textarea',
		question: 'How do you manage commitments and follow-through?',
		placeholder: 'Share your approach...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50),
	},
	{
		id: 'collaborationChallengesMerged',
		type: 'textarea',
		question:
			'What challenges typically arise when collaborating with others, and how do you handle them?',
		placeholder: 'Share your challenges and strategies...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50),
	},
	{
		id: 'concernsDoubts',
		type: 'textarea',
		question: 'What concerns or doubts do you have about joining EcoHubs, if any?',
		placeholder: 'Share openly...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50),
	},
	{
		id: 'howStartContributing',
		type: 'textarea',
		question: 'If accepted, how would you like to start contributing?',
		placeholder: 'Share your ideas...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50),
	},
	{
		id: 'anythingElse',
		type: 'textarea',
		question: 'Anything else you would like to share with us?',
		placeholder: 'Optional...',
		required: false,
		page: 5,
		validationSchema: z.string().optional(),
	},
];

// Create static Zod schema for Superforms (Zod v4 compatible)
export const applicationSchema = z.object({
	// PAGE 1 — Basic Information
	fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	location: z.string().min(2, 'Please enter your location'),
	timeAvailability: z.string().min(1, 'Please select your time availability'),
	languages: z.string().min(2, 'Please list at least one language'),
	discovery: z.string().min(10, 'Please provide at least 10 characters'),

	// PAGE 2 — Values & Vision
	resonanceCombined: z.string().min(50, 'Please provide at least 50 characters'),
	natureCommunityMeaning: z.string().min(50, 'Please provide at least 50 characters'),
	values: z.array(z.string()).min(1, { message: 'Please select at least one value' }).max(3, { message: 'Please select no more than 3 values' }),

	// PAGE 3 — Emotional Maturity & Communication
	groupWork: z.string().min(50, 'Please provide at least 50 characters'),
	teamworkMoment: z.string().min(50, 'Please provide at least 50 characters'),
	disagreementResponse: z.string().min(1, 'Please select an option'),
	disagreementResponseOther: z.string().optional(),
	ideaNotChosen: z.string().min(1, 'Please select an option'),
	ideaNotChosenOther: z.string().optional(),
	comfortFeedback: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
	comfortAskingHelp: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
	adaptToChange: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
	decisionMakingValue: z.string().min(1, 'Please select an option'),

	// PAGE 4 — Motivation, Contribution, Skills
	motivation: z.string().min(50, 'Please provide at least 50 characters'),
	contribution: z.string().min(50, 'Please provide at least 50 characters'),
	receiveLearn: z.string().min(50, 'Please provide at least 50 characters'),
	experienceAreas: z.array(z.string()).min(1, { message: 'Please select at least one area' }),
	experienceAreasOther: z.string().optional(),
	proudProject: z.string().min(50, 'Please provide at least 50 characters'),
	bestWorkEnvironments: z.string().min(50, 'Please provide at least 50 characters'),

	// PAGE 5 — Stability, Challenges, Next Steps
	manageCommitments: z.string().min(50, 'Please provide at least 50 characters'),
	collaborationChallengesMerged: z.string().min(50, 'Please provide at least 50 characters'),
	concernsDoubts: z.string().min(50, 'Please provide at least 50 characters'),
	howStartContributing: z.string().min(50, 'Please provide at least 50 characters'),
	anythingElse: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
