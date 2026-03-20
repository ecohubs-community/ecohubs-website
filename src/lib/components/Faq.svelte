<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { marked } from 'marked';

	interface FaqItem {
		question: string;
		answer: string;
	}

	interface Props {
		title?: string;
		items: FaqItem[];
		id?: string;
	}

	let { title = 'Frequently Asked Questions', items, id = 'faq' }: Props = $props();

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<Section spacing="lg" {id}>
	<div class="mx-auto max-w-3xl">
		<div class="mb-12 text-center">
			<h2 class="font-serif text-4xl font-bold text-ecohubs-dark">{title}</h2>
		</div>

		<div class="space-y-4">
			{#each items as item, i}
				{@const isOpen = openIndex === i}
				{@const panelId = `faq-panel-${id}-${i}`}
				{@const headingId = `faq-heading-${id}-${i}`}
				<div
					class="faq-item overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 {isOpen ? 'shadow-md border-emerald-200' : 'border-gray-100'}"
				>
					<button
						id={headingId}
						class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
						aria-expanded={isOpen}
						aria-controls={panelId}
						onclick={() => toggle(i)}
					>
						<span
							class="text-lg font-bold transition-colors duration-200"
							class:text-ecohubs-primary={isOpen}
							class:text-gray-900={!isOpen}
						>
							{item.question}
						</span>
						<span
							class="flex-shrink-0 transition-all duration-300"
							class:text-ecohubs-primary={isOpen}
							class:text-gray-400={!isOpen}
							class:rotate-180={isOpen}
						>
							<ChevronDown size={20} />
						</span>
					</button>

					<div
						id={panelId}
						role="region"
						aria-labelledby={headingId}
						class="answer-grid"
						class:open={isOpen}
					>
						<div class="answer-inner">
							<div class="px-6 pb-6 pt-0">
								<div class="prose prose-emerald max-w-none text-gray-600 prose-p:leading-relaxed prose-a:text-ecohubs-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900">
									{@html marked.parse(item.answer)}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<style>
	.answer-grid {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms ease;
	}

	.answer-grid.open {
		grid-template-rows: 1fr;
	}

	.answer-inner {
		overflow: hidden;
		min-height: 0;
	}
</style>
