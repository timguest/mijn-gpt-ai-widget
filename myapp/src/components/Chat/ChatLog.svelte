<script lang="ts">
  // import statements remain the same
  import { messages } from '../../store/store';
</script>

<div class="overflow-y-auto" style="max-height: 90vh;">
  {#each $messages as message }
    <div class={message.isUser ? 'flex justify-end pr-2' : 'flex justify-start pl-2'}>
      <div class={`my-4 mx-4 p-4 shadow-lg ${message.isUser ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg' : 'text-gray-500 bg-gray-100 rounded-r-lg rounded-tl-lg'}`}>
        {message.text}
      </div>
    </div>
  {/each}
</div>

