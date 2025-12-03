<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import { Calendar, Clock, User, ArrowLeft, Share2, ArrowRight } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/blog';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = data.post;
	const formattedDate = formatDate(post.date);
	const siteUrl = 'https://ecohubs.community';

	// Article JSON-LD schema
	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		image: post.image ? (post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`) : `${siteUrl}/og-blog.jpg`,
		datePublished: post.date,
		dateModified: post.date,
		author: {
			'@type': 'Person',
			name: post.author
		},
		publisher: {
			'@type': 'Organization',
			name: 'EcoHubs.community',
			logo: {
				'@type': 'ImageObject',
				url: `${siteUrl}/logo.png`
			}
		},
		...(post.tags && post.tags.length > 0 ? { articleSection: post.tags.join(', ') } : {})
	};
</script>

<SEO
	title="{post.title} - EcoHubs Blog"
	description={post.excerpt}
	type="article"
	ogImage={post.image || '/og-blog.jpg'}
	jsonLd={articleJsonLd}
/>

<article class="py-16 mt-10">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Back Button -->
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-ecohubs-primary hover:text-ecohubs-dark transition-colors mb-8"
		>
			<ArrowLeft class="w-4 h-4" aria-hidden="true" />
			<span>Back to Blog</span>
		</a>

		<!-- Post Header -->
		<header class="mb-12">
			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-4">
					{#each post.tags as tag}
						<span class="px-3 py-1 bg-ecohubs-primary/10 text-ecohubs-dark rounded-full text-sm font-medium">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<h1 class="font-serif text-4xl md:text-5xl font-bold text-ecohubs-dark mb-6 leading-tight">
				{post.title}
			</h1>

			<div class="flex flex-wrap items-center gap-6 text-gray-600">
				<div class="flex items-center gap-2">
					<User class="w-4 h-4" aria-hidden="true" />
					<span>{post.author}</span>
				</div>
				<div class="flex items-center gap-2">
					<Calendar class="w-4 h-4" aria-hidden="true" />
					<time datetime={post.date}>{formattedDate}</time>
				</div>
				{#if post.readingTime}
					<div class="flex items-center gap-2">
						<Clock class="w-4 h-4" aria-hidden="true" />
						<span>{post.readingTime} min read</span>
					</div>
				{/if}
			</div>
		</header>

		<!-- Featured Image -->
		{#if post.image}
			<div class="mb-12 rounded-2xl overflow-hidden">
				<img
					src={post.image}
					srcset={post.image.includes('unsplash.com') 
						? `${post.image}&w=400 400w, ${post.image}&w=800 800w, ${post.image}&w=1200 1200w`
						: post.image}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
					alt={post.title}
					width="1200"
					height="630"
					class="w-full h-auto object-cover"
					loading="eager"
				/>
			</div>
		{/if}

		<!-- Post Content -->
		<div class="prose prose-lg prose-ecohubs max-w-none">
			{@html post.html}
		</div>

		<!-- Related Articles -->
		{#if data.relatedPosts && data.relatedPosts.length > 0}
			<section class="mt-16 pt-8 border-t border-gray-200">
				<h2 class="font-serif text-2xl font-bold text-ecohubs-dark mb-6">Related Articles</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each data.relatedPosts as relatedPost}
						<article class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
							{#if relatedPost.image}
								<div class="h-48 overflow-hidden">
									<img
										src={relatedPost.image}
										alt={relatedPost.title}
										width="900"
										height="600"
										class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
										loading="lazy"
									/>
								</div>
							{/if}
							<div class="p-6">
								<h3 class="font-serif text-xl font-bold text-gray-900 mb-3 hover:text-ecohubs-primary transition-colors">
									<a href="/blog/{relatedPost.slug}">
										{relatedPost.title}
									</a>
								</h3>
								<p class="text-gray-600 text-sm mb-4 line-clamp-3">
									{relatedPost.excerpt}
								</p>
								<a
									href="/blog/{relatedPost.slug}"
									class="inline-flex items-center gap-2 text-ecohubs-primary text-sm font-medium hover:text-ecohubs-dark transition-colors"
								>
									Read More
									<ArrowRight class="w-4 h-4" aria-hidden="true" />
								</a>
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Post Footer -->
		<footer class="mt-16 pt-8 border-t border-gray-200">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-gray-600">Share this post</p>
				</div>
				<div class="flex gap-4">
					<a
						href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.title)}&url={encodeURIComponent(`https://ecohubs.community/blog/${post.slug}`)}"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
					>
						<Share2 class="w-4 h-4" aria-hidden="true" />
						<span class="text-sm">Twitter / X</span>
					</a>
				</div>
			</div>
		</footer>
	</div>
</article>

<style>
	:global(.prose-ecohubs) {
		color: #1f2937;
	}

	:global(.prose-ecohubs h2) {
		font-family: var(--font-serif);
		color: #064e3b;
		font-weight: 700;
		margin-top: 2em;
		margin-bottom: 1em;
	}

	:global(.prose-ecohubs h3) {
		color: #059669;
		font-weight: 600;
		margin-top: 1.6em;
		margin-bottom: 0.8em;
	}

	:global(.prose-ecohubs a) {
		color: #059669;
		text-decoration: underline;
		text-decoration-color: rgba(5, 150, 105, 0.3);
		transition: all 0.2s;
	}

	:global(.prose-ecohubs a:hover) {
		color: #064e3b;
		text-decoration-color: #064e3b;
	}

	:global(.prose-ecohubs blockquote) {
		border-left: 4px solid #059669;
		padding-left: 1.5em;
		font-style: italic;
		color: #4b5563;
	}

	:global(.prose-ecohubs code) {
		background-color: #f3f4f6;
		padding: 0.2em 0.4em;
		border-radius: 0.25em;
		font-size: 0.9em;
	}

	:global(.prose-ecohubs pre) {
		background-color: #1f2937;
		color: #e5e7eb;
		padding: 1.5em;
		border-radius: 0.5em;
		overflow-x: auto;
	}

	:global(.prose-ecohubs img) {
		border-radius: 0.5em;
		margin: 2em 0;
	}

	:global(.prose-ecohubs h1) {
		font-family: var(--font-serif);
		color: #064e3b;
		font-weight: 700;
		margin-top: 1.5em;
		margin-bottom: 0.75em;
		font-size: 2.25em;
	}

	:global(.prose-ecohubs h4) {
		color: #059669;
		font-weight: 600;
		margin-top: 1.4em;
		margin-bottom: 0.7em;
	}

	:global(.prose-ecohubs h5) {
		color: #059669;
		font-weight: 600;
		margin-top: 1.2em;
		margin-bottom: 0.6em;
	}

	:global(.prose-ecohubs h6) {
		color: #059669;
		font-weight: 600;
		margin-top: 1em;
		margin-bottom: 0.5em;
	}

	:global(.prose-ecohubs p) {
		margin-top: 1em;
		margin-bottom: 1em;
		line-height: 1.75;
	}

	:global(.prose-ecohubs ul),
	:global(.prose-ecohubs ol) {
		margin-top: 1em;
		margin-bottom: 1em;
		padding-left: 1.5em;
	}

	:global(.prose-ecohubs li) {
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}

	:global(.prose-ecohubs strong) {
		font-weight: 600;
		color: #064e3b;
	}

	:global(.prose-ecohubs em) {
		font-style: italic;
	}

	:global(.prose-ecohubs hr) {
		border: none;
		border-top: 2px solid #e5e7eb;
		margin: 2em 0;
	}

	:global(.prose-ecohubs table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5em 0;
	}

	:global(.prose-ecohubs th),
	:global(.prose-ecohubs td) {
		border: 1px solid #e5e7eb;
		padding: 0.75em;
		text-align: left;
	}

	:global(.prose-ecohubs th) {
		background-color: #f3f4f6;
		font-weight: 600;
		color: #064e3b;
	}
</style>

