<script>
	let email = '';
	let password = '';
	let message = '';

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
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
				localStorage.setItem('username', result.username);
				window.location.href = '/';
			}
		} catch (error) {
			message = 'An error occurred during login. Please try again.';
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
		<div class="mt-4 text-center">
			<p class="text-sm text-gray-600">
				Don't have an account? <a href="/register" class="text-blue-500 hover:underline"
					>Register here</a
				>
			</p>
		</div>
	</form>
</div>
