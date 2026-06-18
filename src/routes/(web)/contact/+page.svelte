<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { Mail, MessageSquare, Users } from 'lucide-svelte';

	const channels = [
		{
			Icon: Mail,
			kicker: 'Email',
			title: 'Write us a real letter',
			body: 'Long answers welcome. Short ones too, if you mean them. We read everything that lands here.',
			cta: 'hello@ecohubs.community',
			href: 'mailto:hello@ecohubs.community',
			external: false,
			iconColor: 'text-emerald-700',
			iconBg: 'bg-emerald-50'
		},
		{
			Icon: MessageSquare,
			kicker: 'Discord',
			title: 'Join the conversation already underway',
			body: 'Public channels for open discussion, member channels for the deeper work. Lurking is welcome.',
			cta: 'Open Discord',
			href: 'https://discord.gg/Xnh7247Nq3',
			external: true,
			iconColor: 'text-indigo-700',
			iconBg: 'bg-indigo-50'
		},
		{
			Icon: Users,
			kicker: 'Membership',
			title: 'Help write the Blueprint with us',
			body: 'If your question is really an arrival — apply for membership. The community itself reads each one.',
			cta: 'Apply now',
			href: '/membership',
			external: false,
			iconColor: 'text-amber-700',
			iconBg: 'bg-amber-50'
		}
	];
</script>


<SEO
	title="Get in touch — EcoHubs.community"
	description="Write to us, join the conversation on Discord, or apply for membership. We answer everyone, with care."
	ogImage="/og-contact.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Contact', url: 'https://ecohubs.community/contact' }
	]}
/>

<!-- ═══════════════════════════════════════════════════════════════════
		1. HERO
═══════════════════════════════════════════════════════════════════ -->
<section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
		<div class="kicker text-emerald-700 mb-5">An open door</div>
		<h1
			class="font-serif text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-ecohubs-deep"
		>
			Say hello<span class="font-story italic font-light text-stone-400">,</span><br />
			<em class="font-story italic font-normal text-stone-500">we'll write back.</em>
		</h1>
		<p class="mt-7 text-lg text-stone-700 leading-relaxed max-w-2xl font-light">
			Questions, ideas, criticism, an introduction, an offer to help — all welcome here. A real
			person reads each message and replies, usually within a few days.
		</p>
	</div>
</section>

<div class="hairline max-w-4xl mx-auto"></div>

<!-- ═══════════════════════════════════════════════════════════════════
		2. CHANNELS — three doorways in
═══════════════════════════════════════════════════════════════════ -->
<section class="py-20 md:py-24 bg-ecohubs-base">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="max-w-2xl mb-12">
			<div class="kicker text-emerald-700 mb-4">A few ways in</div>
			<h2 class="font-serif text-3xl md:text-4xl text-ecohubs-deep leading-tight">
				Pick the door that <em class="font-story italic font-normal text-stone-500"
					>feels honest.</em
				>
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
			{#each channels as ch}
				{@const ChIcon = ch.Icon}
				<a
					href={ch.href}
					target={ch.external ? '_blank' : undefined}
					rel={ch.external ? 'noopener noreferrer' : undefined}
					class="no-external-decoration group bg-white rounded-3xl p-7 md:p-8 border border-stone-200/80 hover:border-ecohubs-primary/50 transition-colors flex flex-col"
				>
					<div
						class="w-12 h-12 {ch.iconBg} rounded-xl flex items-center justify-center {ch.iconColor} mb-5"
					>
						<ChIcon class="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
					</div>
					<div class="font-mono text-[11px] tracking-widest uppercase text-emerald-700 mb-3">
						{ch.kicker}
					</div>
					<h3 class="font-serif text-xl md:text-[22px] text-ecohubs-deep leading-snug mb-3">
						{ch.title}
					</h3>
					<p class="text-stone-700 leading-relaxed text-[15px] flex-1">{ch.body}</p>
					<div class="mt-6 pt-5 border-t border-stone-100">
						<span
							class="text-sm text-ecohubs-dark font-medium group-hover:translate-x-0.5 inline-block transition-transform"
						>
							{ch.cta} <span aria-hidden="true">{ch.external ? '↗' : '→'}</span>
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		3. FORM
═══════════════════════════════════════════════════════════════════ -->
<section id="form" class="py-20 md:py-28 bg-ecohubs-ivory relative overflow-hidden">
	<div class="absolute inset-0 grain pointer-events-none opacity-40"></div>
	<div
		class="absolute -z-0 -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
	></div>
	<div
		class="absolute -z-0 -bottom-32 -left-32 w-[360px] h-[360px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none"
	></div>

	<div class="max-w-5xl mx-auto px-6 lg:px-8 relative">
		<div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
			<!-- LEFT: framing -->
			<div class="lg:col-span-5 lg:sticky lg:top-28">
				<div class="kicker text-emerald-700 mb-4">Or send a message</div>
				<h2 class="font-serif text-3xl md:text-[40px] text-ecohubs-deep leading-tight mb-6">
					A short message,<br />
					read by <em class="font-story italic font-normal text-stone-500">a real person.</em>
				</h2>
				<p class="text-stone-700 leading-relaxed mb-6">
					Not a ticketing system. Not an autoresponder. Whatever you write here lands in the same
					inbox the founders read. Most replies arrive within a few days.
				</p>
				<ul class="space-y-3 text-sm text-stone-600">
					<li class="flex items-start gap-2">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<span>No newsletter signup, no marketing list.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<span
							>If you're applying for membership, the form at <a
								href="/join"
								class="text-ecohubs-dark underline decoration-ecohubs-primary/40 underline-offset-4 hover:decoration-ecohubs-primary"
								>/join</a
							> is the better place.</span
						>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-2 w-1.5 h-1.5 rounded-full bg-ecohubs-primary shrink-0"></span>
						<span>For press or partnerships, a sentence on context is enough to start.</span>
					</li>
				</ul>
			</div>

			<!-- RIGHT: form card -->
			<div class="lg:col-span-7">
				<div class="bg-white rounded-3xl border border-stone-200/70 soft-shadow p-7 md:p-10">
					<ContactForm />
				</div>
				<p class="mt-5 text-center text-xs text-stone-500 font-story italic">
					Your message goes only to the EcoHubs team. We don't share it, and we don't add you to
					anything.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════════════════════════════
		4. CLOSING NOTE
═══════════════════════════════════════════════════════════════════ -->
<section class="py-20 md:py-28 bg-ecohubs-base text-center">
	<div class="max-w-2xl mx-auto px-6 lg:px-8">
		<div class="kicker text-emerald-700 mb-4">A small promise</div>
		<p class="font-serif text-2xl md:text-3xl text-ecohubs-deep leading-snug">
			Whatever the answer,
			<em class="font-story italic font-normal text-stone-500">you'll hear from a human</em>
			— with care.
		</p>
	</div>
</section>

<style>
	:global(main p),
	:global(main li),
	:global(main label),
	:global(main input),
	:global(main textarea),
	:global(main button),
	:global(main span:not([class*='font-'])),
	:global(main div:not([class*='font-'])) {
		font-family:
			'Inter Variable',
			'Inter',
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	:global(.font-story) {
		font-family: var(--font-story, 'Fraunces', serif);
		font-optical-sizing: auto;
	}

	:global(.kicker) {
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		font-weight: 600;
	}

	:global(.soft-shadow) {
		box-shadow: 0 30px 60px -30px rgba(11, 46, 36, 0.25);
	}

	.hairline {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(6, 78, 59, 0.25), transparent);
	}

	:global(.grain)::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.5;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}
</style>
