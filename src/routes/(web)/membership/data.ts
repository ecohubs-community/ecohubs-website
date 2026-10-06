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
// Member-voice portraits — the same profile shots used on the waitlist page.
import CalebeAvatar from '$lib/assets/waitlist/calebe.webp?enhanced';
import JavierAvatar from '$lib/assets/waitlist/javier-profile.webp?enhanced';
import LuisaAvatar from '$lib/assets/waitlist/luisa.webp?enhanced';

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
		body: 'Guide discussions, host workshops, and support pilot communities applying RCOS.',
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
		body: 'Field notes, member portraits, articles, social posts. Capture what is happening so others can find their way in, and so we remember it ourselves.',
		tags: 'Writing · Editing · Social',
		iconColor: 'text-amber-600',
		iconBg: 'bg-amber-50',
		accent: 'bg-amber-400'
	},
	{
		num: '05',
		icon: Compass,
		title: 'Shape the RCOS Standard',
		body: 'Co-design the chapters of the Regenerative Community Operating System, propose patterns, and disagree well. The RCOS Standard is still being written.',
		tags: 'Writing · Research · Pattern design',
		iconColor: 'text-emerald-600',
		iconBg: 'bg-emerald-50',
		accent: 'bg-emerald-400'
	},
	{
		num: '06',
		icon: CodeXml,
		title: 'Build the platform',
		body: 'ecohubsOS, integrations, governance tooling. Open-source, and opinionated about what we do not build, starting with engagement loops.',
		tags: 'Engineering · DevOps · Open source',
		iconColor: 'text-indigo-600',
		iconBg: 'bg-indigo-50',
		accent: 'bg-indigo-400'
	},
	{
		num: '07',
		icon: Lightbulb,
		title: 'Design strategy & initiatives',
		body: 'Shape creative direction, plan initiatives, translate vision into structured next steps the community can run.',
		tags: 'Strategy · Operations',
		iconColor: 'text-rose-600',
		iconBg: 'bg-rose-50',
		accent: 'bg-rose-400'
	},
	{
		num: '08',
		icon: BookOpen,
		title: 'Research regenerative models',
		body: 'Investigate practices, analyse existing communities, and gather the evidence the RCOS Standard stands on.',
		tags: 'Research · Synthesis · Knowledge',
		iconColor: 'text-orange-600',
		iconBg: 'bg-orange-50',
		accent: 'bg-orange-400'
	},
	{
		num: '09',
		icon: Sprout,
		title: 'Apply RCOS in your community',
		body: 'Already part of (or starting) a local community? Try a RCOS Standard chapter on the ground. We help you adapt it; you bring back what you learn.',
		tags: 'Pilot · Stewardship · Local practice',
		iconColor: 'text-emerald-700',
		iconBg: 'bg-emerald-50',
		accent: 'bg-emerald-500'
	},

	{
		num: '10',
		icon: Palette,
		title: 'Design the look',
		body: 'Visual identity, web, print. Make the project look like itself rather than like every other movement.',
		tags: 'Design · Typography · Brand',
		iconColor: 'text-fuchsia-700',
		iconBg: 'bg-fuchsia-50',
		accent: 'bg-fuchsia-400'
	},
	{
		num: '11',
		icon: Coins,
		title: 'Watch the money',
		body: 'Local economies, contribution accounting, ECO design. Research how value can move without extraction, rather than assuming we already know.',
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
		a: 'Membership means taking part in an <strong>online community</strong>: contributing to the RCOS Standard, joining discussions, voting on proposals, and working on shared tools. It is not membership of a physical community, and not a place to move to.'
	},
	{
		q: 'Is there a fee?',
		a: 'No. Membership is <strong>free and contribution-based</strong>. You earn recognition and access through participation, not payment.'
	},
	{
		q: 'Do I have to be technical, or understand Web3?',
		a: 'No. Members include permaculturists, parents, facilitators, designers, educators, builders, listeners. The technology is there to support coordination, and participation depends on contribution, not technical fluency.'
	},
	{
		q: 'Do I have to move somewhere to join?',
		a: 'No. Most members take part online from wherever they already live. The community meets and writes the RCOS Standard together from anywhere.'
	},
	{
		q: 'How long does the application take, and what happens after?',
		a: 'About 20 minutes to fill in. After that, your application goes through a <strong>3-day community review and vote</strong> on ecohubsOS. You will hear back by email with a yes, a no, or follow-up questions.'
	},
	{
		q: 'How do I find my way once I am inside?',
		a: 'Today, the way in is to show up. Join the regular community calls, or message us directly. We are still growing the buddy system, so for now the path is human contact: calls, forum threads, and direct outreach to active members.'
	},
	{
		q: 'What kinds of contribution actually count?',
		a: 'Research, writing, facilitation, coordination, design, development, translation, listening, hosting, stewardship of shared knowledge. There is no single expected skill set. We care more about <em>what you want to show up for</em> than <em>what you already know</em>.'
	},
	{
		q: 'Is this a crypto project? Why ECO tokens?',
		a: 'EcoHubs is not a speculative crypto project. ECO is an <strong>internal value unit</strong> used to recognize contribution, like a transparent ledger for labor and care. It is non-transferable, never traded, and never the reason to join.'
	},
	{
		q: 'Is joining early risky? What do I gain as a pioneer?',
		a: 'Yes, joining early carries uncertainty, because the systems are still changing. In return, you get to <strong>shape the RCOS Standard</strong>, hold real influence, form deeper relationships, and take on roles before they are formally defined.'
	},
	{
		q: 'Who controls this today, and how decentralized is it really?',
		a: 'We are in an <strong>early founder-led phase</strong>, moving step by step toward community governance. Each step happens in the open, gets written into the RCOS Standard, and can be reviewed.'
	},
	{
		q: 'Can I leave at any time?',
		a: 'Yes. Membership is voluntary, and the RCOS Standard includes clear, dignified paths to step back, exit, and return.'
	},
	{
		q: 'What tools does the community use?',
		a: '<a href="https://os.ecohubs.community" target="_blank" rel="noopener noreferrer">ecohubsOS</a> as the home base — including its internal voting system for applications and decisions. Discord and a forum for discussion. Collaborative documents for the RCOS Standard. We keep the toolset as small as we can.'
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
		body: 'Permaculture, governance, translation, code, listening, design, research. We need every one of these now.',
		meta: 'a few hours a week',
		cta: 'See where we need help →',
		href: '#rooms'
	},
	{
		num: '03',
		tag: 'Host a circle',
		title: 'Start something local where you live.',
		body: 'A monthly meal or a weekly listening circle. If you already hold a community, apply RCOS on the ground and we help you adapt it.',
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
	// Enhanced-image (Picture) import; typed off one of the avatars so we don't
	// need a direct dependency on vite-imagetools' types.
	avatar?: typeof CalebeAvatar;
}

export const voices: Voice[] = [
	{
		quote:
			'I resonate with the need to live differently. I believe we need to try different systems. Many will fail but eventually we will find an alternative. I resonate with learning from one another, testing out alternatives in practice, only then we will have a lived experience.',
		name: 'Calebe',
		location: 'Brazil · Regenerative Economist',
		avatar: CalebeAvatar
	},
	{
		quote:
			'EcoHubs resonates with me because it centers community and nature—collective decisions, regenerative practices, and a living system that evolves through contribution.',
		name: 'Javier',
		location: 'Peru · Natural builder',
		avatar: JavierAvatar
	},
	{
		quote:
			'I believe that regenerative, community-based living is not only the wisest choice for human beings to live from now onward, but it is also the one that’s originally designed to suit us best.',
		name: 'Luisa',
		location: 'Italy · Consultant & Trusted Advisor',
		avatar: LuisaAvatar
	}
];
