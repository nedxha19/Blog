<script>
	import { onMount } from 'svelte';

	let articles = [];
	let message = '';

	onMount(async () => {
		await loadArticles();
	});

	async function loadArticles() {
		try {
			const response = await fetch('/api/articles');
			if (response.ok) {
				articles = await response.json();
			}
		} catch (error) {
			message = 'Error loading articles';
		}
	}

	async function voteForArticle(id) {
		try {
			const response = await fetch(`/api/articles/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ action: 'vote' })
			});

			if (response.ok) {
				await loadArticles();
			} else {
				message = 'Error voting for article';
			}
		} catch (error) {
			message = 'Error voting for article';
		}
	}
</script>

<div class="min-h-screen bg-gray-100 p-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-3xl font-bold">Image Blog</h1>

		{#if message}
			<div class="mb-4 rounded bg-red-100 p-4 text-red-700">
				{message}
			</div>
		{/if}

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each articles as article}
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					<img src={article.image} alt="" class="h-48 w-full object-cover" />
					<div class="p-4">
						<p class="mb-2 text-gray-600">{article.description}</p>
						<p class="mb-2 text-sm text-gray-500">Author: {article.author}</p>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500">Votes: {article.votes}</span>
							<button
								on:click={() => voteForArticle(article.id)}
								class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								Vote
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
