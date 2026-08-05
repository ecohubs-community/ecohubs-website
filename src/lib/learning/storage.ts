/**
 * The only place the Learning Hub touches `localStorage`.
 *
 * Components never read or write storage directly. Two reasons: every access
 * has to be wrapped — storage throws in private mode and when cookies are
 * disabled, and none of these features may break a page when it does — and the
 * keys are versioned, so a shape change can be migrated or dropped rather than
 * crashing on data written by an older build.
 *
 * Nothing here is sent anywhere. There is no account and no sync, which is why
 * the UI says "saved in this browser".
 *
 * See `Learning Hub — Implementation Plan.md` §6b.
 */
import { browser } from '$app/environment';
import { DEPTHS, type Depth } from './types';

export const KEYS = {
	/** `quick` | `standard` | `deep`. **Absent means "show everything"** — the
	 *  default must never hide content, or crawlers lose the deep layer. */
	depth: 'ecohubs.learning.depth',
	progress: 'ecohubs.learning.progress.v1',
	bookmarks: 'ecohubs.learning.bookmarks.v1',
	path: 'ecohubs.learning.path.v1',
	quiz: 'ecohubs.learning.quiz.v1'
} as const;

function read<T>(key: string, fallback: T): T {
	if (!browser) return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw === null ? fallback : (JSON.parse(raw) as T);
	} catch {
		return fallback;
	}
}

function write(key: string, value: unknown): void {
	if (!browser) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Quota exceeded or storage disabled. The feature degrades; the page does not.
	}
}

function remove(key: string): void {
	if (!browser) return;
	try {
		localStorage.removeItem(key);
	} catch {
		/* nothing to do */
	}
}

/* ── Depth ───────────────────────────────────────────────────────────────── */

/**
 * The stored depth preference, or `null` when the reader has never chosen.
 *
 * `null` is meaningful: it means render everything. Never substitute a default
 * here — `localStorage.getItem(...) || 'standard'` is the bug in the design
 * mockup, because Googlebot runs JS with empty storage and would then have the
 * deep content hidden from it.
 *
 * Depth is stored as a bare string rather than JSON so the tiny pre-paint
 * script in `app.html` can read it without a parser.
 */
export function getDepth(): Depth | null {
	if (!browser) return null;
	try {
		const value = localStorage.getItem(KEYS.depth);
		return DEPTHS.includes(value as Depth) ? (value as Depth) : null;
	} catch {
		return null;
	}
}

export function setDepth(depth: Depth | null): void {
	if (!browser) return;
	try {
		if (depth === null) {
			localStorage.removeItem(KEYS.depth);
			document.documentElement.removeAttribute('data-depth');
		} else {
			localStorage.setItem(KEYS.depth, depth);
			document.documentElement.setAttribute('data-depth', depth);
		}
	} catch {
		/* preference simply does not persist */
	}
}

/* ── Progress (mark as read) ─────────────────────────────────────────────── */

type ProgressMap = Record<string, number>;

export function getProgress(): ProgressMap {
	return read<ProgressMap>(KEYS.progress, {});
}

export function isRead(id: string): boolean {
	return Boolean(getProgress()[id]);
}

export function setRead(id: string, value: boolean): void {
	const all = getProgress();
	if (value) all[id] = Date.now();
	else delete all[id];
	write(KEYS.progress, all);
}

export function toggleRead(id: string): boolean {
	const next = !isRead(id);
	setRead(id, next);
	return next;
}

/** Percentage of `ids` marked read, for guide and path progress bars. */
export function percentRead(ids: string[]): number {
	if (ids.length === 0) return 0;
	const all = getProgress();
	return Math.round((ids.filter((id) => all[id]).length / ids.length) * 100);
}

/* ── Bookmarks ───────────────────────────────────────────────────────────── */

export interface Bookmark {
	/** Content slug. Resolved against the build-time index on render — stale
	 *  ids are dropped silently rather than shown as dead links. */
	id: string;
	type: string;
	savedAt: number;
}

export function getBookmarks(): Bookmark[] {
	const list = read<Bookmark[]>(KEYS.bookmarks, []);
	return Array.isArray(list) ? list : [];
}

export function isBookmarked(id: string): boolean {
	return getBookmarks().some((b) => b.id === id);
}

/** Returns the new state, so a caller can show the first-save hint. */
export function toggleBookmark(id: string, type: string): boolean {
	const list = getBookmarks();
	const i = list.findIndex((b) => b.id === id);
	if (i >= 0) {
		list.splice(i, 1);
		write(KEYS.bookmarks, list);
		return false;
	}
	list.push({ id, type, savedAt: Date.now() });
	write(KEYS.bookmarks, list);
	return true;
}

/** True when this is the reader's very first bookmark — the moment to explain
 *  where saved items live, once and never again. */
export function isFirstBookmark(): boolean {
	return getBookmarks().length === 0;
}

/* ── Path position ───────────────────────────────────────────────────────── */

type PathMap = Record<string, string>;

export function getPathPosition(pathSlug: string): string | null {
	return read<PathMap>(KEYS.path, {})[pathSlug] ?? null;
}

export function setPathPosition(pathSlug: string, lessonSlug: string): void {
	const all = read<PathMap>(KEYS.path, {});
	all[pathSlug] = lessonSlug;
	write(KEYS.path, all);
}

/* ── Quiz state ──────────────────────────────────────────────────────────── */

export interface QuizState {
	answers: Record<string, string | string[]>;
	completedAt: number;
}

export function getQuizState(quizId: string): QuizState | null {
	return read<Record<string, QuizState>>(KEYS.quiz, {})[quizId] ?? null;
}

export function setQuizState(quizId: string, state: QuizState): void {
	const all = read<Record<string, QuizState>>(KEYS.quiz, {});
	all[quizId] = state;
	write(KEYS.quiz, all);
}

/* ── Housekeeping ────────────────────────────────────────────────────────── */

/** Clears everything the hub has stored. The only recovery a reader has
 *  without accounts, so it must be offered in the UI. */
export function clearAll(): void {
	for (const key of Object.values(KEYS)) remove(key);
	if (browser) document.documentElement.removeAttribute('data-depth');
}
