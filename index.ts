import { type AstroIntegration } from 'astro'
import { vitePluginCreateVirtualModules } from './virtual-modules.js'
import { generateManifest } from './src/customElementManifest/generateManifest.js';
import { formatResults } from './src/customElementManifest/formatResults.js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from "node:path";
import { withPageData } from './src/routing/withPageData.js';
import { withUsageData } from './src/usage/withUsageData.js';

const PAGE_PATTERN = 'components/[component]';

const cwd = dirname(fileURLToPath(import.meta.url))
const PATH_TO_DATA_JSON = join(cwd, './src/data.json')

const defaultComponents = {
  Layout: join(cwd, './src/components/Layout.astro'),
  Sidebar: join(cwd, './src/components/Sidebar.astro'),
  Usage: join(cwd, './src/components/Usage.astro'),
  Page: join(cwd, './src/components/Page.astro'),
  Head: join(cwd, './src/components/Head.astro'),
}

export interface CustomElementsDocGenArgs {
  astroComponents: Record<string, string>,
  componentsDir?: string,
}

const createPlugin = ({
  astroComponents: components = {},
  componentsDir,
}: CustomElementsDocGenArgs): AstroIntegration => {
  return {
    name: 'custom-elements-docgen',
    hooks: {
      'astro:config:setup': async ({ injectRoute, updateConfig, injectScript, config, logger }) => {
        if (!componentsDir) {
          logger.error('No path to components provided, skipping custom-element-docgen integration.');
          return;
        }

        const cemManifest = await generateManifest(componentsDir);

        if (!cemManifest) {
          logger.error('No components could be found, skipping custom-element-docgen integration.');
          return;
        }

        const formattedResults = formatResults(cemManifest.modules);
        const resultsWithPageData = withPageData(formattedResults);
        const resultsWithUsageData = await withUsageData(resultsWithPageData, { componentsDir });

        fs.writeFileSync(PATH_TO_DATA_JSON, JSON.stringify(resultsWithUsageData, null, 2));

        const mergedComponents = {
          ...defaultComponents,
          ...components
        }

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
      }
    }
  }
}



export default createPlugin
