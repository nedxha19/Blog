<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';

	let { form, data } = $props();
	let user = data.user;
</script>

<main class="flex h-screen items-center justify-center bg-black p-6 lg:ml-[220px]">
	<div class="w-full max-w-md rounded-2xl bg-gray-100 p-[2px] shadow-xl">
		<div class="h-full w-full rounded-2xl border border-gray-100 bg-black p-8">
			<h1 class="mb-6 text-center text-3xl font-bold text-white">Post a new Image</h1>

			<form
				action="?/upload"
				method="POST"
				class="space-y-4"
				use:enhance
				enctype="multipart/form-data"
			>
				<!-- File Upload Input -->
				<label class="block">
					<span class="font-medium text-gray-300">Choose an Image:</span>
					<input
						type="file"
						name="image"
						class="mt-2 block w-full cursor-pointer rounded-lg border border-gray-600 bg-black px-4 py-2 text-gray-300 shadow-sm transition-all file:mr-4 file:border-0 file:bg-gray-600 file:px-4 file:py-2 file:text-white file:hover:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</label>

				<!-- Description Input -->
				<label class="block">
					<span class="font-medium text-gray-300">Description:</span>
					<input
						type="text"
						name="description"
						placeholder="Write a short description..."
						class="mt-2 block w-full rounded-lg border border-gray-600 bg-black px-4 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</label>

				<!-- Author Input -->
				<label class="block">
					<input
						type="hidden"
						value={user.username}
						name="author"
						placeholder="Your name..."
						class="mt-2 block w-full rounded-lg border border-gray-600 bg-black px-4 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</label>

				<!-- Submit Button -->
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					Post
				</button>
			</form>

			<!-- Uploaded Image Preview -->
			{#if form}
				<div class="mt-6 flex flex-col items-center">
					<p class="font-medium text-green-400">Post successfully created</p>
				</div>
			{/if}
		</div>
	</div>
</main>