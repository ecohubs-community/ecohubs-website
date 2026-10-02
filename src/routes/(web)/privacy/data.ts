/**
 * Facts the privacy policy states, in one place. Keep
 * docs/privacy/record-of-processing.md in step with anything edited here:
 * every data category and retention period on the page must appear there,
 * and the reverse.
 *
 * Bump `updated` (and `/privacy`'s `lastmod` in sitemap.xml) whenever the
 * policy changes in substance.
 */
export const POLICY = {
	updated: '2 October 2026',
	controller: 'EcoHubs.community, based in Ecuador',
	contact: 'privacy@ecohubs.community',
	authority: {
		name: 'Superintendencia de Protección de Datos Personales (SPDP)',
		url: 'https://spdp.gob.ec/'
	}
};

export const sections = [
	{ id: 'controller', num: '01', title: 'Who is responsible' },
	{ id: 'data-collected', num: '02', title: 'What we collect' },
	{ id: 'sensitive', num: '03', title: 'Sensitive information' },
	{ id: 'legal-basis', num: '04', title: 'Why we use it, and on what basis' },
	{ id: 'cookies', num: '05', title: 'Cookies, analytics and tracking' },
	{ id: 'third-parties', num: '06', title: 'Who else handles your data' },
	{ id: 'transfers', num: '07', title: 'International transfers' },
	{ id: 'retention', num: '08', title: 'How long we keep it' },
	{ id: 'rights', num: '09', title: 'Your rights' },
	{ id: 'security', num: '10', title: 'Security' },
	{ id: 'children', num: '11', title: 'Children' },
	{ id: 'updates', num: '12', title: 'Changes to this policy' },
	{ id: 'authority', num: '13', title: 'Complaints' }
];

/** Section 04 — one line per purpose, each with its own basis (LOPDP Art. 7). */
export const bases: { purpose: string; basis: string }[] = [
	{
		purpose: 'Answering your message',
		basis: 'your consent, given when you send the contact form.'
	},
	{
		purpose: 'Considering your membership application',
		basis: 'your consent, given when you submit the application.'
	},
	{
		purpose: 'Sending the newsletter or waitlist updates',
		basis: 'your consent, confirmed through the link in the first email we send you.'
	},
	{
		purpose: 'Sending your resilience report',
		basis: 'your consent, given when you submit the assessment form.'
	},
	{
		purpose: 'Google Analytics cookies and campaign tracking on two landing pages',
		basis: 'your consent through the cookie banner. Declining changes nothing else on the site.'
	},
	{
		purpose:
			"Visitor counts (ours, and Google's cookieless measurement before you choose), spam protection and logs",
		basis:
			'our legitimate interest in keeping the site working, safe and useful, limited to what that needs. You can object at any time.'
	},
	{
		purpose: 'Showing members on the homepage map',
		basis: "the member's choice to make their ecohubsOS profile public."
	},
	{
		purpose: 'Legal obligations',
		basis: 'where the law requires us to keep or hand over data.'
	}
];

/** Section 06 — everyone outside our team who touches personal data. */
export const processors: { name: string; role: string; where: string }[] = [
	{
		name: 'Vercel',
		role: 'Serves this website, keeps short-lived request logs and counts visits (Vercel Web Analytics).',
		where: 'United States'
	},
	{
		name: 'IONOS (ionos.de)',
		role: 'Rents us the server we manage ourselves. It runs ecohubsOS (where applications and member profiles live), our blog (Ghost), our newsletter (Listmonk) and our mailing and campaign tool (Mautic).',
		where: 'Server located in the United States'
	},
	{
		name: 'Mediakular',
		role: 'Its mail server delivers the emails we send, including form confirmations, on our behalf.',
		where: 'United States (on the same IONOS server)'
	},
	{
		name: 'Cloudflare',
		role: 'Turnstile, the spam check on the contact and application forms. It sees your IP address and browser signals, not what you write.',
		where: 'United States'
	},
	{
		name: 'RSS.com',
		role: 'The podcast player on rcos.ecohubs.community. It loads only when you press play; from then on RSS.com sees your IP address and browser details, like any website you visit.',
		where: 'Not yet confirmed'
	},
	{
		name: 'Google',
		role: 'Google Analytics: cookieless measurement until you choose, cookies only if you accept. Video previews come from YouTube; a video itself loads only when you press play.',
		where: 'United States'
	},
	{
		name: 'Discord',
		role: 'Our private error alerts. If a form submission fails, the alert can include your name, email address and IP address, so we can reach you and your message is not lost.',
		where: 'United States'
	}
];

/** Section 08 — how long each kind of data is kept. */
export const retention: { what: string; howLong: string }[] = [
	{
		what: 'Contact form messages',
		howLong: 'Two years after our last exchange.'
	},
	{
		what: 'Membership applications',
		howLong:
			'While we consider them, then one more year if you do not become a member. If you do, your record stays in ecohubsOS for as long as you are a member.'
	},
	{
		what: 'Newsletter and waitlist subscriptions',
		howLong:
			'Until you unsubscribe (every email has a link) or ask us to delete them. After unsubscribing we keep only your address, marked as unsubscribed, so we never write to you again by mistake.'
	},
	{
		what: 'Community Resilience Assessment answers',
		howLong: 'Until you ask us to delete them, and at most two years.'
	},
	{
		what: 'Community agreements you send us for a resilience report',
		howLong: 'Deleted once we have sent you the report.'
	},
	{
		what: 'Campaign tracking on the two landing pages (Mautic)',
		howLong:
			'Visits linked to a sign-up: as long as the subscription. Visits that never led to one: until our yearly clean-up deletes them.'
	},
	{
		what: 'Google Analytics',
		howLong:
			"Detailed, user-level data: at most 14 months, the longest Google allows. Google's summary reports keep only aggregated numbers."
	},
	{
		what: 'Vercel Web Analytics',
		howLong:
			'Stored only as aggregated counts. The daily identifier it uses is discarded after 24 hours.'
	},
	{
		what: 'Request logs',
		howLong:
			"Vercel's: a few days at most. Our own server's (IP address, time, page requested): rotated monthly, at most 10 months."
	},
	{
		what: 'Error alerts',
		howLong: 'Deleted by hand once we have dealt with the problem.'
	},
	{
		what: 'Data kept in your own browser',
		howLong: 'On your device until you clear it. We never receive it.'
	}
];

/** Section 09 — the LOPDP rights, in plain words. */
export const rights: { name: string; detail: string }[] = [
	{ name: 'Access', detail: 'ask what we hold about you and what we do with it.' },
	{ name: 'Rectification', detail: 'have inaccurate or incomplete data corrected.' },
	{ name: 'Deletion', detail: 'have your data erased.' },
	{ name: 'Objection', detail: 'object to processing based on our legitimate interest.' },
	{ name: 'Portability', detail: 'receive your data in a structured, commonly used format.' },
	{ name: 'Restriction', detail: 'ask us to suspend processing while a question is settled.' },
	{
		name: 'No automated decisions',
		detail:
			'we make no decisions about you by automated means alone. People read every application.'
	},
	{
		name: 'Withdrawing consent',
		detail: 'at any time, without affecting what happened before.'
	}
];
