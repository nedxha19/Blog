<script>
	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let message = '';

	async function registerUser() {
		message = '';

		// Check if passwords match
		if (password !== confirmPassword) {
			message = "Passwords don't match!";
			return;
		}

		// Send data as Form URL Encoded
		const response = await fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				email,
				username, // Include username here
				password
			})
		});

		if (response.ok) {
			message = 'User registered successfully! You can now log in.';
			// Clear fields after successful registration
			email = '';
			username = '';
			password = '';
			confirmPassword = '';
		} else {
			const error = await response.json();
			message = error.message || 'Registration failed.';
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form
		on:submit|preventDefault={registerUser}
		class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
	>
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Register</h1>

		<label for="email" class="mb-2 block text-sm font-medium text-gray-700">E-Mail</label>
		<input
			type="text"
			bind:value={email}
			id="email"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="username" class="mb-2 block text-sm font-medium text-gray-700">Username</label>
		<input
			type="text"
			bind:value={username}
			id="username"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
		<input
			type="password"
			bind:value={password}
			id="password"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="confirmPassword" class="mb-2 block text-sm font-medium text-gray-700"
			>Confirm Password</label
		>
		<input
			type="password"
			bind:value={confirmPassword}
			id="confirmPassword"
			required
			class="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<button
			type="submit"
			class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Register
		</button>

		{#if message}
			<div class="mt-4 text-red-500">{message}</div>
		{/if}
	</form>
</div>

<footer class="bg-gray-800 p-4 text-white">
	<div class="container mx-auto text-center">
		<p>© 2023 My App. All rights reserved.</p>
		<p>Contact: (555) 123-4567 | Location: 123 Main St, City</p>
		<p>Email: contact@example.com</p>
	</div>
</footer>
