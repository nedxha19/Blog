// Main page server - Handles article listing, comments, and likes
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load main page data
export async function load({ locals }) {
    // Check if user is logged in
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    // Get articles and comments
    const connection = await createConnection();
    const [articles] = await connection.execute('SELECT * FROM articles ORDER BY id DESC limit 25');
    const [comments] = await connection.execute('SELECT * FROM comments');

    return { articles, user: locals.user, comments };
}

// Handle page actions
export const actions = {
    // Add a new comment
    addComment: async ({ request }) => {
        const formData = await request.formData();
        const input = formData.get('commentInput');
        const name = formData.get('name');
        const article_id = formData.get('article_id');

        // Save comment to database
        const connection = await createConnection();
        await connection.execute(
            'INSERT INTO comments (content, author, article_id) VALUES (?, ?, ?)',
            [input, name, article_id]
        );

        return {
            success: true,
            message: 'Comment added successfully!'
        };
    },

    // Like an article
    likeArticle: async ({ request }) => {
        const formData = await request.formData();
        const article_id = formData.get('article_id');

        // Update article likes
        const connection = await createConnection();
        await connection.execute('UPDATE articles SET votes = votes + 1 WHERE id = ?', [article_id]);

        return {
            success: true,
            message: 'Liked!'
        };
    }
};