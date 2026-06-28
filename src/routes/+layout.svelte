<script lang="ts">
	/**
	 * Root layout — wraps both the (web) and (landing) route groups.
	 *
	 * Its only job is to boot Vercel Web Analytics once for the whole site.
	 * `injectAnalytics` is SSR/prerender-safe (it no-ops on the server and wires
	 * up SPA navigation tracking on the client), so it lives here rather than in
	 * each group layout. In dev it points at the development collector so local
	 * traffic never lands in production stats.
	 */
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

{@render children()}
