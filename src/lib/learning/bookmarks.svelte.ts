/**
 * How many bookmarks this browser holds, as one reactive value.
 *
 * The rail and the mobile tab row both show the Bookmarks entry, and both need
 * the same number — reading storage twice would be fine but they could drift
 * after a change in another tab.
 *
 * Zero on the server, which is the honest answer for a request with no
 * browser: the entry renders disabled and becomes a link once hydration finds
 * something. Nothing is ever revealed by JavaScript that was hidden without it.
 */
import { getBookmarks } from './storage';

let count = $state(0);
let subscribers = 0;
let detach: (() => void) | undefined;

export function bookmarkCount() {
	return count;
}

/** Call from `onMount`; returns a teardown for the caller to return. */
export function watchBookmarks(): () => void {
	count = getBookmarks().length;

	if (subscribers++ === 0) {
		const update = () => (count = getBookmarks().length);
		// `storage` fires for other tabs; `bookmarkschange` is our own signal for
		// this one, since a same-document write does not raise `storage`.
		window.addEventListener('storage', update);
		window.addEventListener('bookmarkschange', update);
		detach = () => {
			window.removeEventListener('storage', update);
			window.removeEventListener('bookmarkschange', update);
		};
	}

	return () => {
		if (--subscribers === 0) {
			detach?.();
			detach = undefined;
		}
	};
}
