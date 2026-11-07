import { describe, it, expect } from 'vitest';
import { splitWaitlistName } from './mautic';

describe('splitWaitlistName', () => {
	it('splits the first word into f_name and the rest into l_name', () => {
		expect(splitWaitlistName({ email: 'a@b.co', f_name: 'Maria del Carmen Lopez' })).toEqual({
			email: 'a@b.co',
			f_name: 'Maria',
			l_name: 'del Carmen Lopez'
		});
	});

	it('collapses repeated whitespace', () => {
		expect(splitWaitlistName({ f_name: '  Ana   Silva ' })).toEqual({
			f_name: 'Ana',
			l_name: 'Silva'
		});
	});

	it('leaves a single name untouched and adds no l_name', () => {
		expect(splitWaitlistName({ f_name: 'Ana' })).toEqual({ f_name: 'Ana' });
	});

	it('passes fields through when there is no name at all', () => {
		expect(splitWaitlistName({ email: 'a@b.co' })).toEqual({ email: 'a@b.co' });
	});
});
