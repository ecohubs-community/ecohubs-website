// Static content for the new membership page.
// Lifted out of `+page.svelte` so the page's <script> stays focused on
// state and reactive logic instead of long literal arrays.

import {
	Mail,
	Users,
	Share2,
	PenLine,
	Compass,
	Lightbulb,
	BookOpen,
	CodeXml,
	Sprout,
	Palette,
	Coins
} from 'lucide-svelte';

// ─── ROOMS / CONTRIBUTION AREAS ───────────────────────────────────────────────
// Adapted from the legacy membership page's "Ways You Can Contribute".
// The first three (Coordinate Updates, Facilitate Conversations, Connect People)
// come straight from the user's brief; the rest fill out the rooms metaphor.

export interface Room {
	icon: typeof Mail;
	num: string;
	title: string;
	body: string;
	tags: string;
	iconColor: string;
	iconBg: string;
	accent: string; // colored top bar
}

export const rooms: Room[] = [
	{
		num: '01',
		icon: Mail,
		title: 'Coordinate community updates',
		body: 'Keep members informed through newsletters, announcements, and the small written threads that make a community feel like one place.',
		tags: 'Newsletters · Announcements · Internal comms',
		iconColor: 'text-blue-600',
		iconBg: 'bg-blue-50',
		accent: 'bg-blue-400'
	},
	{
		num: '02',
		icon: Users,
		title: 'Facilitate conversations & workshops',
		body: 'Guide discussions, host workshops, support pilot communities applying RCOS. Create space for honest dialogue and shared sense-making.',
		tags: 'Facilitation · Workshops · Sense-making',
		iconColor: 'text-purple-600',
		iconBg: 'bg-purple-50',
		accent: 'bg-purple-400'
	},
	{
		num: '03',
		icon: Share2,
		title: 'Connect people & communities',
		body: 'Bridge members, communities, and aligned organizations. Help the network notice itself and grow the relationships that hold it together.',
		tags: 'Networking · Outreach · Partnerships',
		iconColor: 'text-teal-600',
		iconBg: 'bg-teal-50',
		accent: 'bg-teal-400'
	},
	{
		num: '04',
		icon: PenLine,
		title: 'Tell the story',
		body: 'Field notes, member portraits, articles, social posts. Capture what is happening so others can find their way in — and so we remember it ourselves.',
		tags: 'Writing · Editing · Social',
		iconColor: 'text-amber-600',
		iconBg: 'bg-amber-50',
		accent: 'bg-amber-400'
	},
	{
		num: '05',
		icon: Compass,
		title: 'Shape the RCOS Standard',
		body: 'Co-design the chapters of the Regenerative Community Operating System. Propose patterns. Disagree well. The RCOS Standard is the spine — and it is still being written.',
		tags: 'Writing · Research · Pattern design',
		iconColor: 'text-emerald-600',
		iconBg: 'bg-emerald-50',
		accent: 'bg-emerald-400'
	},
	{
		num: '06',
		icon: CodeXml,
		title: 'Build the platform',
		body: 'ecohubsOS, integrations, governance tooling. Open-source, opinionated about what we do not build. Engagement loops are not invited.',
		tags: 'Engineering · DevOps · Open source',
		iconColor: 'text-indigo-600',
		iconBg: 'bg-indigo-50',
		accent: 'bg-indigo-400'
	},
	{
		num: '07',
		icon: Lightbulb,
		title: 'Design strategy & initiatives',
		body: 'Shape creative direction, plan initiatives, translate vision into structured next steps the community can actually run.',
		tags: 'Strategy · Operations',
		iconColor: 'text-rose-600',
		iconBg: 'bg-rose-50',
		accent: 'bg-rose-400'
	},
	{
		num: '08',
		icon: BookOpen,
		title: 'Research regenerative models',
		body: 'Investigate practices, analyse existing communities, contribute evidence-based insights so the RCOS Standard stands on something real.',
		tags: 'Research · Synthesis · Knowledge',
		iconColor: 'text-orange-600',
		iconBg: 'bg-orange-50',
		accent: 'bg-orange-400'
	},
	{
		num: '09',
		icon: Sprout,
		title: 'Apply RCOS in your community',
		body: 'Already part of (or starting) a local community? Try a RCOS Standard chapter on the ground. We help you adapt it, you bring back what you learn.',
		tags: 'Pilot · Stewardship · Local practice',
		iconColor: 'text-emerald-700',
		iconBg: 'bg-emerald-50',
		accent: 'bg-emerald-500'
	},

	{
		num: '10',
		icon: Palette,
		title: 'Design the look',
		body: 'Visual identity, web, print. Make the project look like itself — not like every other movement.',
		tags: 'Design · Typography · Brand',
		iconColor: 'text-fuchsia-700',
		iconBg: 'bg-fuchsia-50',
		accent: 'bg-fuchsia-400'
	},
	{
		num: '11',
		icon: Coins,
		title: 'Watch the money',
		body: 'Local economies, contribution accounting, ECO design. How value moves without extraction — researched, not assumed.',
		tags: 'Economy · Accounting · Tokenomics',
		iconColor: 'text-yellow-700',
		iconBg: 'bg-yellow-50',
		accent: 'bg-yellow-400'
	}
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// Strongest questions from the legacy page merged with the new design's set.
// Duplicates merged, ordered from most-foundational → most-advanced.

export interface FaqItem {
	q: string;
	a: string; // can include simple HTML
}

export const faqItems: FaqItem[] = [
	{
		q: 'What does membership actually involve?',
		a: 'Membership is participation in an <strong>online community</strong> — contributing to the RCOS Standard, joining discussions, voting on proposals, and collaborating on shared tools. It is not a physical community membership, and not a place to move to.'
	},
	{
		q: 'Is there a fee?',
		a: 'No. Membership is <strong>free and contribution-based</strong>. You earn recognition and access through participation, not payment.'
	},
	{
		q: 'Do I have to be technical, or understand Web3?',
		a: 'No. We have permaculturists, parents, facilitators, designers, educators, builders, listeners. The technology is meant to support coordination, not gatekeep it. Participation is based on contribution, not technical fluency.'
	},
	{
		q: 'Do I have to move somewhere to join?',
		a: 'No. Most members are online, in their current home base. The community meets, contributes, and co-creates the RCOS Standard together — from anywhere.'
	},
	{
		q: 'How long does the application take, and what happens after?',
		a: 'About 20 minutes to fill in. After that, your application goes through a <strong>3-day community review and vote</strong> on ecohubsOS. You will hear back by email — yes, no, or with follow-up questions.'
	},
	{
		q: 'How do I find my way once I am inside?',
		a: 'Honestly: today, the way in is to show up. Join the regular community calls, or message us directly. We are still growing the buddy system, so for now the path is human contact — calls, forum threads, and direct outreach to active members.'
	},
	{
		q: 'What kinds of contribution actually count?',
		a: 'Research, writing, facilitation, coordination, design, development, translation, listening, hosting, stewardship of shared knowledge. There is no single expected skill set. The question is not <em>what you already know</em> — it is <em>what you want to show up for.</em>'
	},
	{
		q: 'Is this a crypto project? Why ECO tokens?',
		a: 'EcoHubs is not a speculative crypto project. ECO is an <strong>internal value unit</strong> used to recognize contribution — like a transparent ledger for labor and care. It is non-transferable, never traded, and never the reason to join.'
	},
	{
		q: 'Is joining early risky? What do I gain as a pioneer?',
		a: 'Yes — early carries uncertainty. Systems are still evolving. In return, you get to <strong>shape the RCOS Standard</strong>, hold real influence, form deeper relationships, and unlock access to roles before they are formally defined. This is a co-creation phase, not a finished product.'
	},
	{
		q: 'Who controls this today, and how decentralized is it really?',
		a: 'We are in an <strong>early founder-led phase</strong>, transitioning toward community governance. Full decentralization is a process, not a switch. Every step is being made in the open, written into the RCOS Standard, and reviewable.'
	},
	{
		q: 'Can I leave at any time?',
		a: 'Yes. Membership is voluntary. Step back, exit, return — the RCOS Standard includes clear, dignified paths for all of those.'
	},
	{
		q: 'What tools does the community use?',
		a: '<a href="https://os.ecohubs.community" target="_blank" rel="noopener noreferrer">ecohubsOS</a> as the home base — including its internal voting system for applications and decisions. Discord and a forum for discussion. Collaborative documents for the RCOS Standard. The smallest set of tools that lets the community see itself.'
	}
];

// ─── DOORWAYS (the three entry paths) ─────────────────────────────────────────

export interface Doorway {
	num: string;
	tag: string;
	title: string;
	body: string;
	meta: string;
	cta: string;
	href: string;
}

export const doorways: Doorway[] = [
	{
		num: '01',
		tag: 'Read & respond',
		title: 'Critique a chapter of the RCOS Standard.',
		body: 'No commitment. Read what we have, tell us where it is wrong, where it is missing, where it is naïve. The best critiques become co-authors.',
		meta: '~30 minutes · async',
		cta: 'Open the RCOS Standard →',
		href: '/rcos'
	},
	{
		num: '02',
		tag: 'Bring a skill',
		title: 'Contribute what you already do well.',
		body: 'Permaculture, governance, translation, code, listening, design, research. We need every one of these — not later, now.',
		meta: 'a few hours a week',
		cta: 'See where we need help →',
		href: '#rooms'
	},
	{
		num: '03',
		tag: 'Host a circle',
		title: 'Start something local where you live.',
		body: 'A monthly meal. A weekly listening circle. Or — if you already hold a community — apply RCOS on the ground and we help you adapt it.',
		meta: 'an evening a month, ongoing',
		cta: 'Tell us about it →',
		href: '/contact'
	}
];

// ─── MEMBER VOICES ────────────────────────────────────────────────────────────

export interface Voice {
	quote: string;
	name: string;
	location: string;
	avatar?: string;
}

export const voices: Voice[] = [
	{
		quote:
			'I joined to read the RCOS Standard. Three months in, I was the one writing the conflict-repair chapter. No one asked me — I just saw the gap.',
		name: 'Anika S.',
		location: 'Berlin · Governance writer'
	},
	{
		quote:
			"I was sceptical of anything with 'community' in the title. The application asks real questions. The answers go to real people. That was the first thing that surprised me.",
		name: 'Owen P.',
		location: 'Cardiff · Listening circle host'
	},
	{
		quote:
			"I didn't know if I was 'enough' to apply. I'm a single father, not a permaculturist. They told me on day one that listening counts. It does.",
		name: 'Maria L.',
		location: 'Cuenca, EC · Permaculture lead'
	}
];
