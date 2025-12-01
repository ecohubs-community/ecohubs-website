<script lang="ts">


	
	import { goto } from '$app/navigation';
	import { Shield, Loader2, AlertCircle, CircleAlert, LoaderCircle } from 'lucide-svelte';

	let loading = $state(false);
	let error = $state('');
	let walletAddress = $state('');

	interface Ethereum extends EventTarget {
		request(args: { method: string; params?: unknown[] }): Promise<unknown>;
	}

	async function connectAndAuth() {
		loading = true;
		error = '';

		try {
			// Check if MetaMask is installed
			if (typeof (window as any).ethereum === 'undefined') {
				throw new Error('Please install MetaMask to continue');
			}

			// Request account access
			const accounts = (await (window as any).ethereum.request({
				method: 'eth_requestAccounts'
			})) as string[];

			if (!accounts || accounts.length === 0) {
				throw new Error('No accounts found');
			}

			walletAddress = accounts[0];

			// Create message to sign
			const message = `Sign this message to authenticate as a Safe owner.\n\nTimestamp: ${Date.now()}`;

			// Request signature
			const signature = (await (window as any).ethereum.request({
				method: 'personal_sign',
				params: [message, walletAddress]
			})) as string;

			// Verify with backend
			const response = await fetch('/auth/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ address: walletAddress, signature, message })
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Authentication failed');
			}

			// Success! Redirect to admin
			goto('/admin');
		} catch (err) {
			console.error('Auth error:', err);
			error = err instanceof Error ? err.message : 'Authentication failed';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login - EcoHubs Community</title>
	<meta name="description" content="Admin login for EcoHubs Community dashboard" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
	<div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-200 dark:border-gray-700">
		<div class="text-center mb-6">
			<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
				<Shield class="w-8 h-8 text-green-600 dark:text-green-400" />
			</div>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
			<p class="text-gray-600 dark:text-gray-400">Connect your wallet to verify Safe ownership</p>
		</div>

		{#if error}
			<div
				class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded mb-4 flex items-start gap-2"
			>
				<CircleAlert class="w-5 h-5 flex-shrink-0 mt-0.5" />
				<span class="text-sm">{error}</span>
			</div>
		{/if}

		{#if walletAddress}
			<div
				class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded mb-4 text-sm font-mono"
			>
				Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
			</div>
		{/if}

		<button
			onclick={connectAndAuth}
			disabled={loading}
			class="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white py-3 rounded-lg disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-semibold"
		>
			{#if loading}
				<LoaderCircle class="w-5 h-5 animate-spin" />
				Authenticating...
			{:else}
				<Shield class="w-5 h-5" />
				Connect Wallet & Verify
			{/if}
		</button>

		<div class="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
			<p>Only Safe owners can access this dashboard</p>
		</div>
	</div>
</div>

