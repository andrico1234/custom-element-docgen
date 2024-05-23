export default {
  tag: 'a2k-progress',
  registerPaths: './a2k-progress.ts',
  usages: [{
    name: 'Progress',
    description: "With no progress",
    snippet: `
<a2k-progress progress="0"></a2k-progress>
    `,
  },
  {
    name: ' Progress',
    description: "With fixed progress",
    snippet: `
<a2k-progress progress="50"></a2k-progress>
    `,
  },
  ]
} 
