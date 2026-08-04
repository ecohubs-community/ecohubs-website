// Static content for the CSI (Community Suitability Index) page.
// Lifted out of `+page.svelte` to keep the markup readable, and so the
// version-bound numbers below can be rotated in one place when CSI ships a
// new release.

/** One claim in the "what it is / what it isn't" columns. Matches `StanceColumns`' prop shape. */
export interface Stance {
	title: string;
	body: string;
}

/** Time-bound facts about the live index — update these when CSI publishes a new version. */
export const csiStats = {
	version: 'v0.1',
	regions: '3,309',
	signals: 'thirty',
	signalCount: 30,
	domainCount: 7,
	url: 'https://csi.ecohubs.community'
} as const;

/* ── Hero demo map ───────────────────────────────────────────────────
   A miniature of the real choropleth. The geography is invented — the
   colours, class names and score scale are the live map's own, so the
   demo reads as the thing it points at rather than as data about
   anywhere in particular. Every surface using it says "illustrative".
──────────────────────────────────────────────────────────────────── */

/** Suitability-class fills, sampled from the live CSI legend. */
export const csiPalette = {
	s1: '#1a8e7b',
	s2: '#6b9f3d',
	s3: '#d99a2b',
	n1: '#c4703a',
	n2: '#9c3b2e',
	excluded: '#8a8a82'
} as const;

export type CsiTone = keyof typeof csiPalette;

export const legend: { tone: CsiTone; code: string; label: string }[] = [
	{ tone: 's1', code: 'S1', label: 'highly suitable' },
	{ tone: 's2', code: 'S2', label: 'moderately' },
	{ tone: 's3', code: 'S3', label: 'marginally' },
	{ tone: 'n1', code: 'N1', label: 'not yet' },
	{ tone: 'n2', code: 'N2', label: 'not suitable' }
];

/**
 * A jittered 5×5 point lattice over the 420×340 viewBox. Adjacent cells share
 * corner points exactly, so the borders between them read as real region
 * boundaries rather than a grid. Clipped to an organic coastline below.
 */
export const demoLattice: [number, number][][] = [
	[
		[18, 10],
		[118, 26],
		[216, 8],
		[306, 28],
		[404, 12]
	],
	[
		[8, 96],
		[126, 84],
		[204, 104],
		[318, 80],
		[412, 98]
	],
	[
		[26, 164],
		[108, 182],
		[222, 158],
		[298, 180],
		[400, 162]
	],
	[
		[14, 242],
		[132, 252],
		[206, 228],
		[312, 248],
		[410, 238]
	],
	[
		[22, 330],
		[116, 344],
		[228, 322],
		[300, 338],
		[398, 328]
	]
];

/**
 * Class per lattice cell — clustered, the way a real choropleth clusters, and
 * shading from suitable in the north to not suitable in the south. The gated
 * cell sits amid good land on purpose: that is what a legal block looks like.
 */
export const demoTones: CsiTone[][] = [
	['s2', 's1', 's1', 's3'],
	['excluded', 's1', 's2', 's3'],
	['s2', 's2', 's3', 'n1'],
	['s3', 'n1', 'n2', 'n2']
];

/** The coastline the lattice is clipped to. */
export const demoCoast =
	'M46,118 C62,54 132,22 202,30 C268,38 332,16 372,58 C408,96 402,152 382,192 C364,230 374,272 330,298 C286,326 208,320 148,302 C88,284 38,252 30,202 C24,164 30,158 46,118 Z';

/** The two readout cards floating over the demo map. */
export const demoReadouts = [
	{
		score: 87,
		tone: 's1' as CsiTone,
		code: 'S1',
		label: 'highly suitable',
		confidence: 'A',
		gates: [
			{ name: 'law', value: 84 },
			{ name: 'land', value: 91 },
			{ name: 'welcome', value: 79 }
		]
	},
	{
		score: 41,
		tone: 'n1' as CsiTone,
		code: 'N1',
		label: 'currently not suitable',
		confidence: 'B',
		gates: []
	}
];

/* ── Why the ground comes first ──────────────────────────────────── */

export interface Snag {
	number: string;
	title: string;
	body: string;
}

/** The ways a place quietly turns out to be the wrong place. */
export const snags: Snag[] = [
	{
		number: '01',
		title: 'No lawful way to live there',
		body: 'You can own the land outright and still not be allowed to build on it, sleep on it, or take it off-grid. The deed is rarely the binding constraint — zoning, building code and sanitation rules are.'
	},
	{
		number: '02',
		title: 'Water that exists on paper',
		body: 'Annual rainfall averages hide the month that matters. Basin stress, extraction rights and who already holds them decide whether a well is a plan or a hope.'
	},
	{
		number: '03',
		title: 'Rules about seed and food',
		body: 'Saving, breeding and trading your own seed is legal in some jurisdictions, restricted in others. A food-sovereign community that cannot lawfully keep its own seed is a contradiction it will discover late.'
	},
	{
		number: '04',
		title: 'Money that cannot move',
		body: 'Capital controls, banking access for foreigners, and how a group can lawfully hold shared funds. This is the layer people research last and regret first.'
	},
	{
		number: '05',
		title: 'Soil with no way back',
		body: 'Degradation is not automatically disqualifying — much of it is reversible, and cheap land is often degraded land. But you need to know which kind of tired the ground is before you buy it.'
	},
	{
		number: '06',
		title: 'A region that does not want you',
		body: 'Cost of living, healthcare within reach, a road that works in the wet season, and whether newcomers are met with curiosity or suspicion. The quiet half of whether a place holds.'
	}
];

/* ── What it is / isn't ──────────────────────────────────────────── */

export const whatItIs: Stance[] = [
	{
		title: 'A way to get to a shortlist.',
		body: `It narrows ${csiStats.regions} regions down to a handful worth a plane ticket — which is the decision the map can honestly help with.`
	},
	{
		title: 'Ordered the way reality is ordered.',
		body: 'Law gates land; land gates life. Perfect growing conditions under a legal regime that forbids what you intend score like what they are.'
	},
	{
		title: 'Traceable to public data.',
		body: 'Every signal points back to a named open dataset — SoilGrids, WRI Aqueduct, World Bank WGI, CHELSA/GAEZ, ThinkHazard — and each one is cited on the page.'
	},
	{
		title: 'Explicit about its own gaps.',
		body: 'Scores carry a confidence grade, values are marked measured, modelled or proxy, and every region lists the checks only a visit can settle.'
	}
];

export const whatItIsNot: Stance[] = [
	{
		title: 'A recommendation.',
		body: 'It scores conditions, not futures. Nobody here will tell you where to move, and a high score is an invitation to go look — not a verdict.'
	},
	{
		title: 'Legal, tax or immigration advice.',
		body: 'The legal layer is desk research over public indicators. Before anyone commits money, a lawyer in that jurisdiction reads the actual rules.'
	},
	{
		title: 'A property listing.',
		body: 'It maps regions, not parcels. No prices, no plots, no brokers, nothing for sale, and no relationship with anyone selling land.'
	},
	{
		title: 'Finished.',
		body: `${csiStats.version}. Resolution is coarse in places, some signals are proxies standing in for better data, and we would rather mark that than round it off.`
	}
];

/* ── The three gates ─────────────────────────────────────────────── */

export interface Gate {
	number: string;
	kicker: string;
	question: string;
	body: string;
	/** Representative signals read at this gate — not the full set of thirty. */
	signals: string[];
	accent: 'emerald' | 'amber';
}

export const gates: Gate[] = [
	{
		number: '01',
		kicker: 'The law first',
		question: 'Can you legally exist here?',
		body: 'Land, off-grid living, saved seed, your money, how your children can be taught. If there is no lawful path, no amount of good soil rescues it — so this gate runs before the others and can close them.',
		signals: [
			'Legal entity & land framework',
			'Land tenure security',
			'Seed & agricultural autonomy',
			'Monetary & capital sovereignty',
			'Education & schooling freedom',
			'Personal freedom',
			'Governance & corruption'
		],
		accent: 'emerald'
	},
	{
		number: '02',
		kicker: 'Then the land',
		question: 'Will it feed and hold you?',
		body: 'Soil, water, terrain, climate and hazard — measured as they are today, and again against what 2050 is likely to bring. Degraded land with good bones reads as opportunity here, not failure.',
		signals: [
			'Soil quality',
			'Water availability & quality',
			'Terrain & buildability',
			'Growing conditions',
			'Climate & natural hazards',
			'Land cover & degradation',
			'Natural building materials'
		],
		accent: 'emerald'
	},
	{
		number: '03',
		kicker: 'Then the welcome',
		question: 'Could you make a life of it?',
		body: 'Cost, healthcare, connectivity, how far the nearest real town is, and whether the region tends to meet incomers with welcome. The half that decides whether people stay past year three.',
		signals: [
			'Cost of living, labour & land',
			'Healthcare quality',
			'Connectivity',
			'Accessibility',
			'Remoteness / surroundings',
			'Business & economic viability',
			'Community density'
		],
		accent: 'amber'
	}
];

/* ── How a score breaks down ─────────────────────────────────────── */

export interface Domain {
	name: string;
	body: string;
}

/** The seven domains a region's score is reported across, as they appear in the live readout. */
export const domains: Domain[] = [
	{ name: 'Legal & sovereignty', body: 'Whether the life you intend is lawful here at all.' },
	{
		name: 'Governance, safety & tenure',
		body: 'Whether the rules hold, and whether title holds with them.'
	},
	{ name: 'Economy & cost', body: 'What a year costs, and whether the community can earn one.' },
	{
		name: 'Society, freedom & health',
		body: 'Care within reach, freedoms intact, disease burden known.'
	},
	{ name: 'Land & water', body: 'Soil, water, terrain, cover — the physical ground itself.' },
	{ name: 'Climate, growing & hazards', body: 'What grows, what threatens, now and toward 2050.' },
	{
		name: 'Autonomy & access',
		body: 'Energy, connection, and how far you are from everything else.'
	}
];

export interface Grade {
	code: string;
	label: string;
	body: string;
	tone: 'good' | 'mid' | 'poor';
}

/** The S1–N2 suitability classes, borrowed from the land-evaluation scale agronomists use. */
export const suitabilityClasses: Grade[] = [
	{ code: 'S1', label: 'Highly suitable', body: 'Nothing structural in the way.', tone: 'good' },
	{
		code: 'S2',
		label: 'Moderately suitable',
		body: 'Workable, with known trade-offs.',
		tone: 'good'
	},
	{
		code: 'S3',
		label: 'Marginally suitable',
		body: 'Possible, but it will cost you somewhere.',
		tone: 'mid'
	},
	{
		code: 'N1',
		label: 'Currently not suitable',
		body: 'Blocked today — could change.',
		tone: 'poor'
	},
	{ code: 'N2', label: 'Not suitable', body: 'Blocked in ways that do not move.', tone: 'poor' }
];

/** How much of a score is actually measured, versus inferred. */
export const confidenceGrades: Grade[] = [
	{ code: 'A', label: 'Measured', body: 'Observed data for this region.', tone: 'good' },
	{
		code: 'B',
		label: 'Modelled',
		body: 'Derived or interpolated from nearby observations.',
		tone: 'mid'
	},
	{
		code: 'C',
		label: 'Proxy',
		body: 'A national or regional stand-in until better data exists.',
		tone: 'poor'
	}
];

/** Named on every region page as work a desk cannot do. */
export const unchecked: string[] = [
	'Zoning and land-use permission',
	'Off-grid permits — water, sanitation, energy',
	'Indigenous-land claim checks',
	'Deep-legal research — entity, tax, residency'
];

export interface Source {
	name: string;
	body: string;
}

export const sources: Source[] = [
	{ name: 'SoilGrids', body: 'Global soil properties at fine resolution.' },
	{ name: 'WRI Aqueduct', body: 'Water stress, depletion and seasonal variability.' },
	{ name: 'World Bank WGI', body: 'Governance, rule of law, corruption control.' },
	{ name: 'CHELSA / GAEZ', body: 'Climate surfaces and agro-ecological growing potential.' },
	{ name: 'ThinkHazard', body: 'Flood, drought, seismic, cyclone and wildfire exposure.' }
];

/* ── Why EcoHubs built it ────────────────────────────────────────── */

/** Verbatim from the Purpose Charter — RCOS Layer 0, published on specs.ecohubs.community. */
export const purposeCharter = {
	quote:
		'To make regenerative community living — rooted in care for people, land, and life — structurally accessible, resilient, and replicable, reducing humanity’s dependency on extractive systems one community at a time.',
	source: 'EcoHubs Purpose Charter · RCOS Layer 0 · Identity',
	href: 'https://specs.ecohubs.community/layers/0-identity/01-purpose-charter'
} as const;

export interface Reason {
	number: string;
	kicker: string;
	title: string;
	body: string;
	cta: string;
	href: string;
	external?: boolean;
}

export const reasons: Reason[] = [
	{
		number: '01',
		kicker: 'The purpose',
		title: 'Accessible and resilient, structurally.',
		body: 'A map is one of the plainest ways to serve the first two of those qualities. It takes months of guesswork out of the start of a project, and it surfaces the water, hazard and legal risks that tend to break communities years later.',
		cta: 'Read the purpose charter ↗',
		href: 'https://specs.ecohubs.community/layers/0-identity/01-purpose-charter',
		external: true
	},
	{
		number: '02',
		kicker: 'Our own search',
		title: 'We are looking for ground too.',
		body: 'EcoHub One is being formed now, and it will have to stand somewhere. Rather than run that search privately and publish a conclusion, we built the instrument in the open — so the reasoning behind wherever we land can be checked.',
		cta: 'Join the EcoHub One waitlist →',
		href: '/join-the-waitlist'
	},
	{
		number: '03',
		kicker: 'The vision',
		title: 'One hub is not the point.',
		body: 'A network of small, place-based communities only works if starting one is realistically possible in more than a handful of places. A shared map is how that network finds more candidates than any founder’s intuition would.',
		cta: 'Read the vision →',
		href: '/vision'
	}
];

/* ── Who picks this up ───────────────────────────────────────────── */

export interface Persona {
	kicker: string;
	title: string;
	body: string;
}

export const personas: Persona[] = [
	{
		kicker: 'For founders',
		title: 'Choosing where to start.',
		body: 'Go from "somewhere warm and cheap" to four candidate regions you can defend to the people you are asking to come with you.'
	},
	{
		kicker: 'For existing communities',
		title: 'Weighing a second site.',
		body: 'Read your own region against the same thirty signals, then compare it honestly with the places you have been considering.'
	},
	{
		kicker: 'For people leaving',
		title: 'Narrowing a whole world.',
		body: 'If you are not building but looking, the map is a way to think structurally about a decision that is usually made on feeling alone.'
	},
	{
		kicker: 'For researchers',
		title: 'Arguing with the weights.',
		body: 'The lenses, the gating logic and the sources are all visible. If you think a signal is weighted wrong, that critique is useful to us.'
	}
];

/* ── FAQ ─────────────────────────────────────────────────────────── */

export interface FaqEntry {
	q: string;
	a: string;
}

export const faq: FaqEntry[] = [
	{
		q: 'Does a high score mean I should move there?',
		a: 'No. A high score means a region has fewer structural obstacles than most — nothing more. CSI reads public data from a desk; it cannot read the neighbours, the local mayor, the road in March, or how you feel on the third morning. Treat the map as a way to build a shortlist, then go and stand on the ground.'
	},
	{
		q: 'Why does the legal layer gate everything else?',
		a: 'Because it is the only layer that can make the others irrelevant. Soil can be rebuilt and water can be caught, but if the law forbids you from living on your own land, saving your own seed, or moving your own money, the best terrain in the world does not help. So the law is read first, and a hard legal block can exclude a region outright rather than being averaged away.'
	},
	{
		q: 'Where does the data come from, and how current is it?',
		a: `Every number traces back to a public dataset — SoilGrids for soil, WRI Aqueduct for water, World Bank WGI for governance, CHELSA and GAEZ for climate and growing conditions, ThinkHazard for hazard exposure, among others. Each source is cited on the map, and the full list is published at <a href="${csiStats.url}" target="_blank" rel="noopener" class="text-ecohubs-primary hover:underline font-medium">csi.ecohubs.community</a>. Update cadences differ by source; where we are working from an older release or a stand-in indicator, the value is marked as a proxy.`
	},
	{
		q: 'What do the confidence grades mean?',
		a: 'Each signal carries A, B or C. <strong class="text-ecohubs-deep">A</strong> is measured — observed data for that region. <strong class="text-ecohubs-deep">B</strong> is modelled — derived or interpolated from nearby observations. <strong class="text-ecohubs-deep">C</strong> is a proxy — usually a national figure standing in for a region until something better exists. A region scoring well on mostly C-grade signals is a lead, not a finding, and the map says so rather than hiding it in the average.'
	},
	{
		q: 'How precise is a region? Can I look up a specific piece of land?',
		a: 'Not yet. CSI works at administrative-region resolution, which is coarse enough that two valleys inside the same score can be genuinely different places. It is built to eliminate regions, not to choose parcels. Parcel-level questions — this slope, this well, this title — are exactly what the site visit and a local lawyer are for.'
	},
	{
		q: 'Is CSI trying to sell me land, or take a cut?',
		a: 'No. There is nothing for sale, no brokers involved, no affiliate arrangements, and no relationship with anyone selling property in any region on the map. CSI is free to use and free to argue with. If that ever changes, it will be stated plainly on the page before it does.'
	},
	{
		q: 'How does CSI relate to the RCOS Standard?',
		a: 'They answer different halves of the same question. CSI reads the ground: whether a place can lawfully and physically hold a community. The <a href="/rcos" class="text-ecohubs-primary hover:underline font-medium">RCOS Standard</a> reads the structure: how the people on that ground make decisions, share resources, and repair conflict. Communities rarely fracture over soil — they fracture over rules nobody wrote down. You want both.'
	},
	{
		q: 'I think a signal is weighted wrong. Can I say so?',
		a: 'Please do. The gating logic, the lenses and the sources are all visible precisely so they can be disputed, and a specific objection with a dataset attached is the most useful thing you can send us. <a href="/contact" class="text-ecohubs-primary hover:underline font-medium">Get in touch</a>, or bring it into the community as a <a href="/membership" class="text-ecohubs-primary hover:underline font-medium">member</a>.'
	}
];
