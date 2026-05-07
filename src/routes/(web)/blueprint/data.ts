// Static content for the redesigned Blueprint page.
// Lifted out of `+page.svelte` to keep the markup readable.

export interface FailureMode {
	number: string;
	title: string;
	body: string;
}

export const failureModes: FailureMode[] = [
	{
		number: '01',
		title: 'Unclear purpose & scope',
		body: 'When purpose and boundaries stay implicit, expectations drift and conflict becomes personal.'
	},
	{
		number: '02',
		title: 'Implicit membership',
		body: 'If roles, rights, and exit paths are undefined, people end up negotiating belonging in moments of stress.'
	},
	{
		number: '03',
		title: 'Decision drift',
		body: 'Without explicit decision pathways, authority quietly accumulates and outcomes start to feel arbitrary.'
	},
	{
		number: '04',
		title: 'Resource ambiguity',
		body: 'Commons vs. private, contribution recognition, treasury rules — all need shared clarity, or money becomes the wound.'
	},
	{
		number: '05',
		title: 'No repair path',
		body: 'Conflict is normal. Without defined escalation and repair, issues get buried until they explode.'
	},
	{
		number: '06',
		title: 'Knowledge that walks out',
		body: "When patterns aren't written down, the community resets every time a key person leaves. Memory shouldn't depend on individuals."
	}
];

export interface Stance {
	title: string;
	body: string;
}

export const whatItIs: Stance[] = [
	{
		title: 'A layered operating system for community life.',
		body: 'Clear responsibility boundaries across membership, governance, resources, conflict, operations, evolution.'
	},
	{
		title: 'A shared language between communities.',
		body: 'So lessons travel. So a hub in Ecuador can learn from one in Portugal without translating from scratch.'
	},
	{
		title: 'Grounded in real failure modes.',
		body: 'Stress tests based on what actually breaks communities — informal power, conflict avoidance, resource fog.'
	},
	{
		title: 'Modular and adaptable.',
		body: 'Adopt parts now, evolve the rest. No community has to take all of it to benefit from any of it.'
	}
];

export const whatItIsNot: Stance[] = [
	{
		title: 'Software, or an app you install.',
		body: 'RCOS is a standard. Tools may help — they are not the system.'
	},
	{
		title: 'A DAO product or token scheme.',
		body: "A DAO — a rule-based organization where authority is defined by agreed processes — can sit on top, but the Blueprint isn't crypto, isn't tradeable, isn't speculative."
	},
	{
		title: 'A fixed ideology or "the right way" to live.',
		body: 'It describes structure and constraints, not values. Communities of very different worldviews can use it.'
	},
	{
		title: 'A replacement for human judgment.',
		body: 'RCOS reduces ambiguity. It does not — and should not — make the call instead of the people in the room.'
	}
];

export interface CoreLayer {
	id: string;
	kicker: string;
	title: string;
	body: string;
	tags: string[];
	capstone?: boolean;
}

export const coreLayers: CoreLayer[] = [
	{
		id: 'L0',
		kicker: 'Purpose & Scope',
		title: 'Why this community exists.',
		body: 'Why the community exists, what is governed, and what invariants must not be violated.',
		tags: ['Purpose', 'Scope', 'Invariants']
	},
	{
		id: 'L1',
		kicker: 'Membership',
		title: 'How people join, stay, and leave.',
		body: 'No implicit membership. Entry, participation, status changes, and exit are visible and dignified.',
		tags: ['Entry paths', 'Rights', 'Exit']
	},
	{
		id: 'L2',
		kicker: 'Governance',
		title: 'Who decides what, on whose behalf.',
		body: 'Decision pathways, delegation, and the constraints that keep authority reviewable.',
		tags: ['Decision types', 'Delegation', 'Transparency']
	},
	{
		id: 'L3',
		kicker: 'Economy & Resources',
		title: 'How value flows, how the commons is held.',
		body: 'Commons vs. private, contribution accounting, treasury rules — the things that quietly break communities when left vague.',
		tags: ['Commons', 'Contribution', 'Treasury']
	},
	{
		id: 'L4',
		kicker: 'Conflict, Repair & Accountability',
		title: 'How we repair, hold, and (sometimes) part ways.',
		body: 'Conflict is treated as a normal condition with defined pathways — not a failure to be hidden.',
		tags: ['Repair', 'Escalation', 'Separation']
	},
	{
		id: 'L5',
		kicker: 'Operations & Coordination',
		title: 'The day-to-day, without burning anyone out.',
		body: "Roles, meetings, documentation, workload boundaries — the things that look small until they aren't.",
		tags: ['Roles', 'Cadence', 'Workload']
	},
	{
		id: 'L6',
		kicker: 'Evolution & Adaptation',
		title: 'How the whole system changes — safely, in the open.',
		body: 'Amendments, experiments, retrospectives, and versioning — so the Blueprint can keep getting truer without collapsing on its own changes.',
		tags: ['Amendments', 'Retrospectives', 'Versioning']
	}
];

export interface RcosModule {
	code: string;
	name: string;
	body: string;
}

export const modules: RcosModule[] = [
	{
		code: 'P',
		name: 'Permaculture',
		body: 'Land, food and water as a designed living system.'
	},
	{
		code: 'M',
		name: 'Minimal Permaculture',
		body: 'A lighter starter version, for hubs without acreage yet.'
	},
	{
		code: 'E',
		name: 'Education',
		body: 'Mixed-age, curiosity-led, rooted in real practice.'
	},
	{
		code: 'H',
		name: 'Housing',
		body: 'Forms of dwelling and stewardship, from co-living to villages.'
	},
	{
		code: 'L',
		name: 'Land Commons Safeguards',
		body: 'Protections so land held in common stays held in common.'
	},
	{
		code: 'A',
		name: 'Alternative Economies',
		body: 'Contribution accounting, mutual credit, internal value units.'
	}
];

export interface ApplicationStep {
	number: string;
	title: string;
	body: string;
	accent?: 'amber';
}

export const applicationSteps: ApplicationStep[] = [
	{
		number: '01',
		title: 'Read & locate yourself.',
		body: 'A community reads the Blueprint and identifies which layers are already explicit, which are implicit, and which are missing entirely.'
	},
	{
		number: '02',
		title: 'Adopt what fits.',
		body: 'Pick the layers and modules that match your context. RCOS supports partial adoption — start with one weak point, not all seven layers at once.'
	},
	{
		number: '03',
		title: 'Adapt to your context.',
		body: 'Translate the patterns into your land, your culture, your stage. Local adaptation is expected — the boundaries between layers are the part that stays.'
	},
	{
		number: '04',
		title: 'Run it. Stress-test it.',
		body: 'Apply it under real conditions. Note where it bends, where it breaks, where it surprises you. The stress tests in RCOS are based on what other communities have actually broken on.'
	},
	{
		number: '05',
		title: 'Document, openly.',
		body: "What worked. What didn't. What hurt. Write it down where the next community can find it — failure is the most useful thing the network has, when it's shared."
	},
	{
		number: '06',
		title: 'Feed it back into the standard.',
		body: 'Lessons travel back into the Blueprint through proposals, reviews, and version notes. The standard evolves through Layer 6 — safely, in the open, on a cadence the network can keep up with.',
		accent: 'amber'
	}
];

export interface Persona {
	kicker: string;
	title: string;
	body: string;
}

export const personas: Persona[] = [
	{
		kicker: 'For founders',
		title: 'Starting a new hub.',
		body: "Purpose & scope templates. Membership pathways. Decision maps. Things you'd otherwise spend a year discovering the hard way."
	},
	{
		kicker: 'For existing communities',
		title: 'Repairing one weak point.',
		body: "Adopt only the layer that's broken — usually conflict, governance, or resources — without rewriting your whole community."
	},
	{
		kicker: 'For researchers & educators',
		title: 'Studying what fails, repeatably.',
		body: 'Stress tests, failure analyses, and a layered vocabulary for comparing communities side by side.'
	},
	{
		kicker: 'For governance designers',
		title: 'Keeping authority explicit.',
		body: 'Decision rights and constraints, delegation patterns, transparency norms — written down so they can be reviewed.'
	}
];

export interface ContributePath {
	number: string;
	kicker: string;
	title: string;
	body: string;
	cta: string;
	href: string;
	external?: boolean;
}

export const contributePaths: ContributePath[] = [
	{
		number: '01',
		kicker: 'Write or improve',
		title: 'Draft new articles or refine existing ones.',
		body: 'Pattern descriptions, examples, stress tests, edge cases. The standard is text — and text gets better with editors.',
		cta: 'Open the Blueprint ↗',
		href: 'https://blueprint.ecohubs.community',
		external: true
	},
	{
		number: '02',
		kicker: 'Review & discuss',
		title: 'Argue with a chapter, in public.',
		body: 'The best critiques become co-authors. If something feels wrong, that signal is exactly what the standard needs.',
		cta: 'Read & respond ↗',
		href: 'https://blueprint.ecohubs.community',
		external: true
	},
	{
		number: '03',
		kicker: 'Document an experiment',
		title: 'Share what you tried — and what broke.',
		body: 'Communities running parts of RCOS contribute the scars and the wins. Those go straight into the next version.',
		cta: 'Become a member →',
		href: '/#join'
	},
	{
		number: '04',
		kicker: 'Propose a module',
		title: "Apply RCOS to a domain we haven't yet.",
		body: 'Modules sit on top of the core. If you know a domain — health, ritual, climate — that the Blueprint should reach, write the module.',
		cta: 'Open the Blueprint ↗',
		href: 'https://blueprint.ecohubs.community',
		external: true
	}
];

export interface FaqEntry {
	q: string;
	aHtml: string;
}

export const faq: FaqEntry[] = [
	{
		q: 'What’s the difference between "the Blueprint" and "RCOS"?',
		aHtml:
			'They are the same thing. <strong class="text-ecohubs-deep">RCOS</strong> (Regenerative Community Operating System) is the formal name. <em class="font-story italic">Blueprint</em> is the friendly, human-facing name we use during the transition phase. You’ll see both — they always refer to the same standard.'
	},
	{
		q: 'Do I have to use the whole thing?',
		aHtml:
			'No. The Blueprint is designed for partial adoption. Most communities start with one or two layers — usually the one that’s currently broken — and grow into the others over time. Modules are optional on top of that.'
	},
	{
		q: 'Is this software? A DAO? A token?',
		aHtml:
			'None of those. RCOS is a written standard — a set of patterns, layer boundaries, and stress tests. Tools (governance software, contribution ledgers, even a DAO) can sit on top of it, but the standard itself is non-speculative, non-tradeable, and non-technical. You can run it on paper.'
	},
	{
		q: 'How do I trust this won’t fail like other community models?',
		aHtml:
			'Honestly: we don’t promise it won’t. What we do is treat each community as a learning system, document failures and adaptations openly, and iterate the standard rather than assuming the first version is the right one. The Blueprint is built around known failure modes — not around someone’s belief that they’ve solved community.'
	},
	{
		q: 'Can I use it for a community that isn’t an EcoHub?',
		aHtml:
			'Yes. The Blueprint is open-source and structurally agnostic. A co-op, a co-living house, a research collective, a neighborhood association — any group that needs to make membership, governance, conflict, or resources explicit can adopt parts of it.'
	},
	{
		q: 'Where do I actually read it?',
		aHtml:
			'The current version lives at <a href="https://blueprint.ecohubs.community" target="_blank" rel="noopener" class="text-ecohubs-primary hover:underline font-medium">blueprint.ecohubs.community</a>. It’s a public draft, evolving in the open — read it, fork it, argue with it.'
	}
];
