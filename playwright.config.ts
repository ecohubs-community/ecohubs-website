import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		/*
		 * The default is 60s, which this build now exceeds: it took ~98s on CI
		 * once the Learning Hub added ~90 prerendered routes, so `pnpm test:e2e`
		 * failed before a single test ran. Three minutes leaves headroom for a
		 * cold runner without letting a genuinely hung build sit forever.
		 */
		timeout: 180_000,
		/* Locally, reuse a preview that is already running rather than spending
		   half a minute rebuilding it. CI always starts clean. */
		reuseExistingServer: !process.env.CI
	},
	testDir: 'e2e'
});
