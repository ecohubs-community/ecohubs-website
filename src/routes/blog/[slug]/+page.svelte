<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/blog';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = data.post;
	const formattedDate = formatDate(post.date);
</script>

<SEO
	title="{post.title} - EcoHubs Blog"
	description={post.excerpt}
	type="article"
/>

<article class="py-16">
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
					alt={post.title}
					class="w-full h-auto object-cover"
				/>
			</div>
		{/if}

		<!-- Post Content -->
		<div class="prose prose-lg prose-ecohubs max-w-none">
			<svelte:component this={post.content} />
		</div>

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
						class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
					>
						<Share2 class="w-4 h-4" aria-hidden="true" />
						<span class="text-sm">Twitter</span>
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
</style>

