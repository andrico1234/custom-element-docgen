import type { CustomElement } from 'custom-elements-manifest/schema.d.ts'

type ComponentData = {
  params: {
    component: string;
  };
  props: {
    component: CustomElement;
  };

}

export function formatResults(entries: any[]): ComponentData[] {
  const filteredEntries = entries.filter((entry) => {
    if (!entry.declarations.length) return false
    const declaration = entry.declarations[0];

    return 'customElement' in declaration && declaration.customElement === true
  })

  const formattedResults = filteredEntries.map((entry) => {
    const declaration = entry.declarations[0];

    return {
      params: {
        component: declaration.tagName,
      },
      props: {
        component: declaration
      }
    }
  })

  return formattedResults
}

