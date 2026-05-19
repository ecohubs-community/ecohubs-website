<script lang="ts">
	// Facade for YouTube embeds. Ships only the poster image on first paint
	// (lazy-loaded) — the real iframe + YouTube's ~600KB of JS and tracking
	// cookies only load after the user clicks play. Uses youtube-nocookie
	// so a pre-click impression doesn't drop tracking cookies either.

	interface Props {
		videoId: string;
		title: string;
		posterUrl?: string;
		/** When true (default), prefer the higher-resolution maxres poster. */
		highRes?: boolean;
	}

	let { videoId, title, posterUrl, highRes = true }: Props = $props();

	let activated = $state(false);
	let warmed = false;

	const poster =
		posterUrl ??
		(highRes
			? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
			: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);

	const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

	function activate() {
		activated = true;
	}

	// Warm up the YouTube origins on first hover/focus so the iframe load
	// feels instant once the user actually clicks play.
	function warm() {
		if (warmed) return;
		warmed = true;
		for (const href of [
			'https://www.youtube-nocookie.com',
			'https://www.google.com',
			'https://googleads.g.doubleclick.net',
			'https://static.doubleclick.net'
		]) {
			const link = document.createElement('link');
			link.rel = 'preconnect';
			link.href = href;
			document.head.appendChild(link);
		}
	}

	// maxresdefault.jpg isn't guaranteed to exist for every video (older
	// uploads only have hqdefault). Fall back transparently.
	function onPosterError(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
		if (img.src !== fallback) img.src = fallback;
	}
</script>

<div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-stone-900 soft-shadow border-4 border-stone-200">
	{#if activated}
		<iframe
			src={embedSrc}
			{title}
			loading="lazy"
			referrerpolicy="strict-origin-when-cross-origin"
			allow="accelerated-2d-canvas; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="absolute inset-0 h-full w-full border-0"
		></iframe>
	{:else}
		<button
			type="button"
			class="group absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
			aria-label="Play video: {title}"
			onclick={activate}
			onpointerover={warm}
			onfocus={warm}
		>
			<img
				src={poster}
				alt=""
				loading="lazy"
				decoding="async"
				onerror={onPosterError}
				class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
			/>
			<span
				aria-hidden="true"
				class="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent transition-opacity group-hover:opacity-90"
			></span>
			<span
				aria-hidden="true"
				class="absolute left-1/2 top-1/2 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-red-600 shadow-xl transition-all group-hover:scale-105 group-hover:bg-red-700"
			>
				<svg viewBox="0 0 24 24" class="h-7 w-7 text-white" fill="currentColor">
					<path d="M8 5v14l11-7z" />
				</svg>
			</span>
		</button>
	{/if}
</div>
