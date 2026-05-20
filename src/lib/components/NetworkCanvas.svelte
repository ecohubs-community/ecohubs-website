<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let width = 0;
	let height = 0;
	let particles: Particle[] = [];
	let animationId: number | null = null;
	let running = false;
	let lastFrame = 0;

	// Mobile gets a much smaller particle set — the O(n²) inner loop is the
	// main reason mobile Lighthouse dropped TBT points. 15 particles ≈ 225
	// distance checks/frame vs 50 ≈ 2500. Mobile also throttles to 30fps.
	const isMobile = browser && window.innerWidth < 768;
	const particleCount = isMobile ? 15 : 50;
	const frameInterval = isMobile ? 33 : 0; // ~30fps on mobile, uncapped on desktop
	const connectionDistance = 180;
	const mouseDistance = 250;

	const mouse = { x: null as number | null, y: null as number | null };

	class Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		color: string;

		constructor() {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.vx = (Math.random() - 0.5) * 0.2;
			this.vy = (Math.random() - 0.5) * 0.2;
			this.size = Math.random() * 2 + 1;
			this.color = 'rgba(5, 150, 105, ';
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;

			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;

			if (mouse.x != null && mouse.y != null) {
				const dx = mouse.x - this.x;
				const dy = mouse.y - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouseDistance) {
					const forceDirectionX = dx / distance;
					const forceDirectionY = dy / distance;
					const force = (mouseDistance - distance) / mouseDistance;
					const directionX = forceDirectionX * force * 0.5;
					const directionY = forceDirectionY * force * 0.5;
					this.vx -= directionX * 0.1;
					this.vy -= directionY * 0.1;
				}
			}
		}

		draw() {
			if (!ctx) return;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = this.color + '0.3)';
			ctx.fill();
		}
	}

	function resize() {
		if (!canvas) return;
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	function initParticles() {
		particles = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}
	}

	function animate(now = 0) {
		if (!ctx || !running) {
			animationId = null;
			return;
		}

		// Throttle on mobile so we render half as many frames.
		if (frameInterval && now - lastFrame < frameInterval) {
			animationId = requestAnimationFrame(animate);
			return;
		}
		lastFrame = now;

		ctx.clearRect(0, 0, width, height);

		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();

			for (let j = i; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < connectionDistance) {
					ctx.beginPath();
					const opacity = 1 - distance / connectionDistance;
					ctx.strokeStyle = 'rgba(5, 150, 105,' + opacity * 0.1 + ')';
					ctx.lineWidth = 1;
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		}
		animationId = requestAnimationFrame(animate);
	}

	function start() {
		if (running) return;
		running = true;
		lastFrame = 0;
		animationId = requestAnimationFrame(animate);
	}

	function stop() {
		running = false;
		if (animationId !== null) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
	}

	onMount(() => {
		if (!browser) return;

		// Respect reduced-motion: draw a single static frame, never animate.
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const cleanupFns: Array<() => void> = [];

		const init = () => {
			if (!canvas) return;
			ctx = canvas.getContext('2d');
			if (!ctx) return;

			resize();
			initParticles();

			if (reduceMotion) {
				// One static frame for visual presence, no rAF loop.
				ctx.clearRect(0, 0, width, height);
				for (const p of particles) p.draw();
				return;
			}

			start();

			const handleMouseMove = (e: MouseEvent) => {
				mouse.x = e.clientX;
				mouse.y = e.clientY;
			};
			const handleMouseLeave = () => {
				mouse.x = null;
				mouse.y = null;
			};
			const handleVisibilityChange = () => {
				if (document.hidden) stop();
				else if (visible) start();
			};

			// Track on-screen visibility — when the canvas (or rather its
			// fixed-positioned spot) is fully out of view, pause the loop.
			let visible = true;
			const io = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						visible = entry.isIntersecting;
						if (!visible) stop();
						else if (!document.hidden) start();
					}
				},
				{ threshold: 0 }
			);
			io.observe(canvas);

			window.addEventListener('resize', resize);
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseleave', handleMouseLeave);
			document.addEventListener('visibilitychange', handleVisibilityChange);

			cleanupFns.push(
				() => stop(),
				() => io.disconnect(),
				() => window.removeEventListener('resize', resize),
				() => window.removeEventListener('mousemove', handleMouseMove),
				() => window.removeEventListener('mouseleave', handleMouseLeave),
				() => document.removeEventListener('visibilitychange', handleVisibilityChange)
			);
		};

		// Defer init to after first paint so the canvas doesn't compete with
		// the LCP image for the main thread.
		const timer = setTimeout(init, 0);
		cleanupFns.push(() => clearTimeout(timer));

		return () => {
			for (const fn of cleanupFns) fn();
		};
	});
</script>

<canvas
	bind:this={canvas}
	id="network-canvas"
	class="fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none"
	style="z-index: -1;"
	aria-hidden="true"
></canvas>
