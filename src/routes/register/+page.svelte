<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-[#000000]">
	<form
		method="POST"
		use:enhance
		class="w-full max-w-md rounded-xl border border-[#FF4F00] bg-[#000000] p-8 shadow-2xl"
	>
		<h1 class="mb-6 text-center text-3xl font-bold text-[#FF4F00]">Register</h1>

		<label for="email" class="mb-2 block text-sm font-medium text-gray-300">E-Mail</label>
		<input
			type="email"
			name="email"
			required
			class="mb-4 w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
		/>

		<label for="username" class="mb-2 block text-sm font-medium text-gray-300">Username</label>
		<input
			type="text"
			name="username"
			required
			class="mb-4 w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
		/>

		<label for="password" class="mb-2 block text-sm font-medium text-gray-300">Password</label>
		<input
			type="password"
			name="password"
			required
			class="mb-4 w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
		/>

		<label for="confirmPassword" class="mb-2 block text-sm font-medium text-gray-300"
			>Confirm Password</label
		>
		<input
			type="password"
			name="confirmPassword"
			required
			class="mb-6 w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
		/>

		<button
			type="submit"
			class="w-full rounded-lg bg-[#FF4F00] p-3 text-white hover:bg-[#FF4F00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
		>
			Register
		</button>

		{#if form?.message}
			<div class="mt-4 text-red-500">{form.message}</div>
		{/if}

		<div class="mt-4 text-center">
			<p class="text-sm text-gray-400">
				Already have an account?
				<a href="/login" class="font-medium text-[#FF4F00] hover:text-[#FF4F00]/90"> Login here </a>
			</p>
		</div>
	</form>
</div>
