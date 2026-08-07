<script lang="ts">
	/**
	 * How the Learning Hub is written — provenance, plainly.
	 *
	 * A hand-written route rather than content: it describes the content system
	 * from outside, so it does not belong inside it as a topic or a lesson.
	 *
	 * Linked from every guide's FAQ and from the line under every `<Sources>`
	 * block, which is why the anchors here are stable.
	 */
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { CARD } from '$lib/components/learning/card';
	import { learningBreadcrumbs } from '$lib/learning/schema';

	const breadcrumbs = learningBreadcrumbs([
		{ name: 'How this is written', path: '/learn/how-this-is-written' }
	]);

	const SECTIONS = [
		{ id: 'first-hand', label: 'What we know first-hand' },
		{ id: 'communities', label: 'What we learn from others' },
		{ id: 'ai', label: 'How AI is used' },
		{ id: 'wrong', label: 'When we get it wrong' }
	];

	const TREE = 'ml-3 flex flex-col gap-px border-l border-[#ece9e2]';
	const TREE_LINK =
		'-ml-px block border-l border-transparent py-1.5 pr-2.5 pl-3.5 text-[13px] ' +
		'leading-[1.35] text-stone-600 transition-colors hover:text-ecohubs-dark';
	const TREE_LABEL =
		'mb-2.5 px-2.5 font-mono text-[10.5px] tracking-[0.18em] text-[#8a8a80] uppercase';
</script>

<SEO
	title="How this is written — sources, experience and AI"
	description="Where the Learning Hub's information comes from: what we know first-hand, what we learn from other communities and gatherings, and exactly how AI is used in drafting and editing."
	ogImage="/og-default.jpg"
	{breadcrumbs}
/>

<div class="bg-ecohubs-base">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2 lg:max-w-[820px]">
			<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div class="kicker text-emerald-700">About the hub</div>
				<Breadcrumbs items={breadcrumbs} />
			</div>

			<h1
				class="font-serif text-[40px] leading-[1.08] tracking-tight text-ecohubs-deep md:text-[46px]"
			>
				How this is written
			</h1>
			<p class="mt-5 text-xl leading-relaxed font-light text-stone-700">
				If you are reading this to decide where to live, you are entitled to know where the
				information came from. Three sources, and one of them is a machine.
			</p>

			<div class="hairline my-10"></div>

			<div class="prose-learning flex flex-col gap-10">
				<!-- ═══════════════════════════════════════════════════ -->
				<section id="first-hand" class="scroll-mt-28">
					<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">
						What we know first-hand
					</h2>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						EcoHubs is building a community, and its members visit others. Some of what is here
						comes from that directly: what a founding group actually argues about, what a membership
						process feels like from the inside, which agreements turn out to matter and which are
						never read again.
					</p>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						Where a claim rests on our own experience rather than a published source, the page says
						so. That is a different kind of evidence from a citation — not weaker, but different —
						and you should know which one you are reading.
					</p>
				</section>

				<!-- ═══════════════════════════════════════════════════ -->
				<section id="communities" class="scroll-mt-28">
					<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">
						What we learn from other communities and gatherings
					</h2>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						We are in contact with communities across Europe and beyond, and we attend gatherings —
						online and in person — where the people who run these places talk candidly about what is
						not working. A good deal of the most useful material here comes from those conversations
						rather than from any book: the failure patterns, the questions worth asking on a visit,
						the things nobody writes down because they are embarrassing.
					</p>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">Two rules go with that.</p>
					<ul class="mt-4 flex flex-col gap-3">
						<li class="flex gap-3 text-[17px] leading-[1.72] text-stone-700">
							<span class="mt-3 size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
							<span
								><strong class="text-ecohubs-deep">Nothing said in confidence is published.</strong>
								People speak freely at these gatherings precisely because it is not being written down
								for the internet.</span
							>
						</li>
						<li class="flex gap-3 text-[17px] leading-[1.72] text-stone-700">
							<span class="mt-3 size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
							<span
								><strong class="text-ecohubs-deep"
									>Nothing critical about a named community is published without that community
									seeing it first.</strong
								> If we cannot show them, we do not name them.</span
							>
						</li>
					</ul>
				</section>

				<!-- ═══════════════════════════════════════════════════ -->
				<section id="ai" class="scroll-mt-28">
					<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">How AI is used</h2>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						Plainly, because you are increasingly right to ask, and because the honest version is
						not embarrassing.
					</p>

					<div class="mt-6 grid gap-3 sm:grid-cols-2">
						<div class="{CARD} bg-white p-6 hover:border-stone-200/90 hover:shadow-none">
							<div class="kicker mb-2 text-emerald-700">It does</div>
							<p class="text-[15px] leading-relaxed text-stone-700">
								Help draft, structure and edit — turning notes, conversations and sources into
								readable prose, and keeping eleven lessons consistent with one another.
							</p>
						</div>
						<div class="{CARD} bg-white p-6 hover:border-stone-200/90 hover:shadow-none">
							<div class="kicker mb-2 text-emerald-700">It does not</div>
							<p class="text-[15px] leading-relaxed text-stone-700">
								Decide what goes in, or invent experience. Anything describing what we or the
								communities we know have actually lived comes from people.
							</p>
						</div>
					</div>

					<ul class="mt-6 flex flex-col gap-3">
						<li class="flex gap-3 text-[17px] leading-[1.72] text-stone-700">
							<span class="mt-3 size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
							<span
								><strong class="text-ecohubs-deep"
									>A person reviews every page before it is published.</strong
								> Nothing here has gone up unread.</span
							>
						</li>
						<li class="flex gap-3 text-[17px] leading-[1.72] text-stone-700">
							<span class="mt-3 size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
							<span
								><strong class="text-ecohubs-deep"
									>Facts are checked against sources, not against the model.</strong
								> Every claim about a named community, a date, a figure or a study is traced to a citation
								you can follow.</span
							>
						</li>
						<li class="flex gap-3 text-[17px] leading-[1.72] text-stone-700">
							<span class="mt-3 size-1.5 shrink-0 rounded-full bg-ecohubs-primary"></span>
							<span
								><strong class="text-ecohubs-deep"
									>Where we could not verify something, we say so.</strong
								> The frequently-quoted claim that ninety per cent of intentional communities fail has
								no sound source we can find, and our pages say that rather than repeating it. The Findhorn
								footprint study is real, twenty years old, and carries a caveat everywhere we cite it.</span
							>
						</li>
					</ul>

					<div class="{CARD} mt-6 bg-ecohubs-ivory p-7 hover:border-stone-200/90 hover:shadow-none">
						<div class="kicker mb-3 text-emerald-800">The line under every page</div>
						<p class="text-[15.5px] leading-relaxed text-stone-700">
							Written by EcoHubs members, with AI assistance for drafting and editing, and reviewed
							by a person before publication. Facts are checked against the sources listed; anything
							we could not verify is marked.
						</p>
					</div>
				</section>

				<!-- ═══════════════════════════════════════════════════ -->
				<section id="wrong" class="scroll-mt-28">
					<h2 class="font-serif text-[29px] leading-tight text-ecohubs-deep">
						When we get it wrong
					</h2>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						We will. This is a field with very little reliable data, a lot of confident folklore,
						and communities that change faster than anything written about them.
					</p>
					<p class="mt-4 text-[17px] leading-[1.72] text-stone-700">
						If something here does not match what you have lived, that is the most valuable thing
						you could tell us — more valuable than a donation, and we would rather have it.
						Corrections are made in the open, and the page's updated date changes when they are.
					</p>
					<div class="mt-6 flex flex-wrap gap-3">
						<a
							href="/contact"
							class="inline-flex items-center gap-2 rounded-full bg-ecohubs-dark px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ecohubs-deep"
						>
							Tell us what is wrong <span aria-hidden="true">→</span>
						</a>
						<a
							href="/learn"
							class="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-[15px] text-stone-800 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-dark"
						>
							Back to the hub
						</a>
					</div>
				</section>
			</div>
		</div>

		<LearnRail footer={railLists} />
	</div>
</div>

{#snippet railLists()}
	<p class={TREE_LABEL}>On this page</p>
	<ul class={TREE}>
		{#each SECTIONS as section (section.id)}
			<li><a href="#{section.id}" class={TREE_LINK}>{section.label}</a></li>
		{/each}
	</ul>
{/snippet}
