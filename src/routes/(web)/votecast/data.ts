// Static content for the VoteCast page — the on-site explanation of
// votecast.ecohubs.community. Lifted out of `+page.svelte` so the markup stays
// readable, and so the product-bound facts below (caps, method list, phase
// names) can be rotated in one place when VoteCast ships a change.
//
// Method taglines are verbatim from VoteCast's own `METHOD_FAMILIES`; the plain
// descriptions and examples are ours, written to avoid the product's own
// vocabulary ("paramount objection", "quorum") without a definition alongside.
// Every `glossarySlug` resolves to a real page at /glossary/<slug>.

/** One claim in the "what it is / what it isn't" columns. Matches `StanceColumns`' prop shape. */
export interface Stance {
	title: string;
	body: string;
}

const BASE = 'https://votecast.ecohubs.community';

/** Facts about the live platform — update these when VoteCast changes them. */
export const votecastStats = {
	url: BASE,
	glossaryUrl: `${BASE}/glossary`,
	/** Sign-up — "start a community" begins here. */
	startUrl: `${BASE}/register`,
	/** The public community list on the app's homepage. */
	browseUrl: `${BASE}/#communities`,
	methodCount: 'six',
	/** Caps on a community that has not been verified yet. Verification lifts both. */
	freeMemberCap: 10,
	freeProposalCap: 50
} as const;

/** A term VoteCast defines in public. Rendered as a link to its glossary page. */
export function glossary(slug: string): string {
	return `${BASE}/glossary/${slug}`;
}

/* ── Hero ballot demo ────────────────────────────────────────────────
   An illustrative Consent ballot, modelled on the live site's own hero
   card. The proposal is invented and every surface says so; what is real
   is the method — Consent passes unless a facilitator upholds an
   objection, and a stand-aside does not block. Clicking an option casts a
   vote and moves the bars, which is the whole point of demoing a vote.
──────────────────────────────────────────────────────────────────── */

export const demoProposal = {
	code: 'Proposal · 014',
	status: 'Open · 2 days left',
	title: 'Adopt a rotating work-share schedule for the spring season',
	method: 'Consent',
	eligible: 41,
	/** Votes already on the board before the reader casts one. Must equal the option totals. */
	castBefore: 28,
	/** Shown under the ballot until an option is picked. */
	prompt:
		'Consent: the proposal passes unless a facilitator agrees an objection is serious enough to stop it. Nobody has to actively approve.'
} as const;

export type DemoTone = 'agree' | 'aside' | 'object';

export interface DemoOption {
	id: DemoTone;
	label: string;
	/** Votes recorded before the reader's. */
	votes: number;
	/** Replaces the prompt once this option is picked — one line of method, in plain words. */
	note: string;
}

export const demoOptions: DemoOption[] = [
	{
		id: 'agree',
		label: 'Agree',
		votes: 18,
		note: 'Agreement recorded. Consent asks whether you can live with the proposal — not whether it is your favourite.'
	},
	{
		id: 'aside',
		label: 'Stand aside',
		votes: 7,
		note: 'A stand-aside is recorded and visible. You are not blocking, and the group can see you had reservations.'
	},
	{
		id: 'object',
		label: 'Object — with a reason',
		votes: 3,
		note: 'Your objection is recorded with its reason. A facilitator decides whether it is serious enough to stand; if it is, the proposal is blocked rather than failed.'
	}
];

/* ── Why decisions are where it breaks ─────────────────────────────
   Three failures, not six. Each one is something a group only notices
   long after the meeting that caused it. */

export interface Failure {
	number: string;
	title: string;
	body: string;
	/** The one-line consequence, set apart at the foot of the card. */
	line: string;
}

export const failures: Failure[] = [
	{
		number: '01',
		title: 'The meeting decided. Then what?',
		body: 'A group talks something through and reaches what feels like agreement. Nobody writes down what exactly was agreed, who was in the room, or what would have counted as a no — because in the moment it seems obvious to everyone. Six weeks later two people remember two different decisions, both entirely sincerely, and there is nothing to check either one against.',
		line: 'The agreement was real. A record of it never existed.'
	},
	{
		number: '02',
		title: 'Objections with nowhere to go',
		body: 'Someone has a genuine reservation and no channel that fits it. Saying it in the room feels like blocking the whole group; saying it afterwards feels like going behind their backs. So it stays unsaid — and comes back months later as resentment, instead of arriving now as a question that could still be answered.',
		line: 'The concern did not go away. It just arrived too late to help.'
	},
	{
		number: '03',
		title: 'Nothing to point at afterwards',
		body: 'A year on, nobody can show what was agreed, who was entitled to decide it, or on what basis. Not because anyone acted badly — because it was never written anywhere that outlasts a chat thread. So the group starts the argument again from the beginning, with less patience than it had the first time.',
		line: 'The decision was made once and paid for twice.'
	}
];

/* ── What it is / isn't ──────────────────────────────────────────── */

export const whatItIs: Stance[] = [
	{
		title: 'The step after the conversation.',
		body: 'The meeting is where a group actually works something out. VoteCast is where that becomes a decision on the record — the same agreement, written down, with the rules it was made under attached to it.'
	},
	{
		title: 'One person, one vote.',
		body: 'Every member counts the same. No tokens, no weighting, no quiet advantage for whoever joined first or shows up loudest.'
	},
	{
		title: 'Six ways to decide, not one.',
		body: 'A poll, a ranked election, a majority motion, consensus, consent. The method is chosen per decision, because a paint colour and a constitution are not the same question.'
	},
	{
		title: 'Explicit about its own rules.',
		body: 'How many people must take part, what share passes it, when the tally becomes visible, what an absence means — each one a setting you choose on purpose, and each one published beside the result.'
	},
	{
		title: 'Readable without a glossary — and there is a glossary.',
		body: 'Plain language throughout, and every term the platform uses is defined in public, so nobody has to take a governance vocabulary on trust before they can vote.'
	}
];

export const whatItIsNot: Stance[] = [
	{
		title: 'A replacement for the meeting.',
		body: 'It never is, and it is not trying to be. Communities decide in conversation — around a table, in a circle, on a call. VoteCast comes after that, so the decision survives the week. If it ever replaced a conversation the group needed to have, it was used wrongly.'
	},
	{
		title: 'A DAO tool.',
		body: 'No tokens, no treasury, nothing on-chain, no wallet required to sign up. Platforms built for crypto organisations were the thing we kept finding, and the thing we did not want.'
	},
	{
		title: 'A way to make objecting painless.',
		body: 'A method can give a reservation a name and somewhere to go, which is more than most groups have. It cannot make raising one comfortable, and we would rather say that than imply otherwise.'
	},
	{
		title: 'Finished.',
		body: 'One person, one vote is the only weighting that ships today. Delegation, subgroups and richer eligibility are named as future work rather than implied as present features.'
	}
];

/* ── Six ways to decide ──────────────────────────────────────────── */

export type MethodId = 'poll' | 'common-ground' | 'ranked' | 'approval' | 'consensus' | 'consent';

/** How the example ballot under each method is drawn. */
export type BallotKind = 'choice' | 'rank' | 'questions';

export interface Method {
	id: MethodId;
	name: string;
	/** Verbatim from VoteCast's `METHOD_FAMILIES`. */
	tagline: string;
	/** Our plain-language version — no product jargon left undefined. */
	plain: string;
	/** Three steps, in order, of how a decision under this method actually runs. */
	how: string[];
	/** A concrete decision a real community would use it for. */
	example: string;
	/** The example ballot drawn under the description. */
	ballotKind: BallotKind;
	ballotQuestion: string;
	ballotOptions: string[];
	/** Short chips with arrows between them. */
	flow: string[];
	/** What comes out the other end. */
	result: string;
	/** Resolves to votecast.ecohubs.community/glossary/<slug>. */
	glossarySlug: string;
}

/** Ordered as VoteCast orders them: by rising complexity, motion-carrying methods last. */
export const methods: Method[] = [
	{
		id: 'poll',
		name: 'Poll',
		tagline: 'Choose among options',
		plain:
			'Everyone picks one option. The result shows how the group split — nothing passes and nothing fails.',
		how: [
			'The proposer writes the question and lists the options.',
			'Each member picks one. One person, one vote.',
			'The result records what share each option got, and which one led.'
		],
		example: 'Which weekend do we hold the spring work party?',
		ballotKind: 'choice',
		ballotQuestion: 'Which weekend do we hold the spring work party?',
		ballotOptions: ['Saturday the 8th', 'Saturday the 15th', 'Saturday the 22nd'],
		flow: ['Question posted', 'Members pick one', 'Shares recorded'],
		result: 'A tally. No pass, no fail — just where the group stands.',
		glossarySlug: 'poll'
	},
	{
		id: 'common-ground',
		name: 'Common Ground',
		tagline: 'Per-question sensemaking',
		plain:
			'Several linked questions at once, each counted on its own — so a group can find out where it already agrees before anyone drafts a proposal.',
		how: [
			'The proposal carries a set of questions instead of one motion.',
			'Members answer each question separately.',
			'Each question gets its own result, so agreement and disagreement are visible side by side.'
		],
		example: 'Before anyone writes a visitor policy: find out what the group already thinks.',
		ballotKind: 'questions',
		ballotQuestion: 'Before we draft a visitor policy',
		ballotOptions: [
			'Visitors should join work hours',
			'There should be a maximum stay',
			'Hosts are responsible for their guests'
		],
		flow: ['Questions posted', 'Members answer each', 'Per-question report'],
		result: 'A report, question by question — not a single verdict.',
		glossarySlug: 'common-ground'
	},
	{
		id: 'ranked',
		name: 'Ranked',
		tagline: 'Instant-runoff election',
		plain:
			'Members put the options in order of preference. If nothing has a majority, the last-placed option drops out and its votes move to each voter’s next choice — repeating until one option is preferred by more than half.',
		how: [
			'Members rank the options instead of picking just one.',
			'The lowest-placed option is eliminated and its votes transfer to the next preference on each ballot.',
			'This repeats until one option holds a majority. That option is elected.'
		],
		example:
			'Choosing this year’s facilitator from five candidates — without the winner being someone most of the group did not want.',
		ballotKind: 'rank',
		ballotQuestion: 'Rank the candidates for facilitator',
		ballotOptions: ['Candidate B', 'Candidate D', 'Candidate A'],
		flow: ['Members rank', 'Last place eliminated', 'Votes transfer', 'Winner elected'],
		result: 'One option elected, with a majority actually behind it.',
		glossarySlug: 'ranked'
	},
	{
		id: 'approval',
		name: 'Approval',
		tagline: 'Adopt or reject a motion',
		plain:
			'A written proposal is on the table and members approve or reject it. It is adopted if the approving side clears the bar the community set — more than half, or two-thirds for the weightier things.',
		how: [
			'The proposal is a written motion, not an open question.',
			'Members approve it, reject it, or abstain.',
			'It is adopted if approvals clear the agreed share — and if enough people took part for the result to count at all.'
		],
		example: 'Adopt the 2026 budget as written.',
		ballotKind: 'choice',
		ballotQuestion: 'Motion: adopt the 2026 budget as written',
		ballotOptions: ['Approve', 'Reject', 'Abstain'],
		flow: ['Motion written', 'Approve or reject', 'Share checked', 'Adopted or rejected'],
		result: 'The motion is adopted, or it is not.',
		glossarySlug: 'approval'
	},
	{
		id: 'consensus',
		name: 'Consensus',
		tagline: 'Passes unless objected',
		plain:
			'The motion is adopted unless someone raises a reasoned objection. You do not have to actively approve — if you have reservations but can live with it, you stand aside, and standing aside does not block anything.',
		how: [
			'Members agree, stand aside, or object with a written reason.',
			'A stand-aside is recorded and published, but does not stop the decision.',
			'One objection that is not withdrawn blocks it — and the record says blocked, not failed, because those are different things.'
		],
		example:
			'Adopting shared quiet hours, where the group genuinely wants to hear from anyone who cannot live with it.',
		ballotKind: 'choice',
		ballotQuestion: 'Motion: adopt quiet hours from 22:00',
		ballotOptions: ['Agree', 'Stand aside', 'Object — with a reason'],
		flow: ['Motion written', 'Agree, stand aside or object', 'Any objection left standing?'],
		result: 'Adopted unless someone objects and does not withdraw it.',
		glossarySlug: 'consensus'
	},
	{
		id: 'consent',
		name: 'Consent',
		tagline: 'Passes unless a validated objection',
		plain:
			'Like consensus, but an objection only stops the decision if a facilitator agrees it is serious enough — a real risk to the group rather than a preference. Nobody has to actively agree for it to pass.',
		how: [
			'Members agree, stand aside, or object with a written reason.',
			'A facilitator reads each objection and decides whether it is serious enough to stand.',
			'If none is upheld, the motion is adopted. If one is, it is blocked — and usually comes back rewritten rather than dropped.'
		],
		example:
			'Trying a new compost system for one season — good enough for now, safe enough to try, rather than everyone’s favourite.',
		ballotKind: 'choice',
		ballotQuestion: 'Motion: trial the new compost system this season',
		ballotOptions: ['Agree', 'Stand aside', 'Object — with a reason'],
		flow: ['Motion written', 'Agree, stand aside or object', 'Facilitator reviews objections'],
		result: 'Adopted unless a serious objection is upheld.',
		glossarySlug: 'consent'
	}
];

/* ── What it looks like ──────────────────────────────────────────── */

/**
 * Wireframes of the live app's three main pages — drawn to the real layout in
 * EcoHubs' own palette, and stamped WIREFRAME inside the image so they are
 * never mistaken for screenshots. Swap the file at `src` for a real screenshot
 * when one exists; nothing else needs to change.
 */
export interface Shot {
	src: string;
	alt: string;
	caption: string;
	body: string;
}

export const shots: Shot[] = [
	{
		src: '/votecast/screen-proposal.png',
		alt: 'Wireframe of a VoteCast proposal open for voting: the motion, a consent ballot with agree, stand aside and object, and the time remaining',
		caption: 'A proposal, open',
		body: 'What is being decided, the options, who may vote and how long is left — on one page, in plain words.'
	},
	{
		src: '/votecast/screen-result.png',
		alt: 'Wireframe of a closed VoteCast proposal: the final tally with each option’s share, alongside the rules it was decided under',
		caption: 'A decision, closed',
		body: 'The result, and next to it the rules it was measured against. This is the page a group comes back to in a year.'
	},
	{
		src: '/votecast/screen-community.png',
		alt: 'Wireframe of a VoteCast community page listing four proposals — open, closed and upcoming — each tagged with its voting method',
		caption: 'A community, over time',
		body: 'Every decision the group has made, in order. The thing that was missing when it all lived in a chat thread.'
	}
];

/* ── How a decision travels ──────────────────────────────────────── */

export interface Phase {
	number: string;
	name: string;
	body: string;
	/** Phases most proposals skip — flagged so six stages don't read as six hoops. */
	optional?: boolean;
	glossarySlug: string;
}

export const phases: Phase[] = [
	{
		number: '01',
		name: 'Draft',
		body: 'Written but not yet open. The proposer settles the wording, the options and the timing while it still costs nothing to change them.',
		glossarySlug: 'phase-draft'
	},
	{
		number: '02',
		name: 'Deliberation',
		optional: true,
		body: 'A reading and discussion window before voting opens. Nothing is counted yet — which is exactly the point of having one.',
		glossarySlug: 'phase-deliberation'
	},
	{
		number: '03',
		name: 'Voting',
		body: 'The window is open and votes are counted. Depending on the settings the running tally is visible to everyone, or to nobody until it closes.',
		glossarySlug: 'phase-voting'
	},
	{
		number: '04',
		name: 'Objection window',
		optional: true,
		body: 'For consensus methods: the result is held as provisional for a set period after voting, so a reasoned objection raised late can still stop it.',
		glossarySlug: 'phase-objection-window'
	},
	{
		number: '05',
		name: 'Ratification',
		optional: true,
		body: 'A hold on a passed result before it takes effect — a cooling-off delay, a sign-off, or a veto window. If it is not confirmed, the record reads "not ratified" rather than "passed".',
		glossarySlug: 'phase-ratification'
	},
	{
		number: '06',
		name: 'Closed',
		body: 'Every phase complete. The outcome is final, the tally and the rules it was measured against are on the record, and it stops being a matter of memory.',
		glossarySlug: 'phase-closed'
	}
];

/* ── The settings that decide fairness — the honest section ──────── */

export interface Setting {
	name: string;
	what: string;
	/** The cost of each direction. Naming it is the point of the section. */
	tradeoff: string;
	glossarySlug: string;
}

export const settings: Setting[] = [
	{
		name: 'How many must take part',
		what: 'The minimum participation before a result counts at all — a quorum.',
		tradeoff:
			'Set it high and one quiet month blocks everything. Set it low and five people decide for forty.',
		glossarySlug: 'quorum'
	},
	{
		name: 'What share passes it',
		what: 'The bar the approving side of a motion has to clear — more than half, or at least two-thirds.',
		tradeoff:
			'Two-thirds protects a minority from a thin majority. It also hands a determined third of the group a standing veto.',
		glossarySlug: 'pass-threshold'
	},
	{
		name: 'When the tally becomes visible',
		what: 'Whether the running count shows live, only once voting closes, or not at all.',
		tradeoff:
			'Live results let people see where the group is heading. They also let people follow it rather than think.',
		glossarySlug: 'tally-reveal'
	},
	{
		name: 'Whether votes are secret',
		what: 'Whether other members can see how each person voted. Independent of when the totals appear.',
		tradeoff:
			'Secrecy protects dissent. Openness makes people answerable for it. A community of forty rarely gets to have both.',
		glossarySlug: 'secret-ballot'
	},
	{
		name: 'What an absence means',
		what: 'On consent ballots, whether silence counts as consent or is simply left out.',
		tradeoff:
			'Silence-as-consent lets a busy group decide anything. It also lets a decision pass that most of them never read.',
		glossarySlug: 'absence-meaning'
	},
	{
		name: 'Whether a vote can change',
		what: 'Whether a member may revise or withdraw their vote before the window closes.',
		tradeoff:
			'Changeable votes let a discussion actually change minds. Fixed votes stop a last-minute stampede at the close.',
		glossarySlug: 'vote-mutability'
	}
];

/** What no setting fixes. The equivalent of CSI's "what we haven't checked". */
export const settingsCannot: string[] = [
	'Whether a facilitator upholds an objection fairly — the tool records the judgement, it does not make it',
	'Whether the people most affected were in the room, or on the roster, at all',
	'Whether a proposal was written clearly enough to be voted on honestly',
	'Whether the group will live by a result it does not like'
];

/* ── Why EcoHubs built it ────────────────────────────────────────── */
/* The Purpose Charter quote that opens this section is shared with
   `/csi` — see `$lib/config/purpose-charter`. */

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
		body: 'Communities rarely come apart over land or money. They come apart over decisions nobody wrote down — who decided, on what basis, and whether that was the rule the last time too. Making that part workable is not a feature. It is most of what the charter is asking for.',
		cta: 'Read the purpose charter ↗',
		href: 'https://specs.ecohubs.community/layers/0-identity/01-purpose-charter',
		external: true
	},
	{
		number: '02',
		kicker: 'Our own need',
		title: 'We needed it, and nothing fit.',
		body: 'EcoHubs decides in the open, and the RCOS Standard says a community should be explicit about how it decides — which is worth very little without somewhere to actually run it. What we found instead was built for DAOs and token holders: wallets, treasuries, governance dashboards. None of it was built for forty people sharing a valley.',
		cta: 'Read about the RCOS Standard →',
		href: '/rcos'
	},
	{
		number: '03',
		kicker: 'The network',
		title: 'A network is only as strong as its decisions.',
		body: 'A network of small, place-based hubs depends on each one being able to decide things without a crisis. Communities that are good at deciding together survive their disagreements; the ones that are not spend their years relitigating them. That is the difference between a network and a list of names.',
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
		kicker: 'For intentional communities',
		title: 'Ecovillages, land projects, co-housing.',
		body: 'The work-share, the budget, who joins — decided in the circle, then written down where everyone can find it again in March.'
	},
	{
		kicker: 'For co-ops and non-profits',
		title: 'Member governance with a paper trail.',
		body: 'Motions, member votes and a record of who was eligible and what the bar was — the thing an assembly or an auditor eventually asks to see.'
	},
	{
		kicker: 'For online collectives',
		title: 'Open-source projects, guilds, creatives.',
		body: 'A group spread across eight time zones can still decide something, because a voting window does not require everyone awake at once.'
	},
	{
		kicker: 'For hybrid networks',
		title: 'Local chapters, one shared commons.',
		body: 'A vote can be opened to the whole community or to a named committee — and a committee result is measured against that committee, not quietly against everyone.'
	}
];

/* ── FAQ ─────────────────────────────────────────────────────────── */

export interface FaqEntry {
	q: string;
	a: string;
}

const link = (slug: string, text: string) =>
	`<a href="${glossary(slug)}" target="_blank" rel="noopener noreferrer" class="text-ecohubs-primary hover:underline font-medium">${text}</a>`;

export const faq: FaqEntry[] = [
	{
		q: 'Does this replace our meetings?',
		a: `No — and it should not. Communities decide in conversation: around a table, in a circle, on a call. VoteCast is the step after that. It takes what the group worked out and makes it a decision on the record, with the rules it was made under attached, so that in six months nobody has to reconstruct it from memory. Plenty of groups use it purely to confirm what a circle already reached, which is a perfectly good use of it. If it ever replaced a conversation you needed to have, it was used wrongly.`
	},
	{
		q: 'Do we need to be technical to use this?',
		a: `No, and that is close to the whole design brief. You start a community, invite people with a link, write what is being decided, and set when voting opens and closes. There are no wallets to install and no tokens to hold — signing up takes an email address and a password. Where the platform does use a precise word, such as ${link('quorum', 'quorum')} or ${link('objection-window', 'objection window')}, it defines it on the spot and again in a public <a href="${votecastStats.glossaryUrl}" target="_blank" rel="noopener noreferrer" class="text-ecohubs-primary hover:underline font-medium">glossary</a> you can read before signing up for anything.`
	},
	{
		q: 'Is it free?',
		a: `Yes for small groups. A community that has not been ${link('verified-community', 'verified')} yet can hold up to ${votecastStats.freeMemberCap} members and ${votecastStats.freeProposalCap} proposals, which is enough to run real decisions for a while and work out whether the tool suits you. Verification is a manual review that lifts both caps — it exists to stop the platform being used as free spam infrastructure, not as a paywall in disguise.`
	},
	{
		q: 'Which method should we use?',
		a: `Start with the simplest one that fits the question. A ${link('poll', 'Poll')} for choices with no pass or fail. ${link('ranked', 'Ranked')} when you are picking one thing from several. ${link('approval', 'Approval')} for ordinary motions, at a majority or at two-thirds for agreements that should be harder to change than to make. ${link('consensus', 'Consensus')} or ${link('consent', 'Consent')} for the decisions the whole group has to carry. The honest advice is to pick a default for each kind of decision now, while nothing is at stake, rather than during the argument.`
	},
	{
		q: 'Can results be hidden until voting closes? Can votes be secret?',
		a: `Both, and they are separate settings. ${link('tally-reveal', 'When the tally becomes visible')} — live, on close, or only to facilitators — is one choice; whether other members can see how a particular person voted is ${link('secret-ballot', 'another')}. You can run open votes with hidden totals, or a secret ballot with a live count. Hiding the running tally is the usual guard against people voting with the trend rather than with their judgement.`
	},
	{
		q: 'What actually happens if someone objects?',
		a: `It depends on the method, which is why the method is chosen per decision. Under ${link('consensus', 'Consensus')}, a reasoned objection blocks the proposal and a ${link('stand-aside', 'stand-aside')} does not. Under ${link('consent', 'Consent')}, an objection has to be upheld by a ${link('facilitator', 'facilitator')} to stand. Either way the objection is recorded with its reason, and the outcome reads ${link('outcome-blocked', 'blocked')} rather than failed — a distinction that matters, because a blocked proposal usually comes back rewritten and a failed one usually does not come back at all.`
	},
	{
		q: 'Is this a DAO tool? Do we need tokens or a wallet?',
		a: `No. There are no tokens, no treasury and nothing on-chain, and ${link('voting-power', 'voting power')} is one person, one vote — every member counts the same. You sign up with an email address and a password. A wallet can optionally be connected as a way to sign in, for groups that already use one, but it is never required and it changes nothing about how a vote is counted.`
	},
	{
		q: 'Do we have to be part of EcoHubs to use it?',
		a: 'No. VoteCast is built for any community that has decisions to make — intentional communities, cooperatives, non-profits, online collectives, networks with local chapters. EcoHubs built it and uses it, and nothing about it assumes you have read a word of the RCOS Standard.'
	},
	{
		q: 'How does VoteCast relate to the RCOS Standard?',
		a: 'They are the two halves of one thing. The <a href="/rcos" class="text-ecohubs-primary hover:underline font-medium">RCOS Standard</a> is where a community writes down what its rules are — which decisions need which method, who is eligible, how conflict gets repaired. VoteCast is where those rules actually run. A rule nobody runs is a document; a vote with no rule behind it is a headcount. You want both.'
	}
];
