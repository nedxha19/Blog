// src/lib/db/mysql.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function createConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return connection;
}

export async function validateUser(email, password) {
    const connection = await createConnection();

    // You might want to hash your passwords in production for security
    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );
    return rows.length > 0 ? rows[0] : null;
}