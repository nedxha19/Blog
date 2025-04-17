// src/routes/admin/gallery/+page.server.js
import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }
    

    const connection = await createConnection();
    const [articles] = await connection.execute('SELECT * FROM articles ORDER BY id DESC');
    const [ comments ] = await connection.execute('SELECT * FROM comments ');

    return { articles, user:locals.user, comments: comments };
}

export const actions = {
    addComment: async ({ request }) => {
        const formData = await request.formData();
        const input = formData.get('commentInput');
        const name = formData.get('name'); 
        const article_id = formData.get('article_id'); 

    
        const connection = await createConnection();

        let [result] = await connection.execute('INSERT INTO comments (content, author, article_id) VALUES (?, ?, ?)', [
            input,
            name,
            article_id
        ]);
        
            return {
                success: true,
                message: 'Comment added successfully!'
            };
        
        
    }
}