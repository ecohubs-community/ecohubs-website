import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import {
	guideBySlug,
	guideNeighbours,
	isIndexable,
	lessonBySlug,
	lessonsOfGuide,
	publishedLessons,
	readingMinutes,
	termBySlug
} from '$lib/learning';

export const prerender = true;

export const entries: EntryGenerator = () =>
	publishedLessons.map((l) => ({
		guide: l.frontmatter.guide,
		lesson: l.frontmatter.slug
	}));

export const load: PageServerLoad = async ({ params }) => {
	const entry = lessonBySlug.get(params.lesson);

	// The lesson must belong to the guide in the URL, or the same lesson would
	// be reachable under any guide — duplicate content at N different URLs.
	if (
		!entry ||
		entry.frontmatter.status !== 'published' ||
		entry.frontmatter.guide !== params.guide
	) {
		throw error(404, 'No lesson with this name');
	}

	const guide = guideBySlug.get(params.guide);
	if (!guide || guide.frontmatter.status !== 'published') {
		throw error(404, 'No guide with this name');
	}

	const fm = entry.frontmatter;
	const ordered = lessonsOfGuide(params.guide);
	const position = ordered.findIndex((l) => l.frontmatter.slug === fm.slug) + 1;
	const { previous, next } = guideNeighbours(params.guide, fm.slug);

	const brief = (l: (typeof ordered)[number] | null) =>
		l ? { slug: l.frontmatter.slug, title: l.frontmatter.title } : null;

	const terms = (fm.terms ?? [])
		.map((slug) => termBySlug.get(slug))
		.filter((t) => t && t.frontmatter.status === 'published')
		.map((t) => ({
			slug: t!.frontmatter.slug,
			term: t!.frontmatter.term,
			short: t!.frontmatter.short
		}));

	// The whole guide, for the left rail: a lesson page's primary navigation is
	// its siblings, not its own headings.
	const siblings = ordered.map((l, i) => ({
		// The slug is what the rail matches against stored reading progress.
		slug: l.frontmatter.slug,
		href: `/learn/guides/${params.guide}/${l.frontmatter.slug}`,
		label: l.frontmatter.title,
		marker: String(i + 1).padStart(2, '0'),
		current: l.frontmatter.slug === fm.slug,
		minutes: readingMinutes(l)
	}));

	return {
		lesson: fm,
		headings: entry.headings,
		siblings,
		guide: {
			slug: guide.frontmatter.slug,
			title: guide.frontmatter.title
		},
		position,
		total: ordered.length,
		previous: brief(previous),
		next: brief(next),
		terms,
		readingMinutes: readingMinutes(entry),
		indexable: isIndexable(entry)
	};
};
