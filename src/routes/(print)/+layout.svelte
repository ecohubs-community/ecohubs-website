<script lang="ts">
	/**
	 * The print route group: what the PDF downloads are rendered from.
	 *
	 * No navbar, no footer, no cookie banner, no backdrop canvas. These pages
	 * exist to be printed — by `scripts/build-downloads.mjs` through headless
	 * Chrome, or by a reader pressing Cmd-P, which works just as well.
	 *
	 * The group's real trick is in `+layout.ts`: `csr = false`. Every component
	 * in the hub renders its complete, static form on the server and only
	 * *hides* things once JavaScript takes over — the rule that keeps the hub
	 * indexable. Turning hydration off therefore gives the print page every
	 * depth layer, every quiz question with its answers and explanations, and
	 * the estimator's reference table instead of its calculator. Nothing had to
	 * be written twice.
	 */
	import '../layout.css';
	import './print.css';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Never indexed: these duplicate the lessons, and a crawler finding them
	     would be reading the same words at a second address. -->
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{@render children()}
