import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/blog';

export const prerender = false; // Dynamic rendering for Ghost CMS + live YouTube feed

const YT_CHANNEL_ID = 'UC_fkvO1JoTTrNz1KVDtUdiw';

export interface LatestVideo {
	videoId: string;
	title: string;
	published: string;
}

/** Decode the handful of XML/HTML entities YouTube puts in feed titles. */
function decodeEntities(s: string): string {
	return s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// Module-level cache shared across requests in the same server instance. The
// feed changes at most a few times a week, so a 30-minute TTL keeps the page
// snappy without hammering YouTube on every render.
const CACHE_TTL_MS = 30 * 60 * 1000;
let cache: { at: number; video: LatestVideo | null } | null = null;

/**
 * Fetch the channel's most-recent upload from YouTube's public Atom feed.
 * No API key required. Cached for 30 minutes; on a fetch failure we serve the
 * last known value (even if stale) rather than blanking the section.
 */
async function getLatestVideo(fetchFn: typeof fetch): Promise<LatestVideo | null> {
	if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.video;

	try {
		const res = await fetchFn(
			`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`
		);
		if (!res.ok) throw new Error(`feed responded ${res.status}`);
		const xml = await res.text();
		const entry = xml.split('<entry>')[1];

		const videoId = entry?.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
		if (!videoId) throw new Error('no video id in feed');

		const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
		const published = entry.match(/<published>(.*?)<\/published>/)?.[1];

		const video: LatestVideo = {
			videoId,
			title: title ? decodeEntities(title.trim()) : 'Latest from EcoHubs',
			published: published ?? ''
		};
		cache = { at: Date.now(), video };
		return video;
	} catch {
		// Serve the last good value if we have one; otherwise hide the section.
		return cache?.video ?? null;
	}
}

export const load: PageServerLoad = async ({ fetch }) => {
	// One featured post + the next three on the hub; the full archive lives at /blog.
	const [posts, latestVideo] = await Promise.all([
		getAllPosts().then((p) => p || []),
		getLatestVideo(fetch)
	]);

	return {
		posts: posts.slice(0, 4),
		latestVideo
	};
};
