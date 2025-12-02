<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { LayoutDashboard, FileText, LogOut, Home } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import LogoImg from '$lib/assets/Logo.svg';

	let { children } = $props();

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
					
					</div>
					
				</div>
			</div>
		</nav>
		<main id="main-content" class="flex-1 w-full">
			{@render children()}
		</main>
	</div>
</div>
