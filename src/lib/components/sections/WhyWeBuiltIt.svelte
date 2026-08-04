<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The dark "why EcoHubs built it" section — an optional pull-quote from the
	 * source document (quoted rather than paraphrased), then three numbered
	 * reason cards that each link out.
	 * Used on `/csi` and `/votecast`.
	 */
	interface Reason {
		/** Rendered small above the kicker and again as the ghosted numeral. */
		number: string;
		kicker: string;
		title: string;
		body: string;
		cta: string;
		href: string;
		external?: boolean;
	}

	interface PullQuote {
		quote: string;
		/** Attribution line — rendered as the link text. */
		source: string;
		href: string;
	}

	interface Props {
		kicker: string;
		/** Headline — a snippet so each page keeps its own `<em>` emphasis. */
		headline: Snippet;
		lead: string;
		/** Optional quotation above the cards. Omit for a section that leads with the reasons. */
		quote?: PullQuote;
		/** Three cards, numbered. */
		reasons: Reason[];
	}

	let { kicker, headline, lead, quote, reasons }: Props = $props();
</script>

<section class="relative py-24 md:py-36 bg-ecohubs-deep text-ecohubs-ivory overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-50"
		style="background-image: radial-gradient(circle at 15% 20%, rgba(16,185,129,0.22), transparent 55%), radial-gradient(circle at 85% 75%, rgba(217,119,6,0.16), transparent 55%);"
	></div>
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>

	<div class="max-w-7xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-12">
			<div class="kicker text-emerald-300/80 mb-5 flex items-center gap-3">
				<span class="h-px w-8 bg-emerald-300/40"></span>
				{kicker}
			</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-ecohubs-ivory">
				{@render headline()}
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/85 leading-relaxed max-w-2xl">{lead}</p>
		</div>

		{#if quote}
			<figure
				data-scroll-animate
				class="mb-14 max-w-4xl border-l-2 border-emerald-400/40 pl-6 md:pl-8"
			>
				<blockquote class="font-story italic text-xl md:text-2xl leading-snug text-emerald-50">
					"{quote.quote}"
				</blockquote>
				<figcaption class="mt-4 text-sm text-stone-300/70">
					<a
						href={quote.href}
						target="_blank"
						rel="noopener noreferrer"
						class="no-external-decoration hover:text-emerald-300 transition-colors"
					>
						{quote.source} <span aria-hidden="true">↗</span>
					</a>
				</figcaption>
			</figure>
		{/if}

		<div data-scroll-stagger class="grid md:grid-cols-3 gap-5 lg:gap-6">
			{#each reasons as reason (reason.number)}
				<article
					class="group relative rounded-3xl border border-emerald-900/40 overflow-hidden bg-gradient-to-br from-[#0a3d2e]/70 to-[#0b2e24]/80 hover:border-emerald-400/40 transition-colors p-7 flex flex-col"
				>
					<div
						class="absolute top-0 right-0 font-story italic text-[80px] leading-none text-emerald-300/10 pr-5 pt-3 select-none"
					>
						{reason.number}
					</div>
					<div class="kicker text-emerald-300/80 mb-3 relative">{reason.kicker}</div>
					<h3 class="font-serif text-2xl text-ecohubs-ivory leading-snug mb-3 relative">
						{reason.title}
					</h3>
					<p class="text-[15px] text-stone-200/85 leading-relaxed mb-6 relative">{reason.body}</p>
					<a
						href={reason.href}
						target={reason.external ? '_blank' : undefined}
						rel={reason.external ? 'noopener noreferrer' : undefined}
						data-sveltekit-preload-data={reason.external ? undefined : 'hover'}
						class="no-external-decoration mt-auto text-sm font-medium text-emerald-300 hover:underline relative"
					>
						{reason.cta}
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>
