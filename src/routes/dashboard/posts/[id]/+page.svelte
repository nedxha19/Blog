<script>
	import { enhance } from '$app/forms';
	export let data;
</script>

<article class="mx-auto max-w-3xl p-6">
	<!-- Post header -->
	<div class="mb-6">
		<img src={data.post.image} alt="Post Image" class="mb-4 h-96 w-full rounded-lg object-cover" />
		<h1 class="text-3xl font-bold text-gray-800">{data.post.description}</h1>
		<p class="mt-1 text-sm text-gray-600">Posted by {data.post.author}</p>
	</div>

	<!-- Like and Comment Controls -->
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center">
			<form action="?/toggleLike" method="POST" use:enhance>
				<button type="submit" class="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z"
						/>
					</svg>
					<span>{data.likeCount}</span>
				</button>
			</form>
		</div>
	</div>

	<!-- Comments Section -->
	<section class="rounded bg-gray-100 p-4">
		<h2 class="mb-4 text-xl font-semibold text-gray-700">Comments</h2>
		{#if data.comments.length === 0}
			<p class="text-gray-600">No comments yet. Be the first to comment!</p>
		{:else}
			<ul class="space-y-4">
				{#each data.comments as comment (comment.id)}
					<li class="border-b border-gray-300 pb-2">
						<p class="text-sm font-medium text-gray-800">{comment.user}</p>
						<p class="text-gray-700">{comment.comment}</p>
						<p class="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Comment Form -->
		{#if data.user}
			<form action="?/addComment" method="POST" use:enhance class="mt-4">
				<textarea
					name="comment"
					rows="3"
					placeholder="Write a comment..."
					class="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				></textarea>
				<button
					type="submit"
					class="mt-2 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
				>
					Post Comment
				</button>
			</form>
		{:else}
			<p class="mt-4 text-gray-600">
				You must <a href="/login" class="text-blue-600 underline">login</a> to comment.
			</p>
		{/if}
	</section>
</article>
