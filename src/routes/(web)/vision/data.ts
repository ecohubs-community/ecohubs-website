// Static content for the redesigned Vision page.
// Lifted out of `+page.svelte` to keep the markup readable.

export interface Principle {
	number: string;
	kicker: string;
	title: string;
	body: string;
}

export const principles: Principle[] = [
	{
		number: '01',
		kicker: 'Regenerative',
		title: 'Heal more than you take.',
		body: 'Food, building, energy, water — designed to actively restore soil, biodiversity, and the cycles around us. Sustainability is the floor. Regeneration is the direction.',
	},
	{
		number: '02',
		kicker: 'Shared',
		title: 'Hold things in common, on purpose.',
		body: 'Land, tools, kitchens, vehicles, knowledge. The default is shared, not owned. Less waste. Less duplication. More resilience when one household has a hard month.',
	},
	{
		number: '03',
		kicker: 'Of care',
		title: 'People before output.',
		body: "Mutual support, conflict that gets repaired instead of buried, and decisions made with the people they affect. Community is not an outcome here — it's the operating layer.",
	},
	{
		number: '04',
		kicker: 'Local',
		title: 'Adapted to where it lives.',
		body: 'A hub on a coast, a hub in the mountains, a hub inside a city — they will not look the same. Climate, culture, language, and local knowledge get the final word, not a template.',
	},
	{
		number: '05',
		kicker: 'Learning',
		title: 'Try, fail in public, refine.',
		body: "Every hub experiments. Every hub documents what worked and what broke. Failure isn't hidden — it's the most useful thing the network has, when it's shared honestly.",
	},
	{
		number: '06',
		kicker: 'Connected',
		title: 'Rooted locally, woven globally.',
		body: 'Each hub is sovereign. None of them are alone. Patterns, tools, and people flow between them through a shared commons — the Blueprint — that gets better every year.',
	},
];

export interface NotThis {
	title: string;
	bodyHtml: string;
}

export const notThis: NotThis[] = [
	{
		title: 'A retreat from the world',
		bodyHtml:
			'We are not building places to <em class="font-story italic">escape into</em>. We are building places that have a healthier relationship with the wider world — not one that ignores it.',
	},
	{
		title: 'A franchise model',
		bodyHtml:
			'There is no central authority that approves a hub. The Blueprint is forkable. Local communities decide what to keep, what to change, and what to throw out. Sameness is not the goal.',
	},
	{
		title: 'A spiritual or political ideology',
		bodyHtml:
			'We are not aligned to one teacher, one party, one belief system. People of very different worldviews can live well in an EcoHub if they agree on how decisions get made and how conflict gets repaired.',
	},
	{
		title: 'A speculative project',
		bodyHtml:
			'No tokens you can trade. No promises of returns. The internal value unit (ECO) recognizes contribution inside a hub — it is not the reason to be here. The reason is the people and the work.',
	},
	{
		title: 'A revolution against the system',
		bodyHtml:
			'We are not trying to overthrow anything. We are quietly reducing our dependency on a structure that cannot heal itself — community by community — until a different way of life becomes ordinary.',
	},
	{
		title: 'An app that becomes the point',
		bodyHtml:
			"The platform is the smallest possible scaffolding for a community to see itself. No engagement loops. No attention market. When it's working well, you mostly forget it's there.",
	},
];

export interface Value {
	number: string;
	title: string;
	bodyHtml: string;
}

export const values: Value[] = [
	{
		number: '01',
		title: 'Regeneration over extraction.',
		bodyHtml:
			'We give back more than we take — to the land, to each other, to the wider world. Not "do less harm." <em class="font-story italic">Leave it healthier than you found it.</em>',
	},
	{
		number: '02',
		title: 'Cooperation over competition.',
		bodyHtml:
			"Most of the things we want — belonging, resilience, meaningful work — can't be won. They are <em class=\"font-story italic\">built together</em>, or not at all.",
	},
	{
		number: '03',
		title: 'Make the invisible explicit.',
		bodyHtml:
			"The things that quietly break communities — power, money, conflict, care — are the things we name first. Transparency is not a feature. It's <em class=\"font-story italic\">a precondition for trust.</em>",
	},
	{
		number: '04',
		title: 'Learn through real practice.',
		bodyHtml:
			'Theory loses to lived experience. Every pattern in the Blueprint earns its place by surviving contact with a real community, real land, real people, real failure. <em class="font-story italic">Small failures are how we get to large truths.</em>',
	},
	{
		number: '05',
		title: 'Everyone has a role.',
		bodyHtml:
			'Inclusion is not a gesture. A working community needs cooks, listeners, builders, carers, coders, growers, translators, organizers. Every local voice matters because <em class="font-story italic">every local hand is needed.</em>',
	},
];

export interface FaqItem {
	q: string;
	a: string;
}

export const faqItems: FaqItem[] = [
	{
		q: 'What problem are you actually trying to solve?',
		a: "Modern life has fragmented belonging, work, and place. We're building a pattern where small communities can hold all three together — locally, regeneratively, and without rebuilding from scratch each time."
	},
	{
		q: 'Is this a utopia, an eco-village, or a co-living brand?',
		a: 'None of those. We borrow from all of them and refuse the parts that didn\'t work. Not a utopia — utopias are brittle. Not a co-living brand — we\'re not selling lifestyle. The closest honest description is <em class="font-story italic">a network of small communities sharing an open standard.</em>'
	},
	{
		q: 'What does success look like in 10 years?',
		a: "Many small hubs around the world running the Blueprint in their own way, with a living, well-maintained shared standard between them. Success is not size — it's resilience and honest replication."
	},
	{
		q: 'What are your stances on politics, religion, ideology?',
		a: 'We have stances — on ecology, dignity, transparency, non-extraction — and they\'re written into the Blueprint. We don\'t have a doctrine you must agree with. We expect disagreement; we ask for honest disagreement.'
	},
	{
		q: 'How is this different from intentional communities of the past?',
		a: 'We start from an open, versioned standard — not a charismatic founder. Decisions are logged, governance is explicit, and conflict-repair is a chapter, not a private conversation. Past projects often failed where these were missing.'
	},
	{
		q: 'What could go wrong, honestly?',
		a: 'The Blueprint could ossify; the founder phase could overstay its welcome; pilots could underdeliver. We name these risks in the open and write them into the working notes — being honest about failure modes is part of how we keep them survivable.'
	}
];

export interface LoopStep {
	number: string;
	title: string;
	bodyHtml: string;
}

export const loopSteps: LoopStep[] = [
	{
		number: '01',
		title: 'Write down what we know.',
		bodyHtml:
			'An open, evolving Blueprint covering land, governance, culture, economics, and care — the things every community has to figure out anyway.',
	},
	{
		number: '02',
		title: 'Test it in the real world.',
		bodyHtml:
			"A first community in Ecuador is already applying the RCOS Blueprint under real ecological, social and economic constraints. Whether and when a community becomes a fully-fledged EcoHub is a question we're answering as we go.",
	},
	{
		number: '03',
		title: 'Document honestly.',
		bodyHtml:
			"What worked, what didn't, what hurt. Pilots only matter if their scars and their wins are written down where others can use them.",
	},
	{
		number: '04',
		title: 'Refine the Blueprint.',
		bodyHtml:
			"Lived experience flows back into the patterns. The next community doesn't start from zero — they start from <em class=\"font-story italic\">everything we already learned the hard way.</em>",
	},
	{
		number: '05',
		title: 'Replicate, locally.',
		bodyHtml:
			"New hubs fork the Blueprint. They keep what fits their land, their culture, their people — and they change what doesn't. None of them are clones.",
	},
	{
		number: '06',
		title: 'Loop, in the open.',
		bodyHtml:
			'The cycle keeps running. Every hub strengthens the network. Every year the Blueprint is a little truer, a little kinder, a little harder to break.',
	},
];
