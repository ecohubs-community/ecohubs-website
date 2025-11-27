<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import { Calendar, Clock, ArrowRight } from 'lucide-svelte';
	import { formatDate } from '$lib/utils/blog';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const posts = data.posts || [];
</script>

<SEO
	title="Blog - EcoHubs.community"
	description="Read our latest articles about intentional communities, regenerative practices, and building the blueprint for sustainable living."
/>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-6xl">
		<div class="text-center mb-16">
			<h1 class="font-serif text-4xl font-bold text-ecohubs-dark sm:text-5xl mb-4">
				EcoHubs Blog
			</h1>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Insights, updates, and reflections on regenerative community building, DAO governance, and the future of intentional living.
			</p>
		</div>

		{#if posts.length === 0}
			<div class="text-center py-16">
				<p class="text-gray-500 text-lg">
					No posts yet. Check back soon for updates!
				</p>
			</div>
		{:else}
			<!-- Featured Post (First Post) -->
			{#if posts[0]}
				{@const featuredPost = posts[0]}
				<article class="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-200 hover:shadow-xl transition-shadow">
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
						{#if featuredPost.image}
							<div class="h-64 lg:h-full overflow-hidden">
								<img
									src={featuredPost.image}
									alt={featuredPost.title}
									class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
								/>
							</div>
						{/if}
						<div class="p-8 lg:p-12 flex flex-col justify-center">
							{#if featuredPost.tags && featuredPost.tags.length > 0}
								<div class="flex flex-wrap gap-2 mb-4">
									{#each featuredPost.tags.slice(0, 2) as tag}
										<span class="px-3 py-1 bg-ecohubs-primary/10 text-ecohubs-dark rounded-full text-xs font-medium">
											{tag}
										</span>
									{/each}
								</div>
							{/if}
							<h2 class="font-serif text-3xl font-bold text-gray-900 mb-4 hover:text-ecohubs-primary transition-colors">
								<a href="/blog/{featuredPost.slug}">
									{featuredPost.title}
								</a>
							</h2>
							<p class="text-gray-600 mb-6 line-clamp-3">
								{featuredPost.excerpt}
							</p>
							<div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
								<span class="flex items-center gap-1">
									<Calendar class="w-4 h-4" aria-hidden="true" />
									{formatDate(featuredPost.date)}
								</span>
								{#if featuredPost.readingTime}
									<span class="flex items-center gap-1">
										<Clock class="w-4 h-4" aria-hidden="true" />
										{featuredPost.readingTime} min
									</span>
								{/if}
							</div>
							<a
								href="/blog/{featuredPost.slug}"
								class="inline-flex items-center gap-2 text-ecohubs-primary font-medium hover:text-ecohubs-dark transition-colors"
							>
								Read Full Article
								<ArrowRight class="w-4 h-4" aria-hidden="true" />
							</a>
						</div>
					</div>
				</article>
			{/if}

			<!-- Other Posts Grid -->
			{#if posts.length > 1}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each posts.slice(1) as post}
						<article class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
							{#if post.image}
								<div class="h-48 overflow-hidden">
									<img
										src={post.image}
										alt={post.title}
										class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
									/>
								</div>
							{/if}
							<div class="p-6">
								{#if post.tags && post.tags.length > 0}
									<div class="flex flex-wrap gap-2 mb-3">
										{#each post.tags.slice(0, 2) as tag}
											<span class="px-2 py-1 bg-ecohubs-primary/10 text-ecohubs-dark rounded-full text-xs font-medium">
												{tag}
											</span>
										{/each}
									</div>
								{/if}
								<h3 class="font-serif text-xl font-bold text-gray-900 mb-3 hover:text-ecohubs-primary transition-colors">
									<a href="/blog/{post.slug}">
										{post.title}
									</a>
								</h3>
								<p class="text-gray-600 text-sm mb-4 line-clamp-3">
									{post.excerpt}
								</p>
								<div class="flex items-center gap-3 text-xs text-gray-500 mb-4">
									<span class="flex items-center gap-1">
										<Calendar class="w-3 h-3" aria-hidden="true" />
										{formatDate(post.date)}
									</span>
									{#if post.readingTime}
										<span class="flex items-center gap-1">
											<Clock class="w-3 h-3" aria-hidden="true" />
											{post.readingTime} min
										</span>
									{/if}
								</div>
								<a
									href="/blog/{post.slug}"
									class="inline-flex items-center gap-2 text-ecohubs-primary text-sm font-medium hover:text-ecohubs-dark transition-colors"
								>
									Read More
									<ArrowRight class="w-4 h-4" aria-hidden="true" />
								</a>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</Section>

