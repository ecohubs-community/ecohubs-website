// Static content for the Seeking.Community page — the on-site explanation of
// seeking.community. Lifted out of `+page.svelte` so the markup stays readable.
//
// The ten intake questions mirror `questions.ts` in the seeking.community repo;
// the one-line glosses are ours. The example match card is built from that
// project's own `exampleResultJson`, so the demo shows the real card anatomy.

/** One claim in the "what it is / what it isn't" columns. Matches `StanceColumns`' prop shape. */
export interface Stance {
	title: string;
	body: string;
}

const BASE = 'https://seeking.community';

/** Facts about the live service — update these if it changes. */
export const seekingStats = {
	url: BASE,
	/** The intake conversation itself — where every CTA on this page should land. */
	intakeUrl: `${BASE}/intake`,
	questionCount: 'ten',
	turnaround: '24 hours'
} as const;

/* ── Hero: an example match ──────────────────────────────────────────
   The card a seeker actually receives, drawn from seeking.community's own
   worked example. The community is fictional and every surface says the
   card is illustrative — what is real is its shape, and in particular the
   "still to confirm" line, which is the thing a directory never gives you.
──────────────────────────────────────────────────────────────────── */

export const demoMatch = {
	name: 'Verdant Mile',
	score: '8/10',
	type: 'Ecovillage',
	location: 'Alentejo, Portugal',
	why: 'it is the closest thing to the Tuesday you described: gardens before the heat, a shared table, and a buy-in modest enough that it will not drain your savings.',
	/** Confirmed attributes — label on the left, value on the right, as in the real card. */
	known: [
		{ label: 'Decision-making', value: 'Sociocracy · circles' },
		{ label: 'Members', value: '34 adults, 9 children' },
		{ label: 'Size & land', value: '18 ha · olive grove' },
		{ label: 'Joining', value: 'Buy-in + 6-month trial' }
	],
	/** Everything we could not verify, named rather than quietly omitted. */
	unknown: ['Education', 'Healthcare access', 'Current openings']
} as const;

/* ── It isn't only you ───────────────────────────────────────────── */

/** The three recognitions, close to seeking.community's own words. */
export const recognitions: string[] = [
	'You are tired of a life optimised for everything except belonging.',
	'You suspect we were never meant to live this far from land, or from each other.',
	'You have wanted to step off — and been quietly afraid of landing badly.'
];

/* ── What actually stops people ──────────────────────────────────── */

export interface Blocker {
	number: string;
	title: string;
	body: string;
}

export const blockers: Blocker[] = [
	{
		number: '01',
		title: 'The directories are half graveyard',
		body: 'Hundreds of listings and no way to tell which communities are still active, still open to new people, or still anything like the page describes. Some entries have not been touched in five years, and nothing on the page tells you which ones.'
	},
	{
		number: '02',
		title: 'You do not yet know what to ask',
		body: 'Almost nobody arrives knowing to ask how decisions get made, what the buy-in really covers, or what happens when two households fall out. Those are the questions that decide whether you stay — and most people learn them the expensive way.'
	},
	{
		number: '03',
		title: 'Checking a place properly costs a year',
		body: 'The only real test is to go and stand there. Three flights and six months later you have properly seen three communities out of hundreds, and you are no closer to knowing whether the fourth would have been the one.'
	},
	{
		number: '04',
		title: 'And landing badly is worse than staying',
		body: 'Leaving is one hard decision. Arriving somewhere wrong — after selling up, moving a family, spending the savings — is a much worse one. That fear is rational, and it keeps more people on the track than any lack of desire does.'
	}
];

/* ── What it is / isn't ──────────────────────────────────────────── */

export const whatItIs: Stance[] = [
	{
		title: 'Free, for the person seeking.',
		body: 'No fee, no account to pay for, nothing waiting to be upsold. That is deliberate: the people who most need to land well are rarely the ones with money spare for help finding it.'
	},
	{
		title: 'Read by a person, not matched by a filter.',
		body: 'Someone who knows this world reads every intake by hand and then goes looking — through directories, through networks, and through places that appear in neither. A search, not a query.'
	},
	{
		title: 'Pointed anywhere that fits.',
		body: 'Any community that is real, open and a genuine fit, including the many with no connection to EcoHubs at all. It works for the person seeking, not for a portfolio.'
	},
	{
		title: 'Honest about what it does not know.',
		body: 'Every match names the things we could not confirm. A blank stays a blank rather than being filled in with something plausible.'
	}
];

export const whatItIsNot: Stance[] = [
	{
		title: 'A directory.',
		body: 'There is no list to browse and no search box. If trawling listings yourself is what you want, the existing directories do that well and we will happily point you at them.'
	},
	{
		title: 'A listings platform for communities.',
		body: 'Communities are not customers here. Nobody pays to appear, and nothing on the seeker’s side is shaped by who happens to be recruiting.'
	},
	{
		title: 'Only for EcoHubs communities.',
		body: 'Most places we point people toward have nothing to do with us. A matchmaker that only ever sold its own inventory would not be a matchmaker.'
	},
	{
		title: 'A guarantee.',
		body: 'A good match is a strong lead, not a promise. You still have to visit, and you still have to decide — and no one can honestly do that part for you.'
	}
];

/* ── How it works ────────────────────────────────────────────────── */

export interface Step {
	number: string;
	title: string;
	body: string;
}

export const steps: Step[] = [
	{
		number: '01',
		title: 'Tell us where you want to land',
		body: 'In your own words: what you are stepping away from, and the life you are stepping toward. No account, nothing to perform, and your answers stay in your browser as you go, so you can stop and come back.'
	},
	{
		number: '02',
		title: 'A real person reads it, by hand',
		body: 'Someone who knows this world reads what you wrote and goes looking — through the directories, through networks, and through communities that never appear in either — for places that are real, open, and actually fit.'
	},
	{
		number: '03',
		title: 'A few honest matches come back',
		body: 'A short set of places, each with a note on why it fits what you wrote and a plain list of what we could not confirm. Within a day. No feed to scroll, no ranking to second-guess.'
	}
];

/* ── The ten questions ───────────────────────────────────────────── */

export interface Question {
	number: string;
	/** The bracket label the intake itself uses. */
	label: string;
	/** Our one-line summary of what that question actually asks. */
	body: string;
}

export const questions: Question[] = [
	{
		number: '01',
		label: 'The land',
		body: 'Where in the world you could see yourself landing, what that place needs to feel like, and how far you are willing to move.'
	},
	{
		number: '02',
		label: 'An ordinary day',
		body: 'A Tuesday a year from now — the morning, the afternoon, the evening, and what is different from your life today.'
	},
	{
		number: '03',
		label: 'Real connection',
		body: 'What real connection looks like to you, and the last time you were with a group that felt like home.'
	},
	{
		number: '04',
		label: 'Together and alone',
		body: 'How much time you need alone, how much shared time feels right, and where it tips into too much.'
	},
	{
		number: '05',
		label: 'Hands and head',
		body: 'The work you want to do day to day, what you are good at and want to keep — and what you would happily put down forever.'
	},
	{
		number: '06',
		label: 'Money, plainly',
		body: 'What you can bring — savings, a buy-in, income from outside — and what is simply not on the table.'
	},
	{
		number: '07',
		label: 'Decisions and disagreement',
		body: 'How you hope a real decision gets made, and what a healthy conflict looks like when people clash.'
	},
	{
		number: '08',
		label: 'Non-negotiables',
		body: 'Food, substances, sleep, animals, faith — what is fixed, and where you could flex for a strong fit.'
	},
	{
		number: '09',
		label: 'Who and when',
		body: 'Who is coming with you — partners, children, animals, friends in the same boat — and how soon you want to be there.'
	},
	{
		number: '10',
		label: 'The honest part',
		body: 'What worries you most about community living, where you think you would struggle, and the line you would not cross.'
	}
];

/* ── What comes back ─────────────────────────────────────────────── */

export interface Anatomy {
	kicker: string;
	title: string;
	body: string;
}

export const anatomy: Anatomy[] = [
	{
		kicker: 'The top of the card',
		title: 'The place, plainly.',
		body: 'What the community is, what kind of place it is, where it is, and a link straight to them. No profile page in between, and no account needed to follow it.'
	},
	{
		kicker: 'The badge',
		title: 'A fit score, out of ten.',
		body: 'One number, and it is a human judgement rather than a calculation. It is there to order the shortlist — the sentence underneath is the part that actually tells you something.'
	},
	{
		kicker: 'The middle',
		title: 'Why this one, for you.',
		body: 'A sentence written against your own intake, not a marketing blurb. Done properly it quotes your life back to you: the Tuesday you described, the work you said you would put down.'
	},
	{
		kicker: 'The bottom',
		title: 'Still to confirm.',
		body: 'Everything we could not verify, listed by name. This is the part most services leave out, and the reason you can trust the rest of the card.'
	}
];

/** What no amount of searching can settle for you. */
export const cannotKnow: string[] = [
	'Whether you will actually like the people — the only test for that is going',
	'Whether a photograph or a page is current, unless we were able to check it',
	'Whether a community that is open today will still have room when you arrive',
	'Whether you will still want this in year three'
];

/* ── Why EcoHubs built it ────────────────────────────────────────── */
/* The Purpose Charter quote that opens this section is shared with `/csi`
   and `/votecast` — see `$lib/config/purpose-charter`. */

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
		title: 'Accessible has to mean findable.',
		body: 'The charter asks us to make regenerative community living structurally accessible. For most people the barrier is not philosophy, and it is not even money — it is that they cannot find a real, open community, and have no way to tell a living one from a dead listing. Nothing else about access matters until that is solved.',
		cta: 'Read the purpose charter ↗',
		href: 'https://specs.ecohubs.community/layers/0-identity/01-purpose-charter',
		external: true
	},
	{
		number: '02',
		kicker: 'The other side',
		title: 'Communities need people too.',
		body: 'This is the half nobody says out loud. Most intentional communities are quietly looking for members — places with land, structure and years of work behind them, running short of the people to share it with. Meanwhile the people who would love to be there never find them. Both sides are searching, and neither can see the other.',
		cta: 'What we build for the other side →',
		href: '/rcos'
	},
	{
		number: '03',
		kicker: 'The network',
		title: 'Back to the land, and to each other.',
		body: 'The point was never one hub, or one network we happen to run. It is as many people as possible living closer to land, to each other, and to something that is not a screen. Every person who lands well in a community that already exists is exactly that — achieved years sooner than building a new one could manage.',
		cta: 'Read the vision →',
		href: '/vision'
	}
];

/* ── FAQ ─────────────────────────────────────────────────────────── */

export interface FaqEntry {
	q: string;
	a: string;
}

export const faq: FaqEntry[] = [
	{
		q: 'Is it really free?',
		a: `Yes — always, for the person seeking. There is no fee, no account to pay for, and nothing waiting to be upsold at the end. EcoHubs funds it because a person who lands well in a community is the whole point of the project; charging the people least able to pay would defeat it.`
	},
	{
		q: 'Who actually reads what I send?',
		a: `A person, not a matching engine. Someone who knows this world reads every intake by hand and then searches for communities that fit what you actually wrote — not whatever ranks highest or pays most. You hear back personally, normally within ${seekingStats.turnaround}.`
	},
	{
		q: 'Do you only point me toward EcoHubs communities?',
		a: 'No, and that matters more than it might sound. The great majority of places people are pointed toward have no connection to EcoHubs at all. The service works for the person seeking — if the best fit for you is a fifty-year-old community on the other side of the world that has never heard of us, that is the one you should hear about.'
	},
	{
		q: 'What if you are not sure about a place?',
		a: 'Then we say so. Every match lists what we could <em>not</em> confirm alongside what we could — whether a detail is current, whether they still have room, whether something on their page is five years old. You are deciding whether to change your life. Guessing at you would be the least useful thing we could do.'
	},
	{
		q: 'How long does the intake take, and what is it like?',
		a: `${seekingStats.questionCount.charAt(0).toUpperCase() + seekingStats.questionCount.slice(1)} questions, answered in prose rather than checkboxes — the land, an ordinary day, money, conflict, what is non-negotiable, and what worries you. Most people take twenty minutes or so. Your answers are kept in your browser as you write, so you can stop halfway and come back.`
	},
	{
		q: 'I do not really know what I want yet. Should I still write?',
		a: 'Yes — that is the normal case, not the exception. Very few people arrive with a clear specification; most arrive with a feeling and a lot of uncertainty. The questions are built to help you find the words, and "I do not know yet" is a perfectly good answer to several of them.'
	},
	{
		q: 'Is this only for ecovillages?',
		a: 'No. Ecovillages are one shape among many — cooperative housing, land projects, co-living, spiritual communities, farms with a shared table. What the matches have in common is that people live there together on purpose, and that the place is real and open.'
	},
	{
		q: 'How does this fit with the rest of EcoHubs?',
		a: 'It is the one part built for people who want to <em>arrive</em> rather than build. <a href="/csi" class="text-ecohubs-primary hover:underline font-medium">CSI</a> maps where a new community could begin, the <a href="/rcos" class="text-ecohubs-primary hover:underline font-medium">RCOS Standard</a> describes what holds one together, and <a href="/votecast" class="text-ecohubs-primary hover:underline font-medium">VoteCast</a> runs its decisions. Seeking.Community is for the much larger number of people who do not want to start anything — they want to find somewhere that already works.'
	}
];
