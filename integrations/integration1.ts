import { type AstroIntegration } from 'astro'
import { vitePluginCreateVirtualModules } from './virtual-modules'
import { generateResults } from './customElementManifest/generateResults';
import { formatResults } from './customElementManifest/formatResults';
import fs from 'node:fs';
import { withPageData } from './routing/withPageData';
import { withUsageData } from './usage/withUsageData';

const PAGE_PATTERN = 'components/[component]'
const PATH_TO_DATA_JSON = './integrations/data.json'

const defaultComponents = {
  Layout: './integrations/components/Layout.astro',
  Sidebar: './integrations/components/Sidebar.astro',
  Usage: './integrations/components/Usage.astro',
  Page: './integrations/components/Page.astro',
}

const createPlugin = ({
  components = {},
  pathToComponents = './src/components'
}): AstroIntegration => {
  return {
    name: 'integration1',
    hooks: {
      'astro:config:setup': async ({ injectRoute, updateConfig, config }) => {
        const results = await generateResults(pathToComponents);
        const formattedResults = formatResults(results.modules);
        const resultsWithPageData = withPageData(formattedResults);
        const resultsWithUsageData = await withUsageData(resultsWithPageData, { pathToComponents });

        fs.writeFileSync(PATH_TO_DATA_JSON, JSON.stringify(resultsWithUsageData, null, 2));

        updateConfig({
          vite: {
            plugins: [vitePluginCreateVirtualModules({
              components: {
                ...defaultComponents,
                ...components
              },
            },
              config
            )]
          }
        })

        // TODO: do I need to check if the page already exists?
        injectRoute({
          pattern: PAGE_PATTERN,
          entrypoint: './integrations/components/Page.astro'
        })
      }
    }
  }
}



export default createPlugin
