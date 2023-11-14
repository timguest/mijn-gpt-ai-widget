<script lang="ts">
	import { onMount } from 'svelte';
	import { messages } from '../../store/store';
	import ChatInput from './ChatInput.svelte';
	import ChatHeader from './ChatHeader.svelte';
	import ChatLog from './ChatLog.svelte';
	import type { Message } from '../../types/index';

	function handleSendMessage(e: CustomEvent) {
		messages.update((currentMessages) => [...currentMessages, e.detail]);
	}

	const addWelcomeMessage = (e: Message[]) => {
		const newMessage = {
			id: Date.now(),
			text: 'Hi! 👋 ik ben JouwGPT. Hoe kan ik u vandaag van dienst zijn?',
			isUser: false
		};
		messages.update((currentMessages) => [...currentMessages, newMessage]);
	};

	onMount(() => {
		messages.subscribe((e) => {
			if (e.length != 0) {
				return;
			}
			addWelcomeMessage(e);
		});
	});
</script>

<div class="fixed bottom-4 right-4 w-1/3 h-1/2 z-50 bg-white shadow-lg rounded-lg flex flex-col">
	<ChatHeader />
	<div id="chatLog" class="flex-grow overflow-y-auto" style="max-height: calc(100% - 3.5rem);">
		<ChatLog />
	</div>
	<div class="flex-none h-16 bg-secondary-100">
		<ChatInput on:sendMessage={handleSendMessage} />
	</div>
</div>
