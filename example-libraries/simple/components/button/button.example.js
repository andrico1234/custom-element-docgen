export default {
  tag: 'test-button',
  registerPaths: './button.js',
  usages: [{
    name: 'Regular Button',
    description: "How to use the button",
    snippet: `
    


  <test-button title="Click me"></test-button>
    <test-button disabled title="Click me"></test-button>
    
    `,
  }]
} 
