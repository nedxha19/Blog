import { createConnection } from './mysql';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function login(email, password) {
    const connection = await createConnection();

    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
        return null;
    }

    if (!(await bcrypt.compare(password, users[0].password_hash))) {
        return null;
    }

    const token = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await connection.execute(
        'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
        [token, expires, users[0].id]
    );

    return token;
}

export async function register(email, username, password) {
    const connection = await createConnection();
    const hashedPassword = await bcrypt.hash(password, 12);

    const [usersWithEmail] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (usersWithEmail.length > 0) {
        return { token: null, message: 'Email already in use' };
    }

    const [usersWithUsername] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (usersWithUsername.length > 0) {
        return { token: null, message: 'Username already in use' };
    }

    await connection.execute(
        'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
        [email, username, hashedPassword]
    );

    const token = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await connection.execute(
        'UPDATE users SET session_token = ?, session_expiration = ? WHERE email = ?',
        [token, expires, email]
    );

    return { token, message: 'User created' };
}