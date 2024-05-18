import type { CustomElement } from 'custom-elements-manifest'

export type AstroProps = {
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
};
