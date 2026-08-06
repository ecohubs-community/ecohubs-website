/**
 * Which cover motif a page gets when it has no image of its own.
 *
 * Derived from the slug rather than stored, so every page has a cover from the
 * moment it is written, the choice never changes between builds, and adjacent
 * cards in a grid come out different — which is the whole point of having six.
 *
 * An author who cares can override it with `motif:`, or supply a real `image:`.
 */
import { MOTIFS, type Motif } from './types';

export function motifFor(slug: string, explicit?: Motif): Motif {
	if (explicit) return explicit;

	// FNV-1a. Any stable hash would do; this one is short and has no collisions
	// worth worrying about across a few hundred slugs.
	let hash = 0x811c9dc5;
	for (let i = 0; i < slug.length; i++) {
		hash ^= slug.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193);
	}
	return MOTIFS[Math.abs(hash) % MOTIFS.length];
}
