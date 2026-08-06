/**
 * The four groupings the knowledge map draws.
 *
 * Coarser than topics on purpose: ten topics is too many to hold in the head at
 * once, four is not. They are a reading aid, not a taxonomy — the RCOS layer a
 * topic maps to (`rcosLayer`) remains the structural claim.
 *
 * Which cluster a topic belongs to is stated in its frontmatter and validated,
 * so a new topic cannot quietly land in the wrong one.
 */
export const CLUSTERS = [
	{ key: 'culture', label: 'People & Culture' },
	{ key: 'power', label: 'Decisions & Power' },
	{ key: 'land', label: 'Land & Living Systems' },
	{ key: 'money', label: 'Money & Law' }
] as const;

export type ClusterKey = (typeof CLUSTERS)[number]['key'];

export const CLUSTER_KEYS: readonly string[] = CLUSTERS.map((c) => c.key);

export function clusterLabel(key: string): string {
	return CLUSTERS.find((c) => c.key === key)?.label ?? key;
}
