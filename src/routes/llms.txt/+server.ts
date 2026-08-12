import { PUBLIC_SITE_URL } from '$env/static/public';
import { isIndexable, publishedContent, urlFor } from '$lib/learning';
import { LEARN_SECTIONS } from '$lib/learning/sections';
import type { Frontmatter } from '$lib/learning/types';

/**
 * `llms.txt`, with its Learning section generated.
 *
 * It used to be a static file listing three of the hub's pages. The convention
 * in AGENTS.md is that *every* public page appears here with a sentence, and
 * the hub has around ninety — hand-maintaining that list would be wrong within
 * a week, exactly as it was already.
 *
 * So the preamble and the hand-written sections stay literal, and everything
 * under /learn is derived from the same index the sitemap uses. Each entry's
 * sentence is its own `summary`, so the description cannot drift from the page.
 *
 * Draft and thin content is filtered by `isIndexable()` — the same gate that
 * governs the routes, listings, sitemap, search index and rabbit-hole pool.
 */
export const prerender = true;

const SITE = PUBLIC_SITE_URL || 'https://ecohubs.community';

const PREAMBLE = `# EcoHubs.community

> A network of people designing regenerative intentional communities — and publishing the standard, the tools and the failures in the open. EcoHubs maintains RCOS (the Regenerative Community Operating System), an open standard for how a community governs itself, admits and releases members, handles conflict, and changes its own rules.

EcoHubs is a working project, not a think tank: the standard is tested against a live pilot, and what does not work is published alongside what does. Content is written for people either starting a community or trying to keep one from failing.

## Core pages

- [Home](https://ecohubs.community/): what EcoHubs is, who it is for, and the founder's account of why it exists.
- [Vision](https://ecohubs.community/vision): the case for small, human-scale communities that regenerate land, culture and livelihoods.
- [The RCOS Standard](https://ecohubs.community/rcos): an open, modular, forkable standard for designing and operating a regenerative community. The full specification lives at https://rcos.ecohubs.community.
- [Membership](https://ecohubs.community/membership): how to join the online community co-writing the standard. Free and contribution-based.
- [FAQ](https://ecohubs.community/faq): plain answers about the project, the standard, and membership.

## Tools

- [VoteCast](https://ecohubs.community/votecast): a tool for community decisions — proposals, deliberation, and six voting methods from a simple poll through to consent, with a durable record of what was decided. App at https://votecast.ecohubs.community.
- [CSI — Community Suitability Index](https://ecohubs.community/csi): an open map of where a regenerative, sovereign community has room to begin, read against law, land, water and local welcome. App at https://csi.ecohubs.community.
- [Community Resilience Assessment](https://ecohubs.community/community-resilience-assessment): a free ten-question assessment of how a community holds up under conflict, returned as a human-written report.
- [Ecohub One](https://ecohubs.community/join-the-waitlist): First land-based project to join the waitlist for.`;

const TAIL = `## Writing

- [Field notes (blog)](https://ecohubs.community/blog): essays on governance, membership, conflict and regenerative living.
- [Authors](https://ecohubs.community/blog/authors): who writes the field notes, and every piece each of them has published.
- [Why emergency decisions quietly become permanent](https://ecohubs.community/blog/emergency-rule-bypass-precedent): how communities lose their way back from crisis rules, with historical and organizational-research precedent.
- [The exit clause: designing a community you're allowed to leave](https://ecohubs.community/blog/the-exit-clause-designing-a-community-youre-allowed-to-leave): ownership models, the money-on-exit problem, and why a clear exit makes commitment possible.
- [Beyond the one-size-fits-all vote](https://ecohubs.community/blog/mastering-the-voting-type-strategy-for-intentional-communities): matching the decision-making method to the weight of the decision.
- [Beyond the vote: replacing consensus with consent](https://ecohubs.community/blog/beyond-the-vote-why-the-most-resilient-communities-are-replacing-consensus-with-consent): sociocracy, paramount objections, and escaping consensus paralysis.
- [The extraction trap: why sustainability isn't enough](https://ecohubs.community/blog/extraction-trap-why-sustainability-isnt-enough): the shift from doing less harm to active regeneration.
- [RCOS Core v0.1 is live](https://ecohubs.community/blog/rcos-core-v0-1-is-live-a-practical-operating-system-for-community-living): what the standard covers, who it is for, and how its stress tests work.

## Optional

- [Contact](https://ecohubs.community/contact)
- [All links, podcast and social](https://ecohubs.community/links)
- [Privacy policy](https://ecohubs.community/privacy)
- [Terms](https://ecohubs.community/terms)`;

/** `- [Title](url): summary.` — one line, as the convention asks. */
function line(title: string, path: string, summary: string): string {
	const sentence = summary.trim().replace(/\s+/g, ' ');
	return `- [${title}](${SITE}${path}): ${sentence}`;
}

/**
 * How the content types are grouped under `## Learning`, in order.
 *
 * Every type in the content model appears in exactly one group — the spec
 * checks that — so adding a type without deciding where it belongs fails
 * rather than silently dropping its pages out of the file.
 */
const GROUPS: { heading: string; types: Frontmatter['type'][] }[] = [
	{ heading: 'Guides and lessons', types: ['guide', 'lesson'] },
	{ heading: 'Topics', types: ['topic'] },
	{ heading: 'Compared', types: ['compare'] },
	{ heading: 'Learning paths', types: ['path'] },
	{ heading: 'Failure modes', types: ['failure'] },
	{ heading: 'Case studies', types: ['case'] },
	{ heading: 'Glossary', types: ['term'] }
];

function group(types: Frontmatter['type'][]): string[] {
	return publishedContent
		.filter(isIndexable)
		.filter((entry) => types.includes(entry.frontmatter.type))
		.map((entry) => line(entry.frontmatter.title, urlFor(entry), entry.frontmatter.summary))
		.sort();
}

/**
 * A sentence for each standalone hub page, keyed by the route.
 *
 * `LEARN_SECTIONS` is the hub's own navigation and the single list the sitemap
 * uses too, so a section cannot appear in the rail and be missing here. The
 * spec fails if a section has no sentence — which is the point: a new section
 * should not slip in undescribed.
 *
 * `/learn/search` and `/learn/bookmarks` are deliberately absent from
 * `LEARN_SECTIONS` and are permanently `noindex`, so they are not listed.
 */
const SECTION_BLURBS: Record<string, string> = {
	'/learn':
		'Plain explanations of how intentional communities actually work — governance, money, land, conflict and daily life.',
	'/learn/guides': 'Every guide in the hub, longest-form first.',
	'/learn/topics':
		'The subjects that decide whether a community lasts, each explained from the ground up.',
	'/learn/compare': 'The pairs of terms this field most often confuses, told apart.',
	'/learn/failures':
		'The documented ways communities break — each pattern with its warning signs, why it is hard to see from inside, and the structure that prevents it.',
	'/learn/paths': 'Ordered sequences through the lessons, for a particular question.',
	'/learn/glossary':
		'Plain definitions of the words this field uses, each with an example and what it is often confused with.',
	'/learn/map': 'How the topics relate to each other, drawn as a map.'
};

function learningSection(): string {
	const indexes = [
		...LEARN_SECTIONS.map(({ label, href }) => line(label, href, SECTION_BLURBS[href] ?? '')),
		// Not a nav section, so not in LEARN_SECTIONS — a standalone page, listed
		// here and in the sitemap's own routes array by hand.
		line(
			'How this is written',
			'/learn/how-this-is-written',
			'What we know first-hand, what comes from other communities, how AI is used, and what we do when we are wrong.'
		)
	];

	return [
		'## Learning',
		'',
		...indexes,
		// A group with nothing in it prints no heading — an empty "Case studies"
		// section would advertise content that does not exist.
		...GROUPS.flatMap(({ heading, types }) => {
			const entries = group(types);
			return entries.length ? ['', `### ${heading}`, '', ...entries] : [];
		})
	].join('\n');
}

export function GET() {
	const body = [PREAMBLE, '', learningSection(), '', TAIL, ''].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
