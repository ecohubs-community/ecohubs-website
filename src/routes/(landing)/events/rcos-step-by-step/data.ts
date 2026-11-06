// Copy for /events/rcos-step-by-step. Dates, links and recordings live in
// $lib/config/rcos-workshop, because /events and / read them too.

export interface Item {
	label: string;
	title: string;
	body: string;
}

/** How a session runs. */
export const howItWorks: Item[] = [
	{
		label: 'One layer at a time',
		title: 'Definition by definition',
		body: 'After the introduction, each session takes one RCOS layer and its template. We read the definitions in order and ask what each would mean in a real community.'
	},
	{
		label: 'Worked examples',
		title: 'Sun brings the examples',
		body: 'Filling in every field on screen would take hours, so we don’t. Sun prepares examples for each layer, and we talk them through together.'
	},
	{
		label: 'Your situation',
		title: 'Questions, live',
		body: 'Bring the community you live in, or the one you are planning. If a definition doesn’t fit your case, that is worth saying out loud.'
	}
];

/** Who it is for — from the Luma invitation. */
export const forWho: string[] = [
	'You live in a community and some of its rules have never been written down.',
	'You are starting one and want to get the structure right before the first argument.',
	'You are curious how communities can work better together, and want to see a standard up close.'
];

/** How to use the recordings as a guide, once they exist. */
export const selfGuide: Item[] = [
	{
		label: 'Step 1',
		title: 'Watch Part 1',
		body: 'The big picture: what RCOS is, why the layers are ordered the way they are, and how to read a template.'
	},
	{
		label: 'Step 2',
		title: 'Open the template',
		body: 'Each layer session links to its template on the RCOS site. Keep it open beside the recording.'
	},
	{
		label: 'Step 3',
		title: 'Pause and write',
		body: 'Stop after each definition and write your community’s answer. A rough answer now beats a perfect one later.'
	},
	{
		label: 'Step 4',
		title: 'Take the gaps to your group',
		body: 'The blank fields are the conversations your community hasn’t had yet. Start with the layer that hurts most.'
	}
];

export const practical: { label: string; body: string }[] = [
	{ label: 'Cost', body: 'Free. You register for each session separately on Luma.' },
	{ label: 'Where', body: 'Zoom. The link arrives by email when you register.' },
	{ label: 'Length', body: 'About an hour per session.' },
	{
		label: 'Time',
		body: '18:00 GMT-5 — Ecuador, Colombia, Peru, and US Eastern time in winter.'
	},
	{
		label: 'Recordings',
		body: 'Posted on this page after each session, next to the template it covers.'
	},
	{
		label: 'Do I need all eight?',
		body: 'No. Each session stands on its own, but they build on each other, so Part 1 is the best place to start.'
	}
];
