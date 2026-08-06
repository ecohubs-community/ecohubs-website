import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { slugifyHeading } from './src/lib/learning/headings.js';

/**
 * Components an author may use in Learning Hub markdown without importing
 * anything. `autoImportComponents` injects the import for whichever ones a
 * file actually uses, so content files stay pure content — no boilerplate
 * `<script>` block repeated across ~140 files.
 */
const AUTO_IMPORT = [
	'Quick',
	'Deep',
	'Gloss',
	'Callout',
	'Sources',
	'Compare',
	'CostEstimator',
	'Figure',
	'Video',
	'Quiz'
];

/**
 * Prepends a `<script>` importing the components a file references.
 *
 * Runs on the parsed tree, not the raw source: markdown embeds Svelte
 * components as `html` nodes, so we scan those for component names and unshift
 * one more `html` node carrying the import. A top-level `<script>` in mdsvex
 * output becomes the compiled component's instance script, which is where the
 * import belongs.
 *
 * Only components actually used are imported, so an unused one never reaches a
 * page's bundle.
 */
function autoImportComponents() {
	return (tree) => {
		const html = [];
		const walk = (node) => {
			if (node.type === 'html' && typeof node.value === 'string') html.push(node.value);
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);

		// An author who wrote their own <script> is importing things themselves;
		// a second instance script would be a compile error.
		if (html.some((value) => /<script[\s>]/.test(value))) return;

		const source = html.join('\n');
		const used = AUTO_IMPORT.filter((name) => new RegExp(`<${name}[\\s/>]`).test(source));
		if (used.length === 0) return;

		tree.children.unshift({
			type: 'html',
			value: `<script>\n\timport { ${used.join(', ')} } from '$lib/components/learning';\n</script>`
		});
	};
}

/**
 * Stamps an `id` onto every `<h2>` so the table of contents can link to it.
 *
 * Uses the same slug function the index uses to build that contents list, so
 * the two cannot disagree — see src/lib/learning/headings.js.
 */
function slugHeadings() {
	return (tree) => {
		const used = new Set();
		const walk = (node) => {
			if (node.tagName === 'h2') {
				const text = collectText(node).trim();
				if (text) {
					let id = slugifyHeading(text);
					if (used.has(id)) {
						let n = 2;
						while (used.has(`${id}-${n}`)) n++;
						id = `${id}-${n}`;
					}
					used.add(id);
					node.properties = { ...node.properties, id };
				}
			}
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);
	};
}

function collectText(node) {
	if (node.type === 'text') return node.value ?? '';
	return (node.children ?? []).map(collectText).join('');
}

const config = defineConfig({
	extensions: ['.svx', '.md'],
	remarkPlugins: [autoImportComponents],
	rehypePlugins: [slugHeadings]
});

export default config;
