<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { applicationQuestions, applicationSchema } from '$lib/config/application-questions';
	import { ArrowLeft, ArrowRight, Check, ClockIcon, LoaderCircle, AlertCircle } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { PageData } from '../../routes/join/$types';
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

				// Check Turnstile verification
				if (!turnstileToken) {
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
	<div class="text-center py-12" in:fade={{ duration: 300 }}>
		<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
			<Check class="w-10 h-10 text-green-600" aria-hidden="true" />
		</div>
		<h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">
			Application Submitted! 🌱
		</h2>
		<p class="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
			Thank you for your interest in EcoHubs. We've received your application and will review it carefully.
		</p>
		<p class="text-sm text-gray-500">
			You'll hear from us within 7-10 days. Check your email (including spam folder) for updates.
		</p>
		<div class="mt-8">
			<a
				href="/"
				class="inline-flex items-center gap-2 px-6 py-3 bg-ecohubs-primary text-white font-medium rounded-lg hover:bg-ecohubs-dark transition-colors"
			>
				Return Home
			</a>
		</div>
	</div>
{:else}
	<div class="max-w-3xl mx-auto">
		<!-- Time Estimate Badge -->
		<div class="mb-6 flex items-center justify-center">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 text-gray-500 rounded-full text-sm font-medium">
				<ClockIcon class="w-4 h-4" aria-hidden="true" />
				<span>20-25 min</span>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-2">
				<span class="text-sm font-medium text-gray-600">
					Page {currentPage} of {totalPages}
				</span>
				<span class="text-sm font-medium text-ecohubs-primary">
					{Math.round(progress)}% Complete
				</span>
			</div>
			<div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
				<div
					class="h-full bg-ecohubs-primary transition-all duration-500 ease-out"
					style="width: {progress}%"
				></div>
			</div>
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
							<h3 class="text-lg md:text-xl font-serif font-bold text-gray-900 mb-2">
								{question.question}
							</h3>
							
							{#if question.description}
								<p class="text-gray-600 mb-4">{question.description}</p>
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
										class="w-full px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 border-2 rounded-xl transition-all {questionError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
									/>
								{:else if question.type === 'textarea'}
									<textarea
										name={question.id}
										value={String(questionValue)}
										oninput={(e) => handleInput(question.id, e.currentTarget.value)}
										placeholder={question.placeholder}
										rows="6"
										aria-invalid={questionError ? 'true' : 'false'}
										class="w-full px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 border-2 rounded-xl transition-all resize-none {questionError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
									></textarea>
									{#if questionValue}
										<p class="text-sm text-gray-500 mt-2">
											{String(questionValue).length} characters
										</p>
									{/if}
								{:else if question.type === 'select'}
									<select
										name={question.id}
										value={String(questionValue)}
										onchange={(e) => handleInput(question.id, e.currentTarget.value)}
										aria-invalid={questionError ? 'true' : 'false'}
										class="w-full px-4 py-4 text-lg text-gray-900 border-2 rounded-xl transition-all {questionError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
									>
										<option value="">Select an option...</option>
										{#each question.options || [] as option}
											<option value={option}>{option}</option>
										{/each}
									</select>
								{:else if question.type === 'radio'}
									<div class="space-y-3" role="radiogroup" aria-invalid={questionError ? 'true' : 'false'}>
										{#each question.options || [] as option}
											<label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors {String(questionValue) === option ? 'border-ecohubs-primary bg-ecohubs-primary/5' : questionError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-ecohubs-primary'}">
												<input
													type="radio"
													name={question.id}
													value={option}
													checked={String(questionValue) === option}
													onchange={() => handleInput(question.id, option)}
													class="w-5 h-5 text-ecohubs-primary focus:ring-ecohubs-primary"
												/>
												<span class="text-lg text-gray-800">{option}</span>
											</label>
										{/each}
									</div>
								{:else if question.type === 'checkbox'}
									<div class="space-y-3" role="group">
										{#each question.options || [] as option}
											{@const isChecked = Array.isArray(questionValue) && questionValue.includes(option)}
											<label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors {isChecked ? 'border-ecohubs-primary bg-ecohubs-primary/5' : questionError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-ecohubs-primary'}">
												<input
													type="checkbox"
													name={`${question.id}[]`}
													value={option}
													checked={isChecked}
													onchange={(e) => handleCheckboxChange(question.id, option, e.currentTarget.checked)}
													class="w-5 h-5 text-ecohubs-primary focus:ring-ecohubs-primary rounded"
												/>
												<span class="text-lg text-gray-800">{option}</span>
											</label>
										{/each}
									</div>
								{:else if question.type === 'scale'}
									{@const scaleValue = typeof questionValue === 'number' ? questionValue : Number(questionValue) || 0}
									<div class="scale-input">
										{#if question.scaleLabels?.min || question.scaleLabels?.max}
											<div class="flex items-center justify-between mb-4">
												{#if question.scaleLabels?.min}
													<span class="text-sm text-gray-600 font-medium">{question.scaleLabels.min}</span>
												{:else}
													<span></span>
												{/if}
												{#if question.scaleLabels?.max}
													<span class="text-sm text-gray-600 font-medium">{question.scaleLabels.max}</span>
												{:else}
													<span></span>
												{/if}
											</div>
										{/if}
										<div class="grid grid-cols-5 md:grid-cols-10 gap-2" role="radiogroup" aria-invalid={questionError ? 'true' : 'false'}>
											{#each Array.from({ length: 10 }, (_, i) => i + 1) as num}
												{@const isSelected = scaleValue === num}
												<label class="flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors {isSelected ? 'border-ecohubs-primary bg-ecohubs-primary/10' : questionError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-ecohubs-primary'}">
													<input
														type="radio"
														name={question.id}
														value={num}
														checked={isSelected}
														onchange={() => handleScaleChange(question.id, num)}
														class="w-5 h-5 text-ecohubs-primary focus:ring-ecohubs-primary"
													/>
													<span class="text-lg font-semibold text-gray-800">{num}</span>
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
								<div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" in:fly={{ y: -10, duration: 200 }}>
									<p class="text-red-700 text-sm font-medium">
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
			{#if isLastPage}
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
			<div class="flex items-center justify-between pt-6 border-t border-gray-200">
				<button
					type="button"
					onclick={goToPrevious}
					disabled={currentPage === 1}
					class="flex items-center gap-2 px-6 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					<ArrowLeft class="w-5 h-5" aria-hidden="true" />
					<span>Back</span>
				</button>

				{#if isLastPage}
					<button
						type="submit"
						disabled={isSubmitting || !turnstileToken}
						class="flex items-center gap-2 px-8 py-3 bg-ecohubs-primary text-white font-bold rounded-lg hover:bg-ecohubs-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						{#if isSubmitting}
							<LoaderCircle class="w-5 h-5 animate-spin" aria-hidden="true" />
							<span>Submitting...</span>
						{:else}
							<span>Submit Application</span>
							<Check class="w-5 h-5" aria-hidden="true" />
						{/if}
					</button>
				{:else}
					<button
						type="submit"
						class="flex items-center gap-2 px-8 py-3 bg-ecohubs-primary text-white font-bold rounded-lg hover:bg-ecohubs-dark transition-all cursor-pointer"
					>
						<span>Next</span>
						<ArrowRight class="w-5 h-5" aria-hidden="true" />
					</button>
				{/if}
			</div>

			{#if submitError}
				<div class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4" role="alert" in:fly={{ y: -10, duration: 200 }}>
					<div class="flex items-start gap-3">
						<AlertCircle class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
						<div>
							<p class="font-medium text-red-800">Submission Failed</p>
							<p class="text-sm text-red-700 mt-1">{submitError}</p>
							{#if isRateLimited}
								<p class="text-sm text-red-600 mt-2">Please wait about an hour before trying again.</p>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</form>

		<!-- Draft Autosave Indicator -->
		<p class="text-xs text-gray-400 text-center mt-6">
			💾 Your progress is automatically saved
		</p>
	</div>
{/if}

