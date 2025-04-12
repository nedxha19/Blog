<script>
	import { onMount } from 'svelte';

	let media = [];

	onMount(async () => {
		const response = await fetch('/api/media');
		media = await response.json();
	});
</script>

<div class="bg-gray-100">
	<!-- Navigation -->
	<nav class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<h1 class="text-2xl font-bold text-gray-900">Shkodra Gallery</h1>
				<div class="flex space-x-4">
					<a href="/admin" class="text-sm font-medium text-blue-600 hover:text-blue-500">Admin</a>
					<a href="/login" class="text-sm font-medium text-gray-600 hover:text-gray-500">Login</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
		<div class="px-4 sm:px-6 lg:px-8">
			<h2 class="mb-8 text-center text-3xl font-bold text-gray-900">Welcome to Shkodra Gallery</h2>

			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each media as item (item.id)}
					<div class="group relative overflow-hidden rounded-lg bg-white shadow">
						<img src={item.image_url} alt={item.title} class="h-64 w-full object-cover" />
						<div
							class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<div class="px-4 py-6 text-center text-white">
								<h3 class="mb-2 text-xl font-bold">{item.title}</h3>
								<p class="mb-4 text-sm">{item.description}</p>
								<a
									href={`/view/${item.id}`}
									class="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700"
									>View Details</a
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
