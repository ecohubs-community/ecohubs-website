// `?enhanced` imports are typed by @sveltejs/enhanced-img, but only when the
// query ends in exactly `?enhanced`. An image shown at very different widths
// (a full-bleed hero) needs `?imgSizes=…&enhanced` instead: `sizes` on the
// tag never reaches the resizer when `src` is an imported variable, so
// without it the image ships at half and full size only, and the browser
// stretches the half-size one across a desktop screen.
declare module '*&enhanced' {
	import type { Picture } from '@sveltejs/enhanced-img';

	const value: Picture;
	export default value;
}
