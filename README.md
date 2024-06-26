# Custom Elements Docgen (Astro Integration)

An Astro integration to automatically generate documentation for your custom elements.- [Custom Elements Docgen (Astro Integration)](#custom-elements-docgen-astro-integration)

  - [Installation](#installation)
  - [Options](#options)
    - [`componentsDir` (required)](#componentsdir-required)
    - [`astroComponents`](#astrocomponents)
  - [Providing Examples](#providing-examples)
    - [`tag` (required)](#tag-required)
    - [`registerPaths` (required)](#registerpaths-required)
    - [`usages` (required)](#usages-required)
  - [TODOs](#todos)

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

The integration won't automatically generate examples. Instead you will need to create an adjacent "[component-name].examples.js" file to provide examples for your custom elements.

See [providing examples](#providing-examples) for more information.

To see the integration in action, you can navigate to the [`example` directory](./example/README.md)


## Options

### `componentsDir` (required)

**type** `string`

This sets the path to your web components directory.

### `astroComponents`

**type** `Record<string, string>`

The integration automatically generates documentation for your custom elements. If you don't like the default appearance of the components, you can provide paths to your own components.

You can override the following components:

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

- [ ] Handle libraries with existing manifests
- [ ] Support TS for the example files
- [ ] Support compiled web component tools, like Stencil
