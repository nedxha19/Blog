import { createConnection } from './mysql';

export async function getMedia({ user }) {
    const connection = await createConnection();

    if (user.role === 'admin') {
        const [rows] = await connection.query('SELECT * FROM media');
        return rows;
    } else {
        const [rows] = await connection.query(
            'SELECT * FROM media WHERE author_id = ?',
            [user.id]
        );
        return rows;
    }
}

export async function deleteMedia(id) {
    const connection = await createConnection();
    await connection.query('DELETE FROM media WHERE id = ?', [id]);
}

export async function uploadMedia(data, userId) {
    const connection = await createConnection();
    const [result] = await connection.query(
        'INSERT INTO media (title, description, image_url, author_id) VALUES (?, ?, ?, ?)',
        [data.title, data.description, data.imageUrl, userId]
    );
    return result.insertId;
}

export async function getComments(mediaId) {
    const connection = await createConnection();
    const [rows] = await connection.query(
        'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.media_id = ?',
        [mediaId]
    );
    return rows;
}

export async function addComment(content, userId, mediaId) {
    const connection = await createConnection();
    const [result] = await connection.query(
        'INSERT INTO comments (content, user_id, media_id) VALUES (?, ?, ?)',
        [content, userId, mediaId]
    );
    return result.insertId;
}