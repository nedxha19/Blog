// Authentication utilities - Handles user login and registration
import { createConnection } from './mysql';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Login user with email and password
export async function login(email, password) {
    const connection = await createConnection();

    // Get user from database
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if user exists
    if (users.length === 0) {
        return null;
    }

    // Verify password
    if (!(await bcrypt.compare(password, users[0].password_hash))) {
        return null;
    }

    // Generate session token
    const token = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 days expiration

    // Update user session
    await connection.execute(
        'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
        [token, expires, users[0].id]
    );

    return token;
}

// Register new user
export async function register(email, username, password) {
    const connection = await createConnection();
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if email is already in use
    const [usersWithEmail] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (usersWithEmail.length > 0) {
        return { token: null, message: 'Email already in use' };
    }

    // Check if username is already in use
    const [usersWithUsername] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (usersWithUsername.length > 0) {
        return { token: null, message: 'Username already in use' };
    }

    // Create new user
    await connection.execute(
        'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)',
        [email, username, hashedPassword]
    );

    // Generate session token
    const token = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 days expiration

    // Set user session
    await connection.execute(
        'UPDATE users SET session_token = ?, session_expiration = ? WHERE email = ?',
        [token, expires, email]
    );

    return { token, message: 'User created' };
}