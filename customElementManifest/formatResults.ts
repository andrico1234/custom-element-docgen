export function formatResults(entries: any[]) {
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