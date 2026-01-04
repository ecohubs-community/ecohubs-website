<script lang="ts">
  import Icon from '@iconify/svelte';

  interface BoxInfoCardProps {
    icon: string;
    title: string;
    description: string;
  };

  let { icon, title, description } = $props() as BoxInfoCardProps;
</script>

<div class="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
  <div class="text-ecohubs-primary mb-4"><Icon icon={icon} class="w-10 h-10" /></div>
  <h4 class="text-xl font-bold text-gray-900 mb-2">{title}</h4>
  <p class="text-gray-500 text-sm leading-relaxed">{description}</p>
</div>