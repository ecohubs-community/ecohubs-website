// Prerender to static HTML for fast, CDN-cacheable delivery — consistent with
// the other landing pages. Everything dynamic (Mautic tracking, the /api/waitlist
// POSTs, the profile modal) runs only after hydration, so there's nothing that
// needs server-side rendering per request.
export const prerender = true;
