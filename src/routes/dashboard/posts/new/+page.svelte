<script>
	import { enhance } from '$app/forms';
	export let data;
</script>

<main
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-6"
>
	<div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800">New Post</h2>
		<form
			action="?/uploadPost"
			method="POST"
			enctype="multipart/form-data"
			use:enhance
			class="space-y-6"
		>
			<div>
				<label class="mb-2 block text-gray-700">Select Image</label>
				<input
					type="file"
					name="image"
					class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label class="mb-2 block text-gray-700">Description</label>
				<textarea
					name="description"
					placeholder="Enter a brief description..."
					class="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				></textarea>
			</div>
			<input type="hidden" name="author" value={data.user.username} />
			<button
				type="submit"
				class="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
			>
				Submit Post
			</button>
		</form>
		{#if data.form}
			<div class="mt-4 text-center text-green-600">Post successfully created!</div>
		{/if}
	</div>
</main>
