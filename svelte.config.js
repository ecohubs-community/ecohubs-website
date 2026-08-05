import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	// `.md` is added alongside `.svx` so Learning Hub content in src/content can
	// be authored as plain markdown. mdsvex exposes each file's frontmatter as
	// `metadata`, which is what src/lib/learning/index.ts builds its index from.
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
	kit: {
		adapter: adapter({
			fallback: undefined,
			precompress: false,
			strict: true
		})
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
