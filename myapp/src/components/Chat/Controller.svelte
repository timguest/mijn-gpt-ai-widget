<!-- <svelte:options customElement={{ tag: 'mijn-gpt', shadow: 'none' }} /> -->

<script lang="ts">
	import Bubble from './Bubble.svelte';
	import WidgetIcon from './WidgetIcon.svelte';
	import ChatContainer from './ChatContainer.svelte';
	import { isChatOpen } from './store';
</script>

<div>
	{#if !$isChatOpen}
		<Bubble />
		<WidgetIcon />
	{/if}

	{#if $isChatOpen}
		<ChatContainer />
	{/if}
</div>
