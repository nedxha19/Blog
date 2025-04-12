<script>
	import { enhance } from '$app/forms';
	export let data;
</script>

<section class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<header class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900">Post Dashboard</h1>
			<a
				href="/dashboard/posts/new"
				class="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
			>
				Create New Post
			</a>
		</header>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<div class="rounded-lg bg-white p-4 shadow transition hover:shadow-lg">
					<img src={post.image} alt="Post Image" class="mb-4 h-48 w-full rounded object-cover" />
					<div class="mb-2">
						<span class="text-xs text-gray-500">ID: {post.id}</span>
						<p class="font-semibold text-gray-800">{post.author}</p>
					</div>
					<p class="mb-4 text-sm text-gray-700">{post.description}</p>
					<div class="flex justify-between">
						<a
							href={`/dashboard/posts/${post.id}`}
							class="text-sm font-medium text-blue-600 hover:text-blue-800"
						>
							View Details
						</a>
						<form action="?/deletePost" method="POST" use:enhance>
							<input type="hidden" name="id" value={post.id} />
							<button type="submit" class="text-sm font-medium text-red-600 hover:text-red-800">
								Delete
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
