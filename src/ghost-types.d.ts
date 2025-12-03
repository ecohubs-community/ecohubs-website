declare module '@tryghost/content-api' {
	export default class GhostContentAPI {
		constructor(config: { url: string; key: string; version: string });
		posts: {
			browse: (options: { limit: string; include: string[]; filter: string }) => Promise<any[]>;
			read: (options: { slug: string }, include?: { include: string[] }) => Promise<any>;
		};
	}
}

declare module '@tryghost/admin-api' {
	export default class GhostAdminAPI {
		constructor(config: { url: string; key: string; version: string });
		posts: {
			browse: (options: { limit: string; include: string[]; filter: string }) => Promise<any[]>;
			read: (options: { id: string }, include?: { include: string[] }) => Promise<any>;
			edit: (options: { id: string; status?: string; custom_fields?: Record<string, unknown> }, include?: { include: string[] }) => Promise<any>;
		};
	}
}

