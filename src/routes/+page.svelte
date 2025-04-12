<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let user = null;

	onMount(async () => {
		if (browser) {
			const session = localStorage.getItem('session');
			if (session) {
				user = { id: 1, username: 'demo_user' };
			}
		}
	});
</script>

<div class="bg-gray-50">
	<!-- Navigation -->
	<nav class="bg-white shadow-lg">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex">
					<div class="flex flex-shrink-0 items-center">
						<a href="/" class="text-xl font-bold tracking-tight text-blue-600">ShkodraWeb</a>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:items-center">
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							<a href="/">Home</a>
						</div>
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							<a href="/about">About</a>
						</div>
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							<a href="/services">Services</a>
						</div>
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							<a href="/logout">Contact</a>
						</div>
					</div>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:items-center">
					{#if user}
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							<a href="/profile">Profile</a>
						</div>
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>
							<a href="/logout">Logout</a>
						</div>
					{:else}
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>
							<a href="/login">Login</a>
						</div>
						<div
							class="ml-4 rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>
							<a href="/register">Sign Up</a>
						</div>
					{/if}
				</div>
				<div class="-mr-2 flex items-center sm:hidden">
					<!-- Mobile menu button -->
					<button
						type="button"
						class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
						<svg
							class="hidden h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state -->
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<a
					href="/"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
					>Home</a
				>
				<a
					href="/about"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
					>About</a
				>
				<a
					href="/services"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
					>Services</a
				>
				<a
					href="/contact"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
					>Contact</a
				>
				{#if user}
					<a
						href="/profile"
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
						>Profile</a
					>
					<a
						href="/logout"
						class="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>Logout</a
					>
				{:else}
					<a
						href="/login"
						class="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>Login</a
					>
					<a
						href="/sign_up"
						class="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 hover:text-blue-500"
						>Sign Up</a
					>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Main content -->
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<slot />
	</div>

	<!-- Footer -->
	<footer class="bg-white">
		<div class="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				<div>
					<h3 class="text-sm font-semibold tracking-wider text-gray-800">Product</h3>
					<ul class="mt-4 space-y-4">
						<li>
							<a
								href="/features"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Features</a
							>
						</li>
						<li>
							<a
								href="/solutions"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Solutions</a
							>
						</li>
						<li>
							<a
								href="/pricing"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Pricing</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-sm font-semibold tracking-wider text-gray-800">Company</h3>
					<ul class="mt-4 space-y-4">
						<li>
							<a
								href="/about"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>About</a
							>
						</li>
						<li>
							<a
								href="/team"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Team</a
							>
						</li>
						<li>
							<a
								href="/careers"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Careers</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-sm font-semibold tracking-wider text-gray-800">Resources</h3>
					<ul class="mt-4 space-y-4">
						<li>
							<a
								href="/documentation"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Documentation</a
							>
						</li>
						<li>
							<a
								href="/tutorials"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Tutorials</a
							>
						</li>
						<li>
							<a
								href="/community"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Community</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-sm font-semibold tracking-wider text-gray-800">Support</h3>
					<ul class="mt-4 space-y-4">
						<li>
							<a
								href="/help"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Help Center</a
							>
						</li>
						<li>
							<a
								href="/contact"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>Contact Us</a
							>
						</li>
						<li>
							<a
								href="/faq"
								class="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700"
								>FAQ</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-12 border-t border-gray-200 pt-12">
				<div class="flex justify-center space-x-6">
					<a
						href="/facebook"
						class="text-gray-400 transition-colors duration-200 hover:text-gray-500"
					>
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
						</svg>
					</a>
					<a
						href="/twitter"
						class="text-gray-400 transition-colors duration-200 hover:text-gray-500"
					>
						<span class="sr-only">Twitter</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
							/>
						</svg>
					</a>
					<a
						href="/instagram"
						class="text-gray-400 transition-colors duration-200 hover:text-gray-500"
					>
						<span class="sr-only">Instagram</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M22 5.9a6.2 6.2 0 00-1.8-3.1 6.4 6.4 0 00-4.6-1.3 6.45 6.45 0 00-6.5 1.9 6.2 6.2 0 00-3.2 5.4A6.4 6.4 0 005.9 19c1.7.6 3.4.9 5.2.9a6.34 6.34 0 003.8-1 6.3 6.3 0 003.7-3.3 6.32 6.32 0 00.9-4.2zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
							/>
						</svg>
					</a>
					<a
						href="/github"
						class="text-gray-400 transition-colors duration-200 hover:text-gray-500"
					>
						<span class="sr-only">GitHub</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
							/>
						</svg>
					</a>
				</div>
				<p class="mt-8 text-center text-base text-gray-400">
					&copy; 2023 ShkodraWeb. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>
