<script lang="ts">
	/**
	 * A circular progress dial, from the design's `.progring`.
	 *
	 * Rotated so the arc starts at twelve o'clock. The number is repeated in
	 * text beside every use of this, so the ring itself is decorative.
	 */
	let { percent, size = 42 }: { percent: number; size?: number } = $props();

	// r=17 on a 42-unit viewBox, so the stroke sits inside the box.
	const CIRCUMFERENCE = 2 * Math.PI * 17;
	const offset = $derived(CIRCUMFERENCE * (1 - Math.max(0, Math.min(100, percent)) / 100));
</script>

<svg width={size} height={size} viewBox="0 0 42 42" class="shrink-0 -rotate-90" aria-hidden="true">
	<circle cx="21" cy="21" r="17" fill="none" stroke="#ece9e2" stroke-width="4" />
	<circle
		cx="21"
		cy="21"
		r="17"
		fill="none"
		stroke="var(--color-ecohubs-primary)"
		stroke-width="4"
		stroke-linecap="round"
		stroke-dasharray={CIRCUMFERENCE}
		stroke-dashoffset={offset}
		class="transition-[stroke-dashoffset] duration-500"
	/>
</svg>
