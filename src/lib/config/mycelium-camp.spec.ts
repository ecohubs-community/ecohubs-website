import { describe, expect, it } from 'vitest';
import { campPhase, daysUntilCamp } from './mycelium-camp';

describe('campPhase', () => {
	it('is upcoming before the first evening', () => {
		expect(campPhase(new Date('2026-10-01T12:00:00Z'))).toBe('upcoming');
		// 17:59 in Yucatán on day one — the fire has not been lit yet.
		expect(campPhase(new Date('2026-10-23T23:59:00Z'))).toBe('upcoming');
	});

	it('is happening from Friday evening through the last day', () => {
		expect(campPhase(new Date('2026-10-24T00:00:00Z'))).toBe('happening');
		// 23:59 on Tue 27 Oct in Yucatán is already the 28th in UTC.
		expect(campPhase(new Date('2026-10-28T05:59:00Z'))).toBe('happening');
	});

	it('is over from midnight after the last day, Yucatán time', () => {
		expect(campPhase(new Date('2026-10-28T06:00:00Z'))).toBe('over');
		expect(campPhase(new Date('2027-03-01T00:00:00Z'))).toBe('over');
	});
});

describe('daysUntilCamp', () => {
	it('rounds up, so the eve still reads one day to go', () => {
		expect(daysUntilCamp(new Date('2026-10-22T20:00:00-06:00'))).toBe(1);
		expect(daysUntilCamp(new Date('2026-10-01T18:00:00-06:00'))).toBe(22);
	});

	it('never goes negative', () => {
		expect(daysUntilCamp(new Date('2026-11-01T00:00:00Z'))).toBe(0);
	});
});
