<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { formatDate } from '$lib/utils/blog';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const author = $derived(data.author);
	const posts = $derived(data.posts);

	const siteUrl = 'https://ecohubs.community';
	const authorUrl = $derived(`${siteUrl}/blog/authors/${author.slug}`);

	const breadcrumbs = $derived([
		{ name: 'Home', url: `${siteUrl}/` },
		{ name: 'Blog', url: `${siteUrl}/blog` },
		{ name: 'Authors', url: `${siteUrl}/blog/authors` },
		{ name: author.name, url: authorUrl }
	]);

	// The Person node every post's Article schema points at via `author.url`.
	// Without this the author named on each article resolves to nothing.
	const personJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': authorUrl,
		name: author.name,
		url: authorUrl,
		...(author.bio && { description: author.bio }),
		...(author.image && { image: author.image }),
		...(author.sameAs.length && { sameAs: author.sameAs }),
		worksFor: {
			'@type': 'Organization',
			name: 'EcoHubs.community',
			url: siteUrl
		}
	});

	const description = $derived(
		author.bio
			? author.bio.slice(0, 155)
			: `${author.name} writes for the EcoHubs blog on regenerative communities, governance and community resilience.`
	);

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="{author.name} — EcoHubs blog"
	{description}
	ogImage="/og-blog.jpg"
	{breadcrumbs}
	jsonLd={personJsonLd}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="flex items-start justify-between gap-4 flex-wrap mb-5">
			<div class="kicker text-emerald-700">Written by</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>

		<div class="flex flex-col sm:flex-row sm:items-center gap-6">
			{#if author.image}
				<img
					src={author.image}
					alt={author.name}
					width="112"
					height="112"
					class="w-28 h-28 rounded-full object-cover border border-stone-200 shrink-0"
					decoding="async"
				/>
			{/if}
			<div>
				<h1
					class="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-ecohubs-deep"
				>
					{author.name}
				</h1>
				<p class="mt-3 text-sm text-stone-600">
					{posts.length}
					{posts.length === 1 ? 'letter' : 'letters'} from the field{#if author.location}
						· {author.location}{/if}
				</p>
			</div>
		</div>

		{#if author.bio}
			<p class="mt-7 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
				{author.bio}
			</p>
		{/if}

		{#if author.sameAs.length}
			<div class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
				{#each author.sameAs as href (href)}
					<a
						{href}
						target="_blank"
						rel="noopener noreferrer me"
						class="text-ecohubs-dark hover:text-ecohubs-deep transition-colors"
					>
						{href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. POSTS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-16 md:py-20">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div data-scroll-stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
			{#each posts as post (post.slug)}
				<article
					class="bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col"
				>
					{#if post.image}
						<a href="/blog/{post.slug}" class="block h-48 overflow-hidden">
							<img
								src={post.image}
								alt={post.title}
								width="900"
								height="600"
								class="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700"
								loading="lazy"
								decoding="async"
							/>
						</a>
					{/if}
					<div class="p-6 flex flex-col flex-1">
						{#if post.tags && post.tags.length > 0}
							<div class="flex flex-wrap gap-2 mb-3">
								{#each post.tags.slice(0, 2) as t (t.slug)}
									<a
										href="/blog/tag/{t.slug}"
										class="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-medium hover:bg-emerald-100 transition-colors"
									>
										{t.name}
									</a>
								{/each}
							</div>
						{/if}
						<h2 class="font-serif text-xl text-ecohubs-deep leading-snug mb-3">
							<a href="/blog/{post.slug}" class="hover:text-ecohubs-primary transition-colors">
								{post.title}
							</a>
						</h2>
						<p class="text-stone-700 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
							{post.excerpt}
						</p>
						<div
							class="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500"
						>
							<span class="font-story italic">
								<time datetime={post.date}>{formatDate(post.date)}</time>
							</span>
							{#if post.readingTime}
								<span class="font-story italic">{post.readingTime} min read</span>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-16 text-center">
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
