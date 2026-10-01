// Community Mycelium — EcoHubs' camp at The Gathering México 2026.
//
// Lives here rather than in the landing page's `data.ts` because two pages
// read it: `/community-mycelium` itself and the teaser on `/`. Both switch
// their copy on `campPhase()`, so the dates that decide "is it over yet?"
// must exist exactly once.
//
// The pages are rendered ahead of time (the landing page is cached at the
// edge, the homepage for 12h), so the phase computed on the server can be
// stale by the time someone reads it. Each page therefore re-runs
// `campPhase()` in `onMount` — the server value is only the first paint.

/** Yucatán (America/Merida) is UTC−6 all year — no daylight saving since 2015. */
const TZ = '-06:00';

export const myceliumCamp = {
	name: 'Community Mycelium',
	path: '/community-mycelium',
	festival: 'The Gathering México 2026',
	festivalUrl: 'https://the-gathering.earth/mexico',
	ticketUrl: 'https://luma.com/thegatheringmx2026',
	price: 'MXN 4,500',
	dates: '23–27 Oct 2026',
	place: 'Yaxunah · Yaxcabá · Yucatán',
	groupSize: 'Around 25 people',
	videoId: 'UxLXggp1MD4',
	/** Day 1 opens at the fire on Friday evening. */
	startsAt: new Date(`2026-10-23T18:00:00${TZ}`),
	/** The public close is midday Tuesday; the day itself still belongs to the camp. */
	endsAt: new Date(`2026-10-28T00:00:00${TZ}`)
} as const;

export type CampPhase = 'upcoming' | 'happening' | 'over';

export function campPhase(now: Date = new Date()): CampPhase {
	if (now >= myceliumCamp.endsAt) return 'over';
	if (now >= myceliumCamp.startsAt) return 'happening';
	return 'upcoming';
}

/** Whole days until the first evening, rounded up — "1 day to go" on the eve. */
export function daysUntilCamp(now: Date = new Date()): number {
	const ms = myceliumCamp.startsAt.getTime() - now.getTime();
	return Math.max(0, Math.ceil(ms / 86_400_000));
}

/**
 * `?phase=over` (or `upcoming` / `happening`) previews another state of the
 * landing page before the dates arrive. Anything else is ignored.
 */
export function parsePhase(value: string | null): CampPhase | null {
	return value === 'upcoming' || value === 'happening' || value === 'over' ? value : null;
}
