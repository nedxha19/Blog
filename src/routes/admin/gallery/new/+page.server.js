// New article upload page server
import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Load page data
export async function load({ locals }) {
	// Check if user is logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Get users list for author selection
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT * FROM users;');

	return { users: rows, user: locals.user };
}

// Handle form actions
export const actions = {
	// Upload new article
	upload: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get('image');
		const description = formData.get('description');
		const author = formData.get('author');

		// Validate image upload
		if (!uploadedImage) {
			throw error(400, { message: 'No file to upload.' });
		}

		// Generate unique filename
		const timestamp = Date.now();
		const safeName = uploadedImage.name.replace(/\s+/g, '_');
		const uniquePath = `image_upload/${timestamp}-${safeName}`;

		// Upload to Vercel Blob storage
		const { url } = await put(uniquePath, uploadedImage, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

		// Save article to database
		const connection = await createConnection();
		await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, description, author]
		);

		return { uploaded: url };
	}
};