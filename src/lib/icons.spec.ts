import { describe, expect, it } from 'vitest';
import { ICONS, iconData } from './icons.generated';
import { collectNames } from '../../scripts/build-icons.mjs';

/**
 * The bundle is generated from the source, so it can only go stale by someone
 * adding an icon and not running `pnpm icons`. That failure is silent at
 * runtime — the icon simply does not appear — so it is caught here instead.
 */
describe('bundled icons', () => {
	const used = collectNames().map((n: string) => `tabler:${n}`);

	it('bundles every icon the source refers to', () => {
		const missing = used.filter((name: string) => !(name in ICONS));
		expect(missing, 'run `pnpm icons`').toEqual([]);
		expect(used.length).toBeGreaterThan(0);
	});

	it('bundles nothing the source no longer refers to', () => {
		const stale = Object.keys(ICONS).filter((name) => !used.includes(name));
		expect(stale, 'run `pnpm icons`').toEqual([]);
	});

	it('gives every icon a body and default dimensions', () => {
		const broken = Object.keys(ICONS).filter((name) => {
			const data = iconData(name);
			return !data?.body || !data.width || !data.height;
		});
		expect(broken).toEqual([]);
	});

	it('returns nothing for an icon that was never bundled', () => {
		expect(iconData('tabler:not-a-real-icon')).toBeUndefined();
	});
});
