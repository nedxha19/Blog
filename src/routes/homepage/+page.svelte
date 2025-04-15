<script>
	export let data;
</script>

<section class="flex-1 lg:ml-[220px]">
	<div class="mx-auto min-h-screen bg-gradient-to-br from-zinc-900 to-black p-6 text-white">
		

		<!-- Image Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each data.articles as article (article.id)}
				<div class="overflow-hidden rounded-2xl bg-zinc-800 shadow-md hover:shadow-xl transition">
					<img
						src={article.image || '/placeholder.jpg'}
						alt={article.description || 'Article image'}
						class="h-64 w-full object-cover"
						loading="lazy"
					/>
					<div class="p-3 space-y-1">
						<p class="text-sm text-pink-300 font-semibold">{article.author}</p>
						<p class="text-xs text-gray-400">{article.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
