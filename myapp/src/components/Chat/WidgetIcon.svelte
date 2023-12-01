<script lang="ts">
	import { isChatOpen } from './store';

	const toggleChatOpen = () => {
		isChatOpen.update(current => !current);
	};
</script>

<div class="fixed bottom-0 right-0 mb-4 mr-4">
	<button 
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-16 w-16 shadow-2xl flex items-center justify-center"
		on:click={toggleChatOpen}
		aria-label="Open chat"
	>
		<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path d="M18 10c0 3.866-3.582 7-8 7-1.657 0-3.204-.507-4.496-1.376l-4.504.376 1.104-3.31C1.572 12.204 1 11.153 1 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"></path>
		</svg>
	</button>
</div>
