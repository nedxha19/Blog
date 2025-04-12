import { register } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');

        if (!email || !email.includes('@')) {
            return {
                success: false,
                message: 'Please enter a valid email address'
            };
        }

        if (!password || password.length < 8) {
            return {
                success: false,
                message: 'Password must be at least 8 characters long'
            };
        }

        const { token, message } = await register(email, username, password);

        if (token) {
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
            throw redirect(302, '/');
        } else {
            return {
                success: false,
                message: message
            };
        }
    }
};