import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
    // Redirect to login if the user is not authenticated
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    // Fetch all posts from a backend API endpoint (or you can query the DB directly)
    const res = await fetch('/api/posts');
    const result = await res.json();

    // If the user is not an admin, filter posts to only show ones they've created
    let postList;
    if (locals.user.role !== 'admin') {
        postList = result.posts.filter(post => post.author === locals.user.username);
    } else {
        postList = result.posts;
    }

    return { posts: postList, user: locals.user };
}

export const actions = {
    deletePost: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const connection = await createConnection();
        await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
    }
};
