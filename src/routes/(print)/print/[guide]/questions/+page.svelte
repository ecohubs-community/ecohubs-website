<script lang="ts">
	/**
	 * The questions to ask on a visit, on their own.
	 *
	 * Designed to be carried: a reader prints it, folds it, and writes on it in
	 * somebody's common house. So there is a ruled space beside every question,
	 * and the type is set for a clipboard rather than a screen.
	 */
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const printed = new Date(data.generatedAt).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});

	// One running number across the groups, so a reader can say "question 19"
	// and be understood.
	let counter = $state(0);
</script>

<svelte:head>
	<title>Questions to ask on a visit — {data.guide.title}</title>
</svelte:head>

<section class="sheet">
	<header class="border-b-2 border-ecohubs-deep pb-4">
		<div class="font-mono text-[8.5pt] tracking-[0.2em] text-emerald-800 uppercase">
			EcoHubs Community · {data.guide.title}
		</div>
		<h1 class="mt-2 font-serif text-[22pt] leading-tight text-ecohubs-deep">
			Questions to ask on a visit
		</h1>
		<p class="mt-2 max-w-[130mm] text-[10pt] leading-relaxed text-stone-600">
			{data.total} questions, drawn from every lesson in the guide. Nobody expects you to ask all of
			them — take the ones that matter to you. A community that welcomes several of them has already
			told you something.
		</p>
	</header>

	{#each data.groups as group (group.lesson)}
		<section class="mt-7">
			<h2 class="font-mono text-[8.5pt] tracking-[0.16em] text-emerald-800 uppercase">
				{String(group.order).padStart(2, '0')} · {group.lesson}
			</h2>
			<ul class="mt-3 space-y-2.5">
				{#each group.questions as question (question)}
					{@const n = ++counter}
					<li class="flex gap-3 break-inside-avoid">
						<span class="w-6 shrink-0 pt-px font-mono text-[9pt] text-stone-400">
							{String(n).padStart(2, '0')}
						</span>
						<span class="flex-1 text-[10pt] leading-[1.5] text-stone-800">{question}</span>
						<!-- Somewhere to write the answer down, which is the point of
						     carrying a sheet of paper rather than a phone. -->
						<span
							class="mt-3 w-[52mm] shrink-0 self-start border-b border-dotted border-stone-300"
							aria-hidden="true"
						></span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	<footer class="mt-9 border-t border-stone-300 pt-4 text-[8.5pt] leading-relaxed text-stone-500">
		<p>
			From the {data.guide.title}, as it stood on {printed}. The full guide, with the reasoning
			behind each question, is free at ecohubs.community/learn/guides/{data.guide.slug}.
		</p>
		<p class="mt-1">
			Print it, copy it, translate it. If a question here turns out to be the wrong one to ask, we
			would like to know.
		</p>
	</footer>
</section>
