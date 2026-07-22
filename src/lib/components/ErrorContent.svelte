<script lang="ts">
	/**
	 * Branded error content shared by both error boundaries:
	 *  - src/routes/+error.svelte      (unmatched URLs / root-level errors)
	 *  - src/routes/(web)/+error.svelte (errors thrown inside (web) routes)
	 *
	 * Renders only the page *content* — the surrounding Navbar/Footer come from
	 * whichever layout hosts the boundary. Adapts copy for 404 vs 50x based on
	 * `page.status`.
	 */
	import { page } from '$app/state';
	import SEO from '$lib/components/SEO.svelte';

	const status = $derived(page.status);
	const isNotFound = $derived(status === 404);

	const copy = $derived(
		isNotFound
			? {
					kicker: 'Error 404 — a wrong turn',
					headline: 'This path has grown over.',
					emphasis: "Let's find the trail again.",
					body: "The page you're looking for may have been moved, renamed, or is still being tended to. Nothing is truly lost — here are a few ways back."
				}
			: {
					kicker: `Error ${status} — something went sideways`,
					headline: 'Our garden hit a snag.',
					emphasis: "We're tending to it now.",
					body:
						page.error?.message && status !== 500
							? page.error.message
							: "Something on our end isn't responding as it should. This isn't your fault — try again in a moment, or take one of the paths below."
				}
	);

	const popularPaths = [
		{ href: '/vision', label: 'Our vision' },
		{ href: '/rcos', label: 'RCOS Standard' },
		{ href: '/membership', label: 'Become a member' },
		{ href: '/blog', label: 'Read the stories' }
	];
</script>

<SEO
	title={isNotFound
		? 'Off the path - EcoHubs.community'
		: 'Something went wrong - EcoHubs.community'}
	description="The page you're looking for doesn't exist or has been moved."
	noindex={true}
/>

<section class="grain relative flex min-h-[85vh] items-center overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="drift-a absolute -left-32 top-24 -z-10 h-[460px] w-[460px] rounded-full bg-emerald-200/30 blur-3xl"
	></div>
	<div
		class="drift-b absolute bottom-0 -right-24 -z-10 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-3xl px-6 pb-24 pt-36 lg:px-8">
		<div class="flex flex-col items-center text-center">
			<div class="rise rise-1 kicker mb-6 text-emerald-700">{copy.kicker}</div>

			<h1 class="rise rise-2 huge text-[88px] font-medium sm:text-[128px] md:text-[164px]">
				{status}
			</h1>

			<h2
				class="rise rise-2 mt-4 max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-ecohubs-deep md:text-[40px]"
			>
				{copy.headline}
				<em class="font-story font-normal italic text-ecohubs-primary">
					{copy.emphasis}
				</em>
			</h2>

			<p class="rise rise-3 mt-6 max-w-md text-lg font-light leading-relaxed text-stone-700">
				{copy.body}
			</p>

			<div class="rise rise-3 mt-9 flex flex-wrap justify-center gap-3">
				<a
					href="/"
					class="rounded-full bg-ecohubs-dark px-6 py-3 text-sm text-white transition-colors hover:bg-ecohubs-deep"
				>
					Back to home
				</a>
				<a
					href="/faq"
					class="rounded-full border border-stone-200 bg-white px-6 py-3 text-sm text-stone-700 transition-colors hover:border-ecohubs-primary/50 hover:text-ecohubs-dark"
				>
					Read the FAQ
				</a>
			</div>

			<div class="rise rise-4 mt-12 w-full">
				<div class="kicker mb-4 text-stone-400">Popular paths</div>
				<div class="mx-auto grid max-w-lg gap-x-8 gap-y-1 text-left text-sm sm:grid-cols-2">
					{#each popularPaths as path (path.href)}
						<a
							href={path.href}
							class="group flex items-center justify-between border-t border-stone-200/80 py-3 text-stone-700 transition-colors hover:text-ecohubs-dark"
						>
							{path.label}
							<span
								class="font-mono text-stone-300 transition-colors group-hover:text-ecohubs-primary"
							>→</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.huge {
		font-family: var(--font-story, 'Fraunces Variable', 'Fraunces', serif);
		font-optical-sizing: auto;
		line-height: 0.82;
		letter-spacing: -0.03em;
		background: linear-gradient(160deg, #064e3b 20%, #059669 70%, #0b2e24);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	@keyframes drift {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-14px);
		}
	}
	.drift-a {
		animation: drift 7s ease-in-out infinite;
	}
	.drift-b {
		animation: drift 9s ease-in-out infinite;
		animation-delay: -2s;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.rise {
		animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	.rise-1 {
		animation-delay: 0.05s;
	}
	.rise-2 {
		animation-delay: 0.18s;
	}
	.rise-3 {
		animation-delay: 0.3s;
	}
	.rise-4 {
		animation-delay: 0.42s;
	}

	@media (prefers-reduced-motion: reduce) {
		.drift-a,
		.drift-b,
		.rise {
			animation: none;
		}
	}
</style>
