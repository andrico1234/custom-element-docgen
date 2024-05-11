import { type AstroIntegration } from 'astro'
import { vitePluginCreateVirtualModules } from './virtual-modules'

const PAGE_PATTERN = 'components/[component]'

const defaultComponents = {
  Layout: './integrations/components/Layout.astro',
}

const createPlugin = ({
  components = {}
}): AstroIntegration => {
  return {
    name: 'integration1',
    hooks: {
      'astro:config:setup': async ({ injectRoute, updateConfig, config }) => {
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

        // TODO: do I need to check if the page already exists
        injectRoute({
          pattern: PAGE_PATTERN,
          entrypoint: './integrations/templates/componentTemplate.astro'
        })
      }
    }
  }
}



export default createPlugin
