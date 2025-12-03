<script lang="ts">
	import type { PageData } from './$types';
	import { FileText, ExternalLink, Send, Loader2, AlertCircle, CheckCircle2, Clock } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let creating = $state<string | null>(null);
	let publishing = $state<string | null>(null);
	let message = $state('');
	let drafts = $state(data.drafts);

	const walletAddress = data.user.address;
	const snapshotSpace = data.snapshotSpace;
	const votingDuration = data.votingDuration;

	function formatDate(dateString: string): string {
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	}

	function formatVotingEnd(endTimestamp: number): string {
		const endDate = new Date(endTimestamp * 1000);
		const now = new Date();
		const diff = endDate.getTime() - now.getTime();

		if (diff <= 0) {
			return 'Voting ended';
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		if (days > 0) {
			return `${days} day${days > 1 ? 's' : ''} remaining`;
		}
		return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
	}

	function getProposalUrl(proposalId: string): string {
		return `https://snapshot.org/#/${snapshotSpace}/proposal/${proposalId}`;
	}

	async function createProposal(draft: typeof drafts[0]) {
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

		creating = draft.id;
		message = '';

		try {
			// Import ethers to create a provider and signer
			const { BrowserProvider } = await import('ethers');

			// Dynamically import Snapshot SDK
			const snapshotModule = await import('@snapshot-labs/snapshot.js') as any;
			const snapshot = snapshotModule.default;
			const Client712 = snapshot?.Client712 || snapshot?.Client;

			if (!Client712 || typeof Client712 !== 'function') {
				throw new Error('Failed to import Snapshot SDK');
			}

			const client = new Client712('https://hub.snapshot.org');

			// Create ethers provider and signer
			const provider = new BrowserProvider((window as any).ethereum);
			const signer = await provider.getSigner();

			// Create compatibility wrapper for ethers v6 -> v5 API
			const compatibleSigner = {
				...signer,
				_signTypedData: async (domain: any, types: any, value: any) => {
					return await signer.signTypedData(domain, types, value);
				},
				getSigner: () => compatibleSigner
			};

			// Get current block number
			const currentBlock = await provider.getBlockNumber();

			// Format draft for Snapshot proposal
			const formatDraftForSnapshot = (draftData: typeof draft) => {
				const siteUrl = 'https://ecohubs.community';
				const previewUrl = `${siteUrl}/blog/${draftData.slug}`;

				return `## Blog Article Publication Proposal

**Title:** ${draftData.title}

**Author:** ${draftData.author}

**Excerpt:**
${draftData.excerpt || 'No excerpt provided.'}

**Tags:** ${draftData.tags?.join(', ') || 'None'}

**Preview:** [View Draft](${previewUrl})

---

**Note:** This proposal is for publishing a blog article draft. Vote "Publish" to approve, "Reject" to decline, or "Needs Revision" if changes are required before publication.

*Created: ${new Date(draftData.updated_at).toLocaleString()}*
`;
			};

			// Prepare proposal data
			const proposal = {
				space: snapshotSpace,
				type: 'single-choice',
				title: `Publish Blog Article: ${draft.title}`,
				body: formatDraftForSnapshot(draft),
				choices: ['Publish', 'Reject', 'Needs Revision'],
				start: Math.floor(Date.now() / 1000),
				end: Math.floor(Date.now() / 1000) + votingDuration,
				snapshot: currentBlock,
				plugins: JSON.stringify({}),
				app: 'ecohubs-community'
			};

			// Sign and submit
			const receipt = await client.proposal(compatibleSigner, walletAddress, proposal);

			// Update Ghost custom fields with proposal ID
			await fetch(`/api/blog/drafts/${draft.id}/update-proposal`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ proposalId: receipt.id })
			});

			// Update local state
			drafts = drafts.map((d) =>
				d.id === draft.id
					? { ...d, proposalId: receipt.id, proposalStatus: 'active' as const }
					: d
			);

			message = `Proposal created successfully! ID: ${receipt.id}`;
			creating = null;
		} catch (error) {
			message = `Failed to create proposal: ${error instanceof Error ? error.message : 'Unknown error'}`;
			creating = null;
		}
	}

	async function publishDraft(draft: typeof drafts[0]) {
		if (!draft.proposalId) {
			message = 'No proposal found for this draft';
			return;
		}

		publishing = draft.id;
		message = '';

		try {
			const response = await fetch(`/api/blog/drafts/${draft.id}/publish`, {
				method: 'POST'
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to publish draft');
			}

			// Remove from drafts list (it's now published)
			drafts = drafts.filter((d) => d.id !== draft.id);

			message = 'Draft published successfully!';
			publishing = null;
		} catch (error) {
			message = `Failed to publish: ${error instanceof Error ? error.message : 'Unknown error'}`;
			publishing = null;
		}
	}
</script>

<svelte:head>
	<title>Blog Drafts - Admin Dashboard</title>
	<meta name="description" content="Manage blog drafts and Snapshot proposals" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
	<div class="container mx-auto px-4 py-8 max-w-7xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog Drafts</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Manage blog drafts and create Snapshot proposals for publication voting
			</p>
		</div>

		<!-- Status Message -->
		{#if message}
			<div
				class="p-4 rounded-lg mb-6 flex items-center gap-2 {message.includes('success') || message.includes('successfully')
					? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
					: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'}"
			>
				{#if message.includes('success') || message.includes('successfully')}
					<CheckCircle2 class="w-5 h-5 shrink-0" />
				{:else}
					<AlertCircle class="w-5 h-5 shrink-0" />
				{/if}
				<span class="text-sm">{message}</span>
			</div>
		{/if}

		<!-- Drafts List -->
		<div class="space-y-4">
			{#if drafts.length === 0}
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
					<p class="text-gray-600 dark:text-gray-400 text-center">No drafts found.</p>
				</div>
			{/if}

			{#each drafts as draft}
				<div
					class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
				>
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h3 class="text-xl font-bold text-gray-900 dark:text-white">{draft.title}</h3>
								<span
									class="px-3 py-1 rounded-full text-xs font-semibold {
										draft.proposalStatus === 'none'
											? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
											: draft.proposalStatus === 'active'
												? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
												: draft.isApproved
													? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
													: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
									}"
								>
									{draft.proposalStatus === 'none'
										? 'No Proposal'
										: draft.proposalStatus === 'active'
											? 'Voting Active'
											: draft.isApproved
												? 'Approved'
												: 'Rejected'}
								</span>
							</div>
							<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">By {draft.author}</p>
							<p class="text-xs text-gray-500 dark:text-gray-500">
								Updated: {formatDate(draft.updated_at)}
							</p>
							{#if draft.proposalStatus === 'active' && draft.proposalEnd}
								<p class="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
									<Clock class="w-3 h-3" />
									{formatVotingEnd(draft.proposalEnd)}
								</p>
							{/if}
						</div>
					</div>

					<div class="mb-4">
						<p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{draft.excerpt}</p>
					</div>

					<div class="flex gap-3">
						{#if draft.proposalStatus === 'none'}
							<button
								onclick={() => createProposal(draft)}
								disabled={creating === draft.id}
								class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
							>
								{#if creating === draft.id}
									<Loader2 class="w-4 h-4 animate-spin" />
									Creating...
								{:else}
									<FileText class="w-4 h-4" />
									Create Proposal
								{/if}
							</button>
						{:else if draft.proposalId}
							<a
								href={getProposalUrl(draft.proposalId)}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
							>
								<ExternalLink class="w-4 h-4" />
								View Proposal
							</a>
						{/if}

						{#if draft.isApproved && draft.proposalStatus === 'closed'}
							<button
								onclick={() => publishDraft(draft)}
								disabled={publishing === draft.id}
								class="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
							>
								{#if publishing === draft.id}
									<Loader2 class="w-4 h-4 animate-spin" />
									Publishing...
								{:else}
									<Send class="w-4 h-4" />
									Publish
								{/if}
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
