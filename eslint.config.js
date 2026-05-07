import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',

			// We render trusted Markdown/HTML from our own data.ts files via {@html}
			// (FAQ answers, vision values, story beats). Source is fully controlled;
			// the rule is too coarse to express "trusted authored content".
			'svelte/no-at-html-tags': 'off',

			// SvelteKit's `resolve()` helper is useful for typed dynamic routes,
			// but we use plain literal href="/path" links throughout the marketing
			// site. The rule produces ~80 false positives for hand-authored anchors.
			'svelte/no-navigation-without-resolve': 'off',

			// Many lists in data.ts (and inline literal arrays for cards/CTAs) are
			// short, stable, and don't benefit from explicit keys. Downgrade to a
			// warning so genuinely large lists still get flagged but small inline
			// arrays don't fail CI.
			'svelte/require-each-key': 'warn',

			// `any` shows up in a handful of motion-library workarounds and
			// untyped third-party shims. Keep as a warning to track without
			// blocking; tighten incrementally.
			'@typescript-eslint/no-explicit-any': 'warn',

			// Prefix unused destructured vars / function args with `_` to silence.
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			],

			// SvelteSet/SvelteMap are only needed when the collection itself is
			// reactive (changes drive re-renders). The Sets in ConstellationMap
			// are local dedup helpers inside a pure compute function — plain Set
			// is correct there.
			'svelte/prefer-svelte-reactivity': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
