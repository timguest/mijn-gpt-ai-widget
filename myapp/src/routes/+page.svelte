<script>
	import Controller from '../components/Chat/Controller.svelte';
	import { Input, Button } from 'flowbite-svelte';

	let url = '';
	const sendUrlToFlask = async () => {
		const response = await fetch('http://127.0.0.1:5000/url', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: url })
		});

		response.json().then((r) => console.log(r));
	};
</script>

<Controller />
<div class="app">
	<div id="features" class="h-screen flex items-center justify-center bg-primary-100">
		<div>
			<Input bind:value={url} class="w-128" />
			<Button on:click={sendUrlToFlask}>Send URL</Button>
		</div>
	</div>
	<div id="pricing" class="h-screen flex items-center justify-center bg-primary-200">
		<h2>pricing</h2>
	</div>
	<div id="how-it-works" class="h-screen flex items-center justify-center bg-primary-300">
		<h2>how-it-works</h2>
	</div>
	<div id="faq" class="h-screen flex items-center justify-center bg-primary-400">
		<h2>faq</h2>
	</div>
	<div id="contact" class="h-screen flex items-center justify-center bg-primary-500">
		<h2>contact</h2>
	</div>
</div>
