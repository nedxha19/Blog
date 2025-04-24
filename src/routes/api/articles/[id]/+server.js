// src/routes/api/articles/[id]/+server.js
import { createConnection } from '$lib/db/mysql';

export async function GET({ params }) {
    const { id } = params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [id]);

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
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}