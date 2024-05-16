import { type AstroIntegration } from 'astro'
import { vitePluginCreateVirtualModules } from './virtual-modules.js'
import { generateResults } from './customElementManifest/generateResults.js';
import { formatResults } from './customElementManifest/formatResults.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from "node:path";
import { withPageData } from './routing/withPageData.js';
import { withUsageData } from './usage/withUsageData.js';
import { getAbsoluteStylePaths } from './styles/getAbsoluteStylePaths.js';

const PAGE_PATTERN = 'components/[component]';

const cwd = dirname(fileURLToPath(import.meta.url))
const PATH_TO_DATA_JSON = join(cwd, './data.json')

const defaultComponents = {
  Layout: join(cwd, './components/Layout.astro'),
  Sidebar: join(cwd, './components/Sidebar.astro'),
  Usage: join(cwd, './components/Usage.astro'),
  Page: join(cwd, './components/Page.astro'),
}

export interface CustomElementsDocGenArgs {
  astroComponents: Record<string, string>,
  componentsDir?: string,
  pathToStyles?: string[] | string,
}

const createPlugin = ({
  astroComponents: components = {},
  componentsDir,
  pathToStyles = [],
}: CustomElementsDocGenArgs): AstroIntegration => {
  return {
    name: 'custom-elements-docgen',
    hooks: {
      'astro:config:setup': async ({ injectRoute, updateConfig, injectScript, config, logger }) => {
        if (!componentsDir) {
          logger.error('No path to components provided, skipping custom-element-docgen integration.');
          return;
        }

        const results = await generateResults(componentsDir);

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
        const resultsWithUsageData = await withUsageData(resultsWithPageData, { componentsDir });

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

        resultsWithUsageData.forEach((component) => {
          const registerPaths = component.props.usage.registerPaths as string[];
          
          registerPaths.forEach((p) => {
            // TODO: ensure script is injected within the page it's needed
            injectScript('page', `import "${p}";`);
          })
        })
                
        const absoluteStylePaths = getAbsoluteStylePaths(pathToStyles);

        absoluteStylePaths.forEach((path) => {
          injectScript('page-ssr', `import "${path}";`);
        })
      }
    }
  }
}



export default createPlugin
