<script>
	import { onMount } from 'svelte';

	let articles = [];
	let newArticle = {
		image: '',
		description: '',
		author: ''
	};
	let message = '';
	let isAdmin = false;

	onMount(async () => {
		isAdmin = localStorage.getItem('admin') === 'true';
		if (!isAdmin) {
			window.location.href = '/admin';
			return;
		}
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

	async function addArticle() {
		try {
			const response = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newArticle)
			});

			if (response.ok) {
				message = 'Article added successfully';
				newArticle = { image: '', description: '', author: '' };
				await loadArticles();
			} else {
				message = 'Error adding article';
			}
		} catch (error) {
			message = 'Error adding article';
		}
	}

	async function deleteArticle(id) {
		try {
			const response = await fetch(`/api/articles/${id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				message = 'Article deleted successfully';
				await loadArticles();
			} else {
				message = 'Error deleting article';
			}
		} catch (error) {
			message = 'Error deleting article';
		}
	}
</script>

<div class="min-h-screen bg-gray-100 p-8">
	{#if !isAdmin}
		<div class="text-center">
			<p>Please log in to access the admin dashboard.</p>
		</div>
	{:else}
		<div class="mx-auto max-w-4xl">
			<h1 class="mb-8 text-3xl font-bold">Admin Dashboard</h1>

			{#if message}
				<div class="mb-4 rounded bg-green-100 p-4 text-green-700">
					{message}
				</div>
			{/if}

			<div class="mb-8 rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Add New Article</h2>
				<form on:submit|preventDefault={addArticle} class="space-y-4">
					<div>
						<label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
						<input
							id="image"
							type="text"
							bind:value={newArticle.image}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label for="description" class="block text-sm font-medium text-gray-700"
							>Description</label
						>
						<textarea
							id="description"
							bind:value={newArticle.description}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							rows="3"
						></textarea>
					</div>
					<div>
						<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
						<input
							id="author"
							type="text"
							bind:value={newArticle.author}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
					<button
						type="submit"
						class="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Add Article
					</button>
				</form>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-semibold">Manage Articles</h2>
				<div class="space-y-4">
					{#each articles as article}
						<div class="rounded-lg border p-4">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<img src={article.image} alt="" class="h-32 w-32 rounded object-cover" />
									<p class="mt-2 text-gray-600">{article.description}</p>
									<p class="text-sm text-gray-500">Author: {article.author}</p>
									<p class="text-sm text-gray-500">Votes: {article.votes}</p>
								</div>
								<button
									on:click={() => deleteArticle(article.id)}
									class="text-red-500 hover:text-red-700"
								>
									Delete
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
