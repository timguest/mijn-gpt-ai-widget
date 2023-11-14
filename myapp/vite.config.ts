import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['..']
		}
	}
});

// import tailwindcss from 'tailwindcss';
// import { defineConfig } from 'vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import sveltePreprocess from 'svelte-preprocess';
// import autoprefixer from 'autoprefixer';

// export default defineConfig({
// 	plugins: [
// 		svelte({
// 			preprocess: sveltePreprocess(), // Add this line if you're using TypeScript in your Svelte components

// 			compilerOptions: { customElement: true }
// 		})
// 	],
// 	css: {
// 		postcss: {
// 			plugins: [tailwindcss, autoprefixer]
// 		}
// 	},
// 	build: {
// 		lib: {
// 			entry: 'src/components/Chat/Controller.svelte',
// 			name: 'MijnGPT',
// 			formats: ['iife'],
// 			fileName: (format) => `MijnGPT.${format}.js`
// 		}
// 	}
// });
