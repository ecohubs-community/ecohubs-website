<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		ogImage?: string;
		twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		noindex?: boolean;
	}

	let {
		title = 'GaiaLabs.community - Building Intentional Communities on Blockchain',
		description = 'Join GaiaLabs.community in creating sustainable, regenerative intentional communities powered by blockchain technology.',
		canonical,
		ogImage = '/og-image.jpg',
		twitterCard = 'summary_large_image',
		jsonLd,
		noindex = false
	}: Props = $props();

	const siteUrl = browser ? window.location.origin : 'https://gaialabs.community';
	const canonicalUrl = canonical || (browser ? window.location.href : siteUrl);
	const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

	// Default JSON-LD for Organization and WebSite
	const defaultJsonLd: Record<string, unknown>[] = [
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'GaiaLabs.community',
			url: siteUrl,
			logo: `${siteUrl}/logo.png`,
			description: 'Building intentional communities on blockchain',
			sameAs: [
				'https://github.com/gaialabs',
				// Add other social media links as needed
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'GaiaLabs.community',
			url: siteUrl,
			description: description
		}
	];

	const allJsonLd = jsonLd
		? Array.isArray(jsonLd)
			? [...defaultJsonLd, ...jsonLd]
			: [...defaultJsonLd, jsonLd]
		: defaultJsonLd;
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

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />

	<!-- JSON-LD Structured Data -->
	{#each allJsonLd as ld}
		{@html `<script type="application/ld+json">${JSON.stringify(ld)}</script>`}
	{/each}
</svelte:head>

