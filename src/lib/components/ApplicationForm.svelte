<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { applicationQuestions, applicationSchema } from '$lib/config/application-questions';
	import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { PageData } from '../../routes/join/$types';
	import { onMount } from 'svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let currentStep = $state(0);
	let previousStep = $state(-1);
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	
	// Local state for current input (handles both string and array values)
	let currentInputValue = $state<string | string[]>('');

	// Initialize superForm
	const superform = superForm(data.form, {
		// @ts-ignore - Zod v3/v4 type compatibility
		validators: zodClient(applicationSchema),
		dataType: 'json',
		resetForm: false,
		onSubmit: async ({ cancel }) => {
			// If not on last step, cancel default submission
			if (currentStep !== visibleQuestions.length - 1) {
				cancel();
				
				// Validate current question
				const validationResult = currentQuestion.validationSchema.safeParse(currentInputValue);

				if (validationResult.success) {
					// Sync current input to form, save, and move to next step
					syncCurrentToForm();
					saveToLocalStorage();
					clearCurrentError();
					currentStep++;
				} else {
					// Show validation error
					const error = JSON.parse(JSON.stringify(validationResult.error));
					$errors[currentQuestion.id as keyof typeof $errors] = error.issues;
					scrollToError();
				}
			} else {
				// On last step, allow form submission
				isSubmitting = true;
				submitError = '';
				syncCurrentToForm();
				saveToLocalStorage();
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
				submitError = 'Failed to submit application. Please try again.';
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
  });

	// Filter visible questions based on conditionals
	const visibleQuestions = $derived(
		applicationQuestions.filter((q) => {
			if (!q.conditionalOn) return true;
			return $form[q.conditionalOn.questionId] === q.conditionalOn.value;
		})
	);

	const currentQuestion = $derived(visibleQuestions[currentStep]);
	const progress = $derived(((currentStep + 1) / visibleQuestions.length) * 100);
	const isLastStep = $derived(currentStep === visibleQuestions.length - 1);
	const currentError = $derived($errors[currentQuestion?.id as keyof typeof $errors]);

	// Sync current input value to form
	function syncCurrentToForm() {
		if (currentQuestion) {
			$form[currentQuestion.id as keyof typeof $form] = currentInputValue as any;
		}
	}

	// Save form to localStorage
	function saveToLocalStorage() {
		if (typeof window !== 'undefined' && !submitSuccess) {
			localStorage.setItem('ecohubs-application-draft', JSON.stringify($form));
		}
	}

	// Load value from form to current input ONLY when step actually changes
	$effect(() => {
		if (currentStep !== previousStep) {
			previousStep = currentStep;
			
			if (currentQuestion) {
				const formValue = $form[currentQuestion.id];
				if (Array.isArray(formValue)) {
					currentInputValue = formValue;
				} else {
					currentInputValue = String(formValue || '');
				}
			}
		}
	});

	function clearCurrentError() {
		if (currentQuestion) {
			delete $errors[currentQuestion.id];
		}
	}

	function scrollToError() {
		setTimeout(() => {
			const errorElement = document.querySelector('[role="alert"]');
			errorElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}, 100);
	}

	function goToPrevious() {
		if (currentStep > 0) {
			clearCurrentError();
			currentStep--;
		}
	}

	function handleInput(value: string) {
		currentInputValue = value;
		if (currentQuestion && $errors[currentQuestion.id]) {
			delete $errors[currentQuestion.id];
		}
	}

	function handleCheckboxChange(option: string, checked: boolean) {
		const current = Array.isArray(currentInputValue) ? currentInputValue : [];
		if (checked) {
			currentInputValue = [...current, option];
		} else {
			currentInputValue = current.filter((v) => v !== option);
		}
		if (currentQuestion && $errors[currentQuestion.id]) {
			delete $errors[currentQuestion.id];
		}
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
		<!-- Progress Bar -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-2">
				<span class="text-sm font-medium text-gray-600">
					Question {currentStep + 1} of {visibleQuestions.length}
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
			{#key currentStep}
				<div
					in:fly={{ x: 50, duration: 300, easing: cubicOut, delay: 300 }}
					out:fly={{ x: -50, duration: 300, easing: cubicOut }}
					class="mb-8"
				>
					<!-- Question -->
					<h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">
						{currentQuestion.question}
					</h2>
					
					{#if currentQuestion.description}
						<p class="text-gray-600 mb-6">{currentQuestion.description}</p>
					{/if}

					<!-- Input Field -->
					<div class="mb-4">
						{#if currentQuestion.type === 'text' || currentQuestion.type === 'email' || currentQuestion.type === 'number'}
							<input
								type={currentQuestion.type}
								name={currentQuestion.id}
								value={currentInputValue}
								oninput={(e) => handleInput(e.currentTarget.value)}
								placeholder={currentQuestion.placeholder}
								aria-invalid={currentError ? 'true' : 'false'}
								class="w-full px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 border-2 rounded-xl transition-all {currentError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
							/>
						{:else if currentQuestion.type === 'textarea'}
							<textarea
								name={currentQuestion.id}
								value={currentInputValue}
								oninput={(e) => handleInput(e.currentTarget.value)}
								placeholder={currentQuestion.placeholder}
								rows="6"
								aria-invalid={currentError ? 'true' : 'false'}
								class="w-full px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 border-2 rounded-xl transition-all resize-none {currentError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
							></textarea>
							{#if currentInputValue}
								<p class="text-sm text-gray-500 mt-2">
									{String(currentInputValue).length} characters
								</p>
							{/if}
						{:else if currentQuestion.type === 'select'}
							<select
								name={currentQuestion.id}
								value={currentInputValue}
								onchange={(e) => handleInput(e.currentTarget.value)}
								aria-invalid={currentError ? 'true' : 'false'}
								class="w-full px-4 py-4 text-lg text-gray-900 border-2 rounded-xl transition-all {currentError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-ecohubs-primary focus:border-transparent'}"
							>
								<option value="">Select an option...</option>
								{#each currentQuestion.options || [] as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						{:else if currentQuestion.type === 'radio'}
							<div class="space-y-3" role="radiogroup" aria-invalid={currentError ? 'true' : 'false'}>
								{#each currentQuestion.options || [] as option}
									<label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors {currentInputValue === option ? 'border-ecohubs-primary bg-ecohubs-primary/5' : currentError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-ecohubs-primary'}">
										<input
											type="radio"
											name={currentQuestion.id}
											value={option}
											checked={currentInputValue === option}
											onchange={() => handleInput(option)}
											class="w-5 h-5 text-ecohubs-primary focus:ring-ecohubs-primary"
										/>
										<span class="text-lg text-gray-800">{option}</span>
									</label>
								{/each}
							</div>
						{:else if currentQuestion.type === 'checkbox'}
							<div class="space-y-3" role="group">
								{#each currentQuestion.options || [] as option}
									{@const isChecked = Array.isArray(currentInputValue) && currentInputValue.includes(option)}
									<label class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors {isChecked ? 'border-ecohubs-primary bg-ecohubs-primary/5' : currentError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-ecohubs-primary'}">
										<input
											type="checkbox"
											name={`${currentQuestion.id}[]`}
											value={option}
											checked={isChecked}
											onchange={(e) => handleCheckboxChange(option, e.currentTarget.checked)}
											class="w-5 h-5 text-ecohubs-primary focus:ring-ecohubs-primary rounded"
										/>
										<span class="text-lg text-gray-800">{option}</span>
									</label>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Error Message -->
					{#if (currentError as any)?.[0]?.message}
						<div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" in:fly={{ y: -10, duration: 200 }}>
							<p class="text-red-700 text-sm font-medium">
								{(currentError as any)?.[0]?.message}
							</p>
						</div>
					{/if}
				</div>
			{/key}

			<!-- Hidden inputs to ensure all values are submitted -->
			{#each Object.entries($form) as [key, value]}
				{#if key !== currentQuestion?.id && value !== undefined && value !== ''}
					{#if Array.isArray(value)}
						{#each value as item}
							<input type="hidden" name={`${key}[]`} value={String(item)} />
						{/each}
					{:else}
						<input type="hidden" name={key} value={String(value)} />
					{/if}
				{/if}
			{/each}

			<!-- Navigation Buttons -->
			<div class="flex items-center justify-between pt-6 border-t border-gray-200">
				<button
					type="button"
					onclick={goToPrevious}
					disabled={currentStep === 0}
					class="flex items-center gap-2 px-6 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ArrowLeft class="w-5 h-5" aria-hidden="true" />
					<span>Back</span>
				</button>

				{#if isLastStep}
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex items-center gap-2 px-8 py-3 bg-ecohubs-primary text-white font-bold rounded-lg hover:bg-ecohubs-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
						class="flex items-center gap-2 px-8 py-3 bg-ecohubs-primary text-white font-bold rounded-lg hover:bg-ecohubs-dark transition-all"
					>
						<span>Next</span>
						<ArrowRight class="w-5 h-5" aria-hidden="true" />
					</button>
				{/if}
			</div>

			{#if submitError}
				<div class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
					<p class="text-sm text-red-800">{submitError}</p>
				</div>
			{/if}
		</form>

		<!-- Draft Autosave Indicator -->
		<p class="text-xs text-gray-400 text-center mt-6">
			💾 Your progress is automatically saved
		</p>
	</div>
{/if}
