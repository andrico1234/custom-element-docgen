import { defineConfig } from 'astro/config';
// import customElementsDocgen from 'astro-custom-elements-docgen'
import customElementsDocgen from '../dist/index.js';

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
	integrations: [customElementsDocgen({
		componentsDir: '../example-libraries',
		pathToStyles: ['../example-libraries/a2k/styles/styles.css', '@shoelace-style/shoelace/dist/themes/dark.css']
	}), lit()],
	redirects: {
		'/': '/components/test-button'
	},
	vite: {
		esbuild: {
			// Decorators don't work otherwise
			tsconfigRaw: {
				compilerOptions: {
					experimentalDecorators: true,
					useDefineForClassFields: false,
				},
				
			},
	}
	}
});
