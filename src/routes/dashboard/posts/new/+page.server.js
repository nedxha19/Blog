import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals }) {
    // Redirect to login if user is not authenticated
    if (!locals.user) {
        throw redirect(302, '/login');
    }
    return { user: locals.user };
}

export const actions = {
    uploadPost: async ({ request }) => {
        const formData = await request.formData();
        const imageFile = formData.get('image');
        const description = formData.get('description');
        const author = formData.get('author');

        if (!imageFile) {
            throw error(400, { message: 'No image selected.' });
        }

        // Define a file path and upload the image
        const filePath = `uploads/${imageFile.name}`;
        const { url } = await put(filePath, imageFile, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });

        // Insert the new post into the articles table
        const connection = await createConnection();
        await connection.execute(
            'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
            [url, description, author]
        );

        return { uploaded: url };
    }
};
