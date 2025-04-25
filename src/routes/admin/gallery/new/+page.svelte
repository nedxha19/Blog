<script>
  import { enhance } from '$app/forms';
  import { updated } from '$app/state';
  import { upload } from '@vercel/blob/client';

  let { form, data } = $props();
  let user = data.user;
</script>

<main class="flex h-screen items-center justify-center bg-[#000000] p-6">
  <div class="w-full max-w-md rounded-2xl border border-[#FF4F00] bg-[#000000] p-[2px] shadow-xl">
    <div class="h-full w-full rounded-2xl bg-[#000000] p-8">
      <h1 class="mb-6 text-center text-3xl font-bold text-[#FF4F00]">Post a new Image</h1>

      <form
        action="?/upload"
        method="POST"
        class="space-y-4"
        use:enhance
        enctype="multipart/form-data"
      >
        <!-- File Upload Input -->
        <label class="block">
          <span class="font-medium text-gray-300">Choose an Image:</span>
          <input
            type="file"
            name="image"
            class="mt-2 block w-full cursor-pointer rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-2 text-gray-300 shadow-sm transition-all file:mr-4 file:border-0 file:bg-[#FF4F00] file:px-4 file:py-2 file:text-white file:hover:bg-[#FF4F00]/90 focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00]"
          />
        </label>

        <!-- Description Input -->
        <label class="block">
          <span class="font-medium text-gray-300">Description:</span>
          <input
            type="text"
            name="description"
            placeholder="Write a short description..."
            class="mt-2 block w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-2 text-white placeholder-gray-400 shadow-sm focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00]"
          />
        </label>

        <!-- Author Input -->
        <label class="block">
          <input
            type="hidden"
            value={user.username}
            name="author"
            placeholder="Your name..."
            class="mt-2 block w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-2 text-white placeholder-gray-400 shadow-sm focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00]"
          />
        </label>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full rounded-lg bg-[#FF4F00] px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#FF4F00]/90 focus:ring-2 focus:ring-[#FF4F00] focus:ring-offset-2 focus:ring-offset-[#000000]"
        >
          Post
        </button>
      </form>

      <!-- Uploaded Image Preview -->
      {#if form}
        <div class="mt-6 flex flex-col items-center">
          <p class="font-medium text-[#FF4F00]">Post successfully created</p>
        </div>
      {/if}
    </div>
  </div>
</main>
