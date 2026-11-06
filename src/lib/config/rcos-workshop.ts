// RCOS, step by step — an eight-part online workshop series.
//
// Lives here rather than in the landing page's `data.ts` because three pages
// read it: `/events/rcos-step-by-step` itself, its entry on `/events`, and the
// teaser on `/`. All of them switch on where the series stands, so the dates
// that decide it must exist exactly once.
//
// After each session, the whole update is one edit to `sessions` below:
//   - the session that just ran gets its `videoId` (the part after `v=` in the
//     YouTube URL), and the page swaps "recording coming soon" for the video;
//   - the next one gets its `startsAt` and `lumaUrl` once it is on Luma.
// Nothing in the markup needs to change.

import { eventPhase, type EventDates, type EventPhase } from './events';
import { RCOS_LAYERS, rcosLayerUrl } from '$lib/learning/rcos';

/** Sessions run at 18:00 in Ecuador (America/Guayaquil): UTC−5 all year, no daylight saving. */
const TZ = '-05:00';
const TZ_OFFSET_HOURS = -5;
export const TZ_LABEL = 'GMT-5';

export interface WorkshopSession {
	part: number;
	/** RCOS Core layer this session works through. Part 1 is the introduction and has none. */
	layer?: number;
	title: string;
	/** A few words for tight spaces: the syllabus strip at the top of the page. */
	short: string;
	/** The question the layer answers, in plain words. */
	question: string;
	startsAt?: Date;
	/** Defaults to 60. */
	minutes?: number;
	/** Registration page. A session with a date but no link shows the date only. */
	lumaUrl?: string;
	/** YouTube id of the recording, once it is up. */
	videoId?: string;
}

/**
 * Where a session stands for a reader at `now`:
 * - `recorded` — the video is up;
 * - `live` — under way right now;
 * - `scheduled` — has a date still ahead;
 * - `processing` — has happened, recording not up yet;
 * - `unscheduled` — no date yet.
 */
export type SessionState = 'recorded' | 'live' | 'scheduled' | 'processing' | 'unscheduled';

const layer = (n: number, short: string, question: string): WorkshopSession => ({
	part: n + 2,
	layer: n,
	title: RCOS_LAYERS[n].title,
	short,
	question
});

export const sessions: WorkshopSession[] = [
	{
		part: 1,
		title: 'Introduction to the Regenerative Community Operating System',
		short: 'Introduction to RCOS',
		question: 'What RCOS is, why communities need it, and how the next seven sessions work.',
		startsAt: new Date(`2026-11-06T18:00:00${TZ}`),
		minutes: 60,
		lumaUrl: 'https://luma.com/f4y1l170'
	},
	layer(0, 'Identity & Scope', 'Why does this community exist, and what does it govern?'),
	layer(1, 'Membership', 'How do people join, stay, and leave?'),
	layer(2, 'Governance & Decisions', 'Who decides what, and how?'),
	layer(3, 'Economy & Resources', 'How do money, land and work flow, and what is held in common?'),
	layer(4, 'Conflict & Repair', 'What happens when things go wrong between people?'),
	layer(5, 'Operations', 'Who does what, day to day, without anyone burning out?'),
	layer(6, 'Evolution', 'How does the community change its own rules?')
];

export const rcosWorkshop = {
	name: 'RCOS, step by step',
	fullTitle:
		'RCOS: Applying the Regenerative Community Operating System to your community, step by step',
	path: '/events/rcos-step-by-step',
	host: 'Stefan Lessle',
	coHost: 'Sun',
	place: 'Online · Zoom',
	price: 'Free',
	/** The 18-minute introduction already on YouTube, for anyone who can't wait. */
	introVideoId: 'JwTf6BFhdYY',
	templatesUrl: 'https://rcos.ecohubs.community/templates',
	specUrl: 'https://rcos.ecohubs.community'
} as const;

export function templateUrl(layerNo: number): string {
	return `${rcosWorkshop.templatesUrl}/layer-${layerNo}`;
}

export { rcosLayerUrl };

export function sessionEnd(session: WorkshopSession): Date | null {
	if (!session.startsAt) return null;
	return new Date(session.startsAt.getTime() + (session.minutes ?? 60) * 60_000);
}

export function sessionState(session: WorkshopSession, now: Date = new Date()): SessionState {
	if (session.videoId) return 'recorded';
	const end = sessionEnd(session);
	if (!session.startsAt || !end) return 'unscheduled';
	if (now < session.startsAt) return 'scheduled';
	if (now < end) return 'live';
	return 'processing';
}

/**
 * The series as one event: it starts with Part 1 and ends when Part 8 does.
 * Until every part has a date, the end is unknown and the series cannot be over.
 */
export function seriesDates(list: WorkshopSession[] = sessions): EventDates {
	const first = list[0].startsAt;
	if (!first) throw new Error('The first session of a series needs a date.');
	const allDated = list.every((s) => s.startsAt);
	const ends = list.map(sessionEnd).filter((d): d is Date => d !== null);
	const last = ends.length ? new Date(Math.max(...ends.map((d) => d.getTime()))) : null;
	return { startsAt: first, endsAt: allDated ? last : null };
}

export function seriesPhase(now: Date = new Date()): EventPhase {
	return eventPhase(seriesDates(), now);
}

/**
 * The session a reader can still join: one that is live now, else the
 * earliest one still ahead. Sorted by date rather than taken in list order,
 * so a part moved to after the next one cannot jump the queue.
 */
export function nextSession(
	now: Date = new Date(),
	list: WorkshopSession[] = sessions
): WorkshopSession | null {
	const live = list.find((s) => sessionState(s, now) === 'live');
	if (live) return live;
	const ahead = list
		.filter((s) => sessionState(s, now) === 'scheduled')
		.sort((a, b) => a.startsAt!.getTime() - b.startsAt!.getTime());
	return ahead[0] ?? null;
}

/**
 * The next session someone can register for: like `nextSession`, but
 * skipping a dated session whose Luma page is not up yet.
 */
export function nextRegistration(
	now: Date = new Date(),
	list: WorkshopSession[] = sessions
): WorkshopSession | null {
	return nextSession(
		now,
		list.filter((s) => s.lumaUrl)
	);
}

export function recordedCount(list: WorkshopSession[] = sessions): number {
	return list.filter((s) => s.videoId).length;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * "Fri 6 Nov · 18:00 GMT-5". Built by hand rather than with `Intl` so the
 * server and the browser produce the same string and hydration matches.
 */
export function formatSessionTime(date: Date): string {
	const d = new Date(date.getTime() + TZ_OFFSET_HOURS * 3_600_000);
	const hh = String(d.getUTCHours()).padStart(2, '0');
	const mm = String(d.getUTCMinutes()).padStart(2, '0');
	return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${hh}:${mm} ${TZ_LABEL}`;
}

/** "6 Nov". */
export function formatShortDate(date: Date): string {
	const d = new Date(date.getTime() + TZ_OFFSET_HOURS * 3_600_000);
	return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** "6 Nov 2026" — the year on the same Ecuador calendar as the day. */
export function formatDateWithYear(date: Date): string {
	const d = new Date(date.getTime() + TZ_OFFSET_HOURS * 3_600_000);
	return `${formatShortDate(date)} ${d.getUTCFullYear()}`;
}

/** Days until `date` on an Ecuador wall calendar: 1 the day before, 0 on the day. */
export function daysUntil(date: Date, now: Date = new Date()): number {
	const day = (t: Date) => Math.floor((t.getTime() + TZ_OFFSET_HOURS * 3_600_000) / 86_400_000);
	return Math.max(0, day(date) - day(now));
}
