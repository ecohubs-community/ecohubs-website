import { describe, expect, it } from 'vitest';
import { layoutMap, wrapLabel, type MapTopic } from './map';
import { CLUSTERS } from './clusters';

const topic = (slug: string, cluster: string, articles = 3): MapTopic => ({
	slug,
	title: slug,
	cluster,
	articles
});

describe('layoutMap', () => {
	it('places every topic exactly once', () => {
		const topics = [
			topic('a', 'culture'),
			topic('b', 'culture'),
			topic('c', 'power'),
			topic('d', 'land')
		];
		const placed = layoutMap(topics).clusters.flatMap((c) => c.nodes.map((n) => n.slug));
		expect(placed.sort()).toEqual(['a', 'b', 'c', 'd']);
	});

	/** Three empty rings say "something failed to load", not "nothing written yet". */
	it('drops clusters that hold nothing', () => {
		const layout = layoutMap([topic('a', 'culture')]);
		expect(layout.clusters.map((c) => c.key)).toEqual(['culture']);
	});

	it('returns no clusters at all when there are no topics', () => {
		expect(layoutMap([]).clusters).toEqual([]);
	});

	it('keeps clusters in the declared order', () => {
		const topics = CLUSTERS.map((c) => topic(c.key, c.key));
		// Fed in reverse, they should still come back in the canonical order.
		const layout = layoutMap([...topics].reverse());
		expect(layout.clusters.map((c) => c.key)).toEqual(CLUSTERS.map((c) => c.key));
	});

	it('puts a lone topic on its cluster centre rather than orbiting nothing', () => {
		const [cluster] = layoutMap([topic('a', 'culture')]).clusters;
		const [node] = cluster.nodes;
		expect([node.x, node.y]).toEqual([cluster.x, cluster.y]);
	});

	it('spreads several topics away from the centre, and apart', () => {
		const [cluster] = layoutMap([
			topic('a', 'culture'),
			topic('b', 'culture'),
			topic('c', 'culture')
		]).clusters;

		const offCentre = cluster.nodes.filter((n) => n.x !== cluster.x || n.y !== cluster.y);
		expect(offCentre).toHaveLength(3);

		const positions = new Set(cluster.nodes.map((n) => `${n.x},${n.y}`));
		expect(positions.size).toBe(3);
	});

	it('sizes dots by how much has been written, within a cap', () => {
		const [cluster] = layoutMap([
			topic('small', 'culture', 0),
			topic('big', 'culture', 300)
		]).clusters;
		const small = cluster.nodes.find((n) => n.slug === 'small')!;
		const big = cluster.nodes.find((n) => n.slug === 'big')!;
		expect(big.r).toBeGreaterThan(small.r);
		// Capped, so one huge topic cannot swamp the picture.
		expect(big.r).toBeLessThanOrEqual(12);
	});

	it('keeps every node inside the canvas', () => {
		const topics = CLUSTERS.flatMap((c) => [topic(`${c.key}1`, c.key), topic(`${c.key}2`, c.key)]);
		const layout = layoutMap(topics);
		const outside = layout.clusters
			.flatMap((c) => c.nodes)
			.filter(
				(n) =>
					n.x - n.r < 0 || n.y - n.r < 0 || n.x + n.r > layout.width || n.y + n.r > layout.height
			);
		expect(outside.map((n) => n.slug)).toEqual([]);
	});

	it('every node points its spoke at its own cluster centre', () => {
		const layout = layoutMap([topic('a', 'culture'), topic('b', 'power')]);
		const wrong = layout.clusters.flatMap((c) =>
			c.nodes.filter((n) => n.cx !== c.x || n.cy !== c.y)
		);
		expect(wrong.map((n) => n.slug)).toEqual([]);
	});

	it('lays out in one column when compact', () => {
		const topics = CLUSTERS.map((c) => topic(c.key, c.key));
		const xs = new Set(layoutMap(topics, { compact: true }).clusters.map((c) => c.x));
		expect(xs.size).toBe(1);
	});
});

/**
 * Label placement, which is where this layout actually goes wrong.
 *
 * Dots never overlap — the ring geometry guarantees it. Labels do, because a
 * topic title is thirty times wider than its dot, and the failure only appears
 * once a cluster holds five of them. These tests encode the collision
 * conditions rather than the coordinates, so the geometry can be retuned
 * without rewriting them.
 */
describe('layoutMap — labels', () => {
	/**
	 * Rough advance width of the map's 11.5px Inter, per character. Text
	 * metrics are not available here, and do not need to be: this is used to
	 * assert that labels have *room*, so an approximation erring on the wide
	 * side is the useful kind.
	 */
	const perChar = 6.2;
	/** A wrapped label is only as wide as its longest line. */
	const widthOf = (lines: string[]) => Math.max(...lines.map((l) => l.length)) * perChar;

	/** The box a label occupies, given its anchor and how many lines it has. */
	function box(node: { labelX: number; labelY: number; anchor: string; lines: string[] }) {
		const w = widthOf(node.lines);
		const [x, x2] =
			node.anchor === 'start'
				? [node.labelX, node.labelX + w]
				: node.anchor === 'end'
					? [node.labelX - w, node.labelX]
					: [node.labelX - w / 2, node.labelX + w / 2];
		// `labelY` is the first baseline; the box runs from its ascent to the
		// last line's descent.
		return { x, x2, y: node.labelY - 10, y2: node.labelY + (node.lines.length - 1) * 13 + 3 };
	}

	const overlap = (a: ReturnType<typeof box>, b: ReturnType<typeof box>) =>
		a.x < b.x2 && b.x < a.x2 && a.y < b.y2 && b.y < a.y2;

	/** The real hub's worst case: five topics in one cluster, long titles. */
	const power: MapTopic[] = [
		'Community Governance',
		'Conflict & Repair',
		'Resilience & Why Communities Fail',
		'Decision Methods',
		'Proposals & Ratification'
	].map((title) => ({ slug: title.toLowerCase(), title, cluster: 'power', articles: 6 }));

	it('sends each label away from its cluster centre, and keeps the poles centred', () => {
		const [cluster] = layoutMap(power).clusters;
		for (const node of cluster.nodes) {
			if (node.anchor === 'start') expect(node.labelX).toBeGreaterThan(node.x);
			else if (node.anchor === 'end') expect(node.labelX).toBeLessThan(node.x);
			else expect(node.labelX).toBe(node.x);
		}
		// Five around a ring puts one at twelve o'clock and none at six.
		expect(cluster.nodes.filter((n) => n.anchor === 'middle')).toHaveLength(1);
	});

	/** The whole hub, as it actually stands. */
	const wholeHub: MapTopic[] = [
		...power,
		...['Daily Life in Community', 'Membership & Belonging', 'Intentional Communities'].map(
			(title) => ({ slug: title, title, cluster: 'culture', articles: 4 })
		),
		...['Money & the Community Economy', 'Legal Structures & Ownership'].map((title) => ({
			slug: title,
			title,
			cluster: 'money',
			articles: 4
		}))
	];

	// Both layouts have to hold, and the narrow one is the tighter of the two:
	// it fits the same labels into a third of the width.
	for (const compact of [false, true]) {
		const named = compact ? 'stacked' : 'wide';

		it(`never lets two labels overlap — ${named}, 2 to 8 topics in a ring`, () => {
			for (const count of [2, 3, 4, 5, 6, 7, 8]) {
				const topics = Array.from({ length: count }, (_, i) => ({
					...power[i % power.length],
					slug: `t${i}`
				}));
				const [cluster] = layoutMap(topics, { compact }).clusters;

				for (const a of cluster.nodes) {
					for (const b of cluster.nodes) {
						if (a.slug >= b.slug) continue;
						expect(
							overlap(box(a), box(b)),
							`${named}, ${count} topics: "${a.title}" and "${b.title}" overlap`
						).toBe(false);
					}
				}
			}
		});

		it(`keeps every label inside the canvas — ${named}`, () => {
			const layout = layoutMap(wholeHub, { compact });
			for (const cluster of layout.clusters) {
				for (const node of cluster.nodes) {
					const b = box(node);
					expect(b.x, `"${node.title}" runs off the left`).toBeGreaterThanOrEqual(0);
					expect(b.x2, `"${node.title}" runs off the right`).toBeLessThanOrEqual(layout.width);
				}
			}
		});

		it(`keeps one cluster’s labels clear of every other’s — ${named}`, () => {
			const layout = layoutMap(wholeHub, { compact });
			const all = layout.clusters.flatMap((c) => c.nodes.map((n) => ({ ...n, key: c.key })));
			for (const a of all) {
				for (const b of all) {
					if (a.key === b.key || a.slug >= b.slug) continue;
					expect(overlap(box(a), box(b)), `${named}: "${a.title}" reaches into "${b.title}"`).toBe(
						false
					);
				}
			}
		});
	}

	it('sends each label away from its cluster centre in the stacked layout too', () => {
		const [cluster] = layoutMap(power, { compact: true }).clusters;
		expect(cluster.nodes.filter((n) => n.anchor !== 'middle').length).toBeGreaterThan(0);
	});

	it('leaves a lone topic’s label above its dot, not under the cluster centre', () => {
		const [cluster] = layoutMap([topic('a', 'culture')]).clusters;
		const [node] = cluster.nodes;
		expect(node.anchor).toBe('middle');
		expect(node.labelY).toBeLessThan(node.y);
	});

	it('stacks the clusters in the narrow layout, and keeps it narrow', () => {
		const wide = layoutMap(wholeHub);
		const narrow = layoutMap(wholeHub, { compact: true });
		expect(new Set(narrow.clusters.map((c) => c.x)).size).toBe(1);
		expect(narrow.width).toBeLessThan(wide.width / 2);
		// Height is the currency it trades width for, and a page can scroll.
		expect(narrow.height).toBeGreaterThan(wide.height);
	});
});

describe('wrapLabel', () => {
	it('leaves a short title alone', () => {
		expect(wrapLabel('Daily Life')).toEqual(['Daily Life']);
	});

	it('splits a long title as evenly as it can', () => {
		expect(wrapLabel('Resilience & Why Communities Fail')).toEqual([
			'Resilience & Why',
			'Communities Fail'
		]);
		expect(wrapLabel('Money & the Community Economy')).toEqual([
			'Money & the',
			'Community Economy'
		]);
	});

	it('never splits into more than two lines', () => {
		const long = 'One two three four five six seven eight nine ten eleven twelve';
		expect(wrapLabel(long)).toHaveLength(2);
	});

	it('leaves a long single word whole rather than hyphenating it', () => {
		expect(wrapLabel('Uncharacteristically')).toEqual(['Uncharacteristically']);
	});
});

describe('layoutMap — canvas', () => {
	it('grows a row at a time rather than leaving a lone ring in white space', () => {
		const one = layoutMap([topic('a', 'culture')]);
		const four = layoutMap(CLUSTERS.map((c) => topic(c.key, c.key)));
		expect(one.height).toBeLessThan(four.height);
		// Four clusters is the design's two-by-two.
		expect(four.clusters).toHaveLength(4);
	});

	it('still returns a usable canvas when there is nothing to place', () => {
		const layout = layoutMap([]);
		expect(layout.width).toBeGreaterThan(0);
		expect(layout.height).toBeGreaterThan(0);
	});
});
