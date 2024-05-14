import { defineConfig } from 'astro/config';
import customElementsDocgen from 'astro-custom-elements-docgen'
// import customElementsDocgen from '../dist/index.js'

// https://astro.build/config
export default defineConfig({
	integrations: [
		customElementsDocgen({
			pathToComponents: '../example-library/components',
		})
	],
	redirects: {
		'/': '/components/test-button'
	}
});
