/**
 * Context plumbing for glossary definitions.
 *
 * See `/learn/+layout.server.ts` for why definitions arrive this way rather
 * than being imported: the content index cannot cross into the client bundle.
 */
import { getContext, setContext } from 'svelte';

export interface Definition {
	slug: string;
	term: string;
	short: string;
	published: boolean;
}

const KEY = Symbol('learning:definitions');

export function setDefinitions(definitions: Definition[]): void {
	setContext(KEY, new Map(definitions.map((d) => [d.slug, d])));
}

/**
 * Empty when a component using `<Gloss>` renders outside `/learn` — the term
 * then degrades to plain text rather than throwing.
 */
export function getDefinitions(): ReadonlyMap<string, Definition> {
	return getContext<ReadonlyMap<string, Definition>>(KEY) ?? new Map();
}
