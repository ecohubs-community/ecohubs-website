// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

// Cloudflare Turnstile types
interface TurnstileOptions {
	sitekey: string;
	callback?: (token: string) => void;
	'expired-callback'?: () => void;
	'error-callback'?: () => void;
	theme?: 'light' | 'dark' | 'auto';
	size?: 'normal' | 'compact';
	tabindex?: number;
}

interface Turnstile {
	render: (container: HTMLElement, options: TurnstileOptions) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
	getResponse: (widgetId: string) => string | undefined;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Cloudflare Turnstile
	interface Window {
		turnstile?: Turnstile;
		onTurnstileLoad?: () => void;
		dataLayer: unknown[];
	}
}

export {};
