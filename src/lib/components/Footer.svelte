<script lang="ts">
	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ href: '/vision', label: 'Vision' },
		{ href: '/dao', label: 'DAO' },
		{ href: '/ecotoken', label: 'EcoToken' },
		{ href: '/blueprint', label: 'Blueprint' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	const socialLinks = [
		{ href: 'https://github.com/gaialabs', label: 'GitHub', icon: 'github' },
		// Add more social links as needed
	];
</script>

<footer class="border-t border-border bg-surface">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand Section -->
			<div class="col-span-1 md:col-span-2">
				<h2 class="font-serif text-2xl font-bold text-text-primary">GaiaLabs.community</h2>
				<p class="mt-4 text-sm text-text-secondary">
					Building intentional communities on blockchain. Regenerative, sustainable, and
					community-driven.
				</p>
			</div>

			<!-- Navigation Links -->
			<div>
				<h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-text-primary">
					Navigation
				</h3>
				<ul class="mt-4 space-y-2">
					{#each navLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="text-sm text-text-secondary transition-colors hover:text-text-primary"
								data-sveltekit-preload-data="hover"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Social Links -->
			<div>
				<h3 class="font-serif text-sm font-semibold uppercase tracking-wider text-text-primary">
					Connect
				</h3>
				<ul class="mt-4 space-y-2">
					{#each socialLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-text-secondary transition-colors hover:text-text-primary"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom Section -->
		<div class="mt-12 border-t border-border pt-8">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<p class="text-sm text-text-tertiary">
					&copy; {currentYear} GaiaLabs.community. All rights reserved.
				</p>
				<div class="flex space-x-6">
					<a
						href="/join"
						class="text-sm text-text-secondary transition-colors hover:text-text-primary"
						data-sveltekit-preload-data="hover"
					>
						Join Us
					</a>
					<!-- Add more legal links as needed -->
				</div>
			</div>
		</div>
	</div>
</footer>

