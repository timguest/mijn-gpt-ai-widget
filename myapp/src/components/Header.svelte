<script>
	import { Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';
	import '../app.css';
</script>

<Navbar class="flex">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white">MijnGPT.ai</span>
	</NavBrand>

	<NavUl class="flex flex-row">
		<NavLi href="#">Features</NavLi>
		<NavLi href="#pricing">Pricing</NavLi>
		<NavLi href="#how-it-works">How it works</NavLi>
		<NavLi href="#faq">FAQ</NavLi>
		<NavLi href="#contact">Contact</NavLi>
	</NavUl>
	<NavUl class="flex flex-row">
		<Button color="light" pill>Login</Button>
		<Button color="blue" pill>Probeer MijnGPT Gratis</Button>
	</NavUl>
</Navbar>
