<script lang="ts">
	/**
	 * One quiz component, three modes. See `$lib/learning/quiz.ts` for scoring.
	 *
	 * **Everything the quiz knows is in the server HTML.** Every question,
	 * option, explanation and outcome description renders as real markup, so a
	 * crawler and a no-JS reader get a complete, readable document that simply
	 * does not compute a score. JavaScript only *hides* the outcome reference
	 * list and wires the interaction — the same hidden-after-hydration rule the
	 * depth switch follows.
	 *
	 * Nothing is submitted anywhere. Answers live in component state and
	 * completion in localStorage, so there is no consent question to answer.
	 */
	import { onMount } from 'svelte';
	import { isComplete, score, type Answers, type QuizDefinition } from '$lib/learning/quiz';
	import { getQuizState, setQuizState } from '$lib/learning/storage';
	import { getQuiz } from '../../../content/learning/quizzes';

	// Markdown refers to a quiz by id; a definition may also be passed directly,
	// which is what the tests use.
	let { id, definition: passed }: { id?: string; definition?: QuizDefinition } = $props();

	const definition = $derived(passed ?? (id ? getQuiz(id) : undefined));

	let answers = $state<Answers>({});
	let submitted = $state(false);
	/** Server renders everything expanded; the client collapses it. */
	let enhanced = $state(false);
	/** Which question is on screen once JavaScript takes over. Before that —
	 *  and for a crawler — every question is rendered at once. */
	let step = $state(0);

	onMount(() => {
		enhanced = true;
		if (!definition) return;
		const saved = getQuizState(definition.id);
		if (saved) {
			answers = saved.answers;
			submitted = true;
		}
	});

	const result = $derived(definition ? score(definition, answers) : null);
	const complete = $derived(definition ? isComplete(definition, answers) : false);
	const lastStep = $derived((definition?.questions.length ?? 1) - 1);

	/** Whether the question currently on screen has an answer yet. */
	const currentAnswered = $derived.by(() => {
		const question = definition?.questions[step];
		if (!question) return false;
		const raw = answers[question.id];
		return Array.isArray(raw) ? raw.length > 0 : Boolean(raw);
	});

	function go(delta: number) {
		if (!definition) return;
		step = Math.min(lastStep, Math.max(0, step + delta));
		// Move focus with the question, or a keyboard and screen-reader user is
		// left reading the question that just disappeared.
		requestAnimationFrame(() => document.getElementById(`${definition.id}-q${step}`)?.focus());
	}

	function choose(questionId: string, optionId: string, multiple: boolean) {
		if (!multiple) {
			answers = { ...answers, [questionId]: optionId };
			return;
		}
		const current = answers[questionId];
		const list = Array.isArray(current) ? [...current] : [];
		const i = list.indexOf(optionId);
		if (i >= 0) list.splice(i, 1);
		else list.push(optionId);
		answers = { ...answers, [questionId]: list };
	}

	function isChosen(questionId: string, optionId: string): boolean {
		const current = answers[questionId];
		return Array.isArray(current) ? current.includes(optionId) : current === optionId;
	}

	function submit() {
		if (!definition) return;
		submitted = true;
		setQuizState(definition.id, { answers, completedAt: Date.now() });
	}

	function reset() {
		answers = {};
		submitted = false;
		step = 0;
	}
</script>

{#if !definition}
	<!-- Unknown id. Rendering nothing is better than an error box in an
	     article; the missing registry entry shows up in review. -->
{:else}
	<section
		class="not-prose my-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
		aria-labelledby="quiz-{definition.id}"
	>
		<h2 id="quiz-{definition.id}" class="font-serif text-2xl text-ecohubs-deep">
			{definition.title}
		</h2>
		<p class="mt-2 text-stone-700">{definition.intro}</p>

		{#if enhanced && !submitted}
			<p class="mt-6 font-story text-sm text-stone-500 italic" aria-live="polite">
				Question {step + 1} of {definition.questions.length}
			</p>
		{/if}

		<!-- ── Questions ─────────────────────────────────────────────────────────
	     Every question is rendered. Once hydrated, all but the current one are
	     hidden — so a crawler and a no-JS reader get the whole set as a plain
	     form, while a reader with JavaScript gets one question at a time. -->
		<div class="mt-4 space-y-8">
			{#each definition.questions as question, qi (question.id)}
				{@const picked = isChosen}
				<fieldset class={enhanced && !submitted && qi !== step ? 'hidden' : ''}>
					<legend
						id="{definition.id}-q{qi}"
						class="font-serif text-lg text-ecohubs-deep"
						tabindex="-1"
					>
						<span class="font-story text-stone-400 italic">{qi + 1}.</span>
						{question.prompt}
					</legend>
					{#if question.multiple}
						<p class="mt-1 text-xs text-stone-500">Choose all that apply.</p>
					{/if}

					<div class="mt-3 space-y-2">
						{#each question.options as option (option.id)}
							{@const chosen = picked(question.id, option.id)}
							{@const reveal = submitted && definition.mode === 'check'}
							{@const wrong = reveal && chosen && !option.correct}
							{@const right = reveal && chosen && option.correct}
							{@const missed = reveal && !chosen && option.correct}
							<label
								class="flex gap-3 rounded-xl border p-3 transition-colors
							       {submitted ? 'cursor-default' : 'cursor-pointer'}
							       {wrong
									? 'border-red-300 bg-red-50/60'
									: right || missed
										? 'border-ecohubs-primary bg-emerald-50/60'
										: chosen
											? 'border-ecohubs-dark bg-emerald-50/50'
											: submitted
												? 'border-stone-200'
												: 'border-stone-200 hover:border-stone-300'}"
							>
								<input
									type={question.multiple ? 'checkbox' : 'radio'}
									name="{definition.id}-{question.id}"
									value={option.id}
									checked={chosen}
									disabled={submitted}
									onchange={() => choose(question.id, option.id, Boolean(question.multiple))}
									class="mt-1 shrink-0 accent-ecohubs-dark disabled:opacity-60"
								/>
								<span class="min-w-0">
									<span class="flex flex-wrap items-baseline gap-x-2">
										<span class="text-stone-800">{option.label}</span>
										{#if wrong}
											<span class="text-xs font-medium text-red-700">not this one</span>
										{:else if right}
											<span class="text-xs font-medium text-emerald-700">correct</span>
										{:else if missed}
											<span class="text-xs font-medium text-emerald-700">the answer</span>
										{/if}
									</span>
									{#if option.explanation}
										<!--
											Explanations for *every* option are in the server HTML, which is
											what makes the quiz worth indexing. Once JavaScript takes over,
											only the explanation for the option the reader actually chose is
											shown: the correct option's text is written as confirmation
											("Right. …") and reads as a taunt to someone who picked wrong.
											The wrong options carry their own teaching, so nothing is lost.
										-->
										<span
											class="mt-1 block text-sm {wrong ? 'text-red-800' : 'text-stone-600'}
											       {enhanced && !(reveal && chosen) ? 'hidden' : ''}"
										>
											{option.explanation}
										</span>
									{/if}
								</span>
							</label>
						{/each}
					</div>

					{#if question.href}
						<p class="mt-2 text-sm">
							<a
								href={question.href}
								class="text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
							>
								Where this comes from
							</a>
						</p>
					{/if}
				</fieldset>
			{/each}
		</div>

		<!-- ── Controls ──────────────────────────────────────────────────────────
	     JavaScript-only. Without it the form above stands on its own. -->
		{#if enhanced}
			<div class="mt-8 flex flex-wrap items-center gap-3">
				{#if !submitted && step > 0}
					<button
						type="button"
						onclick={() => go(-1)}
						class="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-600 transition-colors hover:border-ecohubs-dark hover:text-ecohubs-deep"
					>
						Back
					</button>
				{/if}

				{#if !submitted && step < lastStep}
					<button
						type="button"
						onclick={() => go(1)}
						disabled={!currentAnswered}
						class="rounded-full bg-ecohubs-dark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecohubs-deep disabled:cursor-not-allowed disabled:opacity-40"
					>
						Next
					</button>
				{:else if !submitted}
					<button
						type="button"
						onclick={submit}
						disabled={!complete}
						class="rounded-full bg-ecohubs-dark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecohubs-deep disabled:cursor-not-allowed disabled:opacity-40"
					>
						{definition.mode === 'check' ? 'Check my answers' : 'See the result'}
					</button>
				{/if}

				{#if submitted}
					<button
						type="button"
						onclick={reset}
						class="text-sm text-stone-500 underline underline-offset-2 hover:text-ecohubs-deep"
					>
						Start again
					</button>
				{/if}
			</div>
		{/if}

		<!-- ── Result ────────────────────────────────────────────────────────── -->
		{#if submitted}
			<div class="mt-8 border-t border-stone-200 pt-6" aria-live="polite">
				{#if definition.mode === 'check'}
					<p class="font-serif text-xl text-ecohubs-deep">
						{result?.correct} of {result?.total} right
					</p>
					<p class="mt-2 text-sm text-stone-600">
						The note under each answer you chose says why. Start again to change them.
					</p>
				{:else if definition.mode === 'weighted'}
					{@const top = result?.outcomes[0]}
					{#if top && top.score > 0}
						<p class="kicker text-emerald-700">Closest fit</p>
						<h3 class="mt-2 font-serif text-2xl text-ecohubs-deep">{top.outcome.title}</h3>
						<p class="mt-2 leading-relaxed text-stone-700">{top.outcome.description}</p>
						{#if top.outcome.href}
							<p class="mt-3">
								<a
									href={top.outcome.href}
									class="text-ecohubs-dark underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
								>
									Read more about {top.outcome.title.toLowerCase()}
								</a>
							</p>
						{/if}

						<!-- Ranked bars, not a pie: these are independent scores, and a
					     pie would imply parts of a single whole. -->
						<p class="kicker mt-8 mb-3 text-stone-500">How the rest scored</p>
						<table class="w-full text-sm">
							<caption class="sr-only">Your score for each community type</caption>
							<tbody>
								{#each result?.outcomes ?? [] as item (item.outcome.id)}
									<tr>
										<th scope="row" class="w-40 py-1.5 pr-3 text-left font-normal text-stone-600">
											{item.outcome.title}
										</th>
										<td class="py-1.5">
											<span class="flex items-center gap-2">
												<span
													class="h-2 rounded-full bg-ecohubs-primary"
													style="width: {Math.round(item.share * 100)}%"
												></span>
												<span class="shrink-0 text-xs text-stone-500">
													{Math.round(item.share * 100)}%
												</span>
											</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				{:else}
					<p class="kicker mb-3 text-stone-500">Your profile</p>
					<table class="w-full text-sm">
						<caption class="sr-only">Your score in each dimension</caption>
						<tbody>
							{#each result?.dimensions ?? [] as item (item.dimension.id)}
								<tr>
									<th scope="row" class="w-44 py-1.5 pr-3 text-left font-normal text-stone-600">
										{item.dimension.label}
									</th>
									<td class="py-1.5">
										<span class="flex items-center gap-2">
											<span
												class="h-2 rounded-full bg-ecohubs-primary"
												style="width: {Math.round(item.share * 100)}%"
											></span>
											<span class="shrink-0 text-xs text-stone-500">
												{Math.round(item.share * 100)}%
											</span>
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		{/if}

		<!-- ── Outcome reference ─────────────────────────────────────────────────
	     Rendered for everyone, then collapsed once JavaScript takes over. This
	     is what makes the quiz indexable: the outcome descriptions are real
	     content in the server response, not strings hidden inside a bundle. -->
		{#if definition.outcomes?.length}
			<section class="mt-8 border-t border-stone-200 pt-6 {enhanced && submitted ? 'hidden' : ''}">
				<h3 class="kicker mb-4 text-stone-500">What each result means</h3>
				<dl class="space-y-4">
					{#each definition.outcomes as outcome (outcome.id)}
						<div>
							<dt class="font-serif text-lg text-ecohubs-deep">{outcome.title}</dt>
							<dd class="mt-1 text-sm leading-relaxed text-stone-700">{outcome.description}</dd>
						</div>
					{/each}
				</dl>
			</section>
		{/if}

		{#if definition.dimensions?.length}
			<section class="mt-8 border-t border-stone-200 pt-6 {enhanced && submitted ? 'hidden' : ''}">
				<h3 class="kicker mb-4 text-stone-500">What this measures</h3>
				<dl class="space-y-4">
					{#each definition.dimensions as dimension (dimension.id)}
						<div>
							<dt class="font-serif text-lg text-ecohubs-deep">{dimension.label}</dt>
							<dd class="mt-1 text-sm leading-relaxed text-stone-700">{dimension.description}</dd>
						</div>
					{/each}
				</dl>
			</section>
		{/if}
	</section>
{/if}
