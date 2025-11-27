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
	// PAGE 1
	{
		id: 'fullName',
		type: 'text',
		question: "What's your full name?",
		required: true,
		page: 1,
		validationSchema: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
	},
	{
		id: 'email',
		type: 'email',
		question: "What's your email address?",
		required: true,
		page: 1,
		validationSchema: z.string().email({ message: 'Please enter a valid email address' }),
	},
	{
		id: 'location',
		type: 'text',
		question: 'Country / Location',
		placeholder: 'e.g., Ecuador, Remote, Berlin, Germany',
		required: true,
		page: 1,
		validationSchema: z.string().min(2, 'Please enter your location'),
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
		validationSchema: z.string().min(1, 'Please select your time availability'),
	},
	{
		id: 'languages',
		type: 'textarea',
		question: 'What languages do you speak?',
		placeholder: 'e.g., English, Spanish, German...',
		required: true,
		page: 1,
		validationSchema: z.string().min(2, 'Please list at least one language'),
	},
	{
		id: 'discovery',
		type: 'textarea',
		question: 'How did you discover EcoHubs?',
		placeholder: 'Tell us how you found us...',
		required: true,
		page: 1,
		validationSchema: z.string().min(10, 'Please provide at least 10 characters'),
	},

	// PAGE 2
	{
		id: 'resonance',
		type: 'textarea',
		question: 'What resonates most with the idea of regenerative, community-based living?',
		placeholder: 'Share your thoughts...',
		required: true,
		page: 2,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'missingInSociety',
		type: 'textarea',
		question: 'What do you believe is missing in how society operates today?',
		placeholder: 'Share your perspective...',
		required: true,
		page: 2,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'attraction',
		type: 'textarea',
		question: 'What attracts you to EcoHubs specifically?',
		placeholder: 'What draws you to this project?',
		required: true,
		page: 2,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'values',
		type: 'checkbox',
		question: 'Which of these values feels essential to you? (choose up to 3)',
		description: 'Select up to 3 values that resonate most with you.',
		required: true,
		page: 2,
		options: [
			'Regeneration',
			'Transparency',
			'Cooperation',
			'Conscious communication',
			'Decentralized governance',
			'Ecological living',
			'Shared responsibility',
			'Cultural evolution',
			'Inner growth',
		],
		validationSchema: z.array(z.string()).min(1, { message: 'Please select at least one value' }).max(3, { message: 'Please select no more than 3 values' }),
	},
	{
		id: 'alignmentWithNature',
		type: 'textarea',
		question: 'In your own words, what does "living in alignment with nature" mean to you?',
		placeholder: 'Share your understanding...',
		required: true,
		page: 2,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},

	// PAGE 3
	{
		id: 'groupWork',
		type: 'textarea',
		question: 'What helps a group work well together, in your experience?',
		placeholder: 'Share your insights...',
		required: true,
		page: 3,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'teamworkMoment',
		type: 'textarea',
		question: 'Describe a moment when teamwork felt easy for you. What made it work?',
		placeholder: 'Share a specific example...',
		required: true,
		page: 3,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'disagreementResponse',
		type: 'radio',
		question: "Imagine two people strongly disagree in a group you're part of. What would you naturally do?",
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
		validationSchema: z.string().min(1, 'Please select an option'),
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
		validationSchema: z.string().min(1, 'Please select an option'),
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
		validationSchema: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
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
		validationSchema: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
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
		validationSchema: z.number().min(1, 'Please select a rating').max(10, 'Rating must be between 1 and 10'),
	},
	{
		id: 'decisionMakingValue',
		type: 'radio',
		question: 'Which of these do you value more in group decision-making?',
		required: true,
		page: 3,
		options: [
			'Harmony',
			'Truth',
			'Efficiency',
			'Inclusion',
			'Clarity',
		],
		validationSchema: z.string().min(1, 'Please select an option'),
	},
	{
		id: 'personalPatternOptional',
		type: 'textarea',
		question: "Optional: Is there a personal pattern you're currently working on improving?",
		placeholder: 'Share if you feel comfortable...',
		required: false,
		page: 3,
		validationSchema: z.string().optional(),
	},

	// PAGE 4
	{
		id: 'motivation',
		type: 'textarea',
		question: 'What motivates you to join a project like EcoHubs?',
		placeholder: 'Share your motivation...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'contribution',
		type: 'textarea',
		question: 'What would you like to contribute?',
		placeholder: 'Share what you can bring...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'receiveLearn',
		type: 'textarea',
		question: 'What would you hope to receive or learn?',
		placeholder: 'Share your expectations...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'communityMeaning',
		type: 'textarea',
		question: 'What does community mean to you?',
		placeholder: 'Share your understanding...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'joiningReason',
		type: 'textarea',
		question: 'Are you joining out of curiosity, interest, purpose, or seeking a major life shift?',
		placeholder: 'Share your reason...',
		required: true,
		page: 4,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},

	// PAGE 5
	{
		id: 'experienceAreas',
		type: 'checkbox',
		question: 'Which areas do you have experience in? (choose all that apply)',
		required: true,
		page: 5,
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
		validationSchema: z.array(z.string()).min(1, { message: 'Please select at least one area' }),
	},
	{
		id: 'experienceAreasOther',
		type: 'textarea',
		question: 'Please describe your other experience areas',
		placeholder: 'Tell us about your experience...',
		required: false,
		page: 5,
		conditionalOn: {
			questionId: 'experienceAreas',
			value: 'Other',
		},
		validationSchema: z.string().optional(),
	},
	{
		id: 'proudProject',
		type: 'textarea',
		question: "Describe a project you've helped build or contribute to that you're proud of.",
		placeholder: 'Share the project and your role...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'bestWorkEnvironments',
		type: 'textarea',
		question: 'What environments help you do your best work?',
		placeholder: 'Describe the conditions that support you...',
		required: true,
		page: 5,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},

	// PAGE 6
	{
		id: 'manageCommitments',
		type: 'textarea',
		question: 'How do you manage commitments and follow-through?',
		placeholder: 'Share your approach...',
		required: true,
		page: 6,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'obstaclesToContribution',
		type: 'textarea',
		question: 'What typically gets in the way of your ability to contribute, and how do you handle it?',
		placeholder: 'Share your challenges and strategies...',
		required: true,
		page: 6,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'stability',
		type: 'radio',
		question: 'Are you currently stable in your living situation, finances, and emotional well-being?',
		required: true,
		page: 6,
		options: [
			'Yes',
			'No',
			'Prefer not to say',
		],
		validationSchema: z.string().min(1, 'Please select an option'),
	},
	{
		id: 'stabilityComment',
		type: 'textarea',
		question: 'Optional comment',
		placeholder: 'Share any additional context if you wish...',
		required: false,
		page: 6,
		validationSchema: z.string().optional(),
	},
	{
		id: 'commitmentLevel',
		type: 'radio',
		question: 'If you join EcoHubs, how committed are you to participating in shaping the blueprint?',
		required: true,
		page: 6,
		options: [
			'Lightly',
			'Steadily',
			'Actively',
			'Deeply',
			"I don't know yet",
		],
		validationSchema: z.string().min(1, 'Please select an option'),
	},

	// PAGE 7
	{
		id: 'reactToIdeasNotChosen',
		type: 'textarea',
		question: 'How do you react when your ideas are not chosen or prioritized?',
		placeholder: 'Share your typical response...',
		required: true,
		page: 7,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'collaborationChallenges',
		type: 'textarea',
		question: 'What do you find challenging when collaborating with others?',
		placeholder: 'Share your challenges...',
		required: true,
		page: 7,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'personalPattern',
		type: 'textarea',
		question: "What is one personal pattern you're working on improving?",
		placeholder: 'Share if you feel comfortable...',
		required: true,
		page: 7,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'howOthersDescribe',
		type: 'textarea',
		question: "How would others describe what it's like to work with you?",
		placeholder: 'Share your perspective...',
		required: true,
		page: 7,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},

	// PAGE 8
	{
		id: 'whatExcites',
		type: 'textarea',
		question: 'What excites you most about co-creating a regenerative blueprint?',
		placeholder: 'Share your excitement...',
		required: true,
		page: 8,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'concernsDoubts',
		type: 'textarea',
		question: 'What concerns or doubts do you have, if any?',
		placeholder: 'Share openly...',
		required: true,
		page: 8,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'howStartContributing',
		type: 'textarea',
		question: 'If accepted, how would you like to start contributing?',
		placeholder: 'Share your ideas...',
		required: true,
		page: 8,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'anythingElse',
		type: 'textarea',
		question: 'Anything else you would like to share with us?',
		placeholder: 'Share anything additional...',
		required: false,
		page: 8,
		validationSchema: z.string().optional(),
	},

	// PAGE 9
	{
		id: 'lifeMeaning',
		type: 'textarea',
		question: 'What gives your life meaning right now?',
		placeholder: 'Share what matters to you...',
		required: true,
		page: 9,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'responsibilityMeaning',
		type: 'textarea',
		question: 'What does responsibility mean to you?',
		placeholder: 'Share your understanding...',
		required: true,
		page: 9,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
	{
		id: 'freedomMeaning',
		type: 'textarea',
		question: 'What does "freedom" mean to you in a community context?',
		placeholder: 'Share your perspective...',
		required: true,
		page: 9,
		validationSchema: z.string().min(50, 'Please provide at least 50 characters'),
	},
];

// Create static Zod schema for Superforms (Zod v4 compatible)
export const applicationSchema = z.object({
	// PAGE 1
	fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	location: z.string().min(2, 'Please enter your location'),
	timeAvailability: z.string().min(1, 'Please select your time availability'),
	languages: z.string().min(2, 'Please list at least one language'),
	discovery: z.string().min(10, 'Please provide at least 10 characters'),

	// PAGE 2
	resonance: z.string().min(50, 'Please provide at least 50 characters'),
	missingInSociety: z.string().min(50, 'Please provide at least 50 characters'),
	attraction: z.string().min(50, 'Please provide at least 50 characters'),
	values: z.array(z.string()).min(1, { message: 'Please select at least one value' }).max(3, { message: 'Please select no more than 3 values' }),
	alignmentWithNature: z.string().min(50, 'Please provide at least 50 characters'),

	// PAGE 3
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
	personalPatternOptional: z.string().optional(),

	// PAGE 4
	motivation: z.string().min(50, 'Please provide at least 50 characters'),
	contribution: z.string().min(50, 'Please provide at least 50 characters'),
	receiveLearn: z.string().min(50, 'Please provide at least 50 characters'),
	communityMeaning: z.string().min(50, 'Please provide at least 50 characters'),
	joiningReason: z.string().min(50, 'Please provide at least 50 characters'),

	// PAGE 5
	experienceAreas: z.array(z.string()).min(1, { message: 'Please select at least one area' }),
	experienceAreasOther: z.string().optional(),
	proudProject: z.string().min(50, 'Please provide at least 50 characters'),
	bestWorkEnvironments: z.string().min(50, 'Please provide at least 50 characters'),

	// PAGE 6
	manageCommitments: z.string().min(50, 'Please provide at least 50 characters'),
	obstaclesToContribution: z.string().min(50, 'Please provide at least 50 characters'),
	stability: z.string().min(1, 'Please select an option'),
	stabilityComment: z.string().optional(),
	commitmentLevel: z.string().min(1, 'Please select an option'),

	// PAGE 7
	reactToIdeasNotChosen: z.string().min(50, 'Please provide at least 50 characters'),
	collaborationChallenges: z.string().min(50, 'Please provide at least 50 characters'),
	personalPattern: z.string().min(50, 'Please provide at least 50 characters'),
	howOthersDescribe: z.string().min(50, 'Please provide at least 50 characters'),

	// PAGE 8
	whatExcites: z.string().min(50, 'Please provide at least 50 characters'),
	concernsDoubts: z.string().min(50, 'Please provide at least 50 characters'),
	howStartContributing: z.string().min(50, 'Please provide at least 50 characters'),
	anythingElse: z.string().optional(),

	// PAGE 9
	lifeMeaning: z.string().min(50, 'Please provide at least 50 characters'),
	responsibilityMeaning: z.string().min(50, 'Please provide at least 50 characters'),
	freedomMeaning: z.string().min(50, 'Please provide at least 50 characters'),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
