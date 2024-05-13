import { defineConfig } from 'astro/config';
import customElementsDocgen from '../index'

// https://astro.build/config
export default defineConfig({
	integrations: [
		customElementsDocgen({
			components: {
				// Layout: './src/layouts/CustomLayout.astro'
			}
		})
	],
	redirects: {
		'/': '/components/test-button'
	}
});
