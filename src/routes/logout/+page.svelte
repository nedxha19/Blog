<!-- src/routes/logout/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<button type="submit" class="hidden">Logout</button>
</form>
