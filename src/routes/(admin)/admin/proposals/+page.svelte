<script lang="ts">
	import type { PageData } from './$types';
	import { Wallet, FileText, ExternalLink, CircleCheckIcon, CircleAlertIcon, LoaderCircleIcon } from 'lucide-svelte';
	import type { ApplicationRecord } from '$lib/server/airtable-proposals';

	let { data }: { data: PageData } = $props();

	let creating = $state<string | null>(null);
	let message = $state('');
	let applications = $state(data.applications);
	let applicationsWithoutProposals = $state(data.applicationsWithoutProposals);

	// Use authenticated wallet address from session
	const walletAddress = data.user.address;



	// Format application data for Snapshot proposal body
	function formatApplicationForSnapshot(app: ApplicationRecord): string {
		return `## Application Review

**Applicant:** ${app.fullName}
**Location:** ${app.location}
**Time Availability:** ${app.timeAvailability}
**Languages:** ${app.languages}

### Values & Vision

**What Resonates with EcoHubs:** 
${app.resonanceCombined.substring(0, 200)}${app.resonanceCombined.length > 200 ? '...' : ''}

**Living in Alignment with Nature:** $
{app.natureCommunityMeaning.substring(0, 200)}${app.natureCommunityMeaning.length > 200 ? '...' : ''}

**Essential Values:** 
${app.values.split(',').map((value) => `- ${value.trim()}`).join('\n')}

### Contribution & Experience

**Motivation:** 
${app.motivation.substring(0, 200)}${app.motivation.length > 200 ? '...' : ''}

**What They Want to Contribute:** 
${app.contribution.substring(0, 200)}${app.contribution.length > 200 ? '...' : ''}

**Experience Areas:** 
${app.experienceAreas.split(',').map((area) => `- ${area.trim()}`).join('\n')}

**Proud Project:** 
${app.proudProject.substring(0, 200)}${app.proudProject.length > 200 ? '...' : ''}

**AI Recommendation:** 
${app.aiRecommendation}

---

*Submitted: ${new Date(app.submittedAt).toLocaleString()}*

**Note:** Full application details are stored securely in Airtable. This proposal contains a summary for voting purposes.
`;
	}

	async function createProposal(app: ApplicationRecord) {
		if (typeof (window as any).ethereum === 'undefined') {
			message = 'Please install MetaMask to continue';
			return;
		}

		// Ensure the wallet is connected and matches the authenticated address
		try {
			const accounts = (await (window as any).ethereum.request({
				method: 'eth_requestAccounts'
			})) as string[];

			if (!accounts || accounts.length === 0) {
				message = 'No accounts found. Please connect your wallet.';
				return;
			}

			const connectedAddress = accounts[0].toLowerCase();
			if (connectedAddress !== walletAddress.toLowerCase()) {
				message = `Please connect the wallet ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
				return;
			}
		} catch (error) {
			message = `Failed to connect wallet: ${error instanceof Error ? error.message : 'Unknown error'}`;
			return;
		}

		creating = app.id;
		message = '';

		try {
			// Import ethers to create a provider and signer
			const { BrowserProvider } = await import('ethers');
			
			// Dynamically import Snapshot SDK
			// The SDK exports: { default: { Client, Client712, schemas, utils } }
			const snapshotModule = await import('@snapshot-labs/snapshot.js') as any;
			const snapshot = snapshotModule.default;
			
			// Client712 is an alias for Client, both are the same class
			const Client712 = snapshot?.Client712 || snapshot?.Client;
			
			if (!Client712 || typeof Client712 !== 'function') {
				console.error('Snapshot SDK module keys:', Object.keys(snapshotModule));
				console.error('Default export keys:', snapshot ? Object.keys(snapshot) : 'snapshot is null/undefined');
				console.error('Default export:', snapshot);
				throw new Error('Failed to import Client712 from Snapshot SDK. Check console for details.');
			}
			
			const client = new Client712('https://hub.snapshot.org');

			// Create ethers provider and signer from window.ethereum
			const provider = new BrowserProvider((window as any).ethereum);
			const signer = await provider.getSigner();
			
			// Create a compatibility wrapper for ethers v6 -> v5 API
			// Snapshot SDK expects _signTypedData (ethers v5) but v6 uses signTypedData
			const compatibleSigner = {
				...signer,
				_signTypedData: async (domain: any, types: any, value: any) => {
					// Call ethers v6 signTypedData method
					return await signer.signTypedData(domain, types, value);
				},
				getSigner: () => compatibleSigner
			};

			const space = data.snapshotSpace || 'ecohubs.eth';
			const votingDuration = data.votingDuration || 604800; // 7 days default

			// Get current block number for snapshot
			const currentBlock = await provider.getBlockNumber();

			// Prepare proposal data
			const proposal = {
				space,
				type: 'single-choice',
				title: `Membership Application: ${app.fullName}`,
				body: formatApplicationForSnapshot(app),
				choices: ['Approve', 'Reject', 'Needs Review'],
				start: Math.floor(Date.now() / 1000),
				end: Math.floor(Date.now() / 1000) + votingDuration,
				snapshot: currentBlock, // Use actual block number instead of 'latest'
				plugins: JSON.stringify({}),
				app: 'ecohubs-community'
			};

			// Sign and submit - pass the compatible signer
			// The SDK expects a signer with _signTypedData method (ethers v5 API)
			const receipt = await client.proposal(compatibleSigner, walletAddress, proposal);

			// Update Airtable via API
			await fetch('/api/proposals/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ recordId: app.id, "Snapshot Proposal ID": receipt.id })
			});

			// Update local state
			applications = applications.map((a) =>
				a.id === app.id ? { ...a, snapshotProposalId: receipt.id } : a
			);
			applicationsWithoutProposals = applicationsWithoutProposals.filter((a) => a.id !== app.id);

			message = `Proposal created successfully! ID: ${receipt.id}`;
			creating = null;
		} catch (error) {
			message = `Failed to create proposal: ${error instanceof Error ? error.message : 'Unknown error'}`;
			creating = null;
		}
	}

	function formatDate(dateString: string): string {
		try {
			return new Date(dateString).toLocaleDateString();
		} catch {
			return dateString;
		}
	}
</script>

<svelte:head>
	<title>Snapshot Proposals - Admin Dashboard</title>
	<meta name="description" content="Manage Snapshot proposals for membership applications" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
				Membership Application Manager
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Review applications and create Snapshot proposals for voting
			</p>
		</div>

		<!-- Wallet Status -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
			<div class="flex items-center gap-3">
				<div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
					<Wallet class="w-6 h-6 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<p class="font-semibold text-gray-900 dark:text-white">Authenticated Wallet</p>
					<p class="text-sm text-gray-600 dark:text-gray-400 font-mono">
						{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
					</p>
				</div>
			</div>
		</div>

		<!-- Status Message -->
		{#if message}
			<div
				class="p-4 rounded-lg mb-6 flex items-center gap-2 {message.includes('success') || message.includes('connected')
					? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
					: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'}"
			>
				{#if message.includes('success') || message.includes('connected')}
					<CircleCheckIcon class="w-5 h-5 shrink-0" />
				{:else}
					<CircleAlertIcon class="w-5 h-5 shrink-0" />
				{/if}
				<span class="text-sm">{message}</span>
			</div>
		{/if}

		<!-- Applications List -->
		<div class="space-y-4">
			{#if applicationsWithoutProposals.length === 0 && applications.length > 0}
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
					<p class="text-gray-600 dark:text-gray-400 text-center">
						All applications have Snapshot proposals created.
					</p>
				</div>
			{:else if applications.length === 0}
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
					<p class="text-gray-600 dark:text-gray-400 text-center">No applications found.</p>
				</div>
			{/if}

			{#each applications as app}
				<div
					class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
				>
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h3 class="text-xl font-bold text-gray-900 dark:text-white">{app.fullName}</h3>
								<span
									class="px-3 py-1 rounded-full text-xs font-semibold {app.snapshotProposalId
										? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
										: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}"
								>
									{app.snapshotProposalId ? 'Proposal Created' : 'Pending Review'}
								</span>
							</div>
							<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{app.email}</p>
							<p class="text-xs text-gray-500 dark:text-gray-500">
								Submitted: {formatDate(app.submittedAt)}
							</p>
						</div>
					</div>

					<div class="mb-4">
						<h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Application Summary:</h4>
						<div class="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
							<p class="mb-2">
								<strong>Motivation:</strong> {app.motivation.substring(0, 150)}
								{app.motivation.length > 150 ? '...' : ''}
							</p>
							<p>
								<strong>Contribution:</strong> {app.contribution.substring(0, 150)}
								{app.contribution.length > 150 ? '...' : ''}
							</p>
						</div>
					</div>

					<div class="flex gap-3">
						{#if !app.snapshotProposalId}
							<button
								onclick={() => createProposal(app)}
								disabled={creating === app.id}
								class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
							>
								{#if creating === app.id}
									<LoaderCircleIcon class="w-4 h-4 animate-spin" />
									Creating...
								{:else}
									<FileText class="w-4 h-4" />
									Create Snapshot Proposal
								{/if}
							</button>
						{:else}
							<a
								href={app.snapshotProposalLink}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
							>
								<ExternalLink class="w-4 h-4" />
								View on Snapshot
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

