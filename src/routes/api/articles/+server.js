// src/routes/api/articles/+server.js
import { createConnection } from '$lib/db/mysql';

export async function GET() {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM articles ORDER BY id DESC');

        return new Response(JSON.stringify(rows), {
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