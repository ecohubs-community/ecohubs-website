<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { applicationQuestions, applicationSchema } from '$lib/config/application-questions';
	import { Check, LoaderCircle, AlertCircle } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { PageData } from '../../routes/(web)/join/$types';
	import { onMount } from 'svelte';
	import { Turnstile } from 'svelte-turnstile';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let currentPage = $state(1);
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	let isRateLimited = $state(false);
	let turnstileToken = $state<string | null>(null);
	let turnstileError = $state<string | null>(null);
	const turnstileEnabled = !!PUBLIC_TURNSTILE_SITE_KEY;
	
	// Local state for all inputs on current page
	let pageInputValues = $state<Record<string, string | string[] | number>>({});

	// Initialize superForm
	const superform = superForm(data.form, {
		// @ts-ignore - Zod v3/v4 type compatibility
		validators: zodClient(applicationSchema),
		dataType: 'json',
		resetForm: false,
		onSubmit: async ({ cancel }) => {
			// If not on last page, cancel default submission and validate page
			if (currentPage !== totalPages) {
				cancel();
				
				// Validate all questions on current page
				const validationErrors = validateCurrentPage();
				
				if (validationErrors.length === 0) {
					// Sync all inputs to form, save, and move to next page
					syncPageToForm();
					saveToLocalStorage();
					currentPage++;
				} else {
					// Show validation errors
					validationErrors.forEach((error) => {
						$errors[error.questionId as keyof typeof $errors] = error.issues;
					});
					scrollToFirstError();
				}
			} else {
				// On last page, validate before submission
				const validationErrors = validateCurrentPage();

				// Check Turnstile verification (skip when not configured)
				if (turnstileEnabled && !turnstileToken) {
					cancel();
					turnstileError = 'Please complete the verification challenge.';
					return;
				}

				if (validationErrors.length === 0) {
					syncPageToForm();
					saveToLocalStorage();
					isSubmitting = true;
					submitError = '';
					isRateLimited = false;
					turnstileError = null;
				} else {
					cancel();
					validationErrors.forEach((error) => {
						$errors[error.questionId as keyof typeof $errors] = error.issues;
					});
					scrollToFirstError();
				}
			}
		},
		onResult: ({ result }) => {
			isSubmitting = false;
			if (result.type === 'success') {
				submitSuccess = true;
				if (typeof window !== 'undefined') {
					localStorage.removeItem('ecohubs-application-draft');
				}
			} else if (result.type === 'failure') {
				const data = result.data as { error?: string; isRateLimited?: boolean } | undefined;
				if (data?.isRateLimited) {
					isRateLimited = true;
					submitError = data.error || 'Too many applications submitted. Please try again later.';
				} else if (data?.error) {
					submitError = data.error;
				} else {
					submitError = 'Failed to submit application. Please try again.';
				}
				// Reset Turnstile on failure
				turnstileToken = null;
			}
		},
	});
	
	const { form, errors, enhance } = superform;

	onMount(() => {
		const saved = localStorage.getItem('ecohubs-application-draft');
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				Object.assign($form, parsed);
			} catch (e) {
				console.error('Failed to load draft:', e);
			}
		}
		// Initialize page inputs from form
		loadPageInputs();
	});

	// Filter visible questions based on conditionals
	const visibleQuestions = $derived(
		applicationQuestions.filter((q) => {
			if (!q.conditionalOn) return true;
			const formValue = $form[q.conditionalOn.questionId];
			// Handle checkbox arrays - check if array includes the value
			if (Array.isArray(formValue)) {
				return formValue.includes(q.conditionalOn.value);
			}
			// Handle single values (radio, select, etc.)
			return formValue === q.conditionalOn.value;
		})
	);

	// Group questions by page
	const questionsByPage = $derived.by(() => {
		const grouped: Record<number, typeof visibleQuestions> = {};
		visibleQuestions.forEach((q) => {
			const page = q.page || 1;
			if (!grouped[page]) {
				grouped[page] = [];
			}
			grouped[page].push(q);
		});
		return grouped;
	});

	// Get total number of pages
	const totalPages = $derived(Math.max(...Object.keys(questionsByPage).map(Number), 1));

	// Get questions for current page
	const currentPageQuestions = $derived(questionsByPage[currentPage] || []);

	const progress = $derived((currentPage / totalPages) * 100);
	const isLastPage = $derived(currentPage === totalPages);

	// Load page inputs from form when page changes
	$effect(() => {
		// Track currentPage to reload inputs when page changes
		const page = currentPage;
		loadPageInputs();
	});

	// Load inputs for current page from form
	function loadPageInputs() {
		const inputs: Record<string, string | string[] | number> = {};
		currentPageQuestions.forEach((q: typeof visibleQuestions[number]) => {
			const formValue = $form[q.id];
			if (q.type === 'scale') {
				inputs[q.id] = typeof formValue === 'number' ? formValue : (formValue ? Number(formValue) : 0);
			} else if (Array.isArray(formValue)) {
				inputs[q.id] = formValue;
			} else {
				inputs[q.id] = String(formValue || '');
			}
		});
		pageInputValues = inputs;
	}

	// Sync all page inputs to form
	function syncPageToForm() {
		currentPageQuestions.forEach((q: typeof visibleQuestions[number]) => {
			const value = pageInputValues[q.id];
			if (q.type === 'scale') {
				$form[q.id as keyof typeof $form] = (typeof value === 'number' ? value : Number(value || 0)) as any;
			} else {
				$form[q.id as keyof typeof $form] = value as any;
			}
		});
	}

	// Validate all questions on current page
	function validateCurrentPage(): Array<{ questionId: string; issues: any[] }> {
		const errors: Array<{ questionId: string; issues: any[] }> = [];
		
		currentPageQuestions.forEach((q: typeof visibleQuestions[number]) => {
			const value = pageInputValues[q.id];
			const validationResult = q.validationSchema.safeParse(value);
			
			if (!validationResult.success) {
				const error = JSON.parse(JSON.stringify(validationResult.error));
				errors.push({
					questionId: q.id,
					issues: error.issues,
				});
			}
		});
		
		return errors;
	}

	// Save form to localStorage
	function saveToLocalStorage() {
		if (typeof window !== 'undefined' && !submitSuccess) {
			localStorage.setItem('ecohubs-application-draft', JSON.stringify($form));
		}
	}

	function scrollToFirstError() {
		setTimeout(() => {
			const errorElement = document.querySelector('[role="alert"]');
			errorElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}, 100);
	}

	function goToPrevious() {
		if (currentPage > 1) {
			syncPageToForm();
			saveToLocalStorage();
			// Clear errors for current page
			currentPageQuestions.forEach((q: typeof visibleQuestions[number]) => {
				delete $errors[q.id];
			});
			currentPage--;
		}
	}

	function handleInput(questionId: string, value: string | number) {
		pageInputValues[questionId] = value;
		// Immediately sync to form for conditional field reactivity
		$form[questionId as keyof typeof $form] = value as any;
		// Clear error for this question
		if ($errors[questionId]) {
			delete $errors[questionId];
		}
	}

	function handleCheckboxChange(questionId: string, option: string, checked: boolean) {
		const current = Array.isArray(pageInputValues[questionId]) 
			? (pageInputValues[questionId] as string[]) 
			: [];
		const newValue = checked 
			? [...current, option]
			: current.filter((v) => v !== option);
		pageInputValues[questionId] = newValue;
		// Immediately sync to form for conditional field reactivity
		$form[questionId as keyof typeof $form] = newValue as any;
		// Clear error for this question
		if ($errors[questionId]) {
			delete $errors[questionId];
		}
	}

	function handleScaleChange(questionId: string, value: number) {
		pageInputValues[questionId] = value;
		// Immediately sync to form for conditional field reactivity
		$form[questionId as keyof typeof $form] = value as any;
		// Clear error for this question
		if ($errors[questionId]) {
			delete $errors[questionId];
		}
	}

	function getError(questionId: string) {
		return $errors[questionId as keyof typeof $errors];
	}
</script>

{#if submitSuccess}
	<div class="bg-white rounded-3xl border border-stone-200/70 soft-shadow p-10 md:p-14 text-center" in:fade={{ duration: 300 }}>
		<div class="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-7">
			<Check class="w-8 h-8 text-emerald-700" aria-hidden="true" strokeWidth={2} />
		</div>
		<div class="kicker text-emerald-700 mb-4">Received with care</div>
		<h2 class="font-serif text-3xl md:text-[40px] text-ecohubs-deep leading-tight mb-5">
			Thank you<span class="font-story italic font-light text-stone-400">.</span><br />
			<em class="font-story italic font-normal text-ecohubs-primary">We're glad you wrote.</em>
		</h2>
		<p class="text-stone-700 leading-relaxed max-w-xl mx-auto mb-3">
			Your application has arrived. Someone here will read it slowly — not scan it — because that's
			how we want this community to feel from the very first moment.
		</p>
		<p class="text-stone-500 text-sm leading-relaxed max-w-md mx-auto font-story italic">
			You'll hear back within a few days. Check your email (including spam) for our reply.
		</p>
		<a
			href="/"
			class="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all group"
		>
			Back to home
			<span class="transition-transform group-hover:translate-x-0.5">→</span>
		</a>
	</div>
{:else}
	<div class="relative bg-white rounded-3xl border border-stone-200/70 soft-shadow overflow-hidden">
		<!-- Progress bar pinned to the top edge of the card -->
		<div class="absolute top-0 inset-x-0 h-1 bg-stone-200/70 z-10" aria-hidden="true">
			<div
				class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-out"
				style="width: {progress}%"
			></div>
		</div>

		<div class="p-7 md:p-10 lg:p-12">
			<!-- Page label -->
			<div class="flex items-center justify-between mb-8">
				<span class="kicker text-emerald-700">
					Chapter {currentPage} of {totalPages}
				</span>
				<span class="text-xs text-stone-500 font-story italic">
					{Math.round(progress)}% complete
				</span>
			</div>

		<form method="POST" use:enhance class="min-h-[400px]">
			{#key currentPage}
				<div
					in:fly={{ x: 50, duration: 300, easing: cubicOut, delay: 300 }}
					out:fly={{ x: -50, duration: 300, easing: cubicOut }}
					class="mb-8 space-y-8"
				>
					{#each currentPageQuestions as question (question.id)}
						{@const questionError = getError(question.id)}
						{@const questionValue = pageInputValues[question.id] || (question.type === 'scale' ? 0 : '')}
						
						<div class="question-block">
							<!-- Question -->
							<h3 class="font-serif text-xl md:text-[22px] text-ecohubs-deep leading-snug mb-2">
								{question.question}
							</h3>

							{#if question.description}
								<p class="text-stone-600 leading-relaxed mb-5">{question.description}</p>
							{/if}

							<!-- Input Field -->
							<div class="mb-4">
								{#if question.type === 'text' || question.type === 'email' || question.type === 'number'}
									<input
										type={question.type}
										name={question.id}
										value={String(questionValue)}
										oninput={(e) => handleInput(question.id, e.currentTarget.value)}
										placeholder={question.placeholder}
										aria-invalid={questionError ? 'true' : 'false'}
										class="w-full px-5 py-3.5 text-base text-ecohubs-deep placeholder:text-stone-400 bg-ecohubs-ivory/60 border rounded-2xl transition-all focus:outline-none focus:bg-white {questionError ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500' : 'border-stone-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500'}"
									/>
								{:else if question.type === 'textarea'}
									<textarea
										name={question.id}
										value={String(questionValue)}
										oninput={(e) => handleInput(question.id, e.currentTarget.value)}
										placeholder={question.placeholder}
										rows="6"
										aria-invalid={questionError ? 'true' : 'false'}
										class="w-full px-5 py-4 text-base text-ecohubs-deep placeholder:text-stone-400 bg-ecohubs-ivory/60 border rounded-2xl transition-all resize-none focus:outline-none focus:bg-white {questionError ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500' : 'border-stone-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500'}"
									></textarea>
									{#if questionValue}
										<p class="text-xs text-stone-500 mt-2 font-story italic">
											{String(questionValue).length} characters
										</p>
									{/if}
								{:else if question.type === 'select'}
									<select
										name={question.id}
										value={String(questionValue)}
										onchange={(e) => handleInput(question.id, e.currentTarget.value)}
										aria-invalid={questionError ? 'true' : 'false'}
										class="w-full px-5 py-3.5 text-base text-ecohubs-deep bg-ecohubs-ivory/60 border rounded-2xl transition-all focus:outline-none focus:bg-white {questionError ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500' : 'border-stone-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500'}"
									>
										<option value="">Select an option…</option>
										{#each question.options || [] as option}
											<option value={option}>{option}</option>
										{/each}
									</select>
								{:else if question.type === 'radio'}
									<div class="space-y-2.5" role="radiogroup" aria-invalid={questionError ? 'true' : 'false'}>
										{#each question.options || [] as option}
											<label class="flex items-center gap-3 px-4 py-3 border rounded-2xl cursor-pointer transition-all {String(questionValue) === option ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : questionError ? 'border-red-200 hover:border-red-300 bg-white' : 'border-stone-200 hover:border-emerald-300 hover:bg-ecohubs-ivory/40 bg-white'}">
												<input
													type="radio"
													name={question.id}
													value={option}
													checked={String(questionValue) === option}
													onchange={() => handleInput(question.id, option)}
													class="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
												/>
												<span class="text-base text-stone-800">{option}</span>
											</label>
										{/each}
									</div>
								{:else if question.type === 'checkbox'}
									<div class="space-y-2.5" role="group">
										{#each question.options || [] as option}
											{@const isChecked = Array.isArray(questionValue) && questionValue.includes(option)}
											<label class="flex items-center gap-3 px-4 py-3 border rounded-2xl cursor-pointer transition-all {isChecked ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : questionError ? 'border-red-200 hover:border-red-300 bg-white' : 'border-stone-200 hover:border-emerald-300 hover:bg-ecohubs-ivory/40 bg-white'}">
												<input
													type="checkbox"
													name={`${question.id}[]`}
													value={option}
													checked={isChecked}
													onchange={(e) => handleCheckboxChange(question.id, option, e.currentTarget.checked)}
													class="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
												/>
												<span class="text-base text-stone-800">{option}</span>
											</label>
										{/each}
									</div>
								{:else if question.type === 'scale'}
									{@const scaleValue = typeof questionValue === 'number' ? questionValue : Number(questionValue) || 0}
									<div class="scale-input">
										{#if question.scaleLabels?.min || question.scaleLabels?.max}
											<div class="flex items-center justify-between mb-3 text-xs tracking-wide text-stone-500 font-story italic">
												{#if question.scaleLabels?.min}
													<span>{question.scaleLabels.min}</span>
												{:else}
													<span></span>
												{/if}
												{#if question.scaleLabels?.max}
													<span>{question.scaleLabels.max}</span>
												{:else}
													<span></span>
												{/if}
											</div>
										{/if}
										<div class="grid grid-cols-5 md:grid-cols-10 gap-2" role="radiogroup" aria-invalid={questionError ? 'true' : 'false'}>
											{#each Array.from({ length: 10 }, (_, i) => i + 1) as num}
												{@const isSelected = scaleValue === num}
												<label class="relative flex items-center justify-center aspect-square border rounded-xl cursor-pointer transition-all font-serif text-base {isSelected ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm' : questionError ? 'border-red-200 text-stone-700 hover:border-red-300 bg-white' : 'border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-ecohubs-ivory/40 bg-white'}">
													<input
														type="radio"
														name={question.id}
														value={num}
														checked={isSelected}
														onchange={() => handleScaleChange(question.id, num)}
														class="sr-only"
													/>
													<span>{num}</span>
												</label>
											{/each}
										</div>
										<input
											type="hidden"
											name={question.id}
											value={scaleValue}
										/>
									</div>
								{/if}
							</div>

							<!-- Error Message -->
							{#if (questionError as any)?.[0]?.message}
								<div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2" role="alert" in:fly={{ y: -10, duration: 200 }}>
									<AlertCircle class="w-4 h-4 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
									<p class="text-red-700 text-sm">
										{(questionError as any)?.[0]?.message}
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/key}

			<!-- Hidden inputs to ensure all values are submitted -->
			{#each Object.entries($form) as [key, value]}
				{#if value !== undefined && value !== ''}
					{#if Array.isArray(value)}
						{#each value as item}
							<input type="hidden" name={`${key}[]`} value={String(item)} />
						{/each}
					{:else}
						<input type="hidden" name={key} value={String(value)} />
					{/if}
				{/if}
			{/each}

			<!-- Turnstile hidden input -->
			{#if turnstileToken}
				<input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
			{/if}

			<!-- Turnstile Widget on Last Page -->
			{#if isLastPage && turnstileEnabled}
				<div class="mb-6 flex justify-center">
					<Turnstile
						siteKey={PUBLIC_TURNSTILE_SITE_KEY}
						on:turnstile-callback={(e) => {
							turnstileToken = e.detail.token;
							turnstileError = null;
						}}
						on:turnstile-error={() => {
							turnstileError = 'Verification failed. Please try again.';
							turnstileToken = null;
						}}
						on:turnstile-expired={() => {
							turnstileError = 'Verification expired. Please try again.';
							turnstileToken = null;
						}}
						theme="light"
					/>
				</div>
				{#if turnstileError}
					<div class="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2" role="alert" in:fly={{ y: -10, duration: 200 }}>
						<AlertCircle class="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
						<p class="text-sm text-red-700">{turnstileError}</p>
					</div>
				{/if}
			{/if}

			<!-- Navigation Buttons -->
			<div class="flex items-center justify-between gap-4 pt-7 border-t border-stone-200/70">
				<button
					type="button"
					onclick={goToPrevious}
					disabled={currentPage === 1}
					class="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-stone-600 font-medium rounded-full transition-colors hover:text-ecohubs-deep hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
				>
					<span class="transition-transform group-hover:-translate-x-0.5" aria-hidden="true">←</span>
					<span>Back</span>
				</button>

				{#if isLastPage}
					<button
						type="submit"
						disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
						class="inline-flex items-center gap-2 px-7 py-3.5 bg-ecohubs-dark text-white text-sm font-medium rounded-full hover:bg-ecohubs-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-md"
					>
						{#if isSubmitting}
							<LoaderCircle class="w-4 h-4 animate-spin" aria-hidden="true" />
							<span>Sending…</span>
						{:else}
							<span>Send my application</span>
							<span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
						{/if}
					</button>
				{:else}
					<button
						type="submit"
						class="inline-flex items-center gap-2 px-7 py-3.5 bg-ecohubs-dark text-white text-sm font-medium rounded-full hover:bg-ecohubs-deep transition-all group shadow-sm hover:shadow-md"
					>
						<span>Continue</span>
						<span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
					</button>
				{/if}
			</div>

			{#if submitError}
				<div class="mt-5 bg-red-50 border border-red-200 rounded-2xl p-4" role="alert" in:fly={{ y: -10, duration: 200 }}>
					<div class="flex items-start gap-3">
						<AlertCircle class="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
						<div>
							<p class="font-serif text-red-800 text-base">Submission failed</p>
							<p class="text-sm text-red-700 mt-1">{submitError}</p>
							{#if isRateLimited}
								<p class="text-sm text-red-600 mt-2 font-story italic">Please wait about an hour before trying again.</p>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</form>

		<!-- Draft Autosave Indicator -->
		<p class="text-xs text-stone-400 text-center mt-7 font-story italic">
			Your progress is saved automatically as you go.
		</p>
		</div>
	</div>
{/if}

