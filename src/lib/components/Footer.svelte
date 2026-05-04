<script lang="ts">
	import { ArrowRight, Check, Loader2 } from 'lucide-svelte';
	import Logo from '$lib/components/Logo.svelte';

	const currentYear = new Date().getFullYear();

	const ecosystemLinks = [
		{ href: '/blueprint', label: 'Blueprint' },
		// { href: '/dao', label: 'Governance' },
		// { href: '/ecotoken', label: 'EcoToken' },
		{ href: '/vision', label: 'Vision' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/membership', label: 'Membership' },
		{ href: '/contact', label: 'Contact' }
	];

	const socialLinks = [
		{ href: 'https://discord.gg/Xnh7247Nq3', label: 'Discord', icon: '/social-icons/discord.svg' },
		{ href: 'https://mastodon.social/@ecohubs', label: 'Mastodon', icon: '/social-icons/mastodon.svg' },
		{ href: 'https://farcaster.xyz/ecohubs', label: 'Farcaster', icon: '/social-icons/farcaster.svg' },
		{ href: 'https://x.com/eco_hubs', label: 'X', icon: '/social-icons/x.svg' },
		{ href: 'https://www.instagram.com/ecohubs_community/', label: 'Instagram', icon: '/social-icons/instagram.svg' },
		{ href: 'https://www.linkedin.com/company/ecohubs/', label: 'LinkedIn', icon: '/social-icons/linkedin.svg' },
		{ href: 'https://github.com/ecohubs-community', label: 'GitHub', icon: '/social-icons/github.svg' }
	];

	let email = $state('');
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!email || !email.includes('@')) {
			errorMessage = 'Please enter a valid email address';
			submitStatus = 'error';
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});

			const contentType = response.headers.get('content-type');
			const responseText = await response.text();
			let data: { success?: boolean; message?: string } = {};

			if (contentType && contentType.includes('application/json')) {
				try {
					data = JSON.parse(responseText);
				} catch {
					throw new Error('Invalid response from server. Please try again later.');
				}
			} else {
				throw new Error('Server error. Please try again later.');
			}

			if (!response.ok) {
				throw new Error(data.message || 'Failed to subscribe');
			}

			submitStatus = 'success';
			email = '';
		} catch (error) {
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<footer class="bg-[#06170f] text-stone-300">
	<!-- Newsletter strip -->
	<div class="border-b border-emerald-900/40">
		<div class="max-w-7xl mx-auto px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
			<div>
				<div class="kicker text-emerald-300/80 mb-3">Stay close to the work</div>
				<h3 class="font-serif text-2xl md:text-3xl text-[#f5f2ea] leading-tight">
					Letters from a young project.<br/>
					<em class="font-story italic font-normal text-emerald-300">Rare, but real.</em>
				</h3>
				<p class="mt-3 text-sm text-stone-400 max-w-md">
					We're early — a small project finding its shape. When something actually shifts — a new chapter of the Blueprint, a note from the Ecuador pilot, an invitation to gather — we'll write. No schedule. No filler.
				</p>
			</div>
			<div>
				<form
					onsubmit={handleSubmit}
					class="flex flex-col sm:flex-row gap-3"
					aria-label="Newsletter subscription"
				>
					<input
						type="email"
						bind:value={email}
						required
						placeholder="your@email.com"
						disabled={isSubmitting || submitStatus === 'success'}
						class="flex-1 px-5 py-3.5 rounded-full bg-[#0b2419] border border-emerald-900/50 text-[#f5f2ea] placeholder:text-stone-500 focus:outline-none focus:border-emerald-400/60 disabled:opacity-50"
						aria-label="Email address"
					/>
					<button
						type="submit"
						disabled={isSubmitting || submitStatus === 'success'}
						class="px-6 py-3.5 bg-emerald-500 text-[#06170f] font-medium rounded-full hover:bg-emerald-400 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
					>
						{#if isSubmitting}
							<Loader2 class="w-4 h-4 animate-spin" aria-hidden="true" />
							Subscribing…
						{:else if submitStatus === 'success'}
							<Check class="w-4 h-4" aria-hidden="true" />
							Thank you
						{:else}
							Subscribe
						{/if}
					</button>
				</form>
				{#if submitStatus === 'success'}
					<p class="mt-3 text-xs text-emerald-300/80" role="status">
						Thanks! Please check your email to confirm your subscription.
					</p>
				{:else if submitStatus === 'error' && errorMessage}
					<p class="mt-3 text-xs text-red-400" role="alert">{errorMessage}</p>
				{/if}
				<a
					href="/feed.xml"
					class="mt-4 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-[#f5f2ea] transition-colors"
					aria-label="RSS Feed"
				>
					<ArrowRight class="w-3 h-3" aria-hidden="true" />
					RSS Feed
				</a>
			</div>
		</div>
	</div>

	<!-- Main footer grid -->
	<div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
		<!-- Brand column -->
		<div class="col-span-2">
			<div class="mb-4">
				<Logo />
			</div>
			<p class="text-sm text-stone-400 leading-relaxed max-w-sm">
				We are co-creating the blueprint for regenerative living. Join us to design communities
				that thrive in harmony with nature.
			</p>
			<div class="mt-6 flex flex-wrap items-center gap-3">
				{#each socialLinks as link (link.label)}
					<a
						href={link.href}
						class="w-9 h-9 rounded-full border border-emerald-900/50 flex items-center justify-center hover:border-emerald-400/60 hover:bg-emerald-900/30 transition-colors group focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Follow us on {link.label}"
						target="_blank"
						rel={link.label === 'Mastodon' ? 'me' : 'noopener noreferrer'}
					>
						<img
							src={link.icon}
							alt={link.label}
							class="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
							style="filter: invert(1) brightness(1.2);"
						/>
					</a>
				{/each}
			</div>
		</div>

		<!-- Ecosystem -->
		<div>
			<div class="kicker text-emerald-300/70 mb-4">Ecosystem</div>
			<ul class="space-y-3 text-sm">
				{#each ecosystemLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							class="hover:text-[#f5f2ea] transition-colors focus-visible:ring-2 focus-visible:ring-green-400 rounded"
							data-sveltekit-preload-data="hover"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Legal -->
		<div>
			<div class="kicker text-emerald-300/70 mb-4">Legal</div>
			<ul class="space-y-3 text-sm">
				<li><a href="/privacy" class="hover:text-[#f5f2ea] transition-colors">Privacy Policy</a></li>
				<li><a href="/terms" class="hover:text-[#f5f2ea] transition-colors">Terms of Service</a></li>
			</ul>
		</div>
	</div>

	<!-- Bottom strip -->
	<div class="border-t border-emerald-900/40">
		<div
			class="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500"
		>
			<div>&copy; {currentYear} EcoHubs.community · Built in the open, with care and regenerative principles.</div>
		</div>
	</div>
</footer>
