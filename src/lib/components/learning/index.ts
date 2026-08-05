/**
 * Components available inside Learning Hub markdown.
 *
 * The names exported here are what `autoImportComponents` in mdsvex.config.js
 * injects, so adding a component means exporting it here *and* listing it in
 * that plugin's AUTO_IMPORT array.
 */
export { default as Callout } from './Callout.svelte';
export { default as Compare } from './Compare.svelte';
export { default as Deep } from './Deep.svelte';
export { default as Figure } from './Figure.svelte';
export { default as DepthSwitch } from './DepthSwitch.svelte';
export { default as Gloss } from './Gloss.svelte';
export { default as Prose } from './Prose.svelte';
export { default as Quick } from './Quick.svelte';
export { default as Quiz } from './Quiz.svelte';
export { default as Sources } from './Sources.svelte';
export { default as Video } from './Video.svelte';

export type { CompareRow } from './Compare.svelte';
export type { Source } from './Sources.svelte';
