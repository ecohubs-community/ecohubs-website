// When an event counts as upcoming, happening or over. Shared by /events
// and each event's own landing page, so a camp cannot be "over" on one page
// and still selling tickets on the other.

export type EventPhase = 'upcoming' | 'happening' | 'over';

export interface EventDates {
	startsAt: Date;
	/**
	 * The first moment the event is over — midnight after its last day. `null`
	 * for a series whose last date is not fixed yet: it cannot be over before
	 * anyone knows when it ends.
	 */
	endsAt: Date | null;
}

export function eventPhase(event: EventDates, now: Date = new Date()): EventPhase {
	if (event.endsAt && now >= event.endsAt) return 'over';
	if (now >= event.startsAt) return 'happening';
	return 'upcoming';
}

/**
 * `?phase=over` (or `upcoming` / `happening`) previews another state of an
 * event page before the dates arrive. Anything else is ignored.
 */
export function parsePhase(value: string | null): EventPhase | null {
	return value === 'upcoming' || value === 'happening' || value === 'over' ? value : null;
}
