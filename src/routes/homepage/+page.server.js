// NeditBlog\src\routes\homepage\+page.server.js
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [articles] = await connection.execute('SELECT *, (SELECT COUNT(*) FROM likes WHERE article_id = articles.id) AS likes FROM articles ORDER BY id DESC');

	return { articles };
}
