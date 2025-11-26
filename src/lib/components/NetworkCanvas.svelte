<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let width = 0;
	let height = 0;
	let particles: Particle[] = [];
	let animationId: number;

	// Configuration - Calmer settings
	const particleCount = browser && window.innerWidth < 768 ? 30 : 50;
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
			// Much slower velocity for "calm" effect
			this.vx = (Math.random() - 0.5) * 0.2;
			this.vy = (Math.random() - 0.5) * 0.2;
			this.size = Math.random() * 2 + 1;
			// Darker green/gray color for visibility on light bg
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
				let dx = mouse.x - this.x;
				let dy = mouse.y - this.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouseDistance) {
					const forceDirectionX = dx / distance;
					const forceDirectionY = dy / distance;
					const force = (mouseDistance - distance) / mouseDistance;
					// Gentle push
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

	function animate() {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);

		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();

			for (let j = i; j < particles.length; j++) {
				let dx = particles[i].x - particles[j].x;
				let dy = particles[i].y - particles[j].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < connectionDistance) {
					ctx.beginPath();
					let opacity = 1 - distance / connectionDistance;
					// Very subtle line color
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

	onMount(() => {
		if (!browser) return;

		setTimeout(() => {
			if (!canvas) return;
			ctx = canvas.getContext('2d');
			if (!ctx) return;

			resize();
			initParticles();
			animate();

			const handleMouseMove = (e: MouseEvent) => {
				mouse.x = e.clientX;
				mouse.y = e.clientY;
			};
			const handleMouseLeave = () => {
				mouse.x = null;
				mouse.y = null;
			};

			window.addEventListener('resize', resize);
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				cancelAnimationFrame(animationId);
				window.removeEventListener('resize', resize);
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseleave', handleMouseLeave);
			};
		}, 0);
	});
</script>

<canvas
	bind:this={canvas}
	id="network-canvas"
	class="fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none"
	style="z-index: -1;"
	aria-hidden="true"
></canvas>

