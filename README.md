# Custom Elements Docgen (Astro Integration)

Whip up Astro documentation for your custom elements

## Installation

If you haven't created an Astro project yet, you can do so by following the official [Astro documentation](https://docs.astro.build/en/install/auto/).

Once you've got your Astro project up and running, you can install the custom-elements-docgen package by running the following command:

```bash
npm install astro-custom-elements-docgen --save-dev
```

Jump over to your `astro.config.mjs` file and add the integration:

```javascript
export default defineConfig({
  integrations: [
    customElementsDocgen({
      componentsDir: "../path-to-your-web-components-folder",
    }),
  ],
});
```

## Options

### `componentsDir` (required)

**type** `string`

This sets the path to your web components directory.

### `astroComponents`

**type** `Record<string, string>`

Paths to Astro components that override the default Astro components.

Used if you want to override the layout of generated site.

There are four components that can be overridden:

- Layout
- Sidebar
- Usage
- Page

```javascript
customElementsDocgen({
  astroComponents: {
    Layout: "./components/Layout.astro",
    Sidebar: "./components/Sidebar.astro",
    Usage: "./components/Usage.astro",
    Page: "./components/Page.astro",
  },
});
```

Every component receives the following props:

```typescript
type AstroProps = {
    component: CustomElement
    navigation: {
      items: {
        label: string,
        slug: string
      }[],
    },
    usage: {
      tag: string,
      registerPath: string,
      usages: {
        name: string;
        description: string;
        snippet: string;
      }[]
    }
}
```

type CustomElement is defined in the [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest?tab=readme-ov-file) schema.

### `pathToSyles`

**type** `string | string[]`

Paths to CSS files that will be included in the generated site.
