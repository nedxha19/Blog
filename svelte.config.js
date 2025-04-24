import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			ssr: {
				noExternal: ['@vercel/blob']
			}
		}
	}
};

export default config;
