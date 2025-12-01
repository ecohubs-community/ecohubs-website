// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { AuthPayload } from '$lib/server/auth-helpers';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: AuthPayload;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
