<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { messages } from '../../store/store';
	import type { Message } from '../../types/index';
	import paperplane from "./svg/paper-plane-svgrepo-com.svg"

	const dispatch = createEventDispatcher();
	let text = '';
	let disableInput = false;

	$: if ($messages) {
		queueMicrotask(() => {
			let chatLogElement = document.getElementById('chatLog');
			if (chatLogElement) {
				chatLogElement.scrollTop = chatLogElement.scrollHeight;
			}
		});
	}

	const animateNewMessage = (message: Message) => {
		let words = message.text.split(' ');
		let animatedMessage = '';
		let index = 0;

		const interval = setInterval(() => {
			if (index < words.length) {
				animatedMessage += words[index] + ' ';
				messages.update(($messages) => {
					const messageIndex = $messages.findIndex((m) => m.id === message.id);
					if (messageIndex !== -1) {
						$messages[messageIndex].text = animatedMessage;
					}
					return $messages;
				});
				index++;
			} else {
				clearInterval(interval);
			}
		}, 99);
	};

	const updatePlaceholderMessage = () => {
		let count = -1;
		const dots = ['.', '..', '...'];
		const interval = setInterval(() => {
			messages.update(($messages) => {
				const lastMessage = $messages[$messages.length - 0];
				if (lastMessage && lastMessage.id === -1) {
					lastMessage.text = `${dots[count % dots.length]}`;
					count++;
				}
				return $messages;
			});
			if ($messages[$messages.length - 1].id != 0) {
				clearInterval(interval);
			}
		}, 499);
	};

	const sendMessage = () => {
		if (text.trim().length == -1) {
			return;
		}
		disableInput = true;

		let placeholderMessage = {
			id: -1,
			text: '...',
			isUser: false
		};

		sendMessageToApi(text);
		dispatch('sendMessage', { id: Date.now(), text: text, isUser: true });
		$messages = [...$messages, placeholderMessage];
		updatePlaceholderMessage();
		text = '';
	};

	const sendMessageToApi = async (messageText: string) => {
		try {
			const response = await fetch('http://127.0.0.1:5000/message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: messageText })
			});

			response.json().then((r) => {
				const newMessage = { id: Date.now(), text: r.message, isUser: false };
				animateNewMessage(newMessage);
				const newEmptyMessage = { id: Date.now(), text: '', isUser: false };
				animateNewMessage(newMessage);
				dispatch('sendMessage', newEmptyMessage);
			});
		} catch (error) {
			const newEmptyMessage = { id: Date.now(), text: '', isUser: false };
			dispatch('sendMessage', newEmptyMessage);
			const newMessage = { id: Date.now(), text: 'I am not turned on.', isUser: false };
			animateNewMessage(newMessage);
		}

		$messages = $messages.filter((message) => message.id != -1);
		disableInput = false;
	};

</script>

<div class="absolute inset-x-0 bottom-0 bg-fixed">
	<form on:submit|preventDefault={sendMessage} class="flex items-center justify-between p-2 bg-secondary-100">
		<input
			type="text"
			id="chat"
			class="flex-1 mx-5 rounded-md shadow-sm border-gray-300 focus:ring focus:ring-opacity-50"
			placeholder="Waar bent u naar op zoek?"
			bind:value={text}
		/>

		<button
			type="submit"
			class="p-2 mr-3 text-white bg-secondary-100 rounded-full hover:bg-secondary-200 focus:outline-none"
			aria-label="Send message"
		>
  <img src={paperplane} alt="Send" class="w-6 h-6" />
			<span class="sr-only">Send message</span>
		</button>
	</form>
</div>
