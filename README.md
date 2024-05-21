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

If you provide a link to your components directory, the integration will generate documentation for your custom elements.

The integration won't automatically generate examples. Instead you will need to create an adjacent "[component-name].examples.ts" file to provide examples for your custom elements.

See [providing examples](#providing-examples) for more information.


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
- Head
- Sidebar
- Usage
- Page

```javascript
customElementsDocgen({
  astroComponents: {
    Layout: "./components/Layout.astro",
    Sidebar: "./components/Sidebar.astro",
    Usage: "./components/Usage.astro",
    Head: "./components/Head.astro",
    Page: "./components/Page.astro",
  },
});
```

> Note: Head is a great place to import any styles or scripts you need for your components.

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
      registerPaths: string,
      usages: {
        name: string;
        description: string;
        snippet: string;
      }[]
    }
}
```

type CustomElement is defined in the [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest?tab=readme-ov-file) schema.

## Providing Examples

To provide examples for your custom elements, you will need to create an adjacent "[component-name].examples.js" file.

The file will export the examples in the following format:

```javascript
type Example = {
  tag: string,
  registerPaths: string | string[],
  usages: {
    name: string;
    description: string;
    snippet: string;
  }[] 
}
```

A simple button example may look like this:

```javascript
export default {
  tag: 'my-button',
  registerPaths: './button.js',
  usages: [
    {
      name: 'Basic Button',
      description: "Button with disabled attributes",
      snippet: `
<my-button></my-button>
<my-button disabled></my-button>
      `,
    }]
}
```

### `tag` (required)

**type** `string`

The tag name of the custom element.

### `registerPaths` (required)

**type** `string | string[]`

The path to the file that registers the custom element.

This can be a string or an array of strings if you need to register multiple components for your examples.

You can provide a relative path to the file, or a path to a node module.

### `usages` (required)

**type** `Array<{name: string, description: string, snippet: string}>`

An array of objects that describe the examples.

- `name` - The name of the example
- `description` - A description of the example
- `snippet` - The HTML snippet of the example


## TODOs

- [ ] Handle existing manifests
- [ ] Support TS for the example files
- [ ] Support compiled web component tools, like Stencil
