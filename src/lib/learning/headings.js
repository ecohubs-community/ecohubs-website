/**
 * Heading slugs, shared by the rehype plugin that stamps `id`s onto headings
 * and the index that builds each page's table of contents.
 *
 * Plain JavaScript on purpose: `mdsvex.config.js` loads at build-config time,
 * before TypeScript is compiled, so it cannot import a `.ts` module. Both
 * consumers importing this one file is what stops the two slug implementations
 * drifting apart — a drift would silently break every contents link.
 *
 * Once published, a heading id is a URL. Change the slug rule and you break
 * anchors people have shared.
 */

/** @param {string} text */
export function slugifyHeading(text) {
	return text
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '') // strip the diacritics NFKD split off
		.replace(/['‘’"“”]/g, '') // apostrophes vanish rather than becoming dashes
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 70)
		.replace(/-+$/g, '');
}

/**
 * Top-level (`##`) headings of a markdown body, in document order.
 *
 * Reads the source rather than the rendered output so it works at index time
 * without rendering anything. Fenced code blocks are removed first so a `##`
 * comment inside one is not mistaken for a heading.
 *
 * @param {string} raw full file contents, frontmatter included
 * @returns {{ id: string, text: string }[]}
 */
export function extractHeadings(raw) {
	const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').replace(/```[\s\S]*?```/g, '');

	/** @type {{ id: string, text: string }[]} */
	const headings = [];
	const used = new Set();

	for (const match of body.matchAll(/^##[ \t]+(.+?)[ \t]*#*$/gm)) {
		const text = match[1]
			.replace(/<[^>]+>/g, '')
			.replace(/[*_`]/g, '')
			.trim();
		if (!text) continue;

		let id = slugifyHeading(text);
		if (!id) continue;
		if (used.has(id)) {
			let n = 2;
			while (used.has(`${id}-${n}`)) n++;
			id = `${id}-${n}`;
		}
		used.add(id);
		headings.push({ id, text });
	}

	return headings;
}
