// src/routes/login/+server.js
import { createConnection } from '$lib/db/mysql';  // Adjust this path to your database connection utility
import { compare } from 'bcrypt'; // Import bcrypt for password comparison
import { json } from '@sveltejs/kit'; // Import the json utility

export const POST = async ({ request }) => {
    const { email, password } = Object.fromEntries(await request.formData()); // Get form data as an object
    const connection = await createConnection();

    // Check if the user exists
    const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
        return json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const user = users[0];

    // Compare the password with the stored hashed password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Successful login - output user information or generate a token as needed
    return json({ message: 'Login successful!' }, { status: 200 });
};