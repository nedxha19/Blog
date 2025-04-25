// Register page server - Handles user registration
import { register } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

// Handle form actions
export const actions = {
    // Process registration request
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');

        // Validate email format
        if (!email || !email.includes('@')) {
            return {
                success: false,
                message: 'Please enter a valid email address'
            };
        }

        // Validate password length
        if (!password || password.length < 8) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long'
            };
        }

        // Register new user
        const { token, message } = await register(email, username, password);

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
                message: message
            };
        }
    }
};