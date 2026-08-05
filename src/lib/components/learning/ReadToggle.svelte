<script lang="ts">
	/** Mark a lesson as read. Feeds the progress bar in the rail. */
	import { onMount } from 'svelte';
	import { isRead, toggleRead } from '$lib/learning/storage';

	let { id }: { id: string } = $props();

	let done = $state(false);
	let ready = $state(false);

	onMount(() => {
		ready = true;
		done = isRead(id);
	});
</script>

{#if ready}
	<button
		type="button"
		onclick={() => (done = toggleRead(id))}
		aria-pressed={done}
		class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors
		       {done
			? 'border-ecohubs-dark bg-emerald-50 text-ecohubs-deep'
			: 'border-stone-300 text-stone-600 hover:border-ecohubs-dark hover:text-ecohubs-deep'}"
	>
		<span aria-hidden="true">{done ? '✓' : '○'}</span>
		{done ? 'Read' : 'Mark as read'}
	</button>
{/if}
