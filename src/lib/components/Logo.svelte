<script lang="ts">
	import Logo from '$lib/assets/Logo.svg';

	type Props = {
		/** `dark` is for placing the mark on a dark surface (the footer). The
		 *  default green wordmark measures 1.9:1 against the footer's near-black,
		 *  which leaves "Eco" all but invisible. */
		surface?: 'light' | 'dark';
	};

	let { surface = 'light' }: Props = $props();
</script>

<div class="flex items-center gap-2 mb-4">
	<img
		src={Logo}
		alt="EcoHubs"
		width="40"
		height="40"
		class="h-10 w-10 {surface === 'dark' ? 'invert' : ''}"
	/>
	<div class="flex flex-col gap-0">
		<span
			class="font-serif font-bold text-3xl tracking-tight pb-0 leading-none
			       {surface === 'dark' ? 'text-white' : 'text-ecohubs-dark'}"
		>
			Eco<span class={surface === 'dark' ? 'text-ecohubs-light' : 'text-ecohubs-primary'}>Hubs</span
			>
		</span>
		<span
			class="font-sans text-[0.625rem] pb-0 leading-none tracking-[0.35rem] uppercase
			       {surface === 'dark' ? 'text-stone-300' : 'text-stone-600'}">Community</span
		>
	</div>
</div>
