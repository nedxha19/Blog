// src/routes/register/+server.js
import { createConnection } from '$lib/db/mysql'; // Adjust this path to your database connection utility
import { hash } from 'bcrypt'; // Import bcrypt for hashing passwords
import { json } from '@sveltejs/kit'; // Import the json utility

export const POST = async ({ request }) => {
    const { email, password } = Object.fromEntries(await request.formData()); // Get form data as an object
    const connection = await createConnection();

    // Hash the password before saving it to the database
    const hashedPassword = await hash(password, 10);

    // Check if the email already exists
    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        return json({
            message: 'Email already in use.'
        }, { status: 400 }); // Return JSON object with a status
    }

    // Insert the new user into the database
    await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return json({
        message: 'User registered successfully!'
    }, { status: 201 }); // Return JSON object with a 201 status
};