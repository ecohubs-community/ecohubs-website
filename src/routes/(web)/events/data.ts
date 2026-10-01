// Gatherings listed on /events. Each entry carries its own dates, so the page
// can sort it into "Coming up" or "Past" by itself — adding an event is one
// entry here, nothing in the markup. Facts that the event's own landing page
// also uses come from that event's config, never a second copy.

import type { Picture } from '@sveltejs/enhanced-img';
import type { EventDates } from '$lib/config/events';
import { myceliumCamp } from '$lib/config/mycelium-camp';
import heroForest from '$lib/assets/mycelium/hero-forest.webp?enhanced';

export interface EventEntry extends EventDates {
	slug: string;
	title: string;
	/** What kind of gathering, e.g. "5-day camp". */
	format: string;
	host: { name: string; url: string };
	dates: string;
	place: string;
	href: string;
	ticketUrl?: string;
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
		ticketUrl: myceliumCamp.ticketUrl,
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
	}
];
