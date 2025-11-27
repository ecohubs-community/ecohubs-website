import { z } from 'zod';

export type QuestionType = 'text' | 'textarea' | 'email' | 'select' | 'radio' | 'checkbox' | 'number';

export interface Question {
	id: string;
	type: QuestionType;
	question: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
	options?: string[];
	conditionalOn?: {
		questionId: string;
		value: string;
	};
	validationSchema: z.ZodSchema;
}

export const applicationQuestions: Question[] = [
	{
		id: 'fullName',
		type: 'text',
		question: "What's your full name?",
		description: 'This helps us address you properly in our communications.',
		placeholder: 'John Doe',
		required: true,
    validationSchema: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
	},
	{
		id: 'email',
		type: 'email',
		question: "What's your email address?",
		description: "We'll use this to stay in touch and send you updates.",
		placeholder: 'your.email@example.com',
		required: true,
    validationSchema: z.string().email({ message: 'Please enter a valid email address' }),
	},
	{
		id: 'location',
		type: 'text',
		question: 'Where are you currently based?',
		description: 'City and country, e.g., "Berlin, Germany" or "Remote"',
		placeholder: 'Berlin, Germany',
		required: true,
    validationSchema: z.string().min(2, 'Please enter your location'),
	},
	{
		id: 'background',
		type: 'select',
		question: 'Which area best describes your background?',
		description: 'Select the one that resonates most with you.',
		required: true,
		options: [
			'Permaculture / Ecology',
			'Community Building / Social Design',
			'Web3 / Blockchain Development',
			'Architecture / Construction',
			'Education / Facilitation',
			'Business / Finance / Economics',
			'Art / Design / Creative',
			'Science / Research',
			'Other',
		],
    validationSchema: z.string().min(1, 'Please select your background'),
	},
	{
		id: 'backgroundOther',
		type: 'text',
		question: 'Please describe your background',
		placeholder: 'Tell us more about your field...',
		required: false,
		conditionalOn: {
			questionId: 'background',
			value: 'Other',
		},
    validationSchema: z.string().optional(),
	},
	{
		id: 'motivation',
		type: 'textarea',
		question: 'Why are you interested in joining EcoHubs?',
		description: 'Share what draws you to regenerative communities and this project. (100-500 words)',
		placeholder: 'I believe in...',
		required: true,
    validationSchema: z.string().min(100, { message: 'Please provide at least 100 characters' }).max(2500, { message: 'Please provide at most 2500 characters' }),
	},
	{
		id: 'skills',
		type: 'textarea',
		question: 'What skills or experience could you contribute?',
		description: 'This could be technical skills, lived experience, or unique perspectives.',
		placeholder: 'I have experience in...',
		required: true,
    validationSchema: z.string().min(50, { message: 'Please provide at least 50 characters' }),
	},
	{
		id: 'involvement',
		type: 'checkbox',
		question: 'How would you like to be involved?',
		description: 'Select all that apply.',
		required: true,
		options: [
			'Actively contribute to blueprint development',
			'Participate in DAO governance',
			'Join a pilot community physically',
			'Support with specific skills/expertise',
			'Learn and observe for now',
		],
    validationSchema: z.array(z.string()).min(1, { message: 'Please select at least one option' }),
	},
	{
		id: 'timeline',
		type: 'select',
		question: 'When are you available to start participating?',
		required: true,
		options: [
			'Immediately',
			'Within 1-3 months',
			'Within 3-6 months',
			'Within 6-12 months',
			'Not sure yet, exploring options',
		],
    validationSchema: z.string().min(1, { message: 'Please select your timeline' }),
	},
	{
		id: 'communityExperience',
		type: 'radio',
		question: 'Have you lived in or visited an intentional community before?',
		required: true,
		options: ['Yes, I have lived in one', 'Yes, I have visited', 'No, but I am curious', 'No'],
    validationSchema: z.string().min(1, { message: 'Please select an option' }),
	},
	{
		id: 'communityDetails',
		type: 'textarea',
		question: 'Tell us about your community experience',
		description: 'What did you learn? What worked well? What challenges did you observe?',
		placeholder: 'During my time at...',
		required: false,
		conditionalOn: {
			questionId: 'communityExperience',
			value: 'Yes, I have lived in one',
		},
    validationSchema: z.string().optional(),
	},
	{
		id: 'questions',
		type: 'textarea',
		question: 'Any questions or comments for us?',
		description: "Is there anything else you'd like to share or ask?",
		placeholder: 'I would like to know more about...',
		required: false,
    validationSchema: z.string().optional(),
	},
	{
		id: 'referral',
		type: 'text',
		question: 'How did you hear about EcoHubs?',
		placeholder: 'Twitter, friend, article, etc.',
		required: false,
    validationSchema: z.string().optional(),
	},
];

// Create static Zod schema for Superforms (Zod v4 compatible)
export const applicationSchema = z.object({
	fullName: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	location: z.string().min(2, 'Please enter your location'),
	background: z.string().min(1, 'Please select your background'),
	backgroundOther: z.string().optional(),
	motivation: z.string().min(100, { message: 'Please provide at least 100 characters' }).max(2500, { message: 'Please provide at most 2500 characters' }),
	skills: z.string().min(50, { message: 'Please provide at least 50 characters' }),
	involvement: z.array(z.string()).min(1, { message: 'Please select at least one option' }),
	timeline: z.string().min(1, { message: 'Please select your timeline' }),
	communityExperience: z.string().min(1, { message: 'Please select an option' }),
	communityDetails: z.string().optional(),
	questions: z.string().optional(),
	referral: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

