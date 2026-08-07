/**
 * Metadata for the YouTube videos embedded across the site.
 *
 * `LiteYouTube` looks an entry up by video id and emits `VideoObject` JSON-LD
 * for it — so a page gets video schema simply by embedding a known video, and
 * the facts live in one place instead of being repeated per page.
 *
 * Every field here is taken from YouTube itself (title, publish date, runtime,
 * and the opening of the real description). A video with no entry still embeds
 * fine; it just emits no schema, which is the right default — inventing an
 * upload date would be worse than omitting one.
 */
export interface VideoMeta {
	/** Video title as published on YouTube. */
	name: string;
	/** Short summary, drawn from the video's own description. */
	description: string;
	/** ISO 8601 publish date, from YouTube. */
	uploadDate: string;
	/** Runtime in seconds, from YouTube. */
	durationSeconds: number;
}

export const VIDEO_METADATA: Record<string, VideoMeta> = {
	JwTf6BFhdYY: {
		name: 'An Introduction to RCOS — The Regenerative Community Operating System',
		description:
			"Most intentional communities don't fall apart because the people in them are flawed. They fall apart because the systems holding them together were never made explicit. An introduction to RCOS, the open standard for regenerative communities.",
		uploadDate: '2026-05-19T14:40:08-07:00',
		durationSeconds: 1125
	},
	'7tby1xZzMMk': {
		name: 'A Day in an EcoHub: Living in a Human-Scale Regenerative Community',
		description:
			'What if daily life did not just do less harm, but actively healed the land it sits on? A day in the life of an EcoHub — a regenerative intentional community built at human scale.',
		uploadDate: '2026-05-12T17:29:14-07:00',
		durationSeconds: 408
	},
	YNQN5PxXPt0: {
		name: 'RCOS: The 7-Layer Operating System for Regenerative Communities',
		description:
			'How EcoHubs and the Regenerative Community Operating System work — an open-source blueprint designed to help human-scale communities govern themselves and last.',
		uploadDate: '2026-03-12T16:18:16-07:00',
		durationSeconds: 430
	}
};

/** Seconds → ISO 8601 duration (`PT18M45S`), the format schema.org expects. */
export function toIsoDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	// The `|| 'PT0S'` this replaces could never fire: a template literal starting
	// with "PT" is always truthy, so a zero-length video produced the string "PT",
	// which is not a valid ISO 8601 duration for schema.org to read.
	const parts = `${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}`;
	return `PT${parts || '0S'}`;
}
