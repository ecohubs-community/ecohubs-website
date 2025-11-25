<script lang="ts">
	import hero from '$lib/assets/hero.webp';
</script>

<div class="max-w-7xl mx-auto relative overflow-hidden bg-cover bg-center px-8 mt-2">
  <section class="w-full mx-auto relative overflow-hidden bg-cover bg-center rounded-3xl  px-4 py-24 sm:px-6 lg:px-8 lg:py-32" style="background-image: url({hero})">
    <div class="mx-auto w-full text-center">
      <h1 class="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span class="text-white">Building Intentional<br/>Communities on Blockchain</span>
      </h1>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/join"
          class="rounded-xl px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-offset-2 focus-visible:outline-accent bg-white text-black shadow-sm opacity-90 hover:opacity-100"
          data-sveltekit-preload-data="hover"
        >
          Join the First 1000
        </a>
        <a
          href="/vision"
          class="text-base font-semibold leading-6 text-text-primary transition-colors hover:text-black bg-primary px-6 py-3 rounded-xl shadow-sm opacity-90 hover:opacity-100"
          data-sveltekit-preload-data="hover"
        >
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</div>

