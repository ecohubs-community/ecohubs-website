<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Shield, Users, FileText, LogOut, Home } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	function formatAddress(address: string): string {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	}

	async function handleLogout() {
		await fetch('/auth/logout', { method: 'POST' });
		goto('/');
	}
</script>

<svelte:head>
	<title>Admin Dashboard - EcoHubs Community</title>
	<meta name="description" content="Admin dashboard for EcoHubs Community" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
					<p class="text-gray-600 dark:text-gray-400">
						Welcome, <span class="font-mono font-semibold">{formatAddress(data.user.address)}</span>
					</p>
				</div>
				<div class="flex gap-3">
					<a
						href="/"
						class="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
					>
						<Home class="w-4 h-4" />
						Home
					</a>
					<button
						onclick={handleLogout}
						class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
					>
						<LogOut class="w-4 h-4" />
						Logout
					</button>
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<!-- Safe Owners Card -->
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
						<Shield class="w-6 h-6 text-green-600 dark:text-green-400" />
					</div>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Safe Owners</h3>
				<p class="text-3xl font-bold text-gray-900 dark:text-white">{data.stats.safeOwnersCount}</p>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Total Safe owners</p>
			</div>

			<!-- Applications Card -->
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
						<FileText class="w-6 h-6 text-blue-600 dark:text-blue-400" />
					</div>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Applications</h3>
				<p class="text-3xl font-bold text-gray-900 dark:text-white">{data.stats.applicationCount}</p>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Total applications received</p>
			</div>

			<!-- Status Card -->
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
				<div class="flex items-center justify-between mb-4">
					<div class="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
						<Users class="w-6 h-6 text-amber-600 dark:text-amber-400" />
					</div>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Status</h3>
				<p class="text-lg font-semibold text-green-600 dark:text-green-400">Active</p>
				<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Dashboard operational</p>
			</div>
		</div>

		<!-- Info Section -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Information</h2>
			<div class="space-y-4 text-gray-600 dark:text-gray-400">
				<p>
					This dashboard provides an overview of key metrics for the EcoHubs Community. Use the navigation
					above to access different sections.
				</p>
				<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
					<p class="text-sm text-green-800 dark:text-green-200">
						<strong>Note:</strong> You are authenticated as a Safe owner. Only authorized Safe owners can
						access this dashboard.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

