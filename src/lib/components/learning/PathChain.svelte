<script lang="ts">
	/**
	 * The steps of a path, as a chain: a numbered dot per step on a vertical
	 * line, filling in as they are ticked off.
	 *
	 * Ticking a step marks its *lesson* read, rather than keeping a separate
	 * per-path tally. The design does the latter, which would let a lesson be
	 * finished in one place and unread in another — and would double-count a
	 * lesson that two paths share.
	 *
	 * The design makes the whole row one button with an "Open lesson" link
	 * nested inside it. Nested interactive elements are ambiguous to a keyboard
	 * and invalid HTML, so the toggle and the link are siblings here: the row
	 * ticks, the link below it opens.
	 */
	import Icon from '$lib/components/Icon.svelte';
	import { META } from './card';

	export interface ChainStep {
		slug: string;
		title: string;
		summary: string;
		minutes: number;
		href: string;
	}

	let {
		steps,
		read,
		onToggle,
		endsAt
	}: {
		steps: ChainStep[];
		/** Which lesson slugs are done. Empty on the server. */
		read: Record<string, unknown>;
		onToggle: (slug: string) => void;
		endsAt?: { label: string; href: string };
	} = $props();

	const done = $derived(steps.map((s) => !!read[s.slug]));
	/** The first unfinished step — the one the reader is on. */
	const nextIndex = $derived(done.indexOf(false));
	const complete = $derived(nextIndex === -1);
</script>

<!-- The connecting line is a pseudo-element so it cannot be mistaken for a step
     by assistive tech, and stops short of the last dot. -->
<ol
	class="relative pl-[38px] before:absolute before:top-3.5 before:bottom-7 before:left-[15px] before:w-px before:bg-stone-200 before:content-['']"
>
	{#each steps as step, i (step.slug)}
		{@const isDone = done[i]}
		{@const isNext = i === nextIndex}
		<li class="relative pb-1 {i > 0 ? 'mt-2.5' : ''}">
			<span
				aria-hidden="true"
				class="absolute top-3.5 -left-[38px] z-10 grid size-[31px] place-items-center rounded-full border font-mono text-[10.5px] transition-all duration-200
				       {isDone
					? 'border-ecohubs-primary bg-ecohubs-primary text-white'
					: isNext
						? 'border-ecohubs-primary bg-white text-emerald-700 shadow-[0_0_0_4px_rgba(5,150,105,0.11)]'
						: 'border-stone-200 bg-white text-stone-500'}"
			>
				{#if isDone}
					<Icon icon="tabler:check" width="13" height="13" />
				{:else}
					{String(i + 1).padStart(2, '0')}
				{/if}
			</span>

			<button
				type="button"
				onclick={() => onToggle(step.slug)}
				aria-pressed={isDone}
				class="flex w-full items-start gap-4 rounded-2xl border px-4.5 py-3.5 text-left transition-colors
				       {isNext
					? 'border-ecohubs-primary/30 bg-white'
					: 'border-transparent hover:border-stone-200/90 hover:bg-[#faf9f5]'}"
			>
				<span class="min-w-0 flex-1">
					<span
						class="block font-serif text-[16.5px] leading-[1.35] {isDone
							? 'text-stone-500'
							: 'text-ecohubs-deep'}"
					>
						{step.title}
					</span>
					<span class="mt-0.5 block max-w-[56ch] text-[13.5px] leading-[1.55] text-stone-500">
						{step.summary}
					</span>
					<span class="sr-only">{isDone ? 'Done' : 'Not done'} — click to change</span>
				</span>
				<span class="{META} hidden pt-1 whitespace-nowrap sm:block">{step.minutes} min</span>
			</button>

			<a
				href={step.href}
				class="mt-1 ml-4.5 inline-block text-[12.5px] text-ecohubs-primary hover:text-ecohubs-dark"
			>
				Open lesson →
			</a>
		</li>
	{/each}

	<!-- The end of the path, so finishing it looks like an arrival. -->
	<li class="relative mt-2.5 pb-1">
		<span
			aria-hidden="true"
			class="absolute top-3.5 -left-[38px] z-10 grid size-[31px] place-items-center rounded-full border transition-all duration-200
			       {complete
				? 'border-ecohubs-primary bg-ecohubs-primary text-white'
				: 'border-stone-200 bg-white text-stone-400'}"
		>
			<Icon icon="tabler:check" width="13" height="13" />
		</span>
		<div class="flex items-start gap-4 px-4.5 py-3.5">
			<span>
				<span class="block font-serif text-[16.5px] leading-[1.35] text-ecohubs-deep">
					Path complete
				</span>
				<span class="mt-0.5 block text-[13.5px] leading-[1.55] text-stone-500">
					{#if endsAt}
						Then:
						<a href={endsAt.href} class="text-ecohubs-dark underline underline-offset-2">
							{endsAt.label}
						</a>.
					{:else}
						Then: talk to someone who has done it.
					{/if}
				</span>
			</span>
		</div>
	</li>
</ol>
