import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM articles;');


	return {
		articles: rows,
		user: locals.user
	};
}

export const actions = {
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		await connection.execute('DELETE FROM articles WHERE id = ?', [id]);

	}
};