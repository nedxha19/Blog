// src/routes/admin/gallery/+page.server.js
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [articles] = await connection.execute('SELECT * FROM articles ORDER BY id DESC');

	return { articles };
}
