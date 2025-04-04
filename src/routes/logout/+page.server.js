// src/routes/logout/+page.server.js
import { redirect } from '@sveltejs/kit';

export const actions = {
    logout: async ({ cookies }) => {
        // Deleting the session
        cookies.delete('session', { path: '/' });
        throw redirect(302, '/');
    }
};