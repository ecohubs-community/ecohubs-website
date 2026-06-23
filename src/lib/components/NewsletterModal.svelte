<script lang="ts">
	import { onMount } from 'svelte';
	import LogoSrc from '$lib/assets/Logo.svg';

	/**
	 * Newsletter signup modal — shown once per 24h to non-subscribers, after
	 * the visitor has scrolled past roughly the middle of the page.
	 *
	 * State lives in localStorage:
	 *   - `newsletter_subscribed = "1"`   → never show again
	 *   - `newsletter_modal_last_shown`   → timestamp; 24h cooldown after a
	 *                                       dismissal so we don't pester.
	 */
	const STORAGE_KEY_LAST_SHOWN = 'newsletter_modal_last_shown';
	const STORAGE_KEY_SUBSCRIBED = 'newsletter_subscribed';
	const COOLDOWN_MS = 24 * 60 * 60 * 1000;

	let visible = $state(false);
	let email = $state('');
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	function read(key: string): string | null {
		try {
			return localStorage.getItem(key);
		} catch {
			return null;
		}
	}

	function write(key: string, value: string): void {
		try {
			localStorage.setItem(key, value);
		} catch {
			/* private mode / quota — fail silent */
		}
	}

	function shouldShow(): boolean {
		if (read(STORAGE_KEY_SUBSCRIBED) === '1') return false;
		const last = Number(read(STORAGE_KEY_LAST_SHOWN) || 0);
		if (!last) return true;
		return Date.now() - last >= COOLDOWN_MS;
	}

	function show() {
		if (visible) return;
		visible = true;
		write(STORAGE_KEY_LAST_SHOWN, String(Date.now()));
	}

	function close() {
		visible = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && visible) close();
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!email || !email.includes('@')) {
			errorMessage = 'Please enter a valid email address';
			submitStatus = 'error';
			return;
		}
		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';
		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = (await response.json().catch(() => ({}))) as {
				success?: boolean;
				message?: string;
			};
			if (!response.ok || !data.success) {
				throw new Error(data.message || 'Failed to subscribe');
			}
			submitStatus = 'success';
			write(STORAGE_KEY_SUBSCRIBED, '1');
		} catch (error) {
			submitStatus = 'error';
			errorMessage =
				error instanceof Error ? error.message : 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		if (!shouldShow()) return;

		let triggered = false;
		const onScroll = () => {
			if (triggered) return;
			const scrolled = window.scrollY + window.innerHeight;
			const docHeight = document.documentElement.scrollHeight;
			// Trigger once the bottom of the viewport passes half the document.
			if (scrolled >= docHeight * 0.5) {
				triggered = true;
				window.removeEventListener('scroll', onScroll);
				show();
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		// In case the page is already past the halfway point on load.
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if visible}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5 bg-ecohubs-deep/55 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="newsletter-modal-title"
	>
		<!-- Click-out catcher -->
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default"
			aria-label="Close newsletter signup"
			onclick={close}
		></button>

		<!-- Modal -->
		<div
			class="relative w-full max-w-[680px] bg-ecohubs-base rounded-[26px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(11,46,36,0.55)]"
		>
			<!-- Close -->
			<button
				type="button"
				aria-label="Close"
				onclick={close}
				class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-emerald-50/80 hover:text-white hover:bg-white/10 transition-colors"
			>
				<svg
					viewBox="0 0 24 24"
					width="18"
					height="18"
					fill="none"
					stroke="black"
					stroke-width="1.6"
					stroke-linecap="round"
				>
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>

			<div class="grid md:grid-cols-[0.82fr_1fr]">
				<!-- LEFT · brand panel -->
				<div
					class="grain relative bg-ecohubs-deep px-8 py-9 flex flex-col justify-between min-h-[260px]"
				>
					<div class="relative z-10 flex items-center gap-2.5">
						<img src={LogoSrc} alt="" class="w-8 h-8 brightness-[1.7]" />
						<span class="font-serif text-[17px] text-ecohubs-light tracking-tight">EcoHubs</span>
					</div>

					<div class="relative z-10 mt-8">
						<p class="font-story italic text-[22px] leading-[1.3] text-ecohubs-light">
							A letter from the people<br />actually doing the work.
						</p>
						<div
							class="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-200/55 leading-relaxed"
						>
							field notes · one honest experiment<br />· what we're reading
						</div>
					</div>
				</div>

				<!-- RIGHT · the ask -->
				<div class="px-8 py-9 md:px-9">
					{#if submitStatus !== 'success'}
						<div class="kicker text-emerald-700 flex items-center gap-2.5 mb-5">
							<span
								class="pulse-dot relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 text-emerald-600"
							></span>
							The dispatch · once a month
						</div>

						<h2
							id="newsletter-modal-title"
							class="font-serif text-[30px] leading-[1.1] tracking-tight text-ecohubs-deep"
						>
							Notes from the ground,
							<em class="font-story italic font-normal text-ecohubs-primary">not a feed.</em>
						</h2>

						<p class="mt-4 text-[15px] leading-[1.6] text-stone-700 font-light">
							Once a month we write down what we're learning as communities try to live
							regeneratively — what held, what broke first, and the one idea we can't put down. No
							algorithm, no streak to keep. Just a letter you can read in the time it takes a
							kettle to boil.
						</p>

						<form class="mt-7" onsubmit={handleSubmit}>
							<label class="block">
								<span class="font-mono text-[10.5px] tracking-[0.18em] uppercase text-emerald-700"
									>Where should it land?</span
								>
								<input
									type="email"
									required
									bind:value={email}
									disabled={isSubmitting}
									placeholder="you@yourcommunity.org"
									class="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-ecohubs-dark focus:outline-none py-2 text-[16px] text-ecohubs-deep placeholder-stone-400 disabled:opacity-60"
								/>
							</label>

							<button
								type="submit"
								disabled={isSubmitting}
								class="mt-6 w-full sm:w-auto px-7 py-3.5 bg-ecohubs-dark text-white font-medium rounded-full hover:bg-ecohubs-deep transition-all inline-flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
							>
								{isSubmitting ? 'Sending…' : 'Send me the letter'}
								<span class="transition-transform group-hover:translate-x-0.5">→</span>
							</button>
						</form>

						{#if submitStatus === 'error' && errorMessage}
							<p class="mt-4 text-[13px] text-red-600" role="alert">{errorMessage}</p>
						{/if}

						<p class="mt-5 font-story italic text-[13px] leading-relaxed text-stone-500">
							One email a month, nothing else. Leave whenever you like — we won't chase you, and we
							never pass your address on.
						</p>
					{:else}
						<div class="kicker text-emerald-700 flex items-center gap-2.5 mb-5">
							<span
								class="pulse-dot relative inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 text-emerald-600"
							></span>
							You're in
						</div>
						<h2
							id="newsletter-modal-title"
							class="font-serif text-[28px] leading-[1.15] tracking-tight text-ecohubs-deep"
						>
							Thank you.
							<em class="font-story italic font-normal text-ecohubs-primary"
								>Check your inbox in a few minutes.</em
							>
						</h2>
						<p class="mt-4 text-[15px] leading-[1.6] text-stone-700 font-light">
							Please confirm your subscription using the link in our email. We'll write again only
							when something actually shifts.
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
