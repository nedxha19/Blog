import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const ADMIN_CREDENTIALS_PATH = path.join(process.cwd(), 'admin_credentials.json');

export const POST = async ({ request }) => {
    try {
        const { username, password } = Object.fromEntries(await request.formData());

        // Read admin credentials from file
        const adminData = JSON.parse(fs.readFileSync(ADMIN_CREDENTIALS_PATH, 'utf8'));

        if (username === adminData.username && password === adminData.password) {
            return json({
                message: 'Login successful!',
                status: 200
            });
        } else {
            return json({
                message: 'Invalid username or password.',
                status: 401
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Admin login error:', error);
        return json({
            message: 'An error occurred during login.',
            status: 500
        }, { status: 500 });
    }
};