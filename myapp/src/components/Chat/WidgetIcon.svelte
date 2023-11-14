<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { MessagesSolid } from 'flowbite-svelte-icons';
	import { isChatOpen } from './store';

	const setIsChatOpen = () => {
		$isChatOpen = !$isChatOpen;
	};
</script>

<div class="fixed bottom-0 right-0 mb-4 mr-4">
	<Button pill={true} color="blue" class="!p-2 h-16 w-16 shadow-2xl" on:click={setIsChatOpen}
		><MessagesSolid class="w-8 h-8" /></Button
	>
</div>
