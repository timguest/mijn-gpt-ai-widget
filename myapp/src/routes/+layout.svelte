<script>
	import Header from '../components/Header.svelte';
</script>

<div class="flex flex-col h-screen">
	<div class="fixed top-0 z-10 w-full shadow">
		<Header />
	</div>
	<slot />
</div>
