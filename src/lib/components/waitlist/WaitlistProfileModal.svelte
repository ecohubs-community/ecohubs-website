<script lang="ts">
	import LogoSrc from '$lib/assets/Logo.svg';
	import { getMauticContactId } from '$lib/utils/mautic';

	/**
	 * EcoHub One waitlist — optional progressive-profiling modal (step 2).
	 *
	 * Shown right after a successful email capture. The contact already exists in
	 * Mautic (created in step 1), so submitting here PATCHes the same contact via
	 * `{ step: 'update', ... }` to /api/waitlist. Fully optional — "Skip for now"
	 * just closes it. Field names map to the Mautic field aliases.
	 */
	interface Props {
		open: boolean;
		email: string;
		onclose?: () => void;
	}

	let { open = $bindable(false), email, onclose }: Props = $props();

	let fName = $state('');
	let location = $state('');
	let skills = $state('');
	let reason = $state('');

	let submitting = $state(false);
	let done = $state(false);
	let error = $state('');

	function close() {
		open = false;
		onclose?.();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (submitting) return;
		error = '';
		submitting = true;
		try {
			const res = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					step: 'update',
					fields: {
						email,
						f_name: fName,
						location,
						skillsprofession: skills,
						why_do_you_want_to_join: reason
					},
					mtcId: getMauticContactId()
				})
			});
			const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
			if (!res.ok || !data?.success) throw new Error('failed');
			done = true;
		} catch {
			error = 'Something went wrong. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5 bg-ecohubs-deep/55 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="waitlist-profile-title"
	>
		<!-- Click-out catcher -->
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default"
			aria-label="Close"
			onclick={close}
		></button>

		<div
			class="relative w-full max-w-[640px] bg-ecohubs-base rounded-[26px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(11,46,36,0.55)] max-h-[92vh] overflow-y-auto"
		>
			<!-- Close -->
			<button
				type="button"
				aria-label="Close"
				onclick={close}
				class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:text-ecohubs-deep hover:bg-stone-900/5 transition-colors"
			>
				<svg
					viewBox="0 0 24 24"
					width="18"
					height="18"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>

			<div class="grid md:grid-cols-[0.78fr_1fr]">
				<!-- LEFT · brand panel -->
				<div
					class="grain relative bg-ecohubs-deep px-8 py-9 flex flex-col justify-between min-h-[200px]"
				>
					<div class="relative z-10 flex items-center gap-2.5">
						<img src={LogoSrc} alt="" class="w-8 h-8 brightness-[1.7]" />
						<span class="font-serif text-[17px] text-ecohubs-light tracking-tight">EcoHubs</span>
					</div>
					<div class="relative z-10 mt-8">
						<p class="font-story italic text-[21px] leading-[1.3] text-ecohubs-light">
							You're in.<br />Tell us a little<br />about you.
						</p>
						<div
							class="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-200/55 leading-relaxed"
						>
							optional · helps us<br />get to know you
						</div>
					</div>
				</div>

				<!-- RIGHT · the form -->
				<div class="px-7 py-8 md:px-8">
					{#if !done}
						<div class="kicker text-emerald-700 mb-1.5">One more thing</div>
						<h2
							id="waitlist-profile-title"
							class="font-serif text-[24px] leading-[1.15] tracking-tight text-ecohubs-deep"
						>
							Complete your profile
						</h2>
						<p class="mt-2 text-[13px] text-stone-500">
							Optional, but it helps us get to know you (and speeds up selection later).
						</p>

						<form class="mt-5 flex flex-col gap-3.5" onsubmit={handleSubmit}>
							<label class="block">
								<span class="block text-[12.5px] font-medium text-stone-600 mb-1">Full name</span>
								<input
									type="text"
									name="f_name"
									autocomplete="name"
									placeholder="Your name"
									bind:value={fName}
									class="w-full rounded-full bg-white border border-stone-300 px-4 py-2.5 text-[15px] text-ecohubs-text placeholder:text-stone-400 focus:outline-none focus:border-ecohubs-primary focus:ring-2 focus:ring-ecohubs-primary/25"
								/>
							</label>
							<label class="block">
								<span class="block text-[12.5px] font-medium text-stone-600 mb-1">Location</span>
								<input
									type="text"
									name="location"
									autocomplete="address-level2"
									placeholder="City, country"
									bind:value={location}
									class="w-full rounded-full bg-white border border-stone-300 px-4 py-2.5 text-[15px] text-ecohubs-text placeholder:text-stone-400 focus:outline-none focus:border-ecohubs-primary focus:ring-2 focus:ring-ecohubs-primary/25"
								/>
							</label>
							<label class="block">
								<span class="block text-[12.5px] font-medium text-stone-600 mb-1"
									>Skills / profession</span
								>
								<input
									type="text"
									name="skillsprofession"
									placeholder="e.g. permaculture, carpentry, software"
									bind:value={skills}
									class="w-full rounded-full bg-white border border-stone-300 px-4 py-2.5 text-[15px] text-ecohubs-text placeholder:text-stone-400 focus:outline-none focus:border-ecohubs-primary focus:ring-2 focus:ring-ecohubs-primary/25"
								/>
							</label>
							<label class="block">
								<span class="block text-[12.5px] font-medium text-stone-600 mb-1"
									>Why do you want to join?</span
								>
								<textarea
									name="why_do_you_want_to_join"
									rows="3"
									placeholder="A sentence or two…"
									bind:value={reason}
									class="w-full rounded-2xl bg-white border border-stone-300 px-4 py-2.5 text-[15px] text-ecohubs-text placeholder:text-stone-400 resize-none focus:outline-none focus:border-ecohubs-primary focus:ring-2 focus:ring-ecohubs-primary/25"
								></textarea>
							</label>

							{#if error}
								<p class="text-[13px] text-red-600" role="alert">{error}</p>
							{/if}

							<div class="flex items-center gap-4 mt-1">
								<button
									type="submit"
									disabled={submitting}
									class="px-6 py-2.5 bg-ecohubs-dark text-white text-[14px] font-medium rounded-full hover:bg-ecohubs-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
								>
									{submitting ? 'Saving…' : 'Complete my profile'}
								</button>
								<button
									type="button"
									onclick={close}
									class="text-[13px] text-stone-500 hover:text-ecohubs-dark transition-colors"
								>
									Skip for now
								</button>
							</div>
						</form>
					{:else}
						<div class="kicker text-emerald-700 mb-3 flex items-center gap-2.5">
							<span
								class="pulse-dot relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 text-emerald-600"
							></span>
							All set
						</div>
						<h2
							id="waitlist-profile-title"
							class="font-serif text-[26px] leading-[1.15] tracking-tight text-ecohubs-deep"
						>
							Thank you.
							<em class="font-story italic font-normal text-ecohubs-primary"
								>We can't wait to get to know you.</em
							>
						</h2>
						<p class="mt-4 text-[15px] leading-[1.6] text-stone-700 font-light">
							Your profile is saved. Keep an eye on your inbox — the next step comes to you.
						</p>
						<p class="mt-4 text-[13px] leading-[1.6] text-stone-500">
							Something is not working as it should?
							<a
								href="/contact"
								class="text-ecohubs-dark font-medium underline underline-offset-2 hover:text-ecohubs-primary transition-colors"
								>Please let us know</a
							>.
						</p>
						<button
							type="button"
							onclick={close}
							class="mt-7 px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2"
						>
							Close
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
