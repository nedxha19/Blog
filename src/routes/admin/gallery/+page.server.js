// Gallery page server - Handles article listing and deletion
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load articles for the gallery page
export async function load({ locals }) {
	// Check if user is logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Get all articles from database
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM articles;');

	return {
		articles: rows,
		user: locals.user
	};
}

// Handle article actions
export const actions = {
	// Delete an article
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// Remove article from database
		const connection = await createConnection();
		await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
	}
};