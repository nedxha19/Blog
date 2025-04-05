<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let username = '';
	let showLogoutMessage = false;
	let isLoggedIn = false;

	onMount(() => {
		// Check URL for logout parameter
		const urlParams = new URLSearchParams(window.location.search);
		showLogoutMessage = urlParams.get('logout') === 'true';

		// If we're showing logout message, remove username
		if (showLogoutMessage) {
			localStorage.removeItem('username');
			// Remove the query parameter from URL without refreshing
			window.history.replaceState({}, '', '/');
		}

		username = localStorage.getItem('username') || '';
		isLoggedIn = !!username;
	});
</script>

{#if showLogoutMessage}
	<div class="mb-4 border-l-4 border-green-500 bg-green-100 p-4 text-green-700" role="alert">
		<p>
			You have been successfully logged out. <a href="/register" class="font-bold underline"
				>Create a new account</a
			>
			or <a href="/login" class="font-bold underline">login</a> to continue.
		</p>
	</div>
{/if}

<nav class="bg-blue-800 p-6 shadow-lg">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold text-white transition duration-300 hover:text-blue-300">
			My App
		</h1>
		<ul class="flex space-x-8">
			<li><a href="/" class="text-white transition duration-300 hover:text-blue-300">Home</a></li>
			<li>
				<a href="/login" class="text-white transition duration-300 hover:text-blue-300">Login</a>
			</li>
			<li>
				<a href="/register" class="text-white transition duration-300 hover:text-blue-300"
					>Register</a
				>
			</li>
			{#if isLoggedIn}
				<li>
					<a href="/logout" class="text-white transition duration-300 hover:text-blue-300"
						>Log out</a
					>
				</li>
			{/if}
			<li>
				<a href="/contact" class="text-white transition duration-300 hover:text-blue-300">Contact</a
				>
			</li>
		</ul>
	</div>
</nav>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	{#if isLoggedIn}
		<h1 class="text-5xl font-extrabold text-gray-800">Welcome back, {username}!</h1>
		<p class="mt-4 text-lg text-gray-600">We're glad to see you again. Enjoy your stay!</p>
		<button
			class="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
		>
			Get Started
		</button>
	{:else}
		<h1 class="text-5xl font-extrabold text-gray-800">Welcome to My App</h1>
		<p class="mt-4 text-lg text-gray-600">
			Please <a href="/login" class="text-blue-600 hover:underline">login</a> or
			<a href="/register" class="text-blue-600 hover:underline">create an account</a> to get started.
		</p>
		<div class="mt-6 flex space-x-4">
			<a
				href="/login"
				class="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
			>
				Login
			</a>
			<a
				href="/register"
				class="rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-green-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300"
			>
				Register
			</a>
		</div>
	{/if}
</div>

<footer class="bg-gray-900 p-6 text-white">
	<div class="container mx-auto text-center">
		<p class="text-sm">© 2023 My App. All rights reserved.</p>
		<p class="text-sm">Contact: (555) 123-4567 | Location: 123 Main St, City</p>
		<p class="text-sm">
			Email: <a href="mailto:contact@example.com" class="text-blue-400 hover:underline"
				>contact@example.com</a
			>
		</p>
		<div class="mt-4">
			<a href="/privacy" class="text-gray-400 transition duration-300 hover:text-gray-300"
				>Privacy Policy</a
			>
			|
			<a href="/terms" class="text-gray-400 transition duration-300 hover:text-gray-300"
				>Terms of Service</a
			>
		</div>
	</div>
</footer>
