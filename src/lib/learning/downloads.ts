/**
 * The generated downloads, read from the manifest `scripts/build-downloads.ts`
 * writes.
 *
 * Kept out of the content model on purpose: page counts and file sizes are
 * facts about generated artefacts, not about the guide, and nobody should be
 * hand-maintaining "PDF · 69 pages" in frontmatter. A guide with nothing
 * generated yet simply has no downloads section.
 */
import manifest from '../../../static/downloads/manifest.json';

export interface Download {
	kind: 'pdf' | 'xlsx';
	label: string;
	/** The line under the label — "PDF · 69 pages · printable". */
	detail: string;
	/** Absolute, from `static/`. */
	file: string;
	bytes: number;
	pages?: number;
	/** `bytes` as a reader can judge it, added when the manifest is read. */
	size: string;
}

export interface GuideDownloads {
	generatedAt: string;
	entries: Download[];
}

type StoredDownload = Omit<Download, 'size'>;
const BY_GUIDE = manifest as Record<string, { generatedAt: string; entries: StoredDownload[] }>;

/** A size a reader can judge before clicking. */
function humanSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Import this from a `+page.server.ts` and nowhere else.
 *
 * The manifest is a build artefact under `static/`, and a component importing
 * anything from this module pulls that JSON into the browser bundle — which is
 * how the guide page briefly stopped loading. Everything the markup needs,
 * including the formatted size, is on the returned objects.
 */
export function downloadsFor(slug: string): GuideDownloads | null {
	const found = BY_GUIDE[slug];
	if (!found) return null;

	return {
		...found,
		entries: found.entries.map((entry) => ({ ...entry, size: humanSize(entry.bytes) }))
	};
}
