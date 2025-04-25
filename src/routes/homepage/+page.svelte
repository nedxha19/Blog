<script>
  export let data;
  let articles = data.articles;

  async function likeArticle(articleId) {
    try {
      const response = await fetch(`/api/articles/${articleId}/like`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Update the local state instead of reloading
        const updatedArticlesResponse = await fetch('/api/articles');
        const updatedArticles = await updatedArticlesResponse.json();
        articles = updatedArticles.articles;
      } else {
        const error = await response.json();
        console.error('Error liking article:', error.message);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  }
</script>

<section class="flex-1">
  <div class="mx-auto min-h-screen bg-gradient-to-br from-zinc-900 to-black p-6 text-white">
    <!-- Image Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each articles as article (article.id)}
        <div class="overflow-hidden rounded-2xl bg-zinc-800 shadow-md transition hover:shadow-xl">
          <img
            src={article.image || '/placeholder.jpg'}
            alt={article.description || 'Article image'}
            class="h-64 w-full object-cover"
            loading="lazy"
          />
          <div class="space-y-2 p-4">
            <p class="text-sm font-semibold text-pink-300">{article.author}</p>
            <p class="line-clamp-3 text-sm text-gray-300">{article.description}</p>
            <button
              on:click={() => likeArticle(article.id)}
              class="text-pink-500 transition-colors duration-300 hover:text-pink-400"
            >
              Like ({article.likes || 0})
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
