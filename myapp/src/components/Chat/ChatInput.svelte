<script lang="ts">
	import { Textarea, Alert, ToolbarButton } from 'flowbite-svelte';
	import { PapperPlaneOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { messages } from '../../store/store';
	import type { Message } from '../../types/index';

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
			const response = await fetch('http://127.0.0.1:5000/messsage', {
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

	const adjustHeight = (event: Event) => {
		const element = event.target as HTMLTextAreaElement;
		element.style.height = `${element.scrollHeight}px`;
	};
</script>

<div class="absolute inset-x-1 bottom-0 bg-fixed">
	<form>
		<Alert color="dark" class="px-2 py-2 my-1 bg-secondary-100 rounded-t-none">
			<svelte:fragment slot="icon">
				<Textarea
					disabled={disableInput}
					id="chat"
					class="mx-5 overflow-hidden"
					rows="0"
					placeholder="Your message..."
					bind:value={text}
					on:input={adjustHeight}
					on:keyup={(event) => {
						if (!event.shiftKey && event.key === 'Enter') {
							sendMessage();
						}
					}}
				/>
				<ToolbarButton
					type="submit"
					color="blue"
					class="rounded-full text-primary-601 dark:text-primary-500"
					on:click={sendMessage}
				>
					<PapperPlaneOutline class="w-6 h-5 rotate-45" />
					<span class="sr-only">Send message</span>
				</ToolbarButton>
			</svelte:fragment>
		</Alert>
	</form>
</div>
