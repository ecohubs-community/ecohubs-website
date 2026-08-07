<script lang="ts">
	/** Mark a lesson as read. Feeds the progress bar in the rail. */
	import { onMount } from 'svelte';
	import { isRead, toggleRead } from '$lib/learning/storage';
	import { PILL, PILL_OFF, PILL_ON } from './pill';

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
		class="{PILL} {done ? PILL_ON : PILL_OFF}"
	>
		<!-- A checkbox that fills in, rather than a glyph that swaps. -->
		<span
			aria-hidden="true"
			class="grid size-4 place-items-center rounded-[5px] border-[1.5px] text-[10px] text-white
			       {done ? 'border-ecohubs-primary bg-ecohubs-primary' : 'border-stone-400'}"
		>
			{done ? '✓' : ''}
		</span>
		{done ? 'Read' : 'Mark as read'}
	</button>
{/if}
