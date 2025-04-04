<!-- src/routes/login/+page.svelte -->
<script>
	let email = '';
	let password = '';
	let message = '';

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				email,
				password
			})
		});

		const result = await response.json();
		message = result.message;

		if (response.ok) {
			// Store the user's name in local storage or session storage
			localStorage.setItem('username', result.username); // Assuming `result.username` contains the user's name
			// Redirect to the main page after successful login
			window.location.href = '/'; // Redirect to the root path
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form class="w-full max-w-sm rounded-lg bg-white p-6 shadow-md" on:submit={handleSubmit}>
		<h2 class="mb-6 text-center text-2xl font-bold">Login</h2>
		{#if message}
			<p class="mb-4 text-red-600">{message}</p>
		{/if}
		<div class="mb-4">
			<label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email:</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="mb-4">
			<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password:</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				required
				class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<button
			type="submit"
			class="w-full rounded bg-blue-500 py-2 font-medium text-white transition-colors hover:bg-blue-600"
		>
			Login
		</button>
	</form>
</div>
