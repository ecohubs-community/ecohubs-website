<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The dark "what it is / what it isn't" section — two columns of short
	 * claims, emerald ticks on the left, amber crosses on the right.
	 * Used on `/rcos` and `/csi` to draw the line before going further.
	 */
	interface Stance {
		title: string;
		body: string;
	}

	interface Props {
		kicker: string;
		/** Headline — a snippet so each page keeps its own `<em>` emphasis. */
		headline: Snippet;
		lead: string;
		/** Left column: the claims that hold. */
		isItems: Stance[];
		isLabel?: string;
		isNote: string;
		/** Right column: the readings we reject. */
		isNotItems: Stance[];
		isNotLabel?: string;
		isNotNote: string;
	}

	let {
		kicker,
		headline,
		lead,
		isItems,
		isLabel = 'It is',
		isNote,
		isNotItems,
		isNotLabel = 'It is not',
		isNotNote
	}: Props = $props();
</script>

<section class="relative py-24 md:py-32 bg-ecohubs-deep text-ecohubs-ivory overflow-hidden">
	<div
		class="absolute inset-0 -z-0 opacity-40"
		style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.12), transparent 55%);"
	></div>

	<div class="max-w-6xl mx-auto px-6 lg:px-8 relative">
		<div data-scroll-animate class="max-w-3xl mb-16">
			<div class="kicker text-emerald-300/80 mb-5">{kicker}</div>
			<h2 class="font-serif text-4xl md:text-6xl leading-[1.05] text-ecohubs-ivory">
				{@render headline()}
			</h2>
			<p class="mt-6 text-lg md:text-xl text-stone-200/80 leading-relaxed max-w-2xl">{lead}</p>
		</div>

		<div class="grid md:grid-cols-2 gap-10 md:gap-14">
			<div data-scroll-animate>
				<div class="flex items-center gap-3 mb-7">
					<span class="pill bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
						>{isLabel}</span
					>
					<span class="text-stone-300/70 text-sm">{isNote}</span>
				</div>
				<ul class="space-y-5">
					{#each isItems as item (item.title)}
						<li class="grid grid-cols-[28px_1fr] gap-3">
							<span class="font-story italic text-emerald-300 text-xl">✓</span>
							<div>
								<div class="font-serif text-lg text-white">{item.title}</div>
								<p class="text-sm text-stone-300/80 mt-1 leading-relaxed">{item.body}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<div data-scroll-animate>
				<div class="flex items-center gap-3 mb-7">
					<span class="pill bg-amber-300/10 text-amber-200 border border-amber-300/30"
						>{isNotLabel}</span
					>
					<span class="text-stone-300/70 text-sm">{isNotNote}</span>
				</div>
				<ul class="space-y-5">
					{#each isNotItems as item (item.title)}
						<li class="grid grid-cols-[28px_1fr] gap-3">
							<span class="font-story italic text-amber-300/80 text-xl">×</span>
							<div>
								<div class="font-serif text-lg text-white">{item.title}</div>
								<p class="text-sm text-stone-300/80 mt-1 leading-relaxed">{item.body}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	/* Small uppercase chip used by the two column headers. */
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.7rem;
		border-radius: 9999px;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 600;
	}
</style>
