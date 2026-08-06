<script lang="ts">
	/**
	 * A short accordion, from the design's `.acc`.
	 *
	 * Native `<details>` rather than a scripted disclosure: it opens without
	 * JavaScript, browsers give it correct keyboard and screen-reader behaviour
	 * for free, and find-in-page reaches text inside a closed one.
	 */
	let { items }: { items: { question: string; answer: string }[] } = $props();
</script>

{#each items as item (item.question)}
	<details class="group border-b border-[#ece9e2]">
		<summary
			class="relative cursor-pointer list-none py-4.5 pr-9 font-serif text-[16.5px] text-ecohubs-deep [&::-webkit-details-marker]:hidden"
		>
			{item.question}
			<span
				aria-hidden="true"
				class="absolute top-4 right-1.5 font-mono text-[17px] text-ecohubs-primary"
			>
				<span class="group-open:hidden">+</span>
				<span class="hidden group-open:inline">–</span>
			</span>
		</summary>
		<div class="max-w-[66ch] pb-5 text-[15.5px] leading-[1.7] text-stone-700">{item.answer}</div>
	</details>
{/each}
