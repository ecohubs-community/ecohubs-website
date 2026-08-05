import type { LayoutServerLoad } from './$types';
import { terms } from '$lib/learning';

export const prerender = true;

/**
 * Ships the glossary definitions once for the whole `/learn` section.
 *
 * `<Gloss>` needs a slug → definition lookup, but it renders inside markdown
 * that hydrates on the client, so it cannot import the content index: that
 * index eagerly globs every compiled content module, and pulling it into the
 * browser would ship the entire hub on every page.
 *
 * Loading it here instead keeps the payload to a few hundred bytes per term
 * and lets Vite code-split the markdown properly. The layout puts it in
 * context; `Gloss` reads it from there.
 *
 * Drafts are included on purpose — a lesson may reference a term whose page is
 * unfinished, and showing the definition is better than showing nothing. The
 * `published` flag is what decides whether it becomes a link.
 */
export const load: LayoutServerLoad = async () => {
	return {
		definitions: terms.map((t) => ({
			slug: t.frontmatter.slug,
			term: t.frontmatter.term,
			short: t.frontmatter.short,
			published: t.frontmatter.status === 'published'
		}))
	};
};
