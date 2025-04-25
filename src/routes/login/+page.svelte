<script>
  import { enhance } from '$app/forms';
  export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-[#000000]">
  <div class="mb-4 w-full max-w-md rounded-xl border border-[#FF4F00] bg-[#000000] p-10 shadow-2xl">
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-[#FF4F00]">NeditBlog</h1>
      <p class="mt-2 text-gray-400">Secure access to your account</p>
    </div>

    <form method="POST" action="?/login" use:enhance>
      <div class="mb-6">
        <label for="email" class="mb-2 block text-sm font-medium text-gray-300">Email address</label
        >
        <input
          type="email"
          name="email"
          id="email"
          required
          class="w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
          placeholder="you@example.com"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="mb-2 block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          class="w-full rounded-lg border border-[#FF4F00] bg-[#000000] px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
          placeholder="••••••••"
        />
      </div>

      <div class="mb-6">
        <button
          type="submit"
          class="w-full rounded-lg bg-[#FF4F00] px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#FF4F00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
        >
          Sign in
        </button>
      </div>

      {#if form}
        <div class="text-red-500">{form.message}</div>
      {/if}

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-400">
          Don't have an account?
          <a href="/register" class="font-medium text-[#FF4F00] hover:text-[#FF4F00]/90">
            Register here
          </a>
        </p>
      </div>
    </form>
  </div>
</div>
