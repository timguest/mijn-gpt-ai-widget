<script>
	import { Card } from 'flowbite-svelte';
	import { isChatOpen } from './store';
	import { Button } from 'flowbite-svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';

	const setIsChatOpen = () => {
		$isChatOpen = !$isChatOpen;
	};
</script>

<Card
	padding={'md'}
	size={'xl'}
	class="bg-primary-600 text-white w-full border-none rounded-bl-none rounded-br-none"
>
	<div>
		<h1 class="text-lg font-semibold">Welkom</h1>
		<Button on:click={setIsChatOpen} class="absolute top-1 right-1 bg-primary-600 !p-2">
			<CloseCircleSolid />
		</Button>
		<button class="text-sm text-primary-200 focus:outline">
			{'Waar bent u naar op zoek?'}
		</button>
	</div>
</Card>
