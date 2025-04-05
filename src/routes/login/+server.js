import { createConnection } from '$lib/db/mysql';
import { compare } from 'bcrypt';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const { email, password } = Object.fromEntries(await request.formData());
    const connection = await createConnection();

    try {
        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return json({ message: 'Invalid email or password.' }, { status: 401 });
        }

        const user = users[0];

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return json({ message: 'Invalid email or password.' }, { status: 401 });
        }

        return json({
            message: 'Login successful!',
            username: user.username || user.email.split('@')[0] // Use email prefix if username not available
        }, { status: 200 });
    } catch (error) {
        return json({ message: 'An error occurred during login.' }, { status: 500 });
    } finally {
        await connection.end();
    }
};