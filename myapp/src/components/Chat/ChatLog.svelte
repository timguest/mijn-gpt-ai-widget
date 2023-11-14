<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { messages } from '../../store/store';
</script>

<div style="max-height: 90vh;">
	{#each $messages as message }
		<div class={message.isUser ? 'flex justify-end pr-2' : 'flex justify-start pl-2'}>
			<Card
				class="my-4 mx-4 {message.isUser
					? 'bg-blue-500 text-white rounded-br-none'
					: 'bg-gray-100 rounded-bl-none'}"
			>
				{message.text}
			</Card>
		</div>
	{/each}
</div>
