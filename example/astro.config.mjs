import { defineConfig } from 'astro/config';
import customElementsDocgen from '../index'

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
