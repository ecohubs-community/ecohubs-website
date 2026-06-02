// Prerender to static HTML for fast, CDN-cacheable delivery — consistent with
// the other static pages. The quiz is fully client-side (Mautic tracking and
// the /api/mautic POST run only after hydration), so there's nothing dynamic
// to render server-side.
export const prerender = true;
