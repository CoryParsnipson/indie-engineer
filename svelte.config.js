import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapterNode from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapterNode(),
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },
	}
};

export default config;
