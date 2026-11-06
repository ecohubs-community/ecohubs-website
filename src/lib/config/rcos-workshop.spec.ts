import { describe, expect, it } from 'vitest';
import {
	daysUntil,
	formatSessionTime,
	nextSession,
	seriesDates,
	sessionState,
	sessions,
	type WorkshopSession
} from './rcos-workshop';

const at = (iso: string) => new Date(iso);
const part1 = sessions[0];

describe('sessions', () => {
	it('has an introduction and one session per RCOS layer, in order', () => {
		expect(sessions).toHaveLength(8);
		expect(sessions.map((s) => s.part)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		expect(sessions.slice(1).map((s) => s.layer)).toEqual([0, 1, 2, 3, 4, 5, 6]);
	});
});

describe('sessionState', () => {
	it('follows Part 1 from scheduled to live to waiting for its recording', () => {
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
		expect(sessionState(sessions[1], at('2026-11-01T00:00:00Z'))).toBe('unscheduled');
	});
});

describe('seriesDates', () => {
	it('has no end while any session is undated, so the series is never over too early', () => {
		expect(seriesDates().endsAt).toBeNull();
	});

	it('ends when the last session ends once every part has a date', () => {
		const dated: WorkshopSession[] = sessions.map((s, i) => ({
			...s,
			startsAt: new Date(Date.UTC(2026, 10, 6 + 7 * i, 23)),
			minutes: 60
		}));
		expect(seriesDates(dated).endsAt).toEqual(new Date(Date.UTC(2026, 11, 25, 24)));
	});
});

describe('nextSession', () => {
	it('is Part 1 before and during it, and nothing once only undated parts remain', () => {
		expect(nextSession(at('2026-11-05T12:00:00Z'))?.part).toBe(1);
		expect(nextSession(at('2026-11-06T18:30:00-05:00'))?.part).toBe(1);
		expect(nextSession(at('2026-11-06T19:00:00-05:00'))).toBeNull();
	});
});

describe('formatSessionTime', () => {
	it('shows the host time zone regardless of where the code runs', () => {
		expect(formatSessionTime(part1.startsAt!)).toBe('Fri 6 Nov · 18:00 GMT-5');
	});
});

describe('daysUntil', () => {
	it('counts calendar days in Ecuador', () => {
		// 20:00 on the 5th in Ecuador is already the 6th in UTC — still "tomorrow".
		expect(daysUntil(part1.startsAt!, at('2026-11-05T20:00:00-05:00'))).toBe(1);
		expect(daysUntil(part1.startsAt!, at('2026-11-06T09:00:00-05:00'))).toBe(0);
	});
});
