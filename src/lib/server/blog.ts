import type { Component } from 'svelte';

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image?: string;
	tags?: string[];
	readingTime?: number;
}

export interface BlogPostWithContent extends BlogPost {
	content: Component;
}

// Function to import all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('../../content/blog/*.svx');

	const posts: BlogPost[] = [];
	
	for (const path in modules) {
		const module = await modules[path]() as { metadata?: BlogPost; default: Component };
		const slug = path.split('/').pop()?.replace('.svx', '') || '';
		
		if (module.metadata) {
			posts.push({
				slug,
				...module.metadata,
			});
		}
	}

	// Sort by date, newest first
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Function to get a single post
export async function getPost(slug: string): Promise<BlogPostWithContent | null> {
	try {
		const post = await import(`../../content/blog/${slug}.svx`);
		
		if (post.metadata) {
			return {
				slug,
				...post.metadata,
				content: post.default,
			};
		}
		
		return null;
	} catch (error) {
		return null;
	}
}


