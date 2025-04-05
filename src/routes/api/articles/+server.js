import { createConnection } from '$lib/db/mysql';
import { json } from '@sveltejs/kit';

export async function GET() {
    const connection = await createConnection();
    try {
        const [articles] = await connection.execute('SELECT * FROM articles ORDER BY votes DESC');
        return json(articles);
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
        const { image, description, author } = await request.json();

        const [result] = await connection.execute(
            'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, 0)',
            [image, description, author]
        );

        return json({
            id: result.insertId,
            image,
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