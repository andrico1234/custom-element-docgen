export default {
  tag: 'sl-menu',
  registerPaths: [
    './menu.js',
    "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js",
    "@shoelace-style/shoelace/dist/components/divider/divider.js",
    "@shoelace-style/shoelace/dist/themes/dark.css",
  ],
  usages: [
    {
      name: 'Shoelace Menu',
      description: "Shoelace Menu Component",
      snippet: `
<sl-menu class="sl-theme-dark" style="max-width: 200px;">
  <sl-menu-item value="undo">Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-menu-item value="delete">Delete</sl-menu-item>
</sl-menu>
      `,
    }]
}
