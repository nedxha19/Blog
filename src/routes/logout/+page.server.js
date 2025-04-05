// src/routes/logout/+page.server.js
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        try {
            // Delete session cookie
            cookies.delete('session', { path: '/' });

            // Redirect to home page with a query parameter for the logout message
            throw redirect(302, '/?logout=true');
        } catch (error) {
            console.error('Logout error:', error);
            throw redirect(302, '/');
        }
    }
};