/**
 * The knowledge map's layout.
 *
 * A pure function from topics to coordinates, computed at build time so the
 * page ships a finished SVG: a crawler reads the labels, a reader without
 * JavaScript sees the whole map, and nothing reflows on load. The design's
 * mockup builds the same picture in the browser (`EH.renderMap`), which would
 * leave both with an empty box.
 *
 * The geometry follows the design: clusters on a grid, each a dashed ring with
 * its topics spaced evenly around a smaller circle inside it, spokes to the
 * centre, and a dot sized by how much has been written.
 */
import { CLUSTERS, clusterLabel } from './clusters';

export interface MapTopic {
	slug: string;
	title: string;
	cluster: string;
	/** How many pages sit under the topic. Drives the dot size. */
	articles: number;
}

export interface MapNode {
	slug: string;
	title: string;
	x: number;
	y: number;
	/** Radius of the dot. */
	r: number;
	/** Where the spoke to the cluster centre starts. */
	cx: number;
	cy: number;
}

export interface MapCluster {
	key: string;
	label: string;
	x: number;
	y: number;
	r: number;
	nodes: MapNode[];
}

export interface MapLayout {
	width: number;
	height: number;
	clusters: MapCluster[];
}

export interface MapOptions {
	width?: number;
	height?: number;
	/** One column instead of two, and smaller type — for a narrow rail. */
	compact?: boolean;
}

/**
 * Place every topic.
 *
 * Clusters with no published topics are dropped rather than drawn empty, so an
 * early hub shows a small honest map instead of three empty rings.
 */
export function layoutMap(topics: MapTopic[], options: MapOptions = {}): MapLayout {
	const { compact = false } = options;
	const width = options.width ?? (compact ? 240 : 920);

	const present = CLUSTERS.filter((c) => topics.some((t) => t.cluster === c.key));
	const columns = compact ? 1 : Math.min(2, Math.max(present.length, 1));
	const rows = Math.max(Math.ceil(present.length / columns), 1);

	// The canvas grows a row at a time rather than being a fixed 700px: with all
	// four clusters this is the design's proportions, and with one it is a small
	// square instead of a lone ring adrift in white space.
	const height = options.height ?? rows * (compact ? 240 : 350);

	if (present.length === 0) return { width, height, clusters: [] };

	const cellWidth = width / columns;
	const cellHeight = height / rows;
	const radius = Math.min(cellWidth, cellHeight) / 2 - (compact ? 14 : 26);

	const clusters = present.map((cluster, i) => {
		const cx = (i % columns) * cellWidth + cellWidth / 2;
		const cy = Math.floor(i / columns) * cellHeight + cellHeight / 2;
		const items = topics.filter((t) => t.cluster === cluster.key);

		// A lone topic sits on the centre rather than orbiting nothing.
		const orbit = items.length === 1 ? 0 : radius * (compact ? 0.46 : 0.52);

		const nodes = items.map((topic, j) => {
			// Start at twelve o'clock and go clockwise, so the first topic in a
			// cluster is always in the same place.
			const angle = (j / items.length) * Math.PI * 2 - Math.PI / 2;
			return {
				slug: topic.slug,
				title: topic.title,
				x: round(cx + Math.cos(angle) * orbit),
				y: round(cy + Math.sin(angle) * orbit),
				// Grows with what has been written, but capped: one huge topic
				// should not swamp the picture.
				r: compact ? 5 : round(6 + Math.min(6, topic.articles / 3)),
				cx: round(cx),
				cy: round(cy)
			};
		});

		return {
			key: cluster.key,
			label: clusterLabel(cluster.key),
			x: round(cx),
			y: round(cy),
			r: round(radius),
			nodes
		};
	});

	return { width, height, clusters };
}

/** Half a pixel is enough precision, and keeps the emitted SVG small. */
function round(value: number): number {
	return Math.round(value * 2) / 2;
}
