<script lang="ts">
	import { Sprout, Twitter, Github, Disc, ArrowRight } from 'lucide-svelte';
	import Logo from '$lib/components/Logo.svelte';
	
	const currentYear = new Date().getFullYear();

	const ecosystemLinks = [
		{ href: '/blueprint', label: 'Blueprint' },
		{ href: '/dao', label: 'Governance' },
		{ href: '/ecotoken', label: 'EcoToken' },
		{ href: '/vision', label: 'Community Hubs' }
	];

	const socialLinks = [
		{ href: 'https://twitter.com/ecohubs', label: 'Twitter', icon: Twitter },
		{ href: 'https://github.com/ecohubs', label: 'GitHub', icon: Github },
		{ href: '#', label: 'Discord', icon: Disc }
	];
</script>

<footer class="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
			<div class="col-span-1 md:col-span-2">
				<Logo />
				<p class="text-gray-500 mb-6 max-w-sm">
					We are co-creating the blueprint for regenerative living. Join us to design communities
					that thrive in harmony with nature.
				</p>
				<div class="flex gap-4">
					{#each socialLinks as link (link.label)}
						{@const Icon = link.icon}
						<a
							href={link.href}
							class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-ecohubs-primary hover:border-ecohubs-primary transition-all focus-visible:ring-2 focus-visible:ring-green-400"
							aria-label="Follow us on {link.label}"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Icon class="w-5 h-5" aria-hidden="true" />
						</a>
					{/each}
				</div>
			</div>

			<div>
				<h4 class="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Ecosystem</h4>
				<ul class="space-y-3 text-sm text-gray-500">
					{#each ecosystemLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="hover:text-ecohubs-primary transition-colors focus-visible:ring-2 focus-visible:ring-green-400 rounded px-0 py-0.5"
								data-sveltekit-preload-data="hover"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
				<p class="text-xs text-gray-400 mb-3">Subscribe to our newsletter for updates.</p>
				<form class="flex gap-2" aria-label="Newsletter subscription">
					<input
						type="email"
						placeholder="Email address"
						class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-ecohubs-primary focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Email address"
						required
					/>
					<button
						type="submit"
						class="bg-ecohubs-primary text-white p-2 rounded-lg hover:bg-ecohubs-dark transition-colors focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Subscribe to newsletter"
					>
						<ArrowRight class="w-4 h-4" aria-hidden="true" />
					</button>
				</form>
			</div>
		</div>

		<div
			class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
		>
			<div class="mb-4 md:mb-0">
				&copy; {currentYear} EcoHubs DAO. Built with Regenerative Principles.
			</div>
			<div class="flex gap-6">
				<a href="/privacy" class="hover:text-ecohubs-primary">Privacy Policy</a>
				<a href="/terms" class="hover:text-ecohubs-primary">Terms of Service</a>
			</div>
		</div>
	</div>
</footer>
