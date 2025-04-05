import { createConnection } from '$lib/db/mysql';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const connection = await createConnection();
    try {
        const [articles] = await connection.execute('SELECT id, image, image_name, description, author, votes FROM articles WHERE id = ?', [params.id]);

        if (articles.length === 0) {
            return json({ error: 'Article not found' }, { status: 404 });
        }

        const article = articles[0];
        // Convert the BLOB to base64 for the client
        const imageBase64 = Buffer.from(article.image).toString('base64');
        return json({
            ...article,
            image: `data:image/jpeg;base64,${imageBase64}`
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        return json({ error: 'Failed to fetch article' }, { status: 500 });
    } finally {
        await connection.end();
    }
}

export async function DELETE({ params }) {
    const connection = await createConnection();
    try {
        // Delete the article from database
        await connection.execute('DELETE FROM articles WHERE id = ?', [params.id]);
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting article:', error);
        return json({ error: 'Failed to delete article' }, { status: 500 });
    } finally {
        await connection.end();
    }
}

export async function PUT({ params, request }) {
    const connection = await createConnection();
    try {
        const { action } = await request.json();

        if (action === 'vote') {
            await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [params.id]);
            const [articles] = await connection.execute('SELECT id, image, image_name, description, author, votes FROM articles WHERE id = ?', [params.id]);

            if (articles.length === 0) {
                return json({ error: 'Article not found' }, { status: 404 });
            }

            const article = articles[0];
            // Convert the BLOB to base64 for the client
            const imageBase64 = Buffer.from(article.image).toString('base64');
            return json({
                ...article,
                image: `data:image/jpeg;base64,${imageBase64}`
            });
        }

        return json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error updating article:', error);
        return json({ error: 'Failed to update article' }, { status: 500 });
    } finally {
        await connection.end();
    }
}