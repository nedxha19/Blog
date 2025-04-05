import { createConnection } from '$lib/db/mysql';
import { json } from '@sveltejs/kit';

export async function GET() {
    const connection = await createConnection();
    try {
        const [articles] = await connection.execute('SELECT id, image, image_name, description, author, votes FROM articles ORDER BY votes DESC');

        // Convert BLOB images to base64 for all articles
        const articlesWithBase64 = articles.map(article => ({
            ...article,
            image: `data:image/jpeg;base64,${Buffer.from(article.image).toString('base64')}`
        }));

        return json(articlesWithBase64);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return json({ error: 'Failed to fetch articles' }, { status: 500 });
    } finally {
        await connection.end();
    }
}

export async function POST({ request }) {
    const connection = await createConnection();
    try {
        const formData = await request.formData();
        const image = formData.get('image');
        const description = formData.get('description');
        const author = formData.get('author');

        if (!image || !description || !author) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Convert image to buffer
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const imageName = image.name;

        // Insert into database
        const [result] = await connection.execute(
            'INSERT INTO articles (image, image_name, description, author, votes) VALUES (?, ?, ?, ?, 0)',
            [imageBuffer, imageName, description, author]
        );

        // Return the newly created article with base64 image
        return json({
            id: result.insertId,
            image: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
            image_name: imageName,
            description,
            author,
            votes: 0
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return json({ error: 'Failed to create article' }, { status: 500 });
    } finally {
        await connection.end();
    }
}