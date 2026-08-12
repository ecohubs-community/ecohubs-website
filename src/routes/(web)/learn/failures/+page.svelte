<script lang="ts">
	/**
	 * The failure-mode catalogue.
	 *
	 * Grouped by the lesson that introduces each one rather than listed flat,
	 * because these patterns arrive together: a founder's informal veto travels
	 * with hidden cliques and with dominant speakers, and a reader who
	 * recognises one is usually living with two more.
	 *
	 * Every card leads with its signs. The reader this page is for is not
	 * browsing — they are checking whether the thing happening to them has a
	 * name.
	 */
	import Icon from '$lib/components/Icon.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { LearnRail } from '$lib/components/learning';
	import { LEARN_SHELL } from '$lib/components/learning/shell';
	import { learningBreadcrumbs } from '$lib/learning/schema';
	import { RCOS_STRESS_TESTS } from '$lib/learning/rcos';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = learningBreadcrumbs([{ name: 'Failure Modes', path: '/learn/failures' }]);

	const anchor = (slug: string) => `l-${slug}`;
</script>

<SEO
	title="Failure modes — the documented ways communities break"
	description="A catalogue of the patterns that end community projects: what each one looks like from inside, why it is hard to see, and the structure that prevents it."
	ogImage="/og-default.jpg"
	{breadcrumbs}
	noindex={!data.indexable}
/>

<div class="bg-ecohubs-base">
	<div class={LEARN_SHELL}>
		<div class="min-w-0 lg:order-2">
			<div class="max-w-[820px]">
				<div class="mb-5 flex flex-wrap items-start justify-between gap-4">
					<div class="kicker text-emerald-700">Failure Modes</div>
					<Breadcrumbs items={breadcrumbs} />
				</div>

				<h1
					class="font-serif text-4xl leading-[1.1] tracking-tight text-ecohubs-deep md:text-5xl lg:text-[52px]"
				>
					The documented ways communities break
				</h1>

				<p class="mt-6 max-w-[65ch] text-xl leading-relaxed font-light text-stone-700">
					Not a list of things that sound plausible. Each of these is a pattern somebody has written
					down, with the conditions that produce it and the structure that prevents it. Each page
					starts with what it looks like from inside, because that is the part you can check.
				</p>

				<p class="mt-5 max-w-[65ch] text-[0.95rem] leading-relaxed text-stone-600">
					They are grouped by the lesson that introduces them, and they are grouped that way for a
					reason: these failures are co-morbid. If one is familiar, read its neighbours before
					deciding you have found the whole problem.
				</p>
			</div>

			<div class="hairline my-10"></div>

			{#each data.groups as group (group.slug)}
				<section id={anchor(group.slug)} class="mb-14 scroll-mt-28">
					<h2 class="font-serif text-2xl text-ecohubs-deep md:text-3xl">
						{#if group.published && group.guide}
							<a
								href="/learn/guides/{group.guide}/{group.slug}"
								class="transition-colors hover:text-ecohubs-primary"
							>
								{group.title}
							</a>
						{:else}
							{group.title}
						{/if}
					</h2>

					<ul class="mt-6 grid gap-5 sm:grid-cols-2">
						{#each group.items as mode (mode.slug)}
							<li
								class="flex flex-col rounded-2xl border border-stone-200/70 bg-white p-6
								       transition-colors hover:border-emerald-200"
							>
								<h3 class="font-serif text-xl text-ecohubs-deep">
									<a
										href="/learn/failures/{mode.slug}"
										class="transition-colors hover:text-ecohubs-primary"
									>
										{mode.title}
									</a>
								</h3>

								<p class="mt-2 text-sm leading-relaxed text-stone-700">{mode.summary}</p>

								<ul class="mt-4 space-y-1.5 text-[13px] leading-relaxed text-stone-600">
									{#each mode.signs.slice(0, 3) as sign (sign)}
										<li class="flex gap-2.5">
											<span
												class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-400"
												aria-hidden="true"
											></span>
											<span>{sign}</span>
										</li>
									{/each}
								</ul>

								<div
									class="mt-5 flex items-center gap-4 font-mono text-[10.5px] tracking-[0.06em] text-[#8a8a80]"
								>
									<span>Layer {mode.layer}</span>
									<span aria-hidden="true">·</span>
									<span>{mode.minutes} min</span>
								</div>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<!-- The catalogue is not finished, and this page should not read as
			     though it were. The twenty-fifth mode here is one the standard does
			     not yet carry, which makes the invitation a description of
			     something that has already happened rather than a form nobody
			     fills in. -->
			<aside class="max-w-[820px] rounded-2xl border border-emerald-200/70 bg-ecohubs-ivory/70 p-7">
				<h2 class="font-serif text-xl text-ecohubs-deep md:text-2xl">
					Lived through one that is not here?
				</h2>
				<p class="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-stone-700">
					This catalogue grows by absorbing real experience — one of the patterns above is here
					because it was missing from the standard, not because the standard listed it. If your
					community has been through a structural failure nobody has written down, the useful
					version is the specific one: what happened, which parts of the structure were involved,
					and how it was or was not resolved.
				</p>
				<a
					href="{RCOS_STRESS_TESTS}#contributing-a-stress-test"
					class="mt-5 inline-flex items-center gap-2 text-[0.95rem] text-ecohubs-primary
					       underline decoration-emerald-300 underline-offset-4 transition-colors
					       hover:text-ecohubs-deep"
					rel="noopener"
				>
					How to contribute a stress test
					<Icon icon="tabler:external-link" class="h-4 w-4" />
				</a>
				<p class="mt-3 font-mono text-[10.5px] tracking-[0.06em] text-[#8a8a80]">
					On the RCOS standard, which maintains the catalogue
				</p>
			</aside>
		</div>

		<LearnRail
			withinTitle="Lessons"
			within={data.groups.map((g) => ({ href: `#${anchor(g.slug)}`, label: g.title }))}
			backLink={{ href: '/learn', label: 'Learning Hub' }}
		/>
	</div>
</div>
