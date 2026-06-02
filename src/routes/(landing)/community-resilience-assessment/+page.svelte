<script lang="ts">
	import { onMount, tick } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import fruithavenTeam from '$lib/assets/fruithaven-team.webp';
	import Logo from '$lib/assets/Logo.svg';
	import { QUESTIONS, OPTIONS, tierFor, type AnswerKey } from './data';
	import { MAUTIC_RESILIENCE_ASSESSMENT } from '$lib/config/mautic';
	import { initMauticTracking, getMauticContactId } from '$lib/utils/mautic';

	const MAUTIC_FORM_KEY = 'resilience-assessment';
	const QUIZ_SUMMARY_FIELD = MAUTIC_RESILIENCE_ASSESSMENT.quizSummaryField;

	/* ─── Quiz state ─────────────────────────────────────────────── */
	let index = $state(0);
	let answers: (AnswerKey | null)[] = $state(QUESTIONS.map(() => null));
	let phase: 'quiz' | 'result' = $state('quiz');

	/* ─── Email-gated form state ─────────────────────────────────── */
	let quizEmail = $state('');
	let extrasOpen = $state(false);
	let communityName = $state('');
	let communityWebsite = $state('');
	let communityLocation = $state('');
	let communitySize = $state('');
	let quizFormDone = $state(false);
	let quizSubmitting = $state(false);
	let quizError = $state('');

	/* ─── Final-CTA form state ───────────────────────────────────── */
	let form2Email = $state('');
	let form2Done = $state(false);
	let form2Submitting = $state(false);
	let form2Error = $state('');

	/* ─── Derived score / breakdown / tier ───────────────────────── */
	const totalScore = $derived(
		answers.reduce<number>((sum, ans) => {
			if (!ans) return sum;
			const opt = OPTIONS.find((o) => o.key === ans);
			return sum + (opt?.value ?? 0);
		}, 0)
	);

	const counts = $derived.by(() => {
		const c = { explicit: 0, partial: 0, missing: 0 };
		for (const a of answers) {
			if (a === 'yes') c.explicit++;
			else if (a === 'partial') c.partial++;
			else c.missing++;
		}
		return c;
	});

	const tierInfo = $derived(tierFor(totalScore));

	const pct = (n: number) => Math.round((n / QUESTIONS.length) * 100);

	/* ─── Quiz summary sent to Mautic ────────────────────────────── *
	 * Human-readable; lands in the `resilience_assessment_qui` custom
	 * field so a reviewer can read it at a glance in the contact.    */
	const quizSummary = $derived.by(() => {
		const t = tierInfo;
		const c = counts;
		const lines: string[] = [
			`Score: ${totalScore} / ${QUESTIONS.length}`,
			`Tier: ${t.name}`,
			`Breakdown: ${c.explicit} explicit (${pct(c.explicit)}%) · ${c.partial} partial (${pct(c.partial)}%) · ${c.missing} missing (${pct(c.missing)}%)`,
			'',
			'Answers:'
		];
		QUESTIONS.forEach((q, i) => {
			const key = answers[i] ?? 'unsure';
			const opt = OPTIONS.find((o) => o.key === key);
			lines.push(`${String(i + 1).padStart(2, ' ')}. ${q.label}: ${opt?.short ?? key}`);
		});
		return lines.join('\n');
	});

	/* ─── Progressive disclosure of the optional fields ──────────── *
	 * Reveal the optional community-info fields once the email field
	 * looks plausibly valid. Done as an effect so it works whether
	 * the value is typed, pasted, or autofilled.                     */
	$effect(() => {
		if (!extrasOpen && quizEmail.includes('@') && quizEmail.includes('.')) {
			extrasOpen = true;
		}
	});

	/* ─── Quiz navigation ────────────────────────────────────────── */
	function selectOption(key: AnswerKey) {
		answers[index] = key;
	}

	async function next() {
		if (!answers[index]) return;
		if (index < QUESTIONS.length - 1) {
			index++;
		} else {
			phase = 'result';
			await tick();
			scrollToQuiz();
		}
	}

	function back() {
		if (index > 0) index--;
	}

	async function restart() {
		phase = 'quiz';
		index = 0;
		await tick();
		scrollToQuiz();
	}

	function scrollToQuiz() {
		const quiz = document.getElementById('quiz');
		if (!quiz) return;
		const rect = quiz.getBoundingClientRect();
		if (rect.top < -40) {
			window.scrollTo({ top: window.scrollY + rect.top - 40, behavior: 'smooth' });
		}
	}

	/* ─── Form submission ────────────────────────────────────────── *
	 * Both forms POST to `/api/mautic`, which validates against the    *
	 * server-side allowlist and forwards to Mautic — stitching the     *
	 * submission onto the tracked visitor via their `mtcId`.           */
	async function submitToMautic(fields: Record<string, string>): Promise<boolean> {
		const res = await fetch('/api/mautic', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				form: MAUTIC_FORM_KEY,
				fields,
				mtcId: getMauticContactId()
			})
		});
		const data = await res.json().catch(() => null);
		return res.ok && data?.success === true;
	}

	async function onQuizFormSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (quizSubmitting) return;
		quizSubmitting = true;
		quizError = '';
		try {
			const ok = await submitToMautic({
				email: quizEmail,
				ccommunity_name: communityName,
				ccommunity_website: communityWebsite,
				ccommunity_location: communityLocation,
				ccommunity_size: communitySize,
				[QUIZ_SUMMARY_FIELD]: quizSummary
			});
			if (ok) quizFormDone = true;
			else quizError = 'Something went wrong. Please try again.';
		} catch {
			quizError = 'Something went wrong. Please try again.';
		} finally {
			quizSubmitting = false;
		}
	}

	async function onForm2Submit(e: SubmitEvent) {
		e.preventDefault();
		if (form2Submitting) return;
		form2Submitting = true;
		form2Error = '';
		try {
			const ok = await submitToMautic({ email: form2Email });
			if (ok) form2Done = true;
			else form2Error = 'Something went wrong. Please try again.';
		} catch {
			form2Error = 'Something went wrong. Please try again.';
		} finally {
			form2Submitting = false;
		}
	}

	/* ─── Pie slices for the result ──────────────────────────────── */
	const pieSlices = $derived.by(() => {
		const total = QUESTIONS.length;
		const slices = [
			{ v: counts.explicit, color: '#064e3b' },
			{ v: counts.partial, color: '#d97706' },
			{ v: counts.missing, color: '#a8a29e' }
		];
		let offset = 0;
		return slices.map((s) => {
			const pctVal = (s.v / total) * 100;
			const out = { ...s, dasharray: `${pctVal} ${100 - pctVal}`, dashoffset: -offset };
			offset += pctVal;
			return out;
		});
	});

	/* ─── Mautic tracking pixel ──────────────────────────────────── */
	onMount(() => {
		initMauticTracking();
	});
</script>

<SEO
	title="Community Resilience Assessment — Where will your community break first? | EcoHubs"
	ogImage="/og-resilience-assessment.jpg"
	description="A free 5-minute assessment for intentional communities. Ten honest questions about your written agreements — followed by a personalised, human-written report mapping where your community is solid and where it's exposed."
	canonical="/community-resilience-assessment"
/>

<div class="landing-root">
	<!-- ═══════════════════════════════════════════════════════════════
		1 · HERO
		═══════════════════════════════════════════════════════════════ -->
	<section class="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
		<div
			class="absolute inset-0 -z-10 bg-gradient-to-b from-[#f5f2ea] via-[#fbfbf9] to-[#fbfbf9]"
		></div>
		<div
			class="absolute -top-10 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-200/25 blur-3xl"
		></div>
		<div
			class="absolute -right-20 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-amber-200/30 blur-3xl"
		></div>

		<!-- Brand mark — non-clickable, since this is a standalone landing page -->
		<div class="mx-auto mb-16 max-w-7xl px-6 md:mb-24 lg:px-8">
			<div class="font-serif text-ecohubs-dark flex items-center gap-2.5 text-[17px]">
				<img src={Logo} width="30" alt="EcoHubs" />
				EcoHubs
			</div>
		</div>

		<div class="mx-auto grid max-w-7xl items-end gap-12 px-6 lg:grid-cols-12 lg:px-8">
			<div class="lg:col-span-7">
				<div class="kicker mb-6 flex items-center gap-3 text-emerald-700">
					<span
						class="pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-600 text-emerald-600"
					></span>
					Free community resilience assessment · 5 minutes
				</div>
				<h1
					class="text-ecohubs-deep font-serif text-5xl leading-[1.04] tracking-tight md:text-6xl lg:text-[68px]"
				>
					How resilient is your community
					<em class="font-story text-ecohubs-primary font-normal italic">when conflict arises?</em>
				</h1>
				<p class="mt-7 max-w-2xl text-xl leading-relaxed font-light text-stone-700 md:text-[22px]">
					A short, honest assessment of where your community's agreements are
					<em class="font-story text-ecohubs-deep italic">strongest</em> — and where they'll
					<em class="font-story text-ecohubs-deep italic">break first</em>.
				</p>
				<div class="mt-10 flex flex-wrap gap-3">
					<a
						href="#quiz"
						class="bg-ecohubs-dark hover:bg-ecohubs-deep group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-medium text-white transition-all"
					>
						Begin the 10 questions
						<span class="transition-transform group-hover:translate-x-0.5">→</span>
					</a>
					<a
						href="#how"
						class="hover:border-ecohubs-dark hover:text-ecohubs-dark inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-transparent px-7 py-4 font-medium text-stone-800 transition-all"
					>
						How it works
					</a>
				</div>
			</div>

			<div class="lg:col-span-5">
				<div class="relative">
					<div
						class="absolute -inset-2 -z-10 rounded-[36px] bg-gradient-to-br from-emerald-100/50 to-amber-100/30 blur-2xl"
					></div>
					<div class="q-card soft-shadow p-7 md:p-9">
						<div class="kicker mb-4 text-emerald-700">From the communities we've assessed</div>
						<p class="text-ecohubs-deep font-serif text-[28px] leading-[1.2] md:text-[32px]">
							Roughly <span class="text-ecohubs-primary">40–50%</span> of
							<em class="font-story font-normal italic">important rules weren't defined at all</em>.
							<br />
							Another <span class="text-ecohubs-primary">40–50%</span> were
							<em class="font-story font-normal italic">only partially explicit</em>.
						</p>
						<p class="font-story mt-5 text-[17px] leading-snug text-stone-600 italic">
							Almost nothing was as clear as members believed.
						</p>
						<div
							class="mt-7 flex items-center gap-3 border-t border-stone-200/70 pt-5 text-[13px] text-stone-500"
						>
							<span class="font-mono text-[10.5px] tracking-widest uppercase">Real data</span>
							<span class="text-stone-300">·</span>
							<span>not a manufactured statistic</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div class="hairline mx-auto max-w-4xl"></div>

	<!-- ═══════════════════════════════════════════════════════════════
		2 · THE HIDDEN PROBLEM
		═══════════════════════════════════════════════════════════════ -->
	<section class="py-24 md:py-32">
		<div class="mx-auto max-w-3xl px-6 lg:px-8">
			<div class="kicker mb-6 text-emerald-700">The thing nobody warns you about</div>
			<p class="text-ecohubs-deep font-serif text-[28px] leading-[1.25] md:text-[36px]">
				Most intentional communities don't fracture because their values were wrong. They fracture
				because the rules everyone assumed were shared
				<em class="font-story text-ecohubs-primary font-normal italic">turned out not to be</em> —
				and the discovery happens during the conflict, not before it.
			</p>
			<p class="mt-8 text-lg leading-relaxed font-light text-stone-700">
				This isn't about blame, or about communities being naive. It's about how rarely we slow
				down to write things down — and how cleanly the gaps reveal themselves the first time
				something hard happens.
			</p>
		</div>
	</section>
	<div class="hairline mx-auto max-w-4xl"></div>

	<!-- ═══════════════════════════════════════════════════════════════
		3 · THE MINI-QUIZ
		═══════════════════════════════════════════════════════════════ -->
	<section id="quiz" class="grain relative overflow-hidden bg-[#f5f2ea] py-24 md:py-32">
		<div class="relative mx-auto max-w-4xl px-6 lg:px-8">
			<div class="mb-12 text-center">
				<div class="kicker mb-4 text-emerald-700">The 10-question assessment</div>
				<h2 class="text-ecohubs-deep font-serif text-4xl leading-tight md:text-5xl">
					Answer 10 questions.<br />
					<em class="font-story font-normal text-stone-500 italic">
						Get an honest, personalized map of where your community is solid and where it's exposed.
					</em>
				</h2>
				<p class="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed font-light text-stone-700">
					Four answer options per question. Five minutes. Your responses stay in your browser until
					you ask for the full report.
				</p>
			</div>

			<div class="q-card soft-shadow overflow-hidden">
				{#if phase === 'quiz'}
					{@const q = QUESTIONS[index]}
					{@const selected = answers[index]}
					{@const isLast = index === QUESTIONS.length - 1}
					<div class="p-7 md:p-10">
						<div class="mb-8 flex items-center justify-between gap-4">
							<div class="flex items-center gap-1.5">
								{#each QUESTIONS as _, i}
									<span class="q-nav-dot" class:done={i < index} class:current={i === index}
									></span>
								{/each}
							</div>
							<div class="font-mono text-[11px] tracking-widest text-stone-500 uppercase">
								Question {index + 1} / {QUESTIONS.length}
							</div>
						</div>

						<div class="kicker mb-3 text-emerald-700">{q.label}</div>
						<h3 class="text-ecohubs-deep font-serif text-[26px] leading-[1.25] mb-7 md:text-[30px]">
							{q.prompt}
						</h3>

						<div class="mb-8 space-y-2.5">
							{#each OPTIONS as o}
								<label class="opt" class:selected={selected === o.key}>
									<input
										type="radio"
										name={`q-${index}`}
										value={o.key}
										checked={selected === o.key}
										onchange={() => selectOption(o.key)}
									/>
									<span class="dot"></span>
									<span class="glyph" style="background:{o.glyphBg}">{o.glyph}</span>
									<span>{o.label}</span>
								</label>
							{/each}
						</div>

						<div class="flex items-center justify-between pt-2">
							<button
								type="button"
								onclick={back}
								disabled={index === 0}
								class="hover:text-ecohubs-dark px-5 py-2.5 text-[14px] text-stone-600 transition-colors disabled:pointer-events-none disabled:opacity-30"
							>
								← Back
							</button>
							<button
								type="button"
								onclick={next}
								disabled={!selected}
								class="enabled:bg-ecohubs-dark enabled:hover:bg-ecohubs-deep rounded-full px-6 py-3 text-[14.5px] font-medium transition-all enabled:text-white disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
							>
								{isLast ? 'See my result' : 'Next'} →
							</button>
						</div>
					</div>
				{:else}
					<!-- ── Result ─────────────────────────────────────────── -->
					<div class="fade-in p-7 md:p-10">
						<div class="mb-2 text-center">
							<div class="kicker mb-3 text-emerald-700">Your directional preview</div>
							<h3 class="text-ecohubs-deep font-serif text-[28px] leading-[1.2] md:text-[36px]">
								{tierInfo.name}
							</h3>
						</div>

						<div class="mt-8 mb-10 grid items-center gap-8 md:grid-cols-2 md:gap-10">
							<div class="flex flex-col items-center">
								<svg viewBox="0 0 42 42" class="h-44 w-44 -rotate-90 md:h-52 md:w-52">
									<circle
										cx="21"
										cy="21"
										r="15.915"
										fill="#fff"
										stroke="#f5f2ea"
										stroke-width="8"
									/>
									{#each pieSlices as s}
										<circle
											cx="21"
											cy="21"
											r="15.915"
											fill="transparent"
											stroke={s.color}
											stroke-width="8"
											stroke-dasharray={s.dasharray}
											stroke-dashoffset={s.dashoffset}
										/>
									{/each}
								</svg>
								<div
									class="mt-5 w-full max-w-[200px] space-y-1.5 font-mono text-[12.5px] text-stone-600"
								>
									<div class="flex items-center justify-between">
										<span class="flex items-center gap-2"
											><span class="h-3 w-3 rounded-full" style="background:#064e3b"></span> Explicit</span
										>
										<span class="text-ecohubs-deep font-medium"
											>{counts.explicit} · {pct(counts.explicit)}%</span
										>
									</div>
									<div class="flex items-center justify-between">
										<span class="flex items-center gap-2"
											><span class="h-3 w-3 rounded-full" style="background:#d97706"></span> Partial</span
										>
										<span class="text-ecohubs-deep font-medium"
											>{counts.partial} · {pct(counts.partial)}%</span
										>
									</div>
									<div class="flex items-center justify-between">
										<span class="flex items-center gap-2"
											><span class="h-3 w-3 rounded-full" style="background:#a8a29e"></span> Missing</span
										>
										<span class="text-ecohubs-deep font-medium"
											>{counts.missing} · {pct(counts.missing)}%</span
										>
									</div>
								</div>
							</div>

							<div>
								<p class="font-serif text-[18px] leading-[1.5] text-stone-700 md:text-[20px]">
									{tierInfo.body}
								</p>
								<button
									type="button"
									onclick={restart}
									class="hover:text-ecohubs-dark font-story mt-6 text-[13px] text-stone-500 underline-offset-4 italic transition-colors hover:underline"
								>
									← change my answers
								</button>
							</div>
						</div>

						<!-- ── Email-gated form ──────────────────────────── -->
						<div class="rounded-3xl border border-stone-200/70 bg-[#f5f2ea] p-7 md:p-9">
							{#if !quizFormDone}
								<div class="kicker mb-3 text-emerald-700">Want the full personalized report?</div>
								<h4
									class="text-ecohubs-deep font-serif text-[22px] leading-snug mb-3 md:text-[26px]"
								>
									Our team will read your community's actual agreements and send back a complete
									map of your gaps — with prioritized recommendations.
								</h4>
								<p class="mb-6 text-[14.5px] leading-relaxed text-stone-600">
									Free. In your inbox within five business days.
								</p>

								<form autocomplete="off" onsubmit={onQuizFormSubmit}>
									<label class="block">
										<span class="sr-only">Email address</span>
										<input
											type="email"
											required
											bind:value={quizEmail}
											placeholder="your@email.com"
											class="field"
										/>
									</label>

									{#if extrasOpen}
										<div class="fade-in mt-5 space-y-4">
											<p class="font-story text-[15px] text-stone-600 italic">
												Want a more tailored report? Tell us a little about your community
												(optional).
											</p>
											<div class="grid gap-3 sm:grid-cols-2">
												<input
													type="text"
													bind:value={communityName}
													placeholder="Community name"
													class="field"
												/>
												<input
													type="url"
													bind:value={communityWebsite}
													placeholder="Community website"
													class="field"
												/>
												<input
													type="text"
													bind:value={communityLocation}
													placeholder="Country / location"
													class="field sm:col-span-2"
												/>
											</div>
											<div>
												<div
													class="mb-2 font-mono text-[11px] tracking-widest text-stone-500 uppercase"
												>
													Community size
												</div>
												<div class="flex flex-wrap gap-2">
													{#each ['5-10', '10-50', '50-100', '150+'] as size}
														<button
															type="button"
															class="seg-btn"
															class:selected={communitySize === size}
															onclick={() => (communitySize = size)}
														>
															{size.replace('-', '–')}
														</button>
													{/each}
												</div>
											</div>
										</div>
									{/if}

									<button
										type="submit"
										disabled={quizSubmitting}
										class="bg-ecohubs-dark hover:bg-ecohubs-deep group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
									>
										{quizSubmitting ? 'Sending…' : "Show me my community's gaps"}
										{#if !quizSubmitting}
											<span class="transition-transform group-hover:translate-x-0.5">→</span>
										{/if}
									</button>
									{#if quizError}
										<p class="mt-3 text-[13px] text-red-700">{quizError}</p>
									{/if}
									<p class="mt-5 max-w-xl text-[13px] leading-relaxed font-light text-stone-600">
										Free. No payment. No upsell. We read your agreements, write your report, then
										delete the documents.
										<em class="font-story text-stone-700 italic">Your rules stay yours.</em>
									</p>
								</form>
							{:else}
								<div class="fade-in rounded-2xl border border-emerald-200/60 bg-white p-6">
									<div class="kicker mb-2 text-emerald-700">Thank you</div>
									<p class="text-ecohubs-deep font-serif text-[20px] leading-snug">
										Check your inbox in the next few minutes.
										<em class="font-story text-stone-600 italic">
											We'll ask for your community's agreements there.
										</em>
									</p>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<p class="font-story mt-6 text-center text-[13px] text-stone-500 italic">
				No grades, no pass/fail — just a clear picture of what's defined and what isn't.
			</p>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════
		4 · WHAT YOU'LL RECEIVE
		═══════════════════════════════════════════════════════════════ -->
	<section id="how" class="bg-[#fbfbf9] py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mb-14 max-w-3xl">
				<div class="kicker mb-4 text-emerald-700">What lands in your inbox</div>
				<h2 class="text-ecohubs-deep font-serif text-4xl leading-tight md:text-5xl">
					A personalized report.<br />
					<em class="font-story font-normal text-stone-500 italic"
						>Written by humans, within 5 business days.</em
					>
				</h2>
				<p class="mt-5 text-lg leading-relaxed font-light text-stone-700">
					After your quiz, we ask you to share your community's actual agreements — your
					constitution, rules, governance docs, however they're written. Our team reads them and
					sends back a complete map.
				</p>
			</div>

			<div class="grid gap-5 md:grid-cols-3">
				<article class="flex flex-col rounded-3xl border border-stone-200/70 bg-[#f5f2ea] p-7">
					<div class="kicker mb-4 text-emerald-700">01 · The picture</div>
					<h3 class="text-ecohubs-deep font-serif mb-2 text-xl leading-snug">
						A clear pie chart of your gaps.
					</h3>
					<p class="mb-6 text-[14.5px] leading-relaxed text-stone-700">
						What percentage of your community's rules are explicit, what's partially defined,
						what's missing entirely. One image, the whole landscape.
					</p>
					<div class="mt-auto flex items-center gap-4 pt-4">
						<svg viewBox="0 0 42 42" class="h-20 w-20 -rotate-90">
							<circle cx="21" cy="21" r="15.915" fill="#fff" stroke="#e7e5e4" stroke-width="6" />
							<circle
								cx="21"
								cy="21"
								r="15.915"
								fill="transparent"
								stroke="#064e3b"
								stroke-width="6"
								stroke-dasharray="22 78"
							/>
							<circle
								cx="21"
								cy="21"
								r="15.915"
								fill="transparent"
								stroke="#d97706"
								stroke-width="6"
								stroke-dasharray="44 56"
								stroke-dashoffset="-22"
							/>
							<circle
								cx="21"
								cy="21"
								r="15.915"
								fill="transparent"
								stroke="#a8a29e"
								stroke-width="6"
								stroke-dasharray="34 66"
								stroke-dashoffset="-66"
							/>
						</svg>
						<div class="font-mono text-[12px] leading-snug text-stone-600">
							<div class="flex items-center gap-2">
								<span class="bg-ecohubs-dark h-2 w-2 rounded-full"></span> Explicit
							</div>
							<div class="mt-1 flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-amber-600"></span> Partial
							</div>
							<div class="mt-1 flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-stone-400"></span> Missing
							</div>
						</div>
					</div>
				</article>

				<article class="flex flex-col rounded-3xl border border-stone-200/70 bg-[#f5f2ea] p-7">
					<div class="kicker mb-4 text-emerald-700">02 · The map</div>
					<h3 class="text-ecohubs-deep font-serif mb-2 text-xl leading-snug">
						A table of every category we checked.
					</h3>
					<p class="mb-6 text-[14.5px] leading-relaxed text-stone-700">
						For each area — decision-making, membership, money, conflict, accountability —
						exactly what's defined, what's vague, and what's missing in your specific documents.
					</p>
					<div
						class="mt-auto rounded-2xl border border-stone-200/80 bg-white p-4 pt-4 font-mono text-[11.5px] leading-[2] text-stone-600"
					>
						<div class="flex justify-between">
							<span>decision-making</span><span class="text-emerald-700">✅ explicit</span>
						</div>
						<div class="flex justify-between">
							<span>joining</span><span class="text-amber-700">🟡 partial</span>
						</div>
						<div class="flex justify-between">
							<span>leaving</span><span class="text-stone-500">⚪ missing</span>
						</div>
						<div class="flex justify-between">
							<span>finances</span><span class="text-amber-700">🟡 partial</span>
						</div>
						<div class="flex justify-between">
							<span>accountability</span><span class="text-stone-500">⚪ missing</span>
						</div>
					</div>
				</article>

				<article class="flex flex-col rounded-3xl border border-stone-200/70 bg-[#f5f2ea] p-7">
					<div class="kicker mb-4 text-emerald-700">03 · The path</div>
					<h3 class="text-ecohubs-deep font-serif mb-2 text-xl leading-snug">
						Three things to define, in order.
					</h3>
					<p class="mb-6 text-[14.5px] leading-relaxed text-stone-700">
						A prioritized action list — the gaps that, in our experience, tend to cause the most
						damage if they remain undefined. What to write down first, second, third.
					</p>
					<div class="mt-auto space-y-2.5 pt-4">
						<div class="flex items-start gap-3 text-[13px] text-stone-700">
							<span class="font-story text-ecohubs-primary w-6 shrink-0 text-lg italic">01</span>
							<span>Define what happens when a member leaves.</span>
						</div>
						<div class="flex items-start gap-3 text-[13px] text-stone-700">
							<span class="font-story text-ecohubs-primary w-6 shrink-0 text-lg italic">02</span>
							<span>Write down your accountability process.</span>
						</div>
						<div class="flex items-start gap-3 text-[13px] text-stone-700">
							<span class="font-story text-ecohubs-primary w-6 shrink-0 text-lg italic">03</span>
							<span>Make your decision-making process explicit.</span>
						</div>
					</div>
				</article>
			</div>

			<div
				class="bg-ecohubs-deep mt-10 flex flex-col gap-6 rounded-3xl p-6 text-stone-200/90 md:flex-row md:items-center md:gap-10 md:p-7"
			>
				<div class="flex shrink-0 items-center gap-3">
					<span
						class="pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-300 text-emerald-300"
					></span>
					<span class="kicker text-emerald-300/80">The honest version</span>
				</div>
				<p class="text-[15px] leading-relaxed font-light">
					No AI grading you in the background. Our team reads your actual documents, thinks about
					your specific context, and writes the report.
					<em class="font-story text-stone-100 italic"
						>That's why it takes five days, not five seconds.</em
					>
				</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════
		5 · FRUITHAVEN PILOT — trust signal
		═══════════════════════════════════════════════════════════════ -->
	<section class="relative overflow-hidden bg-[#f5f2ea] py-24 md:py-32">
		<div class="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
			<div class="relative lg:col-span-5">
				<div class="soft-shadow relative aspect-[4/5] overflow-hidden rounded-[32px]">
					<img
						src={fruithavenTeam}
						alt="FruitHaven community in Ecuador"
						class="h-full w-full object-cover"
						loading="lazy"
					/>
					<div
						class="absolute bottom-4 left-4 rounded font-mono text-[11px] tracking-widest text-[#4b5b51] uppercase"
						style="background:rgba(255,255,255,0.85); padding:4px 9px;"
					>
						FruitHaven · Ecuador
					</div>
				</div>
				<div
					class="soft-shadow absolute -right-2 -bottom-6  rounded-2xl border border-stone-200 bg-white px-5 py-4 md:-right-6"
				>
					<div
						class="mb-1 flex items-center gap-2 text-xs tracking-widest text-emerald-700 uppercase"
					>
						<span
							class="pulse-dot relative inline-block h-2 w-2 rounded-full bg-emerald-600 text-emerald-600"
						></span>
						First pilot
					</div>
					<div class="text-ecohubs-deep font-serif text-lg">FruitHaven</div>
					<div class="mt-1 text-xs text-stone-500">Intentional community · Ecuador</div>
				</div>
			</div>

			<div class="lg:col-span-7">
				<div class="kicker mb-4 text-emerald-700">Where this began</div>
				<h2 class="text-ecohubs-deep font-serif mb-6 text-4xl leading-tight md:text-5xl">
					We piloted this with FruitHaven,
					<em class="font-story font-normal text-stone-500 italic">
						an intentional community in Ecuador.
					</em>
				</h2>
				<p class="mb-8 max-w-xl text-lg leading-relaxed font-light text-stone-700">
					Real people, real history, real conflict. The first community to let us read everything
					they had written down — and everything they hadn't — and tell them, honestly, where the
					gaps were.
				</p>
				<blockquote class="max-w-xl border-l-2 border-emerald-700/40 pl-6">
					<p class="font-story text-ecohubs-deep text-xl leading-snug italic md:text-[22px]">
						"It really touches points in us. We can feel it. We're excited for the first time in a
						long time."
					</p>
					<p class="mt-3 text-sm text-stone-500">— Member, FruitHaven</p>
				</blockquote>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════
		6 · IS THIS FOR US? — objection handling
		═══════════════════════════════════════════════════════════════ -->
	<section class="bg-[#fbfbf9] py-24 md:py-32">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<div class="mb-12">
				<div class="kicker mb-4 text-emerald-700">Is this for us?</div>
				<h2 class="text-ecohubs-deep font-serif text-4xl leading-tight md:text-5xl">
					Three things people quietly worry about
					<em class="font-story font-normal text-stone-500 italic">before asking.</em>
				</h2>
			</div>

			<div class="space-y-4">
				<details class="group rounded-3xl border border-stone-200/80 bg-white p-7 md:p-8" open>
					<summary class="flex items-start justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-stone-500">Worry #1</div>
							<h3 class="text-ecohubs-deep font-serif text-xl leading-snug md:text-2xl">
								"Our community is small or informal."
							</h3>
						</div>
						<span
							class="obj-arrow text-ecohubs-dark flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xl"
							>+</span
						>
					</summary>
					<p class="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-stone-700">
						If you have more than five people sharing a space, this is for you. Smaller and
						informal communities often have the most implicit rules — and the most to gain from
						making them explicit.
					</p>
				</details>

				<details class="group rounded-3xl border border-stone-200/80 bg-white p-7 md:p-8">
					<summary class="flex items-start justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-stone-500">Worry #2</div>
							<h3 class="text-ecohubs-deep font-serif text-xl leading-snug md:text-2xl">
								"We've been around for years — we're past this."
							</h3>
						</div>
						<span
							class="obj-arrow text-ecohubs-dark flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xl"
							>+</span
						>
					</summary>
					<p class="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-stone-700">
						Established communities often discover the deepest gaps. Time conceals what conflict
						eventually reveals. The longer something has worked informally, the more painful it
						tends to be when the informal version breaks.
					</p>
				</details>

				<details class="group rounded-3xl border border-stone-200/80 bg-white p-7 md:p-8">
					<summary class="flex items-start justify-between gap-6">
						<div>
							<div class="kicker mb-3 text-stone-500">Worry #3</div>
							<h3 class="text-ecohubs-deep font-serif text-xl leading-snug md:text-2xl">
								"We don't want to be judged."
							</h3>
						</div>
						<span
							class="obj-arrow text-ecohubs-dark flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-xl"
							>+</span
						>
					</summary>
					<p class="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-stone-700">
						We don't judge. There's no score, no grade, no pass/fail. We support communities — we
						don't audit them. The report is just a clear map of what's defined and what isn't, so
						you can decide what to do next.
					</p>
				</details>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════
		7 · FINAL CTA
		═══════════════════════════════════════════════════════════════ -->
	<section class="relative bg-ecohubs-deep overflow-hidden py-24 md:py-36" style="background-image: radial-gradient(circle at 30% 20%, rgba(16,185,129,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(217,119,6,0.15), transparent 55%);">
		<div class="absolute inset-0 -z-10 bg-linear-to-b from-[#0b2e24] to-[#2a2e2d]"></div>
		<div
			class="absolute inset-0 -z-10 opacity-30"
			style="background-image: radial-gradient(circle at 30% 30%, rgba(16,185,129,0.25), transparent 50%);"
		></div>

		<div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
			<div class="kicker mb-6 text-emerald-300/80">One last thing, before you go</div>
			<h2
				class="font-serif text-4xl leading-[1.08] tracking-tight text-[#f5f2ea] md:text-5xl lg:text-6xl"
			>
				In our pilots, <span class="text-emerald-300">40–50%</span> of crucial rules weren't
				written down.
				<em class="font-story font-normal text-stone-300 italic"
					>Where does your community land?</em
				>
			</h2>
			<p class="mx-auto mt-7 max-w-xl text-lg leading-relaxed font-light text-stone-300/85">
				Send us your community's agreements after the quiz. We'll read them, write a personalized
				report, and have it in your inbox within five business days. Free.
			</p>

			{#if !form2Done}
				<form
					autocomplete="off"
					onsubmit={onForm2Submit}
					class="mx-auto mt-12 max-w-[550px]"
				>
					<div
						class="flex flex-col gap-3 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur sm:flex-row"
					>
						<input
							type="email"
							required
							bind:value={form2Email}
							placeholder="your@email.com"
							class="flex-1 bg-transparent px-5 py-3.5 border-0 text-[15px] text-[#f5f2ea] placeholder-stone-400 focus:outline-none"
						/>
						<button
							type="submit"
							disabled={form2Submitting}
							class="text-ecohubs-deep rounded-full bg-emerald-400 px-6 py-3.5 text-[15px] font-medium whitespace-nowrap transition-colors cursor-pointer hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{form2Submitting ? 'Sending…' : 'Send me my resilience report →'}
						</button>
					</div>
					{#if form2Error}
						<p class="mt-3 text-[13px] text-red-300">{form2Error}</p>
					{/if}
					<p class="mt-5 text-[13px] leading-relaxed font-light text-stone-400/90">
						Free. No payment. No upsell. We read your agreements, write your report, then delete
						the documents.
						<em class="font-story text-stone-300 italic">Your rules stay yours.</em>
					</p>
				</form>
			{:else}
				<div
					class="fade-in mx-auto mt-12 max-w-lg rounded-3xl border border-emerald-300/20 bg-white/5 p-7 text-left"
				>
					<div class="kicker mb-3 text-emerald-300/90">You're in.</div>
					<p class="font-serif text-[22px] leading-snug text-[#f5f2ea]">
						Check your inbox in the next few minutes.
						<em class="font-story text-emerald-300 italic"
							>We'll ask for your community's agreements there.</em
						>
					</p>
				</div>
			{/if}

			<!-- Footer mark — non-clickable brand only -->
			<div class="mt-20 flex flex-col items-center gap-3 border-t border-white/10 pt-10 opacity-70">
				<svg
					viewBox="0 0 1920 1920"
					class="h-8 w-8 brightness-[1.6]"
					xmlns="http://www.w3.org/2000/svg"
					aria-label="EcoHubs"
				>
					<g>
						<path
							d="M375.183,374.836c31.204,-31.205 218.513,-64.394 371.175,88.268c91.285,91.286 206.245,429.736 176.537,459.444c-26.768,26.768 -368.158,-85.252 -459.443,-176.538c-164.72,-164.72 -123.097,-336.346 -88.269,-371.174Z"
							fill="#064e3b"
						/>
						<path
							d="M1544.82,1549.04c-31.204,31.204 -218.513,64.393 -371.175,-88.269c-91.285,-91.286 -206.245,-429.736 -176.537,-459.444c26.768,-26.768 368.158,85.252 459.443,176.538c164.72,164.72 123.097,336.346 88.269,371.175Z"
							fill="#064e3b"
						/>
						<path
							d="M1547.1,377.119c31.204,31.204 64.393,218.512 -88.269,371.174c-91.285,91.286 -429.736,206.245 -459.443,176.538c-26.769,-26.768 85.252,-368.158 176.537,-459.444c164.72,-164.72 336.347,-123.097 371.175,-88.268Z"
							fill="#064e3b"
						/>
						<path
							d="M372.9,1546.75c-31.204,-31.205 -64.393,-218.513 88.269,-371.175c91.285,-91.285 429.736,-206.245 459.443,-176.538c26.769,26.769 -85.252,368.158 -176.537,459.444c-164.72,164.72 -336.347,123.097 -371.175,88.269Z"
							fill="#064e3b"
						/>
					</g>
					<path
						d="M958.921,115.51c28.189,0 127.783,69.613 127.783,207.521c0,82.464 -100.947,287.26 -127.783,287.26c-24.181,0 -127.783,-204.796 -127.783,-287.26c0,-148.801 96.321,-207.521 127.783,-207.521Z"
						fill="#1a8e7b"
					/>
					<path
						d="M967.41,1804.49c-28.189,0 -127.783,-69.613 -127.783,-207.521c0,-82.464 100.946,-287.26 127.783,-287.26c24.181,0 127.783,204.796 127.783,287.26c0,148.801 -96.321,207.521 -127.783,207.521Z"
						fill="#1a8e7b"
					/>
					<path
						d="M1808.18,964.093c0,28.189 -69.612,127.783 -207.521,127.783c-82.463,0 -287.259,-100.946 -287.259,-127.783c0,-24.181 204.796,-127.782 287.259,-127.782c148.801,0 207.521,96.32 207.521,127.782Z"
						fill="#1a8e7b"
					/>
					<path
						d="M116.131,957.721c0,-28.189 69.612,-127.783 207.521,-127.783c82.463,0 287.259,100.947 287.259,127.783c0,24.181 -204.796,127.783 -287.259,127.783c-148.801,0 -207.521,-96.321 -207.521,-127.783Z"
						fill="#1a8e7b"
					/>
				</svg>
				<div class="font-serif text-[15px] text-stone-300/80">
					EcoHubs · <em class="font-story italic">a quiet project, in the open</em>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Page-scoped styles. Reusable utilities (.kicker, .hairline, .grain,
	   .pulse-dot, .soft-shadow, .font-story, .font-mono) live in
	   src/routes/layout.css and are inherited via this route's +layout.svelte. */

	.landing-root {
		/* Make sure body bg shows through even though there's no global
		   layout wrapper for this route. */
		background: #fbfbf9;
		color: #1c1917;
		overflow-x: hidden;
	}

	.q-card {
		background: #ffffff;
		border: 1px solid rgb(231 229 228 / 0.7);
		border-radius: 28px;
	}

	/* Radio option pills */
	.opt {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 18px;
		border: 1px solid rgb(231 229 228);
		border-radius: 9999px;
		background: #fbfbf9;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background 0.15s,
			transform 0.1s;
		font-size: 15px;
		color: #292524;
		position: relative;
	}
	.opt:hover {
		border-color: #064e3b;
		background: #f5f2ea;
	}
	.opt input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	.opt .dot {
		width: 22px;
		height: 22px;
		border-radius: 9999px;
		border: 1.5px solid #d6d3d1;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.opt .dot::after {
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 9999px;
		background: #064e3b;
		transform: scale(0);
		transition: transform 0.15s;
	}
	.opt.selected {
		border-color: #064e3b;
		background: #ecfdf5;
	}
	.opt.selected .dot {
		border-color: #064e3b;
	}
	.opt.selected .dot::after {
		transform: scale(1);
	}
	.opt .glyph {
		width: 28px;
		height: 28px;
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		flex-shrink: 0;
	}

	/* Progress dots above each question */
	.q-nav-dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		background: #e7e5e4;
		transition: all 0.2s;
	}
	.q-nav-dot.done {
		background: #064e3b;
	}
	.q-nav-dot.current {
		background: #059669;
		width: 24px;
	}

	/* Form fields */
	.field {
		width: 100%;
		padding: 16px 20px;
		border: 1px solid rgb(231 229 228);
		border-radius: 9999px;
		background: #fff;
		font-size: 16px;
		transition: border-color 0.15s;
		font-family: inherit;
	}
	.field:focus {
		outline: none;
		border-color: #064e3b;
	}

	/* Community-size segmented buttons */
	.seg-btn {
		padding: 10px 14px;
		border: 1px solid rgb(231 229 228);
		border-radius: 9999px;
		background: #fff;
		font-size: 13.5px;
		color: #44403c;
		cursor: pointer;
		transition: all 0.15s;
		font-family: inherit;
	}
	.seg-btn:hover {
		border-color: #064e3b;
	}
	.seg-btn.selected {
		background: #064e3b;
		border-color: #064e3b;
		color: #fbfbf9;
	}

	/* Native <details> accordion polish */
	details > summary {
		list-style: none;
		cursor: pointer;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
	details[open] :global(.obj-arrow) {
		transform: rotate(45deg);
	}
	.obj-arrow,
	:global(.obj-arrow) {
		transition: transform 0.2s;
	}

	/* Fade-in for result / success states */
	.fade-in {
		animation: fadeIn 0.4s ease-out both;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
