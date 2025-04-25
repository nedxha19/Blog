// NeditBlog\src\routes\homepage\+page.server.js

// Import the function to create a connection to the MySQL database
import { createConnection } from '$lib/db/mysql';
// Import the redirect function from SvelteKit for handling redirects
import { redirect } from '@sveltejs/kit';

// Load function to fetch data for the homepage route
export async function load({ locals }) {
	// Check if there's a user in the locals (indicating logged-in status)
	if (!locals.user) {
		// Redirect to the login page if the user is not logged in
		throw redirect(302, '/login');
	}

	// Create a connection to the database
	const connection = await createConnection();

	// Execute a SQL query to fetch all articles along with their like counts
	const [articles] = await connection.execute(
		'SELECT *, (SELECT COUNT(*) FROM likes WHERE article_id = articles.id) AS likes FROM articles ORDER BY id DESC'
	);

	// Return the fetched articles for use in the Svelte component
	return { articles };
}