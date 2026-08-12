<script lang="ts">
	/**
	 * What the RCOS Standard requires on the subject the surrounding section is
	 * describing.
	 *
	 * The hub is descriptive — it reports how communities actually work, hedges
	 * what it cannot verify, and takes no position on how a group ought to decide
	 * things. RCOS is normative: it says what MUST be written down. Mixing the two
	 * voices in running prose would quietly turn a survey into advocacy, so the
	 * normative claim gets its own box, its own label, and a citation to the
	 * clause it comes from.
	 *
	 * **Part of the deep layer.** These cards are extra context for a reader who
	 * has asked to go deeper, not a delivery mechanism for anything the article
	 * needs. So the test before writing one is: if the point matters at standard
	 * depth, it belongs in the body, in the hub's own voice, whether or not RCOS
	 * is mentioned — because then it is simply a better article. What is left for
	 * the card is the specification's own framing: which clause, how strictly,
	 * and where to read it.
	 *
	 * `href` is required and always points at a section anchor rather than the
	 * layer page, because "RCOS says so" is worth exactly as much as the
	 * paragraph a reader can go and check.
	 */
	import type { Snippet } from 'svelte';

	let {
		layer,
		section,
		href,
		children
	}: {
		/** Layer number, 0–6. Shown in the kicker. */
		layer: number;
		/** Section as it appears in the spec, e.g. "§3.6 Exit and Separation". */
		section: string;
		/** Deep link to that section's heading anchor on rcos.ecohubs.community. */
		href: string;
		children: Snippet;
	} = $props();
</script>

<!--
	The left rule is what distinguishes this from `Quick`, which sits on the same
	ivory. Both kickers render in the colour `layout.css` gives a `.prose p`
	regardless of the utility on them, so the border has to carry the difference.

	Hidden the same way `Deep` is: only from an explicitly stored shallower
	choice, never by default, so the card is in the server HTML for a crawler and
	`print:block!` keeps it in the guide PDF.
-->
<aside
	data-depth-layer="deep"
	class="my-8 rounded-2xl border border-l-4 border-emerald-200/70 border-l-ecohubs-primary
	       bg-ecohubs-ivory/70 p-6
	       [html[data-depth=quick]_&]:hidden [html[data-depth=standard]_&]:hidden
	       print:block!"
>
	<p class="kicker mb-3 text-ecohubs-dark">RCOS · Layer {layer}</p>
	<div class="text-[0.95rem] leading-relaxed text-stone-700">
		{@render children()}
	</div>
	<p class="mt-4 border-t border-emerald-200/60 pt-3 font-mono text-[11px] tracking-[0.06em]">
		<a
			{href}
			target="_blank"
			rel="noopener noreferrer"
			class="text-ecohubs-muted hover:text-ecohubs-dark"
		>
			RCOS Core v0.1 — {section}
		</a>
	</p>
</aside>
