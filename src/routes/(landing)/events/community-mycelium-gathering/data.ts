// Copy for /events/community-mycelium-gathering, the landing page for
// EcoHubs' camp at The Gathering México 2026. Event facts shared with the
// homepage teaser (dates, price, ticket link, phase) live in
// $lib/config/mycelium-camp.ts.

export const topics = [
	'Bio Regionalism',
	'Regenerative Finance',
	'Regenerative Organisations',
	'Regenerative Villages'
];

/** "Not this, but that" — what kind of experience the camp is. */
export const notBut = [
	{
		not: 'An audience',
		but: 'Founding members',
		body: 'You choose the vision, the land and the name. Nothing is decided for you.'
	},
	{
		not: 'Lectures about community',
		but: 'Living one, day by day',
		body: 'Each day builds on the one before — like a real founding, compressed into five.'
	},
	{
		not: 'An island',
		but: 'One village among sixteen camps',
		body: 'Every day a delegate from our village joins the festival’s own council — the Consejo.'
	}
];

export const rhythm = [
	{
		label: 'Before you arrive',
		body: 'Join our WhatsApp group and answer 5–10 short questions. Your answers shape the three visions we’ll choose between on Day 2.'
	},
	{
		label: 'Every morning',
		body: 'Shared breakfast, then check-in pods: “How are you today?” — one or two minutes each. Opening circle.'
	},
	{
		label: 'Every midday',
		body: 'Roughly 13:00–16:00 stays light: shade, cenote, other camps’ sessions. Real gaps, on purpose.'
	}
];

/** The panel beside each day's description. Each day's has a different shape. */
export type DayAside =
	| { kind: 'idea'; label: string; text: string }
	| {
			kind: 'visions';
			label: string;
			visions: { name: string; english: string; quote: string; facts: string }[];
			note: string;
	  }
	| {
			kind: 'rows';
			label: string;
			intro?: string;
			rows: { key: string; value: string }[];
			quote?: { text: string; cite: string; work: string; year: string };
	  }
	| { kind: 'questions'; label: string; questions: string[] };

export interface CampDay {
	num: string;
	when: string;
	title: string;
	tagline: string;
	body: string;
	points: string[];
	aside: DayAside;
	leaveWith: string;
	/** What this day adds to the village. Earlier days' gains render as outlines. */
	adds: string[];
}

export const days: CampDay[] = [
	{
		num: '01',
		when: 'Fri 23 Oct · Evening, at the fire · Open to everyone',
		title: 'The Wound and the Alternative',
		tagline: 'Naming what we are tired of — and seeing that it is structural, not personal.',
		body: 'As it gets dark, we sit around the fire. Everyone gets three cards and writes down up to three things they’re tired of. A talking stick goes round. Then we look at the cards together — and discover how much we share.',
		points: [
			'Our wounds sorted into eight boxes: Belonging, Earth, Economy, Work, Power, Education, Nature, Change',
			'Stefan shares his own story — and his own wound',
			'The reframe: these are design flaws of the system, not personal flaws',
			'What regeneration means — and why “sustainable” isn’t enough'
		],
		aside: {
			kind: 'idea',
			label: 'The idea',
			text: 'Changing the system from outside is hard — many institutions try. But we can build a new one, quietly, inside the old.'
		},
		leaveWith: 'Relief — and a shared language for what’s broken.',
		adds: ['Wounds named']
	},
	{
		num: '02',
		when: 'Sat 24 Oct · Morning, fresh minds · Camp members',
		title: 'From Vision to Land',
		tagline:
			'Purpose, mission and vision — and the criteria that make a piece of land work or fail.',
		body: 'Today the camp becomes a community — not as a lifestyle choice, but as a structural design change. Three visions lie on the ground. You walk over and stand behind the one you believe in.',
		points: [
			'Purpose, mission, vision: three words people mix up, three different jobs',
			'WHY–HOW–WHAT: the social glue every later decision rests on',
			'We choose a vision — maybe one village forms, maybe two or three',
			'Each village picks from three plots of land, each with a hard but solvable problem',
			'We give ourselves a name'
		],
		aside: {
			kind: 'visions',
			label: 'Inside the session · The three visions',
			visions: [
				{
					name: 'Raíz',
					english: 'Root',
					quote: 'People can meet their own needs from the land without asking permission.',
					facts: '40 ha remote · income from the land · catch: isolation, hardship'
				},
				{
					name: 'Puente',
					english: 'Bridge',
					quote: 'You don’t have to leave society to live in real community.',
					facts: '8 ha near a city · members keep outside jobs · catch: dependency'
				},
				{
					name: 'Vuelta',
					english: 'Return',
					quote: 'Broken land can come back — and people are how it happens.',
					facts: '25 ha eroded land · restoration income · catch: a decade of patience'
				}
			],
			note: 'Land criteria we weigh: water, legal path, price, access, slope, soil, flood & fire risk, zoning, neighbours, biodiversity, financing, ownership security, cultural fit…'
		},
		leaveWith: 'Knowing why a land search starts with a vision — not with the prettiest waterfall.',
		adds: ['Vision', 'Land', 'A name']
	},
	{
		num: '03',
		when: 'Sun 25 Oct · Late afternoon, on the jungle floor · Camp members',
		title: 'Imagine the Life There',
		tagline:
			'Laying our village on the jungle floor — from water and zones to houses and shared infrastructure.',
		body: 'After a short guided meditation we walk outside. With sticks we draw our borders in the soil, with stones and wooden blocks we place our houses. What isn’t there — a slope, a stream, a forest — we imagine together.',
		points: [
			'Humans and nature as one living system',
			'Grounding a design in local climate, culture, history and ecology',
			'Zoning the land, catching water, then placing homes, kitchens, energy and compost',
			'Privacy versus connection: how close should the houses be?'
		],
		aside: {
			kind: 'rows',
			label: 'Inside the session · Building in phases',
			rows: [
				{
					key: 'Phase 0',
					value: 'Observe for 6–12 months: sun, rain, wind, what already lives there.'
				},
				{
					key: 'Phase 1',
					value:
						'Zoning — from Zone 0 (home) through gardens and orchards to Zone 5, untouched wilderness.'
				},
				{
					key: 'Phase 2',
					value: 'Shape the land for water: swales, ponds, pioneer plants to heal the soil.'
				},
				{
					key: 'Phase 3',
					value:
						'Houses, local materials, shared infrastructure, solar, composting toilets, greywater.'
				},
				{ key: 'Phase 4', value: 'Social life — agreements and governance. That’s tomorrow.' }
			]
		},
		leaveWith: 'A permaculture-informed way to read any piece of land: water first, houses later.',
		adds: ['Village layout']
	},
	{
		num: '04',
		when: 'Mon 26 Oct · Morning & afternoon, in the shade · Camp members',
		title: 'Deciding Together · Roles & Contribution · Repair and Leave',
		tagline: 'The part almost every community skips — and the reason most of them break.',
		body: 'Now we live there. A new member wants to join. A greenhouse needs financing. Someone hasn’t cleaned the kitchen — for the fifth time. Who decides, and how? We write it down while everyone is still calm.',
		points: [
			'Six decision methods: poll, common ground, ranked choice, consensus, consent, approval',
			'Four real cases, four kinds of decider: everyone, a committee, one person — or maybe nobody',
			'Making invisible work visible: childcare, elderly care, cooking, turning the compost',
			'Writing proposals that actually hold',
			'A conflict ladder — and why exit must be defined before it’s needed'
		],
		aside: {
			kind: 'rows',
			label: 'Inside the session · Rules that hold',
			intro: 'Every sentence in a good agreement is one of three kinds — or it’s clutter:',
			rows: [
				{ key: 'Enforceable', value: 'Can someone check it yes/no?' },
				{ key: 'Interpretive', value: 'Does it pick a side when two things conflict?' },
				{ key: 'Expressive', value: 'Would deleting it change who we are, or who we attract?' }
			],
			quote: {
				text: 'Block exit. Block voice. You don’t get loyalty.',
				cite: 'After Albert Hirschman,',
				work: 'Exit, Voice and Loyalty',
				year: '1970'
			}
		},
		leaveWith:
			'A decision and conflict toolkit you can bring to any group — a family, a team, a co-housing project.',
		adds: ['A written charter']
	},
	{
		num: '05',
		when: 'Tue 27 Oct · Morning, into a public close at midday',
		title: 'What Grew Between Us',
		tagline:
			'The culture nobody designed — and how a network of regenerative communities could work.',
		body: 'Culture is the one thing nobody designed and everybody made. We harvest what actually emerged — the jokes, the habits, the roles nobody assigned. Then we lift our eyes: a thousand villages, independent and connected, growing alongside the current system.',
		points: [
			'The harvest: four questions on the Wall',
			'The unwritten org chart, drawn next to the charter',
			'The Consejo reveal: we’ve been one village among many all week — cooperating, with no centre',
			'Midday: the camp opens to the festival — read the Wall, walk the village, hear the charter'
		],
		aside: {
			kind: 'questions',
			label: 'The harvest questions',
			questions: [
				'What would a stranger notice about us?',
				'What word have we started using?',
				'Who do you go to for what?',
				'What would feel wrong to do here?'
			]
		},
		leaveWith:
			'Confidence that this is real and reachable, something written you helped make — and a group that doesn’t end when the festival does.',
		adds: ['A culture · A network']
	}
];

export const takeHome = [
	{
		label: 'Understanding',
		title: 'Why communities fail — and how to design for lasting',
		body: 'Structure is the invisible network that keeps a community alive, like mycelium under a forest.'
	},
	{
		label: 'Tools',
		title: 'A practical toolkit',
		body: 'Vision method, land criteria, zoning, a decision matrix, proposal writing, a conflict ladder and an exit clause.'
	},
	{
		label: 'Perspective',
		title: 'It’s structural, not personal',
		body: 'A new way of looking at your own fatigue — and at what regeneration can mean beyond soil.'
	},
	{
		label: 'Something written',
		title: 'The charter you co-wrote',
		body: 'Purpose, land criteria, decision rules, conflict pathways — a template you can adapt for your own project.'
	},
	{
		label: 'People',
		title: 'A founding group',
		body: 'People who built something with you — and the wider EcoHubs community: 20 active members across 13 countries.'
	},
	{
		label: 'What continues',
		title: '90 days, online',
		body: 'The village doesn’t dissolve. It moves online for a 90-day cohort, with three calls in the calendar before you fly home.'
	}
];

export const placeFacts = [
	{
		title: 'Cenotes',
		body: 'There’s one right on the site — a small entry fee applies. Perfect for the midday heat.'
	},
	{
		title: 'Living Maya culture',
		body: 'Local producers and cooks feed the festival; Maya is still spoken in the village.'
	}
];

export const lifeInCamp = [
	{
		label: 'Sleep',
		body: 'Camping space is included. Bring your own tent, or rent one from the festival at extra cost. Glamping and rooms in nearby villages can be booked separately.'
	},
	{
		label: 'Bathrooms & showers',
		body: 'Shared toilets and showers are provided on site by the festival. Drinking water throughout your stay.'
	},
	{
		label: 'Power & connection',
		body: 'Electricity on site is limited. Don’t count on fast internet or strong signal in the jungle — bring a power bank and download what you need before you come.'
	},
	{
		label: 'Food',
		body: 'Continental breakfast every morning. A community kitchen to cook your own. Lunch and dinner are not included — local producers and cooks sell food at the kermés. Special diets: tell us in advance.'
	},
	{
		label: 'A normal day',
		body: 'Breakfast and check-in → morning session → long, light midday (cenote, other camps, rest) → late-afternoon session → evening circle and fire.'
	},
	{
		label: 'Comfort & effort',
		body: 'Hot and humid — around 32°C, end of the rainy season, mosquitoes. Physically light: sitting in circles, standing, walking on the land.'
	},
	{
		label: 'Bring',
		body: 'Tent (or rent one) & mat · power bank · headlamp · refillable bottle · swimwear · rain layer · light long sleeves · biodegradable repellent & sunscreen · pesos in cash · your medication.'
	},
	{
		label: 'Culture of the event',
		body: 'Family-friendly and free of alcohol and drugs. Facilitated in English, with Spanish support.'
	},
	{
		label: 'Group size',
		body: 'Around 10-20 people — big enough to form more than one village, small enough to know everyone’s name.'
	}
];

export const ticketIncludes = [
	'All Community Mycelium sessions',
	'Public activities of every camp',
	'Camping spot in our camp, showers & toilets',
	'Daily continental breakfast & drinking water',
	'Community kitchen',
	'Online sessions before the event'
];

export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=20.5411036%2C-88.6765747';

/** `map: true` appends the "Open map" link to the row. */
export const travel: { label: string; body: string; map?: boolean }[] = [
	{ label: 'Dates', body: 'Fri 23 – Tue 27 October 2026' },
	{
		label: 'Location',
		body: 'Yaxunah, 97924, municipality of Yaxcabá, Yucatán, Mexico',
		map: true
	},
	{
		label: 'Airports',
		body: 'Mérida (MID), about 2.5 h by road. Cancún (CUN), about 3 h. The site is 30 min from Chichén Itzá.'
	},
	{
		label: 'Getting there',
		body: 'The festival runs shuttles to the site at extra cost — parking at the nearest village is limited. ADO buses reach Valladolid and Pisté (Chichén Itzá) from Mérida and Cancún. We help coordinate shared rides in the WhatsApp group.'
	},
	{
		label: 'Arrive / leave',
		body: 'Arrive by the afternoon of Fri 23 — Day 1 starts at the fire that evening. Leave from mid-afternoon on Tue 27, after the public close.'
	},
	{
		label: 'Visa',
		body: 'Travellers from the EU, UK, US, Canada and many other countries don’t need a visa for a tourist stay. Check your nationality with the Mexican consulate.'
	},
	{
		label: 'Extra costs',
		body: 'Shuttle, tent rental or glamping (if you need it), lunches and dinners, cenote entry, travel to Yucatán.'
	},
	{
		label: 'Payment & cancellation',
		body: 'Tickets are sold by The Gathering on Luma; their terms apply. Unsure? Message us before you book.'
	}
];

export const safety = [
	{
		title: 'On site',
		body: 'Medical services and security are provided by the festival organisers throughout the event.'
	},
	{
		title: 'Nearest hospital',
		body: 'Valladolid, about an hour by road. Mérida for specialised care. Urgent cases are coordinated with the festival’s medical team.'
	},
	{
		title: 'Tell us in advance',
		body: 'Allergies, medication, dietary needs, anything we should know. Privately — by WhatsApp or email.'
	},
	{
		title: 'In the circle',
		body: 'Anyone can call a pause, no explanation needed. You’re never asked to share anything personal you don’t want to.'
	}
];

export const contact = {
	whatsappHref: 'https://wa.me/4917670913111',
	email: 'hello@ecohubs.community',
	festivalEmail: 'mexico@the-gathering.earth'
};

export const festivalLinks = [
	{ label: 'Camp page', href: 'https://view.the-gathering.earth/2026-mexico/community-mycelium/' },
	{ label: 'All camps', href: 'https://view.the-gathering.earth/2026-mexico/' },
	{ label: 'The Gathering', href: 'https://the-gathering.earth/mexico' }
];
