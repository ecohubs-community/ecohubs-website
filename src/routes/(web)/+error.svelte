<script lang="ts">
	// Errors thrown inside (web) routes render here, wrapped by the (web) layout
	// which already provides the Navbar and Footer. See ErrorContent for the copy.
	import ErrorContent from '$lib/components/ErrorContent.svelte';
</script>

<ErrorContent />
