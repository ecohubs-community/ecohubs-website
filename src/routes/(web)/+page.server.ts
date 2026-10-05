import { ECOHUBSOS_API_URL, ECOHUBSOS_MEMBERS_API_KEY } from '$env/static/private';

interface ApiMember {
	displayName: string;
	avatarUrl: string | null;
	bio: string | null;
	languages: string | null;
	location: string | null;
	contribution: string | null;
	xp: number;
	eco: number;
	// Optional — only some ecohubsOS deployments expose a member level, and it
	// may arrive as a number (3) or an already-named tier ("Steward").
	level?: number | string | null;
	showOnWebsite?: boolean;
}

export interface ConstellationMember {
	name: string;
	loc: string;
	xp: number;
	eco: number;
	langs: string;
	bio: string;
	contrib: string;
	img?: string;
	/** Display-ready level label, omitted when the API doesn't provide one. */
	level?: string;
}

/**
 * Normalise the optional `level` field into something printable. Bare numbers
 * get a "Level " prefix; named tiers are used as-is; anything empty is dropped
 * so the UI can simply check for presence.
 */
function formatLevel(level: ApiMember['level']): string | undefined {
	if (level === null || level === undefined) return undefined;
	if (typeof level === 'number') {
		return Number.isFinite(level) ? `Level ${level}` : undefined;
	}
	const trimmed = String(level).trim();
	if (!trimmed) return undefined;
	return /^\d+$/.test(trimmed) ? `Level ${trimmed}` : trimmed;
}

// Last successful fetch, served only when ecohubsOS is unreachable. Freshness
// is the CDN's job (see `cache-control` in `load`): a TTL cache here would
// stack on top of it, since a warm instance can outlive the CDN entry.
let lastGood: ConstellationMember[] | null = null;

function parseDisplayName(displayName: string): { name: string; handle: string } {
	if (displayName.includes(' / ')) {
		const [first, second] = displayName.split(' / ', 2);
		return { name: first.trim(), handle: second.trim().toLowerCase() };
	}
	const trimmed = displayName.trim();
	return { name: trimmed, handle: trimmed.toLowerCase() };
}

// When duplicates share a handle, keep the most-complete record.
function richness(m: ApiMember): number {
	return (
		(m.bio ? 1 : 0) +
		(m.location ? 1 : 0) +
		(m.languages ? 1 : 0) +
		(m.contribution ? 1 : 0) +
		(m.avatarUrl ? 1 : 0) +
		(m.displayName.includes(' / ') ? 1 : 0)
	);
}

function dedupeByHandle(records: ApiMember[]): ApiMember[] {
	const map = new Map<string, ApiMember>();
	for (const r of records) {
		const { handle } = parseDisplayName(r.displayName);
		const existing = map.get(handle);
		if (!existing || richness(r) > richness(existing)) {
			map.set(handle, r);
		}
	}
	return [...map.values()];
}

function mapMember(m: ApiMember): ConstellationMember {
	const { name } = parseDisplayName(m.displayName);
	const langs = (m.languages ?? '')
		.split(/\s*(?:,|&| and )\s*/i)
		.map((l) => l.trim())
		.filter(Boolean)
		.join(' · ');
	return {
		name,
		loc: m.location ?? '',
		xp: m.xp ?? 0,
		eco: m.eco ?? 0,
		langs,
		bio: m.bio ?? '',
		contrib: m.contribution ?? '',
		img: m.avatarUrl ?? undefined,
		level: formatLevel(m.level)
	};
}

async function fetchMembers(fetchFn: typeof fetch): Promise<ConstellationMember[]> {
	if (
		!ECOHUBSOS_API_URL ||
		!ECOHUBSOS_MEMBERS_API_KEY ||
		ECOHUBSOS_MEMBERS_API_KEY === 'your-secure-api-key'
	) {
		return [];
	}
	const res = await fetchFn(`${ECOHUBSOS_API_URL}/api/public/members`, {
		headers: { 'x-api-key': ECOHUBSOS_MEMBERS_API_KEY }
	});
	if (!res.ok) {
		throw new Error(`Members API ${res.status}: ${await res.text()}`);
	}
	const json = (await res.json()) as { members?: ApiMember[] };
	const raw = (json.members ?? []).filter((m) => m.showOnWebsite !== false);
	return dedupeByHandle(raw)
		.map(mapMember)
		.sort((a, b) => b.xp - a.xp);
}

export async function load({ fetch, setHeaders }) {
	// Vercel's edge keeps the page for an hour, so members are at most ~1h old.
	// Browsers must not cache it themselves: Vercel strips `s-maxage` before
	// the response leaves the edge, so a browser `max-age` would add its own
	// window on top, and a deploy can't purge it.
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=600'
	});

	const now = Date.now();
	// The Community Mycelium teaser counts down from this. The page is cached
	// for hours, so the component starts from the render time (to hydrate the
	// same markup) and moves to the reader's clock on mount.
	const renderedAt = now;

	try {
		const members = await fetchMembers(fetch);
		lastGood = members;
		return { members, membersStale: false, renderedAt };
	} catch (err) {
		console.warn(
			'[v2] failed to fetch members from ecohubsOS:',
			err instanceof Error ? err.message : err
		);
		// Serve the last known good list, otherwise empty list.
		return {
			members: lastGood ?? [],
			membersStale: true,
			renderedAt
		};
	}
}
