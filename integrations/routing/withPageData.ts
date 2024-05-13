export function withPageData(results: any[]) {
  const components = results.map(result => {
    return {
      label: result.props.component.name,
      slug: `/components/${result.params.component}`
    }
  })

  return results.map(result => {
    return {
      ...result,
      props: {
        ...result.props,
        navigation: {
          items: components
        }
      }
    }
  })
}
