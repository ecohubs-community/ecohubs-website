<script lang="ts">
	import { Users, GitBranch, Vote, Flower2, Sprout, Leaf, Heart } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	let heroText: HTMLElement;
	let heroSub: HTMLElement;
	let heroCta: HTMLElement;
	let heroVisual: HTMLElement;
	let heroSection: HTMLElement;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		
		if (prefersReducedMotion) {
			// Just fade in without animations
			if (heroText) heroText.style.opacity = '1';
			if (heroSub) heroSub.style.opacity = '1';
			if (heroCta) heroCta.style.opacity = '1';
			if (heroVisual) heroVisual.style.opacity = '1';
			return;
		}

		// Animate hero text elements with stagger
		animate(
			heroText,
			{ opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
			{ duration: 0.8, easing: [0.22, 1, 0.36, 1] }
		);

		animate(
			heroSub,
			{ opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
			{ duration: 0.8, delay: 0.2, easing: [0.22, 1, 0.36, 1] }
		);

		animate(
			heroCta,
			{ opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
			{ duration: 0.6, delay: 0.4, easing: [0.22, 1, 0.36, 1] }
		);

		animate(
			heroVisual,
			{ 
				opacity: [0, 1], 
				transform: ['translateX(50px)', 'translateX(0px)'],
				filter: ['blur(10px)', 'blur(0px)']
			},
			{ duration: 1, delay: 0.3, easing: [0.22, 1, 0.36, 1] }
		);

		// Animate floating badges
		const badges = heroSection.querySelectorAll('.floating-badge');
		badges.forEach((badge, index) => {
			animate(
				badge as HTMLElement,
				{
					opacity: [0, 1],
					transform: ['scale(0.8) translateY(20px)', 'scale(1) translateY(0px)']
				},
				{ duration: 0.6, delay: 0.8 + index * 0.1, easing: [0.22, 1, 0.36, 1] }
			);
		});
	});
</script>

<section bind:this={heroSection} class="relative min-h-screen flex items-center pt-20 overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left Content -->
			<div class="z-10 order-2 lg:order-1">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100"
				>
					<span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
					<span class="text-xs font-bold text-blue-600 tracking-widest uppercase">
						Regenerative Web3
					</span>
				</div>

				<h1
					bind:this={heroText}
					class="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-ecohubs-dark opacity-0"
				>
					A Regenerative Future
					<span class="text-gradient">Designed Together</span>
				</h1>

				<p bind:this={heroSub} class="mt-4 text-xl text-gray-600 font-light leading-relaxed max-w-lg opacity-0">
					We are co-creating the world's first open-source blueprint for regenerative communities
					— where technology supports life, and people live in harmony with nature.
				</p>

				<div bind:this={heroCta} class="mt-12 flex flex-col sm:flex-row gap-4 opacity-0">
					<a
						href="/join"
						class="px-8 py-4 bg-ecohubs-primary text-white font-medium rounded-xl hover:bg-ecohubs-dark transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:scale-105 hover:rotate-1 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="Join the First 500 Pioneers"
						data-sveltekit-preload-data="hover"
					>
						Join the First 500 Pioneers
						<Users class="h-4 w-4" aria-hidden="true" />
					</a>
					<a
						href="/vision"
						class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-ecohubs-primary hover:text-ecohubs-primary hover:scale-105 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-green-400"
						aria-label="See the Blueprint Vision"
						data-sveltekit-preload-data="hover"
					>
						See the Blueprint Vision
					</a>
				</div>

				<div class="mt-16 flex items-start gap-4">
					<div class="flex -space-x-3">
						<div
							class="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md"
						>
							<Sprout class="h-5 w-5 text-white" aria-hidden="true" />
						</div>
						<div
							class="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md"
						>
							<Users class="h-5 w-5 text-white" aria-hidden="true" />
						</div>
						<div
							class="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md"
						>
							<Leaf class="h-5 w-5 text-white" aria-hidden="true" />
						</div>
						<div
							class="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-md"
						>
							<Heart class="h-5 w-5 text-white" aria-hidden="true" />
						</div>
					</div>
					<div class="flex-1">
						<p class="text-sm font-medium text-gray-700 leading-relaxed">
							A growing movement of people designing regenerative communities.
						</p>
						<p class="text-xs text-gray-500 mt-1">
							Join the pioneers shaping the first 500-member co-creation network.
						</p>
					</div>
				</div>
			</div>

			<!-- Right Visual -->
			<div bind:this={heroVisual} class="order-1 lg:order-2 relative opacity-0">
				<!-- Blob Background -->
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-emerald-100/50 to-orange-100/50 rounded-full blur-3xl -z-10"
				></div>

				<!-- Main Image -->
				<div class="relative w-full aspect-4/5 md:aspect-square">
					<img
						src="/src/lib/assets/hero.webp"
						alt="Nature and Technology"
						width="800"
						height="800"
						class="w-full h-full object-cover organic-shape shadow-2xl shadow-emerald-900/10"
						loading="eager"
					/>

					<!-- Floating Badges -->
					<div class="absolute bottom-2 left-0 flex flex-col gap-2 floating-leaf floating-badge opacity-0">
						<div
							class="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-emerald-100"
						>
							<div class="text-xs font-bold text-emerald-600 flex items-center gap-2">
								<div class="bg-green-100 p-2 rounded-lg text-green-600">
									<GitBranch class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<div class="text-xs font-bold text-gray-400 uppercase">
										Actively create the future
									</div>
									<div class="text-lg font-serif text-gray-900">Blueprint in Co-Creation</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="absolute bottom-[45%] -right-3 flex flex-col gap-2 floating-leaf floating-leaf-delay-2000 floating-badge opacity-0"
					>
						<div
							class="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-blue-100"
						>
							<div class="text-xs font-bold text-blue-600 flex items-center gap-2">
								<div class="bg-blue-100 p-2 rounded-lg text-blue-600">
									<Vote class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<div class="text-xs font-bold text-gray-400 uppercase">Collaborate with the community</div>
									<div class="text-lg font-serif text-gray-900">DAO Governance Enabled</div>
								</div>
							</div>
						</div>
					</div>
					<div class="absolute top-4 left-14 flex flex-col gap-2 floating-leaf floating-leaf-delay-1000 floating-badge opacity-0">
						<div
							class="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-teal-100"
						>
							<div class="text-xs font-bold text-teal-600 flex items-center gap-2">
								<div class="bg-teal-100 p-2 rounded-lg text-teal-600">
									<Flower2 class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<div class="text-xs font-bold text-gray-400 uppercase">Build for the long-term</div>
									<div class="text-lg font-serif text-gray-900">Nature-Inspired Systems</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
