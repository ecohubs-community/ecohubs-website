<script lang="ts">
  import { ArrowRight, Check, ChevronDown, type Icon as LucideIcon } from 'lucide-svelte';

  let {
    Icon,
    title,
    iconColor,
    iconBg,
    description,
    solution
  }: {
    Icon: typeof LucideIcon;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    solution: string;
  } = $props();

  let solutionOpen = $state(false);
</script>

<div class="glass-card p-8 rounded-2xl text-center hover:bg-white/90 transition-all">
  <div class="w-16 h-16 {iconBg} rounded-full flex items-center justify-center mx-auto mb-6 {iconColor}">
    <Icon class="w-8 h-8" aria-hidden="true" />
  </div>
  <h3 class="text-xl font-bold text-gray-900 mb-3">{title}</h3>
  <p class="text-gray-500 leading-relaxed mb-3 max-w-prose">{description}</p>

  <button onclick={() => solutionOpen = !solutionOpen} class="inline-flex bg-white text-gaia-primary items-center justify-center gap-2 cursor-pointer mt-4">
    {solutionOpen ? 'Hide Solution' : 'Our Solution'}
    <ChevronDown class="w-4 h-4 {solutionOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300" aria-hidden="true" />
  </button>
  <div class="flex gap-4 border-t border-gaia-primary/10 pt-4 opacity-0 transition-all duration-200 {solutionOpen ? 'opacity-100 mt-4' : 'opacity-0 h-0'}">
    <Check class="h-16 w-16 text-green-500" />
    <p class="text-md font-medium text-gaia-primary text-left max-w-prose mx-auto">{solution}</p>
  </div>
</div>