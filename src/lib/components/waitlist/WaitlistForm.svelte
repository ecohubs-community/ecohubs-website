<script lang="ts">
	import { getMauticContactId } from '$lib/utils/mautic';

	/**
	 * EcoHub One waitlist email-capture form (step 1).
	 *
	 * On a valid submit it POSTs `{ step: 'create', email }` to /api/waitlist
	 * (Mautic contact + Listmonk subscription), shows an inline success state,
	 * and calls `onsuccess(email)` so the parent can open the optional
	 * progressive-profiling modal (step 2).
	 *
	 * `variant` adapts the palette to the surface: `light` sits on the pale
	 * hero wash, `dark` on the deep-green final CTA.
	 */
	interface Props {
		variant?: 'light' | 'dark';
		buttonLabel?: string;
		onsuccess?: (email: string) => void;
	}

	let { variant = 'light', buttonLabel = 'Join the founding community', onsuccess }: Props =
		$props();

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let email = $state('');
	let submitting = $state(false);
	let done = $state(false);
	let error = $state('');

	const dark = $derived(variant === 'dark');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const value = email.trim();
		if (!EMAIL_RE.test(value)) {
			error = "Hmm — that doesn't look like an email. Mind checking it?";
			return;
		}
		if (submitting) return;
		error = '';
		submitting = true;
		try {
			const res = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					step: 'create',
					fields: { email: value },
					mtcId: getMauticContactId()
				})
			});
			const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
			if (!res.ok || !data?.success) {
				throw new Error('failed');
			}
			done = true;
			onsuccess?.(value);
		} catch {
			error = 'Something went wrong. Please try again.';
		} finally {
			submitting = false;
		}
	}

	function clearErrorOnInput() {
		if (error && EMAIL_RE.test(email.trim())) error = '';
	}
</script>

{#if done}
	<div
		class={dark
			? 'flex items-start gap-3 bg-emerald-50/[0.08] border border-emerald-300/30 rounded-2xl px-5 py-4 max-w-md text-left'
			: 'flex items-start gap-3 bg-white/95 text-ecohubs-deep rounded-2xl soft-shadow px-5 py-4 max-w-md text-left'}
		role="status"
	>
		<span
			class="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-ecohubs-primary text-white flex items-center justify-center text-sm"
			aria-hidden="true">✓</span
		>
		<div>
			<p class={dark ? 'font-medium text-[15px] text-emerald-50' : 'font-medium text-[15px]'}>
				You're on the list — check your inbox.
			</p>
			<p class={dark ? 'text-[13.5px] text-emerald-100/75 mt-0.5' : 'text-[13.5px] text-stone-600 mt-0.5'}>
				We sent a note to
				<span class={dark ? 'font-medium text-emerald-200' : 'font-medium text-ecohubs-dark'}
					>{email}</span
				>. Welcome to the founding circle.
			</p>
		</div>
	</div>
{:else}
	<form
		class={dark ? 'flex flex-col gap-3 max-w-lg mx-auto' : 'flex flex-col gap-3 max-w-lg'}
		onsubmit={handleSubmit}
		novalidate
	>
		<div class="flex flex-col gap-3 sm:flex-row">
			<label class="flex-1 min-w-0">
				<span class="sr-only">Email address</span>
				<input
					type="email"
					required
					autocomplete="email"
					placeholder="you@email.com"
					bind:value={email}
					oninput={clearErrorOnInput}
					disabled={submitting}
					aria-invalid={error ? 'true' : undefined}
					class="w-full rounded-full bg-white/95 border px-5 py-3.5 text-[16px] text-ecohubs-text placeholder:text-stone-500 focus:outline-none focus:border-ecohubs-primary focus:ring-2 focus:ring-ecohubs-primary/25 disabled:opacity-60 transition-shadow {error
						? 'border-red-500 ring-2 ring-red-500/25'
						: dark
							? 'border-white/60'
							: 'border-stone-300'}"
				/>
			</label>
			<button
				type="submit"
				disabled={submitting}
				class="shrink-0 px-7 py-3.5 text-white font-medium rounded-full transition-all inline-flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed {dark
					? 'bg-ecohubs-primary hover:bg-emerald-500'
					: 'bg-ecohubs-dark hover:bg-ecohubs-deep'}"
			>
				<span>{submitting ? 'Joining…' : buttonLabel}</span>
				<span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
			</button>
		</div>

		{#if error}
			<p
				class={dark
					? 'text-[13.5px] text-red-100 bg-red-900/40 border border-red-300/40 rounded-xl px-4 py-2 w-fit'
					: 'text-[13.5px] text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2 w-fit'}
				role="alert"
			>
				{error}
			</p>
		{/if}

		<p class={dark ? 'text-[13.5px] text-emerald-100/70 font-light' : 'h-soft text-[13.5px] font-light text-stone-600'}>
			Free to join. No commitment — just the first step.
		</p>
		<p class={dark ? 'text-[12px] text-emerald-100/55 font-light' : 'text-[12px] font-light text-stone-500'}>
			We'll never share your email · about 2 emails a month · unsubscribe anytime.
		</p>
	</form>
{/if}
