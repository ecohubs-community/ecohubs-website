<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { LayoutDashboard, FileText, LogOut, Home, HouseIcon, BookOpen } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import LogoImg from '$lib/assets/Logo.svg';

	let { children } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/admin/proposals', label: 'Proposals', icon: FileText },
		{ href: '/admin/blog/drafts', label: 'Blog Drafts', icon: BookOpen }
	];

	function handleLogout() {
		// Directly navigate to logout - the server hook will handle the redirect
		goto('/auth/logout');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="flex min-h-screen flex-col relative">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ecohubs-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
	>
		Skip to main content
	</a>
	<div class="relative z-10 flex flex-col min-h-screen w-full">
		<!-- Admin Navigation -->
		<nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
			<div class="container mx-auto px-4">
				<div class="flex items-center justify-between h-16">
					<div class="flex items-center gap-4">
						<a href="/admin" class="flex items-center gap-2">
							<img src={LogoImg} alt="EcoHubs" class="h-8 w-8 invert-0 dark:invert-100" />
							<span class="font-serif font-bold text-xl tracking-tight text-gray-900 dark:text-white">
								Eco<span class="text-green-600 dark:text-green-400">Hubs</span>
							</span>
						</a>
						<div class="flex items-center gap-1">
							{#each navItems as item}
								{@const Icon = item.icon}
								<a
									href={item.href}
									class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors {$page.url.pathname === item.href
										? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
										: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}"
								>
									<Icon class="w-4 h-4" />
									<span class="font-medium">{item.label}</span>
								</a>
							{/each}
						</div>
					</div>
					<div class="flex items-center gap-3">
						<a
							href="/"
							class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
						>
							<HouseIcon class="w-4 h-4" />
							<span class="hidden sm:inline">Back to Website</span>
						</a>
						<button
							onclick={handleLogout}
							class="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
						>
							<LogOut class="w-4 h-4" />
							<span class="hidden sm:inline">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</nav>
		<main id="main-content" class="flex-1 w-full">
			{@render children()}
		</main>
	</div>
</div>
