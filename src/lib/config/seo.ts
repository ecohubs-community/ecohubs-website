// SEO Configuration for EcoHubs.community
// Centralized configuration for all SEO-related constants

export const SEO_CONFIG = {
	siteName: 'EcoHubs.community',
	siteUrl: 'https://ecohubs.community',
	defaultTitle: 'EcoHubs.community - Building Regenerative Communities',
	defaultDescription:
		"Join EcoHubs.community in co-creating the world's first open-source blueprint for regenerative communities. Be part of the first 500.",
	defaultOgImage: '/og-default.jpg',
	themeColor: '#4a7c2a',
	locale: 'en_US',
	twitterHandle: '@ecohubs',

	// Organization details for schema.org
	organization: {
		name: 'EcoHubs.community',
		legalName: 'EcoHubs Community',
		foundingDate: '2025',
		founders: [
			{
				name: 'Stefan Lessle',
				jobTitle: 'Founder & Software Engineer',
				url: 'https://ecohubs.community'
			}
		],
		address: {
			addressCountry: 'EC' // Ecuador
		},
		socialProfiles: [
			'https://github.com/ecohubs-community',
			'https://mastodon.social/@ecohubs',
			'https://farcaster.xyz/ecohubs',
			'https://discord.gg/Xnh7247Nq3',
			'https://facebook.com/ecohubscommunity',
			'https://x.com/eco_hubs'
		]
	},

	// Page-specific metadata
	pages: {
		home: {
			title: 'EcoHubs.community - A Regenerative Future Designed Together',
			description:
				"Join EcoHubs.community in co-creating the world's first open-source blueprint for regenerative communities. Be part of the first 500.",
			ogImage: '/og-home.jpg'
		},
		vision: {
			title: 'Vision - EcoHubs.community',
			description:
				'Our vision for a global network of small, regenerative EcoHubs that demonstrate sustainable living and community governance.',
			ogImage: '/og-vision.jpg'
		},
		blueprint: {
			title: 'The Blueprint - EcoHubs.community',
			description:
				'Explore the open-source blueprint for building regenerative communities. A living knowledge system designed for replication and adaptation.',
			ogImage: '/og-blueprint.jpg'
		},
		join: {
			title: 'Join Us - EcoHubs.community',
			description:
				'Apply to join EcoHubs.community and be part of the first 500 pioneers building regenerative communities.',
			ogImage: '/og-join.jpg'
		},
		contact: {
			title: 'Contact - EcoHubs.community',
			description:
				'Get in touch with EcoHubs.community. We would love to hear from you about regenerative community building.',
			ogImage: '/og-contact.jpg'
		},
		blog: {
			title: 'Blog - EcoHubs.community',
			description:
				'Insights, updates, and stories about regenerative community building, DAO governance, and sustainable living.',
			ogImage: '/og-blog.jpg'
		},
		privacy: {
			title: 'Privacy Policy - EcoHubs.community',
			description:
				'Our privacy policy explains how we collect, use, and protect your personal data in compliance with Ecuador LOPDP.',
			ogImage: '/og-default.jpg'
		},
		terms: {
			title: 'Terms of Service - EcoHubs.community',
			description: 'Terms and conditions for using EcoHubs.community services and platform.',
			ogImage: '/og-default.jpg'
		}
	}
} as const;

// Navigation structure for breadcrumbs
export const SITE_NAVIGATION = {
	home: { name: 'Home', path: '/' },
	vision: { name: 'Vision', path: '/vision', parent: 'home' },
	blueprint: { name: 'Blueprint', path: '/blueprint', parent: 'home' },
	join: { name: 'Join', path: '/join', parent: 'home' },
	contact: { name: 'Contact', path: '/contact', parent: 'home' },
	blog: { name: 'Blog', path: '/blog', parent: 'home' },
	privacy: { name: 'Privacy', path: '/privacy', parent: 'home' },
	terms: { name: 'Terms', path: '/terms', parent: 'home' }
} as const;

// Helper function to generate breadcrumbs for a page
export function generateBreadcrumbs(
	pageKey: keyof typeof SITE_NAVIGATION
): Array<{ name: string; url: string }> {
	const breadcrumbs: Array<{ name: string; url: string }> = [];
	let currentKey: keyof typeof SITE_NAVIGATION | undefined = pageKey;

	while (currentKey) {
		const page = SITE_NAVIGATION[currentKey];
		breadcrumbs.unshift({
			name: page.name,
			url: `${SEO_CONFIG.siteUrl}${page.path}`
		});
		currentKey = 'parent' in page ? (page.parent as keyof typeof SITE_NAVIGATION) : undefined;
	}

	return breadcrumbs;
}

// Type exports for use in components
export type PageKey = keyof typeof SEO_CONFIG.pages;
export type NavKey = keyof typeof SITE_NAVIGATION;
