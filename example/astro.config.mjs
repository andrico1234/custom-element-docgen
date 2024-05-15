import { defineConfig } from 'astro/config';
// import customElementsDocgen from 'astro-custom-elements-docgen'
import customElementsDocgen from '../dist/index.js';

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
	integrations: [customElementsDocgen({
		// pathToComponents: '../example-libraries/simple/components',
		pathToComponents: '../example-libraries/a2k'
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
