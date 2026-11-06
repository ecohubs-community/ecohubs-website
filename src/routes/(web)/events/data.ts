// Gatherings listed on /events. Each entry carries its own dates, so the page
// can sort it into "Coming up" or "Past" by itself — adding an event is one
// entry here, nothing in the markup. Facts that the event's own landing page
// also uses come from that event's config, never a second copy.

import type { Picture } from '@sveltejs/enhanced-img';
import type { EventDates } from '$lib/config/events';
import { myceliumCamp } from '$lib/config/mycelium-camp';
import { rcosWorkshop, seriesDates, nextSession, formatShortDate } from '$lib/config/rcos-workshop';
import heroForest from '$lib/assets/mycelium/hero-forest.webp?enhanced';
import writingTheRules from '$lib/assets/rcos-workshop/writing-the-rules.webp?enhanced';

export interface EventEntry extends EventDates {
	slug: string;
	title: string;
	/** What kind of gathering, e.g. "5-day camp". */
	format: string;
	/** The festival or venue it is part of, when it isn't our own. */
	host?: { name: string; url: string };
	dates: string;
	place: string;
	href: string;
	/**
	 * The outbound sign-up button while the event is not over. A function of
	 * the reader's clock, because a series points at a different session's
	 * registration each week.
	 */
	ticket?: (now: Date) => { href: string; label: string } | null;
	/** Link text for the landing page once it is over. */
	overLabel?: string;
	image: Picture;
	imageAlt: string;
	/** Shown while the event is still ahead or under way. */
	invitation: string;
	/** Shown once it is over — past tense, no tickets. */
	recap: string;
	facts: { label: string; value: string }[];
}

export const events: EventEntry[] = [
	{
		slug: 'community-mycelium-gathering',
		title: myceliumCamp.name,
		format: '5-day camp',
		host: { name: myceliumCamp.festival, url: myceliumCamp.festivalUrl },
		dates: myceliumCamp.dates,
		place: 'Yaxunah, Yucatán · México',
		href: myceliumCamp.path,
		ticket: () => ({ href: myceliumCamp.ticketUrl, label: 'Get your ticket' }),
		startsAt: myceliumCamp.startsAt,
		endsAt: myceliumCamp.endsAt,
		image: heroForest,
		imageAlt:
			'Jungle with glowing mycelium threads, with the EcoHubs and The Gathering México logos',
		invitation:
			'Five days in the Mayan jungle. Together we choose a vision and a piece of land, lay out the village, write down how we decide and how we repair — then see the network it belongs to. No land, no capital, no plan needed.',
		recap:
			'For five days in the Mayan jungle, we founded a temporary village together — a vision, a piece of land, a layout, and a written charter for deciding, repairing and leaving. The group continues online.',
		facts: [
			{ label: 'Length', value: '5 days' },
			{ label: 'Country', value: 'México' },
			{ label: 'Ticket', value: myceliumCamp.price }
		]
	},
	{
		slug: 'rcos-step-by-step',
		title: rcosWorkshop.name,
		format: '8-part online workshop series',
		dates: `From ${formatShortDate(seriesDates().startsAt)} 2026`,
		place: rcosWorkshop.place,
		href: rcosWorkshop.path,
		ticket: (now) => {
			const next = nextSession(now);
			return next?.lumaUrl ? { href: next.lumaUrl, label: `Register for Part ${next.part}` } : null;
		},
		overLabel: 'Watch the recordings →',
		...seriesDates(),
		image: writingTheRules,
		imageAlt:
			"Illustration: a group sits on the grass above the sea and writes their community's rules together on a large sheet",
		invitation:
			'Applying the Regenerative Community Operating System to your community, one layer per session. We go through each template definition by definition, with worked examples from co-host Sun. Every session is recorded and posted on the page.',
		recap:
			'Eight recorded sessions that walk through RCOS one layer at a time, each next to the template it covers. Watch them in order and you finish with a first draft of your own.',
		facts: [
			{ label: 'Sessions', value: '8' },
			{ label: 'Where', value: 'Online' },
			{ label: 'Cost', value: rcosWorkshop.price }
		]
	}
];
