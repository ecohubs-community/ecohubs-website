<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { generateBreadcrumbs } from '$lib/config/seo';
	import { formatDate } from '$lib/utils/blog';
	import {
		initScrollAnimations,
		initStaggeredScrollAnimations
	} from '$lib/utils/scroll-animations';
	import { prefersReducedMotion } from '$lib/utils/animations';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const posts = data.posts || [];
	const featured = posts[0];
	const rest = posts.slice(1);

	const breadcrumbs = generateBreadcrumbs('blog');

	onMount(() => {
		if (prefersReducedMotion()) {
			document
				.querySelectorAll<HTMLElement>('[data-scroll-animate], [data-scroll-stagger] > *')
				.forEach((el) => {
					el.style.opacity = '1';
					el.style.transform = 'none';
				});
			return;
		}
		initScrollAnimations('[data-scroll-animate]', { threshold: 0.15 });
		initStaggeredScrollAnimations('[data-scroll-stagger]', {
			threshold: 0.15,
			staggerDelay: 0.08
		});
	});
</script>

<SEO
	title="Field notes — EcoHubs blog"
	description="Letters, field notes, and quiet reflections from the people building the Blueprint for regenerative communities."
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
			<div class="kicker text-emerald-700">Field notes</div>
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<h1
			class="font-serif text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			Letters from the work<span class="font-story italic font-light text-stone-400">,</span><br />
			<em class="font-story italic font-normal text-stone-500">written as it happens.</em>
		</h1>
		<p class="mt-7 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			Reflections, lessons learned in the open, and quiet updates from inside the community — about
			regenerative practice, governance, the Blueprint, and the everyday work of building a
			different way to live.
		</p>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. POSTS
═══════════════════════════════════════════════════════════════════ -->
<section class="py-20 md:py-28 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		{#if posts.length === 0}
			<div data-scroll-animate="fade-up" class="text-center py-16 max-w-xl mx-auto">
				<div class="kicker text-emerald-700 mb-4">Quiet for now</div>
				<p class="font-story italic text-2xl text-ecohubs-deep leading-snug mb-3">
					No letters yet — but the work is underway.
				</p>
				<p class="text-stone-600">Check back soon. The first notes are being written.</p>
			</div>
		{:else}
			<!-- Featured post -->
			{#if featured}
				<article
					data-scroll-animate="fade-up"
					class="bg-white rounded-3xl overflow-hidden mb-16 border border-stone-200/70 soft-shadow grid grid-cols-1 lg:grid-cols-2"
				>
					{#if featured.image}
						<a href="/blog/{featured.slug}" class="block h-72 lg:h-full overflow-hidden">
							<img
								src={featured.image}
								srcset={featured.image.includes('unsplash.com')
									? `${featured.image}&w=400 400w, ${featured.image}&w=800 800w, ${featured.image}&w=1200 1200w`
									: featured.image}
								sizes="(max-width: 1024px) 100vw, 50vw"
								alt={featured.title}
								width="1200"
								height="800"
								class="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
								loading="eager"
							/>
						</a>
					{/if}
					<div class="p-8 lg:p-12 flex flex-col justify-center">
						<div class="kicker text-emerald-700 mb-4">Featured · most recent</div>
						{#if featured.tags && featured.tags.length > 0}
							<div class="flex flex-wrap gap-2 mb-4">
								{#each featured.tags.slice(0, 3) as tag}
									<a
										href="/blog/tag/{tag.slug}"
										class="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-medium hover:bg-emerald-100 transition-colors"
									>
										{tag.name}
									</a>
								{/each}
							</div>
						{/if}
						<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight mb-4">
							<a href="/blog/{featured.slug}" class="hover:text-ecohubs-primary transition-colors">
								{featured.title}
							</a>
						</h2>
						<p class="text-stone-700 text-[15px] leading-relaxed mb-6 line-clamp-4">
							{featured.excerpt}
						</p>
						<div
							class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs tracking-wide text-stone-500 mb-7 font-story italic"
						>
							<time datetime={featured.date}>{formatDate(featured.date)}</time>
							{#if featured.readingTime}
								<span class="text-stone-400">·</span>
								<span>{featured.readingTime} min read</span>
							{/if}
						</div>
						<a
							href="/blog/{featured.slug}"
							class="inline-flex items-center gap-2 self-start px-6 py-3 bg-ecohubs-dark text-white text-sm font-medium rounded-full hover:bg-ecohubs-deep transition-all group"
						>
							Read the full letter
							<span class="transition-transform group-hover:translate-x-0.5">→</span>
						</a>
					</div>
				</article>
			{/if}

			<!-- Other posts -->
			{#if rest.length > 0}
				<div data-scroll-animate="fade-up" class="max-w-2xl mb-10">
					<div class="kicker text-emerald-700 mb-3">More from the field</div>
					<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight">
						Earlier letters<span class="font-story italic font-light text-stone-400">,</span>
						<em class="font-story italic font-normal text-stone-500">still worth reading.</em>
					</h2>
				</div>

				<div
					data-scroll-stagger
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
				>
					{#each rest as post}
						<article
							class="bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:soft-shadow hover:-translate-y-1 transition-all duration-300 flex flex-col"
						>
							{#if post.image}
								<a href="/blog/{post.slug}" class="block h-48 overflow-hidden">
									<img
										src={post.image}
										srcset={post.image.includes('unsplash.com')
											? `${post.image}&w=300 300w, ${post.image}&w=600 600w, ${post.image}&w=900 900w`
											: post.image}
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										alt={post.title}
										width="900"
										height="600"
										class="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700"
										loading="lazy"
									/>
								</a>
							{/if}
							<div class="p-6 flex flex-col flex-1">
								{#if post.tags && post.tags.length > 0}
									<div class="flex flex-wrap gap-2 mb-3">
										{#each post.tags.slice(0, 2) as tag}
											<a
												href="/blog/tag/{tag.slug}"
												class="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-medium hover:bg-emerald-100 transition-colors"
											>
												{tag.name}
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
										{#if post.readingTime}
											<span class="text-stone-400 mx-1">·</span>
											<span>{post.readingTime} min</span>
										{/if}
									</span>
									<a
										href="/blog/{post.slug}"
										class="text-ecohubs-dark font-medium hover:text-ecohubs-deep transition-colors inline-flex items-center gap-1 group"
									>
										Read
										<span class="transition-transform group-hover:translate-x-0.5">→</span>
									</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	:global(main p),
	:global(main li),
	:global(main blockquote),
	:global(main span:not([class*='font-'])),
	:global(main div:not([class*='font-'])) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	:global(.font-story) {
		font-family: var(--font-story, 'Fraunces', serif);
		font-optical-sizing: auto;
	}

	:global(.kicker) {
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
	}

	:global(.soft-shadow) {
		box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
	}

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
	}
</style>
