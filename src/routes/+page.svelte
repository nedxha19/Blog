<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	export let data;
	let user = data?.user;
	let comments = data?.comments || [];

	onMount(async () => {
		if (browser) {
			const session = localStorage.getItem('session');
			if (session) {
				user = { id: 1, username: 'demo_user' };
			}
		}
	});
</script>

<div class="min-h-screen bg-[#000000]">
	<!-- Navigation -->
	<nav
		class="sticky top-0 z-50 border-b border-[#FF4F00] bg-[#000000] bg-opacity-90 shadow-lg backdrop-blur-sm"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-center">
				<a
					href="/"
					class="text-2xl font-bold tracking-tight text-[#FF4F00] transition-colors duration-300 hover:text-[#FF4F00]/90"
				>
					Nedit<span class="text-white">Blog</span>
				</a>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<div class="relative bg-[#000000] py-16">
		<div class="absolute inset-0 bg-gradient-to-r from-[#FF4F00]/20 to-transparent"></div>
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
					Welcome to <span class="text-[#FF4F00]">NeditBlog</span>
				</h1>
				<p
					class="mx-auto mt-3 max-w-md text-base text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl"
				>
					Share your thoughts, connect with others, and explore amazing content.
				</p>
			</div>
		</div>
	</div>

	<!-- Main content -->
	<section class="bg-[#000000] p-6">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#if data?.articles}
				{#each data.articles as article (article.id)}
					<div
						class="mb-4 transform overflow-hidden rounded-lg border border-[#FF4F00] bg-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,79,0,0.3)]"
					>
						<img
							src={article.image || '/placeholder.jpg'}
							alt={article.description || 'Article image'}
							class="h-48 w-full object-cover transition-opacity duration-300 hover:opacity-90"
						/>

						<div class="p-4">
							<p class="mb-2 text-sm font-semibold text-[#FF4F00]">{article.author}</p>
							<p class="mb-4 text-sm text-gray-300">{article.description}</p>
						</div>

						<!-- Comments section -->
						<div class="mt-2 space-y-2 p-4 text-sm text-gray-300">
							{#each comments.filter((c) => c.article_id === article.id) as comment}
								<div
									class="border-b border-[#FF4F00]/20 pb-1 transition-colors duration-300 hover:bg-[#FF4F00]/5"
								>
	<strong class="text-[#FF4F00]">{comment.author}:</strong>
									{comment.content}
		</div>
							{/each}
						</div>

						<!-- Comment form -->
						<form
							action="?/addComment"
							method="POST"
							use:enhance
							class="border-t border-[#FF4F00]/20 p-4"
						>
							<input type="hidden" name="article_id" value={article.id} />
							<input type="hidden" name="name" value={user?.username} />
							<div class="flex justify-between">
								<input
									type="text"
									name="commentInput"
									placeholder="Add a comment..."
									class="w-[80%] border-none bg-transparent p-0 text-sm text-gray-400 transition-colors duration-300 focus:text-white focus:outline-none"
									required
								/>
								<button
									type="submit"
									class="font-semibold text-[#FF4F00] transition-colors duration-300 hover:text-[#FF4F00]/90"
									>Post</button
								>
							</div>
						</form>
						<!-- Like button -->
						<form method="POST" action="?/likeArticle" class="border-t border-[#FF4F00]/20 p-4">
							<input type="hidden" name="article_id" value={article.id} />
							<button
								type="submit"
								class="flex items-center gap-2 text-sm font-semibold text-[#FF4F00] transition-colors duration-300 hover:text-[#FF4F00]/90"
							>
								<span class="transform transition-transform duration-300 hover:scale-110">❤️</span>
								<span>{article.votes || 0} Likes</span>
							</button>
						</form>
					</div>
				{/each}
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-[#FF4F00] bg-[#000000]">
		<div class="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
			<div class="text-center">
				<p class="text-base text-gray-400">&copy; 2024 NeditBlog. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
