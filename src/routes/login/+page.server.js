// Login page server - Handles user authentication
import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

// Handle form actions
export const actions = {
    // Process login request
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // Attempt to login user
        const token = await login(email, password);

        if (token) {
            // Set session cookie
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
            // Redirect to home page
            throw redirect(302, '/');
        } else {
            return {
                success: false,
                message: 'Login failed'
            };
        }
    }
};