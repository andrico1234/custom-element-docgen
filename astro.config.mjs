import { defineConfig } from 'astro/config';
import integration1 from './integrations/integration1'

// https://astro.build/config
export default defineConfig({
	integrations: [
		integration1({
			components: {
				// Layout: './src/layouts/CustomLayout.astro'
			}
		})
	],
});
