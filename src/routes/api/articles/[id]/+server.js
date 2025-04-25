// Article ID API server - Handles individual article operations
import { createConnection } from '$lib/db/mysql';

// Handle GET request for specific article
export async function GET({ params }) {
    const { id } = params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.execute(
            'SELECT *, likes FROM articles WHERE id = ?',
            [id]
        );

        // Check if article exists
        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Article not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Return article data
        return new Response(JSON.stringify(rows[0]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Handle server errors
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}n