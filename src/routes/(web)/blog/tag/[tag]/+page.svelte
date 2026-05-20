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

	const posts = data.posts;
	const tag = data.tag;

	const breadcrumbs = [
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: 'Blog', url: 'https://ecohubs.community/blog' },
		{ name: tag.name, url: `https://ecohubs.community/blog/tag/${tag.slug}` }
	];

	onMount(() => {
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="Posts tagged “{tag.name}” — EcoHubs blog"
	description="Letters from the work, filed under {tag.name}."
	ogImage="/og-blog.jpg"
	{breadcrumbs}
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
	<div
		class="absolute -z-10 bottom-0 -right-20 w-[360px] h-[360px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="flex items-start justify-between gap-4 flex-wrap mb-5">
			<div class="kicker text-emerald-700">Filed under</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl md:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			<em class="font-story italic font-normal text-ecohubs-primary">{tag.name}</em>
		</h1>
		<p class="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			{posts.length}
			{posts.length === 1 ? 'letter' : 'letters'} from the field, filed under
			<em class="font-story italic">{tag.name}</em>.
		</p>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. POSTS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-16 md:py-20">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div
			data-scroll-stagger
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
		>
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
								{#each post.tags.slice(0, 2) as t}
									<a
										href="/blog/tag/{t.slug}"
										class="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-medium hover:bg-emerald-100 transition-colors"
									>
										{t.name}
									</a>
								{/each}
							</div>
						{/if}
						<h3 class="font-serif text-xl text-ecohubs-deep leading-snug mb-3">
							<a href="/blog/{post.slug}" class="hover:text-ecohubs-primary transition-colors">
								{post.title}
							</a>
						</h3>
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
