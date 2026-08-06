<script lang="ts">
	/**
	 * The site's icon. Use this everywhere instead of `@iconify/svelte` directly.
	 *
	 * Iconify's own component takes an icon *name* and fetches the data from
	 * `api.iconify.design` after hydration — a third-party request per visitor,
	 * no icon before hydration or without JavaScript, and no icon at all if that
	 * host is unreachable. Handing it the *data* instead renders immediately,
	 * server-side included, and never touches the network.
	 *
	 * Names still work as strings, which matters because several icons are
	 * chosen in data files rather than in markup. The data comes from
	 * `icons.generated.ts` — run `pnpm icons` after using a new one.
	 */
	import Iconify from '@iconify/svelte';
	import { dev } from '$app/environment';
	import { iconData } from '$lib/icons.generated';

	let { icon, ...rest }: { icon: string; [key: string]: unknown } = $props();

	const data = $derived(iconData(icon));

	$effect(() => {
		// Loud in dev, silent in production: a missing icon means someone forgot
		// `pnpm icons`, and falling back to the network would hide that.
		if (dev && !data) console.warn(`Icon "${icon}" is not bundled — run \`pnpm icons\`.`);
	});
</script>

{#if data}
	<Iconify icon={data} {...rest} />
{/if}
