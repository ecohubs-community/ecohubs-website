import { defineMDSveXConfig as defineConfig } from 'mdsvex';

/**
 * Components an author may use in Learning Hub markdown without importing
 * anything. `autoImportComponents` injects the import for whichever ones a
 * file actually uses, so content files stay pure content — no boilerplate
 * `<script>` block repeated across ~140 files.
 */
const AUTO_IMPORT = ['Quick', 'Deep', 'Gloss', 'Callout', 'Sources', 'Compare', 'Figure', 'Quiz'];

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

const config = defineConfig({
	extensions: ['.svx', '.md'],
	remarkPlugins: [autoImportComponents]
});

export default config;
