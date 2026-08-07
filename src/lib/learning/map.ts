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
	/**
	 * Where the label sits, and which end of it is anchored there.
	 *
	 * Labels are pushed *away from the cluster centre* rather than always
	 * sitting centred above the dot. Centred labels only work while a ring
	 * holds three or four short titles: at five, two nodes land at the same
	 * height a hundred points apart, and two centred labels of thirty
	 * characters overlap every time. Sending each one outward — left of a
	 * left-hand dot, right of a right-hand one — separates them at any ring
	 * size without shortening a single topic title.
	 *
	 * Nodes near the top and bottom of the ring have no side to go to, so they
	 * stay centred: above at the top, below at the bottom.
	 */
	labelX: number;
	/** Baseline of the *first* line. Later lines follow at `LINE_HEIGHT`. */
	labelY: number;
	anchor: LabelAnchor;
	/**
	 * The title broken into at most two lines.
	 *
	 * Label width, not ring size, is what the canvas has to be built around: a
	 * thirty-three character title on one line runs 190 points out from its
	 * dot, which forces a canvas so wide that the whole drawing — text included
	 * — is scaled down to compensate. Breaking it in half halves the width
	 * budget, which buys back type size everywhere and is what makes a
	 * single-column layout fit a phone at all.
	 */
	lines: string[];
}

export type LabelAnchor = 'start' | 'middle' | 'end';

/** Baseline-to-baseline distance for a wrapped label, in user units. */
export const LINE_HEIGHT = 13;

/** Titles at or below this stay on one line; longer ones are split in two. */
const WRAP_OVER = 14;

/**
 * Break a title into at most two lines, as evenly as possible.
 *
 * Evenness is the point: the canvas is sized around the *longest* line, so the
 * split that minimises it is the split that costs the least width. A title
 * with nowhere to break stays whole rather than being hyphenated.
 */
export function wrapLabel(title: string, over = WRAP_OVER): string[] {
	if (title.length <= over) return [title];

	const words = title.split(' ');
	if (words.length < 2) return [title];

	let best: string[] | null = null;
	let bestWidth = Infinity;
	for (let i = 1; i < words.length; i++) {
		const head = words.slice(0, i).join(' ');
		const tail = words.slice(i).join(' ');
		const widest = Math.max(head.length, tail.length);
		if (widest < bestWidth) {
			bestWidth = widest;
			best = [head, tail];
		}
	}
	return best ?? [title];
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
	/**
	 * One cluster per row on a narrow canvas — the phone layout.
	 *
	 * The wide two-column map is unreadable below about 600 points of render
	 * width: it is scaled to fit, and its type goes with it. Stacking the
	 * clusters instead trades height, which a page can scroll, for width, which
	 * it cannot — and keeps the labels at very nearly their authored size.
	 */
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
	// Wider than the rings need, because the labels live outside them: a
	// wrapped title still reaches about 100 points out from its dot, and that
	// has to fit between the ring and the canvas edge — and, in the two-column
	// layout, between one ring's labels and the next one's. The ring size is
	// unaffected: `radius` below is driven by the row height.
	const width = options.width ?? (compact ? 320 : 900);

	const present = CLUSTERS.filter((c) => topics.some((t) => t.cluster === c.key));
	const columns = compact ? 1 : Math.min(2, Math.max(present.length, 1));
	const rows = Math.max(Math.ceil(present.length / columns), 1);

	// The canvas grows a row at a time rather than being a fixed 700px: with all
	// four clusters this is the design's proportions, and with one it is a small
	// square instead of a lone ring adrift in white space.
	const height = options.height ?? rows * (compact ? 250 : 350);

	if (present.length === 0) return { width, height, clusters: [] };

	const cellWidth = width / columns;
	const cellHeight = height / rows;
	const radius = Math.min(cellWidth, cellHeight) / 2 - (compact ? 18 : 26);

	const clusters = present.map((cluster, i) => {
		const cx = (i % columns) * cellWidth + cellWidth / 2;
		const cy = Math.floor(i / columns) * cellHeight + cellHeight / 2;
		const items = topics.filter((t) => t.cluster === cluster.key);

		// A lone topic sits on the centre rather than orbiting nothing. The
		// narrow layout keeps a tighter ring, because the labels beside it are
		// nearly as wide as the canvas.
		const orbit = items.length === 1 ? 0 : radius * (compact ? 0.42 : 0.52);

		const nodes = items.map((topic, j): MapNode => {
			// Start at twelve o'clock and go clockwise, so the first topic in a
			// cluster is always in the same place.
			const angle = (j / items.length) * Math.PI * 2 - Math.PI / 2;
			const x = cx + Math.cos(angle) * orbit;
			const y = cy + Math.sin(angle) * orbit;
			// Grows with what has been written, but capped: one huge topic
			// should not swamp the picture. Smaller in the narrow layout, where
			// the same dot would be five times the share of the canvas.
			const r = compact
				? round(4 + Math.min(3, topic.articles / 6))
				: round(6 + Math.min(6, topic.articles / 3));
			const gap = r + 7;

			// A node within about twenty degrees of the vertical axis has no
			// side to be pushed to — a sideways label there would sit on the
			// dot — so it keeps the centred treatment.
			const across = Math.cos(angle);
			const centred = Math.abs(across) < 0.35;
			// A lone topic sits on the cluster centre, and its label belongs
			// above rather than below, where the cluster's own dot is.
			const above = orbit === 0 || Math.sin(angle) < 0;

			const lines = wrapLabel(topic.title);
			const stack = (lines.length - 1) * LINE_HEIGHT;

			return {
				slug: topic.slug,
				title: topic.title,
				x: round(x),
				y: round(y),
				r,
				cx: round(cx),
				cy: round(cy),
				labelX: round(centred ? x : x + (across > 0 ? gap : -gap)),
				// A side label is centred on its dot, so a two-line one starts
				// half a line higher. A centred label stacks upward from the
				// gap when it sits above, and downward from it when below —
				// where the extra 11 clears the first line's ascent.
				labelY: round(centred ? (above ? y - gap - stack : y + gap + 11) : y + 4 - stack / 2),
				anchor: centred ? 'middle' : across > 0 ? 'start' : 'end',
				lines
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
