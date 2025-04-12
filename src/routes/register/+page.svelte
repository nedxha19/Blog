<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<form method="POST" use:enhance class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Register</h1>

		<label for="email" class="mb-2 block text-sm font-medium text-gray-700">E-Mail</label>
		<input
			type="email"
			name="email"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="username" class="mb-2 block text-sm font-medium text-gray-700">Username</label>
		<input
			type="text"
			name="username"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
		<input
			type="password"
			name="password"
			required
			class="mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<label for="confirmPassword" class="mb-2 block text-sm font-medium text-gray-700"
			>Confirm Password</label
		>
		<input
			type="password"
			name="confirmPassword"
			required
			class="mb-6 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>

		<button
			type="submit"
			class="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Register
		</button>

		{#if form?.message}
			<div class="mt-4 text-red-500">{form.message}</div>
		{/if}
	</form>
</div>
