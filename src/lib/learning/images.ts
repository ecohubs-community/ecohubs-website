/**
 * Resolving a content file's `image:` to a URL the browser can fetch.
 *
 * There are two places a cover can live and they behave differently:
 *
 *   `static/`            served verbatim at the path you wrote, no hashing
 *   `src/lib/assets/`    bundled by Vite, content-hashed, immutably cacheable
 *
 * Frontmatter is authored by people rather than by a bundler, so it says one
 * of these and this decides which:
 *
 *   image: /learning/foo.webp                     → static, used as written
 *   image: learning-paths/foo.webp                → bundled, resolved here
 *   image: $lib/assets/learning/learning-paths/foo.webp   → the same, spelled out
 *
 * A name that matches nothing throws at index time with the list of what does
 * exist, because the alternative is a broken image on a prerendered page that
 * nobody notices for a month.
 */

/**
 * What a bundled cover resolves to: the picture object `@sveltejs/enhanced-img`
 * builds — AVIF, WebP and JPEG at 1x and 2x, plus intrinsic dimensions.
 *
 * The alternative was a plain `?url`, which would have sent the full-size
 * original into a 112px-tall card slot. `Cover.svelte` renders this through
 * `<enhanced:img>`, which picks a format and a width per browser.
 */
export interface Picture {
	sources: Record<string, string>;
	img: { src: string; w: number; h: number };
}

/**
 * Every bundled cover, as `/src/lib/assets/learning/<name>` → picture.
 *
 * Eager because the index is built once at module load and a lazy import would
 * make every consumer async for no benefit. SVG is deliberately absent: it does
 * not need processing and enhanced-img does not handle it, so an SVG cover
 * belongs in `static/`.
 */
const BUNDLED = import.meta.glob('/src/lib/assets/learning/**/*.{webp,avif,png,jpg,jpeg}', {
	eager: true,
	query: '?enhanced',
	import: 'default'
}) as Record<string, Picture>;

const ROOT = '/src/lib/assets/learning/';

/** Already a URL the browser can use: absolute, external, or inlined. */
function isReady(image: string): boolean {
	return image.startsWith('/') || /^(https?:|data:)/.test(image);
}

/**
 * The pure half, so the lookup can be tested without a real asset directory.
 *
 * `where` is only ever used in the error message — it is the content file that
 * asked for the image, which is the thing you need to know to fix it.
 */
export function resolveCover<T>(
	image: string | undefined,
	bundled: Record<string, T>,
	where: string
): string | T | undefined {
	if (!image) return undefined;
	if (isReady(image)) return image;

	const name = image.replace(/^(\$lib\/assets\/learning\/|src\/lib\/assets\/learning\/)/, '');
	const url = bundled[ROOT + name];
	if (url) return url;

	const available = Object.keys(bundled)
		.map((key) => key.slice(ROOT.length))
		.sort();
	throw new Error(
		`${where}: image "${image}" is not in src/lib/assets/learning/. ` +
			`Available: ${available.join(', ') || '(none)'}. ` +
			`A cover in static/ must be written absolute, e.g. "/learning/foo.webp".`
	);
}

/**
 * Resolve against the real asset directory.
 *
 * Returns a `Picture` for a bundled cover and the string untouched for a
 * `static/` or external one, so both shapes reach `Cover.svelte`.
 */
export function coverUrl(image: string | undefined, where: string): string | Picture | undefined {
	return resolveCover(image, BUNDLED, where);
}
