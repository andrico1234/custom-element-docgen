import { type AstroIntegration } from 'astro'
import { vitePluginCreateVirtualModules } from './virtual-modules'
import { generateResults } from './customElementManifest/generateResults';
import { formatResults } from './customElementManifest/formatResults';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from "node:path";
import { withPageData } from './routing/withPageData';
import { withUsageData } from './usage/withUsageData';

const PAGE_PATTERN = 'components/[component]';

// TODO: what's the best way to handle this?
const cwd = dirname(fileURLToPath(import.meta.url))
const PATH_TO_DATA_JSON = join(cwd, './data.json')

const defaultComponents = {
  Layout: join(cwd, './components/Layout.astro'),
  Sidebar: join(cwd, './components/Sidebar.astro'),
  Usage: join(cwd, './components/Usage.astro'),
  Page: join(cwd, './components/Page.astro'),
}

const createPlugin = ({
  components = {},
  pathToComponents = './src/components'
}): AstroIntegration => {
  return {
    name: 'custom-elements-docgen',
    hooks: {
      'astro:config:setup': async ({ injectRoute, updateConfig, injectScript, config, logger }) => {
        const results = await generateResults(pathToComponents);

        if (!results) {
          // TODO: beter error handling
          logger.error('No components could be found, skipping custom-element-docgen integration.');
          return;
        }

        const mergedComponents = {
          ...defaultComponents,
          ...components
        }

        const formattedResults = formatResults(results.modules);
        const resultsWithPageData = withPageData(formattedResults);
        const resultsWithUsageData = await withUsageData(resultsWithPageData, { pathToComponents });

        fs.writeFileSync(PATH_TO_DATA_JSON, JSON.stringify(resultsWithUsageData, null, 2));

        updateConfig({
          vite: {
            plugins: [vitePluginCreateVirtualModules({
              components: mergedComponents,
            },
              config
            )]
          }
        })

        // TODO: do I need to check if the page already exists?
        injectRoute({
          pattern: PAGE_PATTERN,
          entrypoint: mergedComponents.Page
        })

        for await (const component of resultsWithUsageData) {
          const { registerPath } = component.props.usage;

          try {

            // TODO: I'm, not able to build scripts dynamically
            const data = await fs.promises.readFile(registerPath, 'utf8')
            injectScript('before-hydration', data);
          } catch (err) {
            logger.error(`Error reading file: ${registerPath}`);
          }
        }
      }
    }
  }
}



export default createPlugin
