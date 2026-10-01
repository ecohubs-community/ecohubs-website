// Community Mycelium — EcoHubs' camp at The Gathering México 2026.
//
// Lives here rather than in the landing page's `data.ts` because three
// pages read it: `/events/community-mycelium-gathering` itself, its entry on
// `/events`, and the teaser on `/`. All of them switch their copy on the
// camp's phase, so the dates that decide "is it over yet?" must exist
// exactly once.
//
// The pages are rendered ahead of time (the landing page is cached at the
// edge, the homepage for 12h), so the phase computed on the server can be
// stale by the time someone reads it. Each page therefore re-runs
// `campPhase()` in `onMount` — the server value is only the first paint.

import { eventPhase, type EventPhase } from './events';

export type CampPhase = EventPhase;

/** Yucatán (America/Merida) is UTC−6 all year — no daylight saving since 2015. */
const TZ = '-06:00';

export const myceliumCamp = {
	name: 'Community Mycelium',
	path: '/events/community-mycelium-gathering',
	festival: 'The Gathering México 2026',
	festivalUrl: 'https://the-gathering.earth/mexico',
	ticketUrl: 'https://luma.com/thegatheringmx2026',
	price: 'MXN 4,500',
	dates: '23–27 Oct 2026',
	place: 'Yaxunah · Yaxcabá · Yucatán',
	groupSize: 'Around 10-20 people',
	videoId: 'UxLXggp1MD4',
	/** Day 1 opens at the fire on Friday evening. */
	startsAt: new Date(`2026-10-23T18:00:00${TZ}`),
	/** The public close is midday Tuesday; the day itself still belongs to the camp. */
	endsAt: new Date(`2026-10-28T00:00:00${TZ}`)
} as const;

export function campPhase(now: Date = new Date()): CampPhase {
	return eventPhase(myceliumCamp, now);
}

/** Days since the epoch on a Yucatán wall calendar (fixed UTC−6, see `TZ`). */
function yucatanDay(date: Date): number {
	return Math.floor((date.getTime() - 6 * 3_600_000) / 86_400_000);
}

/**
 * Calendar days until the first evening, counted in Yucatán: 1 on the 22nd,
 * 0 on the 23rd itself. Counting 24-hour blocks instead would call the
 * morning of the 23rd "tomorrow", because the camp opens at 18:00.
 */
export function daysUntilCamp(now: Date = new Date()): number {
	return Math.max(0, yucatanDay(myceliumCamp.startsAt) - yucatanDay(now));
}
