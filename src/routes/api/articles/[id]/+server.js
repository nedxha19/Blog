// Import necessary function to create a MySQL connection
import { createConnection } from '$lib/db/mysql';

// Define the GET function to handle fetching a single article based on its ID
export async function GET({ params }) {
    // Extract article ID from the request parameters
    const { id } = params;

    try {
        // Create a connection to the database
        const connection = await createConnection();

        // Execute a query to select the article with the given ID
        const [rows] = await connection.execute(
            'SELECT *, likes FROM articles WHERE id = ?',
            [id] // Sanitize input to prevent SQL injection
        );

        // Check if no articles were found
        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Article not found' }), {
                status: 404, // Return 404 status if not found
                headers: {
                    'Content-Type': 'application/json' // Specify response content type
                }
            });
        }

        // Return the found article as a JSON response
        return new Response(JSON.stringify(rows[0]), {
            status: 200, // Return 200 status for successful retrieval
            headers: {
                'Content-Type': 'application/json' // Specify response content type
            }
        });
    } catch (error) {
        // Log any errors that occur during the process
        console.error('Error fetching article:', error);

        // Return a 500 response for internal server errors
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500, // 500 Internal Server Error status
            headers: {
                'Content-Type': 'application/json' // Specify response content type
            }
        });
    }
}