<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { initStaggeredScrollAnimations } from '$lib/utils/scroll-animations';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const authors = $derived(data.authors);
	const siteUrl = 'https://ecohubs.community';

	const breadcrumbs = [
		{ name: 'Home', url: `${siteUrl}/` },
		{ name: 'Blog', url: `${siteUrl}/blog` },
		{ name: 'Authors', url: `${siteUrl}/blog/authors` }
	];

	const listJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Authors — EcoHubs blog',
		url: `${siteUrl}/blog/authors`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: authors.map((a, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: a.name,
				url: `${siteUrl}/blog/authors/${a.slug}`
			}))
		}
	});

	onMount(() => {
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="Authors — EcoHubs blog"
	description="The people writing the EcoHubs field notes on regenerative communities, governance and community resilience."
	ogImage="/og-blog.jpg"
	{breadcrumbs}
	jsonLd={listJsonLd}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="flex items-start justify-between gap-4 flex-wrap mb-5">
			<div class="kicker text-emerald-700">The people writing</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl md:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			Authors
		</h1>
		<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			Field notes are written by the people doing the work, under their own names.
		</p>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. AUTHORS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-14 md:py-20">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div data-scroll-stagger class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{#each authors as author (author.slug)}
				<a
					href="/blog/authors/{author.slug}"
					class="group flex items-center gap-5 bg-white rounded-2xl border border-stone-200/70 p-6 hover:soft-shadow hover:-translate-y-1 transition-all duration-300"
				>
					{#if author.image}
						<img
							src={author.image}
							alt={author.name}
							width="72"
							height="72"
							class="w-18 h-18 rounded-full object-cover border border-stone-200 shrink-0"
							loading="lazy"
							decoding="async"
						/>
					{:else}
						<div
							class="w-18 h-18 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center font-serif text-2xl text-ecohubs-dark shrink-0"
							aria-hidden="true"
						>
							{author.name.charAt(0)}
						</div>
					{/if}
					<div class="min-w-0">
						<h2
							class="font-serif text-xl text-ecohubs-deep group-hover:text-ecohubs-primary transition-colors"
						>
							{author.name}
						</h2>
						<p class="mt-1 text-xs text-stone-500">
							{author.postCount}
							{author.postCount === 1 ? 'letter' : 'letters'}
						</p>
						{#if author.bio}
							<p class="mt-2 text-sm text-stone-700 leading-relaxed line-clamp-2">
								{author.bio}
							</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-14 text-center">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-sm text-ecohubs-dark hover:text-ecohubs-deep transition-colors group"
			>
				<span class="transition-transform group-hover:-translate-x-0.5">←</span>
				<span class="font-story italic">All letters</span>
			</a>
		</div>
	</div>
</section>
