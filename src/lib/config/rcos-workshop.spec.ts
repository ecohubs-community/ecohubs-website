import { describe, expect, it } from 'vitest';
import {
	daysUntil,
	formatDateWithYear,
	formatSessionTime,
	nextRegistration,
	nextSession,
	seriesDates,
	sessionState,
	sessions,
	type WorkshopSession
} from './rcos-workshop';

// The behaviour tests run on fixtures, never on `sessions` itself: that list
// changes after every session (a `videoId`, the next date), and a test that
// read it would start failing the day somebody did the routine update.
const at = (iso: string) => new Date(iso);
const session = (part: number, extra: Partial<WorkshopSession> = {}): WorkshopSession => ({
	part,
	title: `Part ${part}`,
	short: `Part ${part}`,
	question: '?',
	...extra
});
const part1 = session(1, {
	startsAt: at('2026-11-06T18:00:00-05:00'),
	minutes: 60,
	lumaUrl: 'https://luma.com/part-1'
});
const undated = session(2);

describe('sessions', () => {
	it('has an introduction and one session per RCOS layer, in order', () => {
		expect(sessions).toHaveLength(8);
		expect(sessions.map((s) => s.part)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		expect(sessions.slice(1).map((s) => s.layer)).toEqual([0, 1, 2, 3, 4, 5, 6]);
	});

	it('gives the first session a date, which the series needs to exist', () => {
		expect(sessions[0].startsAt).toBeInstanceOf(Date);
	});
});

describe('sessionState', () => {
	it('follows a session from scheduled to live to waiting for its recording', () => {
		expect(sessionState(part1, at('2026-11-06T17:59:00-05:00'))).toBe('scheduled');
		expect(sessionState(part1, at('2026-11-06T18:00:00-05:00'))).toBe('live');
		expect(sessionState(part1, at('2026-11-06T18:59:00-05:00'))).toBe('live');
		expect(sessionState(part1, at('2026-11-06T19:00:00-05:00'))).toBe('processing');
	});

	it('is recorded as soon as a video id is set', () => {
		expect(sessionState({ ...part1, videoId: 'abc' }, at('2026-11-06T19:30:00-05:00'))).toBe(
			'recorded'
		);
	});

	it('is unscheduled without a date', () => {
		expect(sessionState(undated, at('2026-11-01T00:00:00Z'))).toBe('unscheduled');
	});
});

describe('seriesDates', () => {
	it('has no end while any session is undated, so the series is never over too early', () => {
		expect(seriesDates([part1, undated]).endsAt).toBeNull();
	});

	it('ends when the last session ends once every part has a date', () => {
		const dated: WorkshopSession[] = Array.from({ length: 8 }, (_, i) =>
			session(i + 1, { startsAt: new Date(Date.UTC(2026, 10, 6 + 7 * i, 23)), minutes: 60 })
		);
		expect(seriesDates(dated).endsAt).toEqual(new Date(Date.UTC(2026, 11, 25, 24)));
	});
});

describe('nextSession', () => {
	it('is the session before and during it, and nothing once only undated parts remain', () => {
		const list = [part1, undated];
		expect(nextSession(at('2026-11-05T12:00:00Z'), list)?.part).toBe(1);
		expect(nextSession(at('2026-11-06T18:30:00-05:00'), list)?.part).toBe(1);
		expect(nextSession(at('2026-11-06T19:00:00-05:00'), list)).toBeNull();
	});

	it('picks the earliest date, not the first in the list, when parts are rescheduled', () => {
		const later = session(2, { startsAt: at('2026-11-20T18:00:00-05:00') });
		const sooner = session(3, { startsAt: at('2026-11-13T18:00:00-05:00') });
		expect(nextSession(at('2026-11-07T00:00:00Z'), [later, sooner])?.part).toBe(3);
	});

	it('puts a live session first, even ahead of an earlier-listed one still to come', () => {
		const ahead = session(2, { startsAt: at('2026-11-20T18:00:00-05:00') });
		const live = session(3, { startsAt: at('2026-11-13T18:00:00-05:00'), minutes: 60 });
		expect(nextSession(at('2026-11-13T18:30:00-05:00'), [ahead, live])?.part).toBe(3);
	});
});

describe('nextRegistration', () => {
	it('skips a dated session whose Luma page is not up yet', () => {
		const noLink = session(2, { startsAt: at('2026-11-13T18:00:00-05:00') });
		const withLink = session(3, {
			startsAt: at('2026-11-20T18:00:00-05:00'),
			lumaUrl: 'https://luma.com/part-3'
		});
		expect(nextRegistration(at('2026-11-07T00:00:00Z'), [noLink, withLink])?.part).toBe(3);
	});
});

describe('formatSessionTime', () => {
	it('shows the host time zone regardless of where the code runs', () => {
		expect(formatSessionTime(part1.startsAt!)).toBe('Fri 6 Nov · 18:00 GMT-5');
	});
});

describe('formatDateWithYear', () => {
	it('takes the year from the Ecuador calendar', () => {
		// 20:00 on 31 Dec in Ecuador is already 2027 in UTC.
		expect(formatDateWithYear(at('2026-12-31T20:00:00-05:00'))).toBe('31 Dec 2026');
	});
});

describe('daysUntil', () => {
	it('counts calendar days in Ecuador', () => {
		// 20:00 on the 5th in Ecuador is already the 6th in UTC — still "tomorrow".
		expect(daysUntil(part1.startsAt!, at('2026-11-05T20:00:00-05:00'))).toBe(1);
		expect(daysUntil(part1.startsAt!, at('2026-11-06T09:00:00-05:00'))).toBe(0);
	});
});
