// src/lib/db/auth.js
import { createConnection } from './mysql';
import bcrypt from 'bcrypt';

export async function register(email, username, password) {
    const connection = await createConnection();

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await connection.execute('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);
        const token = generateToken(result.insertId); // Implement token logic
        return { token, message: 'Registration successful' };
    } catch (error) {
        return { token: null, message: 'Registration failed: ' + error.message };
    } finally {
        await connection.end();
    }
}

export async function login(email, password) {
    const connection = await createConnection();

    try {
        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length > 0) {
            const user = users[0];

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = generateToken(user.id); // Implement token logic
                return token;
            }
        }
        return null; // Login failed
    } finally {
        await connection.end();
    }
}

function generateToken(userId) {
    // Your token generation logic
    return userId; // Placeholder, implement JWT or similar logic
}