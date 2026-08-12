/**
 * Where each RCOS Core layer lives, so a `rcosLayer: 4` in frontmatter can
 * become a link to the page that actually says something rather than to the
 * specification's table of contents.
 *
 * Slugs are taken from the published v0.1 index. They are pinned to that
 * version on purpose: a later RCOS release may renumber or rename layers, and a
 * link that silently follows "latest" would take a reader to a page that no
 * longer says what this hub says it says.
 */
export const RCOS_BASE = 'https://rcos.ecohubs.community/articles/rcos-core/v0-1';

export const RCOS_LAYERS: Record<number, { title: string; slug: string }> = {
	0: { title: 'Identity & Scope', slug: 'layer-0-identity-scope' },
	1: { title: 'Membership System', slug: 'layer-1-membership-system' },
	2: { title: 'Governance & Decision Logic', slug: 'layer-2-governance-decision-logic' },
	3: { title: 'Economic & Resource System', slug: 'layer-3-economic-resource-system' },
	4: { title: 'Conflict, Repair & Accountability', slug: 'layer-4-conflict-repair-accountability' },
	5: { title: 'Operations & Coordination', slug: 'layer-5-operations-coordination' },
	6: { title: 'Evolution & Adaptation', slug: 'layer-6-evolution-adaptation' }
};

/** The layer page, or the specification index for a layer we do not know. */
export function rcosLayerUrl(layer: number): string {
	const known = RCOS_LAYERS[layer];
	return known ? `${RCOS_BASE}/${known.slug}` : `${RCOS_BASE}/`;
}

/** "Layer 4 — Conflict, Repair & Accountability", for a link's accessible name. */
export function rcosLayerLabel(layer: number): string {
	const known = RCOS_LAYERS[layer];
	return known ? `Layer ${layer} — ${known.title}` : `Layer ${layer}`;
}
