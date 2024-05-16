export default {
  tag: 'my-element',
  registerPaths: './basicElement.js',
  usages: [
    {
      name: 'Basic El',
      description: "Vanilla WC with disable attributes",
      snippet: `<my-element></my-element>
<my-element disabled></my-element>`,
    }]
}
