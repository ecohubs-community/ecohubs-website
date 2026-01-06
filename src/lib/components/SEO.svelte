<script lang="ts">
	import { page } from '$app/stores';
	import { SEO_CONFIG } from '$lib/config/seo';

	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	interface FAQItem {
		question: string;
		answer: string;
	}

	interface PersonData {
		name: string;
		jobTitle?: string;
		image?: string;
		url?: string;
		sameAs?: string[];
	}

	interface ArticleData {
		publishedTime: string;
		modifiedTime?: string;
		author: string;
		section?: string;
		tags?: string[];
	}

	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		ogImage?: string;
		twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
		type?: 'website' | 'article';
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		noindex?: boolean;
		// New props for enhanced SEO
		breadcrumbs?: BreadcrumbItem[];
		faq?: FAQItem[];
		person?: PersonData;
		article?: ArticleData;
	}

	let {
		title = SEO_CONFIG.defaultTitle,
		description = SEO_CONFIG.defaultDescription,
		canonical,
		ogImage = SEO_CONFIG.defaultOgImage,
		twitterCard = 'summary_large_image',
		type = 'website',
		jsonLd,
		noindex = false,
		breadcrumbs,
		faq,
		person,
		article
	}: Props = $props();

	const siteUrl = SEO_CONFIG.siteUrl;

	// Generate canonical URL from page store or custom prop
	const canonicalUrl = $derived.by(() => {
		if (canonical) {
			return canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;
		}
		// Remove trailing slash for consistency
		const pathname = $page.url.pathname.replace(/\/$/, '') || '/';
		return `${siteUrl}${pathname}`;
	});

	const ogImageUrl = $derived(ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`);

	// Organization schema with enhanced details
	const organizationSchema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SEO_CONFIG.organization.name,
		url: siteUrl,
		logo: `${siteUrl}/logo.png`,
		description: SEO_CONFIG.defaultDescription,
		foundingDate: SEO_CONFIG.organization.foundingDate,
		founders: SEO_CONFIG.organization.founders.map((founder) => ({
			'@type': 'Person',
			name: founder.name,
			jobTitle: founder.jobTitle,
			url: founder.url
		})),
		address: {
			'@type': 'PostalAddress',
			addressCountry: SEO_CONFIG.organization.address.addressCountry
		},
		sameAs: SEO_CONFIG.organization.socialProfiles
	};

	// Website schema
	const websiteSchema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SEO_CONFIG.siteName,
		url: siteUrl,
		description: description
	};

	// Breadcrumb schema (generated from props)
	const breadcrumbSchema = $derived.by(() => {
		if (!breadcrumbs || breadcrumbs.length === 0) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				item: item.url
			}))
		};
	});

	// FAQ schema (generated from props)
	const faqSchema = $derived.by(() => {
		if (!faq || faq.length === 0) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faq.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer
				}
			}))
		};
	});

	// Person schema (generated from props)
	const personSchema = $derived.by(() => {
		if (!person) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: person.name,
			...(person.jobTitle && { jobTitle: person.jobTitle }),
			...(person.image && { image: person.image }),
			...(person.url && { url: person.url }),
			...(person.sameAs && { sameAs: person.sameAs }),
			worksFor: {
				'@type': 'Organization',
				name: SEO_CONFIG.organization.name
			}
		};
	});

	// Article schema (for blog posts)
	const articleSchema = $derived.by(() => {
		if (!article) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: title,
			description: description,
			image: ogImageUrl,
			datePublished: article.publishedTime,
			...(article.modifiedTime && { dateModified: article.modifiedTime }),
			author: {
				'@type': 'Person',
				name: article.author
			},
			publisher: {
				'@type': 'Organization',
				name: SEO_CONFIG.organization.name,
				logo: {
					'@type': 'ImageObject',
					url: `${siteUrl}/logo.png`
				}
			},
			...(article.section && { articleSection: article.section }),
			...(article.tags && { keywords: article.tags.join(', ') }),
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonicalUrl
			}
		};
	});

	// Combine all JSON-LD schemas
	const allJsonLd = $derived.by(() => {
		const schemas: Record<string, unknown>[] = [organizationSchema, websiteSchema];

		if (breadcrumbSchema) schemas.push(breadcrumbSchema);
		if (faqSchema) schemas.push(faqSchema);
		if (personSchema) schemas.push(personSchema);
		if (articleSchema) schemas.push(articleSchema);

		// Add custom JSON-LD if provided
		if (jsonLd) {
			if (Array.isArray(jsonLd)) {
				schemas.push(...jsonLd);
			} else {
				schemas.push(jsonLd);
			}
		}

		return schemas;
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Theme Color -->
	<meta name="theme-color" content={SEO_CONFIG.themeColor} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:site_name" content={SEO_CONFIG.siteName} />
	<meta property="og:locale" content={SEO_CONFIG.locale} />

	<!-- Article-specific OG tags -->
	{#if article}
		<meta property="article:published_time" content={article.publishedTime} />
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		<meta property="article:author" content={article.author} />
		{#if article.section}
			<meta property="article:section" content={article.section} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
	<meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
	<meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />

	<!-- JSON-LD Structured Data -->
	{#each allJsonLd as ld}
		{@html `<script type="application/ld+json">${JSON.stringify(ld)}</script>`}
	{/each}
</svelte:head>
