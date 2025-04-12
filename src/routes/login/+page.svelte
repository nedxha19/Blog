<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700"
>
	<div class="mb-4 w-full max-w-md rounded-xl bg-white p-10 shadow-2xl">
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-800">ShkodraWeb</h1>
			<p class="mt-2 text-gray-600">Secure access to your account</p>
		</div>

		<!-- No query string on the form: the default action is used -->
		<form method="POST" use:enhance>
			<div class="mb-6">
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email address</label
				>
				<input
					type="email"
					name="email"
					id="email"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="you@example.com"
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="••••••••"
				/>
			</div>

			<div class="mb-6">
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Sign in
				</button>
			</div>

			{#if form}
				<div class="text-red-500">{form.message}</div>
			{/if}
		</form>
	</div>
</div>
