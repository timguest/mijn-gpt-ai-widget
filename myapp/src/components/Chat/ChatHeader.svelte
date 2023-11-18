<script>
	import { isChatOpen } from './store';

	const toggleChatOpen = () => {
		$isChatOpen = !$isChatOpen;
	};
</script>

<div class="bg-primary-600 text-white w-full p-4 rounded-tl-lg rounded-tr-lg flex justify-between items-start">
	<div>
		<h1 class="text-lg font-bold">Welkom</h1>
		<p class="text-sm text-primary-200">Waar bent u naar op zoek?</p>
	</div>
	<button on:click={toggleChatOpen} class="text-white focus:outline-none">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</button>
</div>
