// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		interface Window {
			ethereum?: Ethereum;
		}
		interface Ethereum extends EventTarget {
			request(args: { method: string; params?: unknown[] }): Promise<unknown>;
		}
	}
}

export {};
