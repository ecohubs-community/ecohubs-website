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
		body: 'Food, building, energy and water are designed to restore soil, biodiversity, and the cycles around us. Sustainability keeps what exists; regeneration sets out to improve it.'
	},
	{
		number: '02',
		kicker: 'Shared',
		title: 'Hold things in common, on purpose.',
		body: 'Land, tools, kitchens, vehicles, knowledge. The default is shared, not owned, which means less waste, less duplication, and more resilience when one household has a hard month.'
	},
	{
		number: '03',
		kicker: 'Of care',
		title: 'People before output.',
		body: 'Mutual support, conflict that gets repaired instead of buried, and decisions made with the people they affect.'
	},
	{
		number: '04',
		kicker: 'Local',
		title: 'Adapted to where it lives.',
		body: 'A hub on a coast, a hub in the mountains and a hub inside a city will not look the same. Climate, culture, language, and local knowledge get the final word over any template.'
	},
	{
		number: '05',
		kicker: 'Learning',
		title: 'Try, fail in public, refine.',
		body: 'Every hub experiments, and every hub documents what worked and what broke. Failures are shared openly, because they are what the next hub learns the most from.'
	},
	{
		number: '06',
		kicker: 'Connected',
		title: 'Rooted locally, woven globally.',
		body: 'Each hub is sovereign, and none of them are alone. Patterns, tools, and people flow between them through a shared commons, the RCOS Standard, which gets better every year.'
	}
];

export interface NotThis {
	title: string;
	bodyHtml: string;
}

export const notThis: NotThis[] = [
	{
		title: 'A retreat from the world',
		bodyHtml:
			'We are building places that stay <em class="font-story italic">part of the wider world</em> and work at a healthier relationship with it.'
	},
	{
		title: 'A franchise model',
		bodyHtml:
			'There is no central authority that approves a hub. The RCOS Standard is forkable, so local communities decide what to keep, what to change, and what to throw out.'
	},
	{
		title: 'A spiritual or political ideology',
		bodyHtml:
			'We are not aligned to one teacher, one party, one belief system. People of very different worldviews can live well in an EcoHub if they agree on how decisions get made and how conflict gets repaired.'
	},
	{
		title: 'A speculative project',
		bodyHtml:
			'There are no tradeable tokens and no promised returns. The internal value unit (ECO) recognizes contribution inside a hub, but the reason to be here is the people and the work.'
	},
	{
		title: 'A revolution against the system',
		bodyHtml:
			'We are not trying to overthrow anything. Community by community, we are reducing our dependency on a structure that cannot heal itself, until a different way of life becomes ordinary.'
	},
	{
		title: 'An app that becomes the point',
		bodyHtml:
			"The platform is the smallest scaffolding we can build that lets a community see itself, with no engagement loops and no attention market. When it's working well, you mostly forget it's there."
	}
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
			'We give back more than we take, and aim to leave the land, each other, and the wider world <em class="font-story italic">healthier than we found them.</em>'
	},
	{
		number: '02',
		title: 'Cooperation over competition.',
		bodyHtml:
			'Most of the things we want, like belonging, resilience and meaningful work, can\'t be won. They are <em class="font-story italic">built together</em>, or not at all.'
	},
	{
		number: '03',
		title: 'Make the invisible explicit.',
		bodyHtml:
			'We name the things that quietly break communities first: power, money, conflict, care. Transparency is <em class="font-story italic">a precondition for trust.</em>'
	},
	{
		number: '04',
		title: 'Learn through real practice.',
		bodyHtml:
			'Theory loses to lived experience. A pattern only stays in the RCOS Standard if it survives contact with <em class="font-story italic">a real community, real land, real people, real failure.</em>'
	},
	{
		number: '05',
		title: 'Everyone has a role.',
		bodyHtml:
			'A working community needs cooks, listeners, builders, carers, coders, growers, translators, organizers. Every local voice matters because <em class="font-story italic">every local hand is needed.</em>'
	}
];

export interface FaqItem {
	q: string;
	a: string;
}

export const faqItems: FaqItem[] = [
	{
		q: 'What problem are you actually trying to solve?',
		a: "Modern life has pulled belonging, work, and place apart. We're building a pattern that lets small communities hold all three together, locally and regeneratively, without each one rebuilding from scratch."
	},
	{
		q: 'Is this a utopia, an eco-village, or a co-living brand?',
		a: 'None of those, though we borrow from all of them and leave out the parts that didn\'t work. Utopias are brittle, and we\'re not selling a lifestyle. The closest honest description is <em class="font-story italic">a network of small communities sharing an open standard.</em>'
	},
	{
		q: 'What does success look like in 10 years?',
		a: "Many small hubs around the world, each running the RCOS Standard in its own way, with a living, well-maintained shared standard between them. We'd measure success by resilience and honest replication rather than size."
	},
	{
		q: 'What are your stances on politics, religion, ideology?',
		a: "We have stances on ecology, dignity, transparency, and non-extraction, and they're written into the RCOS Standard. We don't have a doctrine you must agree with. We expect disagreement and ask that it be honest."
	},
	{
		q: 'How is this different from intentional communities of the past?',
		a: 'We start from an open, versioned standard rather than a charismatic founder. Decisions are logged, governance is explicit, and conflict-repair is a chapter, not a private conversation. Past projects often failed where these were missing.'
	},
	{
		q: 'What could go wrong, honestly?',
		a: 'The RCOS Standard could ossify; the founder phase could overstay its welcome; pilots could underdeliver. We name these risks in the open and write them into the working notes, because naming a failure mode early is part of how we keep it survivable.'
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
			'An open, evolving RCOS Standard covering land, governance, culture, economics, and care, the things every community has to figure out anyway.'
	},
	{
		number: '02',
		title: 'Test it in the real world.',
		bodyHtml:
			"A first community in Ecuador is already applying the RCOS Standard under real ecological, social and economic constraints. Whether and when a community becomes a fully-fledged EcoHub is a question we're answering as we go."
	},
	{
		number: '03',
		title: 'Document honestly.',
		bodyHtml:
			"What worked, what didn't, what hurt. Pilots only matter if their scars and their wins are written down where others can use them."
	},
	{
		number: '04',
		title: 'Refine the RCOS Standard.',
		bodyHtml:
			'Lived experience flows back into the patterns, so the next community starts from <em class="font-story italic">everything we already learned the hard way.</em>'
	},
	{
		number: '05',
		title: 'Replicate, locally.',
		bodyHtml:
			"New hubs fork the RCOS Standard. They keep what fits their land, their culture, their people, and change what doesn't."
	},
	{
		number: '06',
		title: 'Loop, in the open.',
		bodyHtml:
			'The cycle keeps running and every hub feeds the network, so each year the RCOS Standard gets a little truer, a little kinder, a little harder to break.'
	}
];
