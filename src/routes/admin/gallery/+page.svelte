<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>

<section class="flex-1">
	<div class="mx-auto min-h-screen flex-grow bg-[#000000] p-6 text-white shadow-lg">
		<div class="mb-6 text-center">
			<h1 class="mb-2 text-xl font-semibold text-[#FF4F00]">All Posts</h1>
			<a
				href="/admin/gallery/new"
				class="text-sm text-gray-400 transition-colors hover:text-[#FF4F00]"
			>
				Upload a new post
			</a>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each data.articles as article (article.id)}
				<div
					class="overflow-hidden rounded-2xl border border-[#FF4F00] bg-[#000000] shadow-lg transition-shadow duration-300 hover:shadow-xl"
					transition:slide
				>
					<!-- Image -->
					<img src={article.image} alt="" class="h-48 w-full object-cover" loading="lazy" />

					<div class="p-4">
						<p class="mb-1 text-xs text-gray-400">ID: {article.id}</p>
						<p class="mb-1 text-lg font-semibold text-[#FF4F00]">{article.author}</p>
						<p class="mb-4 text-sm text-gray-300">{article.description}</p>

						<!-- Delete Form -->
						<form action="?/deleteArticle" method="POST" use:enhance class="text-right">
							<input type="hidden" name="id" value={article.id} />
							<button
								type="submit"
								class="rounded-full bg-[#FF4F00] px-3 py-1 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#FF4F00]/90"
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
