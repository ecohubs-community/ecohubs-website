import { describe, expect, it } from 'vitest';
import { layoutMap, type MapTopic } from './map';
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
