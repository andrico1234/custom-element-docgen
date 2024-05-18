import * as schema from 'custom-elements-manifest'

export type AstroProps = {
  component: schema.CustomElement
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
};
