// API endpoint for fetching a single article
import { createConnection } from '$lib/db/mysql';

export async function GET({ params }) {
    const { id } = params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.execute(
            'SELECT *, likes FROM articles WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Article not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify(rows[0]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}