// src/routes/admin/gallery/new/+page.server.js
import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// (Optional) if you need the users list for some reason
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM users;');

	return {
		users: rows,
		user: locals.user
	};
}

export const actions = {
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get('image');
		const description = formData.get('description');
		const author = formData.get('author');

		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		// Generate a unique filename to prevent collisions:
		const timestamp = Date.now();
		const safeName = uploadedImage.name.replace(/\s+/g, '_');
		const uniquePath = `image_upload/${timestamp}-${safeName}`;

		// Upload to Vercel Blob
		const { url } = await put(uniquePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
			// no need for `allowOverwrite` since names are unique
		});

		// Insert into your MySQL table
		const connection = await createConnection();
		await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, description, author]
		);
		// Do NOT call connection.end() if you're reusing a pool; only if using one-off connections

		return { uploaded: url };
	}
};
