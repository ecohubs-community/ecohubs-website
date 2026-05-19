<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ApplicationForm from '$lib/components/ApplicationForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Apply to join — EcoHubs.community"
	description="A short application, read by real people, decided in the open. Free, contribution-based, and held together by a community that's writing the Blueprint for a different way to live."
	ogImage="/og-join.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Apply', url: 'https://ecohubs.community/join' }
	]}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-b from-ecohubs-ivory via-ecohubs-base to-ecohubs-base"
	></div>
	<div
		class="absolute -z-10 top-20 -left-40 w-[420px] h-[420px] rounded-full bg-emerald-200/25 blur-3xl"
	></div>
	<div
		class="absolute -z-10 bottom-0 -right-20 w-[360px] h-[360px] rounded-full bg-amber-200/30 blur-3xl"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="kicker text-emerald-700 mb-5 flex items-center gap-3">
			<span
				class="relative inline-block w-2 h-2 rounded-full bg-emerald-600 text-emerald-600 pulse-dot"
			></span>
			Open · Free · Contribution-based
		</div>
		<h1
			class="font-serif text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			Tell us who you are<span class="font-story italic font-light text-stone-400">,</span><br />
			<em class="font-story italic font-normal text-ecohubs-primary">in your own words.</em>
		</h1>
		<p class="mt-7 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			This is the application. Twenty quiet minutes, five short chapters, no recruiter screen. What
			you write here lands in front of real people who read every answer — and decide together who
			joins next.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		2. EXPECTATIONS — what to expect, in 3 lines
═══════════════════════════════════════════════════════════════════ -->
<section class="bg-ecohubs-base pb-28 md:pb-34">
	<div class="max-w-4xl mx-auto px-6 lg:px-8">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
			<div
				class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60"
			>
				<span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
				<div>
					<div class="font-serif text-base text-ecohubs-deep">~20 minutes</div>
					<div class="text-stone-600 text-sm mt-0.5">Background, values, a question of yours.</div>
				</div>
			</div>
			<div
				class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60"
			>
				<span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
				<div>
					<div class="font-serif text-base text-ecohubs-deep">3 days</div>
					<div class="text-stone-600 text-sm mt-0.5">Community review and vote on ecohubsOS.</div>
				</div>
			</div>
			<div
				class="flex items-start gap-3 p-4 rounded-2xl bg-ecohubs-ivory border border-stone-200/60"
			>
				<span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
				<div>
					<div class="font-serif text-base text-ecohubs-deep">No fee, ever</div>
					<div class="text-stone-600 text-sm mt-0.5">No wallet, no credit card, no upsell.</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		3. THE FORM
		Section starts further down (more breathing room above the band),
		and the form card is pulled up with a negative margin so it
		visually crosses the section's top edge — like a letter sliding
		out from under the seal.
═══════════════════════════════════════════════════════════════════ -->
<section class="pt-40 md:pt-56 pb-16 md:pb-24 bg-ecohubs-ivory relative overflow-visible">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>
	<div
		class="absolute -z-0 -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
	></div>
	<div
		class="absolute -z-0 -bottom-32 -left-32 w-[360px] h-[360px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none"
	></div>

	<div class="max-w-4xl mx-auto px-6 lg:px-8 relative -mt-56 md:-mt-72">
		<ApplicationForm {data} />

		<p
			class="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto font-story italic leading-relaxed"
		>
			Completing the form is not a guarantee — it's an honest conversation. We answer everyone,
			either way, usually within a few days.
		</p>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		4. CLOSING NOTE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-16 md:py-20 bg-ecohubs-base border-t border-stone-200/70 text-center">
	<div class="max-w-2xl mx-auto px-6 lg:px-8">
		<div class="kicker text-emerald-700 mb-3">Just looking?</div>
		<p class="font-story italic text-xl md:text-2xl text-ecohubs-deep leading-snug">
			Read the <a
				href="/membership"
				class="text-ecohubs-primary not-italic hover:text-ecohubs-deep underline decoration-ecohubs-primary/40 underline-offset-4 hover:decoration-ecohubs-primary"
				>membership page</a
			>
			or the
			<a
				href="/blueprint"
				class="text-ecohubs-primary not-italic hover:text-ecohubs-deep underline decoration-ecohubs-primary/40 underline-offset-4 hover:decoration-ecohubs-primary"
				>Blueprint</a
			>
			first — applying when you're ready works better for everyone.
		</p>
	</div>
</section>

<style>
	/* Page-local: form fields need Inter explicitly because the global selectors
	   in layout.css don't reach <input>/<textarea>/<select>/<label>/<button>. */
	:global(main label),
	:global(main input),
	:global(main textarea),
	:global(main select),
	:global(main button) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}
</style>
