import { createConnection } from '$lib/db/mysql';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
    const connection = await createConnection();

    // Retrieve the post by id
    const [posts] = await connection.execute('SELECT * FROM articles WHERE id = ?', [params.id]);
    if (posts.length === 0) {
        throw error(404, 'Post not found');
    }
    const post = posts[0];

    // Load related comments sorted by creation time (oldest first)
    const [comments] = await connection.execute(
        'SELECT * FROM comments WHERE article_id = ? ORDER BY created_at ASC',
        [params.id]
    );

    // Count the number of likes for the post
    const [likes] = await connection.execute(
        'SELECT COUNT(*) as count FROM likes WHERE article_id = ?',
        [params.id]
    );

    return { post, comments, likeCount: likes[0].count, user: locals.user || null };
}

export const actions = {
    // Action for adding a comment
    addComment: async ({ request, params, locals }) => {
        if (!locals.user) {
            throw error(403, 'Authentication required');
        }
        const formData = await request.formData();
        const commentText = formData.get('comment');

        const connection = await createConnection();
        await connection.execute(
            'INSERT INTO comments (article_id, user, comment) VALUES (?, ?, ?)',
            [params.id, locals.user.username, commentText]
        );
        return { success: true };
    },

    // Action for toggling a like
    toggleLike: async ({ request, params, locals }) => {
        if (!locals.user) {
            throw error(403, 'Authentication required');
        }
        const connection = await createConnection();
        const [existing] = await connection.execute(
            'SELECT * FROM likes WHERE article_id = ? AND user = ?',
            [params.id, locals.user.username]
        );

        if (existing.length > 0) {
            // If already liked, remove like
            await connection.execute(
                'DELETE FROM likes WHERE article_id = ? AND user = ?',
                [params.id, locals.user.username]
            );
        } else {
            // Otherwise, add a like
            await connection.execute(
                'INSERT INTO likes (article_id, user) VALUES (?, ?)',
                [params.id, locals.user.username]
            );
        }
        return { success: true };
    }
};
