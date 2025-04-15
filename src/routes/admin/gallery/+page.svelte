<!-- src/routes/admin/articles_management/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
    let {data} = $props();
</script>

<section class="flex-1 lg:ml-[220px]">
	<div class="mx-auto min-h-screen flex-grow bg-black p-6 text-white shadow-lg">
		<div class="mb-6 text-center">
			<h1 class="mb-2 text-xl font-semibold text-pink-300">All Posts</h1>
			<a
				href="/admin/gallery/new"
				class="text-sm text-gray-500 transition-colors hover:text-gray-400"
			>
				Upload a new post
			</a>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each data.articles as article (article.id)}
				<div
					class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg transition-shadow duration-300 hover:shadow-xl"
					transition:slide
				>
					<!-- Image -->
					<img
						src={article.image}
						alt=""
						class="h-48 w-full object-cover"
						loading="lazy"
					/>

					<div class="p-4">
						<p class="mb-1 text-xs text-gray-500">ID: {article.id}</p>
						<p class="mb-1 text-lg font-semibold text-white">{article.author}</p>
						<p class="mb-4 text-sm text-gray-300">{article.description}</p>

						<!-- Delete Form -->
						<form action="?/deleteArticle" method="POST" use:enhance class="text-right">
							<input type="hidden" name="id" value={article.id} />
							<button
								type="submit"
								class="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-700"
							>
								Delete
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
